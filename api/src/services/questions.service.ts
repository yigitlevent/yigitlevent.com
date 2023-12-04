import { PgPool } from "../index";


export async function GetQuestions(): Promise<Question[]> {
	const convert = (v: QuestionDBO): Question => {
		const r: Question = {
			id: v.Id,
			name: v.Name,
			question: v.Question
		};

		if (v.AttributeId1 || v.AttributeId2) r.attributes = [];
		if (v.AttributeId1 && v.AttributeName1) r.attributes?.push([v.AttributeId1, v.AttributeName1]);
		if (v.AttributeId2 && v.AttributeName2) r.attributes?.push([v.AttributeId2, v.AttributeName2]);

		return r;
	};

	const query = "select * from bwgr.\"QuestionList\";";
	return PgPool.query<QuestionDBO>(query)
		.then(result => result.rows.map(convert));
}
