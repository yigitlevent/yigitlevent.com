"use client";

import { Badge, Card, Group, Select, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useRulesetContext } from "../../hooks/RulesetContext";
import { GetActionResolutionString } from "../../utils/GetActionResolutionString";

import type { BwgrFightAction } from "@/types/bwgr/actions";
import type { JSX } from "react";


export function FightPlanner(): JSX.Element {
  const { fightActions } = useRulesetContext();

  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<string | null>(null);
  const [myActionId, setMyActionId] = useState<string | null>(null);
  const [opposingActionId, setOpposingActionId] = useState<string | null>(null);

  const groupOptions = useMemo(() => {
    return [...new Set(fightActions.map(action => action.group[1]))]
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({ value, label: value }));
  }, [fightActions]);

  const filteredActions = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return fightActions
      .filter(action => {
        if (groupFilter && action.group[1] !== groupFilter) return false;
        if (!normalized) return true;

        const haystack = [
          action.name,
          action.group[1],
          action.testExtra ?? "",
          action.restrictions ?? "",
          action.effect ?? "",
          action.special ?? ""
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalized);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [fightActions, query, groupFilter]);

  const actionOptions = useMemo(() => {
    return fightActions
      .map(action => ({ value: String(action.id), label: `${action.name} (${action.group[1]})` }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [fightActions]);

  const selectedMyAction = useMemo(() => {
    if (!myActionId) return undefined;
    return fightActions.find(action => String(action.id) === myActionId);
  }, [fightActions, myActionId]);

  const selectedOpposingAction = useMemo(() => {
    if (!opposingActionId) return undefined;
    return fightActions.find(action => String(action.id) === opposingActionId);
  }, [fightActions, opposingActionId]);

  const selectedResolutionText = useMemo(() => {
    if (!selectedMyAction || !selectedOpposingAction?.id) return undefined;

    const resolution = selectedMyAction.resolutions?.find(
      item => String(item.opposingAction[0]) === String(selectedOpposingAction.id)
    );

    if (!resolution) return "No explicit resolution entry for this pairing.";
    return GetActionResolutionString(resolution);
  }, [selectedMyAction, selectedOpposingAction]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Fight Planner</Title>
        <Text c="dimmed">Filter and inspect fight actions, costs, tests, and effects</Text>
      </div>

      <Card withBorder radius="md" p="md">
        <Stack gap="md">
          <Group grow>
            <TextInput
              leftSection={<Search size={16} />}
              placeholder="Search actions"
              value={query}
              onChange={event => {
                setQuery(event.currentTarget.value);
              }}
            />

            <Select
              placeholder="Filter by action group"
              data={groupOptions}
              value={groupFilter}
              onChange={setGroupFilter}
              searchable
              clearable
            />
          </Group>

          <Group grow>
            <Select
              placeholder="My action"
              data={actionOptions}
              value={myActionId}
              onChange={setMyActionId}
              searchable
              clearable
            />

            <Select
              placeholder="Opposing action"
              data={actionOptions}
              value={opposingActionId}
              onChange={setOpposingActionId}
              searchable
              clearable
            />
          </Group>

          {selectedMyAction && selectedOpposingAction && (
            <Card withBorder radius="sm" p="sm">
              <Stack gap="xs">
                <Text fw={600}>{`${selectedMyAction.name} vs ${selectedOpposingAction.name}`}</Text>
                <Text size="sm" c="dimmed">{selectedResolutionText ?? "No pairing selected."}</Text>
              </Stack>
            </Card>
          )}
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {filteredActions.map(action => (
          <ActionCard key={String(action.id)} action={action} />
        ))}
      </SimpleGrid>

      {filteredActions.length === 0 && (
        <Card withBorder radius="md" p="xl">
          <Text ta="center" c="dimmed">No fight actions match the current filters.</Text>
        </Card>
      )}
    </Stack>
  );
}

function ActionCard({ action }: { action: BwgrFightAction; }): JSX.Element {
  const testsSummary = `${String(action.tests?.skills.length ?? 0)} skills / ${String(action.tests?.abilities.length ?? 0)} abilities`;

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="xs">
        <Group justify="space-between" align="flex-start">
          <Text fw={700}>{action.name}</Text>
          <Badge variant="outline">{action.group[1]}</Badge>
        </Group>

        <Text size="sm" c="dimmed">{`Action cost: ${String(action.actionCost ?? 0)} · Tests: ${testsSummary}`}</Text>
        {action.testExtra && <Text size="sm" c="dimmed">{`Test notes: ${action.testExtra}`}</Text>}
        {action.restrictions && <Text size="sm">{`Restrictions: ${action.restrictions}`}</Text>}
        {action.effect && <Text size="sm">{`Effect: ${action.effect}`}</Text>}
        {action.special && <Text size="sm">{`Special: ${action.special}`}</Text>}
      </Stack>
    </Card>
  );
}
