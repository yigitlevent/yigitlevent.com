type BwgrQuestionId = Nominal<number, "BwgrQuestionId">;

interface BwgrQuestionDBO {
	Id: BwgrQuestionId;
	Name: string;
	Question: string;
	AttributeId1: BwgrAbilityId | null;
	AttributeName1: string | null;
	AttributeId2: BwgrAbilityId | null;
	AttributeName2: string | null;
}

interface BwgrQuestion {
	id: BwgrQuestionId;
	name: string;
	question: string;
	attributes?: [id: BwgrAbilityId, name: string][];
}


