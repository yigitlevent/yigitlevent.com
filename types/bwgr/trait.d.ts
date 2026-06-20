import type { Nominal } from "../utility/nominal";
import type { BwgrRulesetId } from "@/types/bwgr/ruleset";
import type { BwgrStockId } from "@/types/bwgr/stock";


export type BwgrTraitId = Nominal<number, "BwgrTraitId">;

export type BwgrTraitCategoryId = Nominal<number, "BwgrTraitCategoryId">;
export type BwgrTraitTypeId = Nominal<number, "BwgrTraitTypeId">;

export interface BwgrTraitDBO {
  Rulesets: BwgrRulesetId[];
  Id: BwgrTraitId;
  Name: string;
  StockId: BwgrStockId | null;
  Stock: string | null;
  CategoryId: BwgrTraitCategoryId;
  Category: string;
  TypeId: BwgrTraitTypeId;
  Type: string;
  Cost: number;
  Description: string | null;
}

export interface BwgrTrait {
  rulesets: BwgrRulesetId[];
  id: BwgrTraitId;
  name: string;
  stock?: [id: BwgrStockId, name: string];
  category: [id: BwgrTraitCategoryId, name: string];
  type: [id: BwgrTraitTypeId, name: string];
  cost: number;
  description?: string;
}
