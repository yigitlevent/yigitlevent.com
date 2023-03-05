type Reference = [id: number, name: string];

interface References {
	[key: string]: Reference[];
}

interface Processed {
	references: References;
	data: string[];
}
