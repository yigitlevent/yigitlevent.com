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
	{ isUnique: true; } |
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
	{ setting: [id: SettingId, name: string]; forCompanion: boolean; };

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
}