import produce from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { MagicWheelStoreVersion } from "../stores/_persistOptions";

import { Clamp } from "../../utils/misc";


interface MagicWheelState {
	areaOfEffectId: AreaOfEffectFacetId;
	elementId: ElementFacetId;
	impetusId: ImpetusFacetId;
	durationId: DurationFacetId;
	originId: OriginFacetId;

	direction: "Clockwise" | "Counterclockwise";
	steps: number;
	cover: boolean;

	changeAOE: (aoe: AreaOfEffectFacetId) => void;
	changeElement: (element: ElementFacetId) => void;
	changeImpetus: (impetus: ImpetusFacetId) => void;
	changeDuration: (duration: DurationFacetId) => void;
	changeOrigin: (origin: OriginFacetId) => void;

	changeDirection: (direction: string) => void;
	changeSteps: (steps: string) => void;
	toggleCover: () => void;
}

export const useMagicWheelStore = create<MagicWheelState>()(
	devtools(
		persist(
			(set) => ({
				areaOfEffectId: 0 as unknown as AreaOfEffectFacetId,
				elementId: 0 as unknown as ElementFacetId,
				impetusId: 0 as unknown as ImpetusFacetId,
				durationId: 0 as unknown as DurationFacetId,
				originId: 0 as unknown as OriginFacetId,

				direction: "Clockwise",
				steps: 1,
				cover: true,

				elementIndex: 0,

				changeAOE: (aoe: AreaOfEffectFacetId) => {
					set(produce<MagicWheelState>((state) => {
						state.areaOfEffectId = aoe;
					}));
				},
				changeElement: (element: ElementFacetId) => {
					set(produce<MagicWheelState>((state) => {
						state.elementId = element;
					}));
				},
				changeImpetus: (impetus: ImpetusFacetId) => {
					set(produce<MagicWheelState>((state) => {
						state.impetusId = impetus;
					}));
				},
				changeDuration: (duration: DurationFacetId) => {
					set(produce<MagicWheelState>((state) => {
						state.durationId = duration;
					}));
				},
				changeOrigin: (origin: OriginFacetId) => {
					set(produce<MagicWheelState>((state) => {
						state.originId = origin;
					}));
				},
				changeDirection: (direction: string) => {
					set(produce<MagicWheelState>((state) => {
						state.steps = Clamp(direction === "" ? 0 : parseInt(direction), 0, 10);
					}));
				},
				changeSteps: (steps: string) => {
					set(produce<MagicWheelState>((state) => {
						state.steps = Clamp(steps === "" ? 0 : parseInt(steps), 0, 10);
					}));
				},
				toggleCover: () => {
					set(produce<MagicWheelState>((state) => {
						state.cover = !state.cover;
					}));
				}
			}),
			{
				name: "magic-wheel-storage",
				version: MagicWheelStoreVersion
			}
		)
	)
);
