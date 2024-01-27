type HmAreaId = Nominal<string, "HmAreaId">;

type HmAreaPlacement = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface HmArea {
	id: HmAreaId;
	name: string;
	hexId: HmHexId;
	placement: HmAreaPlacement;
	type: {
		terrainId: HmTerrainId;
		texture: HmTextureName;
	};
	coordinates: {
		center: HmPoint;
		vertices: number[];
	};
	state: HmSurfaceState;
}
