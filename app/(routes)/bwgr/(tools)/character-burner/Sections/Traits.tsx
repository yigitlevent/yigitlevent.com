"use client";

import { Card, Stack, Text, Button, Group } from "@mantine/core";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";

import type { JSX } from "react";


interface TraitsProps {
  openModal: (modal: "trait") => void;
}

export function Traits({ openModal }: TraitsProps): JSX.Element {
  const { state } = useBurningCharacter();

  const common = state.traits.filter(t => t.type === "Common");
  const mandatory = state.traits.filter(t => t.type === "Mandatory");
  const lifepath = state.traits.filter(t => t.type === "Lifepath");
  const general = state.traits.filter(t => t.type === "General");

  return (
    <Stack gap="md">
      <Card withBorder radius="md" p="md">
        <Stack gap="md">
          <div>
            <Text fw={600} mb="xs">Traits</Text>
            <Text size="sm" c="dimmed">Character traits from lifepaths and selections</Text>
          </div>

          {common.length > 0 && (
            <div>
              <Text fw={500} size="sm" mb="xs">{`Common (${String(common.length)})`}</Text>
              {common.map(trait => (<Text key={String(trait.id)} size="sm">{trait.name}</Text>))}
            </div>
          )}

          {mandatory.length > 0 && (
            <div>
              <Text fw={500} size="sm" mb="xs">{`Mandatory (${String(mandatory.length)})`}</Text>
              {mandatory.map(trait => (<Text key={String(trait.id)} size="sm">{trait.name}</Text>))}
            </div>
          )}

          {lifepath.length > 0 && (
            <div>
              <Text fw={500} size="sm" mb="xs">{`Lifepath (${String(lifepath.length)})`}</Text>
              {lifepath.map(trait => (<Text key={String(trait.id)} size="sm">{trait.name}</Text>))}
            </div>
          )}

          <div>
            <Group justify="space-between" mb="xs">
              <Text fw={500} size="sm">{`General (${String(general.length)})`}</Text>
              <Button size="xs" onClick={() => { openModal("trait"); }}>Add Trait</Button>
            </Group>

            {general.map(trait => (<Text key={String(trait.id)} size="sm">{trait.name}</Text>))}
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}
