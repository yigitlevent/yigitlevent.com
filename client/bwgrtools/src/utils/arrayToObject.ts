export function ArrayToObject<T>(arr: (T & { id: any; })[]): { [key: string]: T; } {
	return arr.reduce((a, v) => ({ ...a, [v.id.toString()]: v }), {});
}

export function SetToObject<T>(arr: Set<(T & { id: any; })>): { [key: string]: T; } {
	return [...arr].reduce((a, v) => ({ ...a, [v.id.toString()]: v }), {});
}
