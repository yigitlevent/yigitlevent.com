type TraitId = Nominal<number, "TraitId">;

type TraitCategoryId = Nominal<number, "TraitCategoryId">;
type TraitTypeId = Nominal<number, "TraitTypeId">;

interface Trait {
	rulesets: RulesetId[];
	id: TraitId;
	name: string;
	stock?: [id: StockId, name: string];
	category: [id: TraitCategoryId, name: string];
	type: [id: TraitTypeId, name: string];
	cost: number;
	description?: string;
}
