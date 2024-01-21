type HmHexId = Nominal<string, "HmHexId">;
type HmHexTypeId = Nominal<number, "HmHexTypeId">;
type HmHexAreaId = Nominal<string, "HmHexAreaId">;

interface HmHexPoints {
	topLeft: HmPoint;
	topRight: HmPoint;
	right: HmPoint;
	bottomRight: HmPoint;
	bottomLeft: HmPoint;
	left: HmPoint;
}

interface HmHexType {
	id: HmHexTypeId,
	name: string,
	fill: HmHexStyleFill;
}

interface HmHexState {
	isPainted: boolean;
	isHovered: boolean;
}

type HmHexAreaPlacement = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface HmHexArea {
	id: HmHexAreaId;
	hexId: HmHexId;
	name: string;
	placement: HmHexAreaPlacement;
	vertices: number[];
	state: HmHexState;
}

interface HmHex {
	id: HmHexId;
	name: string;
	typeId: HmHexTypeId,
	position: HmPoint;
	actualPosition: HmPoint;
	points: {
		outer: HmHexPoints;
		inner: HmHexPoints;
	};
	vertices: number[];
	state: HmHexState;
}
