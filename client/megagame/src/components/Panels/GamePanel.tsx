import { Box, Typography } from "@mui/material";

import { useMegagameStore } from "../../hooks/apiStores/useMegagameStore";


export function GamePanel(): React.JSX.Element {
	const { megagame } = useMegagameStore();


	return (
		<Box>
			<Typography variant="h4">Game Panel</Typography>

			{megagame ? (
				<Typography variant="body1">
					Current Game: {megagame.name}
				</Typography>
			) : (
				<Typography variant="body1">No game data available.</Typography>
			)}
		</Box>
	);
}
