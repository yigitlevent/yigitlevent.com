import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface RangeAndCoverPlannerState {
	actions: [undefined | BwgrRaCActionExtended, undefined | BwgrRaCActionExtended, undefined | BwgrRaCActionExtended];
	selectedAction: [string, string, string];

	addAction: (actions: BwgrRaCAction[], volleyIndex: number, actionName: undefined | string) => void;
	deleteAction: (volleyIndex: number) => void;
	changeSelectedAction: (actionName: string, volleyIndex: number) => void;
	toggleActionDetails: (volleyIndex: number) => void;
	toggleActionVisibility: (volleyIndex: number) => void;
}

export const useRangeAndCoverPlannerStore = create<RangeAndCoverPlannerState>()(
	devtools(
		(set) => ({
			actions: [undefined, undefined, undefined],
			selectedAction: ["Charge", "Charge", "Charge"],

			addAction: (actions: BwgrRaCAction[], volleyIndex: number, actionName: undefined | string) => {
				const action: BwgrRaCActionExtended = { ...actions.find(v => v.name === actionName) as BwgrRaCAction, open: false, visible: true };
				set(produce<RangeAndCoverPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) return action;
						else return v;
					}) as [BwgrRaCActionExtended, BwgrRaCActionExtended, BwgrRaCActionExtended];
				}));
			},
			deleteAction: (volleyIndex: number) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) return undefined;
						else return v;
					}) as [BwgrRaCActionExtended, BwgrRaCActionExtended, BwgrRaCActionExtended];
				}));
			},
			changeSelectedAction: (actionName: string, volleyIndex: number) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					state.selectedAction[volleyIndex] = actionName;
				}));
			},
			toggleActionDetails: (volleyIndex: number) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (v && i === volleyIndex) { return { ...v, open: !v.open }; }
						return v;
					}) as [BwgrRaCActionExtended, BwgrRaCActionExtended, BwgrRaCActionExtended];
				}));
			},
			toggleActionVisibility: (volleyIndex: number) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (v && i === volleyIndex) { return { ...v, visible: !v.visible }; }
						return v;
					}) as [BwgrRaCActionExtended, BwgrRaCActionExtended, BwgrRaCActionExtended];
				}));
			}
		}),
		{ name: "useRangeAndCoverPlannerStore" }
	)
);
