import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerAttributeStore } from "./useCharacterBurnerAttribute";
import { useCharacterBurnerBasicsStore } from "./useCharacterBurnerBasics";
import { useCharacterBurnerStatStore } from "./useCharacterBurnerStat";
import { useCharacterBurnerTraitStore } from "./useCharacterBurnerTrait";
import { GetAverage } from "../../../utils/misc";
import { useRulesetStore } from "../../apiStores/useRulesetStore";


export type CharacterBurnerMiscState = {
	stockSpecific: CharacterStockSpecific;
	questions: CharacterQuestion[];
	limits: CharacterStockLimits;
	traitEffects: CharacterTraitEffect[];

	reset: () => void;

	switchQuestion: (id: QuestionId) => void;
	refreshQuestions: () => void;
	hasQuestionTrue: (id: QuestionId) => boolean;
	hasQuestionTrueByName: (name: string) => boolean;

	getTolerances: () => string[];
	refreshTraitEffects: () => void;
};

export const useCharacterBurnerMiscStore = create<CharacterBurnerMiscState>()(
	devtools(
		(set, get) => ({
			stockSpecific: {},
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

				const limits: CharacterStockLimits = {
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

				set(produce<CharacterBurnerMiscState>((state) => {
					state.stockSpecific = {};
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

			switchQuestion: (id: QuestionId): void => {
				const index = get().questions.findIndex(v => v.id === id);

				set(produce<CharacterBurnerMiscState>((state) => {
					const prev = state.questions[index];
					state.questions[index] = { ...prev, answer: !prev.answer };
				}));
			},

			refreshQuestions: () => {
				const ruleset = useRulesetStore.getState();
				const { hasAttribute } = useCharacterBurnerAttributeStore.getState();
				const { questions } = get();

				const newQuestions: CharacterQuestion[]
					= ruleset.questions
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

				set(produce<CharacterBurnerMiscState>((state) => {
					state.questions = newQuestions;
				}));
			},

			hasQuestionTrue: (id: QuestionId): boolean => {
				return get().questions.some(v => v.id === id && v.answer);
			},

			hasQuestionTrueByName: (name: string): boolean => {
				return get().questions.some(v => v.name === name && v.answer);
			},

			refreshTraitEffects: () => {
				const { hasTraitOpenByName } = useCharacterBurnerTraitStore.getState();

				set(produce<CharacterBurnerMiscState>((state) => {
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

				const ptgs: string[] = Array(16).fill("—");

				const maxDistance = Math.ceil(forte.exponent / 2);

				const mortalWound
					= traitEffects.some(x => "roundUp" in x && x.roundUp === "Mortal Wound")
						? Math.ceil(GetAverage([power.exponent, forte.exponent])) + 6
						: Math.floor(GetAverage([power.exponent, forte.exponent])) + 6;

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
