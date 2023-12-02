import { PgPool } from "../index";


export async function GetSkills(rulesets: RulesetId[]): Promise<Skill[]> {
	const convert = (v: SkillDBO): Skill => {
		const r: Skill = {
			rulesets: v.Rulesets,
			id: v.Id,
			name: v.Name,
			category: [v.CategoryId, v.Category],
			type: [v.TypeId, v.Type],
			flags: {
				dontList: v.DontList,
				isMagical: v.IsMagical,
				isTraining: v.IsTraining
			},
			tool: {
				typeId: v.ToolTypeId,
				tool: v.Tool
			}
		};

		if (v.StockId !== null && v.Stock !== null) r.stock = [v.StockId, v.Stock];
		if (v.RootIds.length > 0) r.roots = v.RootIds.map((rootId, index) => [rootId, v.Roots[index]]);
		if (v.ToolDescription !== null) r.tool.description = v.ToolDescription;
		if (v.Description !== null) r.description = v.Description;
		if (v.SubskillIds.length > 0) r.subskillIds = v.SubskillIds;
		if (v.RestrictionOnlyStockId !== null && v.RestrictionOnlyStock !== null) {
			r.restriction = { onlyStock: [v.RestrictionOnlyStockId, v.RestrictionOnlyStock] };
			if (v.RestrictionWhenBurning !== null) r.restriction.onlyAtBurn = v.RestrictionWhenBurning;
			if (v.RestrictionAbilityId !== null && v.RestrictionAbility !== null) r.restriction.onlyWithAbility = [v.RestrictionAbilityId, v.RestrictionAbility];
		}

		return r;
	};

	const query = `select * from bwgr."SkillsList" where "Rulesets"::text[] && ARRAY['${rulesets.join("','")}'];`;
	return PgPool.query<SkillDBO>(query)
		.then(result => result.rows.map(convert));
}
