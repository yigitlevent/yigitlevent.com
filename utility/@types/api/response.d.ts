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
	position: HmPoint;
	type: {
		biomeId: HmBiomeId;
		terrainId: HmTerrainId;
	};
}

interface HmHexResponseAreas {
	id: HmAreaId;
	name: string;
	hexId: HmHexId;
	placement: HmAreaPlacement;
	type: {
		terrainId: HmTerrainId;
		texture: HmTextureName;
	};
}

interface HmHexmapResponse {
	map: HmHexResponseHexmap;
	hexes: HmHexResponseHexes[];
	areas: HmHexResponseAreas[];
}

interface HmBiomeResponse {
	id: HmBiomeId;
	name: string;
	fill: RgbaColor;
}

interface HmTerrainResponse {
	id: HmTerrainId;
	name: string;
	type: HmTerrainType;
	textures: HmTextureName[];
}

interface HmSurfacesResponse {
	biomes: HmBiomeResponse[];
	terrains: HmTerrainResponse[];
}
