"use client";


import { Button, Checkbox, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import { Clamp } from "@/lib/helpers/Clamp";
import { RandomNumber } from "@/lib/helpers/RandomNumber";

import { DiceRollerProbabilities } from "./DiceRollerProbabilities";
import { DiceRollerResult } from "./DiceRollerResult";
import { CalculateDiceProbability } from "../../utils/CalculateDiceProbability";
import { AbilityButton, AbilityButtonWithArrows } from "../../components/Shared/AbilityButton";

import type { BwgrShades } from "@/types/bwgr/character";
import type { JSX } from "react";


const Tests: Record<number, { routineMaxObstacle: number; }> = {
  2: { routineMaxObstacle: 1 },
  3: { routineMaxObstacle: 2 },
  4: { routineMaxObstacle: 2 },
  5: { routineMaxObstacle: 3 },
  6: { routineMaxObstacle: 4 },
  7: { routineMaxObstacle: 4 },
  8: { routineMaxObstacle: 5 },
  9: { routineMaxObstacle: 6 },
  10: { routineMaxObstacle: 7 },
  11: { routineMaxObstacle: 8 },
  12: { routineMaxObstacle: 9 },
  13: { routineMaxObstacle: 10 },
  14: { routineMaxObstacle: 11 },
  15: { routineMaxObstacle: 12 },
  16: { routineMaxObstacle: 13 },
  17: { routineMaxObstacle: 14 },
  18: { routineMaxObstacle: 15 },
  19: { routineMaxObstacle: 16 },
  20: { routineMaxObstacle: 17 }
};

interface TestResult {
  dice: number[];
  successes: number;
  failures: number;
  test: string;
  usedFate: boolean;
}

export function DiceRoller(): JSX.Element {
  const [shade, setShade] = useState<BwgrShades>("B");
  const [dicePool, setDicePool] = useState(1);
  const [obstacle, setObstacle] = useState(1);
  const [isOpenEnded, setIsOpenEnded] = useState(false);
  const [isDoubleObstacle, setIsDoubleObstacle] = useState(false);
  const [result, setResult] = useState<TestResult | undefined>(undefined);
  const [probabilities, setProbabilities] = useState<number[]>([]);

  const testType =
    dicePool === 1 && obstacle === 1 ? "Routine or Difficult" : obstacle > dicePool ? "Challenging" : obstacle <= Tests[dicePool].routineMaxObstacle ? "Routine" : "Difficult";

  const calculateResult = (dice: number[], usedFate: boolean): void => {
    let successes = 0;
    let failures = 0;

    dice.forEach(v => {
      if ((shade === "B" && v > 3) || (shade === "G" && v > 2) || (shade === "W" && v > 1)) {
        successes += 1;
      }
      else {
        failures += 1;
      }
    });

    setResult({ dice: dice.sort((a, b) => b - a), successes, failures, test: testType, usedFate });
  };

  const rerollFailure = (dice: number[]): void => {
    const tempDice = [...dice];
    const index = tempDice.findIndex(
      v => (shade === "B" && v < 4) || (shade === "G" && v < 3) || (shade === "W" && v < 2)
    );
    if (index !== -1) {
      tempDice[index] = RandomNumber(1, 6);
      calculateResult(tempDice, true);
    }
  };

  const rerollSixes = (dice: number[], spendingFate: boolean): void => {
    const rerolled: number[][] = [];
    if (isOpenEnded || spendingFate) {
      rerolled.push(dice.filter(v => v === 6).map(() => RandomNumber(1, 6)));
      while (rerolled[rerolled.length - 1].some(v => v === 6)) {
        rerolled.push(
          rerolled[rerolled.length - 1]
            .filter(v => v === 6)
            .map(() => RandomNumber(1, 6))
        );
      }
    }
    calculateResult([...dice, ...rerolled.flat()], spendingFate);
  };

  const resolveDiceRoll = (): void => {
    const newDice = Array.from({ length: dicePool }, () => RandomNumber(1, 6));
    rerollSixes(newDice, false);
  };

  useEffect(() => {
    setProbabilities(CalculateDiceProbability(dicePool, isOpenEnded, shade));
  }, [dicePool, isOpenEnded, shade]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Dice Roller</Title>
        <Text c="dimmed">Calculate dice probabilities and resolve rolls</Text>
      </div>

      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Group>
              <Text size="sm">Shade:</Text>

              <AbilityButton
                onClick={() => {
                  setShade(v => (v === "W" ? "B" : v === "B" ? "G" : "W"));
                }}
              >
                {shade}
              </AbilityButton>
            </Group>

            <Group>
              <Text size="sm">Pool:</Text>

              <AbilityButtonWithArrows
                onClick={() => {
                  setDicePool(v => (v === 20 ? 1 : Clamp(v + 1, 1, 20)));
                }}
                onRight={() => {
                  setDicePool(v => Clamp(v - 1, 1, 20));
                }}
              >
                {dicePool}
              </AbilityButtonWithArrows>
            </Group>

            <Group>
              <Text size="sm">vs. Ob:</Text>

              <AbilityButtonWithArrows
                onClick={() => {
                  setObstacle(v => (v === 20 ? 1 : Clamp(v + 1, 1, 20)));
                }}
                onRight={() => {
                  setObstacle(v => Clamp(v - 1, 1, 20));
                }}
              >
                {obstacle}
              </AbilityButtonWithArrows>
            </Group>
          </Group>

          <Divider />

          <Group justify="space-between">
            <Stack gap="xs">
              <Checkbox
                label="Open Ended"
                checked={isOpenEnded}
                onChange={e => { setIsOpenEnded(e.currentTarget.checked); }}
              />

              <Checkbox
                label="Double Obstacle"
                checked={isDoubleObstacle}
                onChange={e => { setIsDoubleObstacle(e.currentTarget.checked); }}
              />
            </Stack>

            <Button size="lg" onClick={resolveDiceRoll}>
              Roll Dice
            </Button>
          </Group>
        </Stack>
      </Paper>

      <DiceRollerProbabilities
        probabilities={probabilities}
        isDoubleObstacle={isDoubleObstacle}
        obstacle={obstacle}
      />

      <DiceRollerResult
        result={result}
        shade={shade}
        isDoubleObstacle={isDoubleObstacle}
        isOpenEnded={isOpenEnded}
        obstacle={obstacle}
        rerollFailure={rerollFailure}
        rerollSixes={rerollSixes}
      />
    </Stack>
  );
}
