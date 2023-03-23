type Reference = [id: number, name: string];

interface References {
	[key: string]: Reference[];
}

interface Processed {
	name: string;
	references: References;
	data: string[];
}
