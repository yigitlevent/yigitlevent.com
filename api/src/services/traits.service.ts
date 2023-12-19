import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetTraits(rulesets: RulesetId[]): Promise<Trait[]> {
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

	const log = new Logger("GetTraits Querying");
	const query = `select * from bwgr."TraitsList" where "Rulesets"::text[] && ARRAY['${rulesets.join("','")}'];`;
	return PgPool.query<TraitDBO>(query).then(result => {
		log.end();
		const log2 = new Logger("GetTraits Conversion");
		const res = result.rows.map(convert);
		log2.end();
		return res;
	});
}
