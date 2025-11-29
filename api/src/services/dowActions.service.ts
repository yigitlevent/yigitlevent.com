import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetDoWActions(): Promise<BwgrDoWAction[]> {
	const convert = (a: BwgrDoWActionDBO[], at: BwgrActionTestDBO[], ar: BwgrDoWActionResolutionDBO[]): BwgrDoWAction[] => {
		const log = new Logger("GetDoWActions Conversion");

		const r: BwgrDoWAction[] = a.map(v => {
			const act: BwgrDoWAction = {
				id: v.Id,
				name: v.Name
			};

			if (v.Effect) act.effect = v.Effect;
			if (v.SpeakingThePart) act.speakingThePart = v.SpeakingThePart;
			if (v.Special) act.special = v.Special;

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
					const actionRes: BwgrActionResolution<BwgrDoWActionId> = {
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

	const log = new Logger("GetDoWActions Querying");
	const query1 = "select * from bwgr.\"DuelOfWitsActions\";";
	const query2 = "select * from bwgr.\"DoWActionTestList\";";
	const query3 = "select * from bwgr.\"DoWActionResolutionList\";";
	return Promise.all([
		PgPool.query<BwgrDoWActionDBO>(query1),
		PgPool.query<BwgrActionTestDBO>(query2),
		PgPool.query<BwgrDoWActionResolutionDBO>(query3)
	]).then(result => {
		log.end();
		const res = convert(result[0].rows, result[1].rows, result[2].rows);
		return res;
	});
}
