import type { BwgrAbilityId } from "./ability";
import type { BwgrSkillTypeId } from "./skill";
import type { Nominal } from "../utility/nominal";


export type BwgrPracticeId = Nominal<number, "BwgrPracticeId">;

export interface BwgrPracticeDBO {
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

export type BwgrPractice = RequireOnlyOne<{
  id: BwgrPracticeId;
  ability?: [id: BwgrAbilityId, name: string];
  skillType?: [id: BwgrSkillTypeId, name: string];
  cycle: number;
  routine: number;
  difficult: number;
  challenging: number;
}, "ability" | "skillType">;

export interface BwgrPracticePlaced {
  practiceId: BwgrPracticeId;
  cellId: number;
  name: string;
  testType: string;
  hours: number;
}

export interface BwgrPracticeCell {
  maxHours: number;
  remaining: number;
  placed: BwgrPracticePlaced[];
}
