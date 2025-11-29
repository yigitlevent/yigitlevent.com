type HmBiomeId = Nominal<number, "HmBiomeId">;
type HmTerrainId = Nominal<number, "HmTerrainId">;

interface HmSurfaceState {
	isPainted: boolean;
	isHovered: boolean;
}

interface HmBiome {
	id: HmBiomeId;
	name: string;
	fill: HmSurfaceStyleFill;
}

type HmTerrainType = "Area" | "Hex" | "Any";
type HmTerrainExactType = `Area${0 | 1 | 2 | 3 | 4 | 5 | 6}` | "Hex";
type HmHexTextureName = `${string}_hex`;
type HmAreaTexturePlacement = "center" | "side";
type HmAreaTexturePlacementOld = `area${0 | 1 | 2 | 3 | 4 | 5 | 6}`;
type HmAreaTextureName = `${string}_${number}_${HmAreaTexturePlacement}`;
type HmTextureName = "nothing" | HmHexTextureName | HmAreaTextureName;

interface HmTerrain {
	id: HmTerrainId;
	name: string;
	type: HmTerrainType;
	textures: HmTextureName[];
}
