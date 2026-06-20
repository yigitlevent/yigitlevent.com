"use client";

import { Modal, Select, Button, Group, Stack } from "@mantine/core";
import { useMemo, useState } from "react";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";
import { useRulesetContext } from "../../../hooks/RulesetContext";

import type { JSX } from "react";


interface ResourceSelectionModalProps {
  isOpen: boolean;
  close: () => void;
}

export function ResourceSelectionModal({ isOpen, close }: ResourceSelectionModalProps): JSX.Element {
  const { state, addResource } = useBurningCharacter();
  const { resources } = useRulesetContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const availableResources = useMemo(() => {
    return resources.filter(resource => {
      const isAlreadyAdded = Object.values(state.resources).some(r => String(r.id) === String(resource.id));
      return !isAlreadyAdded;
    });
  }, [resources, state.resources]);

  const options = useMemo(
    () => availableResources.map(resource => ({
      value: String(resource.id),
      label: resource.name
    })),
    [availableResources]
  );

  const handleAdd = (): void => {
    if (!selectedId) return;
    const resource = availableResources.find(r => String(r.id) === selectedId);
    if (!resource) return;

    const firstCost = resource.costs.length > 0 ? resource.costs[0][0] : 0;
    const modifiers = resource.modifiers.map(m => m[2]);

    addResource({
      id: resource.id,
      name: resource.name,
      type: [resource.type[0], resource.type[1]],
      modifiers,
      cost: firstCost,
      description: ""
    });

    setSelectedId(null);
    close();
  };

  return (
    <Modal opened={isOpen} onClose={close} title="Add Resource" size="md">
      <Stack gap="md">
        <Select
          label="Resource"
          placeholder="Choose a resource"
          data={options}
          value={selectedId}
          onChange={setSelectedId}
          searchable
        />

        <Group justify="flex-end">
          <Button variant="default" onClick={close}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!selectedId}>Add Resource</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
