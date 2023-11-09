import { produce } from "immer";
import { create } from "zustand";
import { NamedSet, devtools } from "zustand/middleware";

import { LifepathState, LifepathFunctions, LifepathProperties } from "./CharacterBurnerSlices/CharacterBurnerLifepaths";
import { SkillState, SkillFunctions, SkillProperties } from "./CharacterBurnerSlices/CharacterBurnerSkills";
import { TraitState, TraitFunctions, TraitProperties } from "./CharacterBurnerSlices/CharacterBurnerTraits";
import { Clamp, GetAverage, Pairwise } from "../../utils/misc";
import { UniqueArray } from "../../utils/uniqueArray";
import { useRulesetStore } from "../apiStores/useRulesetStore";


export type CharacterBurnerState =
	{
		stock: [id: StockId, name: string];
		concept: string;
		name: string;
		gender: string;

		beliefs: { name: string, belief: string; }[];
		instincts: { name: string, instinct: string; }[];

		stats: { [key: string]: { poolType: "Mental" | "Physical", shadeShifted: boolean, poolSpent: number; eitherSpent: number; }; };

		attributes: UniqueArray<AbilityId, CharacterAttribute>;

		resources: CharacterResource[];
		questions: CharacterQuestion[];
		stockSpecific: CharacterStockSpecific;
		limits: CharacterStockLimits;

		reset: (stock?: [id: StockId, name: string]) => void;

		setName: (name: string) => void;
		setConcept: (concept: string) => void;
		setGender: (gender: string) => void;

		shiftStatShade: (statName: string) => void;
		modifyStatExponent: (statName: string, decrease?: boolean) => void;
		shiftAttributeShade: (attributeId: AbilityId) => void;

		getLeadCount: () => number;
		getAge: () => number;
		getResourcePoints: () => number;
		getAgePool: () => { minAge: number; mentalPool: number; physicalPool: number; };
		getMentalPool: () => { total: number, spent: number; remaining: number; };
		getPhysicalPool: () => { total: number, spent: number; remaining: number; };
		getEitherPool: () => { total: number, spent: number; remaining: number; };
		getStat: (statName: string) => { shade: Shades, exponent: number; };
		getMortalWound: () => AbilityPoints;
		getReflexes: () => AbilityPoints;
		getHealth: () => AbilityPoints;
		getSteel: () => AbilityPoints;
		getHesitation: () => AbilityPoints;
		getGreed: () => AbilityPoints;
		getGriefOrSpite: (isSpite: boolean) => AbilityPoints;
		getFaith: () => AbilityPoints;
		getFaithInDeadGods: () => AbilityPoints;
		getHatred: () => AbilityPoints;
		getVoidEmbrace: () => AbilityPoints;
		getAncestralTaint: () => AbilityPoints;
		getCorruption: () => AbilityPoints;
		getResources: () => AbilityPoints;
		getCircles: () => AbilityPoints;
		getAttribute: (attributeId: AbilityId) => AbilityPoints;
		hasAttribute: (id: AbilityId) => boolean;
		hasSetting: (id: SettingId) => number;
		hasQuestionTrue: (id: QuestionId) => boolean;

		hasAttributeByName: (name: string) => boolean;
		hasSettingByName: (name: string) => number;
		hasQuestionTrueByName: (name: string) => boolean;

		updateAttributes: () => void;
	} &
	LifepathState &
	SkillState &
	TraitState;


export const InitialState: NonFunctionPropertyNames<CharacterBurnerState> = {
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
		"Will": { poolType: "Mental", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Perception": { poolType: "Mental", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Power": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Agility": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Forte": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
		"Speed": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 }
	},

	attributes: new UniqueArray<AbilityId, CharacterAttribute>(),

	resources: [],
	questions: [],
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


export interface BurnerFunc {
	set: NamedSet<CharacterBurnerState>;
	get: () => CharacterBurnerState;
}

