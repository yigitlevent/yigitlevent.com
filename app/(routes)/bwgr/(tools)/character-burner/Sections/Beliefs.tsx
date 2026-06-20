"use client";

import { Card, Stack, Text, TextInput } from "@mantine/core";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";

import type { JSX } from "react";


export function Beliefs(): JSX.Element {
  const { state, setBasics } = useBurningCharacter();

  const beliefs = state.basics.beliefs.slice(0, 4);

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="md">
        <Text fw={600}>Beliefs</Text>

        {beliefs.map((belief, i) => (
          <TextInput
            key={i}
            label={belief.name || `Belief ${String(i + 1)}`}
            placeholder={`Enter belief ${String(i + 1)}`}
            value={belief.belief}
            onChange={e => {
              const newBeliefs = [...state.basics.beliefs];
              newBeliefs[i] = { ...newBeliefs[i], belief: e.currentTarget.value };
              setBasics({ beliefs: newBeliefs });
            }}
          />
        ))}
      </Stack>
    </Card>
  );
}
