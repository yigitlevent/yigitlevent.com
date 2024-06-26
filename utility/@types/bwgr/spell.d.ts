type BwgrOriginFacetId = Nominal<number, "BwgrOriginFacetId">;
type BwgrDurationFacetId = Nominal<number, "BwgrDurationFacetId">;
type BwgrAreaOfEffectFacetId = Nominal<number, "BwgrAreaOfEffectFacetId">;
type BwgrElementFacetId = Nominal<number, "BwgrElementFacetId">;
type BwgrImpetusFacetId = Nominal<number, "BwgrImpetusFacetId">;

type ElementCategories = "primeElements" | "lowerElements" | "higherElements";

interface BwgrFacet {
	name: string;
	obstacle: number;
	actions: number;
	resource: number;
	subfacet?: string;
}

interface BwgrSpellOriginFacet extends BwgrFacet {
	id: BwgrOriginFacetId;
}

interface BwgrSpellDurationFacet extends BwgrFacet {
	id: BwgrDurationFacetId;
}

interface BwgrSpellAreaOfEffectFacet extends BwgrFacet {
	id: BwgrAreaOfEffectFacetId;
}

interface BwgrSpellElementFacet extends BwgrFacet {
	id: BwgrElementFacetId;
}

interface BwgrSpellImpetusFacet extends BwgrFacet {
	id: BwgrImpetusFacetId;
}

interface BwgrSpellFacets {
	origins: BwgrSpellOriginFacet[];
	elements: BwgrSpellElementFacet[];
	impetus: BwgrSpellImpetusFacet[];
	areaOfEffects: BwgrSpellAreaOfEffectFacet[];
	duration: BwgrSpellDurationFacet[];
}

interface BwgrAltSpellFacets {
	origins: BwgrSpellOriginFacet[];
	primeElements: BwgrSpellElementFacet[];
	lowerElements: BwgrSpellElementFacet[];
	higherElements: BwgrSpellElementFacet[];
	impetus: BwgrSpellImpetusFacet[];
	areaOfEffects: BwgrSpellAreaOfEffectFacet[];
	duration: BwgrSpellDurationFacet[];
}

interface BwgrSpellFacetSelected {
	originId: BwgrSpellOriginFacet;
	elementId: BwgrSpellElementFacet;
	impetusId: BwgrSpellImpetusFacet;
	areaOfEffectId: BwgrSpellAreaOfEffectFacet;
	durationId: BwgrSpellDurationFacet;
}
