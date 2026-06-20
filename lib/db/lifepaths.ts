import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrLifepathDBO, BwgrLifepathId, BwgrLifepathRequirementBlockDBO, BwgrLifepathRequirementBlockItemDBO } from "@/types/bwgr/lifepath";
import type { BwgrRulesetId } from "@/types/bwgr/ruleset";
import type { BwgrSettingId } from "@/types/bwgr/setting";
import type { BwgrSkillId } from "@/types/bwgr/skill";
import type { BwgrStockId } from "@/types/bwgr/stock";
import type { BwgrTraitId } from "@/types/bwgr/trait";


export async function GetLifepathDBOs(rulesets: string[]): Promise<BwgrLifepathDBO[]> {
  return await DB
    .selectFrom("bwgr.Lifepaths as l")
    .select([
      sql<BwgrRulesetId[]>`ARRAY(SELECT rl."RulesetId" FROM bwgr."RulesetLifepaths" rl WHERE rl."LifepathId" = l."Id")`.as("Rulesets"),
      sql<BwgrLifepathId>`l."Id"`.as("Id"),
      sql<string>`l."Name"`.as("Name"),
      sql<BwgrStockId>`l."StockId"`.as("StockId"),
      sql<string>`sto."Name"`.as("Stock"),
      sql<BwgrSettingId>`l."SettingId"`.as("SettingId"),
      sql<string>`set."Name"`.as("Setting"),
      sql<BwgrSettingId[]>`ARRAY(SELECT ll."SettingId" FROM bwgr."LifepathLeads" ll WHERE ll."LifepathId" = l."Id")`.as("LeadIds"),
      sql<BwgrSkillId[]>`ARRAY(SELECT ls."SkillId" FROM bwgr."LifepathSkills" ls WHERE ls."LifepathId" = l."Id" ORDER BY ls."Index")`.as("SkillIds"),
      sql<BwgrTraitId[]>`ARRAY(SELECT lt."TraitId" FROM bwgr."LifepathTraits" lt WHERE lt."LifepathId" = l."Id" ORDER BY lt."Index")`.as("TraitIds"),
      sql<boolean>`l."Born"`.as("Born"),
      sql<number[]>`l."Years"`.as("Years"),
      sql<number>`l."EitherPool"`.as("EitherPool"),
      sql<number>`l."MentalPool"`.as("MentalPool"),
      sql<number>`l."PhysicalPool"`.as("PhysicalPool"),
      sql<number>`l."GeneralSkillPool"`.as("GeneralSkillPool"),
      sql<number>`l."LifepathSkillPool"`.as("LifepathSkillPool"),
      sql<number>`l."TraitPool"`.as("TraitPool"),
      sql<number>`l."ResourcePoints"`.as("ResourcePoints"),
      sql<boolean>`l."IsGSPMultiplier"`.as("IsGSPMultiplier"),
      sql<boolean>`l."IsLSPMultiplier"`.as("IsLSPMultiplier"),
      sql<boolean>`l."IsRPMultiplier"`.as("IsRPMultiplier"),
      sql<boolean>`l."HalfGSPFromPrev"`.as("HalfGSPFromPrev"),
      sql<boolean>`l."HalfLSPFromPrev"`.as("HalfLSPFromPrev"),
      sql<boolean>`l."HalfRPFromPrev"`.as("HalfRPFromPrev"),
      sql<string | null>`l."RequirementText"`.as("RequirementText"),
      sql<string | null>`com."CompanionName"`.as("CompanionName"),
      sql<boolean | null>`com."GivesSkills"`.as("CompanionGivesSkills"),
      sql<number | null>`com."GSPMultiplier"`.as("CompanionGSPMultiplier"),
      sql<number | null>`com."LSPMultiplier"`.as("CompanionLSPMultiplier"),
      sql<number | null>`com."RPMultiplier"`.as("CompanionRPMultiplier"),
      sql<BwgrSettingId[]>`ARRAY(SELECT cs."CompanionSettingId" FROM bwgr."LifepathCompanionSettings" cs WHERE cs."LifepathId" = l."Id")`.as("CompanionSettingIds")
    ])
    .leftJoin("bwgr.Stocks as sto", "sto.Id", "l.StockId")
    .leftJoin("bwgr.Settings as set", "set.Id", "l.SettingId")
    .leftJoin("bwgr.LifepathCompanions as com", "com.LifepathId", "l.Id")
    .where(eb =>
      eb.exists(
        DB.selectFrom("bwgr.RulesetLifepaths as rl")
          .select("rl.LifepathId")
          .where("rl.LifepathId", "=", eb.ref("l.Id"))
          .where("rl.RulesetId", "in", rulesets)
      )
    )
    .execute();
}

export async function GetLifepathRequirementBlockDBOs(): Promise<BwgrLifepathRequirementBlockDBO[]> {
  return await DB
    .selectFrom("bwgr.LifepathRequirements as lr")
    .select([
      sql<number>`lr."Id"`.as("Id"),
      sql<number>`lr."LifepathId"`.as("LifepathId"),
      sql<number>`lr."LogicTypeId"`.as("LogicTypeId"),
      sql<string>`lt."Name"`.as("LogicType"),
      sql<boolean>`lr."MustFulfill"`.as("MustFulfill"),
      sql<number>`lr."FulfillmentAmount"`.as("FulfillmentAmount")
    ])
    .innerJoin("bwgr.LogicTypes as lt", "lt.Id", "lr.LogicTypeId")
    .execute();
}

export async function GetLifepathRequirementBlockItemDBOs(): Promise<BwgrLifepathRequirementBlockItemDBO[]> {
  return await DB
    .selectFrom("bwgr.LifepathRequirementItems as li")
    .select([
      sql<number>`li."RequirementId"`.as("RequirementId"),
      sql<number>`li."RequirementTypeId"`.as("RequirementTypeId"),
      sql<string>`rit."Name"`.as("RequirementType"),
      sql<boolean>`li."ForCompanion"`.as("ForCompanion"),
      sql<number | null>`li."Min"`.as("Min"),
      sql<number | null>`li."Max"`.as("Max"),
      sql<BwgrSettingId | null>`li."SettingId"`.as("SettingId"),
      sql<string | null>`set."Name"`.as("Setting"),
      sql<BwgrLifepathId | null>`li."LifepathId"`.as("LifepathId"),
      sql<string | null>`lp."Name"`.as("Lifepath"),
      sql<BwgrSkillId | null>`li."SkillId"`.as("SkillId"),
      sql<string | null>`ski."Name"`.as("Skill"),
      sql<BwgrTraitId | null>`li."TraitId"`.as("TraitId"),
      sql<string | null>`tra."Name"`.as("Trait"),
      sql<BwgrAbilityId | null>`li."AttributeId"`.as("AttributeId"),
      sql<string | null>`abi."Name"`.as("Attribute")
    ])
    .innerJoin("bwgr.RequirementItemTypes as rit", "rit.Id", "li.RequirementTypeId")
    .leftJoin("bwgr.Settings as set", "set.Id", "li.SettingId")
    .leftJoin("bwgr.Lifepaths as lp", "lp.Id", "li.LifepathId")
    .leftJoin("bwgr.Skills as ski", "ski.Id", "li.SkillId")
    .leftJoin("bwgr.Traits as tra", "tra.Id", "li.TraitId")
    .leftJoin("bwgr.Abilities as abi", "abi.Id", "li.AttributeId")
    .execute();
}
