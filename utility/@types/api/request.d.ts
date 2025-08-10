type UserSigninRequest = Omit<User, "id" | "username" | "userAccess">;

type UserSignupRequest = Omit<User, "id" | "userAccess">;

type UserForms =
	| UserSigninRequest
	| UserSignupRequest;

type BwgrRulesetForms = { rulesets: BwgrRulesetId[]; };

type Forms = UserForms | BwgrRulesetForms;

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
