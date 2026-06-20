"use client";

import { Card, Stack, Text, Button, Group } from "@mantine/core";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";

import type { JSX } from "react";


interface ResourcesProps {
  openModal: (modal: "resource") => void;
}

export function Resources({ openModal }: ResourcesProps): JSX.Element {
  const { state } = useBurningCharacter();

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={600}>Resources</Text>
          <Button size="xs" onClick={() => { openModal("resource"); }}>Add Resource</Button>
        </Group>

        {Object.entries(state.resources).length === 0 ? (
          <Text size="sm" c="dimmed">No resources selected</Text>
        ) : (
          Object.entries(state.resources).map(([id, resource]) => (
            <Text key={id} size="sm">{resource.name}</Text>
          ))
        )}
      </Stack>
    </Card>
  );
}
