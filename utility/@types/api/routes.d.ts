type UserRoutes = `/user${"/auth" | "/signin" | "/signup" | "/signout"}`;
type BwgrRulesetRoutes = `/bwgr/ruleset/${"list" | "data"}`;
type MggmRulesetRoutes = `/mggm/megagame${"" | `/reset/${string}` | "/deadline-item" | `/deadline-item/${string}` | "/news-item" | `/order-queues/${string}` | "/order-queue-item" | `/order-queue-item/${string}`}`;

type Routes = UserRoutes | BwgrRulesetRoutes | MggmRulesetRoutes;


