interface Stock {
	rulesets: RulesetId[];
	id: StockId;
	name: string;
	namePlural: string;
	stride: number;
	settingIds: SettingId[];
	agePool: {
		minAge: number;
		mentalPool: number;
		physicalPool: number;
	}[];
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

type Practice = RequireOnlyOne<{
	id: PracticeId;
	ability?: [id: AbilityId, name: string];
	skillType?: [id: SkillTypeId, name: string];
	cycle: number;
	routine: number;
	difficult: number;
	challenging: number;
}, "ability" | "skillType">;

interface Question {
	id: QuestionId;
	name: string;
	question: string;
}

interface ActionPlannerExtension {
	open: boolean;
	visible: boolean;
}

type DoWActionExtended = DoWAction & ActionPlannerExtension;
type RaCActionExtended = RaCAction & ActionPlannerExtension;
type FightActionExtended = FightAction & ActionPlannerExtension;


