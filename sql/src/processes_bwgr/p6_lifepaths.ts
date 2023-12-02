import { Stocks } from "../raw_data_bwgr/stocks/_stocks";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";
import { findIndex } from "../util/findRef";


interface temp {
	lifepathRef: Reference;
	logicType: "AND" | "OR" | "NOT";
	parentLogicType: "AND" | "OR";
	items: RequirementItem[];
	fulfilmentAmount?: number;
}

export function processLifepaths(refs: References): Processed {
	const datLifepaths: string[] = [];
	const datRulesetLifepaths: string[] = [];

	const datLifepathLeads: string[] = [];
	const datLifepathSkills: string[] = [];
	const datLifepathTraits: string[] = [];

	const lifepathRefs: Reference[] = [];

	const lps =
		Object.values(Stocks)
			.map(stock => stock.settings)
			.flat()
			.map(setting => Object.values(setting))
			.flat()
			.map(setting => setting.lifepaths)
			.flat();

	lps.forEach((lifepath, lifepathId) => {
		const stockRef = findIndex("Stocks", lifepath.stock, refs);
		const settingRef = findIndex("Settings", `${lifepath.stock}➞${lifepath.setting}`, refs);

		const id = lifepathId;
		const n = lifepath.name;

		const stId = stockRef[0];
		const seId = settingRef[0];

		const b = lifepath.born;

		const years = (typeof lifepath.years === "number") ? lifepath.years : `${lifepath.years[0]}, ${lifepath.years[1]}`;
		const gsp = (typeof lifepath.generalSkillPool === "number") ? lifepath.generalSkillPool : parseInt(lifepath.generalSkillPool.split("/")[0]);
		const lsp = (typeof lifepath.skillPool === "number") ? lifepath.skillPool : 0;
		const rp = (typeof lifepath.resources === "number") ? lifepath.resources : (lifepath.resources === "*") ? 0 : parseInt(lifepath.resources.split("/")[0]);

		const ep = lifepath.eitherPool;
		const mp = lifepath.mentalPool;
		const pp = lifepath.physicalPool;
		const tp = lifepath.traitPool;

		const igsp = (typeof lifepath.generalSkillPool === "string") ? true : false;
		const irp = (typeof lifepath.resources === "string" && lifepath.resources !== "*") ? true : false;

		const hrpp = lifepath.name === "Hostage";

		const rqt = (lifepath.requirements.texts) ? `'${escapeTick(lifepath.requirements.texts.join(" "))}'` : null;

		datLifepaths.push(`(${id}, '${escapeTick(n)}', ${stId}, ${seId}, ${b}, ARRAY [${years}], ${ep}, ${mp}, ${pp}, ${gsp}, ${lsp}, ${tp}, ${rp}, ${igsp}, false, ${irp}, false, false, ${hrpp}, ${rqt})`);

		lifepath.allowed.forEach(ruleset => datRulesetLifepaths.push(`(${id}, '${ruleset}')`));

		lifepath.leads.forEach(lead => datLifepathLeads.push(`(${id}, ${findIndex("Settings", lead, refs)[0]})`));
		lifepath.skills.forEach((skill, si) => {
			const s = (skill.startsWith("Dark")) ? skill.replace("Dark ", "") : skill;
			datLifepathSkills.push(`(${id}, ${findIndex("Skills", s, refs)[0]}, ${si})`);
		});
		lifepath.traits.forEach((trait, ti) => {
			const t = (trait.startsWith("Dark")) ? trait.replace("Dark ", "") : trait;
			datLifepathTraits.push(`(${id}, ${findIndex("Traits", t, refs)[0]}, ${ti})`);
		});

		lifepathRefs.push([id, `${settingRef[1]}➞${n}`]);
	});

	const datLifepathCompanions: string[] = [];
	const datLifepathCompanionSettings: string[] = [];

	lps.forEach((lifepath, lifepathId) => {
		const settingRef = findIndex("Settings", `${lifepath.stock}➞${lifepath.setting}`, refs);
		const seId = settingRef[0];

		if (lifepath.name === "Country Wife") {
			datLifepathCompanions.push(`(${lifepathId}, 'Husband', true, 0.0, 0.5, 0.5)`);
			datLifepathCompanionSettings.push(`(${lifepathId}, ${seId})`);
		}
		else if (lifepath.name === "Village Wife") {
			datLifepathCompanions.push(`(${lifepathId}, 'Husband', true, 0.5, 0.5, 0.5)`);
			datLifepathCompanionSettings.push(`(${lifepathId}, ${seId})`);
		}
		else if (lifepath.name === "City Wife") {
			datLifepathCompanions.push(`(${lifepathId}, 'Husband', true, 0.0, 0.5, 0.25)`);
			datLifepathCompanionSettings.push(`(${lifepathId}, ${seId})`);
		}
		else if (lifepath.name === "Bondsman") {
			const setting0Ref = findIndex("Settings", "Human➞Noble", refs);
			const setting1Ref = findIndex("Settings", "Human➞City Dweller", refs);
			const setting2Ref = findIndex("Settings", "Human➞Professional Soldier", refs);
			const setting3Ref = findIndex("Settings", "Human➞Villager", refs);

			datLifepathCompanions.push(`(${lifepathId}, 'Owner', true, 0.0, 0.25, 0.0)`);
			datLifepathCompanionSettings.push(`(${lifepathId}, ${setting0Ref[0]})`);
			datLifepathCompanionSettings.push(`(${lifepathId}, ${setting1Ref[0]})`);
			datLifepathCompanionSettings.push(`(${lifepathId}, ${setting2Ref[0]})`);
			datLifepathCompanionSettings.push(`(${lifepathId}, ${setting3Ref[0]})`);
		}
	});

	const datLifepathRequirementItems: string[] = [];

	const datLifepathRequirements: string[] = lps
		.map(lifepath => {
			const conditions = lifepath.requirements.conditions;

			const blocks: temp[][] = [];

			if (conditions) {
				const b: temp[] = conditions.items.map(block => {
					if (["Dame", "Lady"].includes(lifepath.name)) {
						block.items.pop();
						return [
							{
								lifepathRef: findIndex("Lifepaths", `${lifepath.stock}➞${lifepath.setting}➞${lifepath.name}`, { Lifepaths: lifepathRefs }),
								logicType: block.type as RequirementBlock["type"],
								parentLogicType: conditions.type,
								items: block.items,
								fulfilmentAmount: block.fulfilmentAmount ? block.fulfilmentAmount : 1
							},
							{
								lifepathRef: findIndex("Lifepaths", `${lifepath.stock}➞${lifepath.setting}➞${lifepath.name}`, { Lifepaths: lifepathRefs }),
								logicType: "AND" as RequirementBlock["type"],
								parentLogicType: conditions.type,
								items: [
									"Human➞City Dweller➞City Wife" as RequirementItem,
									"Human➞City Dweller➞Magnate" as RequirementItem
								]
							},
							{
								lifepathRef: findIndex("Lifepaths", `${lifepath.stock}➞${lifepath.setting}➞${lifepath.name}`, { Lifepaths: lifepathRefs }),
								logicType: "AND" as RequirementBlock["type"],
								parentLogicType: conditions.type,
								items: [
									"Human➞City Dweller➞City Wife",
									"Human➞City Dweller➞Bishop"
								]
							}
						] as temp[];
					}
					else {
						return {
							lifepathRef: findIndex("Lifepaths", `${lifepath.stock}➞${lifepath.setting}➞${lifepath.name}`, { Lifepaths: lifepathRefs }),
							logicType: block.type as RequirementBlock["type"],
							parentLogicType: conditions.type,
							items: block.items as RequirementItem[],
							fulfilmentAmount: block.fulfilmentAmount ? block.fulfilmentAmount : 1
						} as temp;
					}
				}).flat();

				blocks.push(b);
			}

			if (["Human➞Templar", "Human➞Noble"].includes(`${lifepath.stock}➞${lifepath.setting}`)) {
				blocks.push([{
					lifepathRef: findIndex("Lifepaths", `${lifepath.stock}➞${lifepath.setting}➞${lifepath.name}`, { Lifepaths: lifepathRefs }),
					logicType: "NOT" as RequirementBlock["type"],
					parentLogicType: "AND",
					items: ["Human➞Servitude and Captive➞Born Mule"],
					fulfilmentAmount: 1
				}]);
			}

			return blocks;
		})
		.flat()
		.filter(blocks => blocks.length > 0)
		.flat()
		.map((req, i) => {
			if (["Human➞Noble➞Dame", "Human➞Noble➞Lady"].includes(req.lifepathRef[1]) && req.items.includes("Human➞City Dweller➞City Wife")) {
				const ref = findIndex("RequirementItemTypes", "LIFEPATH", refs);
				const lifepathRef = findIndex("Lifepaths", req.items[0], { Lifepaths: lifepathRefs });
				const compLifepathRef = findIndex("Lifepaths", req.items[1], { Lifepaths: lifepathRefs });

				datLifepathRequirementItems.push(`(${datLifepathRequirementItems.length}, ${i}, ${ref[0]}, false, null, null, null, ${lifepathRef[0]}, null, null, null)`);
				datLifepathRequirementItems.push(`(${datLifepathRequirementItems.length}, ${i}, ${ref[0]}, true, null, null, null, ${compLifepathRef[0]}, null, null, null)`);
			}
			else {
				const mapper: { [key: string]: string; } = {
					"Setting": "SETTING",
					"Lifepath": "LIFEPATH",
					"Skill": "SKILL",
					"Trait": "TRAIT",

					"LP➞UNIQUE": "UNIQUE",
					"FIRSTINSETTING": "SETTINGENTRY",
					"GENDER➞FEMALE": "FEMALE",
					"GENDER➞MALE": "MALE",

					"YEARS": "YEARS",
					"LP": "LPINDEX",
					"GRIEF": "ATTRIBUTE",
					"OLDESTBY": "OLDESTBY"
				};

				req.items.forEach(item => {
					const split = item.split("➞");

					const searchKey =
						(item === "LP➞UNIQUE" || split[0] === "GENDER")
							? mapper[item]
							: (Object.keys(Stocks).includes(split[0]))
								? mapper["Lifepath"]
								: mapper[split[0]];

					const ref = findIndex("RequirementItemTypes", searchKey, refs);
					const griefRef = findIndex("Abilities", "Grief", refs);

					const r = {
						reqId: i,
						reqTypeId: ref[0],
						forComp: false,
						min: null as unknown as number,
						max: null as unknown as number,
						settingId: null as unknown as number,
						lifepathId: null as unknown as number,
						skillId: null as unknown as number,
						traitId: null as unknown as number,
						attributeId: null as unknown as number
					};

					const s = item.split("➞");

					if (ref[1] === "OLDESTBY") { r.max = parseInt(s[1]); }
					if (s[1] === "MIN") { r.min = parseInt(s[2]); }
					if (s[1] === "MAX") { r.max = parseInt(s[2]); }
					if (ref[1] === "LIFEPATH") { r.lifepathId = findIndex("Lifepaths", item, { Lifepaths: lifepathRefs })[0]; }
					if (ref[1] === "SKILL") { r.skillId = findIndex("Skills", item.split("➞").slice(-2).join("➞"), refs)[0]; }
					if (ref[1] === "SETTING") { r.settingId = findIndex("Settings", item.split("➞").slice(-2).join("➞"), refs)[0]; }
					if (ref[1] === "TRAIT") { r.traitId = findIndex("Traits", item.split("➞").slice(-2).join("➞"), refs)[0]; }
					if (ref[1] === "ATTRIBUTE") { r.attributeId = griefRef[0]; }

					datLifepathRequirementItems.push(`(${datLifepathRequirementItems.length}, ${r.reqId}, ${r.reqTypeId}, ${r.forComp}, ${r.min}, ${r.max}, ${r.settingId}, ${r.lifepathId}, ${r.skillId}, ${r.traitId}, ${r.attributeId})`);
				});
			}

			const lpId = req.lifepathRef[0];
			const logicId = findIndex("LogicTypes", req.logicType, refs)[0];
			const mustFulfill = req.parentLogicType === "AND";
			const fulfilmentAmount = req.fulfilmentAmount ? req.fulfilmentAmount : 1;
			return `(${i}, ${lpId}, ${logicId}, ${mustFulfill}, ${fulfilmentAmount})`;
		});

	return {
		name: "p6_lifepaths",
		references: { Lifepaths: lifepathRefs },
		data: [
			arrayToSQL("bwgr", "Lifepaths", '"Id", "Name", "StockId", "SettingId", "Born", "Years", "EitherPool", "MentalPool", "PhysicalPool", "GeneralSkillPool", "LifepathSkillPool", "TraitPool", "ResourcePoints", "IsGSPMultiplier", "IsLSPMultiplier", "IsRPMultiplier", "HalfGSPFromPrev", "HalfLSPFromPrev", "HalfRPFromPrev", "RequirementText"', datLifepaths),
			arrayToSQL("bwgr", "RulesetLifepaths", '"LifepathId", "RulesetId"', datRulesetLifepaths),

			arrayToSQL("bwgr", "LifepathLeads", '"LifepathId", "SettingId"', datLifepathLeads),
			arrayToSQL("bwgr", "LifepathSkills", '"LifepathId", "SkillId", "Index"', datLifepathSkills),
			arrayToSQL("bwgr", "LifepathTraits", '"LifepathId", "TraitId", "Index"', datLifepathTraits),

			arrayToSQL("bwgr", "LifepathCompanions", '"LifepathId", "CompanionName", "GivesSkills", "GSPMultiplier", "LSPMultiplier", "RPMultiplier"', datLifepathCompanions),
			arrayToSQL("bwgr", "LifepathCompanionSettings", '"LifepathId", "CompanionSettingId"', datLifepathCompanionSettings),

			arrayToSQL("bwgr", "LifepathRequirements", '"Id", "LifepathId", "LogicTypeId", "MustFulfill", "FulfillmentAmount"', datLifepathRequirements),
			arrayToSQL("bwgr", "LifepathRequirementItems", '"Id", "RequirementId", "RequirementTypeId", "ForCompanion", "Min", "Max", "SettingId", "LifepathId", "SkillId", "TraitId", "AttributeId"', datLifepathRequirementItems)
		]
	};
}
