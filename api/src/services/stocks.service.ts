import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetStocks(rulesets: BwgrRulesetId[]): Promise<BwgrStock[]> {
	const convert = (v: BwgrStockDBO[], a: BwgrAgePoolDBO[]): BwgrStock[] => {
		const log = new Logger("GetStocks Conversion");

		const r = v.map(stock => {
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

		log.end();
		return r;
	};

	const log = new Logger("GetStocks Querying");
	const query1 = `select * from bwgr."StocksList" where "Rulesets"::text[] && ARRAY['${rulesets.join("','")}'];`;
	const query2 = "select * from bwgr.\"AgePools\";";
	return Promise.all([
		PgPool.query<BwgrStockDBO>(query1),
		PgPool.query<BwgrAgePoolDBO>(query2)
	]).then(result => {
		log.end();
		const res = convert(result[0].rows, result[1].rows);
		return res;
	});
}
