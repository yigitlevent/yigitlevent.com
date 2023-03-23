import { Resources } from "../../../../client/bwgrtools/src/data/resources/_resources";
import { arrayToSQL } from "../util/arrayToSql";
import { escapeTick } from "../util/escapeTick";
import { findIndex } from "../util/findRef";


export function processResources(refs: References): Processed {
	const datResources: string[] = [];
	const datResourceCosts: string[] = [];
	const datResourceModifiers: string[] = [];
	const datResourceMagicDetails: string[] = [];
	const datResourceMagicObstacles: string[] = [];
	const datRulesetResources: string[] = [];

	Object.keys(Resources)
		.map(stockKey => {
			const stockRef = findIndex("Stocks", stockKey, refs);

			const stockResources = Resources[stockRef[1]];
			const resources = stockResources.resources;

			return resources.map(v => ({ ...v, stockRef }));
		})
		.flat()
		.map((v, i) => {
			const resTypeRef = findIndex("ResourceTypes", v.type, refs);

			datResources.push(`(${i}, '${escapeTick(v.name)}', ${v.stockRef[0]}, ${resTypeRef[0]}, ${v.description ? `'${escapeTick(v.description)}'` : null}, ${v.cost === "various"})`);

			if (v.cost !== "various") {
				if (typeof v.cost === "number") datResourceCosts.push(`(${i}, ${v.cost}, null)`);
				else v.cost.forEach(vcost => datResourceCosts.push(`(${i}, ${vcost[1]}, '${escapeTick(vcost[0])}')`));
			}

			if (v.modifiers) {
				v.modifiers.forEach(v => {
					if (typeof v[1] === "number") datResourceModifiers.push(`(${i}, ${v[1]}, false, '${escapeTick(v[0])}')`);
					else datResourceModifiers.push(`(${i}, ${parseInt(v[1].split("/")[0])}, true, '${escapeTick(v[0])}')`);
				});
			}

			const mgc = v.magical;
			if (mgc) {
				const or = findIndex("SpellOriginFacets", mgc.origin, refs)[0];
				const orMod = mgc.originModifier ? findIndex("UnitModifiers", mgc.originModifier, refs)[0] : null;

				const du = findIndex("SpellDurationFacets", mgc.duration, refs)[0];
				const du1 = mgc.durationElapsedUnit ? findIndex("TimeUnits", mgc.durationElapsedUnit, refs)[0] : null;

				const ae = findIndex("SpellAreaOfEffectFacets", mgc.areaOfEffect, refs)[0];
				const ae1 = mgc.areaOfEffectMeasuredUnit ? findIndex("DistanceUnits", mgc.areaOfEffectMeasuredUnit, refs)[0] : null;
				const aeMod = mgc.areaOfEffectModifier ? findIndex("UnitModifiers", mgc.areaOfEffectModifier, refs)[0] : null;

				const [el1, el2, el3] = mgc.element.map(m => findIndex("SpellElementFacets", m, refs)[0]).map(v => v ? v : null);
				const [im1, im2] = mgc.impetus.map(m => findIndex("SpellImpetusFacets", m, refs)[0]).map(v => v ? v : null);

				const ac = typeof mgc.actions === "number" ? mgc.actions : parseInt(mgc.actions.slice(1));
				const acMult = typeof mgc.actions !== "number";

				datResourceMagicDetails.push(`(${datResourceMagicDetails.length}, ${i}, ${or}, ${orMod}, ${du}, ${du1}, ${ae}, ${ae1}, ${aeMod}, ${el1 ? el1 : null}, ${el2 ? el2 : null}, ${el3 ? el3 : null}, ${im1 ? im1 : null}, ${im2 ? im2 : null}, ${ac}, ${acMult})`);

				const oc = mgc.obstacleCaret !== undefined ? mgc.obstacleCaret : false;

				const [os1, os2] =
					(typeof mgc.obstacleStat === "string")
						? [findIndex("Abilities", mgc.obstacleStat, refs)[0], null]
						: (mgc.obstacleStat !== undefined)
							? [
								findIndex("Abilities", mgc.obstacleStat[0], refs)[0],
								findIndex("Abilities", mgc.obstacleStat[1], refs)[0]
							]
							: [null, null];

				if (typeof mgc.obstacle === "number") {
					datResourceMagicObstacles.push(`(${datResourceMagicObstacles.length}, ${i}, ${mgc.obstacle}, ${os1}, ${os2}, ${oc}, null)`);
				}
				else if (mgc.obstacle !== undefined) {
					mgc.obstacle.forEach(v => {
						datResourceMagicObstacles.push(`(${datResourceMagicObstacles.length}, ${i}, ${v[1]}, ${os1}, ${os2}, ${oc}, '${escapeTick(v[0])}')`);
					});
				}
				else {
					datResourceMagicObstacles.push(`(${datResourceMagicObstacles.length}, ${i}, null, ${os1}, ${os2}, ${oc}, null)`);
				}
			}

			v.allowed.forEach(r => datRulesetResources.push(`(${i}, '${r}')`));
		});


	return {
		name: "p11_resources",
		references: {},
		data: [
			arrayToSQL("dat", "Resources", '"Id", "Name", "StockId", "ResourceTypeId", "Description", "VariableCost"', datResources),
			arrayToSQL("dat", "ResourceCosts", '"ResourceId", "Cost", "Description"', datResourceCosts),
			arrayToSQL("dat", "ResourceModifiers", '"ResourceId", "Cost", "IsPerCost", "Description"', datResourceModifiers),
			arrayToSQL("dat", "ResourceMagicDetails", '"Id", "ResourceId", "OriginId", "OriginModifierId", "DurationId", "DurationUnitId", "AreaOfEffectId", "AreaOfEffectUnitId", "AreaOfEffectModifierId", "Element1Id", "Element2Id", "Element3Id", "Impetus1Id", "Impetus2Id", "Actions", "ActionsMultiply"', datResourceMagicDetails),
			arrayToSQL("dat", "ResourceMagicObstacles", '"ResourceId", "Obstacle", "ObstacleAbility1Id", "ObstacleAbility2Id", "ObstacleCaret", "Description"', datResourceMagicObstacles),
			arrayToSQL("dat", "RulesetResources", '"ResourceId", "RulesetId"', datRulesetResources)
		]
	};
}



