import { Autocomplete, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState, useMemo } from "react";

import { PracticePlannerCells } from "./PracticePlannerCells";
import { PracticePlannerTimetable } from "./PracticePlannerTimetable";
import { PracticePlannerTimetableSummary } from "./PracticePlannerTimetableSummary";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { usePracticePlannerStore } from "../../../hooks/featureStores/usePracticePlannerStore";


export function PracticePlanner(): React.JSX.Element {
	const { practices, skills } = useRulesetStore();
	const { cells, marks, addPractice } = usePracticePlannerStore();

	const [cellStartEndIndex, setCellStartEndIndex] = useState<[number, number]>([1, 2]);
	const [practiceType, setPracticeType] = useState<BwgrPractice>(practices[0]);
	const [testType, setTestType] = useState<string>("Routine");
	const [practiceName, setPracticeName] = useState<string | BwgrSkill>("");

	const [notification, setNotification] = useState<null | React.JSX.Element>(null);

	const possibleSkills = useMemo(() => {
		if (practiceType.ability) {
			return null;
		}
		return skills.filter(s => s.type[0] === practiceType.skillType[0] && !s.flags.dontList).sort((a, b) => a.name.localeCompare(b.name));
	}, [practiceType, skills]);

	const defaultPracticeName = useMemo(() => {
		if (practiceType.ability) {
			return practiceType.ability[1];
		}
		return possibleSkills?.[0] ?? "";
	}, [practiceType, possibleSkills]);

	useEffect(() => {
		setPracticeName(defaultPracticeName);
	}, [defaultPracticeName]);

	const handleAddPractice = (): void => {
		const practice = practices.find(p => p.id === practiceType.id);
		if (practice) {
			const practiceHours = testType === "Routine" ? practice.routine : testType === "Difficult" ? practice.difficult : practice.challenging;
			const name = typeof practiceName === "string" ? practiceName : practiceName.name;
			addPractice(practice.id, actualCellStartEndIndex, practiceHours, name, testType, setNotification);
		}
	};

	// Derive the constrained end index to avoid cascading renders
	const constrainedEndIndex = Math.min(cellStartEndIndex[1], cells.length);
	const actualCellStartEndIndex: [number, number] = [cellStartEndIndex[0], constrainedEndIndex];

	return (
		<Fragment>
			{notification}
			<Typography variant="h3">Practice Planner</Typography>
			<Divider sx={{ margin: "10px 0 0 " }}>Inscribe Practice</Divider>

			<Grid container columns={12} justifyContent="space-between" alignItems="center" sx={{ margin: "0 0 16px 0" }}>
				<Grid size={{ xs: 10, sm: 4, md: 3 }}>
					<InputLabel>Practice Type</InputLabel>

					<Autocomplete
						value={practiceType}
						options={practices}
						getOptionLabel={(option) =>
							option.ability
								? `${option.ability[1]} - ${option.cycle.toString()}m, R: ${option.routine.toString()}h, D: ${option.difficult.toString()}h, C: ${option.challenging.toString()}h`
								: `${option.skillType[1]} - ${option.cycle.toString()}m, R: ${option.routine.toString()}h, D: ${option.difficult.toString()}h, C: ${option.challenging.toString()}h`}
						renderInput={(params) => <TextField {...params} variant="standard" />}
						onChange={(_, v) => { setPracticeType(v); }}
						disableClearable
						disabled={cells.length < 1}
					/>
				</Grid>

				<Grid size={{ xs: 10, sm: 4, md: 3 }}>
					<InputLabel>Name</InputLabel>

					{possibleSkills && typeof practiceName !== "string"
						? <Autocomplete
							value={practiceName}
							options={possibleSkills}
							getOptionLabel={(option) => option.name}
							renderInput={(params) => <TextField {...params} variant="standard" />}
							onChange={(_, v) => { setPracticeName(v); }}
							disableClearable
							disabled={cells.length < 1}
						/>
						: <TextField variant="standard" defaultValue={practiceName} disabled />}
				</Grid>

				<Grid size={{ xs: 10, sm: 4, md: 3 }}>
					<InputLabel>Test Type</InputLabel>

					<Select
						fullWidth
						variant="standard"
						value={testType}
						onChange={(e) => { setTestType(e.target.value); }}
						disabled={cells.length < 1}
					>
						<MenuItem value={"Routine"}>Routine</MenuItem>
						<MenuItem value={"Difficult"}>Difficult</MenuItem>
						<MenuItem value={"Challenging"}>Challenging</MenuItem>
					</Select>
				</Grid>

				<Grid size={{ xs: 10, sm: 4, md: 2 }}>
					<Button
						type="submit"
						variant="outlined"
						size="medium"
						disabled={cells.length < 1}
						onClick={() => { handleAddPractice(); }}
					>
						Add Practice
					</Button>
				</Grid>
			</Grid>

			<Box sx={{ margin: "0 0 32px 0" }}>
				<Typography gutterBottom>Start/End Day</Typography>

				<Slider
					value={actualCellStartEndIndex}
					onChange={(_, v) => {
						const se = v as [number, number];
						setCellStartEndIndex([se[0], se[1]]);
					}}
					valueLabelDisplay="auto"
					min={1}
					max={cells.length}
					disabled={cells.length < 1}
					marks={marks}
				/>
			</Box>

			<PracticePlannerTimetable />
			<PracticePlannerTimetableSummary />
			<PracticePlannerCells setNotification={setNotification} />
		</Fragment>
	);
}
