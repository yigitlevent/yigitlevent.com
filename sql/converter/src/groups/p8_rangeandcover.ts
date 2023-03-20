import { RangeAndCoverActions } from "../../../../client/bwgrtools/src/data/rangeAndCover";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";


export function processRangeAndCover(refs: References): Processed {
	const racActionGroupRefs: Reference[] = [];
	const racActionRefs: Reference[] = [];

	const datRaCActionGroups: string[] =
		["Closing", "Maintaining", "Withdrawal"].map((v, i) => {
			racActionGroupRefs.push([i, v]);
			return `${i}, ${v}`;
		});

	const datRaCActions: string[] =
		RangeAndCoverActions.map((v, i) => {
			racActionRefs.push([i, v.name]);

			const groupRef = findIndex("RangeAndCoverActionGroups", v.group, { "RangeAndCoverActionGroups": racActionGroupRefs });

			const m = v.advantages.modifier;
			const f = v.advantages.forks;
			const wr = v.advantages.weaponRange;
			const p = v.advantages.position;
			const s = v.advantages.stride;
			const o = v.advantages.openEnded;

			const eff = v.effect ? `'${v.effect}'` : null;
			const spr = v.specialRestriction ? `'${v.specialRestriction}'` : null;
			const spa = v.specialAction ? `'${v.specialAction}'` : null;
			const hw = v.however ? `'${v.however}'` : null;

			return `(${i}, '${v.name}', ${groupRef[0]}, ${m}, ${f}, ${wr}, ${p}, ${s}, ${o}, ${eff}, ${spr}, ${spa}, ${hw})`;
		});

	const datRaCActionResolutions: string[] =
		RangeAndCoverActions
			.map(v => {
				return Object.keys(v.resolution).map(rKey => { return { actionName: v.name, resKey: rKey, res: v.resolution[rKey] }; });
			})
			.flat()
			.map((v, i) => {
				const ref = findIndex("RangeAndCoverActions", v.actionName, { "RangeAndCoverActions": racActionRefs });
				const oref = findIndex("RangeAndCoverActions", v.resKey, { "RangeAndCoverActions": racActionRefs });
				const res = findIndex("ActionResolutionTypes", v.res.type, refs);

				const iag = v.res.againstSkill ? v.res.againstSkill : null;
				const obs = v.res.obstacle ? v.res.obstacle : null;

				const sref = v.res.skill ? findIndex("Skills", v.res.type, refs) : [null, null];
				const aref = v.res.ability ? findIndex("Abilities", v.res.type, refs) : [null, null];

				const osref = v.res.opposingSkill ? findIndex("Skills", v.res.type, refs) : [null, null];
				const oaref = v.res.opposingAbility ? findIndex("Abilities", v.res.type, refs) : [null, null];

				const opm = v.res.opposingModifier ? v.res.opposingModifier : null;

				return `${i}, ${ref[0]}, ${oref[0]}, ${res[0]}, ${iag}, ${obs}, ${sref[0]}, ${aref[0]}, ${osref[0]}, ${oaref[0]}, ${opm}`;
			});

	return {
		references: { RangeAndCoverActionGroups: racActionGroupRefs, RangeAndCoverActions: racActionRefs },
		data: [
			arrayToSQL("dat", "RangeAndCoverActionGroups", '"Id", "Name"', datRaCActionGroups),
			arrayToSQL("dat", "RangeAndCoverActions", '"Id", "Name", "GroupId", "Modifier", "UseFoRKs", "UseWeaponRangeAdvantage", "UsePositionAdvantage", "UseStrideAdvantage", "IsOpenEnded", "Effect", "SpecialRestriction", "SpecialAction", "However"', datRaCActions),
			arrayToSQL("dat", "RangeAndCoverActionResolutions", '"Id", "ActionId", "OpposingActionId", "ResolutionTypeId", "IsAgainstSkill", "Obstacle", "SkillId", "AbilityId", "OpposingSkillId", "OpposingAbilityId", "OpposingModifier"', datRaCActionResolutions)
		]
	};
}



