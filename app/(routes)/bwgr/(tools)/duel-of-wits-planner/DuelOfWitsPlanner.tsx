"use client";

import { Badge, Card, Group, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useRulesetContext } from "../../hooks/RulesetContext";

import type { BwgrDoWAction } from "@/types/bwgr/actions";
import type { JSX } from "react";


export function DuelOfWitsPlanner(): JSX.Element {
  const { dowActions } = useRulesetContext();
  const [query, setQuery] = useState("");

  const filteredActions = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return dowActions
      .filter(action => {
        if (!normalized) return true;

        const haystack = [
          action.name,
          action.speakingThePart ?? "",
          action.special ?? "",
          action.effect ?? ""
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalized);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [dowActions, query]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Duel of Wits Planner</Title>
        <Text c="dimmed">Inspect actions, speaking-the-part notes, and effects for social volleys</Text>
      </div>

      <Card withBorder radius="md" p="md">
        <TextInput
          leftSection={<Search size={16} />}
          placeholder="Search duel of wits actions"
          value={query}
          onChange={event => {
            setQuery(event.currentTarget.value);
          }}
        />
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {filteredActions.map(action => (
          <DoWActionCard key={String(action.id)} action={action} />
        ))}
      </SimpleGrid>

      {filteredActions.length === 0 && (
        <Card withBorder radius="md" p="xl">
          <Text ta="center" c="dimmed">No duel of wits actions match the current search.</Text>
        </Card>
      )}
    </Stack>
  );
}

function DoWActionCard({ action }: { action: BwgrDoWAction; }): JSX.Element {
  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="xs">
        <Group justify="space-between" align="flex-start">
          <Text fw={700}>{action.name}</Text>
          <Badge variant="outline">{`${String(action.resolutions?.length ?? 0)} resolutions`}</Badge>
        </Group>

        <Text size="sm" c="dimmed">{`Tests: ${String(action.tests?.skills.length ?? 0)} skills / ${String(action.tests?.abilities.length ?? 0)} abilities`}</Text>
        {action.speakingThePart && <Text size="sm">{`Speaking the part: ${action.speakingThePart}`}</Text>}
        {action.effect && <Text size="sm">{`Effect: ${action.effect}`}</Text>}
        {action.special && <Text size="sm">{`Special: ${action.special}`}</Text>}
      </Stack>
    </Card>
  );
}
