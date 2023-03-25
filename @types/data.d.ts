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
	subskillIds?: SkillId[];
}

interface Trait {
	rulesets: RulesetId[];
	id: TraitId;
	name: string;
	stock?: [id: StockId, name: string];
	category: [id: TraitCategoryId, name: string];
	typeId: [id: TraitTypeId, name: string];
	cost: number;
	description?: string;
}

interface RulesetData {
	abilities: Ability[];
	stocks: Stock[];
	settings: Setting[];
	skills: Skill[];
	traits: Trait[];
}