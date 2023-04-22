import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface RangeAndCoverPlannerState {
	volleyIndex: number;
	actions: [undefined | RaCActionExtended, undefined | RaCActionExtended, undefined | RaCActionExtended];
	selectedAction: string;

	changeVolleyIndex: (volleyIndex: number) => void;
	addAction: (actions: RaCAction[], volleyIndex: number, actionName: string) => void;
	deleteAction: (volleyIndex: number) => void;
	selectedChangeAction: (actionName: string) => void;
	toggleActionDetails: (volleyIndex: number) => void;
	toggleActionVisibility: (volleyIndex: number) => void;
}

export const useRangeAndCoverPlannerStore = create<RangeAndCoverPlannerState>()(
	devtools(
		(set) => ({
			volleyIndex: 0,
			actions: [undefined, undefined, undefined],
			selectedAction: "Close",

			changeVolleyIndex: (volleyIndex: number) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					state.volleyIndex = volleyIndex;
				}));
			},
			addAction: (actions: RaCAction[], volleyIndex: number, actionName: string) => {
				const action: RaCActionExtended = { ...actions.find(v => v.name === actionName) as RaCAction, open: false, visible: true };
				set(produce<RangeAndCoverPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) return action;
						else return v;
					}) as [RaCActionExtended, RaCActionExtended, RaCActionExtended];
				}));
			},
			deleteAction: (volleyIndex: number) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) return undefined;
						else return v;
					}) as [RaCActionExtended, RaCActionExtended, RaCActionExtended];
				}));
			},
			selectedChangeAction: (actionName: string) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					state.selectedAction = actionName;
				}));
			},
			toggleActionDetails: (volleyIndex: number) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (v && i === volleyIndex) { return { ...v, open: !v.open }; }
						return v;
					}) as [RaCActionExtended, RaCActionExtended, RaCActionExtended];
				}));
			},
			toggleActionVisibility: (volleyIndex: number) => {
				set(produce<RangeAndCoverPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (v && i === volleyIndex) { return { ...v, visible: !v.visible }; }
						return v;
					}) as [RaCActionExtended, RaCActionExtended, RaCActionExtended];
				}));
			}
		})
	)
);
