import { PgPool } from "../index";


export async function GetFightActions(): Promise<FightAction[]> {
	const convert = (a: FightActionDBO[], at: ActionTestDBO[], ar: FightActionResolutionDBO[]): FightAction[] => {
		const r: FightAction[] = a.map(v => {
			const act: FightAction = {
				id: v.Id,
				name: v.Name,
				group: [v.GroupId, v.Group],
				flags: {}
			};

			if (v.Effect) act.effect = v.Effect;
			if (v.Restrictions) act.restrictions = v.Restrictions;
			if (v.Special) act.special = v.Special;
			if (v.TestExtra) act.testExtra = v.TestExtra;
			if (v.ActionCost) act.actionCost = v.ActionCost;
			if (v.CountsAsNoAction) act.flags.countsAsNoAction = v.CountsAsNoAction;

			const t = at.filter(t => t.ActionId === v.Id);
			if (t.length > 0) {
				act.tests = {
					skills: [],
					abilities: []
				};

				t.forEach(test => {
					if (test.Ability && test.AbilityId !== null) act.tests?.abilities.push([test.AbilityId, test.Ability]);
					if (test.Skill && test.SkillId !== null) act.tests?.skills.push([test.SkillId, test.Skill]);
				});
			}

			const r = ar.filter(t => t.ActionId === v.Id);
			if (r.length > 0) {
				act.resolutions = [];

				r.forEach(res => {
					const actionRes: ActionResolution<FightActionId> = {
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

	const query1 = "select * from dat.\"FightActionsList\";";
	const query2 = "select * from dat.\"FightActionTestList\";";
	const query3 = "select * from dat.\"FightActionResolutionList\";";
	return Promise.all([
		PgPool.query<FightActionDBO>(query1),
		PgPool.query<ActionTestDBO>(query2),
		PgPool.query<FightActionResolutionDBO>(query3)
	]).then(result => convert(result[0].rows, result[1].rows, result[2].rows));
}
