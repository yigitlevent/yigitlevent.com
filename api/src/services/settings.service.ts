import { PgPool } from "../index";


export async function GetSettings() {
	const convert = (v: SettingDBO): Setting => {
		return {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as SettingId,
			name: v.Name,
			nameShort: v.NameShort,
			stock: [v.StockId as unknown as StockId, v.StockName],
			isSubsetting: v.IsSubsetting
		};
	};

	const query = 'select * from dat."SettingsList";';
	return PgPool.query<SettingDBO>(query)
		.then(result => result.rows.map(convert));
}
