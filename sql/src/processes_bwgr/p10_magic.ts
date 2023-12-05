import { arrayToSQL } from "../util/arrayToSql";


export function processMagic(): Processed {
	const spellFacetTypesRef: Reference[] = [];

	const datSpellFacetTypes =
		["Origin", "Duration", "Area of Effect", "Element", "Impetus"].map((v, i) => {
			spellFacetTypesRef.push([i, v]);
			return `(${i}, '${v}')`;
		});


	const spellOriginFacetsRef: Reference[] = [];

	const datSpellOriginFacets = [
		{ name: "Personal", obstacle: 2, actions: 1, resource: 3 },
		{ name: "Presence", obstacle: 3, actions: 3, resource: 9 },
		{ name: "Sight", obstacle: 4, actions: 5, resource: 15 }
	].map((facet, i) => {
		spellOriginFacetsRef.push([i, facet.name]);
		return `(${i}, '${facet.name}', ${facet.obstacle}, ${facet.actions}, ${facet.resource})`;
	});


	const spellDurationFacetsRef: Reference[] = [];

	const datSpellDurationFacets = [
		{ name: "Instantaneous", obstacle: 1, actions: 1, resource: 3 },
		{ name: "Sustained", obstacle: 2, actions: 2, resource: 4 },
		{ name: "Elapsed Time", obstacle: -1, actions: -1, resource: -1 },
		{ name: "Permanent", obstacle: 10, actions: 500, resource: 1302 }
	].map((facet, i) => {
		spellDurationFacetsRef.push([i, facet.name]);
		return `(${i}, '${facet.name}', ${facet.obstacle}, ${facet.actions}, ${facet.resource})`;
	});


	const spellAreaOfEffectFacetsRef: Reference[] = [];

	const datSpellAreaOfEffectFacets = [
		{ name: "Caster", obstacle: 1, actions: 1, resource: 3 },
		{ name: "Single Target", obstacle: 2, actions: 2, resource: 6 },
		{ name: "Presence", obstacle: 3, actions: 4, resource: 9 },
		{ name: "Natural Effect", obstacle: 4, actions: 8, resource: 18 },
		{ name: "Measured Area", obstacle: -1, actions: -1, resource: -1 }
	].map((facet, i) => {
		spellAreaOfEffectFacetsRef.push([i, facet.name]);
		return `(${i}, '${facet.name}', ${facet.obstacle}, ${facet.actions}, ${facet.resource})`;
	});


	const spellElementFacetsRef: Reference[] = [];

	const datSpellElementFacets = [
		{ name: "Anima", obstacle: 5, actions: 9, resource: 24 },
		{ name: "Arcana", obstacle: 5, actions: 24, resource: 45 },
		{ name: "Heaven", obstacle: 4, actions: 30, resource: 39 },
		{ name: "White", obstacle: 5, actions: 4, resource: 18 },
		{ name: "Fire", obstacle: 5, actions: 2, resource: 15 },
		{ name: "Air", obstacle: 4, actions: 2, resource: 12 },
		{ name: "Earth", obstacle: 3, actions: 8, resource: 12 },
		{ name: "Water", obstacle: 4, actions: 6, resource: 15 }
	].map((facet, i) => {
		spellElementFacetsRef.push([i, facet.name]);
		return `(${i}, '${facet.name}', ${facet.obstacle}, ${facet.actions}, ${facet.resource})`;
	});


	const spellImpetusFacetsRef: Reference[] = [];

	const datSpellImpetusFacets = [
		{ name: "Create", obstacle: 8, actions: 4, resource: 42 },
		{ name: "Destroy", obstacle: 6, actions: 7, resource: 32 },
		{ name: "Tax", obstacle: 9, actions: 33, resource: 117 },
		{ name: "Transmute", obstacle: 5, actions: 1, resource: 15 },
		{ name: "Control", obstacle: 7, actions: 13, resource: 48 },
		{ name: "Influence", obstacle: 4, actions: 1, resource: 9 },
		{ name: "Enhance", obstacle: 10, actions: 27, resource: 120 }
	].map((facet, i) => {
		spellImpetusFacetsRef.push([i, facet.name]);
		return `(${i}, '${facet.name}', ${facet.obstacle}, ${facet.actions}, ${facet.resource})`;
	});

	return {
		name: "p10_magic",
		references: {
			SpellFacetTypes: spellFacetTypesRef,
			SpellOriginFacets: spellOriginFacetsRef,
			SpellDurationFacets: spellDurationFacetsRef,
			SpellAreaOfEffectFacets: spellAreaOfEffectFacetsRef,
			SpellElementFacets: spellElementFacetsRef,
			SpellImpetusFacets: spellImpetusFacetsRef
		},
		data: [
			arrayToSQL("bwgr", "SpellFacetTypes", '"Id", "Name"', datSpellFacetTypes),
			arrayToSQL("bwgr", "SpellOriginFacets", '"Id", "Name", "Obstacle", "Actions", "Resource"', datSpellOriginFacets),
			arrayToSQL("bwgr", "SpellDurationFacets", '"Id", "Name", "Obstacle", "Actions", "Resource"', datSpellDurationFacets),
			arrayToSQL("bwgr", "SpellAreaOfEffectFacets", '"Id", "Name", "Obstacle", "Actions", "Resource"', datSpellAreaOfEffectFacets),
			arrayToSQL("bwgr", "SpellElementFacets", '"Id", "Name", "Obstacle", "Actions", "Resource"', datSpellElementFacets),
			arrayToSQL("bwgr", "SpellImpetusFacets", '"Id", "Name", "Obstacle", "Actions", "Resource"', datSpellImpetusFacets)
		]
	};
}
