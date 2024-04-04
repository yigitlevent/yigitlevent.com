import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetSpellFacets(): Promise<BwgrSpellFacets> {
	const query = "select \"Id\" as \"id\", \"Name\" as \"name\", \"Obstacle\" as \"obstacle\", \"Actions\" as \"actions\", \"Resource\" as \"resource\"";
	const query1 = `${query} from bwgr."SpellOriginFacets";`;
	const query2 = `${query} from bwgr."SpellElementFacets";`;
	const query3 = `${query} from bwgr."SpellImpetusFacets";`;
	const query4 = `${query} from bwgr."SpellDurationFacets";`;
	const query5 = `${query} from bwgr."SpellAreaOfEffectFacets";`;

	const log = new Logger("GetSpellFacets Querying");
	return Promise.all([
		PgPool.query<BwgrSpellOriginFacet>(query1),
		PgPool.query<BwgrSpellElementFacet>(query2),
		PgPool.query<BwgrSpellImpetusFacet>(query3),
		PgPool.query<BwgrSpellDurationFacet>(query4),
		PgPool.query<BwgrSpellAreaOfEffectFacet>(query5)
	]).then((result): BwgrSpellFacets => {
		log.end();
		const res = {
			origins: result[0].rows,
			elements: result[1].rows,
			impetus: result[2].rows,
			duration: result[3].rows,
			areaOfEffects: result[4].rows
		};
		return res;
	});
}
