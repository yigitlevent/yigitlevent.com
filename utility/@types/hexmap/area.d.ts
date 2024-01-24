type HmAreaId = Nominal<string, "HmAreaId">;
type HmAreaTypeId = Nominal<number, "HmAreaTypeId">;

type HmAreaPlacement = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type HmAreaTypeCategory = "None" | "Ruins" | "Lakes" | "Buildings";

type HmAreaTextureName = `Area_${HmAreaTypeCategory}_${number}_${string}`;

interface HmAreaType {
	id: HmAreaTypeId;
	name: string;
	category: HmAreaTypeCategory;
	fill: HmSurfaceStyleFill;
	texture?: HmAreaTextureName;
}

interface HmArea {
	id: HmAreaId;
	hexId: HmHexId;
	name: string;
	typeId: HmAreaTypeId;
	placement: HmAreaPlacement;
	center: HmPoint;
	vertices: number[];
	state: HmSurfaceState;
}
