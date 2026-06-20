import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrAbilityDBO, BwgrAbilityId, BwgrAbilityTypeId } from "@/types/bwgr/ability";
import type { BwgrTraitId } from "@/types/bwgr/trait";


export async function GetAbilityDBOs(): Promise<BwgrAbilityDBO[]> {
  return await DB
    .selectFrom("bwgr.Abilities as a")
    .select([
      sql<BwgrAbilityId>`a."Id"`.as("Id"),
      "a.Name",
      sql<BwgrAbilityTypeId>`a."AbilityTypeId"`.as("AbilityTypeId"),
      sql<string>`at."Name"`.as("AbilityType"),
      "a.HasShades",
      "a.Cycle",
      "a.Routine",
      "a.Difficult",
      "a.Challenging",
      sql<BwgrTraitId | null>`a."RequiredTraitId"`.as("RequiredTraitId"),
      sql<string | null>`t."Name"`.as("RequiredTrait")
    ])
    .leftJoin("bwgr.AbilityTypes as at", "at.Id", "a.AbilityTypeId")
    .leftJoin("bwgr.Traits as t", "t.Id", "a.RequiredTraitId")
    .execute();
}
