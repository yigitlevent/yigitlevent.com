"use client";

import { Badge, Card, Group, NumberInput, Select, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useRulesetContext } from "../../hooks/RulesetContext";

import type { BwgrTrait } from "@/types/bwgr/trait";
import type { JSX } from "react";


function BuildTraitMeta(trait: BwgrTrait): string {
  const stockName = trait.stock?.[1] ?? "Any";
  return `Stock: ${stockName} · Cost: ${String(trait.cost)}`;
}

export function TraitExplorer(): JSX.Element {
  const { traits, fetchState } = useRulesetContext();

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [stockFilter, setStockFilter] = useState<string | null>(null);
  const [maxCost, setMaxCost] = useState<number | null>(null);

  const categoryOptions = useMemo(() => {
    return [...new Set(traits.map(trait => trait.category[1]))]
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({ value, label: value }));
  }, [traits]);

  const typeOptions = useMemo(() => {
    return [...new Set(traits.map(trait => trait.type[1]))]
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({ value, label: value }));
  }, [traits]);

  const stockOptions = useMemo(() => {
    return [...new Set(traits.map(trait => trait.stock?.[1] ?? "Any"))]
      .sort((a, b) => a.localeCompare(b))
      .map(value => ({ value, label: value }));
  }, [traits]);

  const filteredTraits = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return traits
      .filter(trait => {
        const stockName = trait.stock?.[1] ?? "Any";

        if (categoryFilter && trait.category[1] !== categoryFilter) return false;
        if (typeFilter && trait.type[1] !== typeFilter) return false;
        if (stockFilter && stockName !== stockFilter) return false;
        if (typeof maxCost === "number" && trait.cost > maxCost) return false;

        if (!normalizedQuery) return true;

        const haystack = [
          trait.name,
          trait.category[1],
          trait.type[1],
          stockName,
          trait.description ?? ""
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [traits, query, categoryFilter, typeFilter, stockFilter, maxCost]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Trait Explorer</Title>
        <Text c="dimmed">Browse and filter BWGR traits by category, type, stock, and cost</Text>
      </div>

      <Card withBorder radius="md" p="md">
        <Stack gap="md">
          <Group grow>
            <TextInput
              leftSection={<Search size={16} />}
              placeholder="Search by name, category, type, stock, or description"
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

            <NumberInput
              placeholder="Max cost"
              value={maxCost ?? undefined}
              onChange={value => {
                setMaxCost(typeof value === "number" ? value : null);
              }}
              min={0}
              allowDecimal={false}
            />
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">{`Fetch state: ${fetchState}`}</Text>
            <Badge variant="light">{`${String(filteredTraits.length)} traits`}</Badge>
          </Group>
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {filteredTraits.map(trait => (
          <Card key={String(trait.id)} withBorder radius="md" p="md">
            <Stack gap="xs">
              <Group justify="space-between" align="flex-start">
                <Text fw={700}>{trait.name}</Text>
                <Badge variant="outline" color="indigo">{`Cost ${String(trait.cost)}`}</Badge>
              </Group>

              <Group gap="xs">
                <Badge variant="light" color="blue">{trait.category[1]}</Badge>
                <Badge variant="light" color="teal">{trait.type[1]}</Badge>
                <Badge variant="outline" color="grape">{trait.stock?.[1] ?? "Any"}</Badge>
              </Group>

              <Text size="sm" c="dimmed">{BuildTraitMeta(trait)}</Text>
              {trait.description && <Text size="sm">{trait.description}</Text>}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {filteredTraits.length === 0 && (
        <Card withBorder radius="md" p="xl">
          <Text ta="center" c="dimmed">No traits match the current filters.</Text>
        </Card>
      )}
    </Stack>
  );
}
