import type { BwgrAbilityId } from "./ability";
import type { Nominal } from "../utility/nominal";


export type BwgrQuestionId = Nominal<number, "BwgrQuestionId">;

export interface BwgrQuestionDBO {
  Id: BwgrQuestionId;
  Name: string;
  Question: string;
  AttributeId1: BwgrAbilityId | null;
  AttributeName1: string | null;
  AttributeId2: BwgrAbilityId | null;
  AttributeName2: string | null;
}

export interface BwgrQuestion {
  id: BwgrQuestionId;
  name: string;
  question: string;
  attributes?: [id: BwgrAbilityId, name: string][];
}


