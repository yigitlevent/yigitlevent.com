import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import StopIcon from "@mui/icons-material/Stop";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { usePracticePlannerStore } from "../../../hooks/featureStores/usePracticePlannerStore";


function Placed({ placed, practiceIndex, cellIndex }: { placed: BwgrPracticePlaced; practiceIndex: number; cellIndex: number; }): React.JSX.Element {
	const { getPractice } = useRulesetStore();
	const { deletePractice } = usePracticePlannerStore();

	const practice = getPractice(placed.practiceId);

	const text = `${practice.ability ? practice.ability[1] : practice.skillType[1]}, ${placed.testType}, ${placed.hours.toString()}hr${placed.hours > 1 ? "s" : ""}`;

	return (
		<Paper elevation={2} sx={{ padding: "2px 4px" }}>
			<Typography variant="body1" sx={{ display: "inline", marginRight: "8px" }}>{placed.name}</Typography>
			<Typography variant="caption">{text}</Typography>
			<IconButton size="small" sx={{ float: "right" }} onClick={() => { deletePractice(cellIndex, practiceIndex); }}><DeleteOutlineIcon fontSize="small" /></IconButton>
		</Paper>
	);
}

function PracticePlannerCell({ cell, cellIndex, setNotification }: { cell: BwgrPracticeCell; cellIndex: number; setNotification: (value: React.SetStateAction<React.JSX.Element | null>) => void; }): React.JSX.Element {
	const { cells, deleteCell, changeCellHour } = usePracticePlannerStore();

	return (
		<Paper elevation={3} sx={{ padding: "5px 10px", margin: "10px 10px 10px" }}>
			<Stack spacing={0}>
				<Typography>
					Day
					{" "}
					{cellIndex + 1}
					<IconButton size="small" sx={{ float: "right" }} onClick={() => { deleteCell(cellIndex); }}><DeleteOutlineIcon fontSize="small" /></IconButton>
					<IconButton size="small" sx={{ float: "right" }} onClick={() => { changeCellHour(cellIndex, -1, cells, setNotification); }}><RemoveCircleOutlineIcon fontSize="small" /></IconButton>
					<IconButton size="small" sx={{ float: "right" }} onClick={() => { changeCellHour(cellIndex, 1, cells, setNotification); }}><AddCircleOutlineIcon fontSize="small" /></IconButton>
				</Typography>

				<Box sx={{ margin: "0 5px 0" }}>
					{[...Array<number>(cell.maxHours)].map((_, ii) => {
						const filled = (cell.placed.length > 0 ? cell.placed.map(v => v.hours).reduce((pv, cv) => pv + cv) : 0);
						return (
							<StopIcon
								key={ii}
								fontSize="small"
								color={filled >= cell.maxHours ? "error" : ii >= filled ? "success" : "warning"}
								sx={{ margin: "0 0 0 -8px" }}
							/>
						);
					})}
				</Box>

				{cell.placed.length > 0 ? <Divider /> : null}

				<Stack spacing={1} sx={{ margin: "6px 0" }}>
					{cell.placed.map((placed, practiceIndex) => <Placed key={practiceIndex} placed={placed} practiceIndex={practiceIndex} cellIndex={cellIndex} />)}
				</Stack>
			</Stack>
		</Paper>
	);
}

export function PracticePlannerCells({ setNotification }: { setNotification: (value: React.SetStateAction<React.JSX.Element | null>) => void; }): React.JSX.Element {
	const { cells } = usePracticePlannerStore();

	return (
		<Fragment>
			{cells.length > 0 ? <Divider sx={{ margin: "10px 0 0 " }}>Timetable Details</Divider> : null}

			<Stack>
				{cells.map((cell, cellIndex) => (
					<PracticePlannerCell key={cellIndex} cell={cell} cellIndex={cellIndex} setNotification={setNotification} />
				))}
			</Stack>
		</Fragment>
	);
}
