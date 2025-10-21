type UserSigninRequest = Omit<User, "id" | "username" | "userAccess">;

type UserSignupRequest = Omit<User, "id" | "userAccess">;

type UserForms =
	| UserSigninRequest
	| UserSignupRequest;

type BwgrRulesetForms = { rulesets: BwgrRulesetId[]; };

interface ResetMegagameRequest {
	megagameId: MegagameId;
}

interface GetMegagameDeadlineItemsRequest {
	megagameId: MegagameId;
}

interface CreateMegagameDeadlineItemRequest {
	megagameId: MegagameId;
	type: string;
	deadline: string;
}

interface CreateMegagameNewsItemRequest {
	megagameId: MegagameId;
	factionId: FactionId;
	text: string;
}

interface CreateOrderQueueItemRequest {
	megagameId: MegagameId;
	factionId: FactionId;
	orderTypeId: OrderTypeId;
}

type MegagameForms =
	| ResetMegagameRequest
	| GetMegagameDeadlineItemsRequest
	| CreateMegagameDeadlineItemRequest
	| CreateMegagameNewsItemRequest
	| CreateOrderQueueItemRequest;

type Forms = UserForms | BwgrRulesetForms | MegagameForms;
