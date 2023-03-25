import { PgPool } from "../index";


export async function GetRulesets() {
	const convert = (v: RulesetDBO): Ruleset => {
		const r: Ruleset = {
			id: v.Id as unknown as RulesetId,
			name: v.Name,
			isOfficial: v.IsOfficial,
			isPublic: v.IsPublic,
			isExpansion: v.IsExpansion
		};

		if (v.ExpansionIds.length > 0) r.expansionIds = v.ExpansionIds as unknown[] as RulesetId[];
		if (v.User !== null) r.user = v.User;

		return r;
	};

	const query = 'select * from dat."RulesetsList";';
	return PgPool.query<RulesetDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetAbilities() {
	const convert = (v: AbilityDBO): Ability => {
		const r: Ability = {
			id: v.Id as unknown as AbilityId,
			name: v.Name,
			abilityType: [v.AbilityTypeId as unknown as AbilityTypeId, v.AbilityType],
			hasShades: v.HasShades
		};

		if (v.Cycle !== null && v.Routine !== null && v.Difficult !== null && v.Challenging !== null) {
			r.practice = {
				cycle: v.Cycle,
				routineTests: v.Routine,
				difficultTests: v.Difficult,
				challengingTests: v.Challenging
			};
		}

		return r;
	};

	const query = 'select * from dat."AbilitiesList";';
	return PgPool.query<AbilityDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetStocks() {
	const convert = (v: StockDBO): Stock => {
		return {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as StockId,
			name: v.Name,
			namePlural: v.NamePlural,
			stride: v.Stride,
			settingIds: v.SettingIds as unknown[] as SettingId[]
		};
	};

	const query = 'select * from dat."StocksList";';
	return PgPool.query<StockDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetSettings() {
	const convert = (v: SettingDBO): Setting => {
		return {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as SettingId,
			name: v.Name,
			nameShort: v.NameShort,
			stock: [v.StockId as unknown as StockId, v.StockName],
			isSubsetting: v.IsSubsetting
		};
	};

	const query = 'select * from dat."SettingsList";';
	return PgPool.query<SettingDBO>(query)
		.then(result => result.rows.map(convert));
}

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

		return r;
	};

	const query = 'select * from dat."SkillsList";';
	return PgPool.query<SkillDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetTraits() {
	const convert = (v: TraitDBO): Trait => {
		const r: Trait = {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as TraitId,
			name: v.Name,
			category: [v.CategoryId as unknown as TraitCategoryId, v.Category],
			typeId: [v.TypeId as unknown as TraitTypeId, v.Type],
			cost: v.Cost
		};

		if (v.StockId !== null && v.Stock !== null) r.stock = [v.StockId as unknown as StockId, v.Stock];
		if (v.Description !== null) r.description = v.Description;

		return r;
	};

	const query = 'select * from dat."TraitsList";';
	return PgPool.query<TraitDBO>(query)
		.then(result => result.rows.map(convert));
}



