import produce from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Clamp } from "../../utils/misc";


interface LifepathRandomizerState {
	stock: StockId | "Random";
	setting: "Random";
	noDuplicates: boolean;
	maxLeads: number;
	maxLifepaths: number;
	minLifepaths: number;

	randomizerChangeStock: (stock: StockId | "Random") => void;
	randomizerChangeMaxLeads: (value: string) => void;
	randomizerChangeMaxLifepaths: (value: string) => void;
	randomizerChangeMinLifepaths: (value: string) => void;
	randomizerToggleNoDuplicates: () => void;
}

export const useLifepathRandomizerStore = create<LifepathRandomizerState>()(
	devtools(
		(set) => ({
			stock: "Random",
			setting: "Random",
			noDuplicates: true,
			maxLeads: 3,
			maxLifepaths: 6,
			minLifepaths: 5,

			randomizerChangeStock: (stock: StockId | "Random") => {
				set(produce<LifepathRandomizerState>((state) => {
					state.stock = stock;
				}));
			},
			randomizerChangeMaxLeads: (value: string) => {
				set(produce<LifepathRandomizerState>((state) => {
					state.maxLeads = Clamp(value === "" ? 0 : parseInt(value), 0, 10);
				}));
			},
			randomizerChangeMaxLifepaths: (value: string) => {
				set(produce<LifepathRandomizerState>((state) => {
					state.maxLifepaths = Clamp(value === "" ? 0 : parseInt(value), 0, 10);
				}));
			},
			randomizerChangeMinLifepaths: (value: string) => {
				set(produce<LifepathRandomizerState>((state) => {
					state.minLifepaths = Clamp(value === "" ? 0 : parseInt(value), 0, 10);
				}));
			},
			randomizerToggleNoDuplicates: () => {
				set(produce<LifepathRandomizerState>((state) => {
					state.noDuplicates != state.noDuplicates;
				}));
			}
		})
	)
);