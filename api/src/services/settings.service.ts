import { PgPool } from "../index";
import { Logger } from "../utils/logger";


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

	const log = new Logger("GetSettings Querying");
	const query = `select * from bwgr."SettingsList" where "Rulesets"::text[] && ARRAY['${rulesets.join("','")}'];`;
	return PgPool.query<SettingDBO>(query).then(result => {
		log.end();
		const log2 = new Logger("GetSettings Conversion");
		const res = result.rows.map(convert);
		log2.end();
		return res;
	});
}
