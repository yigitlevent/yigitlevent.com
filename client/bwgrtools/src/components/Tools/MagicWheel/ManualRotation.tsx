import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { OneOfWheelObjectKeys, OneOfWheelObjects, UseMagicWheelReturn } from "../../../hooks/useMagicWheel";
import { GenericGrid } from "../../Shared/Grids";


interface MagicWheelManualRotationProps<T extends OneOfWheelObjects, P extends OneOfWheelObjectKeys> {
	magicWheel: UseMagicWheelReturn<T, P>;
	setTargetAmounts: (steps?: number, direction?: number) => void;
}

export function MagicWheelManualRotation<T extends OneOfWheelObjects, P extends OneOfWheelObjectKeys>({ magicWheel, setTargetAmounts }: MagicWheelManualRotationProps<T, P>): JSX.Element {
	const [manualSteps, setManualSteps] = useState(1);
	const [manualDirection, setManualDirection] = useState(1);

	return (
		<GenericGrid columns={2} center>
			<Grid item xs={2} sm={1}>
				<FormControl fullWidth variant="standard">
					<InputLabel>Direction</InputLabel>

					<Select value={manualDirection} onChange={e => setManualDirection(e.target.value as number)} disabled={magicWheel.isRotating}>
						<MenuItem value={1}>Clockwise</MenuItem>
						<MenuItem value={-1}>Counterclockwise</MenuItem>
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={2} sm={1}>
				<TextField
					label="Steps"
					inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
					value={manualSteps}
					onChange={e => setManualSteps(e.target.value as unknown as number)}
					fullWidth
					disabled={magicWheel.isRotating}
					variant="standard"
				/>
			</Grid>

			<Grid item xs={2}>
				<Button
					variant="outlined"
					disabled={magicWheel.isRotating}
					onClick={() => { if (!magicWheel.isRotating) setTargetAmounts(manualSteps, manualDirection); }}
					fullWidth
				>
					Turn the Wheel
				</Button>
			</Grid>
		</GenericGrid>
	);
}
