import type { Nominal } from "../utility/nominal";


export type BwgrSettingId = Nominal<number, "BwgrSettingId">;

export interface BwgrSettingDBO {
  Rulesets: BwgrRulesetId[];
  Id: BwgrSettingId;
  Name: string;
  NameShort: string;
  StockId: BwgrStockId;
  StockName: string;
  IsSubsetting: boolean;
}

export interface BwgrSetting {
  rulesets: BwgrRulesetId[];
  id: BwgrSettingId;
  name: string;
  nameShort: string;
  stock: [id: BwgrStockId, name: string];
  isSubsetting: boolean;
}

