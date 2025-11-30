type HexColor = `#${string}`;

type RgbColor = `rgb(${number}, ${number}, ${number})`;

type RgbaColor = `rgba(${number}, ${number}, ${number}, ${number})`;

type Color =
	| HexColor
	| RgbColor
	| RgbaColor;
