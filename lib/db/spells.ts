import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrFacetDBO, BwgrOriginFacetId, BwgrElementFacetId, BwgrImpetusFacetId, BwgrDurationFacetId, BwgrAreaOfEffectFacetId } from "@/types/bwgr/spell";


export async function GetSpellOriginFacetDBOs(): Promise<BwgrFacetDBO<BwgrOriginFacetId>[]> {
  return await DB
    .selectFrom("bwgr.SpellOriginFacets")
    .select([sql<BwgrOriginFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetSpellElementFacetDBOs(): Promise<BwgrFacetDBO<BwgrElementFacetId>[]> {
  return await DB
    .selectFrom("bwgr.SpellElementFacets")
    .select([sql<BwgrElementFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetSpellImpetusFacetDBOs(): Promise<BwgrFacetDBO<BwgrImpetusFacetId>[]> {
  return await DB
    .selectFrom("bwgr.SpellImpetusFacets")
    .select([sql<BwgrImpetusFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetSpellDurationFacetDBOs(): Promise<BwgrFacetDBO<BwgrDurationFacetId>[]> {
  return await DB
    .selectFrom("bwgr.SpellDurationFacets")
    .select([sql<BwgrDurationFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetSpellAreaOfEffectFacetDBOs(): Promise<BwgrFacetDBO<BwgrAreaOfEffectFacetId>[]> {
  return await DB
    .selectFrom("bwgr.SpellAreaOfEffectFacets")
    .select([sql<BwgrAreaOfEffectFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetAltSpellOriginFacetDBOs(): Promise<BwgrFacetDBO<BwgrOriginFacetId>[]> {
  return await DB
    .selectFrom("bwgr.AltSpellOriginFacets")
    .select([sql<BwgrOriginFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetAltSpellPrimeElementFacetDBOs(): Promise<BwgrFacetDBO<BwgrElementFacetId>[]> {
  return await DB
    .selectFrom("bwgr.AltSpellPrimeElementFacets")
    .select([sql<BwgrElementFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetAltSpellSecondaryElementFacetDBOs(): Promise<BwgrFacetDBO<BwgrElementFacetId>[]> {
  return await DB
    .selectFrom("bwgr.AltSpellLowerElementFacets")
    .select([sql<BwgrElementFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetAltSpellTertiaryElementFacetDBOs(): Promise<BwgrFacetDBO<BwgrElementFacetId>[]> {
  return await DB
    .selectFrom("bwgr.AltSpellHigherElementFacets")
    .select([sql<BwgrElementFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetAltSpellImpetusFacetDBOs(): Promise<BwgrFacetDBO<BwgrImpetusFacetId>[]> {
  return await DB
    .selectFrom("bwgr.AltSpellLawFacets")
    .select([sql<BwgrImpetusFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource"])
    .execute();
}

export async function GetAltSpellDurationFacetDBOs(): Promise<BwgrFacetDBO<BwgrDurationFacetId>[]> {
  return await DB
    .selectFrom("bwgr.AltSpellDurationFacets")
    .select([sql<BwgrDurationFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource", sql<string | undefined>`"SubFacet"`.as("SubFacet")])
    .execute();
}

export async function GetAltSpellAreaOfEffectFacetDBOs(): Promise<BwgrFacetDBO<BwgrAreaOfEffectFacetId>[]> {
  return await DB
    .selectFrom("bwgr.AltSpellAreaOfEffectFacets")
    .select([sql<BwgrAreaOfEffectFacetId>`"Id"`.as("Id"), "Name", "Obstacle", "Actions", "Resource", sql<string | undefined>`"SubFacet"`.as("SubFacet")])
    .execute();
}
