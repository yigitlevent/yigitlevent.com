type HmHexTypeId = Nominal<number, "HmHexTypeId">;
type HmHexId = Nominal<number, "HmHexId">;


interface HmHexType {
	id: HmHexTypeId;
	color: RgbColor;
}

interface HmHex {
	id: HmHexId;
	typeId: HmHexTypeId;
	position: [number, number];
	features: HmHexFeature[];
}
