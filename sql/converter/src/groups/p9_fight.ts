import { FightActions } from "../../../../client/bwgrtools/src/data/fight";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";


export function processFight(refs: References): Processed {
	const fightActionGroupRefs: Reference[] = [];
	const fightActionRefs: Reference[] = [];

	const datFightActionGroups: string[] =
		["No Action", "Attack", "Defense", "Basic", "Special", "Shooting & Throwing", "Magic", "Social", "Hesitation"]
			.map((v, i) => {
				fightActionGroupRefs.push([i, v]);
				return `${i}, ${v}`;
			});

	const datFightActions: string[] =
		FightActions.map((v, i) => {
			fightActionRefs.push([i, v.name]);

			const groupRef = findIndex("FightActionGroups", v.group, { "FightActionGroups": fightActionGroupRefs });

			const te = v.testExtra ? `'${v.testExtra}'` : null;
			const re = v.restrictions ? `'${v.restrictions}'` : null;
			const ef = v.effect ? `'${v.effect}'` : null;
			const sp = v.special ? `'${v.special}'` : null;

			const cano = v.countsAsNoAction ? v.countsAsNoAction : false;

			return `(${i}, '${v.name}', ${groupRef[0]}, ${te}, ${re}, ${ef}, ${sp}, ${cano})`;
		});

	const datFightActionTests: string[] =
		FightActions
			.filter(v => v.tests !== undefined)
			.map(v => {
				const tests = v.tests as (SkillPath | StatsAndAttributesList)[];
				return tests.map((t) => { return { actionName: v.name, test: t }; });
			})
			.flat()
			.map(v => {
				const ref = findIndex("FightActions", v.actionName, { "FightActions": fightActionRefs });
				const skillRef = v.test.includes("➞") ? findIndex("Skills", v.test, refs) : [null, null];
				const abilityRef = !(v.test.includes("➞")) ? findIndex("Abilities", v.test, refs) : [null, null];

				return `${ref[0]}, ${skillRef[0]}, ${abilityRef[0]}`;
			});

	const datFightActionResolutions: string[] =
		FightActions
			.filter(v => v.resolution !== undefined)
			.map(v => {
				const res = v.resolution as { [key: string]: ResolutionItem; };
				return Object.keys(res).map(rKey => { return { actionName: v.name, resKey: rKey, res: res[rKey] }; });
			})
			.flat()
			.map((v, i) => {
				const ref = findIndex("FightActions", v.actionName, { "FightActions": fightActionRefs });
				const oref = findIndex("FightActions", v.resKey, { "FightActions": fightActionRefs });
				const res = findIndex("ActionResolutionTypes", v.res.type, refs);

				const iag = v.res.againstSkill ? v.res.againstSkill : null;
				const obs = v.res.obstacle ? v.res.obstacle : null;

				const sref = v.res.skill ? findIndex("Skills", v.res.skill, refs) : [null, null];
				const aref = v.res.ability ? findIndex("Abilities", v.res.ability, refs) : [null, null];

				const osref = v.res.opposingSkill ? findIndex("Skills", v.res.opposingSkill, refs) : [null, null];
				const oaref = v.res.opposingAbility ? findIndex("Abilities", v.res.opposingAbility, refs) : [null, null];

				const opm = v.res.opposingModifier ? v.res.opposingModifier : null;

				return `${i}, ${ref[0]}, ${oref[0]}, ${res[0]}, ${iag}, ${obs}, ${sref[0]}, ${aref[0]}, ${osref[0]}, ${oaref[0]}, ${opm}`;
			});

	return {
		references: { FightActionGroups: fightActionGroupRefs, FightActions: fightActionRefs },
		data: [
			arrayToSQL("dat", "FightActionGroups", '"Id", "Name"', datFightActionGroups),
			arrayToSQL("dat", "FightActions", '"Id", "Name", "GroupId", "ActionCost", "TestExtra", "Restrictions", "Effect", "Special", "CountsAsNoAction"', datFightActions),
			arrayToSQL("dat", "FightActionTests", '"ActionId", "SkillId", "AbilityId"', datFightActionTests),
			arrayToSQL("dat", "FightActionResolutions", '"Id", "ActionId", "OpposingActionId", "ResolutionTypeId", "IsAgainstSkill", "Obstacle", "SkillId", "AbilityId", "OpposingSkillId", "OpposingAbilityId", "OpposingModifier"', datFightActionResolutions)
		]
	};
}
