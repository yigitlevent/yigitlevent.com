import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrResourceDBO, BwgrResourceId, BwgrResourceTypeId, BwgrResourceMagicDetailsDBO, BwgrResourceMagicObstaclesDBO } from "@/types/bwgr/resource";
import type { BwgrRulesetId } from "@/types/bwgr/ruleset";
import type { BwgrOriginFacetId, BwgrDurationFacetId, BwgrAreaOfEffectFacetId, BwgrElementFacetId, BwgrImpetusFacetId } from "@/types/bwgr/spell";
import type { BwgrStockId } from "@/types/bwgr/stock";
import type { DistanceUnitId, UnitModifierId } from "@/types/utility/units";


export async function GetResourceDBOs(rulesets: string[]): Promise<BwgrResourceDBO[]> {
  return await DB
    .selectFrom("bwgr.Resources as r")
    .select([
      sql<BwgrRulesetId[]>`ARRAY(SELECT rr."RulesetId" FROM bwgr."RulesetResources" rr WHERE rr."ResourceId" = r."Id")`.as("Rulesets"),
      sql<BwgrResourceId>`r."Id"`.as("Id"),
      sql<string>`r."Name"`.as("Name"),
      sql<BwgrStockId>`r."StockId"`.as("StockId"),
      sql<string>`(SELECT s."Name" FROM bwgr."Stocks" s WHERE s."Id" = r."StockId")`.as("Stock"),
      sql<BwgrResourceTypeId>`r."ResourceTypeId"`.as("ResourceTypeId"),
      sql<string>`(SELECT rt."Name" FROM bwgr."ResourceTypes" rt WHERE rt."Id" = r."ResourceTypeId")`.as("ResourceType"),
      sql<string>`r."Description"`.as("Description"),
      sql<boolean>`r."VariableCost"`.as("VariableCost"),
      sql<number[]>`ARRAY(SELECT rc."Cost" FROM bwgr."ResourceCosts" rc WHERE r."Id" = rc."ResourceId" ORDER BY rc."Id")`.as("Costs"),
      sql<string[]>`array_remove(ARRAY(SELECT rc."Description" FROM bwgr."ResourceCosts" rc WHERE r."Id" = rc."ResourceId" ORDER BY rc."Id"), NULL::character varying)`.as("CostDescriptions"),
      sql<number[]>`ARRAY(SELECT rc."Cost" FROM bwgr."ResourceModifiers" rc WHERE r."Id" = rc."ResourceId" ORDER BY rc."Id")`.as("Modifiers"),
      sql<boolean[]>`ARRAY(SELECT rc."IsPerCost" FROM bwgr."ResourceModifiers" rc WHERE r."Id" = rc."ResourceId" ORDER BY rc."Id")`.as("ModifierIsPerCosts"),
      sql<string[]>`ARRAY(SELECT rc."Description" FROM bwgr."ResourceModifiers" rc WHERE r."Id" = rc."ResourceId" ORDER BY rc."Id")`.as("ModifierDescriptions")
    ])
    .where(eb =>
      eb.exists(
        DB.selectFrom("bwgr.RulesetResources as rr")
          .select("rr.ResourceId")
          .where("rr.ResourceId", "=", eb.ref("r.Id"))
          .where("rr.RulesetId", "in", rulesets)
      )
    )
    .execute();
}

