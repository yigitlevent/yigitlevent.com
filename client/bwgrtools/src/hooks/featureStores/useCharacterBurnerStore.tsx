import produce from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Clamp, Pairwise } from "../../utils/misc";
import { UniqueArray } from "../../utils/uniqueArray";
import { useRulesetStore } from "../apiStores/useRulesetStore";


interface CharacterBurnerProperties {
	stock: [id: StockId, name: string];
	concept: string;
	name: string;
	gender: string;

	beliefs: { name: string, belief: string; }[];
	instincts: { name: string, instinct: string; }[];

	availableLifepaths: Lifepath[];
	lifepaths: Lifepath[];

	stats: { [key: string]: { poolType: "Mental" | "Physical", shadeShifted: boolean, poolSpent: number; eitherSpent: number; }; };

	skills: UniqueArray<SkillId, CharacterSkill>;
	traits: UniqueArray<TraitId, CharacterTrait>;
	attributes: UniqueArray<AbilityId, CharacterAttribute>;

	questions: CharacterQuestions;
	stockSpecific: CharacterStockSpecific;
	limits: CharacterStockLimits;
}

interface CharacterBurnerMethods {
	reset: (stock?: [id: StockId, name: string]) => void;

	addLifepath: (lifepath: Lifepath) => void;
	removeLastLifepath: () => void;

	setName: (name: string) => void;
	setConcept: (concept: string) => void;
	setGender: (gender: string) => void;

	shiftStatShade: (statName: string) => void;
	modifyStatExponent: (statName: string, decrease?: boolean) => void;
	openSkill: (skillId: SkillId) => void;
	modifySkillExponent: (skillId: SkillId, decrease?: boolean) => void;

	getLeadCount: () => number;
	getAge: () => number;
	getResourcePoints: () => number;
	getAgePool: () => { minAge: number; mentalPool: number; physicalPool: number; };
	getMentalPool: () => { total: number, spent: number; remaining: number; };
	getPhysicalPool: () => { total: number, spent: number; remaining: number; };
	getEitherPool: () => { total: number, spent: number; remaining: number; };
	getStat: (statName: string) => { shade: ShadesList, exponent: number; };
	getSkillPools: () => { general: Points; lifepath: Points; };
	getSkill: (skillId: SkillId) => { shade: ShadesList; exponent: number; };

	updateAvailableLifepaths: () => Lifepath[];

	hasSkillOpen: (id: SkillId) => boolean;
	hasTraitOpen: (id: TraitId) => boolean;
	hasAttribute: (id: AbilityId) => boolean;
	hasLifepath: (id: LifepathId) => number;
	hasSetting: (id: SettingId) => number;

	updateSkills: () => void;
	updateTraits: () => void;
}

type CharacterBurnerState = CharacterBurnerProperties & CharacterBurnerMethods;

const InitialState: CharacterBurnerProperties = {
	stock: [0 as unknown as StockId, "Dwarf"] as [id: StockId, name: string],
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

	availableLifepaths: [],
	lifepaths: [],

	stats: {
		"Will": { poolType: "Mental", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Perception": { poolType: "Mental", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Power": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Agility": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Forte": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Speed": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 }
	},

	skills: new UniqueArray<SkillId, CharacterSkill>(),
	traits: new UniqueArray<TraitId, CharacterTrait>(),
	attributes: new UniqueArray<AbilityId, CharacterAttribute>(),

	questions: {},
	stockSpecific: {},
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
	}
};

