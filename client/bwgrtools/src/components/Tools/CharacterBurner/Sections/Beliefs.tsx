import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { useCharacterBurnerBasicsStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerMiscStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { GenericGrid } from "../../../Shared/Grids";


export function Beliefs(): JSX.Element {
	const { limits } = useCharacterBurnerMiscStore();
	const { beliefs, setBelief } = useCharacterBurnerBasicsStore();

	return (
		<GenericGrid columns={6} center extraBottomMargin>
			<Grid item xs={4}>
				<Typography variant="h4">Beliefs</Typography>
			</Grid>

			<Fragment>
				{beliefs.slice(0, limits.beliefs).map((v, i) => (
					<Grid key={i} item xs={6}>
						<TextField
							label={i !== 3 ? `Belief ${i + 1}` : beliefs[3].name}
							value={v.belief}
							onChange={(e) => setBelief(i, e.target.value)}
							fullWidth
							variant="standard"
						/>
					</Grid>
				))}
			</Fragment>
		</GenericGrid>
	);
}
