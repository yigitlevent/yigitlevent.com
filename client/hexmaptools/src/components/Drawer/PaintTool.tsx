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
import { GroupBy } from "@utility/GroupBy";
import { Fragment } from "react";

import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";
import { useToolsStore } from "../../hooks/featureStores/usetToolsStore";
import { THEME } from "../../theme/theme";


function HexPaintTool(): JSX.Element {
	const [hexPaintTool, setSelectedHexType] = useToolsStore(state => [state.hexPaintTool, state.setSelectedHexType]);
	const [hexTypes] = useHexmapStore(state => [state.hexTypes]);

	return (
		<Stack rowGap={1} flexDirection="column">
			{hexTypes.length > 0
				&& <Fragment>
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
						{Object.values(GroupBy(hexTypes, (item) => item.category))
							.map((hexCategory, categoryIndex) => (
								<Fragment key={categoryIndex}>
									<Typography level="body-lg">{hexCategory[0].category}</Typography>

									{hexCategory.map((hexType, typeIndex) => (
										<Button
											key={typeIndex}
											size="sm"
											color="neutral"
											variant="soft"
											onClick={() => setSelectedHexType(hexType.id)}
										>
											{hexType.name}
										</Button>
									))}
								</Fragment>
							))}
					</Stack>
				</Fragment>}
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
				{Object.values(GroupBy(areaTypes, (item) => item.category))
					.map((areaCategory, categoryIndex) => (
						<Fragment key={categoryIndex}>
							<Typography level="body-lg">{areaCategory[0].category}</Typography>

							{areaCategory.map((areaType, typeIndex) => (
								<Button
									key={typeIndex}
									size="sm"
									color="neutral"
									variant="soft"
									onClick={() => setSelectedAreaType(areaType.id)}
								>
									{areaType.name}
								</Button>
							))}
						</Fragment>
					))}
			</Stack>
		</Stack>
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