export async function GetResourceMagicDetailDBOs(): Promise<BwgrResourceMagicDetailsDBO[]> {
  return await DB
    .selectFrom("bwgr.ResourceMagicDetails as rmd")
    .select([
      sql<BwgrResourceId>`rmd."Id"`.as("Id"),
      sql<BwgrResourceId>`rmd."ResourceId"`.as("ResourceId"),
      sql<BwgrOriginFacetId>`rmd."OriginId"`.as("OriginId"),
      sql<string>`(SELECT sof."Name" FROM bwgr."SpellOriginFacets" sof WHERE sof."Id" = rmd."OriginId")`.as("Origin"),
      sql<BwgrDurationFacetId>`rmd."DurationId"`.as("DurationId"),
      sql<string>`(SELECT sdf."Name" FROM bwgr."SpellDurationFacets" sdf WHERE sdf."Id" = rmd."DurationId")`.as("Duration"),
      sql<BwgrAreaOfEffectFacetId>`rmd."AreaOfEffectId"`.as("AreaOfEffectId"),
      sql<string>`(SELECT saf."Name" FROM bwgr."SpellAreaOfEffectFacets" saf WHERE saf."Id" = rmd."AreaOfEffectId")`.as("AreaOfEffect"),
      sql<DistanceUnitId | null>`rmd."AreaOfEffectUnitId"`.as("AreaOfEffectUnitId"),
      sql<string>`(SELECT du."Name" FROM bwgr."DistanceUnits" du WHERE du."Id" = rmd."AreaOfEffectUnitId")`.as("AreaOfEffectUnit"),
      sql<UnitModifierId | null>`rmd."AreaOfEffectModifierId"`.as("AreaOfEffectModifierId"),
      sql<string>`(SELECT um."Name" FROM bwgr."UnitModifiers" um WHERE um."Id" = rmd."AreaOfEffectModifierId")`.as("AreaofEffectModifier"),
      sql<BwgrElementFacetId>`rmd."Element1Id"`.as("Element1Id"),
      sql<string>`(SELECT sef1."Name" FROM bwgr."SpellElementFacets" sef1 WHERE sef1."Id" = rmd."Element1Id")`.as("Element1"),
      sql<BwgrElementFacetId | null>`rmd."Element2Id"`.as("Element2Id"),
      sql<string>`(SELECT sef2."Name" FROM bwgr."SpellElementFacets" sef2 WHERE sef2."Id" = rmd."Element2Id")`.as("Element2"),
      sql<BwgrElementFacetId | null>`rmd."Element3Id"`.as("Element3Id"),
      sql<string>`(SELECT sef3."Name" FROM bwgr."SpellElementFacets" sef3 WHERE sef3."Id" = rmd."Element3Id")`.as("Element3"),
      sql<BwgrImpetusFacetId>`rmd."Impetus1Id"`.as("Impetus1Id"),
      sql<string>`(SELECT sif1."Name" FROM bwgr."SpellImpetusFacets" sif1 WHERE sif1."Id" = rmd."Impetus1Id")`.as("Impetus1"),
      sql<BwgrImpetusFacetId | null>`rmd."Impetus2Id"`.as("Impetus2Id"),
      sql<string>`(SELECT sif2."Name" FROM bwgr."SpellImpetusFacets" sif2 WHERE sif2."Id" = rmd."Impetus2Id")`.as("Impetus2"),
      sql<number>`rmd."Actions"`.as("Actions"),
      sql<boolean>`rmd."ActionsMultiply"`.as("ActionsMultiply")
    ])
    .leftJoin("bwgr.SpellOriginFacets as sof", "sof.Id", "rmd.OriginId")
    .leftJoin("bwgr.SpellDurationFacets as sdf", "sdf.Id", "rmd.DurationId")
    .leftJoin("bwgr.SpellAreaOfEffectFacets as saf", "saf.Id", "rmd.AreaOfEffectId")
    .leftJoin("bwgr.SpellElementFacets as sef1", "sef1.Id", "rmd.Element1Id")
    .leftJoin("bwgr.SpellElementFacets as sef2", "sef2.Id", "rmd.Element2Id")
    .leftJoin("bwgr.SpellElementFacets as sef3", "sef3.Id", "rmd.Element3Id")
    .leftJoin("bwgr.SpellImpetusFacets as sif1", "sif1.Id", "rmd.Impetus1Id")
    .leftJoin("bwgr.SpellImpetusFacets as sif2", "sif2.Id", "rmd.Impetus2Id")
    .leftJoin("bwgr.DistanceUnits as du", "du.Id", "rmd.AreaOfEffectUnitId")
    .leftJoin("bwgr.UnitModifiers as um", "um.Id", "rmd.AreaOfEffectModifierId")
    .execute();
}

export async function GetResourceMagicObstacleDBOs(): Promise<BwgrResourceMagicObstaclesDBO[]> {
  return await DB
    .selectFrom("bwgr.ResourceMagicObstacles as rmo")
    .select([
      sql<BwgrResourceId>`rmo."Id"`.as("Id"),
      sql<BwgrResourceId>`rmo."ResourceId"`.as("ResourceId"),
      sql<number>`rmo."Obstacle"`.as("Obstacle"),
      sql<BwgrAbilityId | null>`rmo."ObstacleAbility1Id"`.as("ObstacleAbility1Id"),
      sql<string>`(SELECT a1."Name" FROM bwgr."Abilities" a1 WHERE a1."Id" = rmo."ObstacleAbility1Id")`.as("ObstacleAbility1"),
      sql<BwgrAbilityId | null>`rmo."ObstacleAbility2Id"`.as("ObstacleAbility2Id"),
      sql<string>`(SELECT a2."Name" FROM bwgr."Abilities" a2 WHERE a2."Id" = rmo."ObstacleAbility2Id")`.as("ObstacleAbility2"),
      sql<boolean>`rmo."ObstacleCaret"`.as("ObstacleCaret"),
      sql<string>`rmo."Description"`.as("Description")
    ])
    .leftJoin("bwgr.Abilities as a1", "a1.Id", "rmo.ObstacleAbility1Id")
    .leftJoin("bwgr.Abilities as a2", "a2.Id", "rmo.ObstacleAbility2Id")
    .execute();
}
