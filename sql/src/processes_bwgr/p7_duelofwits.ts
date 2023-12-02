import { DuelOfWitsActions } from "../raw_data_bwgr/duelOfWits";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";
import { findIndex } from "../util/findRef";


export function processDuelOfWits(refs: References): Processed {
	const dowActionRefs: Reference[] = [];

	const datDoWActions: string[] = DuelOfWitsActions.map((v, i) => {
		dowActionRefs.push([i, v.name]);

		const stp = v.speakingThePart ? `'${escapeTick(v.speakingThePart)}'` : null;
		const sp = v.special ? `'${escapeTick(v.special)}'` : null;
		const ef = v.effects ? `'${escapeTick(v.effects)}'` : null;
		return `(${i}, '${v.name}', ${stp}, ${sp}, ${ef})`;
	});

	const datDoWActionTests: string[] = [];

	DuelOfWitsActions
		.filter(v => v.tests !== undefined)
		.map(v => {
			const tests = v.tests as (SkillPath | StatsAndAttributesList)[];
			return tests.map((t) => { return { actionName: v.name, test: t }; });
		})
		.flat()
		.map(v => {
			const ref = findIndex("DuelOfWitsActions", v.actionName, { "DuelOfWitsActions": dowActionRefs });
			const skillRef = v.test.includes("➞") ? findIndex("Skills", v.test, refs) : [null, null];
			const abilityRef = !(v.test.includes("➞")) ? findIndex("Abilities", v.test, refs) : [null, null];

			datDoWActionTests.push(`(${datDoWActionTests.length}, ${ref[0]}, ${skillRef[0]}, ${abilityRef[0]})`);
		});

	const datDoWActionResolutions: string[] =
		DuelOfWitsActions
			.map(v => {
				return Object.keys(v.resolution).map(rKey => { return { actionName: v.name, resKey: rKey, res: v.resolution[rKey] }; });
			})
			.flat()
			.map((v, i) => {
				const ref = findIndex("DuelOfWitsActions", v.actionName, { "DuelOfWitsActions": dowActionRefs });
				const oref = findIndex("DuelOfWitsActions", v.resKey, { "DuelOfWitsActions": dowActionRefs });
				const res = findIndex("ActionResolutionTypes", v.res.type, refs);

				const iag = v.res.againstSkill ? v.res.againstSkill : null;
				const obs = v.res.obstacle ? v.res.obstacle : null;

				const sref = v.res.skill ? findIndex("Skills", v.res.skill, refs) : [null, null];
				const aref = v.res.ability ? findIndex("Abilities", v.res.ability, refs) : [null, null];

				const osref = v.res.opposingSkill ? findIndex("Skills", v.res.opposingSkill, refs) : [null, null];
				const oaref = v.res.opposingAbility ? findIndex("Abilities", v.res.opposingAbility, refs) : [null, null];

				const opm = v.res.opposingModifier ? v.res.opposingModifier : null;

				return `(${i}, ${ref[0]}, ${oref[0]}, ${res[0]}, ${iag}, ${obs}, ${sref[0]}, ${aref[0]}, ${osref[0]}, ${oaref[0]}, ${opm})`;
			});

	return {
		name: "p7_duelofwits",
		references: { DuelOfWitsActions: dowActionRefs },
		data: [
			arrayToSQL("bwgr", "DuelOfWitsActions", '"Id", "Name", "SpeakingThePart", "Special", "Effect"', datDoWActions),
			arrayToSQL("bwgr", "DuelOfWitsActionTests", '"Id", "ActionId", "SkillId", "AbilityId"', datDoWActionTests),
			arrayToSQL("bwgr", "DuelOfWitsActionResolutions", '"Id", "ActionId", "OpposingActionId", "ResolutionTypeId", "IsAgainstSkill", "Obstacle", "SkillId", "AbilityId", "OpposingSkillId", "OpposingAbilityId", "OpposingModifier"', datDoWActionResolutions)
		]
	};
}


