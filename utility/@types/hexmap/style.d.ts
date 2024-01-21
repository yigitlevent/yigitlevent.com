type HmHexStyleStrokeAlignments = 0 | 0.5 | 1;

interface HmHexStyleStroke {
	width: number;
	color: RgbaColor;
	alignment: HmHexStyleStrokeAlignments;
}

interface HmHexStyleFill {
	color: RgbaColor,
	hover: RgbaColor;
}
