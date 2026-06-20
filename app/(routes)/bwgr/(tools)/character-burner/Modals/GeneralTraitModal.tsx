"use client";

import { Modal, Select, Button, Group, Stack } from "@mantine/core";
import { useMemo, useState } from "react";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";
import { useRulesetContext } from "../../../hooks/RulesetContext";

import type { JSX } from "react";


interface GeneralTraitModalProps {
  isOpen: boolean;
  close: () => void;
}

export function GeneralTraitModal({ isOpen, close }: GeneralTraitModalProps): JSX.Element {
  const { state, addTrait } = useBurningCharacter();
  const { traits } = useRulesetContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const availableTraits = useMemo(() => {
    return traits.filter(trait => {
      const isAlreadyAdded = state.traits.some(t => t.id === trait.id);
      return !isAlreadyAdded;
    });
  }, [traits, state.traits]);

  const options = useMemo(
    () => availableTraits.map(trait => ({
      value: String(trait.id),
      label: trait.name
    })),
    [availableTraits]
  );

  const handleAdd = (): void => {
    if (!selectedId) return;
    const trait = availableTraits.find(t => String(t.id) === selectedId);
    if (!trait) return;

    addTrait({
      id: trait.id,
      name: trait.name,
      type: "General",
      isOpen: false
    });

    setSelectedId(null);
    close();
  };

  return (
    <Modal opened={isOpen} onClose={close} title="Add General Trait" size="md">
      <Stack gap="md">
        <Select
          label="Trait"
          placeholder="Choose a trait"
          data={options}
          value={selectedId}
          onChange={setSelectedId}
          searchable
        />

        <Group justify="flex-end">
          <Button variant="default" onClick={close}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!selectedId}>Add Trait</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
