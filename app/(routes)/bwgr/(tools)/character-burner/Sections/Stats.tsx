"use client";

import { Card, Stack, Text, SimpleGrid, Group } from "@mantine/core";
import { useMemo } from "react";

import { AbilityButton } from "../../../components/Shared/AbilityButton";
import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";
import { CalculateTotalPools } from "../../../utils/CharacterBurnerCalculations";

import type { JSX } from "react";


const STATS = ["Will", "Perception", "Power", "Agility", "Forte", "Speed"];

export function Stats(): JSX.Element {
  const { state } = useBurningCharacter();

  const pools = useMemo(
    () => CalculateTotalPools(state.lifepaths.lifepaths),
    [state.lifepaths.lifepaths]
  );

  const mentalSpent = (state.stats.Will.mainPoolSpent.exponent || 0) + (state.stats.Perception.mainPoolSpent.exponent || 0);
  const physicalSpent = (state.stats.Power.mainPoolSpent.exponent || 0) + (state.stats.Agility.mainPoolSpent.exponent || 0) + (state.stats.Forte.mainPoolSpent.exponent || 0) + (state.stats.Speed.mainPoolSpent.exponent || 0);

  const mentalRemaining = Math.max(0, pools.mentalStatPool - mentalSpent);
  const physicalRemaining = Math.max(0, pools.physicalStatPool - physicalSpent);

  return (
    <Stack gap="md">
      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={600}>Stats</Text>
          <Text size="sm">{`Mental Pool: ${String(pools.mentalStatPool)} total, ${String(mentalRemaining)} remaining`}</Text>
          <Text size="sm">{`Physical Pool: ${String(pools.physicalStatPool)} total, ${String(physicalRemaining)} remaining`}</Text>
          <Text size="sm">{`Either Pool: ${String(pools.eitherStatPool)} available`}</Text>
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md">
        {STATS.map(statName => {
          const stat = state.stats[statName];
          const exponent = stat.mainPoolSpent.exponent || 0;

          return (
            <Card key={statName} withBorder radius="md" p="md">
              <Stack gap="xs" align="center">
                <Text size="sm" fw={500}>{statName}</Text>

                <Group gap="xs">
                  <AbilityButton size="sm" disabled>{stat.shadeShifted ? "G" : "B"}</AbilityButton>
                  <Text size="lg" fw={600}>{`D${String(exponent)}`}</Text>
                </Group>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
