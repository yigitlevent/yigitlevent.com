import { MagicData, MiscMagicElements, MiscMagicFacets } from "../../../../client/bwgrtools/src/data/magic";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";


export function processMagicFacets(): Processed {
	const facets = [MagicData, MiscMagicElements, MiscMagicFacets].flat().flat();

	const magicFacetGroupRefs: Reference[] = [];
	const datMagicFacetGroups: string[] =
		[...new Set(facets.map(facet => facet.group))]
			.flat()
			.map((facetGroup, i) => {
				magicFacetGroupRefs.push([i, facetGroup]);
				return `(${i}, '${facetGroup}')`;
			});


	const magicFacetRefs: Reference[] = [];
	const datMagicFacets: string[] =
		facets
			.map((facet, i) => {
				magicFacetRefs.push([i, `${facet.group}➞${facet.name}`]);
				const groupRef = findIndex("MagicFacetGroups", facet.group, { "MagicFacetGroups": magicFacetGroupRefs });
				return `(${i}, '${facet.name}', ${groupRef[0]}, ${facet.obstacle}, ${facet.actions}, ${facet.resource}, ${facet.type === "Alternative"})`;
			});

	return {
		references: { MagicFacetGroups: magicFacetRefs, MagicFacets: magicFacetRefs },
		data: [
			arrayToSQL("dat", "MagicFacetGroups", '"Id", "Name"', datMagicFacetGroups),
			arrayToSQL("dat", "MagicFacets", '"Id", "Name", "GroupId", "Obstacle", "Actions", "Resource", "IsAlternative"', datMagicFacets)
		]
	};
}
