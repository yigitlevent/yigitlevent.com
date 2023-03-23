import { Stats } from "../../../../client/bwgrtools/src/data/stats";
import { Attributes } from "../../../../client/bwgrtools/src/data/attributes";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";
import { PracticeTable } from "../../../../client/bwgrtools/src/data/tables";


export function processAbilities(refs: References): Processed {
	const abilityRefs: Reference[] = [];
	
	const datAbilities: string[] = [];
	
	[...Stats, ...Attributes].forEach((v, i) => {
		abilityRefs.push([i, v.name]);

		const p = PracticeTable[v.name];

		if ("pool" in v) {
			const ref = findIndex("AbilityTypes", (v.pool === "Mental") ? "Mental Stat" : "Physical Stat", refs);
			datAbilities.push(`(${i}, '${v.name}', ${ref[0]}, true, ${p ? p.Cycle : null}, ${p ? p.Routine : null}, ${p ? p.Difficult : null}, ${p ? p.Challenging : null})`);
		}
		else {
			const ref = findIndex("AbilityTypes", (v.requiredTrait) ? "Emotional Attribute" : "Attribute", refs);
			datAbilities.push(`(${i}, '${v.name}', ${ref[0]}, ${v.hasShade}, ${p ? p.Cycle : null}, ${p ? p.Routine : null}, ${p ? p.Difficult : null}, ${p ? p.Challenging : null})`);
		}
	});

	return {
		name: "p3_abilities",
		references: { Abilities: abilityRefs },
		data: [
			arrayToSQL("dat", "Abilities", '"Id", "Name", "AbilityTypeId", "HasShades", "Cycle", "Routine", "Difficult", "Challenging"', datAbilities)
		]
	};
}
