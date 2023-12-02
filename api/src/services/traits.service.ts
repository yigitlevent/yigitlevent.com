import { PgPool } from "../index";


export async function GetTraits(): Promise<Trait[]> {
	const convert = (v: TraitDBO): Trait => {
		const r: Trait = {
			rulesets: v.Rulesets,
			id: v.Id,
			name: v.Name,
			category: [v.CategoryId, v.Category],
			type: [v.TypeId, v.Type],
			cost: v.Cost
		};

		if (v.StockId !== null && v.Stock !== null) r.stock = [v.StockId, v.Stock];
		if (v.Description !== null) r.description = v.Description;

		return r;
	};

	const query = "select * from bwgr.\"TraitsList\";";
	return PgPool.query<TraitDBO>(query)
		.then(result => result.rows.map(convert));
}
