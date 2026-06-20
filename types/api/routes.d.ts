export type UserRoutes = `/user${"/auth" | "/signin" | "/signup" | "/signout"}`;
export type BwgrRulesetRoutes = "/bwgr/ruleset";

export type Routes = `/api${UserRoutes | BwgrRulesetRoutes}`;


