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
import { Fragment, useEffect, useState } from "react";

import { PracticePlannerCells } from "./PracticePlannerCells";
import { PracticePlannerTimetable } from "./PracticePlannerTimetable";
import { PracticePlannerTimetableSummary } from "./PracticePlannerTimetableSummary";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { usePracticePlannerStore } from "../../../hooks/featureStores/usePracticePlannerStore";


export function PracticePlanner(): JSX.Element {
	const { practices, skills } = useRulesetStore();
	const { cells, marks, addPractice } = usePracticePlannerStore();

	const [cellStartEndIndex, setCellStartEndIndex] = useState<[number, number]>([1, 2]);
	const [practiceType, setPracticeType] = useState<BwgrPractice>(practices[0]);
	const [testType, setTestType] = useState<string>("Routine");
	const [practiceName, setPracticeName] = useState<string | BwgrSkill>("");

	const [notification, setNotification] = useState<null | JSX.Element>(null);
	const [possibleSkills, setPossibleSkills] = useState<null | BwgrSkill[]>(null);

	const handleAddPractice = () => {
		const practice = practices.find(p => p.id === practiceType.id);
		if (practice) {
			const practiceHours = testType === "Routine" ? practice.routine : testType === "Difficult" ? practice.difficult : practice.challenging;
			const name = typeof practiceName === "string" ? practiceName : practiceName.name;
			addPractice(practice.id, cellStartEndIndex, practiceHours, name, testType, setNotification);
		}
	};

	useEffect(() => {
		if (practiceType.ability) {
			setPossibleSkills(null);
			setPracticeName(practiceType.ability[1]);
		}
		else {
			const possible = skills.filter(s => s.type[0] === practiceType.skillType[0] && !s.flags.dontList).sort((a, b) => a.name.localeCompare(b.name));
			setPossibleSkills(possible);
			setPracticeName(possible[0]);
		}
	}, [practiceType, skills]);

	useEffect(() => {
		if (cells.length < cellStartEndIndex[1]) setCellStartEndIndex([cellStartEndIndex[0], cells.length]);
	}, [cellStartEndIndex, cells]);

	return (
		<Fragment>
			{notification}
			<Typography variant="h3">Practice Planner</Typography>
			<Divider sx={{ margin: "10px 0 0 " }}>Inscribe Practice</Divider>

			<Grid container columns={12} justifyContent="space-between" alignItems="center" sx={{ margin: "0 0 16px 0" }}>
				<Grid item xs={10} sm={4} md={3}>
					<InputLabel>Practice Type</InputLabel>

					<Autocomplete
						value={practiceType}
						options={practices}
						getOptionLabel={(option) =>
							option.ability
								? `${option.ability[1]} - ${option.cycle}m, R: ${option.routine}h, D: ${option.difficult}h, C: ${option.challenging}h`
								: `${option.skillType[1]} - ${option.cycle}m, R: ${option.routine}h, D: ${option.difficult}h, C: ${option.challenging}h`}
						renderInput={(params) => <TextField {...params} variant="standard" />}
						onChange={(_, v) => setPracticeType(v)}
						disableClearable
						disabled={cells.length < 1}
					/>
				</Grid>

				<Grid item xs={10} sm={4} md={3}>
					<InputLabel>Name</InputLabel>

					{possibleSkills && typeof practiceName !== "string"
						? <Autocomplete
							value={practiceName}
							options={possibleSkills}
							getOptionLabel={(option) => option.name}
							renderInput={(params) => <TextField {...params} variant="standard" />}
							onChange={(_, v) => setPracticeName(v)}
							disableClearable
							disabled={cells.length < 1}
						/>
						: <TextField variant="standard" defaultValue={practiceName} disabled />}
				</Grid>

				<Grid item xs={10} sm={4} md={3}>
					<InputLabel>Test Type</InputLabel>

					<Select
						fullWidth
						variant="standard"
						value={testType}
						onChange={(e) => setTestType(e.target.value as string)}
						disabled={cells.length < 1}
					>
						<MenuItem value={"Routine"}>Routine</MenuItem>
						<MenuItem value={"Difficult"}>Difficult</MenuItem>
						<MenuItem value={"Challenging"}>Challenging</MenuItem>
					</Select>
				</Grid>

				<Grid item xs={10} sm={4} md={2}>
					<Button
						type="submit"
						variant="outlined"
						size="medium"
						disabled={cells.length < 1}
						onClick={() => handleAddPractice()}
					>
						Add Practice
					</Button>
				</Grid>
			</Grid>

			<Box sx={{ margin: "0 0 32px 0" }}>
				<Typography gutterBottom>Start/End Day</Typography>

				<Slider
					value={cellStartEndIndex}
					onChange={(_, v) => {
						const se = v as [number, number];
						setCellStartEndIndex(([se[0], se[1]]));
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
