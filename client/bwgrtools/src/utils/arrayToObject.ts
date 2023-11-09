export function ArrayToObject<T>(arr: (T & { id: string; })[]): { [key: string]: T; } {
	return arr.reduce((a, v) => ({ ...a, [v.id.toString()]: v }), {});
}

export function SetToObject<T>(arr: Set<(T & { id: string; })>): { [key: string]: T; } {
	return [...arr].reduce((a, v) => ({ ...a, [v.id.toString()]: v }), {});
}
