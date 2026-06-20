import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrRulesetId } from "@/types/bwgr/ruleset";
import type { BwgrSkillDBO, BwgrSkillId, BwgrSkillCategoryId, BwgrSkillTypeId, BwgrSkillToolTypeId } from "@/types/bwgr/skill";
import type { BwgrStockId } from "@/types/bwgr/stock";


export async function GetSkillDBOs(rulesets: string[]): Promise<BwgrSkillDBO[]> {
  return await DB
    .selectFrom("bwgr.Skills as s")
    .select([
      sql<BwgrRulesetId[]>`ARRAY(SELECT rs."RulesetId" FROM bwgr."RulesetSkills" rs WHERE rs."SkillId" = s."Id")`.as("Rulesets"),
      sql<BwgrSkillId>`s."Id"`.as("Id"),
      sql<string>`s."Name"`.as("Name"),
      sql<BwgrStockId | null>`s."StockId"`.as("StockId"),
      sql<string | null>`sto."Name"`.as("Stock"),
      sql<BwgrSkillCategoryId>`s."CategoryId"`.as("CategoryId"),
      sql<string>`sc."Name"`.as("Category"),
      sql<BwgrSkillTypeId>`s."TypeId"`.as("TypeId"),
      sql<string>`sty."Name"`.as("Type"),
      sql<BwgrAbilityId[]>`array_remove(ARRAY[s."Root1Id", s."Root2Id"], NULL::integer)`.as("RootIds"),
      sql<string[]>`array_remove(ARRAY[ab1."Name", ab2."Name"], NULL::character varying)`.as("Roots"),
      sql<boolean>`s."DontList"`.as("DontList"),
      sql<boolean>`s."IsMagical"`.as("IsMagical"),
      sql<boolean>`s."IsTraining"`.as("IsTraining"),
      sql<BwgrSkillToolTypeId>`s."ToolTypeId"`.as("ToolTypeId"),
      sql<string>`stt."Name"`.as("Tool"),
      sql<string | null>`s."ToolDescription"`.as("ToolDescription"),
      sql<string | null>`s."Description"`.as("Description"),
      sql<BwgrStockId | null>`s."RestrictionOnlyStockId"`.as("RestrictionOnlyStockId"),
      sql<string | null>`sto2."Name"`.as("RestrictionOnlyStock"),
      sql<boolean | null>`s."RestrictionWhenBurning"`.as("RestrictionWhenBurning"),
      sql<BwgrAbilityId | null>`s."RestrictionAbilityId"`.as("RestrictionAbilityId"),
      sql<string | null>`ab3."Name"`.as("RestrictionAbility"),
      sql<BwgrSkillId[]>`ARRAY(SELECT ss."SubskillId" FROM bwgr."SkillSubskills" ss WHERE ss."SkillId" = s."Id")`.as("SubskillIds")
    ])
    .leftJoin("bwgr.Stocks as sto", "sto.Id", "s.StockId")
    .leftJoin("bwgr.Stocks as sto2", "sto2.Id", "s.RestrictionOnlyStockId")
    .leftJoin("bwgr.SkillCategories as sc", "sc.Id", "s.CategoryId")
    .leftJoin("bwgr.SkillTypes as sty", "sty.Id", "s.TypeId")
    .leftJoin("bwgr.SkillToolTypes as stt", "stt.Id", "s.ToolTypeId")
    .leftJoin("bwgr.Abilities as ab1", "ab1.Id", "s.Root1Id")
    .leftJoin("bwgr.Abilities as ab2", "ab2.Id", "s.Root2Id")
    .leftJoin("bwgr.Abilities as ab3", "ab3.Id", "s.RestrictionAbilityId")
    .where(eb =>
      eb.exists(
        DB.selectFrom("bwgr.RulesetSkills as rs")
          .select("rs.SkillId")
          .where("rs.SkillId", "=", eb.ref("s.Id"))
          .where("rs.RulesetId", "in", rulesets)
      )
    )
    .execute();
}
