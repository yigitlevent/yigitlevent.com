import { Stats } from "../../../../client/bwgrtools/src/data/stats";
import { Attributes } from "../../../../client/bwgrtools/src/data/attributes";
import { arrayToSQL } from "../util/arrayToSql";


export function processAbilities(): Processed {
	const DatAbilityTypes: string[] = ["(0, 'Mental Stat')", "(1, 'Physical Stat')", "(2, 'Attribute')", "(3, 'Emotional Attribute')"];
	const DatAbilities: string[] = [];

	const abilityTypeRefs: Reference[] = [[0, "Mental Stat"], [1, "Physical Stat"], [2, "Attribute"], [3, "Emotional Attribute"]];
	const abilityRefs: Reference[] = [];

	[...Stats, ...Attributes].forEach((v, i) => {
		abilityRefs.push([i, v.name]);

		if ("pool" in v) {
			DatAbilities.push(`(${i}, '${v.name}', ${v.pool === "Mental" ? 0 : 1}, true)`);
		}
		else {
			if (v.requiredTrait) DatAbilities.push(`(${i}, '${v.name}', 3, ${v.hasShade})`);
			else DatAbilities.push(`(${i}, '${v.name}', 2, ${v.hasShade})`);
		}
	});

	const abilityTypes = arrayToSQL("dat", "AbilityTypes", '"Id", "Name"', DatAbilityTypes);
	const abilities = arrayToSQL("dat", "Abilities", '"Id", "Name", "AbilityTypeId", "HasShades"', DatAbilities);

	return {
		references: { AbilityTypes: abilityTypeRefs, Abilities: abilityRefs },
		data: [abilityTypes, abilities]
	};
}
