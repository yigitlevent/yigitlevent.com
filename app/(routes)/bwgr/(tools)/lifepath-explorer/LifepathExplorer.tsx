"use client";

import { Badge, Card, Group, Select, SegmentedControl, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useRulesetContext } from "../../hooks/RulesetContext";

import type { BwgrLifepath } from "@/types/bwgr/lifepath";
import type { JSX } from "react";


function FormatYears(years: BwgrLifepath["years"]): string {
  if (Array.isArray(years)) {
    if (years.length === 0) return "-";
    if (years.length === 1) return String(years[0]);

    return `${String(Math.min(...years))}-${String(Math.max(...years))}`;
  }

  return String(years);
}

function FormatPools(lifepath: BwgrLifepath): string {
  return [
    "Pools: E/M/P",
    `${String(lifepath.pools.eitherStatPool)}/${String(lifepath.pools.mentalStatPool)}/${String(lifepath.pools.physicalStatPool)}`,
    "GS/LPS",
    `${String(lifepath.pools.generalSkillPool)}/${String(lifepath.pools.lifepathSkillPool)}`,
    "T/RP",
    `${String(lifepath.pools.traitPool)}/${String(lifepath.pools.resourcePoints)}`
  ].join(" · ");
}

export function LifepathExplorer(): JSX.Element {
  const { lifepaths, getSetting, getSkill, getTrait, fetchState } = useRulesetContext();
  const [query, setQuery] = useState("");
  const [settingFilter, setSettingFilter] = useState<string | null>(null);
  const [stockFilter, setStockFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"name" | "age">("name");

  const stockOptions = useMemo(() => {
    return [...new Set(lifepaths.map(v => v.stock[1]))]
      .sort((a, b) => a.localeCompare(b))
      .map(v => ({ value: v, label: v }));
  }, [lifepaths]);

  // Filter settings by stock when stock is selected
  const settingOptions = useMemo(() => {
    let filtered = lifepaths;
    if (stockFilter) {
      filtered = filtered.filter(v => v.stock[1] === stockFilter);
    }
    return [...new Set(filtered.map(v => v.setting[1]))]
      .sort((a, b) => a.localeCompare(b))
      .map(v => ({ value: v, label: v }));
  }, [lifepaths, stockFilter]);

  const filteredLifepaths = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const results = lifepaths
      .filter(lifepath => {
        if (settingFilter && lifepath.setting[1] !== settingFilter) return false;
        if (stockFilter && lifepath.stock[1] !== stockFilter) return false;

        if (!normalizedQuery) return true;

        const haystack = [
          lifepath.name,
          lifepath.setting[1],
          lifepath.stock[1],
          lifepath.requirementsText ?? ""
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });

    // Sort based on selected order
    if (sortOrder === "age") {
      results.sort((a, b) => {
        const aMin = Array.isArray(a.years) ? Math.min(...a.years) : a.years;
        const bMin = Array.isArray(b.years) ? Math.min(...b.years) : b.years;
        return aMin - bMin;
      });
    }
    if (sortOrder !== "age") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  }, [lifepaths, query, settingFilter, stockFilter, sortOrder]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Lifepath Explorer</Title>
        <Text c="dimmed">Search and filter lifepaths from loaded BWGR rulesets</Text>
      </div>

      <Card withBorder radius="md" p="md">
        <Stack gap="md">
          <Group grow>
            <TextInput
              leftSection={<Search size={16} />}
              placeholder="Search by name, stock, setting, or requirements"
              value={query}
              onChange={event => {
                setQuery(event.currentTarget.value);
              }}
            />

            <Select
              placeholder="Filter by stock"
              data={stockOptions}
              value={stockFilter}
              onChange={setStockFilter}
              clearable
              searchable
            />

            <Select
              placeholder="Filter by setting"
              data={settingOptions}
              value={settingFilter}
              onChange={setSettingFilter}
              clearable
              searchable
              disabled={settingOptions.length === 0}
            />
          </Group>

          <Group justify="space-between" align="flex-end">
            <Group gap="xs" align="center">
              <Text size="sm">Sort by:</Text>

              <SegmentedControl
                value={sortOrder}
                onChange={value => {
                  setSortOrder(value);
                }}
                data={[
                  { label: "Name", value: "name" },
                  { label: "Age (Low to High)", value: "age" }
                ]}
                size="xs"
              />
            </Group>

            <Group gap="xs">
              <Text size="sm" c="dimmed">
                {`Fetch state: ${fetchState}`}
              </Text>

              <Badge variant="light">
                {`${String(filteredLifepaths.length)} lifepaths`}
              </Badge>
            </Group>
          </Group>
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {filteredLifepaths.map(lifepath => (
          <Card key={String(lifepath.id)} withBorder radius="md" p="md">
            <Stack gap="xs">
              <Group justify="space-between" align="flex-start">
                <Text fw={700}>{lifepath.name}</Text>

                <Badge size="sm" variant="outline">
                  {`${FormatYears(lifepath.years)} yrs`}
                </Badge>
              </Group>

              <Group gap="xs">
                <Badge variant="light" color="blue">{lifepath.stock[1]}</Badge>
                <Badge variant="light" color="teal">{lifepath.setting[1]}</Badge>
                {lifepath.flags.isBorn && <Badge variant="light" color="grape">Born</Badge>}
              </Group>

              <Text size="sm" c="dimmed">{FormatPools(lifepath)}</Text>

              {lifepath.requirementsText && (
                <Text size="sm">{`Requirements: ${lifepath.requirementsText}`}</Text>
              )}

              {lifepath.leads && lifepath.leads.length > 0 && (
                <div>
                  <Text size="xs" fw={600} mb={4}>
                    Can Lead To:
                  </Text>

                  <Group gap={4}>
                    {lifepath.leads.flatMap(leadId => {
                      try {
                        const leadSetting = getSetting(leadId);
                        return (
                          <Badge
                            key={String(leadId)}
                            size="sm"
                            variant="outline"
                            color="lime"
                          >
                            {leadSetting.name}
                          </Badge>
                        );
                      }
                      catch {
                        return [];
                      }
                    })}
                  </Group>
                </div>
              )}

              {lifepath.skills && lifepath.skills.length > 0 && (
                <div>
                  <Text size="xs" fw={600} mb={4}>
                    Skills:
                  </Text>

                  <Group gap={4}>
                    {lifepath.skills.flatMap(skillId => {
                      try {
                        const skill = getSkill(skillId);
                        return (
                          <Badge
                            key={String(skillId)}
                            size="sm"
                            variant="light"
                            color="indigo"
                          >
                            {skill.name}
                          </Badge>
                        );
                      }
                      catch {
                        return [];
                      }
                    })}
                  </Group>
                </div>
              )}

              {lifepath.traits && lifepath.traits.length > 0 && (
                <div>
                  <Text size="xs" fw={600} mb={4}>
                    Traits:
                  </Text>

                  <Group gap={4}>
                    {lifepath.traits.flatMap(traitId => {
                      try {
                        const trait = getTrait(traitId);
                        return (
                          <Badge
                            key={String(traitId)}
                            size="sm"
                            variant="light"
                            color="pink"
                          >
                            {trait.name}
                          </Badge>
                        );
                      }
                      catch {
                        return [];
                      }
                    })}
                  </Group>
                </div>
              )}

              {lifepath.companion && (
                <div>
                  <Text size="xs" fw={600} mb={4}>
                    Companion:
                  </Text>

                  <Stack gap="xs">
                    <Text size="sm">
                      {lifepath.companion.name}
                    </Text>

                    {lifepath.companion.givesSkills && (
                      <Badge size="sm" variant="light" color="cyan">
                        Gives Skills
                      </Badge>
                    )}

                    {lifepath.companion.settingIds.length > 0 && (
                      <div>
                        <Text size="xs" c="dimmed">
                          Can go to:
                        </Text>

                        <Group gap={4}>
                          {lifepath.companion.settingIds.flatMap(settingId => {
                            try {
                              const companionSetting = getSetting(settingId);
                              return (
                                <Badge
                                  key={String(settingId)}
                                  size="xs"
                                  variant="outline"
                                  color="violet"
                                >
                                  {companionSetting.name}
                                </Badge>
                              );
                            }
                            catch {
                              return [];
                            }
                          })}
                        </Group>
                      </div>
                    )}
                  </Stack>
                </div>
              )}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {filteredLifepaths.length === 0 && (
        <Card withBorder radius="md" p="xl">
          <Text ta="center" c="dimmed">No lifepaths match the current filters.</Text>
        </Card>
      )}
    </Stack>
  );
}
