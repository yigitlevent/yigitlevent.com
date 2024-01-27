import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useDrawerStore } from "../useDrawerStore";


interface ToolsState {
	selectedTool: HmDrawerTools;
	selectedBiome: HmBiomeId;
	selectedTerrain: HmTerrainId;

	setSelectedTool: (tool: HmDrawerTools) => void;
	setSelectedBiome: (biomeId: HmBiomeId) => void;
	setSelectedTerrain: (terrainId: HmTerrainId) => void;
}

export const useToolsStore = create<ToolsState>()(
	devtools(
		(set) => ({
			selectedTool: "Pan",
			selectedBiome: 0 as HmBiomeId,
			selectedTerrain: 0 as HmTerrainId,

			setSelectedTool: (tool: HmDrawerTools): void => {
				const drawerState = useDrawerStore.getState();

				set(produce<ToolsState>((state) => {
					state.selectedTool = tool;
					if (tool === "Area Paint") state.selectedBiome = 0 as HmBiomeId;
					if (tool === "Hex Paint" || tool === "Area Paint") {
						state.selectedTerrain = 0 as HmTerrainId;
						drawerState.setOpenCategory(tool);
					}
					else {
						drawerState.setOpenCategory("File");
					}
				}));
			},

			setSelectedBiome: (biomeId: HmBiomeId): void => {
				set(produce<ToolsState>((state) => {
					state.selectedBiome = biomeId;
				}));
			},

			setSelectedTerrain: (terrainId: HmTerrainId): void => {
				set(produce<ToolsState>((state) => {
					state.selectedTerrain = terrainId;
				}));
			}
		}),
		{ name: "useToolsStore", serialize: true }
	)
);
