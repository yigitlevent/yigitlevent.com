type ResourceId = Nominal<number, "ResourceId">;

type ResourceTypeId = Nominal<number, "ResourceTypeId">;

interface ResourceMagicObstacleDetails {
	obstacle?: number;
	abilities?: [id: AbilityId, name: string][];
	caret?: boolean;
	description?: string;
}

interface ResourceMagicDetails {
	origin: [id: OriginFacetId, name: string];
	duration: [id: DurationFacetId, name: string];
	areaOfEffect: [id: AreaOfEffectFacetId, name: string];
	areaOfEffectDetails?: {
		unit?: [id: DistanceUnitId, name: string],
		modifier?: [id: UnitModifierId, name: string];
	};
	elements: [id: ElementFacetId, name: string][];
	impetus: [id: ImpetusFacetId, name: string][];
	actions: number;
	doActionsMultiply: boolean;
	obstacleDetails?: ResourceMagicObstacleDetails[];
}

interface Resource {
	rulesets: RulesetId[];
	id: ResourceId;
	name: string;
	stock: [id: StockId, name: string];
	type: [id: ResourceTypeId, name: string];
	description?: string;
	variableCost?: boolean;
	costs: [cost: number, description: string][];
	modifiers: [cost: number, isPer: boolean, description: string][];
	magical?: ResourceMagicDetails;
}
