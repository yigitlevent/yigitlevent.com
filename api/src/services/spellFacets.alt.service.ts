import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetAltSpellFacets(): Promise<BwgrAltSpellFacets> {
	const query = "select \"Id\" as \"id\", \"Name\" as \"name\", \"Obstacle\" as \"obstacle\", \"Actions\" as \"actions\", \"Resource\" as \"resource\"";
	const query1 = `${query} from bwgr."AltSpellOriginFacets";`;
	const query2 = `${query} from bwgr."AltSpellPrimeElementFacets";`;
	const query3 = `${query} from bwgr."AltSpellLowerElementFacets";`;
	const query4 = `${query} from bwgr."AltSpellHigherElementFacets";`;
	const query5 = `${query} from bwgr."AltSpellImpetusFacets";`;

	const queryWithSubfacet = "select \"Id\" as \"id\", \"Name\" as \"name\", \"Obstacle\" as \"obstacle\", \"Actions\" as \"actions\", \"Resource\" as \"resource\", \"SubFacet\" as \"subfacet\"";
	const query6 = `${queryWithSubfacet} from bwgr."AltSpellDurationFacets";`;
	const query7 = `${queryWithSubfacet} from bwgr."AltSpellAreaOfEffectFacets";`;

	const log = new Logger("GetAltSpellFacets Querying");
	return Promise.all([
		PgPool.query<BwgrSpellOriginFacet>(query1),
		PgPool.query<BwgrSpellElementFacet>(query2),
		PgPool.query<BwgrSpellElementFacet>(query3),
		PgPool.query<BwgrSpellElementFacet>(query4),
		PgPool.query<BwgrSpellImpetusFacet>(query5),
		PgPool.query<BwgrSpellDurationFacet>(query6),
		PgPool.query<BwgrSpellAreaOfEffectFacet>(query7)
	]).then((result): BwgrAltSpellFacets => {
		log.end();
		const res = {
			origins: result[0].rows,
			primeElements: result[1].rows,
			lowerElements: result[2].rows,
			higherElements: result[3].rows,
			impetus: result[4].rows,
			duration: result[5].rows,
			areaOfEffects: result[6].rows
		};
		return res;
	});
}
