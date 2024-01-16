type UserRoutes = `/user${"/auth" | "/signin" | "/signup" | "/signout"}`;
type BwgrRulesetRoutes = `/bwgr/ruleset/${"list" | "data"}`;

type Routes = UserRoutes | BwgrRulesetRoutes;
