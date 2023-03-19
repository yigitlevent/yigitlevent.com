import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { RangeAndCoverActions, RangeAndCoverAction } from "../../../data/rangeAndCover";
import { GetResolutionString } from "../../../utils/getResolutionString";


export function RangeAndCoverActionDetails({ action }: { action: RangeAndCoverAction; }) {
	return (
		<Stack spacing={0} sx={{ width: "100%" }}>
			{action.effect
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Effect:</b>
					{action.effect.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null
			}

			{action.specialRestriction
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Special Restriction:</b>
					{action.specialRestriction.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null
			}

			{action.specialAction
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Special Action:</b>
					{action.specialAction.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null
			}

			{action.however
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>There is a big &quot;however&quot;:</b>
					{action.however.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null
			}

			{action.resolution
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Resolution:</b>
					{RangeAndCoverActions.map((v, i) => {
						const res = action.resolution[v.name];
						return (
							<Typography variant="body2" key={i}>
								{(res) ? GetResolutionString(res) : "—"}
							</Typography>
						);
					})}
				</Box>
				: null
			}
		</Stack>
	);
}
