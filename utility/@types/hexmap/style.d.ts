type HmSurfaceStyleStrokeAlignments = 0 | 0.5 | 1;

interface HmSurfaceStyleStroke {
	width: number;
	color: RgbaColor;
	alignment: HmSurfaceStyleStrokeAlignments;
}

interface HmSurfaceStyleFill {
	color: RgbaColor,
	hover: RgbaColor;
}
