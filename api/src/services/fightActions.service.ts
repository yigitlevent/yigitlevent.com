import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetFightActions(): Promise<BwgrFightAction[]> {
	const convert = (a: BwgrFightActionDBO[], at: BwgrActionTestDBO[], ar: BwgrFightActionResolutionDBO[]): BwgrFightAction[] => {
		const log = new Logger("GetFightActions Conversion");

		const r: BwgrFightAction[] = a.map(v => {
			const act: BwgrFightAction = {
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
					const actionRes: BwgrActionResolution<BwgrFightActionId> = {
						opposingAction: [res.OpposingActionId, res.OpposingAction],
						type: [res.ResolutionTypeId, res.ResolutionType]
					};

					if (res.IsAgainstSkill) actionRes.isAgainstSkill = res.IsAgainstSkill;
					if (res.Obstacle) actionRes.obstacle = res.Obstacle;
					if (res.OpposingModifier) actionRes.opposingModifier = res.OpposingModifier;

					if (res.SkillId !== null) actionRes.skill = [res.SkillId, res.Skill];
					if (res.AbilityId !== null) actionRes.ability = [res.AbilityId, res.Ability];
					if (res.OpposingSkillId !== null && res.OpposingSkill) actionRes.opposingSkill = [res.OpposingSkillId, res.OpposingSkill];
					if (res.OpposingAbilityId !== null && res.OpposingAbility) actionRes.opposingAbility = [res.OpposingAbilityId, res.OpposingAbility];

					act.resolutions?.push(actionRes);
				});
			}

			return act;
		});

		log.end();
		return r;
	};

	const log = new Logger("GetFightActions Querying");
	const query1 = "select * from bwgr.\"FightActionsList\";";
	const query2 = "select * from bwgr.\"FightActionTestList\";";
	const query3 = "select * from bwgr.\"FightActionResolutionList\";";
	return Promise.all([
		PgPool.query<BwgrFightActionDBO>(query1),
		PgPool.query<BwgrActionTestDBO>(query2),
		PgPool.query<BwgrFightActionResolutionDBO>(query3)
	]).then(result => {
		log.end();
		const res = convert(result[0].rows, result[1].rows, result[2].rows);
		return res;
	});
}
