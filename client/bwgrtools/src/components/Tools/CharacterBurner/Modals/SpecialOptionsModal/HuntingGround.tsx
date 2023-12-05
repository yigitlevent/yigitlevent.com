import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment, useCallback } from "react";

import { useCharacterBurnerBasicsStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerLifepathStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerMiscStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { Clamp, RandomNumber } from "../../../../../utils/misc";


export function HuntingGround(): JSX.Element {
	const { stock } = useCharacterBurnerBasicsStore();
	const { lifepaths } = useCharacterBurnerLifepathStore();
	const { special, setHuntingGround } = useCharacterBurnerMiscStore();

	const rollTerritory = useCallback(() => {
		const huntingGrounds: HuntingGroundsList[] = ["Waste", "Marginal", "Typical", "Plentiful", "Untouched"];
		const lastLp = lifepaths[lifepaths.length - 1];
		const roll = RandomNumber(1, 6) + RandomNumber(1, 6) + (lastLp.name === "Dominant" && lastLp.setting[1] === "Wild Pack" ? 1 : 0);

		let category = 0;
		if (roll === 2) category = 0;
		else if (roll < 7) category = 1;
		else if (roll < 10) category = 2;
		else if (roll < 12) category = 3;
		else category = 4;

		const lastSetting = lastLp.setting;
		if (["Captive", "Slave to the Legion", "Outcast Wolf"].includes(lastSetting[1])) {
			category = category - 1;
		}
		else if (lastSetting[1] === "Spirit Hunter") {
			category = category + 1;
		}
		else if (lastSetting[1] === "Ghost of the Deeping Wood") {
			category = category + 2;
		}

		setHuntingGround(huntingGrounds[Clamp(category, 0, 4)]);
	}, [setHuntingGround, lifepaths]);

	return (
		<Fragment>
			{stock[1] === "Great Wolf"
				? <Fragment>
					<Grid item xs={1}>
						<Typography variant="h5" sx={{ display: "inline-block" }}>Hunting Ground</Typography>
					</Grid>

					<Grid item xs={1}>
						{special.stock.huntingGround}
					</Grid>

					<Grid item>
						<Button variant="outlined" size="small" onClick={() => rollTerritory()} disabled={special.stock.huntingGround !== undefined}>Roll</Button>
					</Grid>
				</Fragment>
				: null}
		</Fragment>
	);
}
