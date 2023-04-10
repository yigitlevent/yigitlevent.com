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
	RequiredTraitId: number | null;
	RequiredTrait: string | null;
}

interface StockDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	NamePlural: string;
	Stride: number;
	SettingIds: string[];
}

interface AgePoolDBO {
	Id: number;
	StockId: number;
	MinAge: number;
	MentalPool: number;
	PhysicalPool: number;
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
	ResourcePoints: number;
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

interface ResourceDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	StockId: number;
	Stock: string;
	ResourceTypeId: number;
	ResourceType: string;
	Description: string | null;
	VariableCost: boolean;
	Costs: number[];
	CostDescriptions: string[];
	Modifiers: int[];
	ModifierIsPerCosts: boolean[];
	ModifierDescriptions: string[];
}

interface ResourceMagicDetailsDBO {
	Id: number;
	ResourceId: number;
	OriginId: number;
	Origin: string;
	DurationId: number;
	Duration: string;
	AreaOfEffectId: number;
	AreaOfEffect: string;
	AreaOfEffectUnitId: number | null;
	AreaOfEffectUnit: string | null;
	AreaOfEffectModifierId: number | null;
	AreaofEffectModifier: string | null;
	Element1Id: number;
	Element1: string;
	Element2Id: number | null;
	Element2: string | null;
	Element3Id: number | null;
	Element3: string | null;
	Impetus1Id: number;
	Impetus1: string;
	Impetus2Id: number | null;
	Impetus2: string | null;
	Actions: number;
	ActionsMultiply: boolean;
}

interface ResourceMagicObstaclesDBO {
	Id: number;
	ResourceId: number;
	Obstacle: number | null;
	ObstacleAbility1Id: number | null;
	ObstacleAbility1: string | null;
	ObstacleAbility2Id: number | null;
	ObstacleAbility2: string | null;
	ObstacleCaret: boolean;
	Description: string | null;
}

interface DoWActionDBO {
	Id: number;
	Name: string;
	SpeakingThePart: string | null;
	Special: string | null;
	Effect: string | null;
}

interface RaCActionDBO {
	Id: number;
	Name: string;
	GroupId: number;
	Group: string;
	UseForks: boolean;
	UseWeaponRangeAdvantage: boolean;
	UsePositionAdvantage: boolean;
	UseStrideAdvantage: boolean;
	IsOpenEnded: boolean;
	Effect: string;
	SpecialRestriction: string | null;
	SpecialAction: string | null;
	However: string | null;
}

interface FightActionDBO {
	Id: number;
	Name: string;
	GroupId: number;
	Group: string;
	ActionCost: number | null;
	TestExtra: string | null;
	Restrictions: string | null;
	Effect: string | null;
	Special: string | null;
	CountsAsNoAction: boolean;
}

interface ActionTestDBO {
	ActionId: number;
	SkillId: SkillId | null;
	Skill: string | null;
	AbilityId: AbilityId | null;
	Ability: string | null;
}

interface ActionResolutionDBO {
	ActionId: number;
	OpposingActionId: number;
	OpposingAction: string;
	ResolutionTypeId: number;
	ResolutionType: string;
	IsAgainstSkill: boolean | null;
	Obstacle: number | null;
	OpposingModifier: number | null;
	SkillId: SkillId | null;
	Skill: string;
	AbilityId: AbilityId | null;
	Ability: string;
	OpposingSkillId: SkillId | null;
	OpposingSkill: string;
	OpposingAbilityId: AbilityId | null;
	OpposingAbility: string;
}

interface PracticeDBO {
	Id: number;
	AbilityId: number | null;
	Ability: string | null;
	SkillTypeId: number | null;
	SkillType: string | null;
	Cycle: number;
	Routine: number;
	Difficult: number;
	Challenging: number;
}