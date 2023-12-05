import { Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment, useCallback } from "react";

import { useRulesetStore } from "../../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerBasicsStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerLifepathStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerMiscStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { GetOrdinalSuffix, RandomNumber } from "../../../../../utils/misc";


export function BrutalLife(): JSX.Element {
	const ruleset = useRulesetStore();
	const { stock } = useCharacterBurnerBasicsStore();
	const { lifepaths } = useCharacterBurnerLifepathStore();
	const { special, addBrutalLifeTrait } = useCharacterBurnerMiscStore();

	const rollBrutalLife = useCallback((lifepathNumber: number) => {
		const isBrutal = (lifepathNumber < 10)
			? RandomNumber(1, 6) <= 4
			: RandomNumber(1, 6) <= 2;

		let traitToAdd: TraitId | undefined = undefined;

		if (isBrutal) {
			switch (lifepathNumber) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					break;
				case 5:
					traitToAdd = ruleset.getTrait("Missing Digit").id;
					break;
				case 6:
					traitToAdd = ruleset.getTrait("Lame").id;
					break;
				case 7:
					traitToAdd = ruleset.getTrait("Missing Eye").id;
					break;
				case 8:
					traitToAdd = ruleset.getTrait("Missing Hand").id;
					break;
				default:
					traitToAdd = ruleset.getTrait("Missing Limb").id;
					break;
			}
		}

		addBrutalLifeTrait(traitToAdd);
	}, [addBrutalLifeTrait, ruleset]);


	return (
		<Fragment>
			{stock[1] === "Orc"
				? lifepaths.length > 4
					? lifepaths.slice(4).map((v, i) => (
						<Fragment key={i}>
							<Grid item xs={1}>
								<Typography variant="h5" sx={{ display: "inline-block" }}>{GetOrdinalSuffix(i + 5)} Lifepath: {v.name}</Typography>
							</Grid>

							<Grid item xs={1}>
								{special.stock.brutalLifeTraits[i]}
							</Grid>

							<Grid item>
								<Button
									variant="outlined" size="small" onClick={() => rollBrutalLife(i + 5)}
									disabled={special.stock.brutalLifeTraits.length >= i + 5}
								>
									Roll
								</Button>
							</Grid>
						</Fragment>
					)
					)
					: <Grid item xs={3}>
						<Alert severity="info">
							Orc character only needs to roll for Brutal Life after 5th lifepath.
						</Alert>
					</Grid>
				: null}
		</Fragment>
	);
}
