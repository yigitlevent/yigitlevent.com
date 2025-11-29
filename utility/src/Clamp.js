export function Clamp(num, min, max) {
    const val = isNaN(num) || typeof num !== "number" ? min : num;
    return Math.min(Math.max(val, min), max);
}
