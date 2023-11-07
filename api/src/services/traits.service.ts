import { PgPool } from "../index";


export async function GetTraits(): Promise<Trait[]> {
	const convert = (v: TraitDBO): Trait => {
		const r: Trait = {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as TraitId,
			name: v.Name,
			category: [v.CategoryId as unknown as TraitCategoryId, v.Category],
			type: [v.TypeId as unknown as TraitTypeId, v.Type],
			cost: v.Cost
		};

		if (v.StockId !== null && v.Stock !== null) r.stock = [v.StockId as unknown as StockId, v.Stock];
		if (v.Description !== null) r.description = v.Description;

		return r;
	};

	const query = "select * from dat.\"TraitsList\";";
	return PgPool.query<TraitDBO>(query)
		.then(result => result.rows.map(convert));
}
