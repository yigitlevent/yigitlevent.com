import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface ToolsState {
	selectedTool: HmDrawerTools;
	selectedPaintTool: HmPaintTool;

	hexPaintTool: {
		selectedType: HmHexTypeId;
	};

	areaPaintTool: {
		selectedType: HmAreaTypeId;
	};

	setSelectedTool: (tool: HmDrawerTools) => void;
	setSelectedPaintTool: (tool: HmPaintTool) => void;
	setSelectedHexType: (typeId: HmHexTypeId) => void;
	setSelectedAreaType: (typeId: HmAreaTypeId) => void;
}

export const useToolsStore = create<ToolsState>()(
	devtools(
		(set) => ({
			selectedTool: "Pan",
			selectedPaintTool: "Hex",

			hexPaintTool: {
				selectedType: 0 as HmHexTypeId
			},

			areaPaintTool: {
				selectedType: 0 as HmAreaTypeId
			},

			setSelectedTool: (tool: HmDrawerTools): void => {
				set(produce<ToolsState>((state) => {
					state.selectedTool = tool;
				}));
			},

			setSelectedPaintTool: (tool: HmPaintTool): void => {
				set(produce<ToolsState>((state) => {
					state.selectedPaintTool = tool;
				}));
			},

			setSelectedHexType: (typeId: HmHexTypeId): void => {
				set(produce<ToolsState>((state) => {
					state.hexPaintTool.selectedType = typeId;
				}));
			},

			setSelectedAreaType: (typeId: HmAreaTypeId): void => {
				set(produce<ToolsState>((state) => {
					state.areaPaintTool.selectedType = typeId;
				}));
			}
		}),
		{ name: "useToolsStore" }
	)
);
