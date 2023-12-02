import { PracticeTable } from "../raw_data_bwgr/tables";
import { arrayToSQL } from "../util/arrayToSql";


export function processGeneric(): Processed {
	// ULTRA GENERIC
	const logicRef: Reference[] = [];
	const requirementItemRef: Reference[] = [];

	const datLogicTypes = ["AND", "OR", "NOT"].map((l, i) => {
		logicRef.push([i, l]);
		return `(${i}, '${l}')`;
	});

	const datRequirementItemTypes = ["UNIQUE", "MALE", "FEMALE", "SETTINGENTRY", "YEARS", "LPINDEX", "OLDESTBY", "SETTING", "LIFEPATH", "SKILL", "TRAIT", "ATTRIBUTE", "QUESTION"].map((l, i) => {
		requirementItemRef.push([i, l]);
		return `(${i}, '${l}')`;
	});

	// ABILITIES GENERIC
	const abilityTypeRefs: Reference[] = [];
	const datAbilityTypes: string[] =
		["Mental Stat", "Physical Stat", "Attribute", "Emotional Attribute"]
			.map((v, i) => {
				abilityTypeRefs.push([i, v]);
				return `(${i}, '${v}')`;
			});

	// SKILLS GENERIC
	const skillTypeRefs: Reference[] = [];
	const skillCategoryRefs: Reference[] = [];
	const skillToolTypeRefs: Reference[] = [];

	const datSkillTypes =
		["Academic", "Artisan", "Artist", "Craftsman", "Forester", "Martial", "Medicinal", "Military", "Musical", "Peasant", "Physical", "School of Thought", "Seafaring", "Social", "Sorcerous", "Special"]
			.map((v, i) => {
				skillTypeRefs.push([i, v]);
				const p = PracticeTable[v];
				return `(${i}, '${v}', ${p.Cycle}, ${p.Routine}, ${p.Difficult}, ${p.Challenging})`;
			});

	const datSkillCategories =
		["General", "Wise", "Magical", "Special", "Monstrous", "Art", "Skill Song", "Spell Song", "Spirit Hunter Song"]
			.map((v, i) => {
				skillCategoryRefs.push([i, v]);
				return `(${i}, '${v}')`;
			});

	const datSkillToolTypes =
		["No", "Tools", "Workshop", "Other", "Traveling Gear"]
			.map((v, i) => {
				skillToolTypeRefs.push([i, v]);
				return `(${i}, '${v}')`;
			});

	// TRAITS GENERIC
	const traitTypeRefs: Reference[] = [];
	const traitCategoryRefs: Reference[] = [];

	const datTraitTypes =
		["Character", "Call-on", "Die", "Call-on and Die"].map((v, i) => {
			traitTypeRefs.push([i, v]);
			return `(${i}, '${v}')`;
		});

	const datTraitCategories =
		["General", "Monstrous", "Common", "Lifepath", "Special"].map((v, i) => {
			traitCategoryRefs.push([i, v]);
			return `(${i}, '${v}')`;
		});

	// CONFLICT GENERIC
	const conflictTypeRefs: Reference[] = [];

	const datConflictTypes =
		[
			["Skill", "Skill"],
			["Ob", "Obstacle"],
			["Std", "Standard"],
			["Vs", "Versus"],
			["Vs+", "Versus plus"],
			["+Vs", "plus Versus"],
			["½", "Half of"]
		].map((v, i) => {
			conflictTypeRefs.push([i, v[0]]);
			return `(${i}, '${v[0]}', '${v[1]}')`;
		});

	// RESOURCES GENERIC 

	const resourceTypeRefs: Reference[] = [];

	const datResourceTypes =
		["Gear", "Property", "Relationship", "Reputation", "Affiliation", "Magical"].map((v, i) => {
			resourceTypeRefs.push([i, v]);
			return `(${i}, '${v}')`;
		});

	// MISC
	const timeUnitsRef: Reference[] = [];
	const datTimeUnits = ["Exchanges", "Minutes", "Hours", "Days", "Weeks", "Months", "Seasons", "Years"]
		.map((v, i) => { timeUnitsRef.push([i, v]); return `(${i}, '${v}')`; });

	const distanceUnitsRef: Reference[] = [];
	const datDistanceUnits = ["Paces", "10s of Paces", "100s of Paces", "Miles"]
		.map((v, i) => { distanceUnitsRef.push([i, v]); return `(${i}, '${v}')`; });

	const unitModifiersRef: Reference[] = [];
	const datUnitModifiers = ["Quarter", "Half", "Double", "Triple"]
		.map((v, i) => { unitModifiersRef.push([i, v]); return `(${i}, '${v}')`; });

	return {
		name: "p0_generic",
		references: {
			LogicTypes: logicRef, RequirementItemTypes: requirementItemRef,
			AbilityTypes: abilityTypeRefs,
			SkillTypes: skillTypeRefs, SkillCategories: skillCategoryRefs, SkillToolTypes: skillToolTypeRefs,
			TraitTypes: traitTypeRefs, TraitCategories: traitCategoryRefs,
			ActionResolutionTypes: conflictTypeRefs,
			ResourceTypes: resourceTypeRefs,
			TimeUnits: timeUnitsRef, DistanceUnits: distanceUnitsRef, UnitModifiers: unitModifiersRef
		},
		data: [
			arrayToSQL("bwgr", "LogicTypes", '"Id", "Name"', datLogicTypes),
			arrayToSQL("bwgr", "RequirementItemTypes", '"Id", "Name"', datRequirementItemTypes),

			arrayToSQL("bwgr", "AbilityTypes", '"Id", "Name"', datAbilityTypes),

			arrayToSQL("bwgr", "SkillTypes", '"Id", "Name", "Cycle", "Routine", "Difficult", "Challenging"', datSkillTypes),
			arrayToSQL("bwgr", "SkillCategories", '"Id", "Name"', datSkillCategories),
			arrayToSQL("bwgr", "SkillToolTypes", '"Id", "Name"', datSkillToolTypes),

			arrayToSQL("bwgr", "TraitTypes", '"Id", "Name"', datTraitTypes),
			arrayToSQL("bwgr", "TraitCategories", '"Id", "Name"', datTraitCategories),

			arrayToSQL("bwgr", "ActionResolutionTypes", '"Id", "Name", "NameLong"', datConflictTypes),

			arrayToSQL("bwgr", "ResourceTypes", '"Id", "Name"', datResourceTypes),

			arrayToSQL("bwgr", "TimeUnits", '"Id", "Name"', datTimeUnits),
			arrayToSQL("bwgr", "DistanceUnits", '"Id", "Name"', datDistanceUnits),
			arrayToSQL("bwgr", "UnitModifiers", '"Id", "Name"', datUnitModifiers)
		]
	};
}
