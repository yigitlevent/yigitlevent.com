import { PgPool } from "../index";


export async function GetResources(): Promise<Resource[]> {
	const convert = (re: ResourceDBO[], rmd: ResourceMagicDetailsDBO[], rmo: ResourceMagicObstaclesDBO[]): Resource[] => {
		const r: Resource[] = re.map(v => {
			const res: Resource = {
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
				const mdet: ResourceMagicDetails = {
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

				if (mDetails.Element1Id !== null && mDetails.Element1) mdet.elements.push([mDetails.Element1Id, mDetails.Element1]);
				if (mDetails.Element2Id !== null && mDetails.Element2) mdet.elements.push([mDetails.Element2Id, mDetails.Element2]);
				if (mDetails.Element3Id !== null && mDetails.Element3) mdet.elements.push([mDetails.Element3Id, mDetails.Element3]);
				if (mDetails.Impetus1Id !== null && mDetails.Impetus1) mdet.impetus.push([mDetails.Impetus1Id, mDetails.Impetus1]);
				if (mDetails.Impetus2Id !== null && mDetails.Impetus2) mdet.impetus.push([mDetails.Impetus2Id, mDetails.Impetus2]);

				const mObs = rmo.filter(a => a.ResourceId === v.Id);
				if (mObs.length > 0) {
					mdet.obstacleDetails = mObs.map(mo => {
						const obsDet: ResourceMagicObstacleDetails = {};
						if (mo.Obstacle) obsDet.obstacle = mo.Obstacle;
						else if (mo.ObstacleAbility1Id !== null || mo.ObstacleAbility1 !== null || mo.ObstacleAbility2Id !== null || mo.ObstacleAbility2 !== null) {
							obsDet.abilities = [];
							if (obsDet.abilities && mo.ObstacleAbility1Id !== null && mo.ObstacleAbility1 !== null) {
								obsDet.abilities.push([mo.ObstacleAbility1Id, mo.ObstacleAbility1]);
							}
							if (obsDet.abilities && mo.ObstacleAbility2Id !== null && mo.ObstacleAbility2 !== null) {
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
		return r;
	};

	const query1 = "select * from bwgr.\"ResourcesList\";";
	const query2 = "select * from bwgr.\"ResourceMagicDetailsList\";";
	const query3 = "select * from bwgr.\"ResourceMagicObstaclesList\";";
	return Promise.all([
		PgPool.query<ResourceDBO>(query1),
		PgPool.query<ResourceMagicDetailsDBO>(query2),
		PgPool.query<ResourceMagicObstaclesDBO>(query3)
	]).then(result => convert(result[0].rows, result[1].rows, result[2].rows));
}
