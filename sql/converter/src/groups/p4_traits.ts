import { TraitCategories } from "../../../../client/bwgrtools/src/data/traits/_traits";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";
import { findIndex } from "../util/findRef";


function processTraitTypes(): Processed {
	const datTraitTypes: string[] = [];
	const traitTypeRefs: Reference[] = [];

	["Character", "Call-on", "Die", "Call-on and Die"].forEach((v, i) => {
		datTraitTypes.push(`(${i}, '${v}')`);
		traitTypeRefs.push([i, v]);
	});

	const traitTypes = arrayToSQL("dat", "TraitTypes", '"Id", "Name"', datTraitTypes);

	return {
		references: { TraitTypes: traitTypeRefs },
		data: [traitTypes]
	};
}

function processTraitCategories(): Processed {
	const datTraitCategories: string[] = [];
	const traitCategoryRefs: Reference[] = [];

	["Character", "Call-on", "Die", "Monstrous", "Common", "Lifepath", "Special"].forEach((v, i) => {
		datTraitCategories.push(`(${i}, '${v}')`);
		traitCategoryRefs.push([i, v]);
	});

	const traitCategories = arrayToSQL("dat", "TraitCategories", '"Id", "Name"', datTraitCategories);

	return {
		references: { TraitCategories: traitCategoryRefs },
		data: [traitCategories]
	};
}

export function processTraits(refs: References): Processed {
	const { references: TraitTypesRefs, data: traitTypes } = processTraitTypes();
	const { references: TraitCategoriesRefs, data: traitCategories } = processTraitCategories();

	const DatTraits: string[] = [];
	const traitRefs: Reference[] = [];

	const DatRulesetTraits: string[] = [];

	Object.values(TraitCategories)
		.map(category => category.traits.map(t => {
			const categorySplit = category.name.split(" ");
			return { ...t, categoryName: categorySplit[categorySplit.length - 1] };
		}))
		.flat()
		.forEach((trait, traitIndex) => {
			const stockId = trait.stock === "Any" ? null : findIndex("Stocks", trait.stock, refs);
			const categoryId = findIndex("TraitCategories", trait.categoryName, TraitCategoriesRefs);
			const typeId = findIndex("TraitTypes", trait.type, TraitTypesRefs);
			const desc = trait.description ? `'${escapeTick(trait.description)}'` : null;

			const stockIdOrNull = stockId === null ? null : stockId[0];

			DatTraits.push(`(${traitIndex}, '${escapeTick(trait.name)}', ${stockIdOrNull}, ${categoryId[0]}, ${typeId[0]}, ${trait.cost}, ${desc})`);
			traitRefs.push([traitIndex, `${trait.stock} ${trait.categoryName}➞${trait.name}`]);

			trait.allowed.forEach(rulesetId => {
				DatRulesetTraits.push(`(${traitIndex}, '${rulesetId}')`);
			});
		});

	const traits = arrayToSQL("dat", "Traits", '"Id", "Name", "StockId", "CategoryId", "TypeId", "Cost", "Description"', DatTraits);
	const rulesetTraits = arrayToSQL("dat", "RulesetTraits", '"TraitId", "RulesetId"', DatRulesetTraits);

	return {
		references: { TraitTypes: TraitTypesRefs[0], TraitCategories: TraitCategoriesRefs[0], Traits: traitRefs },
		data: [...traitTypes, ...traitCategories, traits, rulesetTraits]
	};
}
