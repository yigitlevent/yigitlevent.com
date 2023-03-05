type ReferenceKeys = "Stocks" | "Settings";

export function findIndex(type: ReferenceKeys, name: string, references: { [key: string]: Reference[]; }) {
	if (type in references) {
		const ref = references[type].find(v => v[1] === name);
		if (ref) return ref[0];
		throw new Error(`No indexes found for '${name}' in 'references["${type}"]'.`);
	}
	throw new Error(`No '${type}' in 'references'.`);
}
