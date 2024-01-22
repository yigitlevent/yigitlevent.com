type HmHexId = Nominal<string, "HmHexId">;
type HmHexTypeId = Nominal<number, "HmHexTypeId">;


interface HmHexType {
	id: HmHexTypeId,
	name: string,
	fill: HmSurfaceStyleFill;
}

interface HmHex {
	id: HmHexId;
	name: string;
	typeId: HmHexTypeId,
	position: HmPoint;
	actualPosition: HmPoint;
	points: {
		outer: HmPoints;
		inner: HmPoints;
	};
	vertices: number[];
	state: HmSurfaceState;
}
