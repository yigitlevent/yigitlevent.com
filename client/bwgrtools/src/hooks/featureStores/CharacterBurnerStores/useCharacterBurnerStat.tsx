import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerMiscStore } from "./useCharacterBurnerMisc";
import { Clamp } from "../../../utils/misc";


export type CharacterBurnerStatState = {
	stats: { [key: string]: { poolType: "Mental" | "Physical", shadeShifted: boolean, poolSpent: number; eitherSpent: number; }; };

	reset: () => void;

	getStat: (statName: string) => { shade: Shades, exponent: number; };

	shiftStatShade: (statName: string) => void;
	modifyStatExponent: (statName: string, decrease?: boolean) => void;
};

export const useCharacterBurnerStatStore = create<CharacterBurnerStatState>()(
	devtools(
		(set, get) => ({
			stats: {
				"Will": { poolType: "Mental", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
				"Perception": { poolType: "Mental", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
				"Power": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
				"Agility": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
				"Forte": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
				"Speed": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 }
			},

			reset: (): void => {
				set({
					stats: {
						"Will": { poolType: "Mental", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
						"Perception": { poolType: "Mental", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
						"Power": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
						"Agility": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
						"Forte": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 },
						"Speed": { poolType: "Physical", shadeShifted: false, poolSpent: 0, eitherSpent: 0 }
					}
				});
			},

			getStat: (statName: string): { shade: Shades; exponent: number; } => {
				const state = get();
				const shade = state.stats[statName].shadeShifted ? "G" : "B";
				const exponent = state.stats[statName].eitherSpent + state.stats[statName].poolSpent + (state.stats[statName].shadeShifted ? -5 : 0);
				return { shade, exponent };
			},

			shiftStatShade: (statName: string): void => {
				set(produce<CharacterBurnerStatState>((state) => {
					state.stats[statName].shadeShifted = !state.stats[statName].shadeShifted;
					// TODO: Check remaining counts, use either pool too
					state.stats[statName].poolSpent += state.stats[statName].shadeShifted ? 5 : -5;
				}));
			},

			modifyStatExponent: (statName: string, decrease?: boolean): void => {
				const { limits } = useCharacterBurnerMiscStore.getState();

				set(produce<CharacterBurnerStatState>((state) => {
					// TODO: Check remaining counts, use either pool too
					const newNumber = Clamp(state.stats[statName].poolSpent + (decrease ? -1 : 1), 0, limits.stats[statName].max);
					state.stats[statName].poolSpent = newNumber;
				}));
			}
		})
	)
);
