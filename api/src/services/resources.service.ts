import { PgPool } from "../index";


export async function GetResources(): Promise<Resource[]> {
	const convert = (re: ResourceDBO[], rmd: ResourceMagicDetailsDBO[], rmo: ResourceMagicObstaclesDBO[]): Resource[] => {
		const r: Resource[] = re.map(v => {
			const res: Resource = {
				rulesets: v.Rulesets as unknown[] as RulesetId[],
				id: v.Id as unknown as ResourceId,
				name: v.Name,
				stock: [v.StockId as unknown as StockId, v.Stock],
				type: [v.ResourceTypeId as unknown as ResourceTypeId, v.ResourceType],
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
					origin: [mDetails.OriginId as unknown as OriginFacetId, mDetails.Origin],
					duration: [mDetails.DurationId as unknown as DurationFacetId, mDetails.Duration],
					areaOfEffect: [mDetails.AreaOfEffectId as unknown as AreaOfEffectFacetId, mDetails.AreaOfEffect],
					elements: [],
					impetus: [],
					actions: mDetails.Actions,
					doActionsMultiply: mDetails.ActionsMultiply
				};

				if (mDetails.AreaOfEffectModifierId !== null || mDetails.AreaofEffectModifier || mDetails.AreaOfEffectUnitId !== null || mDetails.AreaOfEffectUnit) mdet.areaOfEffectDetails = {};
				if (mdet.areaOfEffectDetails && mDetails.AreaOfEffectUnitId !== null && mDetails.AreaOfEffectUnit) {
					mdet.areaOfEffectDetails.unit = [mDetails.AreaOfEffectUnitId as unknown as DistanceUnitId, mDetails.AreaOfEffectUnit];
				}
				if (mdet.areaOfEffectDetails && mDetails.AreaOfEffectModifierId !== null && mDetails.AreaofEffectModifier) {
					mdet.areaOfEffectDetails.modifier = [mDetails.AreaOfEffectModifierId as unknown as UnitModifierId, mDetails.AreaofEffectModifier];
				}

				if (mDetails.Element1Id !== null && mDetails.Element1) mdet.elements.push([mDetails.Element1Id as unknown as ElementFacetId, mDetails.Element1]);
				if (mDetails.Element2Id !== null && mDetails.Element2) mdet.elements.push([mDetails.Element2Id as unknown as ElementFacetId, mDetails.Element2]);
				if (mDetails.Element3Id !== null && mDetails.Element3) mdet.elements.push([mDetails.Element3Id as unknown as ElementFacetId, mDetails.Element3]);
				if (mDetails.Impetus1Id !== null && mDetails.Impetus1) mdet.impetus.push([mDetails.Impetus1Id as unknown as ImpetusFacetId, mDetails.Impetus1]);
				if (mDetails.Impetus2Id !== null && mDetails.Impetus2) mdet.impetus.push([mDetails.Impetus2Id as unknown as ImpetusFacetId, mDetails.Impetus2]);

				const mObs = rmo.filter(a => a.ResourceId === v.Id);
				if (mObs.length > 0) {
					mdet.obstacleDetails = mObs.map(mo => {
						const obsDet: ResourceMagicObstacleDetails = {};
						if (mo.Obstacle) obsDet.obstacle = mo.Obstacle;
						else if (mo.ObstacleAbility1Id !== null || mo.ObstacleAbility1 !== null || mo.ObstacleAbility2Id !== null || mo.ObstacleAbility2 !== null) {
							obsDet.abilities = [];
							if (obsDet.abilities && mo.ObstacleAbility1Id !== null && mo.ObstacleAbility1 !== null) {
								obsDet.abilities.push([mo.ObstacleAbility1Id as unknown as AbilityId, mo.ObstacleAbility1]);
							}
							if (obsDet.abilities && mo.ObstacleAbility2Id !== null && mo.ObstacleAbility2 !== null) {
								obsDet.abilities.push([mo.ObstacleAbility2Id as unknown as AbilityId, mo.ObstacleAbility2]);
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

	const query1 = "select * from dat.\"ResourcesList\";";
	const query2 = "select * from dat.\"ResourceMagicDetailsList\";";
	const query3 = "select * from dat.\"ResourceMagicObstaclesList\";";
	return Promise.all([
		PgPool.query<ResourceDBO>(query1),
		PgPool.query<ResourceMagicDetailsDBO>(query2),
		PgPool.query<ResourceMagicObstaclesDBO>(query3)
	]).then(result => convert(result[0].rows, result[1].rows, result[2].rows));
}
