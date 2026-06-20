import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrActionResolutionTypeId, BwgrRaCActionDBO, BwgrRaCActionGroupId, BwgrRaCActionId, BwgrRaCActionResolutionDBO } from "@/types/bwgr/actions";
import type { BwgrSkillId } from "@/types/bwgr/skill";


export async function GetRangeAndCoverActionDBOs(): Promise<BwgrRaCActionDBO[]> {
  return await DB
    .selectFrom("bwgr.RangeAndCoverActions as r")
    .select([
      sql<BwgrRaCActionId>`r."Id"`.as("Id"),
      "r.Name",
      sql<BwgrRaCActionGroupId>`r."GroupId"`.as("GroupId"),
      sql<string>`(SELECT rg."Name" FROM bwgr."RangeAndCoverActionGroups" rg WHERE rg."Id" = r."GroupId")`.as("Group"),
      sql<boolean>`r."UseFoRKs"`.as("UseForks"),
      sql<boolean>`r."UseWeaponRangeAdvantage"`.as("UseWeaponRangeAdvantage"),
      sql<boolean>`r."UsePositionAdvantage"`.as("UsePositionAdvantage"),
      sql<boolean>`r."UseStrideAdvantage"`.as("UseStrideAdvantage"),
      sql<boolean>`r."IsOpenEnded"`.as("IsOpenEnded"),
      sql<string>`r."Effect"`.as("Effect"),
      sql<string>`r."SpecialRestriction"`.as("SpecialRestriction"),
      sql<string>`r."SpecialAction"`.as("SpecialAction"),
      sql<string>`r."However"`.as("However")
    ])
    .leftJoin("bwgr.RangeAndCoverActionGroups as rg", "rg.Id", "r.GroupId")
    .execute();
}

export async function GetRangeAndCoverActionResolutionDBOs(): Promise<BwgrRaCActionResolutionDBO[]> {
  return await DB
    .selectFrom("bwgr.RangeAndCoverActionResolutions as a")
    .select([
      sql<number>`a."ActionId"`.as("ActionId"),
      sql<BwgrRaCActionId>`a."OpposingActionId"`.as("OpposingActionId"),
      sql<string>`(SELECT oa."Name" FROM bwgr."RangeAndCoverActions" oa WHERE oa."Id" = a."OpposingActionId")`.as("OpposingAction"),
      sql<BwgrActionResolutionTypeId>`a."ResolutionTypeId"`.as("ResolutionTypeId"),
      sql<string>`(SELECT rt."Name" FROM bwgr."ActionResolutionTypes" rt WHERE rt."Id" = a."ResolutionTypeId")`.as("ResolutionType"),
      sql<boolean>`a."IsAgainstSkill"`.as("IsAgainstSkill"),
      sql<number>`a."Obstacle"`.as("Obstacle"),
      sql<number>`a."OpposingModifier"`.as("OpposingModifier"),
      sql<BwgrSkillId>`a."SkillId"`.as("SkillId"),
      sql<string>`(SELECT s."Name" FROM bwgr."Skills" s WHERE s."Id" = a."SkillId")`.as("Skill"),
      sql<BwgrAbilityId>`a."AbilityId"`.as("AbilityId"),
      sql<string>`(SELECT ab."Name" FROM bwgr."Abilities" ab WHERE ab."Id" = a."AbilityId")`.as("Ability"),
      sql<BwgrSkillId>`a."OpposingSkillId"`.as("OpposingSkillId"),
      sql<string>`(SELECT os."Name" FROM bwgr."Skills" os WHERE os."Id" = a."OpposingSkillId")`.as("OpposingSkill"),
      sql<BwgrAbilityId>`a."OpposingAbilityId"`.as("OpposingAbilityId"),
      sql<string>`(SELECT oab."Name" FROM bwgr."Abilities" oab WHERE oab."Id" = a."OpposingAbilityId")`.as("OpposingAbility")
    ])
    .leftJoin("bwgr.RangeAndCoverActions as oa", "oa.Id", "a.OpposingActionId")
    .leftJoin("bwgr.ActionResolutionTypes as rt", "rt.Id", "a.ResolutionTypeId")
    .leftJoin("bwgr.Skills as s", "s.Id", "a.SkillId")
    .leftJoin("bwgr.Skills as os", "os.Id", "a.OpposingSkillId")
    .leftJoin("bwgr.Abilities as ab", "ab.Id", "a.AbilityId")
    .leftJoin("bwgr.Abilities as oab", "oab.Id", "a.OpposingAbilityId")
    .execute();
}
