type OriginFacetId = Nominal<"OriginFacetId">;
type DurationFacetId = Nominal<"DurationFacetId">;
type AreaOfEffectFacetId = Nominal<"AreaOfEffectFacetId">;
type ElementFacetId = Nominal<"ElementFacetId">;
type ImpetusFacetId = Nominal<"ImpetusFacetId">;

interface Facet {
	name: string;
	obstacle: number;
	actions: number;
	resource: number;
}

interface SpellOriginFacet extends Facet {
	id: OriginFacetId;
}

interface SpellDurationFacet extends Facet {
	id: DurationFacetId;
}

interface SpellAreaOfEffectFacet extends Facet {
	id: AreaOfEffectFacetId;
}

interface SpellElementFacet extends Facet {
	id: ElementFacetId;
}

interface SpellImpetusFacet extends Facet {
	id: ImpetusFacetId;
}

interface SpellFacets {
	origins: SpellOriginFacet[];
	elements: SpellElementFacet[];
	impetus: SpellImpetusFacet[];
	areaOfEffects: SpellAreaOfEffectFacet[];
	duration: SpellDurationFacet[];
}

interface SpellFacetSelected {
	originId: SpellOriginFacet;
	elementId: SpellElementFacet;
	impetusId: SpellImpetusFacet;
	areaOfEffectId: SpellAreaOfEffectFacet;
	durationId: SpellDurationFacet;
}
