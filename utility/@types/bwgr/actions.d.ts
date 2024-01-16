type BwgrDoWActionId = Nominal<number, "BwgrDoWActionId">;

type BwgrRaCActionId = Nominal<number, "BwgrRaCActionId">;
type BwgrRaCActionGroupId = Nominal<number, "BwgrRaCActionGroupId">;

type BwgrFightActionGroupId = Nominal<number, "BwgrFightActionGroupId">;
type BwgrFightActionId = Nominal<number, "BwgrFightActionId">;

type BwgrActionResolutionTypeId = Nominal<number, "BwgrActionResolutionTypeId">;

interface BwgrDoWActionDBO {
	Id: BwgrDoWActionId;
	Name: string;
	SpeakingThePart: string | null;
	Special: string | null;
	Effect: string | null;
}

interface BwgrRaCActionDBO {
	Id: BwgrRaCActionId;
	Name: string;
	GroupId: BwgrRaCActionGroupId;
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

interface BwgrFightActionDBO {
	Id: BwgrFightActionId;
	Name: string;
	GroupId: BwgrFightActionGroupId;
	Group: string;
	ActionCost: number | null;
	TestExtra: string | null;
	Restrictions: string | null;
	Effect: string | null;
	Special: string | null;
	CountsAsNoAction: boolean;
}

interface BwgrActionTestDBO {
	ActionId: number;
	SkillId: BwgrSkillId | null;
	Skill: string | null;
	AbilityId: BwgrAbilityId | null;
	Ability: string | null;
}

interface BwgrActionResolutionDBO<T> {
	ActionId: number;
	OpposingActionId: T;
	OpposingAction: string;
	ResolutionTypeId: BwgrActionResolutionTypeId;
	ResolutionType: string;
	IsAgainstSkill: boolean | null;
	Obstacle: number | null;
	OpposingModifier: number | null;
	SkillId: BwgrSkillId | null;
	Skill: string;
	AbilityId: BwgrAbilityId | null;
	Ability: string;
	OpposingSkillId: BwgrSkillId | null;
	OpposingSkill: string;
	OpposingAbilityId: BwgrAbilityId | null;
	OpposingAbility: string;
}

type BwgrDoWActionResolutionDBO = BwgrActionResolutionDBO<BwgrDoWActionId>;
type BwgrRaCActionResolutionDBO = BwgrActionResolutionDBO<BwgrRaCActionId>;
type BwgrFightActionResolutionDBO = BwgrActionResolutionDBO<BwgrFightActionId>;

interface BwgrActionResolution<T> {
	opposingAction: [id: T, name: string];
	type: [id: BwgrActionResolutionTypeId, name: string];
	isAgainstSkill?: boolean;
	obstacle?: number;
	opposingModifier?: number;
	skill?: [id: BwgrSkillId, name: string];
	ability?: [id: BwgrAbilityId, name: string];
	opposingSkill?: [id: BwgrSkillId, name: string];
	opposingAbility?: [id: BwgrAbilityId, name: string];
}

interface BwgrActionTests {
	skills: [id: BwgrSkillId, name: string][];
	abilities: [id: BwgrAbilityId, name: string][];
}

interface BwgrDoWAction {
	id: BwgrDoWActionId;
	name: string;
	speakingThePart?: string;
	special?: string;
	effect?: string;
	tests?: BwgrActionTests;
	resolutions?: BwgrActionResolution<BwgrDoWActionId>[];
}

interface BwgrRaCAction {
	id: BwgrRaCActionId;
	name: string;
	group: [id: BwgrRaCActionGroupId, name: string];
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
	resolutions?: BwgrActionResolution<BwgrRaCActionId>[];
}

interface BwgrFightAction {
	id: BwgrFightActionId;
	name: string;
	group: [id: BwgrFightActionGroupId, name: string];
	flags: {
		countsAsNoAction?: boolean;
	};
	actionCost?: number;
	testExtra?: string;
	restrictions?: string;
	effect?: string;
	special?: string;
	tests?: BwgrActionTests;
	resolutions?: BwgrActionResolution<BwgrFightActionId>[];
}

interface BwgrActionPlannerExtension {
	open: boolean;
	visible: boolean;
}

type BwgrDoWActionExtended = BwgrDoWAction & BwgrActionPlannerExtension;
type BwgrRaCActionExtended = BwgrRaCAction & BwgrActionPlannerExtension;
type BwgrFightActionExtended = BwgrFightAction & BwgrActionPlannerExtension;
