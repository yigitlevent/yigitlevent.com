import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerBasicsStore } from "./useCharacterBurnerBasics";
import { useCharacterBurnerLifepathStore } from "./useCharacterBurnerLifepath";
import { useCharacterBurnerMiscStore } from "./useCharacterBurnerMisc";
import { UniqueArray } from "../../../utils/uniqueArray";
import { useRulesetStore } from "../../apiStores/useRulesetStore";


export type CharacterBurnerTraitState = {
	traits: UniqueArray<TraitId, CharacterTrait>;

	reset: () => void;

	openTrait: (traitId: TraitId) => void;

	getTraitPools: () => Points;
	getTrait: (traitId: TraitId) => { open: boolean; };

	hasTraitOpen: (id: TraitId) => boolean;
	hasTraitOpenByName: (name: string) => boolean;

	/**
	 * Updates the character's traits list.
	 * It preserves the common traits, and re-adds previously selected general traits, if they are not present in the lifepath trait list.
	 * @remarks TODO: Repated lifepaths should be checked to determine the mandatory-ness.
	**/
	updateTraits: () => void;
};

export const useCharacterBurnerTraitStore = create<CharacterBurnerTraitState>()(
	devtools(
		(set, get) => ({
			traits: new UniqueArray<TraitId, CharacterTrait>(),

			reset: (): void => {
				set({
					traits: new UniqueArray<TraitId, CharacterTrait>()
				});
			},

			openTrait: (traitId: TraitId): void => {
				set(produce<CharacterBurnerTraitState>((state) => {
					// TODO: Check remaining counts, use either pool too
					const charTrait = state.traits.find(traitId);
					if (charTrait) {
						charTrait.isOpen = !charTrait.isOpen;
						state.traits = new UniqueArray(state.traits.add(charTrait).items);
					}
				}));
			},

			getTraitPools: (): Points => {
				const { getTrait } = useRulesetStore.getState();
				const { lifepaths } = useCharacterBurnerLifepathStore.getState();
				const state = get();

				const tTotal = lifepaths.reduce((pv, cv) => pv + cv.pools.traitPool, 0);
				let tSpent = 0;

				state.traits.forEach(trait => {
					if (trait.isOpen) {
						if (trait.type === "Mandatory" || trait.type === "Lifepath") tSpent += 1;
						else if (trait.type === "General") tSpent += getTrait(trait.id).cost;
					}
				});

				return { total: tTotal, spent: tSpent, remaining: tTotal - tSpent };
			},

			getTrait: (traitId: TraitId): { open: boolean; } => {
				const state = get();
				const charTrait = state.traits.find(traitId);
				const open = (charTrait && state.hasTraitOpen(traitId)) ? true : false;
				return { open };
			},

			hasTraitOpen: (id: TraitId): boolean => {
				return get().traits.exists(id, "isOpen", true);
			},

			hasTraitOpenByName: (name: string): boolean => {
				return get().traits.filter(v => v.name === name).some(v => v.isOpen);
			},

			updateTraits: (): void => {
				const { stock } = useCharacterBurnerBasicsStore.getState();
				const ruleset = useRulesetStore.getState();
				const { lifepaths } = useCharacterBurnerLifepathStore.getState();
				const state = get();

				// Add Lifepath Traits
				const characterTraits = new UniqueArray(lifepaths.map(lp => {
					return lp.traits ? lp.traits.map((tr, i) => {
						const trait = ruleset.getTrait(tr);
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

				ruleset.traits
					.filter(trait => trait.stock && trait.stock[0] === stock[0] && trait.category[1] === "Common")
					.forEach(trait => {
						if (characterTraits.existsAny("id", trait.id) === 0) {
							characterTraits.add({ id: trait.id, name: trait.name, type: "Common", isOpen: true });
						}
					});

				state.traits
					.filter(trait => trait.type === "General")
					.forEach(trait => {
						if (characterTraits.existsAny("id", trait.id) === 0) characterTraits.add(trait);
					});

				set(produce<CharacterBurnerTraitState>((state) => {
					state.traits = characterTraits;
				}));

				useCharacterBurnerMiscStore.getState().refreshTraitEffects();
			}
		}),
		{ name: "useCharacterBurnerTraitStore" }
	)
);
