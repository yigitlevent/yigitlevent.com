import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface DrawerState {
	isDrawerOpen: boolean;
	drawerWidth: number;
	toggleDrawer: (open?: boolean) => void;
}

export const useDrawerStore = create<DrawerState>()(
	devtools(
		(set) => ({
			isDrawerOpen: false,
			drawerWidth: 240,

			toggleDrawer: (open?: boolean) => {
				set(produce<DrawerState>((state) => {
					if (open !== undefined) state.isDrawerOpen = open;
					else state.isDrawerOpen = !state.isDrawerOpen;
				}));
			}
		}),
		{ name: "useDrawerStore" }
	)
);
