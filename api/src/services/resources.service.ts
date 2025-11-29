import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetResources(rulesets: BwgrRulesetId[]): Promise<BwgrResource[]> {
	const convert = (re: BwgrResourceDBO[], rmd: BwgrResourceMagicDetailsDBO[], rmo: BwgrResourceMagicObstaclesDBO[]): BwgrResource[] => {
		const log = new Logger("GetResources Conversion");

		const r: BwgrResource[] = re.map(v => {
			const res: BwgrResource = {
				rulesets: v.Rulesets,
				id: v.Id,
				name: v.Name,
				stock: [v.StockId, v.Stock],
				type: [v.ResourceTypeId, v.ResourceType],
				costs: [],
				modifiers: []
			};

			if (v.VariableCost) res.variableCost = true;
			if (v.Description) res.description = v.Description;
			v.Costs.forEach((c, i) => res.costs.push([c, v.CostDescriptions[i]]));
			v.Modifiers.forEach((c, i) => res.modifiers.push([c, v.ModifierIsPerCosts[i], v.ModifierDescriptions[i]]));

			const mDetails = rmd.find(a => a.ResourceId === v.Id);
			if (mDetails) {
				const mdet: BwgrResourceMagicDetails = {
					origin: [mDetails.OriginId, mDetails.Origin],
					duration: [mDetails.DurationId, mDetails.Duration],
					areaOfEffect: [mDetails.AreaOfEffectId, mDetails.AreaOfEffect],
					elements: [],
					impetus: [],
					actions: mDetails.Actions,
					doActionsMultiply: mDetails.ActionsMultiply
				};

				if (mDetails.AreaOfEffectModifierId !== null || mDetails.AreaofEffectModifier || mDetails.AreaOfEffectUnitId !== null || mDetails.AreaOfEffectUnit) mdet.areaOfEffectDetails = {};
				if (mdet.areaOfEffectDetails && mDetails.AreaOfEffectUnitId !== null && mDetails.AreaOfEffectUnit) {
					mdet.areaOfEffectDetails.unit = [mDetails.AreaOfEffectUnitId, mDetails.AreaOfEffectUnit];
				}
				if (mdet.areaOfEffectDetails && mDetails.AreaOfEffectModifierId !== null && mDetails.AreaofEffectModifier) {
					mdet.areaOfEffectDetails.modifier = [mDetails.AreaOfEffectModifierId, mDetails.AreaofEffectModifier];
				}

				if (mDetails.Element1) mdet.elements.push([mDetails.Element1Id, mDetails.Element1]);
				if (mDetails.Element2Id !== null && mDetails.Element2) mdet.elements.push([mDetails.Element2Id, mDetails.Element2]);
				if (mDetails.Element3Id !== null && mDetails.Element3) mdet.elements.push([mDetails.Element3Id, mDetails.Element3]);
				if (mDetails.Impetus1) mdet.impetus.push([mDetails.Impetus1Id, mDetails.Impetus1]);
				if (mDetails.Impetus2Id !== null && mDetails.Impetus2) mdet.impetus.push([mDetails.Impetus2Id, mDetails.Impetus2]);

				const mObs = rmo.filter(a => a.ResourceId === v.Id);
				if (mObs.length > 0) {
					mdet.obstacleDetails = mObs.map(mo => {
						const obsDet: BwgrResourceMagicObstacleDetails = {};
						if (mo.Obstacle) obsDet.obstacle = mo.Obstacle;
						else if (mo.ObstacleAbility1Id !== null || mo.ObstacleAbility1 !== null || mo.ObstacleAbility2Id !== null || mo.ObstacleAbility2 !== null) {
							obsDet.abilities = [];
							if (obsDet.abilities.length > 0 && mo.ObstacleAbility1Id !== null && mo.ObstacleAbility1 !== null) {
								obsDet.abilities.push([mo.ObstacleAbility1Id, mo.ObstacleAbility1]);
							}
							if (obsDet.abilities.length > 0 && mo.ObstacleAbility2Id !== null && mo.ObstacleAbility2 !== null) {
								obsDet.abilities.push([mo.ObstacleAbility2Id, mo.ObstacleAbility2]);
							}
						}

						if (mo.ObstacleCaret) obsDet.caret = mo.ObstacleCaret;
						if (mo.Description !== null) obsDet.description = mo.Description;
						return obsDet;
					});
				}

				res.magical = mdet;
			}
			return res;
		});

		log.end();
		return r;
	};

	const log = new Logger("GetResources Querying");
	const query1 = `select * from bwgr."ResourcesList" where "Rulesets"::text[] && ARRAY['${rulesets.join("','")}'];`;
	const query2 = "select * from bwgr.\"ResourceMagicDetailsList\";";
	const query3 = "select * from bwgr.\"ResourceMagicObstaclesList\";";
	return Promise.all([
		PgPool.query<BwgrResourceDBO>(query1),
		PgPool.query<BwgrResourceMagicDetailsDBO>(query2),
		PgPool.query<BwgrResourceMagicObstaclesDBO>(query3)
	]).then(result => {
		log.end();
		const res = convert(result[0].rows, result[1].rows, result[2].rows);
		return res;
	});
}
