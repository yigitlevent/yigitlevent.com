"use client";

import { Badge, Button, Card, Loader, Group, SegmentedControl, Select, Stack, Text, Title } from "@mantine/core";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import { useRulesetContext } from "../../hooks/RulesetContext";
import { useMagicWheel, type BandBlock, type MagicWheelConstants } from "../../hooks/useMagicWheel";
import { GetObstacleString } from "../../utils/GetMagicalObstacleString";

import type { BwgrResource } from "@/types/bwgr/resource";
import type { JSX } from "react";


interface Facet {
  id: unknown;
  name: string;
  obstacle: number;
  actions: number;
  resource: number;
}

type WheelMode = "standard" | "alternative";

interface ResourceMatch {
  resource: BwgrResource;
  obstacleText: string;
}

function ToOption(facet: Facet): { value: string; label: string; } {
  return {
    value: String(facet.id),
    label: `${facet.name} (Ob ${String(facet.obstacle)}, Act ${String(facet.actions)}, Res ${String(facet.resource)})`
  };
}

function DeduplicateFacets(facets: Facet[]): Facet[] {
  const seen = new Set<string>();
  return facets.filter(facet => {
    if (!facet.id || !facet.name) return false;
    const id = JSON.stringify(facet.id);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function GetFacetById(facets: Facet[], id: string | null): Facet | undefined {
  if (!id) return undefined;
  return facets.find(facet => String(facet.id) === id);
}

export function MagicWheel(): JSX.Element {
  const { spellFacets, spellAltFacets, resources } = useRulesetContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<WheelMode>("standard");
  const [originId, setOriginId] = useState<string | null>(null);
  const [elementId, setElementId] = useState<string | null>(null);
  const [primeElementId, setPrimeElementId] = useState<string | null>(null);
  const [lowerElementId, setLowerElementId] = useState<string | null>(null);
  const [higherElementId, setHigherElementId] = useState<string | null>(null);
  const [impetusId, setImpetusId] = useState<string | null>(null);
  const [aoeId, setAoeId] = useState<string | null>(null);
  const [durationId, setDurationId] = useState<string | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>();
  const [facetsSet, setFacetsSet] = useState(false);

  const core = useMemo(() => {
    return {
      origins: DeduplicateFacets(spellFacets.origins as Facet[]),
      elements: DeduplicateFacets(spellFacets.elements as Facet[]),
      impetus: DeduplicateFacets(spellFacets.impetus as Facet[]),
      aoe: DeduplicateFacets(spellFacets.areaOfEffects as Facet[]),
      duration: DeduplicateFacets(spellFacets.duration as Facet[])
    };
  }, [spellFacets]);

  const alt = useMemo(() => {
    return {
      origins: DeduplicateFacets(spellAltFacets.origins as Facet[]),
      primeElements: DeduplicateFacets(spellAltFacets.primeElements as Facet[]),
      lowerElements: DeduplicateFacets(spellAltFacets.lowerElements as Facet[]),
      higherElements: DeduplicateFacets(spellAltFacets.higherElements as Facet[]),
      impetus: DeduplicateFacets(spellAltFacets.impetus as Facet[]),
      aoe: DeduplicateFacets(spellAltFacets.areaOfEffects as Facet[]),
      duration: DeduplicateFacets(spellAltFacets.duration as Facet[])
    };
  }, [spellAltFacets]);

  const [bands, setBands] = useState<Record<string, BandBlock>>(() => {
    const bandKeys = mode === "standard" ? ["origins", "duration", "impetus", "elements", "areaOfEffects"] : ["origins", "duration", "impetus", "primeElements", "lowerElements", "higherElements", "areaOfEffects"];

    return bandKeys.reduce<Record<string, BandBlock>>((acc, key, index) => {
      const facets = mode === "standard" ? core[key as keyof typeof core] : alt[key as keyof typeof alt];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const facetArray = (facets || []);
      acc[key] = {
        index,
        angle: facetArray.length > 0 ? 2 * Math.PI / facetArray.length : 0,
        currentAmount: 0,
        targetAmount: 0,
        items: facetArray.map(f => f.name)
      };
      return acc;
    }, {});
  });

  const availableBands = useMemo(() => {
    return facetsSet ? (mode === "standard" ? ["origins", "duration", "impetus", "elements", "areaOfEffects"] : ["origins", "duration", "impetus", "primeElements", "lowerElements", "higherElements", "areaOfEffects"]) : [];
  }, [facetsSet, mode]);

  const magicWheel = useMagicWheel({
    context,
    bands,
    setBands,
    availableBands
  });

  useEffect(() => {
    const canvasCtx = canvasRef.current?.getContext("2d");
    if (canvasCtx) {
      setContext(canvasCtx);
    }
  }, []);

  const selectedFacets = useMemo(() => {
    if (mode === "standard") {
      return [
        GetFacetById(core.origins, originId),
        GetFacetById(core.elements, elementId),
        GetFacetById(core.impetus, impetusId),
        GetFacetById(core.aoe, aoeId),
        GetFacetById(core.duration, durationId)
      ].filter((facet): facet is Facet => Boolean(facet));
    }

    return [
      GetFacetById(alt.origins, originId),
      GetFacetById(alt.primeElements, primeElementId),
      GetFacetById(alt.lowerElements, lowerElementId),
      GetFacetById(alt.higherElements, higherElementId),
      GetFacetById(alt.impetus, impetusId),
      GetFacetById(alt.aoe, aoeId),
      GetFacetById(alt.duration, durationId)
    ].filter((facet): facet is Facet => Boolean(facet));
  }, [
    mode,
    core,
    alt,
    originId,
    elementId,
    primeElementId,
    lowerElementId,
    higherElementId,
    impetusId,
    aoeId,
    durationId
  ]);

  const totals = useMemo(() => {
    return selectedFacets.reduce(
      (acc, facet) => {
        acc.obstacle += facet.obstacle;
        acc.actions += facet.actions;
        acc.resource += facet.resource;
        return acc;
      },
      { obstacle: 0, actions: 0, resource: 0 }
    );
  }, [selectedFacets]);

  const matchedResources = useMemo<ResourceMatch[]>(() => {
    return resources
      .filter(resource => {
        const magical = resource.magical;
        if (!magical) return false;

        if (originId && String(magical.origin[0]) !== originId) return false;
        if (durationId && String(magical.duration[0]) !== durationId) return false;
        if (aoeId && String(magical.areaOfEffect[0]) !== aoeId) return false;

        const magicalElementIds = magical.elements.map(v => String(v[0]));
        const magicalImpetusIds = magical.impetus.map(v => String(v[0]));

        if (mode === "standard") {
          if (elementId && !magicalElementIds.includes(elementId)) return false;
        }
        else {
          if (primeElementId && !magicalElementIds.includes(primeElementId)) return false;
          if (lowerElementId && !magicalElementIds.includes(lowerElementId)) return false;
          if (higherElementId && !magicalElementIds.includes(higherElementId)) return false;
        }

        if (impetusId && !magicalImpetusIds.includes(impetusId)) return false;

        return true;
      })
      .map(resource => {
        const obstacleText = resource.magical?.obstacleDetails ? GetObstacleString(resource, resource.magical.obstacleDetails) : "-";

        return { resource, obstacleText };
      })
      .sort((a, b) => a.resource.name.localeCompare(b.resource.name));
  }, [
    resources,
    mode,
    originId,
    durationId,
    aoeId,
    elementId,
    primeElementId,
    lowerElementId,
    higherElementId,
    impetusId
  ]);

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="xs">Magic Wheel</Title>
        <Text c="dimmed">Compose spell facets and preview total obstacle, actions, and resource values</Text>
      </div>

      {!facetsSet ? (
        <Card withBorder radius="md" p="md">
          <Stack gap="md">
            <Button onClick={() => { setFacetsSet(true); }} fullWidth>
              Set Facets
            </Button>

            <SegmentedControl
              value={mode}
              onChange={value => {
                setMode(value as WheelMode);
              }}
              data={[
                { label: "Standard", value: "standard" },
                { label: "Alternative", value: "alternative" }
              ]}
            />

            <Group grow>
              <Select
                placeholder="Origin"
                data={(mode === "standard" ? core.origins : alt.origins).map(ToOption)}
                value={originId}
                onChange={setOriginId}
                searchable
                clearable
              />

              {mode === "standard" ? (
                <Select
                  placeholder="Element"
                  data={core.elements.map(ToOption)}
                  value={elementId}
                  onChange={setElementId}
                  searchable
                  clearable
                />
              ) : (
                <Group grow>
                  <Select placeholder="Prime element" data={alt.primeElements.map(ToOption)} value={primeElementId} onChange={setPrimeElementId} searchable clearable />
                  <Select placeholder="Lower element" data={alt.lowerElements.map(ToOption)} value={lowerElementId} onChange={setLowerElementId} searchable clearable />
                  <Select placeholder="Higher element" data={alt.higherElements.map(ToOption)} value={higherElementId} onChange={setHigherElementId} searchable clearable />
                </Group>
              )}
            </Group>

            <Group grow>
              <Select
                placeholder="Impetus"
                data={(mode === "standard" ? core.impetus : alt.impetus).map(ToOption)}
                value={impetusId}
                onChange={setImpetusId}
                searchable
                clearable
              />

              <Select placeholder="Area of effect" data={(mode === "standard" ? core.aoe : alt.aoe).map(ToOption)} value={aoeId} onChange={setAoeId} searchable clearable />
              <Select placeholder="Duration" data={(mode === "standard" ? core.duration : alt.duration).map(ToOption)} value={durationId} onChange={setDurationId} searchable clearable />
            </Group>
          </Stack>
        </Card>
      ) : context ? (
        <Fragment>
          <Card withBorder radius="md" p="md">
            <Button
              onClick={() => { magicWheel.setTargetAmounts(); }}
              disabled={magicWheel.isRotating}
              fullWidth
            >
              {magicWheel.prayed ? "Pray Again" : "Pray to the Lady Luck"}
            </Button>
          </Card>

          <Card withBorder radius="md" p="md">
            <div
              ref={wrapperRef}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              <canvas
                ref={canvasRef}
                height={magicWheel.constants.canvasSize}
                width={magicWheel.constants.canvasSize}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #dee2e6",
                  maxWidth: "100%"
                }}
              />
            </div>
          </Card>
        </Fragment>
      ) : (
        <Card withBorder radius="md" p="md">
          <Loader />
        </Card>
      )}

      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={600}>Spell Totals</Text>

          <Group>
            <Badge color="red" variant="light">{`Obstacle ${String(totals.obstacle)}`}</Badge>
            <Badge color="blue" variant="light">{`Actions ${String(totals.actions)}`}</Badge>
            <Badge color="teal" variant="light">{`Resource ${String(totals.resource)}`}</Badge>
          </Group>

          <Text size="sm" c="dimmed">{`${String(selectedFacets.length)} facets selected`}</Text>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={600}>Matching Resources</Text>
          <Text size="sm" c="dimmed">{`${String(matchedResources.length)} matches`}</Text>

          {matchedResources.map(match => (
            <Card key={String(match.resource.id)} withBorder radius="sm" p="sm">
              <Stack gap="xs">
                <Group justify="space-between" align="flex-start">
                  <Text fw={600}>{match.resource.name}</Text>
                  <Badge variant="outline">{match.resource.type[1]}</Badge>
                </Group>

                <Text size="sm" c="dimmed">{`Stock: ${match.resource.stock[1]}`}</Text>
                <Text size="sm" c="dimmed">{`Obstacle: ${match.obstacleText}`}</Text>
              </Stack>
            </Card>
          ))}

          {matchedResources.length === 0 && (
            <Text size="sm" c="dimmed">No magical resources match current facet selections.</Text>
          )}
        </Stack>
      </Card>

      <Button onClick={() => {
        setFacetsSet(false);
        magicWheel.reset();
        setOriginId(null);
        setElementId(null);
        setPrimeElementId(null);
        setLowerElementId(null);
        setHigherElementId(null);
        setImpetusId(null);
        setAoeId(null);
        setDurationId(null);
      }}
      >
        Reset All
      </Button>
    </Stack>
  );
}
