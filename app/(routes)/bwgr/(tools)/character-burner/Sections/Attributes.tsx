"use client";

import { Card, Stack, Text } from "@mantine/core";

import type { JSX } from "react";


export function Attributes(): JSX.Element {
  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="xs">
        <Text fw={600}>Attributes</Text>
        <Text size="sm" c="dimmed">Derived attributes (Mortal Wound, Health, Reflexes, etc.) calculated from stats</Text>
      </Stack>
    </Card>
  );
}
