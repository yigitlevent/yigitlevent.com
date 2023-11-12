import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerMiscStore } from "./useCharacterBurnerMisc";
import { Pairwise } from "../../../utils/misc";
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
	getAge: () => number;

	getResourcePoints: () => number;

	getMentalPool: () => Points;
	getPhysicalPool: () => Points;
	getEitherPool: () => Points;

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
				set(produce<CharacterBurnerLifepathState>((state) => {
					state.lifepaths.push(lifepath);
				}));
				get().updateAvailableLifepaths();
				useCharacterBurnerSkillStore.getState().updateSkills();
				useCharacterBurnerTraitStore.getState().updateTraits();
				useCharacterBurnerAttributeStore.getState().updateAttributes();
			},

			removeLastLifepath: (): void => {
				set(produce<CharacterBurnerLifepathState>((state) => {
					state.lifepaths = state.lifepaths.slice(0, state.lifepaths.length - 1);
				}));
				get().updateAvailableLifepaths();
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

			getAge: (): number => {
				const state = get();
				if (state.lifepaths.length === 0) return 0;
				const yrs = state.lifepaths.map(v => v.years).filter(v => typeof v === "number") as number[];
				const sum = yrs.reduce((prev, curr) => prev + curr);
				// TODO: Special lifepaths should matter here
				return sum + get().getLeadCount();
			},

			getResourcePoints: (): number => {
				const state = get();
				if (state.lifepaths.length === 0) return 0;
				const rps = state.lifepaths.map(v => v.pools.resourcePoints).reduce((pv, cv) => pv + cv);
				// TODO: Special lifepaths should matter here
				return rps;
			},

			getMentalPool: (): Points => {
				const { lifepaths } = get();
				const { getAgePool } = useCharacterBurnerBasicsStore.getState();
				const { stats } = useCharacterBurnerStatStore.getState();

				const stockAgePool = getAgePool().mentalPool;
				const lifepathPool = lifepaths.length > 0 ? lifepaths.map(lp => lp.pools.mentalStatPool).reduce((pv, cv) => pv + cv) : 0;
				const total = stockAgePool + lifepathPool;

				const spent
					= Object.values(stats)
						.filter(s => s.poolType === "Mental")
						.map((v): number => v.poolSpent).reduce((pv, cv) => pv + cv);

				return { total: total, spent, remaining: total - spent };
			},

			getPhysicalPool: (): Points => {
				const { lifepaths } = get();
				const { getAgePool } = useCharacterBurnerBasicsStore.getState();
				const { stats } = useCharacterBurnerStatStore.getState();

				const stockAgePool = getAgePool().physicalPool;
				const lifepathPool = lifepaths.length > 0 ? lifepaths.map(lp => lp.pools.physicalStatPool).reduce((pv, cv) => pv + cv) : 0;
				const total = stockAgePool + lifepathPool;

				const spent
					= Object.values(stats)
						.filter(s => s.poolType === "Physical")
						.map((v): number => v.poolSpent).reduce((pv, cv) => pv + cv);

				return { total: total, spent, remaining: total - spent };
			},

			getEitherPool: (): Points => {
				const { lifepaths } = get();
				const { stats } = useCharacterBurnerStatStore.getState();

				const total = lifepaths.length > 0 ? lifepaths.map(lp => lp.pools.eitherStatPool).reduce((pv, cv) => pv + cv) : 0;
				const spent
					= Object.values(stats)
						.map((v): number => v.eitherSpent)
						.reduce((pv, cv) => pv + cv);

				return { total, spent, remaining: total - spent };
			},

			updateAvailableLifepaths: (): Lifepath[] => {
				const { lifepaths, hasLifepath, hasSetting, getAge } = get();

				const { gender, stock } = useCharacterBurnerBasicsStore.getState();
				const { hasQuestionTrue } = useCharacterBurnerMiscStore.getState();
				const { hasSkillOpen } = useCharacterBurnerSkillStore.getState();
				const { hasTraitOpen } = useCharacterBurnerTraitStore.getState();
				const { attributes, hasAttribute } = useCharacterBurnerAttributeStore.getState();

				if (lifepaths.length === 0) {
					const bornLps = lifepaths.filter(lp => lp.flags.isBorn && stock[0] === lp.stock[0]);

					set(produce<CharacterBurnerLifepathState>((state) => {
						state.availableLifepaths = state.lifepaths.filter(lp => lp.flags.isBorn && stock[0] === lp.stock[0]);
					}));

					return bornLps;
				}

				const checkRequirementBlock = (lifepath: Lifepath, block: LifepathRequirementBlock): boolean => {
					const itemResults = block.items.map((item): boolean => {
						// TODO: item.forCompanion

						if ("isUnique" in item) return hasLifepath(lifepath.id) === 0;
						else if ("isSettingEntry" in item) return true; // TODO: Check if any other lifepath from this setting chosen (true), else, other lifepaths should be disabled
						else if ("minLpIndex" in item) return lifepaths.length >= item.minLpIndex;
						else if ("maxLpIndex" in item) return lifepaths.length <= item.maxLpIndex;
						else if ("minYears" in item) return getAge() >= item.minYears;
						else if ("maxYears" in item) return getAge() <= item.maxYears;
						else if ("gender" in item) return item.gender === gender;
						else if ("oldestBy" in item) return true; // TODO: Implementable only by having the campaign 
						else if ("attribute" in item) {
							const exp = attributes.find(item.attribute[0])?.exponent;
							if (item.min) return exp ? exp >= item.min : false;
							else if (item.max) return exp ? exp <= item.max : false;
							else return hasAttribute(item.attribute[0]);
						}
						else if ("skill" in item) return hasSkillOpen(item.skill[0]);
						else if ("trait" in item) return hasTraitOpen(item.trait[0]);
						else if ("lifepath" in item) return hasLifepath(item.lifepath[0]) >= block.fulfillmentAmount;
						else if ("setting" in item) return hasSetting(item.setting[0]) >= block.fulfillmentAmount;
						else if ("question" in item) return hasQuestionTrue(item.question[0]);
						else throw new Error(`Unidentified requirement block item: ${item}`);
					});

					if (block.logicType[1] === "OR") return itemResults.some(v => v === true);
					else if (block.logicType[1] === "AND") return itemResults.every(v => v === true);
					else if (block.logicType[1] === "NOT") return !itemResults.every(v => v === false);
					return false;
				};

				const lastLifepath = lifepaths[lifepaths.length - 1];
				const possibleSettingIds = lastLifepath.leads ? [lastLifepath.setting[0], ...lastLifepath.leads] : [lastLifepath.setting[0]];
				const possibleLifepaths
					= possibleSettingIds
						.map(settingId => lifepaths.filter(x => stock[0] === x.stock[0] && x.setting[0] === settingId && x.flags.isBorn === false))
						.flat()
						.filter(lifepath => {
							if (lifepath.requirements) {
								const blockResults = lifepath.requirements.map(block => ({ mustFulfill: block.mustFulfill, result: checkRequirementBlock(lifepath, block) }));
								const musts = blockResults.every(v => v.mustFulfill && v.result);
								const atLeastOne = blockResults.some(v => v.result);
								return musts && atLeastOne;
							}
							return true;
						});

				set(produce<CharacterBurnerLifepathState>((state) => {
					state.availableLifepaths = possibleLifepaths;
				}));

				return possibleLifepaths;
			}
		})
	)
);
