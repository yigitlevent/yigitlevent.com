import { PgPool } from "../index";


export async function GetStocks() {
	const convert = (v: StockDBO[], a: AgePoolDBO[]): Stock[] => {
		return v.map(stock => {
			return {
				rulesets: stock.Rulesets as unknown[] as RulesetId[],
				id: stock.Id as unknown as StockId,
				name: stock.Name,
				namePlural: stock.NamePlural,
				stride: stock.Stride,
				settingIds: stock.SettingIds as unknown[] as SettingId[],
				agePool: a.filter(ap => ap.StockId === stock.Id).map(ap => ({ minAge: ap.MinAge, mentalPool: ap.MentalPool, physicalPool: ap.PhysicalPool }))
			};
		});
	};

	const query1 = 'select * from dat."StocksList";';
	const query2 = 'select * from dat."AgePools";';
	return Promise.all([
		PgPool.query<StockDBO>(query1),
		PgPool.query<AgePoolDBO>(query2)
	]).then(result => convert(result[0].rows, result[1].rows));
}
