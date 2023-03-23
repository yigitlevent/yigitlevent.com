import { SkillCategories } from "../../../../client/bwgrtools/src/data/skills/_skills";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";
import { findIndex } from "../util/findRef";


function processSubskills(skillRefs: Reference[]): Processed {
	const datSubskills: string[] = [];

	Object.values(SkillCategories)
		.map(category => category.skills.map(t => {
			const categorySplit = category.name.split(" ");
			let cat = categorySplit[categorySplit.length - 1];

			if (categorySplit[categorySplit.length - 3] === "Spirit") cat = categorySplit.slice(categorySplit.length - 3).join(" ");
			else if (categorySplit[categorySplit.length - 1] === "Song") cat = categorySplit.slice(categorySplit.length - 2).join(" ");
			else if (categorySplit[categorySplit.length - 1] === "Art") cat = "Art";

			return {
				...t,
				categoryName: cat,
				stockName: (categorySplit[0] === "Great")
					? "Great Wolf"
					: categorySplit[0]
			};
		}))
		.flat()
		.filter(skill => skill.subskills !== undefined)
		.forEach(skill => {
			if (skill.subskills) {
				skill.subskills.forEach(subskill => {
					const skillRef = findIndex("Skills", `${skill.stockName} ${skill.categoryName}➞${skill.name}`, { "Skills": skillRefs });
					const subskillRef = findIndex("Skills", subskill, { "Skills": skillRefs });
					datSubskills.push(`(${skillRef[0]}, ${subskillRef[0]})`);
				});
			}
		});

	const subskills = arrayToSQL("dat", "SkillSubskills", '"SkillId", "SubskillId"', datSubskills);

	return {
		name: "",
		references: {},
		data: [subskills]
	};
}

export function processSkills(refs: References): Processed {
	const skillRefs: Reference[] = [];
	
	const datSkills: string[] = [];
	const datRulesetSkills: string[] = [];

	Object.values(SkillCategories)
		.map(category => category.skills.map(t => {
			const categorySplit = category.name.split(" ");
			let cat = categorySplit[categorySplit.length - 1];

			if (categorySplit[categorySplit.length - 3] === "Spirit") cat = categorySplit.slice(categorySplit.length - 3).join(" ");
			else if (categorySplit[categorySplit.length - 1] === "Song") cat = categorySplit.slice(categorySplit.length - 2).join(" ");
			else if (categorySplit[categorySplit.length - 1] === "Art") cat = "Art";

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
			const categoryId = findIndex("SkillCategories", skill.categoryName, refs);
			const typeId = findIndex("SkillTypes", skill.type, refs);
			const desc = skill.description ? `'${escapeTick(skill.description)}'` : null;

			const root1 = (skill.root[0]) ? findIndex("Abilities", skill.root[0], refs)[0] : null;
			const root2 = (skill.root[1]) ? findIndex("Abilities", skill.root[1], refs)[0] : null;

			const toolTypeId = findIndex("SkillToolTypes", skill.tools[0], refs);
			const toolsDesc = (skill.tools[1] === "") ? null : `'${escapeTick(skill.tools[1])}'`;

			datSkills.push(`(${skillIndex}, '${escapeTick(skill.name)}', ${stockId === null ? null : stockId[0]}, ${categoryId[0]}, ${typeId[0]}, ${skill.magical}, ${skill.training}, ${skill.noList}, ${root1}, ${root2}, ${desc}, ${toolTypeId[0]}, ${toolsDesc})`);
			skillRefs.push([skillIndex, `${skill.stockName} ${skill.categoryName}➞${skill.name}`]);

			skill.allowed.forEach(rulesetId => datRulesetSkills.push(`(${skillIndex}, '${rulesetId}')`));
		});

	return {
		name: "p5_skills",
		references: { Skills: skillRefs },
		data: [
			arrayToSQL("dat", "Skills", '"Id", "Name", "StockId", "CategoryId", "TypeId", "IsMagical", "IsTraining", "DontList", "Root1Id", "Root2Id", "Description", "ToolTypeId", "ToolsDescription"', datSkills),
			arrayToSQL("dat", "RulesetSkills", '"SkillId", "RulesetId"', datRulesetSkills),
			...processSubskills(skillRefs).data
		]
	};
}
