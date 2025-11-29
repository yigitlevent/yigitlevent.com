import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useCharacterBurnerLifepathStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerResourceStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerResource";
import { useCharacterBurnerSkillStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerSkill";
import { useCharacterBurnerTraitStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerTrait";


export function RandomLifepathsBasics({ chosenLifepaths }: { chosenLifepaths: BwgrLifepath[]; }): React.JSX.Element {
	const { getAge, getMentalPool, getPhysicalPool, getEitherPool } = useCharacterBurnerLifepathStore();
	const { getResourcePools } = useCharacterBurnerResourceStore();
	const { getSkillPools } = useCharacterBurnerSkillStore();
	const { getTraitPools } = useCharacterBurnerTraitStore();

	const age = getAge(chosenLifepaths);
	const resourcePoints = getResourcePools(chosenLifepaths);
	const mentalPool = getMentalPool(chosenLifepaths);
	const physicalPool = getPhysicalPool(chosenLifepaths);
	const eitherPool = getEitherPool(chosenLifepaths);
	const skillPools = getSkillPools(chosenLifepaths);
	const traitPools = getTraitPools(chosenLifepaths);

	return (
		<Grid container columns={2}>
			<Grid size={{ xs: 1 }}>
				<Typography variant="caption">Years: {age}</Typography>
			</Grid>

			<Grid size={{ xs: 1 }}>
				<Typography variant="caption">Resources: {resourcePoints.total}</Typography>
			</Grid>

			<Grid size={{ xs: 1 }}>
				<Typography variant="caption">Stats: {mentalPool.total}M, {physicalPool.total}P, {eitherPool.total}M/P</Typography>
			</Grid>

			<Grid size={{ xs: 1 }}>
				<Typography variant="caption">Trait Points: {traitPools.total}</Typography>
			</Grid>

			<Grid size={{ xs: 1 }}>
				<Typography variant="caption">General Skill Points: {skillPools.general.total}</Typography>
			</Grid>

			<Grid size={{ xs: 1 }}>
				<Typography variant="caption">Lifepath Skill Points: {skillPools.lifepath.total}</Typography>
			</Grid>
		</Grid>
	);
}
