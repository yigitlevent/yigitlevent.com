type UserSigninRequest = Omit<User, "id" | "username" | "userAccess">;

type UserSignupRequest = Omit<User, "id" | "userAccess">;

type UserForms =
	| UserSigninRequest
	| UserSignupRequest;

type BwgrRulesetForms = { rulesets: BwgrRulesetId[]; };

interface SetMegagameRequest {
	name: string;
	start: Date;
	end: Date;
	cycleMinutes: number;
	cycleName: string;
	cycleNamePlural: string;
	events: {
		name: string;
		description: string;
		cycleInterval: number;
	}[];
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
