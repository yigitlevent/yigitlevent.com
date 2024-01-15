import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface DuelOfWitsPlannerState {
	volleyIndex: number;
	actions: [undefined | BwgrDoWActionExtended, undefined | BwgrDoWActionExtended, undefined | BwgrDoWActionExtended];
	selectedAction: string;

	changeVolleyIndex: (volleyIndex: number) => void;
	addAction: (actions: BwgrDoWAction[], volleyIndex: number, actionName: undefined | string) => void;
	deleteAction: (volleyIndex: number) => void;
	selectedChangeAction: (actionName: string) => void;
	toggleActionDetails: (volleyIndex: number) => void;
	toggleActionVisibility: (volleyIndex: number) => void;
}

export const useDuelOfWitsPlannerStore = create<DuelOfWitsPlannerState>()(
	devtools(
		(set) => ({
			volleyIndex: 0,
			actions: [undefined, undefined, undefined],
			selectedAction: "Avoid the Topic",

			changeVolleyIndex: (volleyIndex: number) => {
				set(produce<DuelOfWitsPlannerState>((state) => {
					state.volleyIndex = volleyIndex;
				}));
			},
			addAction: (actions: BwgrDoWAction[], volleyIndex: number, actionName: undefined | string) => {
				const action: BwgrDoWActionExtended = { ...actions.find(v => v.name === actionName) as BwgrDoWAction, open: false, visible: true };
				set(produce<DuelOfWitsPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) return action;
						else return v;
					}) as [BwgrDoWActionExtended, BwgrDoWActionExtended, BwgrDoWActionExtended];
				}));
			},
			deleteAction: (volleyIndex: number) => {
				set(produce<DuelOfWitsPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) return undefined;
						else return v;
					}) as [BwgrDoWActionExtended, BwgrDoWActionExtended, BwgrDoWActionExtended];
				}));
			},
			selectedChangeAction: (actionName: string) => {
				set(produce<DuelOfWitsPlannerState>((state) => {
					state.selectedAction = actionName;
				}));
			},
			toggleActionDetails: (volleyIndex: number) => {
				set(produce<DuelOfWitsPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (v && i === volleyIndex) { return { ...v, open: !v.open }; }
						return v;
					}) as [BwgrDoWActionExtended, BwgrDoWActionExtended, BwgrDoWActionExtended];
				}));
			},
			toggleActionVisibility: (volleyIndex: number) => {
				set(produce<DuelOfWitsPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (v && i === volleyIndex) { return { ...v, visible: !v.visible }; }
						return v;
					}) as [BwgrDoWActionExtended, BwgrDoWActionExtended, BwgrDoWActionExtended];

				}));
			}
		}),
		{ name: "useDuelOfWitsPlannerStore" }
	)
);
