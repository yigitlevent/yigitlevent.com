type UserRoutes = `/user${"/auth" | "/signin" | "/signup" | "/signout"}`;
type RulesetRoutes = `/ruleset/${"list" | "data"}`;

type Routes = UserRoutes | RulesetRoutes;
