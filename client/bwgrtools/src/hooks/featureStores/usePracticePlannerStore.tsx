import { Dispatch, FormEvent, SetStateAction } from "react";
import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Clamp } from "../../utils/misc";

import { Notification } from "../../components/Shared/Notification";


interface PracticePlannerState {
	days: number;
	hours: number;
	cells: PracticeCell[];

	changeDays: (value: string) => void;
	changeHours: (value: string) => void;
	addCells: (days: number, hours: number) => void;
	deleteCell: (cellIndex: number) => void;
	changeCellHour: (cellIndex: number, change: 1 | -1, cells: PracticeCell[], setNotification: Dispatch<SetStateAction<JSX.Element | null>>) => void;
	addPractice: (e: FormEvent<HTMLFormElement>, practices: Practice[], cells: PracticeCell[], setNotification: React.Dispatch<React.SetStateAction<JSX.Element | null>>) => void;
	deletePractice: (cellIndex: number, practiceIndex: number) => void;
}

export const usePracticePlannerStore = create<PracticePlannerState>()(
	devtools(
		(set) => ({
			days: 6,
			hours: 6,
			cells: [],

			changeDays: (value: string) => {
				set(produce<PracticePlannerState>((state) => {
					state.days = Clamp(value === "" ? 0 : parseInt(value), 0, 30);
				}));
			},
			changeHours: (value: string) => {
				set(produce<PracticePlannerState>((state) => {
					state.days = Clamp(value === "" ? 0 : parseInt(value), 1, 24);
				}));
			},
			addCells: (days: number, hours: number) => {
				set(produce<PracticePlannerState>((state) => {
					const newCells = state.cells;
					newCells.push(...[...Array(days)].map(() => { return { maxHours: hours, remaining: hours, placed: [] }; }));
					state.cells = newCells;
				}));
			},
			deleteCell: (cellIndex: number) => {
				set(produce<PracticePlannerState>((state) => {
					const newCells = state.cells;
					newCells.splice(cellIndex, 1);
					state.cells = newCells;
				}));
			},
			changeCellHour: (cellIndex: number, change: 1 | -1, cells: PracticeCell[], setNotification: Dispatch<SetStateAction<JSX.Element | null>>) => {
				if (cells[cellIndex].remaining === 0 && change === -1) {
					setNotification(<Notification text="Cannot reduce hours from day. It is used by practices." severity="error" onClose={() => setNotification(null)} />);
				}
				else {
					set(produce<PracticePlannerState>((state) => {
						const newCells = state.cells;
						state.cells = newCells.map((v, i) => {
							if (i === cellIndex && ((v.maxHours < 24 && change > 0) || (v.maxHours > 1 && change < 0))) {
								return { ...v, maxHours: v.maxHours + change, remaining: v.remaining + change };
							}
							return v;
						});
					}));
					setNotification(null);
				}
			},
			addPractice: (e: FormEvent<HTMLFormElement>, practices: Practice[], cells: PracticeCell[], setNotification: React.Dispatch<React.SetStateAction<JSX.Element | null>>) => {
				e.preventDefault();
				const els = Object.values((e.target as HTMLFormElement).elements) as HTMLInputElement[];
				const [cIndex, pId, tType, name] = els.filter(v => v.tagName === "INPUT" && v.type === "text").map((v) => v.value);
				const cellIndex = parseInt(cIndex);
				const practiceId = pId as unknown as PracticeId;
				const testType = tType as Exclude<keyof Practice, "id" | "ability" | "skillType" | "cycle">;
				const practice = practices.find(v => v.id === practiceId);
				if (practice === undefined) throw new Error(`PracticeId '${practiceId}' not found`);
				const hours = practice[testType];

				if (name === "") {
					setNotification(<Notification text="Please enter a Skill name." severity="error" onClose={() => setNotification(null)} />);
				}
				else if (cells[cellIndex].remaining - hours < 0) {
					setNotification(<Notification text={`Cannot fit practice into the day. This practice takes ${hours} hours.`} severity="error" onClose={() => setNotification(null)} />);
				}
				else {
					const practice: PracticePlaced = { practiceId, name, testType, hours };
					set(produce<PracticePlannerState>((state) => {
						const newCells = state.cells;
						state.cells = newCells.map((v, i) => {
							if (i === cellIndex) {
								const placed = [...v.placed, practice];
								const hours = v.remaining - practice.hours;
								return { ...v, remaining: hours, placed: placed };
							}
							return v;
						});
					}));
					setNotification(null);
				}
			},
			deletePractice: (cellIndex: number, practiceIndex: number) => {
				set(produce<PracticePlannerState>((state) => {
					const newCells = state.cells;
					state.cells = newCells.map((v, i) => {
						if (i === cellIndex) {
							const placed = v.placed.filter((v, i) => i !== practiceIndex);
							const hours = v.remaining + v.placed[practiceIndex].hours;
							return { ...v, remaining: hours, placed: placed };
						}
						return v;
					});
				}));
			}
		})
	)
);
