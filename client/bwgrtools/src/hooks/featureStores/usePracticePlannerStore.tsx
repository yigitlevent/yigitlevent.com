import { type Mark } from "@mui/base/useSlider";
import { Clamp } from "@utility/Clamp";
import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Notification } from "../../components/Shared/Notification";


interface PracticePlannerState {
	nextId: number,
	days: number;
	hours: number;
	cells: BwgrPracticeCell[];
	marks: Mark[];

	changeDays: (value: string) => void;
	changeHours: (value: string) => void;
	addCells: (days: number, hours: number) => void;
	deleteCell: (cellIndex: number) => void;
	changeCellHour: (cellIndex: number, change: 1 | -1, cells: BwgrPracticeCell[], setNotification: Dispatch<SetStateAction<JSX.Element | null>>) => void;
	addPractice: (practiceId: BwgrPracticeId, startEndDay: [number, number], hours: number, name: string, testType: string, setNotification: React.Dispatch<React.SetStateAction<JSX.Element | null>>) => void;
	deletePractice: (cellIndex: number, practiceIndex: number) => void;
}

export const usePracticePlannerStore = create<PracticePlannerState>()(
	devtools(
		(set, get) => ({
			nextId: 0,
			days: 7,
			hours: 8,
			cells: [],
			marks: [],

			changeDays: (value: string) => {
				set(produce<PracticePlannerState>((state) => {
					state.days = Clamp(value === "" ? 0 : parseInt(value), 1, 999);
				}));
			},

			changeHours: (value: string) => {
				set(produce<PracticePlannerState>((state) => {
					state.hours = Clamp(value === "" ? 0 : parseInt(value), 1, 24);
				}));
			},

			addCells: (days: number, hours: number) => {
				set(produce<PracticePlannerState>((state) => {
					const newCells = [...state.cells];
					newCells.push(...[...Array(days)].map(() => { return { maxHours: hours, remaining: hours, placed: [] }; }));
					state.cells = newCells;

					if (state.cells.length > 0) {
						const marks
							= Array
								.from(Array(Math.floor(state.cells.length)))
								.map<Mark>((_, i) => ({ value: i + 1, label: `${i + 1}` }));

						if (state.cells.length < 30) state.marks = marks.filter((v, i) => i === 0 || v.value % 5 === 0);
						else if (state.cells.length < 90) state.marks = marks.filter((v, i) => i === 0 || v.value % 10 === 0);
						else state.marks = marks.filter((v, i) => i === 0 || v.value % 30 === 0);
					}
				}));
			},

			deleteCell: (cellIndex: number) => {
				set(produce<PracticePlannerState>((state) => {
					const newCells = state.cells;
					newCells.splice(cellIndex, 1);
					state.cells = newCells;

					if (state.cells.length > 0) {
						const marks
							= Array
								.from(Array(Math.floor(state.cells.length)))
								.map<Mark>((_, i) => ({ value: i + 1, label: `${i + 1}` }));

						if (state.cells.length < 30) state.marks = marks.filter((v, i) => i === 0 || v.value % 5 === 0);
						else if (state.cells.length < 90) state.marks = marks.filter((v, i) => i === 0 || v.value % 10 === 0);
						else state.marks = marks.filter((v, i) => i === 0 || v.value % 30 === 0);
					}
				}));
			},

			changeCellHour: (cellIndex: number, change: 1 | -1, cells: BwgrPracticeCell[], setNotification: Dispatch<SetStateAction<JSX.Element | null>>) => {
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

			addPractice: (practiceId: BwgrPracticeId, startEndDay: [startDay: number, endDay: number], hours: number, name: string, testType: string, setNotification: React.Dispatch<React.SetStateAction<JSX.Element | null>>) => {
				const { nextId, cells } = get();

				if (startEndDay[0] > startEndDay[1]) {
					setNotification(<Notification text="Start day must be before or at the same day as the end day." severity="error" onClose={() => setNotification(null)} />);
				}
				else if (startEndDay[0] < 1 || startEndDay[1] > cells.length) {
					setNotification(<Notification text="Start and end day must be within the timetable." severity="error" onClose={() => setNotification(null)} />);
				}
				else if (name === "") {
					setNotification(<Notification text="Name must not be empty." severity="error" onClose={() => setNotification(null)} />);
				}
				else {
					for (let i = startEndDay[0] - 1; i < startEndDay[1]; i++) {
						if (cells[i].remaining - hours < 0) {
							setNotification(<Notification text={`Cannot fit practice into the day ${i + 1}. This practice takes ${hours} hours.`} severity="error" onClose={() => setNotification(null)} />);
							return;
						}
						else if (cells[i].placed.some(cell => cell.name === name)) {
							setNotification(<Notification text={`Cannot place practice to day ${i + 1} as another practice for the same Skill, Attribute or Stat already exists.`} severity="error" onClose={() => setNotification(null)} />);
							return;
						}
					}

					set(produce<PracticePlannerState>((state) => {
						state.nextId = nextId + 1 as BwgrPracticeId;

						state.cells = [...state.cells].map((v, i) => {
							if (i >= startEndDay[0] - 1 && i <= startEndDay[1] - 1) {
								const practice: BwgrPracticePlaced = { practiceId, cellId: nextId, name, testType, hours };
								const placed = [...v.placed, practice];
								const remainingHours = v.remaining - hours;
								return { ...v, remaining: remainingHours, placed: placed };
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
							const placed = v.placed.filter((_, i) => i !== practiceIndex);
							const hours = v.remaining + v.placed[practiceIndex].hours;
							return { ...v, remaining: hours, placed: placed };
						}
						return v;
					});
				}));
			}
		}),
		{ name: "usePracticePlannerStore" }
	)
);
