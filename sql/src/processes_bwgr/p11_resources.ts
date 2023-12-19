import { Resources } from "../raw_data_bwgr/resources/_resources";
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
				if (typeof v.cost === "number") datResourceCosts.push(`(${datResourceCosts.length}, ${i}, ${v.cost}, null)`);
				else v.cost.forEach(vcost => datResourceCosts.push(`(${datResourceCosts.length}, ${i}, ${vcost[1]}, '${escapeTick(vcost[0])}')`));
			}

			if (v.modifiers) {
				v.modifiers.forEach(v => {
					if (typeof v[1] === "number") datResourceModifiers.push(`(${datResourceModifiers.length}, ${i}, ${v[1]}, false, '${escapeTick(v[0])}')`);
					else datResourceModifiers.push(`(${datResourceModifiers.length}, ${i}, ${parseInt(v[1].split("/")[0])}, true, '${escapeTick(v[0])}')`);
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

				const elements: (number | null)[] = [
					findIndex("SpellElementFacets", mgc.element[0], refs)[0],
					(mgc.element[1]) ? findIndex("SpellElementFacets", mgc.element[1], refs)[0] : null,
					null
				];

				const impetus: (number | null)[] = [
					findIndex("SpellImpetusFacets", mgc.impetus[0], refs)[0],
					(mgc.impetus[1]) ? findIndex("SpellImpetusFacets", mgc.impetus[1], refs)[0] : null,
					null
				];

				const ac = typeof mgc.actions === "number" ? mgc.actions : parseInt(mgc.actions.slice(1));
				const acMult = typeof mgc.actions !== "number";

				datResourceMagicDetails.push(`(${datResourceMagicDetails.length}, ${i}, ${or}, ${orMod}, ${du}, ${du1}, ${ae}, ${ae1}, ${aeMod}, ${elements[0]}, ${elements[1]}, ${elements[2]}, ${impetus[0]}, ${impetus[1]}, ${ac}, ${acMult})`);

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
			arrayToSQL("bwgr", "Resources", '"Id", "Name", "StockId", "ResourceTypeId", "Description", "VariableCost"', datResources),
			arrayToSQL("bwgr", "ResourceCosts", '"Id", "ResourceId", "Cost", "Description"', datResourceCosts),
			arrayToSQL("bwgr", "ResourceModifiers", '"Id", "ResourceId", "Cost", "IsPerCost", "Description"', datResourceModifiers),
			arrayToSQL("bwgr", "ResourceMagicDetails", '"Id", "ResourceId", "OriginId", "OriginModifierId", "DurationId", "DurationUnitId", "AreaOfEffectId", "AreaOfEffectUnitId", "AreaOfEffectModifierId", "Element1Id", "Element2Id", "Element3Id", "Impetus1Id", "Impetus2Id", "Actions", "ActionsMultiply"', datResourceMagicDetails),
			arrayToSQL("bwgr", "ResourceMagicObstacles", '"Id", "ResourceId", "Obstacle", "ObstacleAbility1Id", "ObstacleAbility2Id", "ObstacleCaret", "Description"', datResourceMagicObstacles),
			arrayToSQL("bwgr", "RulesetResources", '"ResourceId", "RulesetId"', datRulesetResources)
		]
	};
}



