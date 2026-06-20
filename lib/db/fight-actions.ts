import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrActionResolutionDBO, BwgrActionResolutionTypeId, BwgrActionTestDBO, BwgrFightActionDBO, BwgrFightActionGroupId, BwgrFightActionId } from "@/types/bwgr/actions";
import type { BwgrSkillId } from "@/types/bwgr/skill";


export async function GetFightActionDBOs(): Promise<BwgrFightActionDBO[]> {
  return await DB
    .selectFrom("bwgr.FightActions as a")
    .select([
      sql<BwgrFightActionId>`a."Id"`.as("Id"),
      sql<string>`a."Name"`.as("Name"),
      sql<BwgrFightActionGroupId>`a."GroupId"`.as("GroupId"),
      sql<string>`g."Name"`.as("Group"),
      sql<number | null>`a."ActionCost"`.as("ActionCost"),
      sql<string | null>`a."TestExtra"`.as("TestExtra"),
      sql<string | null>`a."Restrictions"`.as("Restrictions"),
      sql<string | null>`a."Effect"`.as("Effect"),
      sql<string | null>`a."Special"`.as("Special"),
      sql<boolean>`a."CountsAsNoAction"`.as("CountsAsNoAction")
    ])
    .leftJoin("bwgr.FightActionGroups as g", "g.Id", "a.GroupId")
    .execute();
}

export async function GetFightActionTestDBOs(): Promise<BwgrActionTestDBO[]> {
  return await DB
    .selectFrom("bwgr.FightActionTests as t")
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

export async function GetFightActionResolutionDBOs(): Promise<BwgrActionResolutionDBO<BwgrFightActionId>[]> {
  return await DB
    .selectFrom("bwgr.FightActionResolutions as r")
    .select([
      sql<number>`r."ActionId"`.as("ActionId"),
      sql<BwgrFightActionId>`r."OpposingActionId"`.as("OpposingActionId"),
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
    .leftJoin("bwgr.FightActions as oa", "oa.Id", "r.OpposingActionId")
    .leftJoin("bwgr.ActionResolutionTypes as rt", "rt.Id", "r.ResolutionTypeId")
    .leftJoin("bwgr.Skills as s", "s.Id", "r.SkillId")
    .leftJoin("bwgr.Abilities as ab", "ab.Id", "r.AbilityId")
    .leftJoin("bwgr.Skills as os", "os.Id", "r.OpposingSkillId")
    .leftJoin("bwgr.Abilities as oab", "oab.Id", "r.OpposingAbilityId")
    .execute();
}
