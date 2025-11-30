import { Average } from "@utility/Average";
import { Clamp } from "@utility/Clamp";
import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerAttributeStore } from "./useCharacterBurnerAttribute";
import { useCharacterBurnerBasicsStore } from "./useCharacterBurnerBasics";
import { useCharacterBurnerStatStore } from "./useCharacterBurnerStat";
import { useCharacterBurnerTraitStore } from "./useCharacterBurnerTrait";
import { useRulesetStore } from "../../apiStores/useRulesetStore";


export interface CharacterBurnerMiscState {
	special: BwgrCharacterSpecial;
	questions: BwgrCharacterQuestion[];
	limits: BwgrCharacterStockLimits;
	traitEffects: BwgrCharacterTraitEffect[];

	reset: () => void;

	modifyCompanionLifepath: (companionName: string, companionLifepathId: BwgrLifepathId) => void;
	modifyVariableAge: (lifepathId: BwgrLifepathId, age: number, minmax: number[]) => void;
	modifyCompanionSkills: (companionLifepathId: BwgrLifepathId, skills: BwgrSkillId[] | undefined) => void;
	modifySkillSubskills: (skillId: BwgrSkillId, subskillIds: BwgrSkillId[] | null, canSelectMultiple: boolean) => void;
	resetSkillSubskills: (skillIds: BwgrSkillId[]) => void;

	addBrutalLifeTrait: (traitId: [id: BwgrTraitId, name: string] | "No Trait") => void;
	setHuntingGround: (huntingGround: BwgrHuntingGroundsList) => void;

	switchQuestion: (id: BwgrQuestionId) => void;
	refreshQuestions: () => void;
	hasQuestionTrue: (id: BwgrQuestionId) => boolean;
	hasQuestionTrueByName: (name: string) => boolean;

	getTolerances: () => string[];
	refreshTraitEffects: () => void;
}

