import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrRulesetId } from "@/types/bwgr/ruleset";
import type { BwgrSettingId } from "@/types/bwgr/setting";
import type { BwgrStockDBO, BwgrAgePoolDBO, BwgrStockId } from "@/types/bwgr/stock";


export async function GetStocksDBOs(rulesets: string[]): Promise<BwgrStockDBO[]> {
  return await DB
    .selectFrom("bwgr.Stocks as s")
    .select([
      sql<BwgrRulesetId[]>`ARRAY(SELECT rs."RulesetId" FROM bwgr."RulesetStocks" rs WHERE rs."StockId" = s."Id")`.as("Rulesets"),
      sql<BwgrStockId>`s."Id"`.as("Id"),
      sql<string>`s."Name"`.as("Name"),
      sql<string>`s."NamePlural"`.as("NamePlural"),
      sql<number>`s."Stride"`.as("Stride"),
      sql<BwgrSettingId[]>`ARRAY(SELECT ss."Id" FROM bwgr."Settings" ss WHERE ss."StockId" = s."Id")`.as("SettingIds")
    ])
    .where(eb =>
      eb.exists(
        DB.selectFrom("bwgr.RulesetStocks as rs")
          .select("rs.StockId")
          .where("rs.StockId", "=", eb.ref("s.Id"))
          .where("rs.RulesetId", "in", rulesets)
      )
    )
    .execute();
}

export async function GetAgePools(): Promise<BwgrAgePoolDBO[]> {
  return await DB
    .selectFrom("bwgr.AgePools as ap")
    .select(["Id", sql<BwgrStockId>`ap."StockId"`.as("StockId"), "MinAge", "MentalPool", "PhysicalPool"])
    .execute();
}
