import { MagicData, MiscMagicElements, MiscMagicFacets } from "../../../../client/bwgrtools/src/data/magic";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";


export function processMagicalFacets(): Processed {
	const facets = [MagicData, MiscMagicElements, MiscMagicFacets].flat().flat();

	const magicalFacetGroupRefs: Reference[] = [];
	const datMagicalFacetGroups: string[] =
		[...new Set(facets.map(facet => facet.group))]
			.flat()
			.map((facetGroup, i) => {
				magicalFacetGroupRefs.push([i, facetGroup]);
				return `(${i}, '${facetGroup}')`;
			});


	const magicalFacetRefs: Reference[] = [];
	const datMagicalFacets: string[] =
		facets
			.map((facet, i) => {
				magicalFacetRefs.push([i, `${facet.group}➞${facet.name}`]);
				const groupRef = findIndex("MagicalFacetGroups", facet.group, { "MagicalFacetGroups": magicalFacetGroupRefs });
				return `(${i}, '${facet.name}', ${groupRef[0]}, ${facet.obstacle}, ${facet.actions}, ${facet.resource}, ${facet.type === "Alternative"})`;
			});

	return {
		references: { MagicalFacetGroups: magicalFacetRefs, MagicalFacets: magicalFacetRefs },
		data: [
			arrayToSQL("dat", "MagicalFacetGroups", '"Id", "Name"', datMagicalFacetGroups),
			arrayToSQL("dat", "MagicalFacets", '"Id", "Name", "GroupId", "Obstacle", "Actions", "Resource", "IsAlternative"', datMagicalFacets)
		]
	};
}
