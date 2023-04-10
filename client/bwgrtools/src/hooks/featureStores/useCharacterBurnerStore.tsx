import produce from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Pairwise } from "../../utils/misc";
import { UniqueArray } from "../../utils/uniqueArray";
import { useRulesetStore } from "../apiStores/useRulesetStore";




interface CharacterBurnerProperties {
	stock: [id: StockId, name: string];
	concept: string;
	name: string;
	gender: string;

	beliefs: { name: string, belief: string; }[];
	instincts: { name: string, instinct: string; }[];

	stats: { [key: string]: { pool: "Mental" | "Physical", shadeShifted: boolean, advancement: number; }; };

	skills: UniqueArray<SkillId, CharacterSkill>;
	traits: UniqueArray<TraitId, CharacterTrait>;
	attributes: UniqueArray<AbilityId, CharacterAttribute>;

	availableLifepaths: Lifepath[];
	lifepaths: Lifepath[];

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

	getLeadCount: () => number;
	getAge: () => number;
	getResourcePoints: () => number;

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

	stats: {
		"Will": { pool: "Mental", shadeShifted: false, advancement: 0 },
		"Perception": { pool: "Mental", shadeShifted: false, advancement: 0 },
		"Power": { pool: "Physical", shadeShifted: false, advancement: 0 },
		"Agility": { pool: "Physical", shadeShifted: false, advancement: 0 },
		"Forte": { pool: "Physical", shadeShifted: false, advancement: 0 },
		"Speed": { pool: "Physical", shadeShifted: false, advancement: 0 }
	},

	skills: new UniqueArray<SkillId, CharacterSkill>(),
	traits: new UniqueArray<TraitId, CharacterTrait>(),
	attributes: new UniqueArray<AbilityId, CharacterAttribute>(),

	availableLifepaths: [],
	lifepaths: [],

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

		getLeadCount() {
			const state = get();
			if (state.lifepaths.length === 0) return 0;
			return Pairwise(state.lifepaths).reduce((pv, cv) => cv[0].setting[0] !== cv[1].setting[0] ? pv + 1 : pv, 0);
		},

		getAge(): number {
			const state = get();
			if (state.lifepaths.length === 0) return 0;
			const yrs = state.lifepaths.map(v => v.years).filter(v => typeof v === "number") as number[];
			const sum = yrs.reduce((prev, curr) => prev + curr);
			// TODO: Special lifepaths should matter here
			return sum + get().getLeadCount();
		},

		getResourcePoints(): number {
			const state = get();
			if (state.lifepaths.length === 0) return 0;
			const rps = state.lifepaths.map(v => v.pools.resourcePoints).reduce((pv, cv) => pv + cv);
			// TODO: Special lifepaths should matter here
			return rps;
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
						isOpen: isMandatory
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
