type QuestionId = Nominal<number, "QuestionId">;

interface Question {
	id: QuestionId;
	name: string;
	question: string;
}


