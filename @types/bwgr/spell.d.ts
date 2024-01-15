type BwgrOriginFacetId = Nominal<number, "BwgrOriginFacetId">;
type BwgrDurationFacetId = Nominal<number, "BwgrDurationFacetId">;
type BwgrAreaOfEffectFacetId = Nominal<number, "BwgrAreaOfEffectFacetId">;
type BwgrElementFacetId = Nominal<number, "BwgrElementFacetId">;
type BwgrImpetusFacetId = Nominal<number, "BwgrImpetusFacetId">;

interface BwgrFacet {
	name: string;
	obstacle: number;
	actions: number;
	resource: number;
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

interface BwgrSpellFacetSelected {
	originId: BwgrSpellOriginFacet;
	elementId: BwgrSpellElementFacet;
	impetusId: BwgrSpellImpetusFacet;
	areaOfEffectId: BwgrSpellAreaOfEffectFacet;
	durationId: BwgrSpellDurationFacet;
}
