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

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { usePracticePlannerStore } from "../../../hooks/featureStores/usePracticePlannerStore";


function Placed({ placed, practiceIndex, cellIndex }: { placed: PracticePlaced; practiceIndex: number; cellIndex: number; }): JSX.Element {
	const { getPractice } = useRulesetStore();
	const { deletePractice } = usePracticePlannerStore();

	const practice = getPractice(placed.practiceId);

	const text = `${practice.ability ? practice.ability[1] : practice.skillType[1]}, ${placed.testType}, ${placed.hours}hr${placed.hours > 1 ? "s" : ""}`;

	return (
		<Paper key={practiceIndex} elevation={4} sx={{ padding: "2px 4px" }}>
			{placed.name}
			<Typography variant="caption">{text}</Typography>
			<IconButton size="small" sx={{ float: "right" }} onClick={() => deletePractice(cellIndex, practiceIndex)}><DeleteOutlineIcon fontSize="small" /></IconButton>
		</Paper>
	);
}

export function PracticePlannerCell({ cell, cellIndex, setNotification }: { cell: PracticeCell; cellIndex: number; setNotification: (value: React.SetStateAction<JSX.Element | null>) => void; }): JSX.Element {
	const { cells, deleteCell, changeCellHour } = usePracticePlannerStore();

	return (
		<Paper elevation={3} sx={{ padding: "5px 10px", margin: "10px 10px 10px" }}>
			<Stack spacing={0}>
				<Typography>
					Day {cellIndex + 1}
					<IconButton size="small" sx={{ float: "right" }} onClick={() => deleteCell(cellIndex)}><DeleteOutlineIcon fontSize="small" /></IconButton>
					<IconButton size="small" sx={{ float: "right" }} onClick={() => changeCellHour(cellIndex, -1, cells, setNotification)}><RemoveCircleOutlineIcon fontSize="small" /></IconButton>
					<IconButton size="small" sx={{ float: "right" }} onClick={() => changeCellHour(cellIndex, 1, cells, setNotification)}><AddCircleOutlineIcon fontSize="small" /></IconButton>
				</Typography>

				<Box sx={{ margin: "0 5px 0" }}>
					{[...Array(cell.maxHours)].map((_, ii) => {
						const filled = (cell.placed.length > 0 ? cell.placed.map(v => v.hours).reduce((pv, cv) => pv + cv) : 0);
						return (
							<StopIcon
								key={ii}
								fontSize="small"
								color={filled >= cell.maxHours ? "error" : ii >= filled ? "success" : "warning"}
								sx={{ margin: "0 0 0 -8px", "&:nth-child(6n)": { marginRight: "3px" } }}
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
