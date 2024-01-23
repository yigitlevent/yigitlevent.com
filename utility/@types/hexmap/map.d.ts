type HmHexmapId = Nominal<string, "HmHexmapId">;

interface HmHexmapSettings {
	mapSize: HmSize;
	hexRadius: number;
	hexStrokeStyle: HmSurfaceStyleStroke;
	areaStrokeStyle: HmSurfaceStyleStroke;
}

interface HmHexmap {
	id: HmHexmapId;
	name: string;
	settings: HmHexmapSettings;
}
