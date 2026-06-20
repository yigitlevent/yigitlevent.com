"use client";

import { Badge, Card, Checkbox, Group, Select, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useRulesetContext } from "../../hooks/RulesetContext";

import type { BwgrSkill } from "@/types/bwgr/skill";
import type { JSX } from "react";


function BuildSkillSummary(skill: BwgrSkill): string {
  const rootNames = skill.roots?.map(root => root[1]).join(", ") ?? "-";
  const stockName = skill.stock?.[1] ?? "Any";

  return [
    `Roots: ${rootNames}`,
    `Stock: ${stockName}`,
    `Tool: ${skill.tool.tool}`
  ].join(" · ");
}

export function SkillExplorer(): JSX.Element {
  const { skills, fetchState } = useRulesetContext();

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [stockFilter, setStockFilter] = useState<string | null>(null);
  const [showMagicalOnly, setShowMagicalOnly] = useState(false);

  const categoryOptions = useMemo(() => {
    return [...new Set(skills.map(skill => skill.category[1]))]
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({ value, label: value }));
  }, [skills]);

  const typeOptions = useMemo(() => {
    return [...new Set(skills.map(skill => skill.type[1]))]
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({ value, label: value }));
  }, [skills]);

  const stockOptions = useMemo(() => {
    return [...new Set(skills.map(skill => skill.stock?.[1] ?? "Any"))]
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({ value, label: value }));
  }, [skills]);

  const filteredSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return skills
      .filter(skill => {
        const stockName = skill.stock?.[1] ?? "Any";

        if (categoryFilter && skill.category[1] !== categoryFilter) return false;
        if (typeFilter && skill.type[1] !== typeFilter) return false;
        if (stockFilter && stockName !== stockFilter) return false;
        if (showMagicalOnly && !skill.flags.isMagical) return false;

        if (!normalizedQuery) return true;

        const haystack = [
          skill.name,
          skill.category[1],
          skill.type[1],
          stockName,
          skill.description ?? "",
          skill.tool.tool,
          skill.tool.description ?? "",
          skill.roots?.map(root => root[1]).join(" ") ?? ""
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [skills, query, categoryFilter, typeFilter, stockFilter, showMagicalOnly]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Skill Explorer</Title>
        <Text c="dimmed">Browse and filter BWGR skills by category, type, stock, and magic flag</Text>
      </div>

      <Card withBorder radius="md" p="md">
        <Stack gap="md">
          <Group grow>
            <TextInput
              leftSection={<Search size={16} />}
              placeholder="Search by name, roots, stock, tool, or description"
              value={query}
              onChange={event => {
                setQuery(event.currentTarget.value);
              }}
            />

            <Select
              placeholder="Filter by category"
              data={categoryOptions}
              value={categoryFilter}
              onChange={setCategoryFilter}
              clearable
              searchable
            />

            <Select
              placeholder="Filter by type"
              data={typeOptions}
              value={typeFilter}
              onChange={setTypeFilter}
              clearable
              searchable
            />

            <Select
              placeholder="Filter by stock"
              data={stockOptions}
              value={stockFilter}
              onChange={setStockFilter}
              clearable
              searchable
            />
          </Group>

          <Group justify="space-between" align="center">
            <Checkbox
              label="Magical skills only"
              checked={showMagicalOnly}
              onChange={event => {
                setShowMagicalOnly(event.currentTarget.checked);
              }}
            />

            <Badge variant="light">{`${String(filteredSkills.length)} skills`}</Badge>
          </Group>

          <Text size="sm" c="dimmed">{`Fetch state: ${fetchState}`}</Text>
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {filteredSkills.map(skill => (
          <Card key={String(skill.id)} withBorder radius="md" p="md">
            <Stack gap="xs">
              <Group justify="space-between" align="flex-start">
                <Text fw={700}>{skill.name}</Text>

                <Group gap="xs">
                  {skill.flags.isMagical && <Badge color="violet" variant="light">Magical</Badge>}
                  {skill.flags.isTraining && <Badge color="orange" variant="light">Training</Badge>}
                  {skill.flags.dontList && <Badge color="gray" variant="light">Hidden</Badge>}
                </Group>
              </Group>

              <Group gap="xs">
                <Badge color="blue" variant="light">{skill.category[1]}</Badge>
                <Badge color="teal" variant="light">{skill.type[1]}</Badge>
                <Badge color="indigo" variant="outline">{skill.stock?.[1] ?? "Any"}</Badge>
              </Group>

              <Text size="sm" c="dimmed">{BuildSkillSummary(skill)}</Text>
              {skill.description && <Text size="sm">{skill.description}</Text>}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {filteredSkills.length === 0 && (
        <Card withBorder radius="md" p="xl">
          <Text ta="center" c="dimmed">No skills match the current filters.</Text>
        </Card>
      )}
    </Stack>
  );
}
