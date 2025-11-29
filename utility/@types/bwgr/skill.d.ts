type BwgrSkillId = Nominal<number, "BwgrSkillId">;

type BwgrSkillCategoryId = Nominal<number, "BwgrSkillCategoryId">;
type BwgrSkillTypeId = Nominal<number, "BwgrSkillTypeId">;
type BwgrSkillToolTypeId = Nominal<number, "BwgrSkillToolTypeId">;

interface BwgrSkillDBO {
	Rulesets: BwgrRulesetId[];
	Id: BwgrSkillId;
	Name: string;
	StockId: BwgrStockId | null;
	Stock: string | null;
	CategoryId: BwgrSkillCategoryId;
	Category: string;
	TypeId: BwgrSkillTypeId;
	Type: string;
	RootIds: BwgrAbilityId[];
	Roots: string[];
	DontList: boolean;
	IsMagical: boolean;
	IsTraining: boolean;
	ToolTypeId: BwgrSkillToolTypeId;
	Tool: string;
	ToolDescription: string | null;
	Description: string | null;
	RestrictionOnlyStockId: BwgrStockId | null;
	RestrictionOnlyStock: string | null;
	RestrictionWhenBurning: boolean | null;
	RestrictionAbilityId: BwgrAbilityId | null;
	RestrictionAbility: string | null;
	SubskillIds: BwgrSkillId[];
}

interface BwgrSkill {
	rulesets: BwgrRulesetId[];
	id: BwgrSkillId;
	name: string;
	stock?: [id: BwgrStockId, name: string];
	category: [id: BwgrSkillCategoryId, name: string];
	type: [id: BwgrSkillTypeId, name: string];
	roots?: [id: BwgrAbilityId, name: string][];
	flags: {
		dontList: boolean;
		isMagical: boolean;
		isTraining: boolean;
	};
	tool: {
		typeId: BwgrSkillToolTypeId;
		tool: string;
		description?: string;
	};
	description?: string;
	restriction?: {
		onlyStock?: [id: BwgrStockId, name: string];
		onlyWithAbility?: [id: BwgrAbilityId, name: string];
		onlyAtBurn?: boolean;
	};
	subskillIds?: BwgrSkillId[];
}
