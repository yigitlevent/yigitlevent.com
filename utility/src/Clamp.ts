export function Clamp(num: number, min: number, max: number): number {
	const val = isNaN(num) ? min : num;
	return Math.min(Math.max(val, min), max);
}
