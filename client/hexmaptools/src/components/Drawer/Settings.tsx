import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";
import { THEME } from "../../theme/theme";


export function Settings(): JSX.Element {
	const smDown = useMediaQuery(THEME.breakpoints.down("sm"));
	const [copied, setCopied] = useState(false);
	const [map, changeMapName, changeStrokeWidth, changeStrokeAlignment, changeMapWidth, changeMapHeight, changeMapHexRadius]
		= useHexmapStore(state => [
			state.map,
			state.changeMapName, state.changeStrokeWidth, state.changeStrokeAlignment,
			state.changeMapWidth, state.changeMapHeight, state.changeMapHexRadius
		]);

	return (
		<Stack rowGap={2}>
			<Typography level="title-lg" sx={{ margin: "16px 0 4px" }}>Map</Typography>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>ID</Typography>

				<Tooltip
					title="Hexmap ID copied to the clipboard"
					variant="solid"
					size="sm"
					placement={smDown ? "bottom" : "right"}
					open={copied}
					sx={{ zIndex: 10001 }}
				>
					<Input
						size="sm"
						variant="plain"
						sx={{ width: "65%" }}
						value={map.id}
						readOnly
						endDecorator={
							<IconButton
								onClick={() => {
									navigator.clipboard.writeText(map.id);
									setCopied(true);
									setTimeout(() => setCopied(false), 3000);
								}}
							>
								<ContentCopyIcon />
							</IconButton>
						}
					/>
				</Tooltip>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>Name</Typography>

				<Input
					size="sm"
					variant="plain"
					sx={{ width: "65%" }}
					value={map.name}
					onChange={(e) => changeMapName(e.target.value)}
				/>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>Width</Typography>

				<Input
					size="sm"
					variant="plain"
					type="number"
					slotProps={{ input: { min: 1, max: 100, step: 1 } }}
					sx={{ width: "65%" }}
					value={map.settings.mapSize.width}
					onChange={(e) => changeMapWidth(parseInt(e.target.value))}
				/>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>Height</Typography>

				<Input
					size="sm"
					variant="plain"
					type="number"
					slotProps={{ input: { min: 1, max: 100, step: 1 } }}
					sx={{ width: "65%" }}
					value={map.settings.mapSize.height}
					onChange={(e) => changeMapHeight(parseInt(e.target.value))}
				/>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>Hex Radius</Typography>

				<Input
					size="sm"
					variant="plain"
					type="number"
					slotProps={{ input: { min: 10, max: 120, step: 1 } }}
					sx={{ width: "50%" }}
					value={map.settings.hexRadius}
					onChange={(e) => changeMapHexRadius(parseInt(e.target.value))}
					disabled
				/>
			</Grid>

			<Divider />
			<Typography level="title-lg">Hex Stroke</Typography>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>Thickness</Typography>

				<Input
					size="sm"
					variant="plain"
					type="number"
					slotProps={{ input: { min: 0.0, max: 6.0, step: 0.5 } }}
					sx={{ width: "50%" }}
					value={map.settings.hexStrokeStyle.width}
					onChange={(e) => changeStrokeWidth("Hex", parseFloat(e.target.value))}
				/>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>Alignment</Typography>

				<Select
					size="sm"
					variant="plain"
					sx={{ width: "50%" }}
					value={map.settings.hexStrokeStyle.alignment}
					onChange={(_, a) => changeStrokeAlignment("Hex", a as HmSurfaceStyleStrokeAlignments)}
				>
					<Option value={0}>Inside</Option>
					<Option value={0.5}>Center</Option>
					<Option value={1}>Outside</Option>
				</Select>
			</Grid>

			<Divider />
			<Typography level="title-lg">Area Stroke</Typography>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>Thickness</Typography>

				<Input
					size="sm"
					variant="plain"
					type="number"
					slotProps={{ input: { min: 0.0, max: 6.0, step: 0.5 } }}
					sx={{ width: "50%" }}
					value={map.settings.areaStrokeStyle.width}
					onChange={(e) => changeStrokeWidth("Area", parseFloat(e.target.value))}
				/>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" alignItems="center">
				<Typography>Alignment</Typography>

				<Select
					size="sm"
					variant="plain"
					sx={{ width: "50%" }}
					value={map.settings.areaStrokeStyle.alignment}
					onChange={(_, a) => changeStrokeAlignment("Area", a as HmSurfaceStyleStrokeAlignments)}
				>
					<Option value={0}>Inside</Option>
					<Option value={0.5}>Center</Option>
					<Option value={1}>Outside</Option>
				</Select>
			</Grid>
		</Stack>
	);
}
