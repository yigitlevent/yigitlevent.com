import { PgPool } from "../index";


export async function GetRulesets() {
	const convert = (v: RulesetDBO): Ruleset => {
		const r: Ruleset = {
			id: v.Id as unknown as RulesetId,
			name: v.Name,
			isOfficial: v.IsOfficial,
			isPublic: v.IsPublic,
			isExpansion: v.IsExpansion
		};

		if (v.ExpansionIds.length > 0) r.expansionIds = v.ExpansionIds as unknown[] as RulesetId[];
		if (v.User !== null) r.user = v.User;

		return r;
	};

	const query = 'select * from dat."RulesetsList";';
	return PgPool.query<RulesetDBO>(query)
		.then(result => result.rows.map(convert));
}
