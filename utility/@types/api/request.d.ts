type UserSigninRequest = Omit<User, "id" | "username" | "userAccess">;

type UserSignupRequest = Omit<User, "id" | "userAccess">;

type UserForms =
	| UserSigninRequest
	| UserSignupRequest;

type BwgrRulesetForms = { rulesets: BwgrRulesetId[]; };

interface SetMegagameRequestEvent {
	name: {
		en: string;
		tr: string;
	};
	description: {
		en: string;
		tr: string;
	};
	cycleInterval: number;
}

interface SetMegagameRequest {
	name: string;
	type: "dune" | "wod";
	timing: {
		start: string;
		end: string;
	};
	cycle: {
		start: number;
		minutes: number;
	};
	events: SetMegagameRequestEvent[];
}

interface SetMegagameRumorRequest {
	megagameId: MegagameId;
	textEN: string;
	textTR: string;
}

interface GetMegagameRumorsRequest {
	megagameId: MegagameId;
}

type MegagameForms =
	| GetMegagameRumorsRequest
	| SetMegagameRequest
	| SetMegagameRumorRequest;

type Forms = UserForms | BwgrRulesetForms | MegagameForms;
