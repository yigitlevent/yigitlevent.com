import { PgPool } from "../index";


export async function GetSkills() {
	const convert = (v: SkillDBO): Skill => {
		const r: Skill = {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as SkillId,
			name: v.Name,
			category: [v.CategoryId as unknown as SkillCategoryId, v.Category],
			type: [v.TypeId as unknown as SkillTypeId, v.Type],
			flags: {
				dontList: v.DontList,
				isMagical: v.IsMagical,
				isTraining: v.IsTraining
			},
			tool: {
				typeId: v.ToolTypeId as unknown as SkillToolTypeId,
				tool: v.Tool
			}
		};

		if (v.StockId !== null && v.Stock !== null) r.stock = [v.StockId as unknown as StockId, v.Stock];
		if (v.RootIds.length > 0) r.roots = v.RootIds.map((rootId, index) => [rootId as unknown as SkillRootId, v.Roots[index]]);
		if (v.ToolDescription !== null) r.tool.description = v.ToolDescription;
		if (v.Description !== null) r.description = v.Description;
		if (v.SubskillIds.length > 0) r.subskillIds = v.SubskillIds as unknown[] as SkillId[];
		if (v.RestrictionOnlyStockId !== null && v.RestrictionOnlyStock !== null) {
			r.restriction = { onlyStock: [v.RestrictionOnlyStockId, v.RestrictionOnlyStock] };
			if (v.RestrictionWhenBurning !== null) r.restriction.onlyAtBurn = v.RestrictionWhenBurning;
			if (v.RestrictionAbilityId !== null && v.RestrictionAbility !== null) r.restriction.onlyWithAbility = [v.RestrictionAbilityId, v.RestrictionAbility];
		}

		return r;
	};

	const query = 'select * from dat."SkillsList";';
	return PgPool.query<SkillDBO>(query)
		.then(result => result.rows.map(convert));
}
