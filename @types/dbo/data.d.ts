interface RulesetDBO {
	Id: RulesetId;
	Name: string;
	IsOfficial: boolean;
	IsPublic: boolean;
	IsExpansion: boolean;
	User: string | null;
	ExpansionIds: RulesetId[];
}

interface AbilityDBO {
	Id: AbilityId;
	Name: string;
	AbilityTypeId: AbilityTypeId;
	AbilityType: string;
	HasShades: boolean;
	Cycle: number | null;
	Routine: number | null;
	Difficult: number | null;
	Challenging: number | null;
	RequiredTraitId: TraitId | null;
	RequiredTrait: string | null;
}

interface StockDBO {
	Rulesets: RulesetId[];
	Id: StockId;
	Name: string;
	NamePlural: string;
	Stride: number;
	SettingIds: SettingId[];
}

interface AgePoolDBO {
	Id: number;
	StockId: StockId;
	MinAge: number;
	MentalPool: number;
	PhysicalPool: number;
}

interface SettingDBO {
	Rulesets: RulesetId[];
	Id: SettingId;
	Name: string;
	NameShort: string;
	StockId: StockId;
	StockName: string;
	IsSubsetting: boolean;
}

interface SkillDBO {
	Rulesets: RulesetId[];
	Id: SkillId;
	Name: string;
	StockId: StockId | null;
	Stock: string | null;
	CategoryId: SkillCategoryId;
	Category: string;
	TypeId: SkillTypeId;
	Type: string;
	RootIds: AbilityId[];
	Roots: string[];
	DontList: boolean;
	IsMagical: boolean;
	IsTraining: boolean;
	ToolTypeId: SkillToolTypeId;
	Tool: string;
	ToolDescription: string | null;
	Description: string | null;
	RestrictionOnlyStockId: StockId | null;
	RestrictionOnlyStock: string | null;
	RestrictionWhenBurning: boolean | null;
	RestrictionAbilityId: AbilityId | null;
	RestrictionAbility: string | null;
	SubskillIds: SkillId[];
}

interface TraitDBO {
	Rulesets: RulesetId[];
	Id: TraitId;
	Name: string;
	StockId: StockId | null;
	Stock: string | null;
	CategoryId: TraitCategoryId;
	Category: string;
	TypeId: TraitTypeId;
	Type: string;
	Cost: number;
	Description: string | null;
}

interface LifepathDBO {
	Rulesets: RulesetId[];
	Id: LifepathId;
	Name: string;
	StockId: StockId;
	Stock: string;
	SettingId: SettingId;
	Setting: string;
	LeadIds: SettingId[];
	SkillIds: SkillId[];
	TraitIds: TraitId[];
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
	CompanionSettingIds: SettingId[];
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
	SettingId: SettingId | null;
	Setting: string | null;
	LifepathId: LifepathId | null;
	Lifepath: string | null;
	SkillId: SkillId | null;
	Skill: string | null;
	TraitId: TraitId | null;
	Trait: string | null;
	AttributeId: number | null;
	Attribute: string | null;
}

interface ResourceDBO {
	Rulesets: RulesetId[];
	Id: ResourceId;
	Name: string;
	StockId: StockId;
	Stock: string;
	ResourceTypeId: ResourceTypeId;
	ResourceType: string;
	Description: string | null;
	VariableCost: boolean;
	Costs: number[];
	CostDescriptions: string[];
	Modifiers: number[];
	ModifierIsPerCosts: boolean[];
	ModifierDescriptions: string[];
}

interface ResourceMagicDetailsDBO {
	Id: number;
	ResourceId: ResourceId;
	OriginId: OriginFacetId;
	Origin: string;
	DurationId: DurationFacetId;
	Duration: string;
	AreaOfEffectId: AreaOfEffectFacetId;
	AreaOfEffect: string;
	AreaOfEffectUnitId: DistanceUnitId | null;
	AreaOfEffectUnit: string | null;
	AreaOfEffectModifierId: UnitModifierId | null;
	AreaofEffectModifier: string | null;
	Element1Id: ElementFacetId;
	Element1: string;
	Element2Id: ElementFacetId | null;
	Element2: string | null;
	Element3Id: ElementFacetId | null;
	Element3: string | null;
	Impetus1Id: ImpetusFacetId;
	Impetus1: string;
	Impetus2Id: ImpetusFacetId | null;
	Impetus2: string | null;
	Actions: number;
	ActionsMultiply: boolean;
}

interface ResourceMagicObstaclesDBO {
	Id: number;
	ResourceId: ResourceId;
	Obstacle: number | null;
	ObstacleAbility1Id: AbilityId | null;
	ObstacleAbility1: string | null;
	ObstacleAbility2Id: AbilityId | null;
	ObstacleAbility2: string | null;
	ObstacleCaret: boolean;
	Description: string | null;
}

interface DoWActionDBO {
	Id: DoWActionId;
	Name: string;
	SpeakingThePart: string | null;
	Special: string | null;
	Effect: string | null;
}

interface RaCActionDBO {
	Id: RaCActionId;
	Name: string;
	GroupId: RaCActionGroupId;
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
	Id: FightActionId;
	Name: string;
	GroupId: FightActionGroupId;
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

interface ActionResolutionDBO<T> {
	ActionId: number;
	OpposingActionId: T;
	OpposingAction: string;
	ResolutionTypeId: ActionResolutionTypeId;
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

type DoWActionResolutionDBO = ActionResolutionDBO<DoWActionId>;
type RaCActionResolutionDBO = ActionResolutionDBO<RaCActionId>;
type FightActionResolutionDBO = ActionResolutionDBO<FightActionId>;

interface PracticeDBO {
	Id: PracticeId;
	AbilityId: AbilityId | null;
	Ability: string | null;
	SkillTypeId: SkillTypeId | null;
	SkillType: string | null;
	Cycle: number;
	Routine: number;
	Difficult: number;
	Challenging: number;
}

interface QuestionDBO {
	Id: QuestionId;
	Name: string;
	Question: string;
	AttributeId1: AbilityId | null;
	AttributeName1: string | null;
	AttributeId2: AbilityId | null;
	AttributeName2: string | null;
}
