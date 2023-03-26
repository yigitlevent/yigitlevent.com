interface UserDBO {
	Id: string;
	Username: string;
	Email: string;
	Password: string;
}

interface RulesetDBO {
	Id: string;
	Name: string;
	IsOfficial: boolean;
	IsPublic: boolean;
	IsExpansion: boolean;
	User: string | null;
	ExpansionIds: string[];
}

interface AbilityDBO {
	Id: number;
	Name: string;
	AbilityTypeId: number;
	AbilityType: string;
	HasShades: boolean;
	Cycle: number | null;
	Routine: number | null;
	Difficult: number | null;
	Challenging: number | null;
}

interface StockDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	NamePlural: string;
	Stride: number;
	SettingIds: string[];
}

interface SettingDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	NameShort: string;
	StockId: number;
	StockName: string;
	IsSubsetting: boolean;
}

interface SkillDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	StockId: number | null;
	Stock: string | null;
	CategoryId: number;
	Category: string;
	TypeId: number;
	Type: string;
	RootIds: number[];
	Roots: string[];
	DontList: boolean;
	IsMagical: boolean;
	IsTraining: boolean;
	ToolTypeId: number;
	Tool: string;
	ToolDescription: string | null;
	Description: string | null;
	RestrictionOnlyStockId: integer | null;
	RestrictionOnlyStock: string | null;
	RestrictionWhenBurning: boolean | null;
	RestrictionAbilityId: integer | null;
	RestrictionAbility: string | null;
	SubskillIds: number[];
}

interface TraitDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	StockId: number | null;
	Stock: string | null;
	CategoryId: number;
	Category: string;
	TypeId: number;
	Type: string;
	Cost: number;
	Description: string | null;
}

interface LifepathDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	StockId: number;
	Stock: string;
	SettingId: number;
	Setting: string;
	LeadIds: number[];
	SkillIds: number[];
	TraitIds: number[];
	Born: boolean;
	Years: number[];
	EitherPool: number;
	MentalPool: number;
	PhysicalPool: number;
	GeneralSkillPool: number;
	LifepathSkillPool: number;
	TraitPool: number;
	ResporcePoints: number;
	IsGSPMultiplier: boolean;
	IsLSPMultiplier: boolean;
	IsRPMultiplier: boolean;
	HalfGSPFromPrev: boolean;
	HalfLSPFromPrev: boolean;
	HalfRPFromPrev: boolean;
	RequirementText: string | null;
	CompanionName: string | null;
	CompanionGivesSkills: boolean | null;
	CompanionGSPMultiplier: number | null;
	CompanionLSPMultiplier: number | null;
	CompanionRPMultiplier: number | null;
	CompanionSettingIds: number[];
}

interface LifepathRequirementBlockDBO {
	Id: number;
	LifepathId: number;
	LogicTypeId: number;
	LogicType: string;
	MustFulfill: boolean;
	FulfillmentAmount: number;
}

interface LifepathRequirementBlockItemDBO {
	RequirementId: number;
	RequirementTypeId: number;
	RequirementType: string;
	ForCompanion: boolean;
	Min: number | null;
	Max: number | null;
	SettingId: number | null;
	Setting: string | null;
	LifepathId: number | null;
	Lifepath: string | null;
	SkillId: number | null;
	Skill: string | null;
	TraitId: number | null;
	Trait: string | null;
	AttributeId: number | null;
	Attribute: string | null;
}
