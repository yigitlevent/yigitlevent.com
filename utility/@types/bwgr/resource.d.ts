type BwgrResourceId = Nominal<number, "BwgrResourceId">;

type BwgrResourceTypeId = Nominal<number, "BwgrResourceTypeId">;

interface BwgrResourceDBO {
	Rulesets: BwgrRulesetId[];
	Id: BwgrResourceId;
	Name: string;
	StockId: BwgrStockId;
	Stock: string;
	ResourceTypeId: BwgrResourceTypeId;
	ResourceType: string;
	Description: string | null;
	VariableCost: boolean;
	Costs: number[];
	CostDescriptions: string[];
	Modifiers: number[];
	ModifierIsPerCosts: boolean[];
	ModifierDescriptions: string[];
}

interface BwgrResourceMagicDetailsDBO {
	Id: number;
	ResourceId: BwgrResourceId;
	OriginId: BwgrOriginFacetId;
	Origin: string;
	DurationId: BwgrDurationFacetId;
	Duration: string;
	AreaOfEffectId: BwgrAreaOfEffectFacetId;
	AreaOfEffect: string;
	AreaOfEffectUnitId: DistanceUnitId | null;
	AreaOfEffectUnit: string | null;
	AreaOfEffectModifierId: UnitModifierId | null;
	AreaofEffectModifier: string | null;
	Element1Id: BwgrElementFacetId;
	Element1: string;
	Element2Id: BwgrElementFacetId | null;
	Element2: string | null;
	Element3Id: BwgrElementFacetId | null;
	Element3: string | null;
	Impetus1Id: BwgrImpetusFacetId;
	Impetus1: string;
	Impetus2Id: BwgrImpetusFacetId | null;
	Impetus2: string | null;
	Actions: number;
	ActionsMultiply: boolean;
}

interface BwgrResourceMagicObstaclesDBO {
	Id: number;
	ResourceId: BwgrResourceId;
	Obstacle: number | null;
	ObstacleAbility1Id: BwgrAbilityId | null;
	ObstacleAbility1: string | null;
	ObstacleAbility2Id: BwgrAbilityId | null;
	ObstacleAbility2: string | null;
	ObstacleCaret: boolean;
	Description: string | null;
}

interface BwgrResourceMagicObstacleDetails {
	obstacle?: number;
	abilities?: [id: BwgrAbilityId, name: string][];
	caret?: boolean;
	description?: string;
}

interface BwgrResourceMagicDetails {
	origin: [id: BwgrOriginFacetId, name: string];
	duration: [id: BwgrDurationFacetId, name: string];
	areaOfEffect: [id: BwgrAreaOfEffectFacetId, name: string];
	areaOfEffectDetails?: {
		unit?: [id: DistanceUnitId, name: string];
		modifier?: [id: UnitModifierId, name: string];
	};
	elements: [id: BwgrElementFacetId, name: string][];
	impetus: [id: BwgrImpetusFacetId, name: string][];
	actions: number;
	doActionsMultiply: boolean;
	obstacleDetails?: BwgrResourceMagicObstacleDetails[];
}

interface BwgrResource {
	rulesets: BwgrRulesetId[];
	id: BwgrResourceId;
	name: string;
	stock: [id: BwgrStockId, name: string];
	type: [id: BwgrResourceTypeId, name: string];
	description?: string;
	variableCost?: boolean;
	costs: [cost: number, description: string][];
	modifiers: [cost: number, isPer: boolean, description: string][];
	magical?: BwgrResourceMagicDetails;
}
