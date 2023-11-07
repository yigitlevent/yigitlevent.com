import { PgPool } from "../index";


export async function GetPractices(): Promise<Practice[]> {
	const convert = (v: PracticeDBO): Practice => {
		if (v.Ability !== null && v.AbilityId !== null) {
			return {
				id: v.Id as unknown as PracticeId,
				ability: [v.AbilityId as unknown as AbilityId, v.Ability],
				cycle: v.Cycle,
				routine: v.Routine,
				difficult: v.Difficult,
				challenging: v.Challenging
			};
		}
		else if (v.SkillType !== null && v.SkillTypeId !== null) {
			return {
				id: v.Id as unknown as PracticeId,
				skillType: [v.SkillTypeId as unknown as SkillTypeId, v.SkillType],
				cycle: v.Cycle,
				routine: v.Routine,
				difficult: v.Difficult,
				challenging: v.Challenging
			};
		}
		else throw new Error("shall not happen");
	};

	const query = "select * from dat.\"PracticeList\";";
	return PgPool.query<PracticeDBO>(query)
		.then(result => result.rows.map(convert));
}
