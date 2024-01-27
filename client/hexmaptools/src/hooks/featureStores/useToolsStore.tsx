import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface ToolsState {
	selectedTool: HmDrawerTools;
	selectedPaintTool: HmPaintTool;

	selectedBiome: HmBiomeId;
	selectedTerrain: HmTerrainId;

	setSelectedTool: (tool: HmDrawerTools) => void;
	setSelectedPaintTool: (tool: HmPaintTool) => void;
	setSelectedBiome: (biomeId: HmBiomeId) => void;
	setSelectedTerrain: (terrainId: HmTerrainId) => void;
}

export const useToolsStore = create<ToolsState>()(
	devtools(
		(set) => ({
			selectedTool: "Pan",
			selectedPaintTool: "Hex",

			selectedBiome: 0 as HmBiomeId,
			selectedTerrain: 0 as HmTerrainId,

			setSelectedTool: (tool: HmDrawerTools): void => {
				set(produce<ToolsState>((state) => {
					state.selectedTool = tool;
				}));
			},

			setSelectedPaintTool: (tool: HmPaintTool): void => {
				set(produce<ToolsState>((state) => {
					state.selectedPaintTool = tool;
					if (tool === "Area") state.selectedBiome = 0 as HmBiomeId;
					state.selectedTerrain = 0 as HmTerrainId;
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
		{ name: "useToolsStore" }
	)
);
