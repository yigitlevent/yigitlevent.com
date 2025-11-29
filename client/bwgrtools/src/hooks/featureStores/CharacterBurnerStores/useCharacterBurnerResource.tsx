import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerLifepathStore } from "./useCharacterBurnerLifepath";


export interface CharacterBurnerResourceState {
	resources: Record<Guid, BwgrCharacterResource>;

	reset: () => void;

	getResourcePools: (lifepaths?: BwgrLifepath[]) => BwgrPoints;

	addResource: (resource: BwgrCharacterResource) => void;
	removeResource: (guid: Guid) => void;
	editResourceDescription: (guid: Guid, description: string) => void;
}

export const useCharacterBurnerResourceStore = create<CharacterBurnerResourceState>()(
	devtools(
		(set, get) => ({
			resources: {},

			reset: () => {
				set(produce<CharacterBurnerResourceState>((state) => {
					state.resources = {};
				}));
			},

			getResourcePools: (lifepaths?: BwgrLifepath[]): BwgrPoints => {
				const spending = Object.values(get().resources).map(v => v.cost).reduce((p, v) => p += v, 0);

				const state = useCharacterBurnerLifepathStore.getState();
				const lps = lifepaths ?? state.lifepaths;
				// TODO: Special lifepaths should matter here
				const totalRps = lps.map(v => v.pools.resourcePoints).reduce((pv, cv) => pv + cv, 0);

				return { total: totalRps, spent: spending, remaining: totalRps - spending };
			},

			addResource: (resource: BwgrCharacterResource) => {
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
