import { PgPool } from "../index";


export async function GetAbilities(): Promise<Ability[]> {
	const convert = (v: AbilityDBO): Ability => {
		const r: Ability = {
			id: v.Id as unknown as AbilityId,
			name: v.Name,
			abilityType: [v.AbilityTypeId as unknown as AbilityTypeId, v.AbilityType],
			hasShades: v.HasShades
		};

		if (v.RequiredTraitId !== null && v.RequiredTrait) {
			r.requiredTrait = [v.RequiredTraitId as unknown as TraitId, v.RequiredTrait];
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

	const query = "select * from dat.\"AbilitiesList\";";
	return PgPool.query<AbilityDBO>(query)
		.then(result => result.rows.map(convert));
}
