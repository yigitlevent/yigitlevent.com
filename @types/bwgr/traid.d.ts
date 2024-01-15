type BwgrTraitId = Nominal<number, "BwgrTraitId">;

type BwgrTraitCategoryId = Nominal<number, "BwgrTraitCategoryId">;
type BwgrTraitTypeId = Nominal<number, "BwgrTraitTypeId">;

interface BwgrTraitDBO {
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

interface BwgrTrait {
	rulesets: BwgrRulesetId[];
	id: BwgrTraitId;
	name: string;
	stock?: [id: BwgrStockId, name: string];
	category: [id: BwgrTraitCategoryId, name: string];
	type: [id: BwgrTraitTypeId, name: string];
	cost: number;
	description?: string;
}
