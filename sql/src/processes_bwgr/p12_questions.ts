import { AttributeQuestions, AttributeQuestionsKeys } from "../raw_data_bwgr/attributes";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";


export function processQuestions(): Processed {
	const datQuestions: string[] = [];
	const questionRefs: Reference[] = [];

	Object.keys(AttributeQuestions)
		.map((key, i) => {
			const k = key as AttributeQuestionsKeys;
			const q = AttributeQuestions[k];
			questionRefs.push([i, q.text]);
			datQuestions.push(`(${i}, '${k}', '${escapeTick(q.text)}')`);
		});

	return {
		name: "p12_questions",
		references: { Questions: questionRefs },
		data: [
			arrayToSQL("bwgr", "Questions", '"Id", "Name", "Question"', datQuestions)
		]
	};
}
