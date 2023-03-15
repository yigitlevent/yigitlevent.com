import { SkillCategories } from "../../../../client/bwgrtools/src/data/skills/_skills";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";
import { findIndex } from "../util/findRef";


function processSkillToolTypes(): Processed {
	const datSkillToolTypes: string[] = [];
	const skillToolTypeRefs: Reference[] = [];

	["No", "Tools", "Workshop", "Other", "Traveling Gear"]
		.forEach((v, i) => {
			datSkillToolTypes.push(`(${i}, '${v}')`);
			skillToolTypeRefs.push([i, v]);
		});

	const skillToolTypes = arrayToSQL("dat", "SkillToolTypes", '"Id", "Name"', datSkillToolTypes);

	return {
		references: { SkillToolTypes: skillToolTypeRefs },
		data: [skillToolTypes]
	};
}

function processSkillTypes(): Processed {
	const datSkillTypes: string[] = [];
	const skillTypeRefs: Reference[] = [];

	["Academic", "Artisan", "Artist", "Craftsman", "Forester", "Martial", "Medicinal", "Military", "Musical", "Peasant", "Physical", "School of Thought", "Seafaring", "Social", "Sorcerous", "Special", "Wise"]
		.forEach((v, i) => {
			datSkillTypes.push(`(${i}, '${v}')`);
			skillTypeRefs.push([i, v]);
		});

	const skillTypes = arrayToSQL("dat", "SkillTypes", '"Id", "Name"', datSkillTypes);

	return {
		references: { SkillTypes: skillTypeRefs },
		data: [skillTypes]
	};
}

function processSkillCategories(): Processed {
	const datSkillCategories: string[] = [];
	const skillCategoryRefs: Reference[] = [];

	["General", "Wise", "Magical", "Special", "Monstrous", "Dwarven Art", "Skill Song", "Spell Song", "Spirit Hunter Song"].forEach((v, i) => {
		datSkillCategories.push(`(${i}, '${v}')`);
		skillCategoryRefs.push([i, v]);
	});

	const skillCategories = arrayToSQL("dat", "SkillCategories", '"Id", "Name"', datSkillCategories);

	return {
		references: { SkillCategories: skillCategoryRefs },
		data: [skillCategories]
	};
}

function processSubskills(skillRefs: Reference[]): Processed {
	const datSubskills: string[] = [];

	Object.values(SkillCategories)
		.map(cat => cat.skills)
		.flat()
		.filter(skill => skill.subskills !== undefined)
		.forEach(skill => {
			if (skill.subskills) {
				skill.subskills.forEach(subskill => {
					const skillRef = findIndex("Skills", skill.name, { "Skills": skillRefs });
					const subskillRef = findIndex("Skills", subskill.split("➞")[1], { "Skills": skillRefs });
					datSubskills.push(`(${skillRef[0]}, ${subskillRef[0]})`);
				});
			}
		});

	const subskills = arrayToSQL("dat", "SkillSubskills", '"SkillId", "SubskillId"', datSubskills);

	return {
		references: {},
		data: [subskills]
	};
}

export function processSkills(refs: References): Processed {
	const { references: SkillToolTypesRefs, data: skillToolTypes } = processSkillToolTypes();
	const { references: SkillTypesRefs, data: skillTypes } = processSkillTypes();
	const { references: SkillCategoriesRefs, data: skillCategories } = processSkillCategories();

	const DatSkills: string[] = [];
	const skillRefs: Reference[] = [];

	const DatRulesetSkills: string[] = [];

	Object.values(SkillCategories)
		.map(category => category.skills.map(t => {
			const categorySplit = category.name.split(" ");
			let cat = categorySplit[categorySplit.length - 1];

			if (categorySplit[categorySplit.length - 3] === "Spirit") cat = categorySplit.slice(categorySplit.length - 3).join(" ");
			else if (categorySplit[categorySplit.length - 1] === "Song") cat = categorySplit.slice(categorySplit.length - 2).join(" ");
			else if (categorySplit[categorySplit.length - 1] === "Art") cat = "Dwarven Art";

			return {
				...t,
				categoryName: cat,
				stockName: (categorySplit[0] === "Great")
					? "Great Wolf"
					: categorySplit[0]
			};
		}))
		.flat()
		.forEach((skill, skillIndex) => {
			const stockId = skill.stockName === "Any" ? null : findIndex("Stocks", skill.stockName, refs);
			const categoryId = findIndex("SkillCategories", skill.categoryName, SkillCategoriesRefs);
			const typeId = findIndex("SkillTypes", skill.type, SkillTypesRefs);
			const desc = skill.description ? `'${escapeTick(skill.description)}'` : null;

			const root1 = (skill.root[0]) ? findIndex("Abilities", skill.root[0], refs)[0] : null;
			const root2 = (skill.root[1]) ? findIndex("Abilities", skill.root[1], refs)[0] : null;

			const toolTypeId = findIndex("SkillToolTypes", skill.tools[0], SkillToolTypesRefs);
			const toolsDesc = (skill.tools[1] === "") ? null : `'${escapeTick(skill.tools[1])}'`;

			DatSkills.push(`(${skillIndex}, '${escapeTick(skill.name)}', ${stockId === null ? null : stockId[0]}, ${categoryId[0]}, ${typeId[0]}, ${skill.magical}, ${skill.training}, ${skill.noList}, ${root1}, ${root2}, ${desc}, ${toolTypeId[0]}, ${toolsDesc})`);
			skillRefs.push([skillIndex, skill.name]);

			skill.allowed.forEach(rulesetId => DatRulesetSkills.push(`(${skillIndex}, '${rulesetId}')`));
		});

	const { data: subskills } = processSubskills(skillRefs);

	const skills = arrayToSQL("dat", "Skills", '"Id", "Name", "StockId", "CategoryId", "TypeId", "IsMagical", "IsTraining", "DontList", "Root1Id", "Root2Id", "Description", "ToolTypeId", "ToolsDescription"', DatSkills);

	const rulesetSkills = arrayToSQL("dat", "RulesetSkills", '"SkillId", "RulesetId"', DatRulesetSkills);

	return {
		references: { SkillToolTypes: SkillToolTypesRefs[0], SkillTypes: SkillTypesRefs[0], SkillCategories: SkillCategoriesRefs[0], Skills: skillRefs },
		data: [...skillToolTypes, ...skillTypes, ...skillCategories, skills, rulesetSkills, ...subskills]
	};
}
