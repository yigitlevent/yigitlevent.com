type HmAreaId = Nominal<string, "HmAreaId">;
type HmAreaTypeId = Nominal<number, "HmAreaTypeId">;

type HmAreaPlacement = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface HmAreaType {
	id: HmAreaTypeId;
	name: string;
	fill: HmSurfaceStyleFill;
}

interface HmArea {
	id: HmAreaId;
	hexId: HmHexId;
	name: string;
	typeId: HmAreaTypeId;
	placement: HmAreaPlacement;
	vertices: number[];
	state: HmSurfaceState;
}
