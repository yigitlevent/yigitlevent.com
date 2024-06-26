import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { useRulesetStore } from "../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerLifepathStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerStatStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerStat";
import { AbilityButton } from "../../../Shared/AbilityButton";
import { GenericGrid } from "../../../Shared/Grids";
import { BlockText } from "../BlockText";


export function Stats(): JSX.Element {
	const { abilities } = useRulesetStore();
	const { getMentalPool, getPhysicalPool, getEitherPool } = useCharacterBurnerLifepathStore();
	const { shiftStatShade, modifyStatExponent, getStat } = useCharacterBurnerStatStore();

	const mental = getMentalPool();
	const physical = getPhysicalPool();
	const either = getEitherPool();

	const mentalText = `Mental Pool / Total: ${mental.total}, Remaining: ${mental.remaining}`;
	const physicalText = `Physical Pool / Total: ${physical.total}, Remaining: ${physical.remaining}`;
	const eitherText = `Either Pool / Total: ${either.total}, Remaining: ${either.remaining}`;

	return (
		<GenericGrid columns={6} center spacing={[0, 2]} sx={{ marginTop: 3 }} extraBottomMargin>
			<Grid item xs={6}>
				<Typography variant="h4">Stats</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>{mentalText}</Typography>
				<Typography>{physicalText}</Typography>
				<Typography>{eitherText}</Typography>
			</Grid>

			<Fragment>
				{abilities
					.filter(a => a.abilityType[1].includes("Stat"))
					.sort(((pv, cv) => (pv.id as unknown as number) - (cv.id as unknown as number)))
					.map((v, i) => {
						const stat = getStat(v.name);
						return (
							<Grid key={i} item xs={6} sm={3} md={2}>
								<GenericGrid columns={5} center="h" hasBackground={1}>
									<BlockText text={v.name} hasLeftPadding />

									<Grid item>
										<AbilityButton name={v.name} onClick={() => shiftStatShade(v.name)}>{stat.shade}</AbilityButton>
										<AbilityButton name={v.name} onClick={() => modifyStatExponent(v.name)} onContextMenu={() => modifyStatExponent(v.name, true)}>{stat.exponent}</AbilityButton>
									</Grid>
								</GenericGrid>
							</Grid>
						);
					})}
			</Fragment>
		</GenericGrid>
	);
}
