"use client";

import { Modal, Select, Button, Group, Stack, Text, Card } from "@mantine/core";
import { useMemo, useState } from "react";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";
import { useRulesetContext } from "../../../hooks/RulesetContext";
import { CalculateYearsTotal } from "../../../utils/CharacterBurnerCalculations";
import { FilterLifepaths } from "../../../utils/FilterLifepaths";

import type { JSX } from "react";


interface LifepathSelectionModalProps {
  isOpen: boolean;
  close: () => void;
}

export function LifepathSelectionModal({ isOpen, close }: LifepathSelectionModalProps): JSX.Element {
  const { state, addLifepath } = useBurningCharacter();
  const { stocks, lifepaths } = useRulesetContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedStockObj = useMemo(() => {
    if (!state.basics.stock) return undefined;
    return stocks.find(stock => String(stock.id) === state.basics.stock?.[0]);
  }, [stocks, state.basics.stock]);

  const age = CalculateYearsTotal(state.lifepaths.lifepaths);

  const availableLifepaths = useMemo(() => {
    if (!selectedStockObj) return [];
    return FilterLifepaths({
      rulesetLifepaths: lifepaths,
      stock: [selectedStockObj.id, selectedStockObj.name],
      age,
      lifepaths: state.lifepaths.lifepaths
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedStockObj, lifepaths, age, state.lifepaths.lifepaths]);

  const selectedLifepath = useMemo(
    () => availableLifepaths.find(lp => String(lp.id) === selectedId),
    [availableLifepaths, selectedId]
  );

  const options = useMemo(
    () => availableLifepaths.map(lp => ({
      value: String(lp.id),
      label: `${lp.name} (${lp.setting[1]})`
    })),
    [availableLifepaths]
  );

  const handleAdd = (): void => {
    if (!selectedLifepath) return;
    addLifepath(selectedLifepath);
    setSelectedId(null);
    close();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={close}
      title={selectedStockObj ? `Select Lifepath - ${selectedStockObj.name}` : "Select Lifepath"}
      size="lg"
    >
      <Stack gap="md">
        {!selectedStockObj && <Text c="red">Please select a stock first in Basics</Text>}

        <Select
          label="Available Lifepaths"
          placeholder="Choose a lifepath"
          data={options}
          value={selectedId}
          onChange={setSelectedId}
          searchable
        />

        {selectedLifepath && (
          <Card withBorder p="md" bg="gray.0">
            <Stack gap="xs">
              <div>
                <Text fw={600}>{selectedLifepath.name}</Text>
                <Text size="sm" c="dimmed">{selectedLifepath.setting[1]}</Text>
              </div>

              <div>
                <Text size="sm">
                  Years:
                  {" "}
                  {Array.isArray(selectedLifepath.years) ? selectedLifepath.years.join("/") : selectedLifepath.years}
                </Text>

                <Text size="sm">
                  Pools: E/M/P
                  {" "}
                  {selectedLifepath.pools.eitherStatPool}
                  /
                  {selectedLifepath.pools.mentalStatPool}
                  /
                  {selectedLifepath.pools.physicalStatPool}
                  {" "}
                  · GS/LPS
                  {" "}
                  {selectedLifepath.pools.generalSkillPool}
                  /
                  {selectedLifepath.pools.lifepathSkillPool}
                  {" "}
                  · T/RP
                  {" "}
                  {selectedLifepath.pools.traitPool}
                  /
                  {selectedLifepath.pools.resourcePoints}
                </Text>
              </div>
            </Stack>
          </Card>
        )}

        <Group justify="flex-end">
          <Button variant="default" onClick={close}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!selectedLifepath}>Add Lifepath</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
