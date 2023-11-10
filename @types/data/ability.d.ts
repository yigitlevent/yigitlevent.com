type AbilityId = Nominal<"AbilityId">;

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
