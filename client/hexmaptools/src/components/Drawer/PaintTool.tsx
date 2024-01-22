import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import Typography from "@mui/joy/Typography";

import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";
import { useToolsStore } from "../../hooks/apiStores/usetToolsStore";
import { THEME } from "../../theme/theme";


function HexPaintTool(): JSX.Element {
	const [hexPaintTool, setSelectedHexType] = useToolsStore(state => [state.hexPaintTool, state.setSelectedHexType]);
	const [hexTypes] = useHexmapStore(state => [state.hexTypes]);

	return (
		<Stack rowGap={1} flexDirection="column">
			<Stack rowGap={1} flexDirection="column">
				<Typography level="body-sm">Selected:</Typography>

				<Grid container columnGap={1}>
					<Grid sx={{ width: "60px" }}>
						<Box
							sx={{
								height: "60px",
								width: "60px",
								border: `1px solid ${THEME.colorSchemes.dark.palette.neutral.softActiveBg}`,
								background: hexTypes[hexPaintTool.selectedType].fill.color
							}}
						/>
					</Grid>

					<Grid xs={1}>
						<Typography level="body-md">
							{hexTypes[hexPaintTool.selectedType].name}
						</Typography>
					</Grid>
				</Grid>
			</Stack>

			<Divider />

			<Stack rowGap={1} flexDirection="column">
				{hexTypes.map((hexType, index) => (
					<Button
						key={index}
						size="sm"
						onClick={() => setSelectedHexType(hexType.id)}
						sx={{
							width: "100%",
							border: `1px solid ${THEME.colorSchemes.dark.palette.neutral.softActiveBg}`,
							background: hexType.fill.color
						}}
					>
						{hexType.name}
					</Button>
				))}
			</Stack>
		</Stack>
	);
}

function AreaPaintTool(): JSX.Element {
	const [areaPaintTool, setSelectedAreaType] = useToolsStore(state => [state.areaPaintTool, state.setSelectedAreaType]);
	const [areaTypes] = useHexmapStore(state => [state.areaTypes]);

	return (
		<Stack rowGap={1} flexDirection="column" flexWrap="wrap">
			<Stack rowGap={1} flexDirection="column">
				<Typography level="body-sm">Selected:</Typography>

				<Grid container columnGap={1}>
					<Grid sx={{ width: "60px" }}>
						<Box
							sx={{
								height: "60px",
								width: "60px",
								border: `1px solid ${THEME.colorSchemes.dark.palette.neutral.softActiveBg}`,
								background: areaTypes[areaPaintTool.selectedType].fill.color
							}}
						/>
					</Grid>

					<Grid xs={1}>
						<Typography level="body-md">
							{areaTypes[areaPaintTool.selectedType].name}
						</Typography>
					</Grid>
				</Grid>
			</Stack>

			<Divider />

			<Stack rowGap={1} flexDirection="column">
				{areaTypes.map((areaType, index) => (
					<Button
						key={index}
						size="sm"
						onClick={() => setSelectedAreaType(areaType.id)}
						sx={{
							width: "100%",
							border: `1px solid ${THEME.colorSchemes.dark.palette.neutral.softActiveBg}`,
							background: areaType.fill.color
						}}
					>
						{areaType.name}
					</Button>
				))}
			</Stack>
		</Stack >
	);
}

export function PaintTool(): JSX.Element {
	const [selectedPaintTool, setSelectedPaintTool] = useToolsStore(state => [state.selectedPaintTool, state.setSelectedPaintTool]);

	return (
		<Tabs value={selectedPaintTool} onChange={(_, a) => setSelectedPaintTool(a as HmPaintTool)}>
			<TabList tabFlex={1}>
				<Tab value="Hex">Hex</Tab>
				<Tab value="Area">Area</Tab>
			</TabList>

			<TabPanel value="Hex">
				<HexPaintTool />
			</TabPanel>

			<TabPanel value="Area">
				<AreaPaintTool />
			</TabPanel>
		</Tabs>
	);
}
