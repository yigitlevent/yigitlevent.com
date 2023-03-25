import { TraitCategories } from "../../../client/bwgrtools/src/data/traits/_traits";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";
import { findIndex } from "../util/findRef";


export function processTraits(refs: References): Processed {
	const traitRefs: Reference[] = [];

	const datTraits: string[] = [];
	const datRulesetTraits: string[] = [];

	Object.values(TraitCategories)
		.map(category => category.traits.map(t => {
			const categorySplit = category.name.split(" ");
			return { ...t, categoryName: categorySplit[categorySplit.length - 1] };
		}))
		.flat()
		.forEach((trait, traitIndex) => {
			const stockId = trait.stock === "Any" ? null : findIndex("Stocks", trait.stock, refs);
			const category = (["Character", "Call-on", "Die"].includes(trait.categoryName)) ? "General" : trait.categoryName;
			const categoryId = findIndex("TraitCategories", category, refs);
			const typeId = findIndex("TraitTypes", trait.type, refs);
			const desc = trait.description ? `'${escapeTick(trait.description)}'` : null;

			const stockIdOrNull = stockId === null ? null : stockId[0];

			datTraits.push(`(${traitIndex}, '${escapeTick(trait.name)}', ${stockIdOrNull}, ${categoryId[0]}, ${typeId[0]}, ${trait.cost}, ${desc})`);
			traitRefs.push([traitIndex, `${trait.stock} ${trait.categoryName}➞${trait.name}`]);

			trait.allowed.forEach(rulesetId => {
				datRulesetTraits.push(`(${traitIndex}, '${rulesetId}')`);
			});
		});

	return {
		name: "p4_traits",
		references: { Traits: traitRefs },
		data: [
			arrayToSQL("dat", "Traits", '"Id", "Name", "StockId", "CategoryId", "TypeId", "Cost", "Description"', datTraits),
			arrayToSQL("dat", "RulesetTraits", '"TraitId", "RulesetId"', datRulesetTraits)
		]
	};
}
