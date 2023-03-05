interface Processed {
	references: { [key: string]: Reference[]; };
	data: string[];
}

type Reference = [id: number, name: string];
