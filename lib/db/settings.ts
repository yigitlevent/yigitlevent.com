import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { BwgrRulesetId } from "@/types/bwgr/ruleset";
import type { BwgrSettingDBO, BwgrSettingId } from "@/types/bwgr/setting";
import type { BwgrStockId } from "@/types/bwgr/stock";


export async function GetSettingDBOs(rulesets: string[]): Promise<BwgrSettingDBO[]> {
  return await DB
    .selectFrom("bwgr.Settings as s")
    .select([
      sql<BwgrRulesetId[]>`ARRAY(SELECT rs."RulesetId" FROM bwgr."RulesetSettings" rs WHERE rs."SettingId" = s."Id")`.as("Rulesets"),
      sql<BwgrSettingId>`s."Id"`.as("Id"),
      sql<string>`s."Name"`.as("Name"),
      sql<string>`s."NameShort"`.as("NameShort"),
      sql<BwgrStockId>`s."StockId"`.as("StockId"),
      sql<string>`sto."Name"`.as("StockName"),
      sql<boolean>`s."IsSubsetting"`.as("IsSubsetting")
    ])
    .leftJoin("bwgr.Stocks as sto", "sto.Id", "s.StockId")
    .where(eb =>
      eb.exists(
        DB.selectFrom("bwgr.RulesetSettings as rs")
          .select("rs.SettingId")
          .where("rs.SettingId", "=", eb.ref("s.Id"))
          .where("rs.RulesetId", "in", rulesets)
      )
    )
    .execute();
}
