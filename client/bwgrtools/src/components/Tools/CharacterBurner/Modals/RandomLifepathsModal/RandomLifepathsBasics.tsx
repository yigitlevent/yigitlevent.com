import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useCharacterBurnerLifepathStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerResourceStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerResource";
import { useCharacterBurnerSkillStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerSkill";
import { useCharacterBurnerTraitStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerTrait";


export function RandomLifepathsBasics(): JSX.Element {
	const { getAge, getMentalPool, getPhysicalPool, getEitherPool } = useCharacterBurnerLifepathStore();
	const { getResourcePoints } = useCharacterBurnerResourceStore();
	const { getSkillPools } = useCharacterBurnerSkillStore();
	const { getTraitPools } = useCharacterBurnerTraitStore();

	const mentalPool = getMentalPool();
	const physicalPool = getPhysicalPool();
	const eitherPool = getEitherPool();
	const skillPools = getSkillPools();
	const traitPools = getTraitPools();

	return (
		<Grid container columns={2}>
			<Grid item xs={1}>
				<Typography variant="caption">Years: {getAge()}</Typography>
			</Grid>

			<Grid item xs={1}>
				<Typography variant="caption">Resources: {getResourcePoints()}</Typography>
			</Grid>

			<Grid item xs={1}>
				<Typography variant="caption">Stats: {mentalPool.total}M, {physicalPool.total}P, {eitherPool.total}M/P</Typography>
			</Grid>

			<Grid item xs={1}>
				<Typography variant="caption">Trait Points: {traitPools.total}</Typography>
			</Grid>

			<Grid item xs={1}>
				<Typography variant="caption">General Skill Points: {skillPools.general.total}</Typography>
			</Grid>

			<Grid item xs={1}>
				<Typography variant="caption">Lifepath Skill Points: {skillPools.lifepath.total}</Typography>
			</Grid>
		</Grid>
	);
}
