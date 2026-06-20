import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrRulesetDBO, BwgrRulesetId } from "@/types/bwgr/ruleset";


export async function GetRulesetDBOs(): Promise<BwgrRulesetDBO[]> {
  return await DB
    .selectFrom("bwgr.Rulesets as r")
    .select([
      sql<BwgrRulesetId>`r."Id"`.as("Id"),
      "Name",
      "IsOfficial",
      "IsPublic",
      "IsExpansion",
      "User",
      sql<BwgrRulesetId[]>`ARRAY(SELECT re."ExpansionId" FROM bwgr."RulesetExpansions" re WHERE r."Id"::text = re."RulesetId"::text)`.as("ExpansionIds")
    ])
    .execute();
}
