type PracticeId = Nominal<number, "PracticeId">;

type Practice = RequireOnlyOne<{
	id: PracticeId;
	ability?: [id: AbilityId, name: string];
	skillType?: [id: SkillTypeId, name: string];
	cycle: number;
	routine: number;
	difficult: number;
	challenging: number;
}, "ability" | "skillType">;
