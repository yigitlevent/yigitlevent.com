type HmHexId = Nominal<string, "HmHexId">;
type HmHexTypeId = Nominal<number, "HmHexTypeId">;

type HmHexTypeCategory = string | "None" | "Grasslands" | "Desert" | "Snow" | "Swamp" | "Water";

type HmHexTextureName = `Hex_${HmHexTypeCategory}_${number}_${string}`;

interface HmHexType {
	id: HmHexTypeId,
	name: string,
	category: HmHexTypeCategory;
	fill: HmSurfaceStyleFill;
	texture?: HmHexTextureName;
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
	center: HmPoint;
	vertices: number[];
	state: HmSurfaceState;
}
