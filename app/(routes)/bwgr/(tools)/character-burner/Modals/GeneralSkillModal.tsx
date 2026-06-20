"use client";

import { Modal, Select, Button, Group, Stack } from "@mantine/core";
import { useMemo, useState } from "react";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";
import { useRulesetContext } from "../../../hooks/RulesetContext";

import type { JSX } from "react";


interface GeneralSkillModalProps {
  isOpen: boolean;
  close: () => void;
}

export function GeneralSkillModal({ isOpen, close }: GeneralSkillModalProps): JSX.Element {
  const { state, addSkill } = useBurningCharacter();
  const { skills } = useRulesetContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const availableSkills = useMemo(() => {
    return skills.filter(skill => {
      const isAlreadyAdded = state.skills.some(s => s.id === skill.id);
      return !isAlreadyAdded && !skill.flags.dontList;
    });
  }, [skills, state.skills]);

  const options = useMemo(
    () => availableSkills.map(skill => ({
      value: String(skill.id),
      label: skill.name
    })),
    [availableSkills]
  );

  const handleAdd = (): void => {
    if (!selectedId) return;
    const skill = availableSkills.find(s => String(s.id) === selectedId);
    if (!skill) return;

    addSkill({
      id: skill.id,
      name: skill.name,
      type: "General",
      isOpen: "yes",
      isSpecial: false,
      advancement: { general: 0, lifepath: 0 }
    });

    setSelectedId(null);
    close();
  };

  return (
    <Modal opened={isOpen} onClose={close} title="Add General Skill" size="md">
      <Stack gap="md">
        <Select
          label="Skill"
          placeholder="Choose a skill"
          data={options}
          value={selectedId}
          onChange={setSelectedId}
          searchable
        />

        <Group justify="flex-end">
          <Button variant="default" onClick={close}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!selectedId}>Add Skill</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
