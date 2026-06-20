"use client";

import { Button, Divider, Grid, Group, Stack, Text, Badge, Box } from "@mantine/core";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

import type { JSX } from "react";


export interface TestResult {
  dice: number[];
  successes: number;
  failures: number;
  test: string;
  usedFate: boolean;
}

interface DiceRollerResultProps {
  result: TestResult | undefined;
  shade: string;
  isDoubleObstacle: boolean;
  isOpenEnded: boolean;
  obstacle: number;
  rerollFailure: (dice: number[]) => void;
  rerollSixes: (dice: number[], spendingFate: boolean) => void;
}

const DiceIcons: Record<number, React.ReactNode> = {
  1: <Dice1 size={20} />,
  2: <Dice2 size={20} />,
  3: <Dice3 size={20} />,
  4: <Dice4 size={20} />,
  5: <Dice5 size={20} />,
  6: <Dice6 size={20} />
};

export function DiceRollerResult({ result, shade, isDoubleObstacle, isOpenEnded, obstacle, rerollFailure, rerollSixes }: DiceRollerResultProps): JSX.Element | null {
  if (!result) return null;

  const actualObstacle = isDoubleObstacle ? obstacle * 2 : obstacle;
  const margin = Math.abs(result.successes - actualObstacle);

  let resultText = "";
  let resultColor = "";

  if (result.successes > actualObstacle) {
    resultText = `Success with a margin of ${String(margin)}`;
    resultColor = "green";
  }
  else if (result.successes < actualObstacle) {
    resultText = `Failure with a margin of ${String(margin)}`;
    resultColor = "red";
  }
  else {
    resultText = "Tie";
    resultColor = "yellow";
  }

  const shadeThreshold = shade === "B" ? 4 : shade === "G" ? 3 : 2;

  return (
    <Box mt="xl">
      <Text fw={600} mb="md">Result</Text>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">Test Type</Text>
            <Text fw={600}>{result.test}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">Successes</Text>
            <Text fw={600} size="lg">{result.successes}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">Obstacle</Text>
            <Text fw={600} size="lg">{actualObstacle}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">Outcome</Text>
            <Badge color={resultColor}>{resultText}</Badge>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider my="md" />

      <Stack gap="md">
        <div>
          <Text size="sm" c="dimmed" mb="xs">Dice Results</Text>

          <Group gap="xs">
            {result.dice.map((die, idx) => {
              const isSuccess = die >= shadeThreshold;
              return (
                <Box
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isSuccess ? "var(--mantine-color-green-6)" : "var(--mantine-color-red-6)"
                  }}
                >
                  {DiceIcons[die]}
                </Box>
              );
            })}
          </Group>
        </div>

        {!isOpenEnded && result.dice.includes(6) && !result.usedFate && (
          <Button
            variant="light"
            size="sm"
            onClick={() => { rerollSixes(result.dice, true); }}
          >
            Reroll Sixes (Spend Fate)
          </Button>
        )}

        {isOpenEnded && result.failures > 0 && !result.usedFate && (
          <Button
            variant="light"
            size="sm"
            onClick={() => { rerollFailure(result.dice); }}
          >
            Reroll Failure (Spend Fate)
          </Button>
        )}
      </Stack>
    </Box>
  );
}
