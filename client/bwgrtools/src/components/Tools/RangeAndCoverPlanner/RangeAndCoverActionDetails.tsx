import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useRangeAndCoverPlannerStore } from "../../../hooks/featureStores/useRangeAndCoverPlannerStore";
import { GetActionResolutionString } from "../../../utils/GetActionResolutionString";


export function RangeAndCoverActionDetails({ action, volleyIndex }: { action: BwgrRaCAction; volleyIndex: number; }): JSX.Element {
	const { deleteAction, toggleActionVisibility } = useRangeAndCoverPlannerStore();

	return (
		<Stack spacing={0} sx={{ width: "100%" }}>
			<Typography variant="h5" sx={{ marginBottom: "8px" }}>{action.name}</Typography>

			<Box sx={{ margin: "0 0 10px" }}>
				<b>Action Group:</b>
				<Typography variant="body2">{action.group[1]}</Typography>
			</Box>

			{action.effect
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Effect:</b>

					{action.effect.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null}

			{action.specialRestriction
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Special Restriction:</b>

					{action.specialRestriction.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null}

			{action.specialAction
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Special Action:</b>

					{action.specialAction.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null}

			{action.however
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>There is a big &quot;however&quot;:</b>

					{action.however.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null}

			{action.resolutions
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Resolution:</b>

					{action.resolutions
						.map(v => GetActionResolutionString(v))
						.map((v, i) => <Typography variant="body2" key={i}>{v}</Typography>)}
				</Box>
				: null}

			<Grid container>
				<Button size="large" sx={{ width: "50%", padding: "16px 8px", marginTop: "8px" }} onClick={() => toggleActionVisibility(volleyIndex)}>Hide</Button>
				<Button size="large" sx={{ width: "50%", padding: "16px 8px", marginTop: "8px" }} onClick={() => deleteAction(volleyIndex)} >Delete</Button>
			</Grid>
		</Stack>
	);
}
