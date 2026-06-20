import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrRulesetId } from "@/types/bwgr/ruleset";
import type { BwgrStockId } from "@/types/bwgr/stock";
import type { BwgrTraitCategoryId, BwgrTraitDBO, BwgrTraitId, BwgrTraitTypeId } from "@/types/bwgr/trait";


export async function GetTraitDBOs(rulesets: string[]): Promise<BwgrTraitDBO[]> {
  return await DB
    .selectFrom("bwgr.Traits as t")
    .select([
      sql<BwgrRulesetId[]>`ARRAY(SELECT rt."RulesetId" FROM bwgr."RulesetTraits" rt WHERE rt."TraitId" = t."Id")`.as("Rulesets"),
      sql<BwgrTraitId>`t."Id"`.as("Id"),
      sql<string>`t."Name"`.as("Name"),
      sql<BwgrStockId | null>`t."StockId"`.as("StockId"),
      sql<string | null>`sto."Name"`.as("Stock"),
      sql<BwgrTraitCategoryId>`t."CategoryId"`.as("CategoryId"),
      sql<string>`tc."Name"`.as("Category"),
      sql<BwgrTraitTypeId>`t."TypeId"`.as("TypeId"),
      sql<string>`tty."Name"`.as("Type"),
      sql<number>`t."Cost"`.as("Cost"),
      sql<string | null>`t."Description"`.as("Description")
    ])
    .leftJoin("bwgr.Stocks as sto", "sto.Id", "t.StockId")
    .leftJoin("bwgr.TraitCategories as tc", "tc.Id", "t.CategoryId")
    .leftJoin("bwgr.TraitTypes as tty", "tty.Id", "t.TypeId")
    .where(eb =>
      eb.exists(
        DB.selectFrom("bwgr.RulesetTraits as rt")
          .select("rt.TraitId")
          .where("rt.TraitId", "=", eb.ref("t.Id"))
          .where("rt.RulesetId", "in", rulesets)
      )
    )
    .execute();
}
