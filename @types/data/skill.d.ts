type SkillId = Nominal<number, "SkillId">;

type SkillCategoryId = Nominal<number, "SkillCategoryId">;
type SkillTypeId = Nominal<number, "SkillTypeId">;
type SkillToolTypeId = Nominal<number, "SkillToolTypeId">;

interface Skill {
	rulesets: RulesetId[];
	id: SkillId;
	name: string;
	stock?: [id: StockId, name: string];
	category: [id: SkillCategoryId, name: string];
	type: [id: SkillTypeId, name: string];
	roots?: [id: AbilityId, name: string][];
	flags: {
		dontList: boolean;
		isMagical: boolean;
		isTraining: boolean;
	};
	tool: {
		typeId: SkillToolTypeId;
		tool: string;
		description?: string;
	};
	description?: string;
	restriction?: {
		onlyStock: [id: StockId, name: string];
		onlyWithAbility?: [id: AbilityId, name: string];
		onlyAtBurn?: boolean;
	};
	subskillIds?: SkillId[];
}
