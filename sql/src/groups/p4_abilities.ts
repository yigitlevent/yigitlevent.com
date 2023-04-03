import { Stats } from "../old_data/stats";
import { Attributes } from "../old_data/attributes";
import { PracticeTable } from "../old_data/tables";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";


export function processAbilities(refs: References): Processed {
	const abilityRefs: Reference[] = [];

	const datAbilities: string[] = [];

	[...Stats, ...Attributes].forEach((v, i) => {
		abilityRefs.push([i, v.name]);

		const p = PracticeTable[v.name];


		if ("pool" in v) {
			const ref = findIndex("AbilityTypes", (v.pool === "Mental") ? "Mental Stat" : "Physical Stat", refs);
			datAbilities.push(`(${i}, '${v.name}', ${ref[0]}, true, ${p ? p.Cycle : null}, ${p ? p.Routine : null}, ${p ? p.Difficult : null}, ${p ? p.Challenging : null}, null)`);
		}
		else {
			const ref = findIndex("AbilityTypes", (v.requiredTrait) ? "Emotional Attribute" : "Attribute", refs);
			const r = ("requiredTrait" in v && v.requiredTrait) ? findIndex("Traits", v.requiredTrait, refs) : null;
			datAbilities.push(`(${i}, '${v.name}', ${ref[0]}, ${v.hasShade}, ${p ? p.Cycle : null}, ${p ? p.Routine : null}, ${p ? p.Difficult : null}, ${p ? p.Challenging : null}, ${(r ? r[0] : null)})`);
		}
	});

	return {
		name: "p4_abilities",
		references: { Abilities: abilityRefs },
		data: [
			arrayToSQL("dat", "Abilities", '"Id", "Name", "AbilityTypeId", "HasShades", "Cycle", "Routine", "Difficult", "Challenging", "RequiredTraitId"', datAbilities)
		]
	};
}
