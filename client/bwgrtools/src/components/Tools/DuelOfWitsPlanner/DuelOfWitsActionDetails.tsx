import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useDuelOfWitsPlannerStore } from "../../../hooks/featureStores/useDuelOfWitsPlannerStore";
import { GetActionResolutionString } from "../../../utils/GetActionResolutionString";


export function DuelOfWitsActionDetails({ action, volleyIndex }: { action: BwgrDoWAction; volleyIndex: number; }): JSX.Element {
	const { deleteAction, toggleActionVisibility } = useDuelOfWitsPlannerStore();

	return (
		<Stack spacing={0} sx={{ width: "100%" }}>
			<Typography variant="h5" sx={{ marginBottom: "8px" }}>{action.name}</Typography>

			{action.tests
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Tests:</b>
					<Typography variant="body2">{[...action.tests.abilities, ...action.tests.skills].map(v => v[1]).join(", ")}</Typography>
				</Box>
				: null}

			{action.speakingThePart
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Speaking the part:</b>

					{action.speakingThePart.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null}

			{action.special
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Special:</b>

					{action.special.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null}

			{action.effect
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Effects:</b>

					{action.effect.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null}

			{action.resolutions
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Resolution:</b>
					{action.resolutions.map((v, i) => <Typography variant="body2" key={i}>{GetActionResolutionString(v)}</Typography>)}
				</Box>
				: null}

			<Grid container>
				<Button size="large" sx={{ width: "50%", padding: "16px 8px", marginTop: "8px" }} onClick={() => toggleActionVisibility(volleyIndex)}>Hide</Button>
				<Button size="large" sx={{ width: "50%", padding: "16px 8px", marginTop: "8px" }} onClick={() => deleteAction(volleyIndex)} >Delete</Button>
			</Grid>
		</Stack>
	);
}
