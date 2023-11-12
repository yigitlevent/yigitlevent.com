import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerAttributeStore } from "./useCharacterBurnerAttribute";
import { useCharacterBurnerLifepathStore } from "./useCharacterBurnerLifepath";
import { useCharacterBurnerMiscStore } from "./useCharacterBurnerMisc";
import { useCharacterBurnerSkillStore } from "./useCharacterBurnerSkill";
import { useCharacterBurnerStatStore } from "./useCharacterBurnerStat";
import { useCharacterBurnerTraitStore } from "./useCharacterBurnerTrait";
import { useRulesetStore } from "../../apiStores/useRulesetStore";


export type CharacterBurnerBasicsState = {
	name: string;
	concept: string;
	gender: string;
	stock: [id: StockId, name: string];

	beliefs: { name: string, belief: string; }[];
	instincts: { name: string, instinct: string; }[];

	setName: (name: string) => void;
	setConcept: (concept: string) => void;
	setGender: (gender: string) => void;

	setStockAndReset: (stock?: [id: StockId, name: string]) => void;

	setBelief: (index: number, belief: string) => void;
	setInstinct: (index: number, instinct: string) => void;

	getAgePool: () => { minAge: number; mentalPool: number; physicalPool: number; };
};

export const useCharacterBurnerBasicsStore = create<CharacterBurnerBasicsState>()(
	devtools(
		(set, get) => ({
			stock: [0 as StockId, "Dwarf"],
			concept: "",
			name: "",
			gender: "Male",

			beliefs: [
				{ name: "Belief 1", belief: "" },
				{ name: "Belief 2", belief: "" },
				{ name: "Belief 3", belief: "" },
				{ name: "Special Belief", belief: "" }
			],
			instincts: [
				{ name: "Instinct 1", instinct: "" },
				{ name: "Instinct 2", instinct: "" },
				{ name: "Instinct 3", instinct: "" },
				{ name: "Special Instinct", instinct: "" }
			],

			setStockAndReset: (stock?: [id: StockId, name: string]): void => {
				set({
					stock: [0 as StockId, "Dwarf"],
					concept: "",
					name: "",
					gender: "Male",

					beliefs: [
						{ name: "Belief 1", belief: "" },
						{ name: "Belief 2", belief: "" },
						{ name: "Belief 3", belief: "" },
						{ name: "Special Belief", belief: "" }
					],
					instincts: [
						{ name: "Instinct 1", instinct: "" },
						{ name: "Instinct 2", instinct: "" },
						{ name: "Instinct 3", instinct: "" },
						{ name: "Special Instinct", instinct: "" }
					]
				});

				if (stock) set({ stock });
				useCharacterBurnerLifepathStore.getState().reset();
				useCharacterBurnerStatStore.getState().reset();
				useCharacterBurnerAttributeStore.getState().reset();
				useCharacterBurnerSkillStore.getState().reset();
				useCharacterBurnerTraitStore.getState().reset();
				useCharacterBurnerMiscStore.getState().reset();
			},

			setName: (name: string): void => {
				set({ name });
			},

			setConcept: (concept: string): void => {
				set({ concept });
			},

			setGender: (gender: string): void => {
				set({ gender });
			},

			setBelief: (index: number, belief: string): void => {
				set(produce<CharacterBurnerBasicsState>((state) => {
					state.beliefs[index].belief = belief;
				}));
			},

			setInstinct: (index: number, instinct: string): void => {
				set(produce<CharacterBurnerBasicsState>((state) => {
					state.instincts[index].instinct = instinct;
				}));
			},

			getAgePool: (): { minAge: number; mentalPool: number; physicalPool: number; } => {
				const { getStock } = useRulesetStore.getState();
				const { getAge } = useCharacterBurnerLifepathStore.getState();
				const { stock } = get();

				const age = getAge();
				if (age === 0) return { minAge: 0, mentalPool: 0, physicalPool: 0 };
				const agePool = getStock(stock[0]).agePool;
				return agePool.filter(a => age > a.minAge).reduce((pv, cv) => pv.minAge < cv.minAge ? pv : cv);
			}
		})
	)
);
