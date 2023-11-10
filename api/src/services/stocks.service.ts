import { PgPool } from "../index";


export async function GetStocks(rulesets: RulesetId[]): Promise<Stock[]> {
	const convert = (v: StockDBO[], a: AgePoolDBO[]): Stock[] => {
		return v.map(stock => {
			return {
				rulesets: stock.Rulesets,
				id: stock.Id,
				name: stock.Name,
				namePlural: stock.NamePlural,
				stride: stock.Stride,
				settingIds: stock.SettingIds,
				agePool: a.filter(ap => ap.StockId === stock.Id).map(ap => ({ minAge: ap.MinAge, mentalPool: ap.MentalPool, physicalPool: ap.PhysicalPool }))
			};
		});
	};


	const query1 = `select * from dat."StocksList" where "Rulesets"::text[] && ARRAY['${rulesets.join("','")}'];`;
	const query2 = "select * from dat.\"AgePools\";";
	return Promise.all([
		PgPool.query<StockDBO>(query1),
		PgPool.query<AgePoolDBO>(query2)
	]).then(result => convert(result[0].rows, result[1].rows));
}
