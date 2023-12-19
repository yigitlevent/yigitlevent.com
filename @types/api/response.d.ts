interface ErrorResponse {
	error?: unknown;
}

interface UserResponse extends ErrorResponse {
	user: UserSession | null;
}

interface RulesetsResponse {
	rulesets: Ruleset[];
}

interface RulesetResponse {
	ruleset: RulesetData;
}
