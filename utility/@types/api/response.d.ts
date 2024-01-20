interface UserResponse {
	user: UserSession;
}

interface BwgrRulesetsResponse {
	rulesets: BwgrRuleset[];
}

interface BwgrRulesetResponse {
	ruleset: BwgrRulesetData;
}

interface HmHexResponseHexmap {
	id: HmHexmapId;
	name: string;
	constants: HmHexmapConstants;
}

interface HmHexResponseHexes {
	id: HmHexId;
	name: string;
	position: HmPoint;
}

interface HmHexResponseAreas {
	id: HmHexAreaId;
	parentHexId: HmHexId;
	placement: HmHexAreaPlacement;
	name: string;
}

interface HmHexmapResponse {
	map: HmHexResponseHexmap;
	hexes: HmHexResponseHexes[];
	areas: HmHexResponseAreas[];
}
