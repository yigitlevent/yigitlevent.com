type LifepathId = Nominal<"LifepathId">;

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
	{ setting: [id: SettingId, name: string]; forCompanion: boolean; } |
	{ question: [id: QuestionId, name: string]; });

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
