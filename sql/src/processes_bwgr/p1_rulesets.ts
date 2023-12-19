import { CoreRulesets, ExpansionRulesets } from "../raw_data_bwgr/rulesets";
import { arrayToSQL } from "../util/arrayToSql";


export function processRulesets(): Processed {
	const datRulesets: string[] = [];
	const datRulesetExpansions: string[] = [];

	CoreRulesets.forEach(cr => {
		datRulesets.push(`('${cr.id}', '${cr.name}', ${cr.isOffical}, true, false, null)`);
		cr.expansions.forEach(ex => { datRulesetExpansions.push(`('${cr.id}', '${ex}')`); });
	});

	ExpansionRulesets.forEach(ex => { datRulesets.push(`('${ex.id}', '${ex.name}', ${ex.isOffical}, true, true, null)`); });

	return {
		name: "p1_rulesets",
		references: {},
		data: [
			arrayToSQL("bwgr", "Rulesets", '"Id", "Name", "IsOfficial", "IsPublic", "IsExpansion", "User"', datRulesets.filter(v => !v.includes("amw"))),
			arrayToSQL("bwgr", "RulesetExpansions", '"RulesetId", "ExpansionId"', datRulesetExpansions.filter(v => !v.includes("amw")))
		]
	};
}
