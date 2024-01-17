type UserSigninRequest = Omit<User, "id" | "username">;

type UserSignupRequest = Omit<User, "id">;

type UserForms =
	| UserSigninRequest
	| UserSignupRequest;

type BwgrRulesetForms = { rulesets: BwgrRulesetId[]; };

type Forms = UserForms | BwgrRulesetForms;
