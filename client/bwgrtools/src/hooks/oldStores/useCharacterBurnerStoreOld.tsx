import produce from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { GetAverage } from "../../utils/misc";
import { useRulesetStore } from "../apiStores/useRulesetStore";


interface CharacterBurnerStateOld {

	/*

	switchAnswer: (questionKey: anyAttributeQuestionsKeys) => void;

	selectAppropriateWeapon: (skillId: SkillId) => void;
	selectMandatoryAppropriateWeapon: (skillId: SkillId) => void;
	selectJavelinOrBow: (skillId: SkillId) => void;
	selectAnySmith: (skillId: SkillId) => void;

	addResource: (resource: SpendingForResource) => void;
	removeResource: (guid: string) => void;
	editResourceDescription: (guid: string, description: string) => void;

	addBrutalLifeTrait: (traitId: TraitId | undefined) => void;
	setHuntingGround: (huntingGround: HuntingGroundsList) => void;

	modifySpecialLifepathValue: (value: { advisorToTheCourtYears: number; } | { princeOfTheBloodYears: number; } | { bondsmanOwnerLifepathId: LifepathId; }) => void;*/
}

export const useCharacterBurnerStoreOld = create<CharacterBurnerStateOld>()(
	devtools(
		(set, get) => ({


			/*
			
			refreshTotals: (generalSkills: string[], generalTraits: string[]) => {
				const occuranceCount = (chosenLifepaths: LifepathOld[], currentLifepath: LifepathOld, currentIndex: number) => {
					const previousLifepaths = chosenLifepaths.slice(0, currentIndex);
					return previousLifepaths.filter(lp => lp.name === currentLifepath.name).length;
				};
			
				const state = get();
				state.clearTotals();
			
				set(produce<CharacterBurnerState>((state) => {
					const chosenLifepaths = GetLifepathsFromPaths(state.lifepathIds);
			
					if (chosenLifepaths.length > 0) {
						for (let i = 0; i < state.lifepathIds.length; i++) {
							const lp = chosenLifepaths[i];
							const repeatCount = occuranceCount(chosenLifepaths, lp, i);
			
							if (i !== 0) {
								const prevLp = chosenLifepaths[i - 1];
								if (lp.setting !== prevLp.setting) state.totals.years.points += 1;
							}
			
							if (typeof lp.years === "number") state.totals.years.points = state.totals.years.points + lp.years;
							else if (lp.name === "Advisor to the Court") state.totals.years.points += state.specialLifepaths.advisorToTheCourt.years;
							else if (lp.name === "Prince of the Blood") state.totals.years.points += state.specialLifepaths.princeOfTheBlood.years;
							else state.totals.years.extensions.push(`${lp.years[0]}-${lp.years[1]}`);
			
							const bondsmanOwnerLifepath = (lp.name === "Bondsman") ? GetLifepathFromPath(state.specialLifepaths.bondsman.ownerLifepathPath) : undefined;
			
							if (repeatCount === 0 || repeatCount === 1) {
								state.totals.stats.fromLifepaths.eitherPoints += lp.eitherPool;
								state.totals.stats.fromLifepaths.mentalPoints += lp.mentalPool;
								state.totals.stats.fromLifepaths.physicalPoints += lp.physicalPool;
			
								if (typeof lp.resources === "number") state.totals.resources.points += lp.resources;
								else if (lp.name === "Hostage") state.totals.resources.points += Math.floor(chosenLifepaths[i - 1].resources as number / 2);
								else if (lp.name === "Advisor to the Court") state.totals.resources.points += 10 * state.specialLifepaths.advisorToTheCourt.years;
								else state.totals.resources.extensions.push(lp.resources);
			
								if (typeof lp.generalSkillPool === "number") state.totals.skills.generalPoints.points += lp.generalSkillPool;
								else if (lp.name === "Advisor to the Court") state.totals.skills.generalPoints.points += state.specialLifepaths.advisorToTheCourt.years;
								else state.totals.skills.generalPoints.extensions.push(lp.generalSkillPool);
			
								if (typeof lp.skillPool === "number") state.totals.skills.lifepathPoints.points += lp.skillPool;
								else if (bondsmanOwnerLifepath) state.totals.skills.lifepathPoints.points += Math.floor(bondsmanOwnerLifepath.skillPool as number / 4);
								else state.totals.skills.lifepathPoints.extensions.push(lp.skillPool);
			
								if (repeatCount === 1 && lp.traits.length < 2) state.totals.traits.points += lp.traitPool - 1;
								else state.totals.traits.points += lp.traitPool;
							}
							else if (repeatCount === 2) {
								if (typeof lp.resources === "number") state.totals.resources.points += Math.floor(lp.resources / 2);
								else if (lp.name === "Hostage") state.totals.resources.points += Math.floor(chosenLifepaths[i - 1].resources as number / 4);
								else if (lp.name === "Advisor to the Court") state.totals.resources.points += Math.floor(10 * state.specialLifepaths.advisorToTheCourt.years / 2);
			
								if (typeof lp.generalSkillPool === "number") state.totals.skills.generalPoints.points += Math.floor(lp.generalSkillPool / 2);
								else if (lp.name === "Advisor to the Court") state.totals.skills.generalPoints.points += Math.floor(state.specialLifepaths.advisorToTheCourt.years / 2);
			
								if (typeof lp.skillPool === "number") state.totals.skills.lifepathPoints.points += Math.floor(lp.skillPool / 2);
								else if (bondsmanOwnerLifepath) state.totals.skills.lifepathPoints.points += Math.floor(bondsmanOwnerLifepath.skillPool as number / 4 / 2);
							}
							else if (repeatCount > 2) {
								if (typeof lp.resources === "number") state.totals.resources.points += Math.floor(lp.resources / 2);
								else if (lp.name === "Hostage") state.totals.resources.points += Math.floor(chosenLifepaths[i - 1].resources as number / 2 / 2);
								else if (lp.name === "Advisor to the Court") state.totals.resources.points += Math.floor(10 * state.specialLifepaths.advisorToTheCourt.years / 2 / 2);
							}
						}
			
						const stock = chosenLifepaths[0].stock;
			
						const ageBracket = Stocks[stock].agePool.filter(v => (v.max >= state.totals.years.points && v.min <= state.totals.years.points));
						state.totals.stats.fromAge = [ageBracket[0].m, ageBracket[0].p];
			
						const mandSkills = new Set<string>();
						const skills = new Set<string>();
			
						const commonTraits = new Set<string>(`${stock} Common` in TraitCategories ? TraitCategories[`${stock} Common`].traits.map(trait => `${stock} Common➞${trait.name}`) : []);
						const mandTraits = new Set<string>();
						const traits = new Set<string>();
			
						for (let i = 0; i < chosenLifepaths.length; i++) {
							const lp = chosenLifepaths[i];
							const repeatCount = occuranceCount(chosenLifepaths, lp, i);
			
							if (lp.skills.length > 0) mandSkills.add(lp.skills[0]);
							if (repeatCount === 1 && lp.skills.length > 1) mandSkills.add(lp.skills[1]);
			
							if (mandSkills.has("Any General➞Appropriate Weapons")) {
								mandSkills.add(state.specialSkills.appropriateWeapons.mandatory);
							}
			
							if (lp.traits.length > 0) mandTraits.add(lp.traits[0]);
							if (repeatCount === 1 && lp.traits.length > 1) mandTraits.add(lp.traits[1]);
						}
			
						for (const lifepathKey in chosenLifepaths) {
							const lp = chosenLifepaths[lifepathKey];
			
							lp.skills.forEach(skill => { if (!mandSkills.has(skill)) skills.add(skill); });
			
							const bondsmanOwnerLifepath = (lp.name === "Bondsman") ? GetLifepathFromPath(state.specialLifepaths.bondsman.ownerLifepathPath) : undefined;
							if (bondsmanOwnerLifepath) {
								bondsmanOwnerLifepath.skills.forEach(skill => { if (!mandSkills.has(skill)) skills.add(skill); });
							}
			
							lp.traits.forEach(skill => { if (!commonTraits.has(skill) && !mandTraits.has(skill)) traits.add(skill); });
			
							if (mandSkills.has("Any General➞Appropriate Weapons") || skills.has("Any General➞Appropriate Weapons")) {
								state.specialSkills.appropriateWeapons.selected.forEach(skill => { if (!mandSkills.has(skill)) skills.add(skill); });
							}
			
							if (skills.has("Any General➞Javelin or Bow")) {
								if (!mandSkills.has(state.specialSkills.javelinOrBow)) skills.add(state.specialSkills.javelinOrBow);
							}
			
							if (skills.has("Any General➞Any -smith")) {
								state.specialSkills.anySmith.forEach(skill => { if (!mandSkills.has(skill)) skills.add(skill); });
							}
						}
			
						state.totals.skills.mandatoryList = Array.from(mandSkills);
						state.totals.skills.lifepathList = Array.from(skills);
						for (const key in generalSkills) {
							const skillPath = generalSkills[key];
							if (!(skillPath in state.totals.skills.mandatoryList || skillPath in state.totals.skills.lifepathList)) {
								state.totals.skills.generalList.push(skillPath);
							}
						}
			
						state.totals.traits.commonList = Array.from(commonTraits);
						state.totals.traits.mandatoryList = Array.from(mandTraits);
						state.totals.traits.lifepathList = Array.from(traits);
						for (const key in generalTraits) {
							const traitPath = generalTraits[key];
							if (!(traitPath in state.totals.traits.commonList || traitPath in state.totals.traits.mandatoryList || traitPath in state.totals.traits.lifepathList)) {
								state.totals.traits.generalList.push(traitPath);
							}
						}
					}
				}));
			},
			refreshSkillSpendings: () => {
				set(produce<CharacterBurnerState>((state) => {
					for (const key in state.spendings.skills) {
						if (state.totals.skills.generalList.includes(key)) {
							state.spendings.skills[key] = { ...state.spendings.skills[key], lifepath: { open: 0, advance: 0 } };
						}
						else if (state.totals.skills.mandatoryList.includes(key) || state.totals.skills.lifepathList.includes(key)) {
							state.spendings.skills[key] = { ...state.spendings.skills[key] };
						}
						else {
							delete state.spendings.skills[key];
						}
					}
			
					[...state.totals.skills.mandatoryList, ...state.totals.skills.lifepathList, ...state.totals.skills.generalList].forEach(skillName => {
						if (!(skillName in state.spendings.skills)) {
							state.spendings.skills[skillName] = { general: { open: 0, advance: 0 }, lifepath: { open: 0, advance: 0 } };
						}
					});
				}));
				const state = get();
				state.totals.skills.mandatoryList.forEach(skillName => {
					state.openSkill(skillName as SkillPath, true, true);
				});
			},
			refreshTraitSpendings: () => {
				set(produce<CharacterBurnerState>((state) => {
					for (const key in state.spendings.traits) {
						if (state.totals.traits.mandatoryList.includes(key) || state.totals.traits.lifepathList.includes(key) || state.totals.traits.generalList.includes(key)) {
							state.spendings.traits[key] = { ...state.spendings.traits[key] };
						}
						else delete state.spendings.traits[key];
					}
			
					[...state.totals.traits.mandatoryList, ...state.totals.traits.lifepathList, ...state.totals.traits.generalList].forEach(traitName => {
						if (!(traitName in state.spendings.traits)) {
							state.spendings.traits[traitName] = { open: 0 };
						}
					});
				}));
				const state = get();
				state.totals.traits.mandatoryList.forEach(traitName => {
					state.openTrait(traitName as TraitPath, true, true);
				});
				state.refreshTraitEffects();
			},
			refreshTraitEffects: () => {
				/*set(produce<CharacterBurnerState>((state) => {
					const createResource = (type: ResourceTypes, nameSuffix: string, description: string) => {
						if (nameSuffix.length > 0) return { name: `${type} (${nameSuffix})`, type, description };
						return { name: type, type, description };
					};
					const createAttributeIfNotExists = (attribute: AttributesList) => {
						if (!(attribute in state.totals.traits.attributeMods)) state.totals.traits.attributeMods[attribute] = 0;
					};
			
					const newResources = [];
					state.beliefs.fourthBeliefName = "Special Belief";
					state.instincts.fourthInstinctName = "Special Instinct";
			
					// ELF
					if (state.checkHasTrait("Elf Common➞First Born")) {
						state.limits.stats.Perception = { min: 1, max: 9 };
					}
			
					// HUMAN
			
					// ORC
			
					// RODEN
			
					// GREAT WOLF
					if (state.checkHasTrait("Great Wolf Common➞Great Lupine Form")) {
						state.limits.stats.Agility = { min: 1, max: 6 };
					}
			
					// TROLL
					if (state.checkHasTrait("Troll Common➞Massive Stature")) {
						state.limits.stats.Power = { min: 4, max: 9 };
						state.limits.stats.Forte = { min: 4, max: 9 };
						state.limits.stats.Agility = { min: 1, max: 5 };
						state.limits.stats.Speed = { min: 1, max: 5 };
					}
			
					// GENERAL CALL-ON
					//TODO: General call-on trait effects 
			
					// GENERAL DIE
					//TODO: General die trait effects 
			
					// GENERAL MONSTROUS
					//TODO: General monstrous trait effects 
			
					// state.totals.resources.fromTraitsList = newResources;
				}))*/
			/*},
			
			refreshQuestions: () => {
				set(produce<CharacterBurnerState>((state) => {
					const newQuestions: CharacterQuestions = {};
					for (const questionKey in AttributeQuestions) {
						const key = questionKey as AttributeQuestionsKeys;
						const question = AttributeQuestions[key];
			
						if (typeof question.attribute !== "string") {
							const attributes = Array.from(question.attribute);
			
							for (const attrKey in attributes) {
								const attr = attributes[attrKey];
								const questionTrait = (Attributes.find(v => v.name === attr) as Attribute).requiredTrait as TraitPath;
			
								if (state.checkIfTraitInCommonOrOpen(questionTrait)) {
									if (questionKey in state.questions) newQuestions[key] = state.questions[key];
									else newQuestions[key] = false;
								}
							}
						}
						else if (question.attribute === "Always") {
							if (questionKey in state.questions) newQuestions[key] = state.questions[key];
							else newQuestions[key] = false;
						}
						else {
							const questionTrait = (Attributes.find(v => v.name === question.attribute) as Attribute).requiredTrait as TraitPath;
			
							if (state.checkIfTraitInCommonOrOpen(questionTrait)) {
								if (questionKey in state.questions) newQuestions[key] = state.questions[key];
								else newQuestions[key] = false;
							}
						}
					}
					state.questions = newQuestions;
				}));
			},
			resetStockSpecifics: () => {
				set(produce<CharacterBurnerState>((state) => {
					if (state.stockSpecific.brutalLife.traits.length > 0) {
						const brutalLifeTraits = state.stockSpecific.brutalLife.traits;
						brutalLifeTraits.pop();
						state.stockSpecific.brutalLife.traits = brutalLifeTraits;
					}
					state.stockSpecific.territory.huntingGround = undefined;
				}));
			},
			
		
			
switchAnswer: (questionKey: AttributeQuestionsKeys) => {
set(produce<CharacterBurnerState>((state) => {
state.questions[questionKey] = !state.questions[questionKey];
}));
},

selectAppropriateWeapon: (skillPath: SkillPath) => {
set(produce<CharacterBurnerState>((state) => {
if (state.specialSkills.appropriateWeapons.selected.length > 1 && state.specialSkills.appropriateWeapons.selected.includes(skillPath)) {
state.specialSkills.appropriateWeapons.selected = state.specialSkills.appropriateWeapons.selected.filter(v => v !== skillPath);
}
else {
const selectedSkills = state.specialSkills.appropriateWeapons.selected;
selectedSkills.push(skillPath);
state.specialSkills.appropriateWeapons.selected = selectedSkills;
}

state.specialSkills.appropriateWeapons.mandatory =
(state.specialSkills.appropriateWeapons.selected.includes(state.specialSkills.appropriateWeapons.mandatory))
? state.specialSkills.appropriateWeapons.mandatory
: state.specialSkills.appropriateWeapons.selected[0];
}));
const state = get();
state.refreshTotals(state.totals.skills.generalList, state.totals.traits.generalList);
state.refreshSkillSpendings();
state.refreshAttributeSpendings();
},


selectMandatoryAppropriateWeapon: (skillPath: SkillPath) => {
set(produce<CharacterBurnerState>((state) => {
state.specialSkills.appropriateWeapons.mandatory =
(state.specialSkills.appropriateWeapons.selected.includes(skillPath))
? skillPath
: state.specialSkills.appropriateWeapons.selected[0];
}));
const state = get();
state.refreshTotals(state.totals.skills.generalList, state.totals.traits.generalList);
state.refreshSkillSpendings();
state.refreshAttributeSpendings();
},


selectJavelinOrBow: (skillPath: SkillPath) => {
set(produce<CharacterBurnerState>((state) => {
state.specialSkills.javelinOrBow = skillPath;
}));
const state = get();
state.refreshTotals(state.totals.skills.generalList, state.totals.traits.generalList);
state.refreshSkillSpendings();
state.refreshAttributeSpendings();
},,


selectAnySmith: (skillPath: SkillPath) => {
set(produce<CharacterBurnerState>((state) => {
if (state.specialSkills.anySmith.includes(skillPath)) {
state.specialSkills.anySmith = state.specialSkills.anySmith.filter(v => v !== skillPath);
}
else {
const selectedSkills = state.specialSkills.anySmith;
selectedSkills.push(skillPath);
state.specialSkills.anySmith = selectedSkills;
}
}));
const state = get();
state.refreshTotals(state.totals.skills.generalList, state.totals.traits.generalList);
state.refreshSkillSpendings();
state.refreshAttributeSpendings();
},



addBrutalLifeTrait: (traitPath: TraitId | undefined) => {
set(produce<CharacterBurnerState>((state) => {
const brutalLifeTraits = state.stockSpecific.brutalLife.traits;
brutalLifeTraits.push(traitPath);
state.stockSpecific.brutalLife.traits = brutalLifeTraits;
}));
},



setHuntingGround: (huntingGround: HuntingGroundsList) => {
set(produce<CharacterBurnerState>((state) => {
state.stockSpecific.territory.huntingGround = huntingGround;
}));
},



modifySpecialLifepathValue: (value: { advisorToTheCourtYears: number; } | { princeOfTheBloodYears: number; } | { bondsmanOwnerLifepathPath: LifepathId; }) => {
set(produce<CharacterBurnerState>((state) => {
	if ("advisorToTheCourtYears" in value) state.specialLifepaths.advisorToTheCourt.years = value.advisorToTheCourtYears;
	if ("bondsmanOwnerLifepathPath" in value) state.specialLifepaths.bondsman.ownerLifepathPath = value.bondsmanOwnerLifepathPath;
	if ("princeOfTheBloodYears" in value) state.specialLifepaths.princeOfTheBlood.years = value.princeOfTheBloodYears;
}));
}



			*/
		})
	)
);
