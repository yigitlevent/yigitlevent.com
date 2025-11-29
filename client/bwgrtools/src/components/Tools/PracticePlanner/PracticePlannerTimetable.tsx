import StopIcon from "@mui/icons-material/Stop";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { usePracticePlannerStore } from "../../../hooks/featureStores/usePracticePlannerStore";


export function PracticePlannerTimetable(): React.JSX.Element {
	const { days, hours, cells, changeDays, changeHours, addCells } = usePracticePlannerStore();

	return (
		<Fragment>
			<Divider sx={{ margin: "10px 0 0 " }}>Timetable</Divider>

			<Stack direction="row" spacing={2} justifyContent="center" sx={{ margin: "16px 0 32px 0" }}>
				<TextField
					label="Number of Days"
					slotProps={{ htmlInput: { inputMode: "numeric", pattern: "[0-9]*" } }}
					value={days}
					onChange={e => { changeDays(e.target.value); }}
					variant="standard"
				/>

				<TextField
					label="Hours per Day"
					slotProps={{ htmlInput: { inputMode: "numeric", pattern: "[0-9]*" } }}
					value={hours}
					onChange={e => { changeHours(e.target.value); }}
					variant="standard"
				/>

				<Button variant="outlined" onClick={() => { addCells(days, hours); }}>Add Days</Button>
			</Stack>

			<Stack direction="row" flexWrap="nowrap" justifyContent="start" alignItems="start" sx={{ maxWidth: "100%", overflow: "auto", padding: "0 0 16px 0" }}>
				{cells.map((cell, cellIndex) => (
					<Grid key={cellIndex} sx={{ padding: "32px 0 0 0", margin: "0 -8px 0 0" }}>
						<Typography
							variant="caption"
							sx={{ display: "block", transform: "rotate(-90deg)", margin: "0 -48px -8px 8px", height: "20px", width: "60px", transformOrigin: "left center" }}
						>
							{cellIndex === 0 || cellIndex === cells.length - 1 || (cellIndex + 1) % 5 === 0 ? `Day ${(cellIndex + 1).toString()}` : ""}
						</Typography>

						{[...Array<number>(cell.maxHours)].map((_, ii) => {
							const filled = (cell.placed.length > 0 ? cell.placed.map(v => v.hours).reduce((pv, cv) => pv + cv) : 0);
							return (
								<StopIcon
									key={ii}
									fontSize="small"
									color={filled >= cell.maxHours ? "error" : ii >= filled ? "success" : "warning"}
									sx={{ display: "block", margin: "0 0 -4px 0" }}
								/>
							);
						})}
					</Grid>
				))}
			</Stack>
		</Fragment>
	);
}
