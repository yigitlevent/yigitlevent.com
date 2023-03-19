import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { FightActionExtended } from "../../../hooks/stores/useFightPlannerStore";
import { FightActions } from "../../../data/fight";
import { GetResolutionString } from "../../../utils/getResolutionString";


export function FightPlannerActionDetails({ action }: { action: FightActionExtended; }) {
	return (
		<Stack spacing={0} sx={{ width: "100%" }}>
			{action.test
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Tests:</b>
					<Typography variant="body2">{action.test}</Typography>
				</Box>
				: null
			}

			<Box sx={{ margin: "0 0 10px" }}>
				<b>Action Type:</b>
				<Typography variant="body2">{action.group}</Typography>
			</Box>

			{action.restrictions
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Restrictions:</b>
					{action.restrictions.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null
			}

			{action.effect
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Effect:</b>
					{action.effect.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null
			}

			{action.special
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Special:</b>
					{action.special.split("<br>").map((v, i) =>
						<Typography variant="body2" key={i}>{v}</Typography>
					)}
				</Box>
				: null
			}

			{action.actionCost
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Action Cost:</b>
					{<Typography variant="body2">{action.actionCost}</Typography>}
				</Box>
				: null
			}

			{action.resolution
				? <Box sx={{ margin: "0 0 10px" }}>
					<b>Resolution:</b>
					{FightActions.map((v, i) => {
						if (action.resolution) {
							const res = action.resolution[v.name];
							return (
								<Typography variant="body2" key={i}>
									{(res) ? GetResolutionString(res) : "—"}
								</Typography>
							);
						}
						return null;
					})}
				</Box>
				: null
			}
		</Stack>
	);
}
