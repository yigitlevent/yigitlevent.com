"use client";

import { Badge, Card, Checkbox, Group, Select, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useRulesetContext } from "../../hooks/RulesetContext";

import type { JSX } from "react";


export function RacPlanner(): JSX.Element {
  const { racActions } = useRulesetContext();

  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<string | null>(null);
  const [openEndedOnly, setOpenEndedOnly] = useState(false);

  const groupOptions = useMemo(() => {
    return [...new Set(racActions.map(action => action.group[1]))]
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({ value, label: value }));
  }, [racActions]);

  const filteredActions = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return racActions
      .filter(action => {
        if (groupFilter && action.group[1] !== groupFilter) return false;
        if (openEndedOnly && !action.flags.isOpenEnded) return false;
        if (!normalized) return true;

        const haystack = [
          action.name,
          action.group[1],
          action.effect,
          action.specialRestriction ?? "",
          action.specialAction ?? "",
          action.however ?? ""
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalized);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [racActions, query, groupFilter, openEndedOnly]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Range & Cover Planner</Title>
        <Text c="dimmed">Browse action options, flags, and effects for range & cover exchanges</Text>
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

          <Checkbox
            label="Open-ended actions only"
            checked={openEndedOnly}
            onChange={event => {
              setOpenEndedOnly(event.currentTarget.checked);
            }}
          />
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {filteredActions.map(action => (
          <Card key={String(action.id)} withBorder radius="md" p="md">
            <Stack gap="xs">
              <Group justify="space-between" align="flex-start">
                <Text fw={700}>{action.name}</Text>
                <Badge variant="outline">{action.group[1]}</Badge>
              </Group>

              <Group gap="xs">
                {action.flags.useFoRKs && <Badge variant="light">FoRKs</Badge>}
                {action.flags.useWeaponRangeAdvantage && <Badge variant="light">Range Adv.</Badge>}
                {action.flags.usePositionAdvantage && <Badge variant="light">Position Adv.</Badge>}
                {action.flags.useStrideAdvantage && <Badge variant="light">Stride Adv.</Badge>}
                {action.flags.isOpenEnded && <Badge color="violet" variant="light">Open-ended</Badge>}
              </Group>

              <Text size="sm">{`Effect: ${action.effect}`}</Text>
              {action.specialRestriction && <Text size="sm">{`Restriction: ${action.specialRestriction}`}</Text>}
              {action.specialAction && <Text size="sm">{`Special action: ${action.specialAction}`}</Text>}
              {action.however && <Text size="sm" c="dimmed">{`However: ${action.however}`}</Text>}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {filteredActions.length === 0 && (
        <Card withBorder radius="md" p="xl">
          <Text ta="center" c="dimmed">No range & cover actions match the current filters.</Text>
        </Card>
      )}
    </Stack>
  );
}
