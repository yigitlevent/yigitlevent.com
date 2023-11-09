import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


export type DrawerNames = "Tools" | "Datasets" | "Checklist" | "My Things";

interface DrawerState {
	drawer: undefined | DrawerNames;
	openDrawer: (drawer: DrawerNames) => void;
}

export const useDrawerStore = create<DrawerState>()(
	devtools(
		(set) => ({
			drawer: undefined,

			openDrawer: (drawer: DrawerNames) => {
				set(produce<DrawerState>((state) => {
					if (state.drawer === drawer) state.drawer = undefined;
					else state.drawer = drawer;
				}));
			}
		})
	)
);