export const useCharacterBurnerMiscStore = create<CharacterBurnerMiscState>()(
	devtools(
		(set, get) => ({
			special: {
				stock: { brutalLifeTraits: [], huntingGround: undefined },
				companionLifepath: {},
				variableAge: {},
				companionSkills: {},
				chosenSubskills: {}
			},

			questions: [],

			traitEffects: [],

			limits: {
				beliefs: 3,
				instincts: 3,
				stats: {
					Will: { min: 1, max: 8 },
					Perception: { min: 1, max: 8 },
					Power: { min: 1, max: 8 },
					Agility: { min: 1, max: 8 },
					Forte: { min: 1, max: 8 },
					Speed: { min: 1, max: 8 }
				},
				attributes: 9
			},

			reset: (): void => {
				const { stock } = useCharacterBurnerBasicsStore.getState();
				const { hasTraitOpenByName } = useCharacterBurnerTraitStore.getState();

				const limits: BwgrCharacterStockLimits = {
					beliefs: 3, // TODO: trait-based belief limit
					instincts: 3, // TODO: trait-based instinct limit
					stats: {
						Will: { min: 1, max: 8 },
						Perception: { min: 1, max: 8 },
						Power: { min: 1, max: 8 },
						Agility: { min: 1, max: 8 },
						Forte: { min: 1, max: 8 },
						Speed: { min: 1, max: 8 }
					},
					attributes: 9
				};

				set(produce<CharacterBurnerMiscState>(state => {
					state.special = {
						stock: { brutalLifeTraits: [], huntingGround: undefined },
						companionLifepath: {},
						variableAge: {},
						companionSkills: {},
						chosenSubskills: {}
					};
					state.questions = [];
					state.traitEffects = [];

					if (stock[1] === "Elf") {
						if (hasTraitOpenByName("First Born")) state.limits.stats.Perception = { min: 1, max: 9 };
					}
					else if (stock[1] === "Great Wolf") {
						if (hasTraitOpenByName("Great Lupine Form")) state.limits.stats.Agility = { min: 1, max: 6 };
					}
					else if (stock[1] === "Troll") {
						if (hasTraitOpenByName("Massive Stature")) {
							state.limits.stats.Power = { min: 4, max: 9 };
							state.limits.stats.Forte = { min: 4, max: 9 };
							state.limits.stats.Agility = { min: 1, max: 5 };
							state.limits.stats.Speed = { min: 1, max: 5 };
						}
					}

					state.limits = limits;
				}));

				get().refreshTraitEffects();
			},

			modifyCompanionLifepath: (companionName: string, companionLifepathId: BwgrLifepathId): void => {
				set(produce<CharacterBurnerMiscState>(state => {
					state.special.companionLifepath[companionName] = companionLifepathId;
				}));
			},

			modifyVariableAge: (lifepathId: BwgrLifepathId, age: number, minmax: number[]): void => {
				set(produce<CharacterBurnerMiscState>(state => {
					state.special.variableAge[lifepathId] = Clamp(age, minmax[0], minmax[1]);
				}));
			},

			modifyCompanionSkills: (companionLifepathId: BwgrLifepathId, skills: BwgrSkillId[] | undefined): void => {
				if (skills) {
					set(produce<CharacterBurnerMiscState>(state => {
						state.special.companionSkills[companionLifepathId] = skills;
					}));
				}
			},

			modifySkillSubskills: (skillId: BwgrSkillId, subskillIds: BwgrSkillId[] | null, canSelectMultiple: boolean): void => {
				const prev = get().special.chosenSubskills[skillId];

				if (canSelectMultiple && subskillIds) {
					set(produce<CharacterBurnerMiscState>(state => {
						state.special.chosenSubskills[skillId] = [...subskillIds];
					}));
				}
				else {
					set(produce<CharacterBurnerMiscState>(state => {
						if (subskillIds === null) state.special.chosenSubskills[skillId] = [];
						else if (prev.includes(subskillIds[0])) state.special.chosenSubskills[skillId] = [];
						else state.special.chosenSubskills[skillId] = [subskillIds[0]];
					}));
				}
			},

			resetSkillSubskills: (skillIds: BwgrSkillId[]): void => {
				skillIds.forEach(skillId => {
					set(produce<CharacterBurnerMiscState>(state => {
						state.special.chosenSubskills[skillId] = [];
					}));
				}
				);
			},

			addBrutalLifeTrait: (traitId: [id: BwgrTraitId, name: string] | "No Trait") => {
				set(produce<CharacterBurnerMiscState>(state => {
					const prev = state.special.stock.brutalLifeTraits;
					state.special.stock.brutalLifeTraits = [...prev, traitId];
				}));
			},

			setHuntingGround: (huntingGround: BwgrHuntingGroundsList) => {
				set(produce<CharacterBurnerMiscState>(state => {
					state.special.stock.huntingGround = huntingGround;
				}));
			},

			switchQuestion: (id: BwgrQuestionId): void => {
				const index = get().questions.findIndex(v => v.id === id);

				set(produce<CharacterBurnerMiscState>(state => {
					const prev = state.questions[index];
					state.questions[index] = { ...prev, answer: !prev.answer };
				}));
			},

			refreshQuestions: () => {
				const ruleset = useRulesetStore.getState();
				const { hasAttribute } = useCharacterBurnerAttributeStore.getState();
				const { questions } = get();

				const newQuestions: BwgrCharacterQuestion[] =
					ruleset.questions
						.filter(v => {
							const attrIds = [];
							if (v.attributes?.[0]?.[0]) attrIds.push(v.attributes[0][0]);
							if (v.attributes?.[1]?.[0]) attrIds.push(v.attributes[1][0]);
							if (attrIds.length === 0) return true;
							else if (attrIds.length > 0 && attrIds.some(v => hasAttribute(v))) return true;
							else return false;
						})
						.map(question => {
							const idx = questions.findIndex(v => v.id === question.id);
							return {
								id: question.id,
								name: question.name,
								question: question.question,
								answer: (idx > -1) ? questions[idx].answer : false
							};
						});

				set(produce<CharacterBurnerMiscState>(state => {
					state.questions = newQuestions;
				}));
			},

			hasQuestionTrue: (id: BwgrQuestionId): boolean => {
				return get().questions.some(v => v.id === id && v.answer);
			},

			hasQuestionTrueByName: (name: string): boolean => {
				return get().questions.some(v => v.name === name && v.answer);
			},

			refreshTraitEffects: () => {
				const { hasTraitOpenByName } = useCharacterBurnerTraitStore.getState();

				set(produce<CharacterBurnerMiscState>(state => {
					state.traitEffects = [];

					// EXTRA BELIEF/INSTINCT TRAITS
					// TODO: call-on trait effects

					// CALL-ON
					// TODO: call-on trait effects

					// GENERAL DIE
					// TODO: die trait effects
					if (hasTraitOpenByName("Tough")) state.traitEffects.push({ roundUp: "Mortal Wound" });

					// GENERAL MONSTROUS
					// TODO: monstrous trait effects
				}));
			},

			getTolerances: (): string[] => {
				const { getStat } = useCharacterBurnerStatStore.getState();
				const { traitEffects } = get();

				const power = getStat("Power");
				const forte = getStat("Forte");

				const ptgs = Array(16).fill("—") as string[];

				const maxDistance = Math.ceil(forte.exponent / 2);

				const mortalWound =
					traitEffects.some(x => "roundUp" in x && x.roundUp === "Mortal Wound") ? Math.ceil(Average([power.exponent, forte.exponent])) + 6 : Math.floor(Average([power.exponent, forte.exponent])) + 6;

				let traumatic = mortalWound - 1;
				let severe = mortalWound - 2;
				let midi = mortalWound - 3;
				let light = mortalWound - 4;
				const superficial = Math.floor(forte.exponent / 2) + 1;

				while (light - superficial > maxDistance) light--;
				while (midi - light > maxDistance) midi--;
				while (severe - midi > maxDistance) severe--;
				while (traumatic - severe > maxDistance) traumatic--;

				for (let i = 0; i < ptgs.length; i++) {
					if (i >= superficial && i < light) ptgs[i] = "Su";
					else if (i >= light && i < midi) ptgs[i] = "Li";
					else if (i >= midi && i < severe) ptgs[i] = "Mi";
					else if (i >= severe && i < traumatic) ptgs[i] = "Se";
					else if (i >= traumatic && i < mortalWound) ptgs[i] = "Tr";
					else if (i === mortalWound) ptgs[i] = "MW";
				}

				return ptgs;
			}
		}),
		{ name: "useCharacterBurnerMiscStore" }
	)
);
