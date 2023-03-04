import { CoreRulesets, ExpansionRulesets } from "../../../../client/bwgrtools/src/data/rulesets.js";
import { arrayToSQL } from "../util/arrayToSql.js";


export function processRulesets() {
	const DatRulesets: string[] = [];
	const DatRulesetExpansions: string[] = [];

	CoreRulesets.forEach(cr => {
		DatRulesets.push(`('${cr.id}', '${cr.name}', ${cr.isOffical}, true, false, null)`);
		cr.expansions.forEach(ex => { DatRulesetExpansions.push(`('${cr.id}', '${ex}')`); });
	});

	ExpansionRulesets.forEach(ex => {
		DatRulesets.push(`('${ex.id}', '${ex.name}', ${ex.isOffical}, true, true, null)`);
	});

	const rulesets = arrayToSQL(
		"dat",
		"Rulesets",
		'"Id", "Name", "IsOfficial", "IsPublic", "IsExpansion", "User"',
		DatRulesets.filter(v => !v.includes("amw"))
	);

	const rulesetExpansions = arrayToSQL(
		"dat",
		"RulesetExpansions",
		'"RulesetId", "ExpansionId"',
		DatRulesetExpansions.filter(v => !v.includes("amw"))
	);

	return [rulesets, rulesetExpansions];
}
