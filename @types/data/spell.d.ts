type OriginFacetId = Nominal<number, "OriginFacetId">;
type DurationFacetId = Nominal<number, "DurationFacetId">;
type AreaOfEffectFacetId = Nominal<number, "AreaOfEffectFacetId">;
type ElementFacetId = Nominal<number, "ElementFacetId">;
type ImpetusFacetId = Nominal<number, "ImpetusFacetId">;

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
