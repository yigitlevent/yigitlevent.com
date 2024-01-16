import { Clamp } from "@utility/Clamp";
import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";



interface MagicWheelState {
	constants: { canvasSize: number, circleRadius: number, circleOffset: number, textOffset: number; };

	areaOfEffectId: BwgrAreaOfEffectFacetId;
	elementId: BwgrElementFacetId;
	impetusId: BwgrImpetusFacetId;
	durationId: BwgrDurationFacetId;
	originId: BwgrOriginFacetId;

	direction: "Clockwise" | "Counterclockwise";
	steps: number;
	cover: boolean;

	changeAOE: (aoe: BwgrAreaOfEffectFacetId) => void;
	changeElement: (element: BwgrElementFacetId) => void;
	changeImpetus: (impetus: BwgrImpetusFacetId) => void;
	changeDuration: (duration: BwgrDurationFacetId) => void;
	changeOrigin: (origin: BwgrOriginFacetId) => void;

	changeDirection: (direction: string) => void;
	changeSteps: (steps: string) => void;
	toggleCover: () => void;
}

export const useMagicWheelStore = create<MagicWheelState>()(
	devtools(
		(set) => ({
			constants: { canvasSize: 580, circleRadius: 32, circleOffset: 90, textOffset: 100 },

			areaOfEffectId: 0 as BwgrAreaOfEffectFacetId,
			elementId: 0 as BwgrElementFacetId,
			impetusId: 0 as BwgrImpetusFacetId,
			durationId: 0 as BwgrDurationFacetId,
			originId: 0 as BwgrOriginFacetId,

			direction: "Clockwise",
			steps: 1,
			cover: true,

			elementIndex: 0,

			changeAOE: (aoe: BwgrAreaOfEffectFacetId) => {
				set(produce<MagicWheelState>((state) => {
					state.areaOfEffectId = aoe;
				}));
			},
			changeElement: (element: BwgrElementFacetId) => {
				set(produce<MagicWheelState>((state) => {
					state.elementId = element;
				}));
			},
			changeImpetus: (impetus: BwgrImpetusFacetId) => {
				set(produce<MagicWheelState>((state) => {
					state.impetusId = impetus;
				}));
			},
			changeDuration: (duration: BwgrDurationFacetId) => {
				set(produce<MagicWheelState>((state) => {
					state.durationId = duration;
				}));
			},
			changeOrigin: (origin: BwgrOriginFacetId) => {
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
		{ name: "useMagicWheelStore" }
	)
);
