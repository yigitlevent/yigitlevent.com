type HmHexId = Nominal<string, "HmHexId">;
type HmHexAreaId = Nominal<string, "HmHexAreaId">;

interface HmHexPoints {
	topLeft: HmPoint;
	topRight: HmPoint;
	right: HmPoint;
	bottomRight: HmPoint;
	bottomLeft: HmPoint;
	left: HmPoint;
}

interface HmHexStyle {
	stroke?: {
		width: number;
		color: RgbaColor;
		alignment: 0 | 0.5 | 1;
	};
	fill?: {
		color: RgbaColor;
		hoverColor: RgbaColor;
	};
}

interface HmHexState {
	isPainted: boolean;
	isHovered: boolean;
}

type HmHexAreaPlacement = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface HmHexArea {
	id: HmHexAreaId;
	parentHexId: HmHexId;
	name: string;
	placement: HmHexAreaPlacement;
	vertices: number[];
	state: HmHexState;
	style: HmHexStyle;
}

interface HmHex {
	id: HmHexId;
	name: string;
	position: HmPoint;
	actualPosition: HmPoint;
	points: {
		outer: HmHexPoints;
		inner: HmHexPoints;
	};
	vertices: number[];
	state: HmHexState;
	style: HmHexStyle;
}
