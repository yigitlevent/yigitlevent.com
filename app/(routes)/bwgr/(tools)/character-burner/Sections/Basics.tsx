"use client";

import { Button, Group, Stack, Text, TextInput, Select, Card, Textarea } from "@mantine/core";
import { useMemo } from "react";

import { useBurningCharacter } from "../../../hooks/BurningCharacterProvider";
import { useRulesetContext } from "../../../hooks/RulesetContext";
import { CalculateYearsTotal } from "../../../utils/CharacterBurnerCalculations";

import type { JSX } from "react";


interface BasicsProps {
  openModal: (modal: "lifepath" | "skill" | "trait" | "resource") => void;
}

export function Basics({ openModal }: BasicsProps): JSX.Element {
  const { state, setBasics, setStock } = useBurningCharacter();
  const { stocks } = useRulesetContext();

  const stockOptions = useMemo(() => {
    return stocks.map(stock => ({ value: String(stock.id), label: stock.name })).sort((a, b) => a.label.localeCompare(b.label));
  }, [stocks]);

  const selectedStockObj = useMemo(() => {
    if (!state.basics.stock) return undefined;
    return stocks.find(stock => String(stock.id) === state.basics.stock?.[0]);
  }, [stocks, state.basics.stock]);

  const lifepathsText = state.lifepaths.lifepaths.map(lp => lp.name).join(", ");
  const age = CalculateYearsTotal(state.lifepaths.lifepaths);
  const stride = selectedStockObj?.stride ?? 0;

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="md">
        <Group grow>
          <TextInput
            label="Name"
            placeholder="Character name"
            value={state.basics.name}
            onChange={e => { setBasics({ name: e.currentTarget.value }); }}
          />

          <TextInput
            label="Concept"
            placeholder="Character concept"
            value={state.basics.concept}
            onChange={e => { setBasics({ concept: e.currentTarget.value }); }}
          />
        </Group>

        <Group grow>
          <Select
            label="Stock"
            placeholder="Choose stock"
            data={stockOptions}
            value={state.basics.stock ? state.basics.stock[0] : null}
            onChange={value => {
              if (!value) return;
              const stock = stocks.find(s => String(s.id) === value);
              if (stock) {
                setStock([String(stock.id), stock.name]);
              }
            }}
            searchable
          />

          <Select
            label="Gender"
            placeholder="Choose gender"
            data={["Male", "Female"]}
            value={state.basics.gender}
            onChange={value => {
              if (value === "Male" || value === "Female") {
                setBasics({ gender: value });
              }
            }}
          />
        </Group>

        <Group grow>
          <TextInput label="Age" value={age} disabled />
          <TextInput label="Stride" value={stride} disabled />
        </Group>

        <Textarea
          label="Lifepaths"
          value={lifepathsText}
          disabled
          rows={Math.max(2, Math.ceil(lifepathsText.length / 50))}
        />

        <Group grow>
          <Button onClick={() => { openModal("lifepath"); }}>
            {state.lifepaths.lifepaths.length > 0 ? "Add Lifepath" : "Select Lifepath"}
          </Button>

          <Button variant="default" onClick={() => { openModal("lifepath"); }}>
            Random
          </Button>
        </Group>

        <Text size="sm" c="dimmed">
          {state.lifepaths.lifepaths.length}
          {" "}
          lifepath(s) selected |
          {" "}
          {age}
          {" "}
          total years
        </Text>
      </Stack>
    </Card>
  );
}
