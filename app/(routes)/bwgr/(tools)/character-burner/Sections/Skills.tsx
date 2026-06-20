"use client";

import { Card, Stack, Text, Button, Group } from "@mantine/core";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";

import type { JSX } from "react";


interface SkillsProps {
  openModal: (modal: "skill") => void;
}

export function Skills({ openModal }: SkillsProps): JSX.Element {
  const { state } = useBurningCharacter();

  const mandatory = state.skills.filter(s => s.type === "Mandatory");
  const lifepath = state.skills.filter(s => s.type === "Lifepath");
  const general = state.skills.filter(s => s.type === "General");

  return (
    <Stack gap="md">
      <Card withBorder radius="md" p="md">
        <Stack gap="md">
          <div>
            <Text fw={600} mb="xs">Skills</Text>
            <Text size="sm" c="dimmed">Skills from lifepaths and general selections</Text>
          </div>

          {mandatory.length > 0 && (
            <div>
              <Text fw={500} size="sm" mb="xs">{`Mandatory (${String(mandatory.length)})`}</Text>
              {mandatory.map(skill => (<Text key={String(skill.id)} size="sm">{skill.name}</Text>))}
            </div>
          )}

          {lifepath.length > 0 && (
            <div>
              <Text fw={500} size="sm" mb="xs">{`Lifepath (${String(lifepath.length)})`}</Text>
              {lifepath.map(skill => (<Text key={String(skill.id)} size="sm">{skill.name}</Text>))}
            </div>
          )}

          <div>
            <Group justify="space-between" mb="xs">
              <Text fw={500} size="sm">{`General (${String(general.length)})`}</Text>
              <Button size="xs" onClick={() => { openModal("skill"); }}>Add Skill</Button>
            </Group>

            {general.map(skill => (<Text key={String(skill.id)} size="sm">{skill.name}</Text>))}
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}
