interface PracticePlaced {
	practiceId: PracticeId;
	name: string;
	testType: string;
	hours: number;
}

interface PracticeCell {
	maxHours: number;
	remaining: number;
	placed: PracticePlaced[];
}
