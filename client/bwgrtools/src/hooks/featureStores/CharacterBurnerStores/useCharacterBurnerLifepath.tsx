import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerMiscStore } from "./useCharacterBurnerMisc";
import { FilterLifepaths } from "../../../utils/filterLifepaths";
import { Pairwise } from "../../../utils/misc";
import { useRulesetStore } from "../../apiStores/useRulesetStore";
import { useCharacterBurnerAttributeStore } from "../CharacterBurnerStores/useCharacterBurnerAttribute";
import { useCharacterBurnerBasicsStore } from "../CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerSkillStore } from "../CharacterBurnerStores/useCharacterBurnerSkill";
import { useCharacterBurnerStatStore } from "../CharacterBurnerStores/useCharacterBurnerStat";
import { useCharacterBurnerTraitStore } from "../CharacterBurnerStores/useCharacterBurnerTrait";


export type CharacterBurnerLifepathState = {
	availableLifepaths: Lifepath[];
	lifepaths: Lifepath[];

	reset: () => void;

	addLifepath: (lifepath: Lifepath) => void;
	removeLastLifepath: () => void;

	hasLifepath: (id: LifepathId) => number;
	hasLifepathByName: (name: string) => number;
	hasSetting: (id: SettingId) => number;
	hasSettingByName: (name: string) => number;

	getLeadCount: () => number;
	getAge: (lifepaths?: Lifepath[]) => number;

	getMentalPool: (lifepaths?: Lifepath[]) => Points;
	getPhysicalPool: (lifepaths?: Lifepath[]) => Points;
	getEitherPool: (lifepaths?: Lifepath[]) => Points;

	updateAvailableLifepaths: () => Lifepath[];
};

