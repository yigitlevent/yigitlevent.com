type HmHexFeatureTypeId = Nominal<number, "HmHexFeatureTypeId">;
type HmHexFeatureId = Nominal<number, "HmHexFeatureId">;

interface HmHexFeatureType {
	id: HmHexFeatureTypeId;
	positioning: "edge" | "section";
}

interface HmHexFeature {
	id: HmHexFeatureId;
	typeId: HmHexFeatureTypeId;
	positions?: number[];
}
