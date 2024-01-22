type HmHexmapId = Nominal<string, "HmHexmapId">;

interface HmHexmapSettings {
	mapSize: HmSize;
	hexRadius: number;
	strokeStyle: HmSurfaceStyleStroke;
}

interface HmHexmap {
	id: HmHexmapId;
	name: string;
	settings: HmHexmapSettings;
}
