type UserRoutes = `/user${"/auth" | "/signin" | "/signup" | "/signout"}`;
type BwgrRulesetRoutes = `/bwgr/ruleset/${"list" | "data"}`;
type MggmRulesetRoutes = `/mggm/megagame${"" | "/rumors" | "/rumor"}`;

type Routes = UserRoutes | BwgrRulesetRoutes | MggmRulesetRoutes;
