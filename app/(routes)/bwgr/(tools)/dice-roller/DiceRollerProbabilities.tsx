"use client";

import { Card, Text, Box, Stack } from "@mantine/core";

import type { JSX } from "react";


interface DiceRollerProbabilitiesProps {
  probabilities: number[];
  isDoubleObstacle: boolean;
  obstacle: number;
}

export function DiceRollerProbabilities({ probabilities, isDoubleObstacle, obstacle }: DiceRollerProbabilitiesProps): JSX.Element {
  const actualObstacle = isDoubleObstacle ? obstacle * 2 : obstacle;

  return (
    <Box mt="xl">
      <Text fw={600} mb="md">Probabilities</Text>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))", gap: "8px" }}>
        {Array.from(Array(20)).map((_, obIndex) => {
          const probability = probabilities.at(obIndex);
          const isActive = obIndex + 1 === actualObstacle;

          return (
            <Card
              key={obIndex}
              p="xs"
              style={{
                border: isActive ? "2px solid var(--mantine-color-blue-6)" : "1px solid var(--mantine-color-gray-3)",
                backgroundColor: `hsl(0, 0%, ${(probability === undefined ? 0 : probability * 60).toString()}%)`,
                cursor: "default"
              }}
            >
              <Stack gap={0}>
                <Text size="xs" fw={600} ta="center">
                  {obIndex + 1}
                  {" "}
                  ob
                </Text>

                <Text size="xs" ta="center" c="dimmed">
                  {probability === undefined ? "0%" : `${String(Math.round(probability * 100))}%`}
                </Text>
              </Stack>
            </Card>
          );
        })}
      </div>
    </Box>
  );
}
