import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetPractices(): Promise<Practice[]> {
	const convert = (v: PracticeDBO): Practice => {

		if (v.Ability !== null && v.AbilityId !== null) {
			return {
				id: v.Id,
				ability: [v.AbilityId, v.Ability],
				cycle: v.Cycle,
				routine: v.Routine,
				difficult: v.Difficult,
				challenging: v.Challenging
			};
		}
		else if (v.SkillType !== null && v.SkillTypeId !== null) {
			return {
				id: v.Id,
				skillType: [v.SkillTypeId, v.SkillType],
				cycle: v.Cycle,
				routine: v.Routine,
				difficult: v.Difficult,
				challenging: v.Challenging
			};
		}
		else throw new Error("shall not happen");
	};

	const log = new Logger("GetPractices Querying");
	const query = "select * from bwgr.\"PracticeList\";";
	return PgPool.query<PracticeDBO>(query)
		.then(result => {
			log.end();
			const log2 = new Logger("GetPractices Conversion");
			const res = result.rows.map(convert);
			log2.end();
			return res;
		});
}