export const useCharacterBurnerStore = create<CharacterBurnerState>()(
	devtools((set, get) => ({
		...InitialState,

		reset: (stock?: [id: StockId, name: string]) => {
			const init = InitialState;
			if (stock) init.stock = stock;
			set(init);
			get().updateAvailableLifepaths();
		},

		addLifepath: (lifepath: Lifepath) => {
			set(produce<CharacterBurnerState>((state) => {
				state.lifepaths.push(lifepath);
			}));
			const state = get();
			state.updateAvailableLifepaths();
			state.updateSkills();
			state.updateTraits();
		},

		removeLastLifepath: () => {
			set(produce<CharacterBurnerState>((state) => {
				state.lifepaths = state.lifepaths.slice(0, state.lifepaths.length - 1);
			}));
			const state = get();
			state.updateAvailableLifepaths();
			state.updateSkills();
			state.updateTraits();
		},

		setName: (name: string): void => { set({ name }); },
		setConcept: (concept: string): void => { set({ concept }); },
		setGender: (gender: string): void => { set({ gender }); },

		shiftStatShade: (statName: string) => {
			set(produce<CharacterBurnerState>((state) => {
				state.stats[statName].shadeShifted = !state.stats[statName].shadeShifted;
				// TODO: Check remaining counts, use either pool too
				state.stats[statName].poolSpent += state.stats[statName].shadeShifted ? 5 : -5;
			}));
		},

		modifyStatExponent: (statName: string, decrease?: boolean) => {
			set(produce<CharacterBurnerState>((state) => {
				// TODO: Check remaining counts, use either pool too
				const newNumber = Clamp(state.stats[statName].poolSpent + (decrease ? -1 : 1), 0, state.limits.stats[statName].max);
				state.stats[statName].poolSpent = newNumber;
			}));
		},

		openSkill: (skillId: SkillId) => {
			set(produce<CharacterBurnerState>((state) => {
				// TODO: Check remaining counts, use either pool too
				const charSkill = state.skills.find(skillId);
				if (charSkill) {
					charSkill.isOpen = !charSkill.isOpen;
					state.skills = new UniqueArray(state.skills.add(charSkill).items);
				}
			}));
		},

		modifySkillExponent: (skillId: SkillId, decrease?: boolean) => {
			set(produce<CharacterBurnerState>((state) => {
				// TODO: Check remaining counts, use either pool too
				const charSkill = state.skills.find(skillId);
				if (charSkill) {
					charSkill.advancement.lifepath = Clamp(charSkill.advancement.lifepath + (decrease ? -1 : 1), 0, 10);
					state.skills = new UniqueArray(state.skills.add(charSkill).items);
				}
			}));
		},

		getLeadCount: () => {
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

		getAgePool: (): { minAge: number; mentalPool: number; physicalPool: number; } => {
			const { getStock } = useRulesetStore.getState();
			const state = get();
			const age = state.getAge();
			if (age === 0) return { minAge: 0, mentalPool: 0, physicalPool: 0 };
			const agePool = getStock(state.stock[0]).agePool;
			return agePool.filter(a => age > a.minAge).reduce((pv, cv) => pv.minAge < cv.minAge ? pv : cv);
		},

		getMentalPool: (): Points => {
			const state = get();
			const stockAgePool = state.getAgePool().mentalPool;
			const lifepathPool = state.lifepaths.length > 0 ? state.lifepaths.map(lp => lp.pools.mentalStatPool).reduce((pv, cv) => pv + cv) : 0;
			const total = stockAgePool + lifepathPool;

			const stats = Object.values(state.stats).filter(s => s.poolType === "Mental");
			const spent = stats.map((v): number => v.poolSpent).reduce((pv, cv) => pv + cv);

			return { total: total, spent, remaining: total - spent };
		},

		getPhysicalPool: (): Points => {
			const state = get();
			const stockAgePool = state.getAgePool().physicalPool;
			const lifepathPool = state.lifepaths.length > 0 ? state.lifepaths.map(lp => lp.pools.physicalStatPool).reduce((pv, cv) => pv + cv) : 0;
			const total = stockAgePool + lifepathPool;

			const stats = Object.values(state.stats).filter(s => s.poolType === "Physical");
			const spent = stats.map((v): number => v.poolSpent).reduce((pv, cv) => pv + cv);

			return { total: total, spent, remaining: total - spent };
		},

		getEitherPool: (): Points => {
			const state = get();
			const total = state.lifepaths.length > 0 ? state.lifepaths.map(lp => lp.pools.eitherStatPool).reduce((pv, cv) => pv + cv) : 0;
			const spent = Object.values(state.stats).map((v): number => v.eitherSpent).reduce((pv, cv) => pv + cv);
			return { total, spent, remaining: total - spent };
		},

		getStat: (statName: string): { shade: ShadesList; exponent: number; } => {
			const state = get();
			const shade = state.stats[statName].shadeShifted ? "G" : "B";
			const exponent = state.stats[statName].eitherSpent + state.stats[statName].poolSpent + (state.stats[statName].shadeShifted ? -5 : 0);
			return { shade, exponent };
		},

		getSkillPools: (): { general: Points; lifepath: Points; } => {
			const state = get();

			const gpTotal = state.lifepaths.reduce((pv, cv) => pv + cv.pools.generalSkillPool, 0);
			const lpTotal = state.lifepaths.reduce((pv, cv) => pv + cv.pools.lifepathSkillPool, 0);

			let gpSpent = 0;
			let lpSpent = 0;

			state.skills.forEach(skill => {
				if (skill.isOpen) {
					if (skill.isGeneral) {
						if (skill.isDoubleOpen) gpSpent += 2;
						else if (!skill.isDoubleOpen) gpSpent += 1;
						gpSpent += skill.advancement.general;
					}
					else {
						// TODO: maybe gp spent for lp skill
						if (skill.isDoubleOpen) lpSpent += 2;
						else if (!skill.isDoubleOpen) lpSpent += 1;
						lpSpent += skill.advancement.lifepath;
						gpSpent += skill.advancement.general;
					}
				}
			});

			return {
				general: { total: gpTotal, spent: gpSpent, remaining: gpTotal - gpSpent },
				lifepath: { total: lpTotal, spent: lpSpent, remaining: lpTotal - lpSpent }
			};
		},

		getSkill: (skillId: SkillId): { shade: ShadesList; exponent: number; } => {
			const { getSkill } = useRulesetStore.getState();
			const state = get();

			const charSkill = state.skills.find(skillId);

			let shade: ShadesList = "B";
			// TODO: exponent starts from root average
			let exponent: number = 0;

			if (charSkill && state.hasSkillOpen(skillId)) {
				exponent = charSkill.advancement.general + charSkill.advancement.lifepath;
				const skillRoots = getSkill(skillId).roots;
				if (skillRoots) shade = skillRoots.map(s => state.getStat(s[1]).shade).every(v => v === "G") ? "G" : "B";
			}

			return { shade, exponent };
		},

		updateAvailableLifepaths: () => {
			const { lifepaths } = useRulesetStore.getState();

			const state = get();

			if (state.lifepaths.length === 0) {
				const bornLps = lifepaths.filter(lp => lp.flags.isBorn && state.stock[0] === lp.stock[0]);

				set(produce<CharacterBurnerState>((state) => {
					state.availableLifepaths = lifepaths.filter(lp => lp.flags.isBorn && state.stock[0] === lp.stock[0]);
				}));

				return bornLps;
			}

			const checkRequirementBlock = (lifepath: Lifepath, block: LifepathRequirementBlock): boolean => {
				const itemResults = block.items.map((item): boolean => {
					// TODO: item.forCompanion

					if ("isUnique" in item) return state.hasLifepath(lifepath.id) === 0;
					else if ("isSettingEntry" in item) return true; // TODO: Check if any other lifepath from this setting chosen (true), else, other lifepaths should be disabled
					else if ("minLpIndex" in item) return state.lifepaths.length >= item.minLpIndex;
					else if ("maxLpIndex" in item) return state.lifepaths.length <= item.maxLpIndex;
					else if ("minYears" in item) return state.getAge() >= item.minYears;
					else if ("maxYears" in item) return state.getAge() <= item.maxYears;
					else if ("gender" in item) return item.gender === state.gender;
					else if ("oldestBy" in item) return true; // TODO: Implementable only by having the campaign 
					else if ("attribute" in item) {
						const exp = state.attributes.find(item.attribute[0])?.exponent;
						if (item.min) return exp ? exp >= item.min : false;
						else if (item.max) return exp ? exp <= item.max : false;
						else return state.hasAttribute(item.attribute[0]);
					}
					else if ("skill" in item) return state.hasSkillOpen(item.skill[0]);
					else if ("trait" in item) return state.hasTraitOpen(item.trait[0]);
					else if ("lifepath" in item) return state.hasLifepath(item.lifepath[0]) >= block.fulfillmentAmount;
					else if ("setting" in item) return state.hasSetting(item.setting[0]) >= block.fulfillmentAmount;
					else throw new Error(`Unidentified requirement block item: ${item}`);
				});

				if (block.logicType[1] === "OR") return itemResults.some(v => v === true);
				else if (block.logicType[1] === "AND") return itemResults.every(v => v === true);
				else if (block.logicType[1] === "NOT") return !itemResults.every(v => v === false);
				return false;
			};

			const lastLifepath = state.lifepaths[state.lifepaths.length - 1];
			const possibleSettingIds = lastLifepath.leads ? [lastLifepath.setting[0], ...lastLifepath.leads] : [lastLifepath.setting[0]];
			const possibleLifepaths =
				possibleSettingIds
					.map(settingId => lifepaths.filter(x => state.stock[0] === x.stock[0] && x.setting[0] === settingId && x.flags.isBorn === false))
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

			set(produce<CharacterBurnerState>((state) => {
				state.availableLifepaths = possibleLifepaths;
			}));

			return possibleLifepaths;
		},

		hasSkillOpen: (id: SkillId) => {
			return get().skills.exists(id, "isOpen", true);
		},

		hasTraitOpen: (id: TraitId) => {
			return get().traits.exists(id, "isOpen", true);
		},

		hasAttribute: (id: AbilityId) => {
			return get().attributes.has(id);
		},

		hasLifepath: (id: LifepathId): number => {
			return get().lifepaths.filter(v => v.id === id).length;
		},

		hasSetting: (id: SettingId): number => {
			return get().lifepaths.filter(v => v.setting[0] === id).length;
		},

		updateSkills: () => {
			const { getSkill } = useRulesetStore.getState();
			const state = get();

			const skills = state.lifepaths.map(lp => {
				return lp.skills ? lp.skills.map((sk, i) => {
					const skill = getSkill(sk);
					const isMandatory = (i === 0); // TODO: repeat lifepaths also should be checked
					const entry: CharacterSkill = {
						id: skill.id,
						name: skill.name,
						isGeneral: false,
						isDoubleOpen: skill.flags.isMagical || skill.flags.isTraining,
						isMandatory: isMandatory,
						isSpecial: skill.subskillIds ? true : false,
						isOpen: isMandatory,
						advancement: { general: 0, lifepath: 0 }
					};
					return entry;
				}) : [];
			}).flat();

			set(produce<CharacterBurnerState>((state) => {
				state.skills = new UniqueArray(skills);
			}));
		},

		updateTraits: () => {
			const { getTrait } = useRulesetStore.getState();
			const state = get();

			const traits = state.lifepaths.map(lp => {
				return lp.traits ? lp.traits.map((tr, i) => {
					const trait = getTrait(tr);
					const isMandatory = (i === 0); // TODO: repeat lifepaths also should be checked
					const entry: CharacterTrait = {
						id: trait.id,
						name: trait.name,
						isLifepath: true,
						isMandatory: isMandatory,
						isOpen: isMandatory,
						isGeneral: false
					};
					return entry;
				}) : [];
			}).flat();

			set(produce<CharacterBurnerState>((state) => {
				state.traits = new UniqueArray(traits);
			}));
		}
	}))
);
