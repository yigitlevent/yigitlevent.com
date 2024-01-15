import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { GetResolutionString } from "../../../utils/getActionResolutionString";


export function DuelOfWitsActionDetails({ action }: { action: BwgrDoWAction; }): JSX.Element {
	return (
		<Stack spacing={0} sx={{ width: "100%" }}>
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
					{action.resolutions.map((v, i) => <Typography variant="body2" key={i}>{GetResolutionString(v)}</Typography>)}
				</Box>
				: null}
		</Stack>
	);
}
