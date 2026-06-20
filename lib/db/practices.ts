import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrPracticeDBO, BwgrPracticeId } from "@/types/bwgr/practice";
import type { BwgrQuestionDBO, BwgrQuestionId } from "@/types/bwgr/question";
import type { BwgrSkillTypeId } from "@/types/bwgr/skill";


export async function GetPracticeDBOs(): Promise<BwgrPracticeDBO[]> {
  return await DB
    .selectFrom(
      DB
        .selectFrom("bwgr.Abilities as a")
        .select([
          sql<BwgrAbilityId | null>`a."Id"`.as("AbilityId"),
          sql<string | null>`a."Name"`.as("Ability"),
          sql<BwgrSkillTypeId | null>`NULL::integer`.as("SkillTypeId"),
          sql<string | null>`NULL::character varying`.as("SkillType"),
          "a.Cycle",
          "a.Routine",
          "a.Difficult",
          "a.Challenging"
        ])
        .where("a.Cycle", "is not", null)
        .union(qb =>
          qb
            .selectFrom("bwgr.SkillTypes as st")
            .select([
              sql<BwgrAbilityId | null>`NULL::integer`.as("AbilityId"),
              sql<string | null>`NULL::character varying`.as("Ability"),
              sql<BwgrSkillTypeId | null>`st."Id"`.as("SkillTypeId"),
              sql<string | null>`st."Name"`.as("SkillType"),
              "st.Cycle",
              "st.Routine",
              "st.Difficult",
              "st.Challenging"
            ])
            .where("st.Cycle", "is not", null)
        )
        .as("x")
    )
    .select([
      sql<BwgrPracticeId>`row_number() over (order by x."SkillTypeId", x."AbilityId")`.as("Id"),
      sql<BwgrAbilityId | null>`x."AbilityId"`.as("AbilityId"),
      sql<string | null>`x."Ability"`.as("Ability"),
      sql<BwgrSkillTypeId | null>`x."SkillTypeId"`.as("SkillTypeId"),
      sql<string | null>`x."SkillType"`.as("SkillType"),
      sql<number>`x."Cycle"`.as("Cycle"),
      sql<number>`x."Routine"`.as("Routine"),
      sql<number>`x."Difficult"`.as("Difficult"),
      sql<number>`x."Challenging"`.as("Challenging")
    ])
    .execute();
}

export async function GetQuestionDBOs(): Promise<BwgrQuestionDBO[]> {
  return await DB
    .selectFrom("bwgr.Questions as q")
    .select([
      sql<BwgrQuestionId>`q."Id"`.as("Id"),
      sql<string>`q."Name"`.as("Name"),
      sql<string>`q."Question"`.as("Question"),
      sql<BwgrAbilityId | null>`q."AttributeId1"`.as("AttributeId1"),
      sql<BwgrAbilityId | null>`q."AttributeId2"`.as("AttributeId2"),
      sql<string | null>`a1."Name"`.as("AttributeName1"),
      sql<string | null>`a2."Name"`.as("AttributeName2")
    ])
    .leftJoin("bwgr.Abilities as a1", "a1.Id", "q.AttributeId1")
    .leftJoin("bwgr.Abilities as a2", "a2.Id", "q.AttributeId2")
    .execute();
}
