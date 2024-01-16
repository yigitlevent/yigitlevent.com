type BwgrPracticeId = Nominal<number, "BwgrPracticeId">;

interface BwgrPracticeDBO {
	Id: BwgrPracticeId;
	AbilityId: BwgrAbilityId | null;
	Ability: string | null;
	SkillTypeId: BwgrSkillTypeId | null;
	SkillType: string | null;
	Cycle: number;
	Routine: number;
	Difficult: number;
	Challenging: number;
}

type BwgrPractice = RequireOnlyOne<{
	id: BwgrPracticeId;
	ability?: [id: BwgrAbilityId, name: string];
	skillType?: [id: BwgrSkillTypeId, name: string];
	cycle: number;
	routine: number;
	difficult: number;
	challenging: number;
}, "ability" | "skillType">;

interface BwgrPracticePlaced {
	practiceId: BwgrPracticeId;
	name: string;
	testType: string;
	hours: number;
}

interface BwgrPracticeCell {
	maxHours: number;
	remaining: number;
	placed: BwgrPracticePlaced[];
}
