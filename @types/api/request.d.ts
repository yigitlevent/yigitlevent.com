type UserSigninRequest = Omit<User, "id" | "username">;
type UserSignupRequest = Omit<User, "id">;
type UserForms = UserSigninRequest | UserSignupRequest;

type RulesetForms = { rulesets: RulesetId[]; };

type Forms = UserForms | RulesetForms;
