"use client";

import { Card, Stack, Text, TextInput } from "@mantine/core";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";

import type { JSX } from "react";


export function Instincts(): JSX.Element {
  const { state, setBasics } = useBurningCharacter();

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="md">
        <Text fw={600}>Instincts</Text>

        {state.basics.instincts.map((instinct, i) => (
          <TextInput
            key={i}
            label={instinct.name || `Instinct ${String(i + 1)}`}
            placeholder={`Enter instinct ${String(i + 1)}`}
            value={instinct.instinct}
            onChange={e => {
              const newInstincts = [...state.basics.instincts];
              newInstincts[i] = { ...newInstincts[i], instinct: e.currentTarget.value };
              setBasics({ instincts: newInstincts });
            }}
          />
        ))}
      </Stack>
    </Card>
  );
}
