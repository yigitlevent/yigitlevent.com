import { produce } from "immer";

import { UniqueArray } from "../../../utils/uniqueArray";
import { useRulesetStore } from "../../apiStores/useRulesetStore";
import { CharacterBurnerState, BurnerFunc } from "../useCharacterBurnerStore";


function SetOpen(bf: BurnerFunc, traitId: TraitId): void {
	bf.set(produce<CharacterBurnerState>((state) => {
		// TODO: Check remaining counts, use either pool too
		const charTrait = state.traits.find(traitId);
		if (charTrait) {
			charTrait.isOpen = !charTrait.isOpen;
			state.traits = new UniqueArray(state.traits.add(charTrait).items);
		}
	}));
}

function GetTrait(bf: BurnerFunc, traitId: TraitId): { open: boolean; } {
	const state = bf.get();
	const charTrait = state.traits.find(traitId);
	const open = (charTrait && state.hasTraitOpen(traitId)) ? true : false;
	return { open };
}


function GetPools(bf: BurnerFunc): Points {
	const { getTrait } = useRulesetStore.getState();
	const state = bf.get();

	const tTotal = state.lifepaths.reduce((pv, cv) => pv + cv.pools.traitPool, 0);
	let tSpent = 0;

	state.traits.forEach(trait => {
		if (trait.isOpen) {
			if (trait.type === "Mandatory" || trait.type === "Lifepath") tSpent += 1;
			else if (trait.type === "General") tSpent += getTrait(trait.id).cost;
		}
	});

	return { total: tTotal, spent: tSpent, remaining: tTotal - tSpent };
}

function IsOpen(bf: BurnerFunc, id: TraitId): boolean {
	return bf.get().traits.exists(id, "isOpen", true);
}

function IsOpenByName(bf: BurnerFunc, name: string): boolean {
	return bf.get().traits.filter(v => v.name === name).some(v => v.isOpen);
}

function Update(bf: BurnerFunc): void {
	const { getTrait, traits } = useRulesetStore.getState();
	const state = bf.get();

	// Add Lifepath Traits
	const characterTraits = new UniqueArray(state.lifepaths.map(lp => {
		return lp.traits ? lp.traits.map((tr, i) => {
			const trait = getTrait(tr);
			const isMandatory = (i === 0);
			// TODO: Repeat lifepaths also should be checked
			const entry: CharacterTrait = {
				id: trait.id,
				name: trait.name,
				type: isMandatory ? "Mandatory" : "Lifepath",
				isOpen: isMandatory || trait.category[1] === "Common"
			};
			return entry;
		}) : [];
	}).flat());

	traits
		.filter(trait => trait.stock && trait.stock[0] === state.stock[0] && trait.category[1] === "Common")
		.forEach(trait => {
			if (characterTraits.existsAny("id", trait.id) === 0) characterTraits.add({ id: trait.id, name: trait.name, type: "Common", isOpen: true });
		});

	state.traits
		.filter(trait => trait.type === "General")
		.forEach(trait => {
			if (characterTraits.existsAny("id", trait.id) === 0) characterTraits.add(trait);
		});

	bf.set(produce<CharacterBurnerState>((state) => {
		state.traits = characterTraits;
	}));
}


export interface TraitState {
	traits: UniqueArray<TraitId, CharacterTrait>;

	openTrait: (traitId: TraitId) => void;
	getTraitPools: () => Points;
	getTrait: (traitId: TraitId) => { open: boolean; };
	hasTraitOpen: (id: TraitId) => boolean;
	hasTraitOpenByName: (name: string) => boolean;
	updateTraits: () => void;
}

export const TraitProperties = {
	traits: new UniqueArray<TraitId, CharacterTrait>()
};

export const TraitFunctions = {
	SetOpen,
	GetPools,
	GetTrait,
	IsOpen,
	IsOpenByName,
	Update
};
