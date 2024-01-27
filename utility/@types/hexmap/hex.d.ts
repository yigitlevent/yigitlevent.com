type HmHexId = Nominal<string, "HmHexId">;


interface HmHex {
	id: HmHexId;
	name: string;
	type: {
		biomeId: HmBiomeId;
		terrainId: HmTerrainId;
	};
	coordinates: {
		position: HmPoint;
		actualPosition: HmPoint;
		points: {
			outer: HmHexPoints;
			inner: HmHexPoints;
		};
		center: HmPoint;
		vertices: number[];
	};
	state: HmSurfaceState;
}
