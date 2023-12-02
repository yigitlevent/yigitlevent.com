import { PgPool } from "../index";


export async function GetSettings(rulesets: RulesetId[]): Promise<Setting[]> {
	const convert = (v: SettingDBO): Setting => {
		return {
			rulesets: v.Rulesets,
			id: v.Id,
			name: v.Name,
			nameShort: v.NameShort,
			stock: [v.StockId, v.StockName],
			isSubsetting: v.IsSubsetting
		};
	};

	const query = `select * from bwgr."SettingsList" where "Rulesets"::text[] && ARRAY['${rulesets.join("','")}'];`;
	return PgPool.query<SettingDBO>(query)
		.then(result => result.rows.map(convert));
}
