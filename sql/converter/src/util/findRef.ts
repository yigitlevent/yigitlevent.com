type ReferenceKeys = "Stocks" | "Settings" | "Lifepaths"
	| "LogicTypes" | "RequirementItemTypes"
	| "AbilityTypes" | "TraitTypes" | "TraitCategories" | "SkillToolTypes" | "SkillTypes" | "SkillCategories"
	| "Abilities" | "Traits" | "Skills"
	| "ActionResolutionTypes"
	| "DuelOfWitsActions"
	| "RangeAndCoverActionGroups" | "RangeAndCoverActions"
	| "FightActionGroups" | "FightActions";

export function findIndex(type: ReferenceKeys, name: string, references: { [key: string]: Reference[]; }) {
	if (type in references) {
		const ref = references[type].filter(v => v[1] === name);
		if (ref.length === 1) return ref[0];
		else if (ref.length > 1) throw new Error(`Multiple indexes found for '${name}' in 'references["${type}"]'.`);
		throw new Error(`No indexes found for '${name}' in 'references["${type}"]'.`);
	}
	throw new Error(`No '${type}' in 'references'.`);
}

export function findName(type: ReferenceKeys, index: number, references: { [key: string]: Reference[]; }) {
	if (type in references) {
		const ref = references[type].filter(v => v[0] === index);
		if (ref.length === 1) return ref[0];
		else if (ref.length > 1) throw new Error(`Multiple names found for '${index}' in 'references["${type}"]'.`);
		throw new Error(`No names found for '${index}' in 'references["${type}"]'.`);
	}
	throw new Error(`No '${type}' in 'references'.`);
}
