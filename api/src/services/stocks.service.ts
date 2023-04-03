import { PgPool } from "../index";


export async function GetStocks() {
	const convert = (v: StockDBO): Stock => {
		return {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as StockId,
			name: v.Name,
			namePlural: v.NamePlural,
			stride: v.Stride,
			settingIds: v.SettingIds as unknown[] as SettingId[]
		};
	};

	const query = 'select * from dat."StocksList";';
	return PgPool.query<StockDBO>(query)
		.then(result => result.rows.map(convert));
}
