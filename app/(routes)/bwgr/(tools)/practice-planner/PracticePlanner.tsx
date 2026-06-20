"use client";

import { Badge, Card, Group, NumberInput, Select, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useRulesetContext } from "../../hooks/RulesetContext";

import type { BwgrPractice } from "@/types/bwgr/practice";
import type { JSX } from "react";


interface PlanProgress {
  routine: number;
  difficult: number;
  challenging: number;
}

function GetPracticeName(practice: BwgrPractice): string {
  if (practice.ability) return practice.ability[1];
  return practice.skillType[1];
}

function GetPracticeKind(practice: BwgrPractice): "Ability" | "Skill" {
  return practice.ability ? "Ability" : "Skill";
}

function ClampToRequired(value: number, required: number): number {
  return Math.max(0, Math.min(value, required));
}

export function PracticePlanner(): JSX.Element {
  const { practices, fetchState } = useRulesetContext();

  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<string | null>(null);
  const [selectedPracticeId, setSelectedPracticeId] = useState<string | null>(null);

  const [progressByPractice, setProgressByPractice] = useState<Record<string, PlanProgress>>({});

  const practiceOptions = useMemo(() => {
    return practices
      .map(practice => ({
        value: String(practice.id),
        label: `${GetPracticeName(practice)} (${GetPracticeKind(practice)})`
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [practices]);

  const filteredPractices = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return practices
      .filter(practice => {
        const name = GetPracticeName(practice);
        const kind = GetPracticeKind(practice);

        if (kindFilter && kind !== kindFilter) return false;
        if (!normalized) return true;

        const haystack = `${name} ${kind}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .sort((a, b) => GetPracticeName(a).localeCompare(GetPracticeName(b)));
  }, [practices, query, kindFilter]);

  const selectedPractice = useMemo(() => {
    if (!selectedPracticeId) return undefined;

    return practices.find(practice => String(practice.id) === selectedPracticeId);
  }, [practices, selectedPracticeId]);

  const selectedProgress = selectedPracticeId ? progressByPractice[selectedPracticeId] : undefined;

  const updateProgress = (key: keyof PlanProgress, next: number | string): void => {
    if (!selectedPracticeId || !selectedPractice) return;
    if (typeof next !== "number") return;

    const requirements: PlanProgress = {
      routine: selectedPractice.routine,
      difficult: selectedPractice.difficult,
      challenging: selectedPractice.challenging
    };

    const current = progressByPractice[selectedPracticeId] ?? {
      routine: 0,
      difficult: 0,
      challenging: 0
    };

    const updated: PlanProgress = {
      ...current,
      [key]: ClampToRequired(next, requirements[key])
    };

    setProgressByPractice(state => ({
      ...state,
      [selectedPracticeId]: updated
    }));
  };

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Practice Planner</Title>
        <Text c="dimmed">Track completed routine, difficult, and challenging tests against practice requirements</Text>
      </div>

      <Card withBorder radius="md" p="md">
        <Stack gap="md">
          <Group grow>
            <TextInput
              leftSection={<Search size={16} />}
              placeholder="Search practices by ability or skill"
              value={query}
              onChange={event => {
                setQuery(event.currentTarget.value);
              }}
            />

            <Select
              placeholder="Filter by kind"
              data={["Ability", "Skill"]}
              value={kindFilter}
              onChange={setKindFilter}
              clearable
            />

            <Select
              placeholder="Choose practice"
              data={practiceOptions}
              value={selectedPracticeId}
              onChange={setSelectedPracticeId}
              searchable
              clearable
            />
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">{`Fetch state: ${fetchState}`}</Text>
            <Badge variant="light">{`${String(filteredPractices.length)} practices`}</Badge>
          </Group>
        </Stack>
      </Card>

      {selectedPractice && (
        <Card withBorder radius="md" p="md">
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={700}>{GetPracticeName(selectedPractice)}</Text>
                <Text size="sm" c="dimmed">{GetPracticeKind(selectedPractice)}</Text>
              </div>

              <Badge variant="outline" color="indigo">{`Cycle ${String(selectedPractice.cycle)}`}</Badge>
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <NumberInput
                label={`Routine (${String(selectedPractice.routine)} req)`}
                value={selectedProgress?.routine ?? 0}
                min={0}
                max={selectedPractice.routine}
                allowDecimal={false}
                onChange={value => {
                  updateProgress("routine", value);
                }}
              />

              <NumberInput
                label={`Difficult (${String(selectedPractice.difficult)} req)`}
                value={selectedProgress?.difficult ?? 0}
                min={0}
                max={selectedPractice.difficult}
                allowDecimal={false}
                onChange={value => {
                  updateProgress("difficult", value);
                }}
              />

              <NumberInput
                label={`Challenging (${String(selectedPractice.challenging)} req)`}
                value={selectedProgress?.challenging ?? 0}
                min={0}
                max={selectedPractice.challenging}
                allowDecimal={false}
                onChange={value => {
                  updateProgress("challenging", value);
                }}
              />
            </SimpleGrid>

            <Text size="sm" c="dimmed">
              {`Progress: R ${String(selectedProgress?.routine ?? 0)}/${String(selectedPractice.routine)} · D ${String(selectedProgress?.difficult ?? 0)}/${String(selectedPractice.difficult)} · C ${String(selectedProgress?.challenging ?? 0)}/${String(selectedPractice.challenging)}`}
            </Text>
          </Stack>
        </Card>
      )}

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {filteredPractices.map(practice => {
          const id = String(practice.id);
          const progress = progressByPractice[id] ?? {
            routine: 0,
            difficult: 0,
            challenging: 0
          };
          const completedRoutine = progress.routine;
          const completedDifficult = progress.difficult;
          const completedChallenging = progress.challenging;

          return (
            <Card key={id} withBorder radius="md" p="md">
              <Stack gap="xs">
                <Group justify="space-between" align="flex-start">
                  <Text fw={700}>{GetPracticeName(practice)}</Text>
                  <Badge variant="outline" color="gray">{GetPracticeKind(practice)}</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  {`Required: R ${String(practice.routine)} · D ${String(practice.difficult)} · C ${String(practice.challenging)} · Cycle ${String(practice.cycle)}`}
                </Text>

                <Text size="sm" c="dimmed">
                  {`Done: R ${String(completedRoutine)} · D ${String(completedDifficult)} · C ${String(completedChallenging)}`}
                </Text>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>

      {filteredPractices.length === 0 && (
        <Card withBorder radius="md" p="xl">
          <Text ta="center" c="dimmed">No practices match the current filters.</Text>
        </Card>
      )}
    </Stack>
  );
}
