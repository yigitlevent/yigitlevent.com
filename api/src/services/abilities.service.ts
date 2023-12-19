import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetAbilities(): Promise<Ability[]> {
	const convert = (v: AbilityDBO): Ability => {
		const r: Ability = {
			id: v.Id,
			name: v.Name,
			abilityType: [v.AbilityTypeId, v.AbilityType],
			hasShades: v.HasShades
		};

		if (v.RequiredTraitId !== null && v.RequiredTrait) {
			r.requiredTrait = [v.RequiredTraitId, v.RequiredTrait];
		}

		if (v.Cycle !== null && v.Routine !== null && v.Difficult !== null && v.Challenging !== null) {
			r.practice = {
				cycle: v.Cycle,
				routineTests: v.Routine,
				difficultTests: v.Difficult,
				challengingTests: v.Challenging
			};
		}

		return r;
	};

	const log = new Logger("GetAbilities Querying");
	const query = "select * from bwgr.\"AbilitiesList\";";
	return PgPool.query<AbilityDBO>(query).then(result => {
		log.end();
		const log2 = new Logger("GetAbilities Conversion");
		const res = result.rows.map(convert);
		log2.end();
		return res;
	});
}
