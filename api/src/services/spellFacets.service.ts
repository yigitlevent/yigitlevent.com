import { PgPool } from "../index";


export async function GetSpellFacets() {
	const query = 'select "Id" as "id", "Name" as "name", "Obstacle" as "obstacle", "Actions" as "actions", "Resource" as "resource"';
	const query1 = `${query} from dat."SpellOriginFacets";`;
	const query2 = `${query} from dat."SpellElementFacets";`;
	const query3 = `${query} from dat."SpellImpetusFacets";`;
	const query4 = `${query} from dat."SpellDurationFacets";`;
	const query5 = `${query} from dat."SpellAreaOfEffectFacets";`;

	return Promise.all([
		PgPool.query<SpellOriginFacet>(query1),
		PgPool.query<SpellDurationFacet>(query2),
		PgPool.query<SpellAreaOfEffectFacet>(query3),
		PgPool.query<SpellElementFacet>(query4),
		PgPool.query<SpellImpetusFacet>(query5)
	]).then((result): SpellFacets => {
		return { origins: result[0].rows, duration: result[1].rows, areaOfEffects: result[2].rows, elements: result[3].rows, impetus: result[4].rows };
	});
}