export const useCharacterBurnerLifepathStore = create<CharacterBurnerLifepathState>()(
	devtools(
		(set, get) => ({
			availableLifepaths: [],
			lifepaths: [],

			reset: (): void => {
				set({
					availableLifepaths: [],
					lifepaths: []
				});
			},

			addLifepath: (lifepath: Lifepath): void => {
				set(produce<CharacterBurnerLifepathState>((state) => { state.lifepaths.push(lifepath); }));
				get().updateAvailableLifepaths();
				useCharacterBurnerStatStore.getState().reset();
				useCharacterBurnerSkillStore.getState().updateSkills();
				useCharacterBurnerTraitStore.getState().updateTraits();
				useCharacterBurnerAttributeStore.getState().updateAttributes();
			},

			removeLastLifepath: (): void => {
				set(produce<CharacterBurnerLifepathState>((state) => {
					state.lifepaths = state.lifepaths.slice(0, state.lifepaths.length - 1);
				}));
				get().updateAvailableLifepaths();
				useCharacterBurnerStatStore.getState().reset();
				useCharacterBurnerSkillStore.getState().updateSkills();
				useCharacterBurnerTraitStore.getState().updateTraits();
				useCharacterBurnerAttributeStore.getState().updateAttributes();
			},

			hasLifepath: (id: LifepathId): number => {
				return get().lifepaths.filter(v => v.id === id).length;
			},

			hasLifepathByName: (name: string): number => {
				return get().lifepaths.filter(v => v.name === name).length;
			},

			hasSetting: (id: SettingId): number => {
				return get().lifepaths.filter(v => v.setting[0] === id).length;
			},

			hasSettingByName: (name: string): number => {
				return get().lifepaths.filter(v => v.setting[1] === name).length;
			},

			getLeadCount: (): number => {
				const state = get();
				if (state.lifepaths.length === 0) return 0;
				return Pairwise(state.lifepaths).reduce((pv, cv) => cv[0].setting[0] !== cv[1].setting[0] ? pv + 1 : pv, 0);
			},

			getAge: (lifepaths?: Lifepath[]): number => {
				const state = get();
				const lps = (lifepaths || state.lifepaths);

				if (lps.length === 0) return 0;

				// TODO: Special lifepaths should matter here
				const yrs = lps.map(v => v.years).filter(v => typeof v === "number") as number[];
				const sum = yrs.reduce((prev, curr) => prev + curr);
				return sum + get().getLeadCount();
			},

			getMentalPool: (lifepaths?: Lifepath[]): Points => {
				const lps = lifepaths || get().lifepaths;
				const { getAgePool } = useCharacterBurnerBasicsStore.getState();
				const { stats } = useCharacterBurnerStatStore.getState();

				const stockAgePool = getAgePool().mentalPool;
				const lifepathPool = lps.length > 0 ? lps.map(lp => lp.pools.mentalStatPool).reduce((pv, cv) => pv + cv) : 0;
				const total = stockAgePool + lifepathPool;

				const spent
					= Object.values(stats)
						.filter(s => s.poolType === "Mental")
						.map((v): number => v.mainPoolSpent.shade + v.mainPoolSpent.exponent)
						.reduce((pv, cv) => pv + cv);

				return { total: total, spent, remaining: total - spent };
			},

			getPhysicalPool: (lifepaths?: Lifepath[]): Points => {
				const lps = lifepaths || get().lifepaths;
				const { getAgePool } = useCharacterBurnerBasicsStore.getState();
				const { stats } = useCharacterBurnerStatStore.getState();

				const stockAgePool = getAgePool().physicalPool;
				const lifepathPool = lps.length > 0 ? lps.map(lp => lp.pools.physicalStatPool).reduce((pv, cv) => pv + cv) : 0;
				const total = stockAgePool + lifepathPool;

				const spent
					= Object.values(stats)
						.filter(s => s.poolType === "Physical")
						.map((v): number => v.mainPoolSpent.shade + v.mainPoolSpent.exponent)
						.reduce((pv, cv) => pv + cv);

				return { total: total, spent, remaining: total - spent };
			},

			getEitherPool: (lifepaths?: Lifepath[]): Points => {
				const lps = lifepaths || get().lifepaths;
				const { stats } = useCharacterBurnerStatStore.getState();

				const total = lps.length > 0 ? lps.map(lp => lp.pools.eitherStatPool).reduce((pv, cv) => pv + cv) : 0;
				const spent
					= Object.values(stats)
						.map((v): number => v.eitherPoolSpent.shade + v.eitherPoolSpent.exponent)
						.reduce((pv, cv) => pv + cv);

				return { total, spent, remaining: total - spent };
			},

			updateAvailableLifepaths: (onlyReturn?: boolean): Lifepath[] => {
				const { lifepaths, hasSetting, getAge } = get();

				const ruleset = useRulesetStore.getState();
				const { gender, stock } = useCharacterBurnerBasicsStore.getState();
				const { hasQuestionTrue } = useCharacterBurnerMiscStore.getState();
				const { hasSkillOpen } = useCharacterBurnerSkillStore.getState();
				const { hasTraitOpen } = useCharacterBurnerTraitStore.getState();
				const { attributes, hasAttribute } = useCharacterBurnerAttributeStore.getState();


				const possibleLifepaths: Lifepath[] = FilterLifepaths({
					rulesetLifepaths: ruleset.lifepaths,
					stock: stock,
					age: getAge(),
					gender: gender,
					lifepaths: lifepaths,
					attributes: attributes,
					hasAttribute: hasAttribute,
					hasSkillOpen: hasSkillOpen,
					hasTraitOpen: hasTraitOpen,
					hasSetting: hasSetting,
					hasQuestionTrue: hasQuestionTrue
				});

				if (onlyReturn) return possibleLifepaths;

				set(produce<CharacterBurnerLifepathState>((state) => { state.availableLifepaths = possibleLifepaths; }));
				return possibleLifepaths;
			}
		}),
		{ name: "useCharacterBurnerLifepathStore" }
	)
);
