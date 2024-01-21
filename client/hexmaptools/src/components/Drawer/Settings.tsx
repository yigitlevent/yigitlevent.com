import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";

import { useHexmapStore } from "../../hooks/apiStores/useHexmapStore";


export function Settings(): JSX.Element {
	const [settings, setShowHexAreas, changeStrokeWidth, changeStrokeAlignment]
		= useHexmapStore(state => [state.settings, state.setShowHexAreas, state.changeStrokeWidth, state.changeStrokeAlignment]);

	return (
		<Grid container columns={1} rowGap={1}>

			<Grid xs={1}>
				<Typography level="title-lg" sx={{ margin: "16px 0 4px" }}>Options</Typography>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" xs={1}>
				<Typography sx={{ display: "inline" }}>Enable Hex Areas</Typography>

				<Switch
					size="sm"
					checked={settings.showHexAreas}
					onChange={(event) => setShowHexAreas(event.target.checked)}
				/>
			</Grid>

			<Grid xs={1}>
				<Divider />
				<Typography level="title-lg" sx={{ margin: "16px 0 4px" }}>Style / Stroke</Typography>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" xs={1}>
				<Typography sx={{ display: "inline" }}>Thickness</Typography>

				<Input
					size="sm"
					variant="plain"
					type="number"
					slotProps={{ input: { min: 0, max: 6, step: 1 } }}
					sx={{ width: "50%" }}
					value={settings.strokeStyle.width}
					onChange={(e) => changeStrokeWidth(parseInt(e.target.value))}
				/>
			</Grid>

			<Grid container columns={2} justifyContent="space-between" xs={1}>
				<Typography sx={{ display: "inline" }}>Alignment</Typography>

				<Select
					size="sm"
					variant="plain"
					sx={{ width: "50%" }}
					value={settings.strokeStyle.alignment}
					onChange={(_, a) => changeStrokeAlignment(a as HmHexStyleStrokeAlignments)}
				>
					<Option value={0}>Inside</Option>
					<Option value={0.5}>Center</Option>
					<Option value={1}>Outside</Option>
				</Select>
			</Grid>
		</Grid>
	);
}
