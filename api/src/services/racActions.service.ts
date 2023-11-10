import { PgPool } from "../index";


export async function GetRaCActions(): Promise<RaCAction[]> {
	const convert = (a: RaCActionDBO[], ar: RaCActionResolutionDBO[]): RaCAction[] => {
		const r: RaCAction[] = a.map(v => {
			const act: RaCAction = {
				id: v.Id,
				name: v.Name,
				group: [v.GroupId, v.Group],
				flags: {},
				effect: v.Effect
			};

			if (v.Effect) act.effect = v.Effect;
			if (v.SpecialRestriction) act.specialRestriction = v.SpecialRestriction;
			if (v.SpecialAction) act.specialAction = v.SpecialAction;
			if (v.However) act.however = v.However;

			if (v.UseForks) act.flags.useFoRKs = v.UseForks;
			if (v.UseWeaponRangeAdvantage) act.flags.useWeaponRangeAdvantage = v.UseWeaponRangeAdvantage;
			if (v.UsePositionAdvantage) act.flags.usePositionAdvantage = v.UsePositionAdvantage;
			if (v.UseStrideAdvantage) act.flags.useStrideAdvantage = v.UseStrideAdvantage;
			if (v.IsOpenEnded) act.flags.isOpenEnded = v.IsOpenEnded;

			const r = ar.filter(t => t.ActionId === v.Id);
			if (r.length > 0) {
				act.resolutions = [];

				r.forEach(res => {
					const actionRes: ActionResolution<RaCActionId> = {
						opposingAction: [res.OpposingActionId, res.OpposingAction],
						type: [res.ResolutionTypeId, res.ResolutionType]
					};

					if (res.IsAgainstSkill) actionRes.isAgainstSkill = res.IsAgainstSkill;
					if (res.Obstacle) actionRes.obstacle = res.Obstacle;
					if (res.OpposingModifier) actionRes.opposingModifier = res.OpposingModifier;

					if (res.SkillId !== null && res.Skill !== null) actionRes.skill = [res.SkillId, res.Skill];
					if (res.AbilityId !== null && res.Ability !== null) actionRes.ability = [res.AbilityId, res.Ability];
					if (res.OpposingSkillId !== null && res.OpposingSkill) actionRes.opposingSkill = [res.OpposingSkillId, res.OpposingSkill];
					if (res.OpposingAbilityId !== null && res.OpposingAbility) actionRes.opposingAbility = [res.OpposingAbilityId, res.OpposingAbility];

					act.resolutions?.push(actionRes);
				});
			}

			return act;
		});

		return r;
	};

	const query1 = "select * from dat.\"RangeAndCoverActionsList\";";
	const query2 = "select * from dat.\"RangeAndCoverActionResolutionList\";";
	return Promise.all([
		PgPool.query<RaCActionDBO>(query1),
		PgPool.query<RaCActionResolutionDBO>(query2)
	]).then(result => convert(result[0].rows, result[1].rows));
}
