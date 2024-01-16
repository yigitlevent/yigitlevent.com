type BwgrAbilityId = Nominal<number, "BwgrAbilityId">;

type BwgrAbilityTypeId = Nominal<number, "BwgrAbilityTypeId">;

interface BwgrAbilityDBO {
	Id: BwgrAbilityId;
	Name: string;
	AbilityTypeId: BwgrAbilityTypeId;
	AbilityType: string;
	HasShades: boolean;
	Cycle: number | null;
	Routine: number | null;
	Difficult: number | null;
	Challenging: number | null;
	RequiredTraitId: BwgrTraitId | null;
	RequiredTrait: string | null;
}

interface BwgrAbility {
	id: BwgrAbilityId;
	name: string;
	abilityType: [id: BwgrAbilityTypeId, name: string];
	requiredTrait?: [id: BwgrTraitId, name: string];
	hasShades: boolean;
	practice?: {
		cycle: number;
		routineTests: number;
		difficultTests: number;
		challengingTests: number;
	};
}
