import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetRulesets(): Promise<Ruleset[]> {
	const convert = (v: RulesetDBO): Ruleset => {

		const r: Ruleset = {
			id: v.Id,
			name: v.Name,
			isOfficial: v.IsOfficial,
			isPublic: v.IsPublic,
			isExpansion: v.IsExpansion
		};

		if (v.ExpansionIds.length > 0) r.expansionIds = v.ExpansionIds;
		if (v.User !== null) r.user = v.User;

		return r;
	};

	const log = new Logger("GetRulesets Querying");
	const query = "select * from bwgr.\"RulesetsList\";";
	return PgPool.query<RulesetDBO>(query).then(result => {
		log.end();
		const log2 = new Logger("GetRulesets Conversion");
		const res = result.rows.map(convert);
		log2.end();
		return res;
	});
}
