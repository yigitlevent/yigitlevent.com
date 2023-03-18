import { Stats } from "../../../../client/bwgrtools/src/data/stats";
import { Attributes } from "../../../../client/bwgrtools/src/data/attributes";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";


export function processAbilities(refs: References): Processed {
	const abilityRefs: Reference[] = [];
	
	const datAbilities: string[] = [];
	
	[...Stats, ...Attributes].forEach((v, i) => {
		abilityRefs.push([i, v.name]);

		if ("pool" in v) {
			const ref = findIndex("AbilityTypes", (v.pool === "Mental") ? "Mental Stat" : "Physical Stat", refs);
			datAbilities.push(`(${i}, '${v.name}', ${ref[0]}, true)`);
		}
		else {
			const ref = findIndex("AbilityTypes", (v.requiredTrait) ? "Emotional Attribute" : "Attribute", refs);
			datAbilities.push(`(${i}, '${v.name}', ${ref[0]}, ${v.hasShade})`);
		}
	});

	return {
		references: { Abilities: abilityRefs },
		data: [
			arrayToSQL("dat", "Abilities", '"Id", "Name", "AbilityTypeId", "HasShades"', datAbilities)
		]
	};
}