export const useCharacterBurnerStore = create<CharacterBurnerState>()(
	devtools((set, get) => ({
		...InitialState,

		reset: (stock?: [id: StockId, name: string]) => {
			const init = InitialState;
			if (stock) init.stock = stock;
			set(init);
			get().updateAvailableLifepaths();
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

		////////////////// LIFEPATHS //////////////////
		...LifepathProperties,
		addLifepath: (lifepath: Lifepath) => LifepathFunctions.Add({ get, set }, lifepath),
		removeLastLifepath: () => LifepathFunctions.RemoveLast({ get, set }),
		hasLifepath: (id: LifepathId): number => LifepathFunctions.Has({ get, set }, id),
		hasAttributeByName: (name: string) => LifepathFunctions.HasByName({ get, set }, name),
		updateAvailableLifepaths: () => LifepathFunctions.UpdateAvailable({ get, set }),

		////////////////// SKILLS //////////////////
		...SkillProperties,
		openSkill: (skillId: SkillId) => SkillFunctions.SetOpen({ get, set }, skillId),
		modifySkillExponent: (skillId: SkillId, decrease?: boolean) => SkillFunctions.SetExponent({ get, set }, skillId, decrease),
		getSkillPools: () => SkillFunctions.GetPools({ set, get }),
		getSkill: (skillId: SkillId) => SkillFunctions.GetSkill({ set, get }, skillId),
		hasSkillOpen: (id: SkillId) => SkillFunctions.IsOpen({ get, set }, id),
		hasSkillOpenByName: (name: string) => SkillFunctions.IsOpenByName({ get, set }, name),
		/**
		 * Updates the character's skills list.
		 * It re-adds previously selected general skills, if they are not present in the lifepath skills list.
		 * @remarks TODO: Repated lifepaths should be checked to determine the mandatory-ness.
		**/
		updateSkills: () => SkillFunctions.Update({ get, set }),

		////////////////// TRAITS //////////////////
		...TraitProperties,
		openTrait: (traitId: TraitId) => TraitFunctions.SetOpen({ get, set }, traitId),
		getTrait: (traitId: TraitId): { open: boolean; } => TraitFunctions.GetTrait({ get, set }, traitId),
		getTraitPools: (): Points => TraitFunctions.GetPools({ get, set }),
		hasTraitOpen: (id: TraitId) => TraitFunctions.IsOpen({ get, set }, id),
		hasTraitOpenByName: (name: string) => TraitFunctions.IsOpenByName({ get, set }, name),
		/**
		 * Updates the character's traits list.
		 * It preserves the common traits, and re-adds previously selected general traits, if they are not present in the lifepath trait list.
		 * @remarks TODO: Repated lifepaths should be checked to determine the mandatory-ness.
		**/
		updateTraits: () => TraitFunctions.Update({ get, set }),


		shiftAttributeShade: (attributeId: AbilityId) => {
			set(produce<CharacterBurnerState>((state) => {
				const charAttribute = state.attributes.find(attributeId);
				if (charAttribute) {
					charAttribute.shadeShifted = !charAttribute.shadeShifted;
					state.attributes = new UniqueArray(state.attributes.add(charAttribute).items);
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

		getStat: (statName: string): { shade: Shades; exponent: number; } => {
			const state = get();
			const shade = state.stats[statName].shadeShifted ? "G" : "B";
			const exponent = state.stats[statName].eitherSpent + state.stats[statName].poolSpent + (state.stats[statName].shadeShifted ? -5 : 0);
			return { shade, exponent };
		},

		// TODO: if shade shifted, remove points from exponent
		getMortalWound: (): AbilityPoints => {
			const state = get();
			const power = state.getStat("Power");
			const forte = state.getStat("Forte");

			const shades = [power.shade, forte.shade];
			const roots = [power.exponent, forte.exponent];

			if (shades.some(v => v === "G") && shades.some(v => v === "B")) { roots.push(2); }

			return { shade: shades.every(v => v === "G") ? "G" : "B", exponent: GetAverage(roots) };
		},

		// TODO: if shade shifted, remove points from exponent
		getReflexes: (): AbilityPoints => {
			const state = get();
			const perception = state.getStat("Perception");
			const agility = state.getStat("Ability");
			const speed = state.getStat("Speed");

			const shades = [perception.shade, agility.shade, speed.shade];
			const roots = [perception.exponent, agility.exponent, speed.exponent];

			if (shades.some(v => v === "G") && shades.some(v => v === "B")) { roots[0] += 2; }

			return { shade: shades.every(v => v === "G") ? "G" : "B", exponent: Math.floor(GetAverage(roots)) };
		},

		// TODO: if shade shifted, remove points from exponent
		getHealth: (): AbilityPoints => {
			const state = get();
			const will = state.getStat("Will");
			const forte = state.getStat("Forte");

			const shades = [will.shade, forte.shade];
			const roots = [will.exponent, forte.exponent];
			if (shades.some(v => v === "G") && shades.some(v => v === "B")) { roots.push(2); }

			let bonus = 0;
			if (state.hasQuestionTrueByName("FILTH")) bonus -= 1;
			if (state.hasQuestionTrueByName("SICKLY")) bonus -= 1;
			if (state.hasQuestionTrueByName("WOUND")) bonus -= 1;
			if (state.hasQuestionTrueByName("TORTURE") && state.hasQuestionTrueByName("ENSLAVED")) bonus -= 1;
			if (["Dwarf", "Elf", "Orc"].includes(state.stock[1])) bonus += 1;
			if (state.hasQuestionTrueByName("ACTIVE")) bonus += 1;
			if (state.hasQuestionTrueByName("HAPPY")) bonus += 1;

			return { shade: shades.every(v => v === "G") ? "G" : "B", exponent: Math.floor(GetAverage(roots)) + bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getSteel: (): AbilityPoints => {
			const state = get();
			const will = state.getStat("Will");
			const forte = state.getStat("Forte");

			let bonus = 0;
			if (state.hasQuestionTrueByName("SOLDIER")) bonus += 1;
			if (state.hasQuestionTrueByName("WOUND") && state.hasQuestionTrueByName("SOLDIER")) bonus += 1;
			if (state.hasQuestionTrueByName("WOUND") && !state.hasQuestionTrueByName("SOLDIER")) bonus -= 1;
			if (state.hasQuestionTrueByName("KILLER")) bonus += 1;
			if (state.hasQuestionTrueByName("TORTURED") || state.hasQuestionTrueByName("ENSLAVED") || state.hasQuestionTrueByName("BEATEN")) {
				if (will.exponent >= 5) bonus += 1;
				if (will.exponent <= 3) bonus -= 1;
			}
			if (state.hasQuestionTrueByName("SHELTER")) bonus -= 1;
			if (state.hasQuestionTrueByName("COMPETITIVE")) bonus += 1;
			if (state.hasQuestionTrueByName("BIRTH")) bonus += 1;
			if (state.hasQuestionTrueByName("GIFTED")) bonus += 1;
			if (will.exponent >= 7) bonus += 2;
			else if (will.exponent >= 5) bonus += 1;
			if (forte.exponent >= 6) bonus += 2;

			return { shade: "B", exponent: 3 + bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getHesitation: (): AbilityPoints => {
			const state = get();
			const will = state.getStat("Will");

			return { shade: "B", exponent: 10 - will.exponent };
		},

		// TODO: if shade shifted, remove points from exponent
		getGreed: (): AbilityPoints => {
			const state = get();
			const will = state.getStat("Will");
			const age = state.getAge();
			const resourcePoints = state.getResourcePoints();

			const lifepathsToCheck = ["Trader", "Mask Bearer", "Master of Arches", "Master of Forges", "Master Engraver", "Treasurer", "Quartermaster", "Seneschal", "Prince"];

			const relationships = Object.values(state.resources).filter(v => v.type[1] === "Relationship");

			let bonus = 0;
			if (will.exponent <= 4) bonus += 1;
			bonus += Math.floor(resourcePoints / 60);
			bonus += state.lifepaths.filter(v => lifepathsToCheck.includes(v.name)).length;

			if (state.hasQuestionTrueByName("COVET")) bonus += 1;
			if (state.hasQuestionTrueByName("STOLE")) bonus += 1;
			if (state.hasQuestionTrueByName("STOLEN")) bonus += 1;
			if (state.hasQuestionTrueByName("MASTERCRAFT")) bonus += 1;
			if (state.hasQuestionTrueByName("POSSESSION")) bonus += 1;

			if (age > 400) bonus += 2;
			else if (age > 200) bonus += 1;
			bonus += -1 * relationships.filter(v => v.modifiers.includes("Romantic")).length;
			bonus += 1 * relationships.filter(v => v.modifiers.includes("Hateful")).length;
			bonus += 2 * relationships.filter(v => v.modifiers.includes("Immediate family") && v.modifiers.includes("Hateful")).length;
			if (state.hasTraitOpenByName("Virtuous")) bonus += 1;

			return { shade: "B", exponent: bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getGriefOrSpite: (isSpite: boolean): AbilityPoints => {
			const state = get();
			const perception = state.getStat("Perception");
			const age = state.getAge();
			const steel = state.getSteel();

			const lifepathsToCheck = ["Lancer", "Lieutenant", "Captain"];
			const lifepathsToCheck2 = ["Lord Protector", "Soother"];
			const lifepathsToCheck3 = ["Loremaster", "Adjutant", "Althing"];

			const knowsLament
				= state.skills.filter(v => v.name.toLowerCase().includes("lament") && v.isOpen);

			let bonus = 0;
			if (state.hasLifepathByName("Protector")) bonus += 1;
			if (state.hasLifepathByName("Born Etharch")) bonus += 1;
			if (state.hasLifepathByName("Elder")) bonus += 1;
			if (lifepathsToCheck.some(v => state.hasLifepathByName(v))) bonus += 1;
			if (lifepathsToCheck2.some(v => state.hasLifepathByName(v))) bonus += 1;
			if (lifepathsToCheck3.some(v => state.hasLifepathByName(v))) bonus += 1;
			bonus += knowsLament ? 0 : 1;

			if (state.hasQuestionTrueByName("TRAGEDY")) bonus += 1;
			if (state.hasQuestionTrueByName("OUTSIDER")) bonus += 1;

			if (steel.exponent > 5) bonus += (steel.exponent - 5);
			if (perception.exponent > 5) bonus += 1;
			if (age > 1000) bonus += 3;
			else if (age > 750) bonus += 2;
			else if (age > 500) bonus += 1;

			if (isSpite) {
				const traitsToCheck = ["Slayer", "Exile", "Feral", "Murderous", "Saturnine", "Femme Fatale/Homme Fatal", "Cold", "Bitter"];
				if (traitsToCheck.some(v => state.traits.filter(t => t.name === v && t.isOpen))) bonus += 1;
				const bitterReminders = Object.values(state.resources).filter(v => v.name === "Bitter Reminder");
				bonus += bitterReminders.length > 0 ? Math.floor(bitterReminders.map(v => v.cost).reduce((a, b) => a + b) / 10) : 0;

				if (state.hasQuestionTrueByName("OUTSIDER")) bonus += 1;
				if (state.hasQuestionTrueByName("LOVESICK")) bonus += 1;
				if (state.hasQuestionTrueByName("ABANDON")) bonus += 1;
				if (state.hasQuestionTrueByName("ABUSED")) bonus += 1;
				if (state.hasQuestionTrueByName("RESPECT")) bonus -= 1;
				if (state.hasQuestionTrueByName("LOVE")) bonus -= 1;
			}

			return { shade: "B", exponent: bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getFaith: (): AbilityPoints => {
			const state = get();

			let bonus = 0;
			if (state.hasQuestionTrueByName("TRUST")) bonus += 1;
			if (state.hasQuestionTrueByName("CONSULT")) bonus += 1;
			if (state.hasQuestionTrueByName("SERVE")) bonus += 1;

			return { shade: "B", exponent: 3 + bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getFaithInDeadGods: (): AbilityPoints => {
			const state = get();

			let bonus = 0;
			if (state.hasQuestionTrueByName("DEADTRUST")) bonus += 1;
			if (state.hasQuestionTrueByName("DEADCONSULT")) bonus += 1;
			if (state.hasQuestionTrueByName("DEADSERVE")) bonus += 1;

			return { shade: "B", exponent: 3 + bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getHatred: (): AbilityPoints => {
			const state = get();
			const steel = state.getSteel();
			const perception = state.getStat("Perception");
			const will = state.getStat("Will");

			let bonus = 0;
			bonus += state.stockSpecific.brutalLife.traits.filter(v => v !== undefined && v !== null).length;
			if (state.hasQuestionTrueByName("WOUND")) bonus += 1;
			if (state.hasQuestionTrueByName("TORTURE")) bonus += 1;
			if (state.hasQuestionTrueByName("SLAVE")) bonus += 1;
			if (state.hasQuestionTrueByName("FRATRICIDE")) bonus += 1;
			if (state.hasQuestionTrueByName("HOBGOBLIN")) bonus += 1;
			if (will.exponent <= 2) bonus + 1;
			if (steel.exponent >= 5) bonus + 1;
			if (perception.exponent >= 6) bonus + 1;

			return { shade: "B", exponent: bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getVoidEmbrace: (): AbilityPoints => {
			const state = get();

			let bonus = 0;
			if (state.hasQuestionTrueByName("MASTER")) bonus += 1;
			if (state.hasQuestionTrueByName("FATE")) bonus += 1;
			if (state.hasQuestionTrueByName("WELLSPRING")) bonus += 1;

			return { shade: "B", exponent: 3 + bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getAncestralTaint: (): AbilityPoints => {
			const state = get();

			let bonus = 0;
			if (state.hasTraitOpenByName("Ancestral Taint")) bonus += 1;
			if (state.hasTraitOpenByName("Spirit Nose")) bonus += 1;
			if (state.hasTraitOpenByName("Stink of the Ancient")) bonus += 1;
			if (state.hasSkillOpenByName("Primal Bark")) bonus += 1;
			if (state.hasSkillOpenByName("Ancestral Jaw")) bonus += 1;
			if (state.hasSkillOpenByName("Grandfather's Song")) bonus += 1;

			return { shade: "B", exponent: bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getCorruption: (): AbilityPoints => {
			const state = get();

			const spiritMarks = state.resources.filter(v => v.name === "Spirit Binding — Spirit Mark Levels");
			const orders = state.resources.filter(v => v.name === "Summoning — Affiliated Order Levels");
			let bonus = 0;
			if (state.hasTraitOpenByName("Gifted")) bonus += 1;
			if (state.hasTraitOpenByName("Faithful") || state.hasTraitOpenByName("Faith in Dead Gods")) bonus += 1;
			if (state.hasTraitOpenByName("Chosen One")) bonus += 1;
			bonus += spiritMarks.length > 0 ? spiritMarks.map(v => v.cost).reduce((a, b) => a + (b === 10 ? 1 : b === 25 ? 2 : 3), 0) : 0;
			bonus += orders.length > 0 ? orders.map(v => v.cost).reduce((a, b) => a + (b === 10 ? 1 : b === 20 ? 2 : b === 25 ? 3 : 4), 0) : 0;
			if (state.hasQuestionTrueByName("PRAY")) bonus += 1;
			if (state.hasQuestionTrueByName("PACT")) bonus += 1;

			return { shade: "B", exponent: bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getResources: (): AbilityPoints => {
			const state = get();

			let bonus = 0;
			const res = state.resources.filter(v => ["Property", "Reputation", "Affiliation"].includes(v.type[1]));
			if (res.length > 0) { bonus += Math.floor(res.map(v => v.cost).reduce((a, b) => a + b) / 15); }

			return { shade: "B", exponent: bonus };
		},

		// TODO: if shade shifted, remove points from exponent
		getCircles: (): AbilityPoints => {
			const state = get();
			const will = state.getStat("Will");

			let bonus = 0;
			const res = state.resources.filter(v => ["Property", "Relationship"].includes(v.type[1]));
			if (res.length > 0 && res.map(v => v.cost).reduce((a, b) => a + b) >= 50) { bonus += 1; }

			return { shade: "B", exponent: Math.floor(will.exponent / 2) + bonus };
		},

		getAttribute: (attributeId: AbilityId): AbilityPoints => {
			const state = get();
			const attribute = state.attributes.find(attributeId);

			if (attribute) {
				const getAttributePoints = (attributeName: string): AbilityPoints => {
					switch (attributeName) {
						case "Mortal Wound":
							return state.getMortalWound();
						case "Reflexes":
							return state.getReflexes();
						case "Health":
							return state.getHealth();
						case "Steel":
							return state.getSteel();
						case "Hesitation":
							return state.getHesitation();
						case "Greed":
							return state.getGreed();
						case "Grief":
						case "Spite":
							return state.getGriefOrSpite(attribute.name === "Spite");
						case "Faith":
							return state.getFaith();
						case "Faith in Dead Gods":
							return state.getFaithInDeadGods();
						case "Hatred":
							return state.getHatred();
						case "Void Embrace":
							return state.getVoidEmbrace();
						case "Ancestral Taint":
							return state.getAncestralTaint();
						case "Corruption":
							return state.getCorruption();
						case "Resources":
							return state.getResources();
						case "Circles":
							return state.getCircles();
						default:
							throw `Unhandled Attribute id: ${attributeId} ${attribute?.name}`;
					}
				};

				attribute.shadeShifted;
				const charAttr = getAttributePoints(attribute.name);
				const isGreyByRoots = getAttributePoints(attribute.name).shade === "G";

				return {
					shade: attribute.shadeShifted || isGreyByRoots ? "G" : "B",
					exponent: charAttr.exponent - (attribute.shadeShifted ? 5 : 0)
				};
			}
			else throw `Cannot find attribute with id: ${attributeId}`;
		},


		hasAttribute: (id: AbilityId) => {
			return get().attributes.has(id);
		},


		hasSetting: (id: SettingId): number => {
			return get().lifepaths.filter(v => v.setting[0] === id).length;
		},

		hasQuestionTrue: (id: QuestionId): boolean => {
			return get().questions.some(v => v.id === id && v.answer);
		},


		hasLifepathByName: (name: string): number => {
			return get().lifepaths.filter(v => v.name === name).length;
		},

		hasSettingByName: (name: string): number => {
			return get().lifepaths.filter(v => v.setting[1] === name).length;
		},

		hasQuestionTrueByName: (name: string): boolean => {
			return get().questions.some(v => v.name === name && v.answer);
		},


		/**
		 * Updates the character's attributes list.
		 * It calculates the attribute exponents, filters the ones that are not available to the character.
		 * @remarks TODO: Calculate exponents.
		 * @remarks TODO: Preserve shades.
		**/
		updateAttributes: () => {
			const { abilities } = useRulesetStore.getState();
			const state = get();

			const characterAttributes: UniqueArray<AbilityId, CharacterAttribute> = new UniqueArray(
				abilities
					.filter(ability => ability.abilityType[1].endsWith("Attribute"))
					.map(ability => {
						const attr = state.getAttribute(ability.id);

						if (ability.abilityType[1] === "Attribute") {
							return {
								id: ability.id,
								name: ability.name,
								hasShade: ability.hasShades,
								shadeShifted: attr.shade === "G",
								exponent: state.getAttribute(ability.id).exponent - (attr.shade === "G" ? 5 : 0)
							};
						}
						else if (ability.requiredTrait && state.hasTraitOpen(ability.requiredTrait[0])) {
							return {
								id: ability.id,
								name: ability.name,
								hasShade: ability.hasShades,
								shadeShifted: attr.shade === "G",
								exponent: state.getAttribute(ability.id).exponent - (attr.shade === "G" ? 5 : 0)
							};
						}
						else return [];
					}).flat());

			set(produce<CharacterBurnerState>((state) => {
				state.attributes = characterAttributes;
			}));
		}
	}))
);
