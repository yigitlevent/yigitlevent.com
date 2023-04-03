interface User {
	id: string;
	username: string;
	email: string;
	password: string;
}

type UserSigninRequest = Omit<User, "id" | "username">;
type UserSignupRequest = Omit<User, "id">;
type UserSession = Omit<User, "password">;

interface UserResponse {
	user: UserSession;
}

interface Ruleset {
	id: RulesetId;
	name: string;
	isOfficial: boolean;
	isPublic: boolean;
	isExpansion: boolean;
	user?: string;
	expansionIds?: RulesetId[];
}

interface Ability {
	id: AbilityId;
	name: string;
	abilityType: [id: AbilityTypeId, name: string];
	requiredTrait?: [id: TraitId, name: string];
	hasShades: boolean;
	practice?: {
		cycle: number;
		routineTests: number;
		difficultTests: number;
		challengingTests: number;
	};
}

interface Stock {
	rulesets: RulesetId[];
	id: StockId;
	name: string;
	namePlural: string;
	stride: number;
	settingIds: SettingId[];
}

interface Setting {
	rulesets: RulesetId[];
	id: SettingId;
	name: string;
	nameShort: string;
	stock: [id: StockId, name: string];
	isSubsetting: boolean;
}

interface Skill {
	rulesets: RulesetId[];
	id: SkillId;
	name: string;
	stock?: [id: StockId, name: string];
	category: [id: SkillCategoryId, name: string];
	type: [id: SkillTypeId, name: string];
	roots?: [id: SkillRootId, name: string][];
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

interface Trait {
	rulesets: RulesetId[];
	id: TraitId;
	name: string;
	stock?: [id: StockId, name: string];
	category: [id: TraitCategoryId, name: string];
	type: [id: TraitTypeId, name: string];
	cost: number;
	description?: string;
}

type LifepathRequirementItem =
	{ logicType: [id: LogicTypeId, name: string]; } &
	({ isUnique: true; } |
	{ isSettingEntry: true; } |
	{ minLpIndex: number; } |
	{ maxLpIndex: number; } |
	{ minYears: number; } |
	{ maxYears: number; } |
	{ gender: "Male" | "Female"; } |
	{ oldestBy: number; } |
	{ attribute: [id: AbilityId, name: string]; min?: number; max?: number; forCompanion: boolean; } |
	{ skill: [id: SkillId, name: string]; forCompanion: boolean; } |
	{ trait: [id: TraitId, name: string]; forCompanion: boolean; } |
	{ lifepath: [id: LifepathId, name: string]; forCompanion: boolean; } |
	{ setting: [id: SettingId, name: string]; forCompanion: boolean; });

interface LifepathRequirementBlock {
	logicType: [id: LogicTypeId, name: string];
	mustFulfill: boolean;
	fulfillmentAmount: number;
	items: LifepathRequirementItem[];
}

interface Lifepath {
	rulesets: RulesetId[];
	id: LifepathId;
	name: string;
	stock: [id: StockId, name: string];
	setting: [id: SettingId, name: string];
	leads?: SettingId[];
	skills?: SkillId[];
	traits?: TraitId[];
	years: number | number[];
	pools: {
		eitherStatPool: number;
		mentalStatPool: number;
		physicalStatPool: number;
		generalSkillPool: number;
		lifepathSkillPool: number;
		traitPool: number;
		resourcePoints: number;
	};
	flags: {
		isBorn: boolean;
		isGSPMultipliedByYear: boolean;
		isLSPMultipliedByYear: boolean;
		isRPMultipliedByYear: boolean;
		getHalfGSPFromPrevLP: boolean;
		getHalfLSPFromPrevLP: boolean;
		getHalfRPFromPrevLP: boolean;
	};
	companion?: {
		name: string;
		givesSkills: boolean;
		inheritGSPMultiplier?: number;
		inheritLSPMultiplier?: number;
		inheritRPMultiplier?: number;
		settingIds: SettingId[];
	};
	requirements?: LifepathRequirementBlock[];
	requirementsText?: string;
}

interface ResourceMagicObstacleDetails {
	obstacle?: number;
	abilities?: [id: AbilityId, name: string][];
	caret?: boolean;
	description?: string;
}

interface ResourceMagicDetails {
	origin: [id: OriginFacetId, name: string];
	duration: [id: DurationFacetId, name: string];
	areaOfEffect: [id: AreaOfEffectFacetId, name: string];
	areaOfEffectDetails?: {
		unit?: [id: DistanceUnitId, name: string],
		modifier?: [id: UnitModifierId, name: string];
	};
	elements: [id: ElementFacetId, name: string][];
	impetus: [id: ImpetusFacetId, name: string][];
	actions: number;
	doActionsMultiply: boolean;
	obstacleDetails?: ResourceMagicObstacleDetails[];
}

interface Resource {
	rulesets: RulesetId[];
	id: ResourceId;
	name: string;
	stock: [id: StockId, name: string];
	type: [id: ResourceTypeId, name: string];
	description?: string;
	variableCost?: boolean;
	costs: [cost: number, description: string][];
	modifiers: [cost: number, isPer: boolean, description: string][];
	magical?: ResourceMagicDetails;
};

interface Facet {
	name: string;
	obstacle: number;
	actions: number;
	resource: Number;
}

interface SpellOriginFacet extends Facet {
	id: OriginFacetId;
}

interface SpellDurationFacet extends Facet {
	id: DurationFacetId;
}

interface SpellAreaOfEffectFacet extends Facet {
	id: AreaOfEffectFacetId;
}

interface SpellElementFacet extends Facet {
	id: ElementFacetId;
}

interface SpellImpetusFacet extends Facet {
	id: ImpetusFacetId;
}

interface SpellFacets {
	origins: SpellOriginFacet[];
	elements: SpellElementFacet[];
	impetus: SpellImpetusFacet[];
	areaOfEffects: SpellAreaOfEffectFacet[];
	duration: SpellDurationFacet[];
}

interface SpellFacetSelected {
	originId: SpellOriginFacet;
	elementId: SpellElementFacet;
	impetusId: SpellImpetusFacet;
	areaOfEffectId: SpellAreaOfEffectFacet;
	durationId: SpellDurationFacet;
}

interface ActionResolution<T> {
	opposingAction: [id: T, name: string];
	type: [id: ActionResolutionTypeId, name: string];
	isAgainstSkill?: boolean;
	obstacle?: number;
	opposingModifier?: number;
	skill?: [id: SkillId, name: string];
	ability?: [id: AbilityId, name: string];
	opposingSkill?: [id: SkillId, name: string];
	opposingAbility?: [id: AbilityId, name: string];
}

interface ActionTests {
	skills: [id: SkillId, name: string][];
	abilities: [id: AbilityId, name: string][];
}

interface DoWAction {
	id: DoWActionId;
	name: string;
	speakingThePart?: string;
	special?: string;
	effect?: string;
	tests?: ActionTests;
	resolutions?: ActionResolution<DoWActionId>[];
}

interface RaCAction {
	id: RaCActionId;
	name: string;
	group: [id: RaCActionGroupId, name: string];
	flags: {
		useFoRKs?: boolean;
		useWeaponRangeAdvantage?: boolean;
		usePositionAdvantage?: boolean;
		useStrideAdvantage?: boolean;
		isOpenEnded?: boolean;
	};
	effect: string;
	specialRestriction?: string;
	specialAction?: string;
	however?: string;
	resolutions?: ActionResolution<RaCActionId>[];
}

interface FightAction {
	id: FightActionId;
	name: string;
	group: [id: FightActionGroupId, name: string];
	flags: {
		countsAsNoAction?: boolean;
	};
	actionCost?: number;
	testExtra?: string;
	restrictions?: string;
	effect?: string;
	special?: string;
	tests?: ActionTests;
	resolutions?: ActionResolution<FightActionId>[];
}

interface RulesetList {
	rulesets: Ruleset[];
}

interface RulesetData {
	abilities: Ability[];
	stocks: Stock[];
	settings: Setting[];
	skills: Skill[];
	traits: Trait[];
	lifepaths: Lifepath[];
	resources: Resource[];
	spellFacets: SpellFacets;
	dowActions: DoWAction[];
	racActions: RaCAction[];
	fightActions: FightAction[];
}


interface ActionPlannerExtension {
	open: boolean;
	visible: boolean;
}
type DoWActionExtended = DoWAction & ActionPlannerExtension;
type RaCActionExtended = RaCAction & ActionPlannerExtension;
type FightActionExtended = FightAction & ActionPlannerExtension;