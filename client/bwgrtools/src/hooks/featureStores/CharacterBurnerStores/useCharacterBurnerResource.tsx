import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerLifepathStore } from "./useCharacterBurnerLifepath";


export type CharacterBurnerResourceState = {
	resources: { [key: Guid]: CharacterResource; };

	reset: () => void;

	getResourcePoints: () => number;
	getSpending: () => number;

	addResource: (resource: CharacterResource) => void;
	removeResource: (guid: Guid) => void;
	editResourceDescription: (guid: Guid, description: string) => void;
};

export const useCharacterBurnerResourceStore = create<CharacterBurnerResourceState>()(
	devtools(
		(set, get) => ({
			resources: {},

			reset: () => {
				set(produce<CharacterBurnerResourceState>((state) => {
					state.resources = {};
				}));
			},

			getResourcePoints: (): number => {
				const state = useCharacterBurnerLifepathStore.getState();
				if (state.lifepaths.length === 0) return 0;
				const rps = state.lifepaths.map(v => v.pools.resourcePoints).reduce((pv, cv) => pv + cv, 0);
				// TODO: Special lifepaths should matter here
				return rps;
			},

			getSpending: (): number => {
				return Object.values(get().resources).map(v => v.cost).reduce((p, v) => p += v, 0);
			},

			addResource: (resource: CharacterResource) => {
				set(produce<CharacterBurnerResourceState>((state) => {
					state.resources[self.crypto.randomUUID() as Guid] = resource;
				}));
			},

			removeResource: (guid: Guid) => {
				set(produce<CharacterBurnerResourceState>((state) => {
					delete state.resources[guid];
				}));
			},

			editResourceDescription: (guid: Guid, description: string) => {
				set(produce<CharacterBurnerResourceState>((state) => {
					state.resources[guid].description = description;
				}));
			}

			// TODO: auto resources from traits list
			// state.totals.resources.fromTraitsList = newResources;
		}),
		{ name: "useCharacterBurnerResourceStore" }
	)
);
