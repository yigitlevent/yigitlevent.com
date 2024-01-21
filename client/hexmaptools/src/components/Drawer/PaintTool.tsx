import { Button, Divider, Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";

import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";
import { THEME } from "../../theme/theme";


export function PaintTool(): JSX.Element {
	const [hexTypes, paintTool, setSelectedHexType] = useHexmapStore(state => [state.hexTypes, state.tools.paintTool, state.setSelectedHexType]);

	return (
		<Grid container columns={2} columnGap={1} rowGap={1} flexDirection="row" flexWrap="wrap">
			<Grid sx={{ height: "60px", width: "60px" }}>
				<Box
					sx={{
						display: "block",
						height: "60px",
						width: "60px",
						border: `1px solid ${THEME.colorSchemes.dark.palette.neutral.softActiveBg}`,
						background: hexTypes[paintTool.selectedType].fill.color
					}}
				/>
			</Grid>

			<Grid>
				<Typography level="body-sm">Selected Hex Type:</Typography>
				<Typography level="body-md">{hexTypes[paintTool.selectedType].name}</Typography>
			</Grid>

			<Grid xs={2}>
				<Divider />
			</Grid>

			{hexTypes.map((hexType, index) => (
				<Grid key={index} flexGrow={1} sx={{ width: "40%" }}>
					<Button
						title={hexType.name}
						onClick={() => setSelectedHexType(hexType.id)}
						sx={{
							width: "100%",
							border: `1px solid ${THEME.colorSchemes.dark.palette.neutral.softActiveBg}`,
							background: hexType.fill.color
						}}
					>
						{hexType.name}
					</Button>
				</Grid>
			))}
		</Grid>
	);
}
