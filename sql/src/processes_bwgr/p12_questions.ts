import { AttributeQuestions, AttributeQuestionsKeys } from "../raw_data_bwgr/attributes";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";
import { findIndex } from "../util/findRef";


export function processQuestions(refs: References): Processed {
	const datQuestions: string[] = [];
	const questionRefs: Reference[] = [];

	Object.keys(AttributeQuestions)
		.map((key, i) => {
			const k = key as AttributeQuestionsKeys;
			const q = AttributeQuestions[k];
			const a
				= q.attribute === "Always"
					? "null, null"
					: typeof q.attribute === "string"
						? `${findIndex("Abilities", q.attribute, refs)[0]}, null`
						: `${[findIndex("Abilities", q.attribute[0], refs)[0], findIndex("Abilities", q.attribute[1], refs)[0]].join(", ")}`;
			questionRefs.push([i, q.text]);
			datQuestions.push(`(${i}, '${k}', '${escapeTick(q.text)}', ${a})`);
		});

	return {
		name: "p12_questions",
		references: { Questions: questionRefs },
		data: [
			arrayToSQL("bwgr", "Questions", '"Id", "Name", "Question", "AttributeId1", "AttributeId2"', datQuestions)
		]
	};
}
