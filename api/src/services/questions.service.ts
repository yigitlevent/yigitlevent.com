import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetQuestions(): Promise<BwgrQuestion[]> {
	const convert = (v: BwgrQuestionDBO): BwgrQuestion => {

		const r: BwgrQuestion = {
			id: v.Id,
			name: v.Name,
			question: v.Question
		};

		if (v.AttributeId1 || v.AttributeId2) r.attributes = [];
		if (v.AttributeId1 && v.AttributeName1) r.attributes?.push([v.AttributeId1, v.AttributeName1]);
		if (v.AttributeId2 && v.AttributeName2) r.attributes?.push([v.AttributeId2, v.AttributeName2]);

		return r;
	};

	const log = new Logger("GetQuestions Querying");
	const query = "select * from bwgr.\"QuestionList\";";
	return PgPool.query<BwgrQuestionDBO>(query)
		.then(result => {
			log.end();
			const log2 = new Logger("GetQuestions Conversion");
			const res = result.rows.map(convert);
			log2.end();
			return res;
		});
}
