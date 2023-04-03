import produce from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Clamp } from "../../utils/misc";

import { Notification } from "../../components/Shared/Notification";


interface FightPlannerState {
	reflexes: number;
	volleyIndex: number;
	actions: [FightActionExtended[], FightActionExtended[], FightActionExtended[]];
	selectedAction: string;

	changeReflexes: (reflexes: number, actions: [FightActionExtended[], FightActionExtended[], FightActionExtended[]], setNotification: React.Dispatch<React.SetStateAction<JSX.Element | null>>) => void;
	changeVolleyIndex: (volleyIndex: number) => void;
	addAction: (actions: FightAction[], volleyIndex: number, actionName: undefined | string, reflexes: number, currentActions: [FightActionExtended[], FightActionExtended[], FightActionExtended[]], setNotification: React.Dispatch<React.SetStateAction<JSX.Element | null>>) => void;
	deleteAction: (volleyIndex: number, actionIndex: number) => void;
	changeSelectedAction: (actionName: string) => void;
	toggleActionDetails: (volleyIndex: number, actionIndex: number) => void;
	toggleActionVisibility: (volleyIndex: number, actionIndex: number) => void;
}

export const useFightPlannerStore = create<FightPlannerState>()(
	devtools(
		(set) => ({
			reflexes: 3,
			volleyIndex: 0,
			actions: [[], [], []],
			selectedAction: "No Action",

			changeReflexes: (reflexes: number, actions: [FightActionExtended[], FightActionExtended[], FightActionExtended[]], setNotification: React.Dispatch<React.SetStateAction<JSX.Element | null>>) => {
				const flatActions = actions.flat().filter(v => v.name !== "No Action");
				if (flatActions.length > reflexes) {
					setNotification(<Notification text="Cannot decrease reflex. Remove some actions and try again." severity="error" onClose={() => setNotification(null)} />);
				}
				else {
					set(produce<FightPlannerState>((state) => {
						state.reflexes = Clamp(reflexes, 0, 12);
					}));
					setNotification(null);
				}
			},
			changeVolleyIndex: (volleyIndex: number) => {
				set(produce<FightPlannerState>((state) => {
					state.volleyIndex = volleyIndex;
				}));
			},
			addAction: (actions: FightAction[], volleyIndex: number, actionName: undefined | string, reflexes: number, currentActions: [FightActionExtended[], FightActionExtended[], FightActionExtended[]], setNotification: React.Dispatch<React.SetStateAction<JSX.Element | null>>) => {
				const lengths = [
					currentActions[0].filter(v => v.name !== "No Action").length,
					currentActions[1].filter(v => v.name !== "No Action").length,
					currentActions[2].filter(v => v.name !== "No Action").length
				];
				const flatActions = currentActions.flat().filter(v => v.name !== "No Action");

				if (flatActions.length === reflexes && actionName !== "No Action") {
					setNotification(<Notification text="Cannot add action because reflex maximum is reached." severity="error" onClose={() => setNotification(null)} />);
				}
				else if (lengths[volleyIndex] > Math.min(...lengths)) {
					setNotification(<Notification text="Cannot add action because volleys would be uneven." severity="error" onClose={() => setNotification(null)} />);
				}
				else {
					const action: FightActionExtended = { ...actions.find(v => v.name === actionName) as FightAction, open: false, visible: true };
					set(produce<FightPlannerState>((state) => {
						const newActions = state.actions;
						state.actions = newActions.map((v, i) => {
							if (i === volleyIndex) { return [...v, action]; }
							return v;
						}) as [FightActionExtended[], FightActionExtended[], FightActionExtended[]];
					}));
					setNotification(null);
				}
			},
			deleteAction: (volleyIndex: number, actionIndex: number) => {
				set(produce<FightPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) { return v.filter((vv, ii) => ii !== actionIndex); }
						return v;
					}) as [FightActionExtended[], FightActionExtended[], FightActionExtended[]];
				}));
			},
			changeSelectedAction: (actionName: string) => {
				set(produce<FightPlannerState>((state) => {
					state.selectedAction = actionName;
				}));
			},
			toggleActionDetails: (volleyIndex: number, actionIndex: number) => {
				set(produce<FightPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) {
							return v.map((vv, ii) => {
								if (ii === actionIndex) { return { ...vv, open: !vv.open }; }
								return vv;
							});
						}
						return v;
					}) as [FightActionExtended[], FightActionExtended[], FightActionExtended[]];
				}));
			},
			toggleActionVisibility: (volleyIndex: number, actionIndex: number) => {
				set(produce<FightPlannerState>((state) => {
					const newActions = state.actions;
					state.actions = newActions.map((v, i) => {
						if (i === volleyIndex) {
							return v.map((vv, ii) => {
								if (ii === actionIndex) { return { ...vv, visible: !vv.visible }; }
								return vv;
							});
						}
						return v;
					}) as [FightActionExtended[], FightActionExtended[], FightActionExtended[]];
				}));
			}
		})
	)
);
