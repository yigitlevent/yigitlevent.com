import type { BwgrRulesetId } from "./ruleset";
import type { BwgrSettingId } from "./setting";
import type { Nominal } from "../utility/nominal";


export type BwgrStockId = Nominal<number, "BwgrStockId">;

export interface BwgrStockDBO {
  Rulesets: BwgrRulesetId[];
  Id: BwgrStockId;
  Name: string;
  NamePlural: string;
  Stride: number;
  SettingIds: BwgrSettingId[];
}

export interface BwgrAgePoolDBO {
  Id: number;
  StockId: BwgrStockId;
  MinAge: number;
  MentalPool: number;
  PhysicalPool: number;
}

export interface BwgrStock {
  rulesets: BwgrRulesetId[];
  id: BwgrStockId;
  name: string;
  namePlural: string;
  stride: number;
  settingIds: BwgrSettingId[];
  agePool: {
    minAge: number;
    mentalPool: number;
    physicalPool: number;
  }[];
}
