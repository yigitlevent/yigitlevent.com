import { Clamp } from "@utility/Clamp";


export function FillMaker(color: RgbaColor, change = 60): HmHexStyleFill {
	const startIndex = color.indexOf("(");
	const endIndex = color.indexOf(")");
	const sub = color.substring(startIndex + 1, endIndex).split(", ");
	const r = Clamp(parseInt(sub[0]) + change, 0, 255);
	const g = Clamp(parseInt(sub[1]) + change, 0, 255);
	const b = Clamp(parseInt(sub[2]) + change, 0, 255);
	const a = parseFloat(sub[3]);

	return {
		color,
		hover: `rgba(${r}, ${g}, ${b}, ${a})`
	};
}
