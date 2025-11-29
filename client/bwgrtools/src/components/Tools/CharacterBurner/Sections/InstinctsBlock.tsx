import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { useCharacterBurnerBasicsStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerMiscStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { GenericGrid } from "../../../Shared/Grids";


export function Instincts(): React.JSX.Element {
	const { limits } = useCharacterBurnerMiscStore();
	const { instincts, setInstinct } = useCharacterBurnerBasicsStore();

	return (
		<GenericGrid columns={6} center extraBottomMargin>
			<Grid size={{ xs: 4 }}>
				<Typography variant="h4">Instincts</Typography>
			</Grid>

			<Fragment>
				{instincts.slice(0, limits.instincts).map((v, i) => (
					<Grid key={i} size={{ xs: 6 }}>
						<TextField
							label={i !== 3 ? `Instinct ${(i + 1).toString()}` : instincts[3].name}
							value={v.instinct}
							onChange={(e) => { setInstinct(i, e.target.value); }}
							fullWidth
							variant="standard"
						/>
					</Grid>
				))}
			</Fragment>
		</GenericGrid>
	);
}
