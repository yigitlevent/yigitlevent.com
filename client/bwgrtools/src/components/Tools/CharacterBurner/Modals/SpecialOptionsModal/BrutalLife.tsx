import { Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment, useCallback } from "react";

import { useRulesetStore } from "../../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerBasicsStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerLifepathStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerMiscStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { GetOrdinalSuffix, RandomNumber } from "../../../../../utils/misc";
import { BlockTraitPopover } from "../../BlockText";


export function BrutalLife(): JSX.Element {
	const ruleset = useRulesetStore();
	const { stock } = useCharacterBurnerBasicsStore();
	const { lifepaths } = useCharacterBurnerLifepathStore();
	const { special, addBrutalLifeTrait } = useCharacterBurnerMiscStore();

	const rollBrutalLife = useCallback((lifepathNumber: number) => {
		const isBrutal
			= (lifepathNumber < 10)
				? RandomNumber(1, 6) <= 4
				: RandomNumber(1, 6) <= 2;

		let traitToAdd: [id: BwgrTraitId, name: string] | "No Trait" | undefined = "No Trait";

		if (isBrutal) {
			if (lifepathNumber === 5) {
				const trait = ruleset.getTrait("Missing Digit");
				traitToAdd = [trait.id, trait.name];
			}
			else if (lifepathNumber === 6) {
				const trait = ruleset.getTrait("Lame");
				traitToAdd = [trait.id, trait.name];
			}
			else if (lifepathNumber === 7) {
				const trait = ruleset.getTrait("Missing Eye");
				traitToAdd = [trait.id, trait.name];
			}
			else if (lifepathNumber === 8) {
				const trait = ruleset.getTrait("Missing Hand");
				traitToAdd = [trait.id, trait.name];
			}
			else if (lifepathNumber > 8) {
				const trait = ruleset.getTrait("Missing Limb");
				traitToAdd = [trait.id, trait.name];
			}
		}

		addBrutalLifeTrait(traitToAdd);
	}, [addBrutalLifeTrait, ruleset]);

	return (
		<Fragment>
			{stock[1] === "Orc"
				? lifepaths.length > 4
					? lifepaths.slice(4).map((v, i) => {
						const traitId = special.stock.brutalLifeTraits[i];
						return (
							<Fragment key={i}>
								<Grid item xs={1}>
									<Typography variant="h6" sx={{ display: "inline-block" }}>{GetOrdinalSuffix(i + 5)} Lifepath: {v.name}</Typography>
								</Grid>

								<Grid item xs={2}>
									{traitId
										? traitId === "No Trait"
											? <Typography sx={{ margin: "6px 0 0 8px" }}>No Trait</Typography>
											: <BlockTraitPopover trait={traitId} />
										: <Button variant="outlined" size="small" onClick={() => rollBrutalLife(i + 5)}>Roll</Button>}
								</Grid>
							</Fragment>
						);
					})
					: <Grid item xs={3}>
						<Alert severity="info">
							Orc character only needs to roll for Brutal Life after 5th lifepath.
						</Alert>
					</Grid>
				: null}
		</Fragment>
	);
}
