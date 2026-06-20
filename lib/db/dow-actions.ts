import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrActionResolutionDBO, BwgrActionResolutionTypeId, BwgrActionTestDBO, BwgrDoWActionDBO, BwgrDoWActionId } from "@/types/bwgr/actions";
import type { BwgrSkillId } from "@/types/bwgr/skill";


export async function GetDuelOfWitsActionDBOs(): Promise<BwgrDoWActionDBO[]> {
  return await DB
    .selectFrom("bwgr.DuelOfWitsActions as a")
    .select([
      sql<BwgrDoWActionId>`a."Id"`.as("Id"),
      sql<string>`a."Name"`.as("Name"),
      sql<string | null>`a."SpeakingThePart"`.as("SpeakingThePart"),
      sql<string | null>`a."Special"`.as("Special"),
      sql<string | null>`a."Effect"`.as("Effect")
    ])
    .execute();
}

export async function GetDoWActionTestDBOs(): Promise<BwgrActionTestDBO[]> {
  return await DB
    .selectFrom("bwgr.DuelOfWitsActionTests as t")
    .select([
      sql<number>`t."ActionId"`.as("ActionId"),
      sql<BwgrSkillId | null>`t."SkillId"`.as("SkillId"),
      sql<string | null>`s."Name"`.as("Skill"),
      sql<BwgrAbilityId | null>`t."AbilityId"`.as("AbilityId"),
      sql<string | null>`ab."Name"`.as("Ability")
    ])
    .leftJoin("bwgr.Skills as s", "s.Id", "t.SkillId")
    .leftJoin("bwgr.Abilities as ab", "ab.Id", "t.AbilityId")
    .execute();
}

export async function GetDoWActionResolutionDBOs(): Promise<BwgrActionResolutionDBO<BwgrDoWActionId>[]> {
  return await DB
    .selectFrom("bwgr.DuelOfWitsActionResolutions as r")
    .select([
      sql<number>`r."ActionId"`.as("ActionId"),
      sql<BwgrDoWActionId>`r."OpposingActionId"`.as("OpposingActionId"),
      sql<string>`oa."Name"`.as("OpposingAction"),
      sql<BwgrActionResolutionTypeId>`r."ResolutionTypeId"`.as("ResolutionTypeId"),
      sql<string>`rt."Name"`.as("ResolutionType"),
      sql<boolean | null>`r."IsAgainstSkill"`.as("IsAgainstSkill"),
      sql<number | null>`r."Obstacle"`.as("Obstacle"),
      sql<number | null>`r."OpposingModifier"`.as("OpposingModifier"),
      sql<BwgrSkillId | null>`r."SkillId"`.as("SkillId"),
      sql<string>`s."Name"`.as("Skill"),
      sql<BwgrAbilityId | null>`r."AbilityId"`.as("AbilityId"),
      sql<string>`ab."Name"`.as("Ability"),
      sql<BwgrSkillId | null>`r."OpposingSkillId"`.as("OpposingSkillId"),
      sql<string>`os."Name"`.as("OpposingSkill"),
      sql<BwgrAbilityId | null>`r."OpposingAbilityId"`.as("OpposingAbilityId"),
      sql<string>`oab."Name"`.as("OpposingAbility")
    ])
    .leftJoin("bwgr.DuelOfWitsActions as oa", "oa.Id", "r.OpposingActionId")
    .leftJoin("bwgr.ActionResolutionTypes as rt", "rt.Id", "r.ResolutionTypeId")
    .leftJoin("bwgr.Skills as s", "s.Id", "r.SkillId")
    .leftJoin("bwgr.Abilities as ab", "ab.Id", "r.AbilityId")
    .leftJoin("bwgr.Skills as os", "os.Id", "r.OpposingSkillId")
    .leftJoin("bwgr.Abilities as oab", "oab.Id", "r.OpposingAbilityId")
    .execute();
}
