import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { GetActionResolutionString } from "../../../utils/GetActionResolutionString";


export function RangeAndCoverActionDetails({ action }: { action: BwgrRaCAction; }): JSX.Element {
	return (
		<Stack spacing={0} sx={{ width: "100%" }}>
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
					{action.resolutions.map((v, i) => <Typography variant="body2" key={i}>{GetActionResolutionString(v)}</Typography>)}
				</Box>
				: null}
		</Stack>
	);
}
