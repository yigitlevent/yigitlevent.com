import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface HexmapState {
	mapId: HmHexmapId;
	setMapId: (mapId: HmHexmapId) => void;
}

export const useHexmapStore = create<HexmapState>()(
	devtools(
		(set) => ({
			mapId: 3 as HmHexmapId,
			
			setMapId: (mapId: HmHexmapId) => {
				set(produce<HexmapState>((state) => {
					state.mapId = mapId;
				}));
			}
		}),
		{ name: "useHexmapStore" }
	)
);
