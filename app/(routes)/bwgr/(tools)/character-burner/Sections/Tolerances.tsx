"use client";

import { Card, Stack, Text } from "@mantine/core";

import type { JSX } from "react";


export function Tolerances(): JSX.Element {
  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="xs">
        <Text fw={600}>Tolerances</Text>
        <Text size="sm" c="dimmed">Wound, Fatigue, and Reroll tolerances</Text>
      </Stack>
    </Card>
  );
}
