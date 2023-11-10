type DoWActionId = Nominal<number, "DoWActionId">;

type RaCActionId = Nominal<number, "RaCActionId">;
type RaCActionGroupId = Nominal<number, "RaCActionGroupId">;

type FightActionGroupId = Nominal<number, "FightActionGroupId">;
type FightActionId = Nominal<number, "FightActionId">;

type ActionResolutionTypeId = Nominal<number, "ActionResolutionTypeId">;


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

interface ActionPlannerExtension {
	open: boolean;
	visible: boolean;
}

type DoWActionExtended = DoWAction & ActionPlannerExtension;
type RaCActionExtended = RaCAction & ActionPlannerExtension;
type FightActionExtended = FightAction & ActionPlannerExtension;
