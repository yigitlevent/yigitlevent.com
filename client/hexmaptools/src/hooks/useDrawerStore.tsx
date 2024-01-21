import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface DrawerState {
	isDrawerOpen: boolean;
	drawerWidth: number;
	openCategory: HmDrawerCategories | undefined;

	toggleDrawer: (open?: boolean) => void;
	setOpenCategory: (categoryName?: HmDrawerCategories) => void;
}

export const useDrawerStore = create<DrawerState>()(
	devtools(
		(set) => ({
			isDrawerOpen: false,
			drawerWidth: 240,
			openCategory: "Settings",

			toggleDrawer: (open?: boolean) => {
				set(produce<DrawerState>((state) => {
					if (open !== undefined) state.isDrawerOpen = open;
					else state.isDrawerOpen = !state.isDrawerOpen;
				}));
			},
			setOpenCategory: (categoryName?: HmDrawerCategories) => {
				set(produce<DrawerState>((state) => {
					state.openCategory = categoryName;
				}));
			}
		}),
		{ name: "useDrawerStore" }
	)
);
