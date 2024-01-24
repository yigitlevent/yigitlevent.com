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
	settings: HmHexmapSettings;
}

interface HmHexResponseHexes {
	id: HmHexId;
	name: string;
	typeId: HmHexTypeId;
	position: HmPoint;
}

interface HmHexResponseAreas {
	id: HmAreaId;
	parentHexId: HmHexId;
	placement: HmAreaPlacement;
	typeId: HmAreaTypeId;
	name: string;
}

interface HmHexmapResponse {
	map: HmHexResponseHexmap;
	hexes: HmHexResponseHexes[];
	areas: HmHexResponseAreas[];
}

interface HmAreaTypeResponse {
	id: HmAreaTypeId;
	name: string;
	category: HmAreaTypeCategory;
	fill: RgbaColor;
	texture?: HmAreaTextureName;
}

interface HmHexTypeResponse {
	id: HmHexTypeId;
	name: string;
	category: HmHexTypeCategory;
	fill: RgbaColor;
	texture?: HmHexTextureName;
}

interface HmSurfaceTypesResponse {
	areaTypes: HmAreaTypeResponse[];
	hexTypes: HmHexTypeResponse[];
}
