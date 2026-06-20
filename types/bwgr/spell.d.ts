import type { Nominal } from "../utility/nominal";


export type BwgrOriginFacetId = Nominal<number, "BwgrOriginFacetId">;
export type BwgrDurationFacetId = Nominal<number, "BwgrDurationFacetId">;
export type BwgrAreaOfEffectFacetId = Nominal<number, "BwgrAreaOfEffectFacetId">;
export type BwgrElementFacetId = Nominal<number, "BwgrElementFacetId">;
export type BwgrImpetusFacetId = Nominal<number, "BwgrImpetusFacetId">;

export type ElementCategories = "primeElements" | "lowerElements" | "higherElements";

export interface BwgrFacetDBO<T> {
  Id: T;
  Name: string;
  Obstacle: number;
  Actions: number;
  Resource: number;
  SubFacet?: string;
}

export interface BwgrFacet<T> {
  id: T;
  name: string;
  obstacle: number;
  actions: number;
  resource: number;
  subfacet?: string;
}

export interface BwgrSpellFacets {
  origins: BwgrSpellOriginFacet[];
  elements: BwgrSpellElementFacet[];
  impetus: BwgrSpellImpetusFacet[];
  areaOfEffects: BwgrSpellAreaOfEffectFacet[];
  duration: BwgrSpellDurationFacet[];
}

export interface BwgrAltSpellFacets {
  origins: BwgrSpellOriginFacet[];
  primeElements: BwgrSpellElementFacet[];
  lowerElements: BwgrSpellElementFacet[];
  higherElements: BwgrSpellElementFacet[];
  impetus: BwgrSpellImpetusFacet[];
  areaOfEffects: BwgrSpellAreaOfEffectFacet[];
  duration: BwgrSpellDurationFacet[];
}

export interface BwgrSpellFacetSelected {
  originId: BwgrSpellOriginFacet;
  elementId: BwgrSpellElementFacet;
  impetusId: BwgrSpellImpetusFacet;
  areaOfEffectId: BwgrSpellAreaOfEffectFacet;
  durationId: BwgrSpellDurationFacet;
}
