type HmHexmapId = Nominal<number, "HmHexmapId">;

interface HmHexmapConstants {
	mapSize: HmSize;
	hexRadius: number;
}

interface HmHexmap {
	id: HmHexmapId;
	name: string;
	constants: HmHexmapConstants;
}
