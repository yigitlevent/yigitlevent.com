type UserSigninRequest = Omit<User, "id" | "username">;
type UserSignupRequest = Omit<User, "id">;
type UserSession = Omit<User, "password">;

interface UserResponse {
	user: UserSession;
}

type UserRoutes = `/user${"/auth" | "/signin" | "/signup" | "/signout"}`;
type UserForms = UserSigninRequest | UserSignupRequest;
type RulesetForms = { rulesets: RulesetId[]; };

type RulesetRoutes = `/ruleset/${"list" | "data"}`;

type Routes = UserRoutes | RulesetRoutes;
type Forms = UserForms | RulesetForms;