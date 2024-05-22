type UserSigninRequest = Omit<User, "id" | "username" | "userAccess">;

type UserSignupRequest = Omit<User, "id" | "userAccess">;

type UserForms =
	| UserSigninRequest
	| UserSignupRequest;

type BwgrRulesetForms = { rulesets: BwgrRulesetId[]; };

type Forms = UserForms | BwgrRulesetForms;
