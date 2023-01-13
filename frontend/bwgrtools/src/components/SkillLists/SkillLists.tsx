import { Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";

import { useRulesetStore } from "../../hooks/stores/useRulesetStore";
import { useSearch } from "../../hooks/useSearch";
import { Skill, SkillCategories } from "../../data/skills/_skills";

import { PopoverLink } from "../Shared/PopoverLink";
import { GenericGrid } from "../Shared/Grids";


export function SkillLists() {
	const { checkRulesets } = useRulesetStore();
	const { skillCategory, changeSkillCategory } = useRulesetStore();
	const { searchString, setSearchString, searchFields, setSearchFields, setList, searchResults } = useSearch<Skill>(SkillCategories[skillCategory].skills);

	const [searchParams, setSearchParams] = useSearchParams();

	const allowedCategories = Object.values(SkillCategories).filter(v => checkRulesets(v.allowed));

	useEffect(() => {
		if (!(allowedCategories.map(v => v.name).includes(skillCategory))) {
			changeSkillCategory(allowedCategories[0].name as SkillCategoryPath);
		}
	}, [allowedCategories, changeSkillCategory, skillCategory]);

	useEffect(() => {
		const arr = [...searchParams.entries()];
		const prms: { [key: string]: string; } = {};
		for (const item in arr) { prms[arr[item][0]] = arr[item][1]; }
		prms["category"] = skillCategory;
		setSearchParams(prms);
	}, [skillCategory, searchParams, setSearchParams]);

	useEffect(() => {
		const arr = [...searchParams.entries()];
		const prms: { [key: string]: string; } = {};
		for (const item in arr) { prms[arr[item][0]] = arr[item][1]; }
		if ("category" in prms) { changeSkillCategory(prms["category"] as SkillCategoryPath); }
	}, [changeSkillCategory, searchParams]);

	useEffect(() => {
		setList(SkillCategories[skillCategory].skills);
	}, [skillCategory, setList]);

	return (
		<Fragment>
			<Typography variant="h3">Skill Explorer</Typography>

			<GenericGrid columns={4} center>
				<Grid item xs={4} sm={4} md={2}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Skill Category</InputLabel>
						<Select
							label="Skill Category"
							value={allowedCategories.map(v => v.name).includes(skillCategory) ? skillCategory : allowedCategories[0].name}
							onChange={v => changeSkillCategory(v.target.value as SkillCategoryPath)}
						>
							{allowedCategories.map((v, i) => <MenuItem key={i} value={v.name}>{v.name}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={4} sm={2} md={1}>
					<TextField
						label={"Search"}
						variant="standard"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4} sm={2} md={1}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Search Fields</InputLabel>
						<Select
							value={searchFields}
							onChange={(e) => setSearchFields(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)}
							renderValue={(selected) => selected.join(", ")}
							multiple
						>
							{["Name", "Type", "Root", "Description"].map((name) => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={searchFields.indexOf(name) > -1} />
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</GenericGrid>

			<GenericGrid spacing={[2, 2]}>
				{searchResults.length > 0
					? searchResults.sort((a, b) => a.name.localeCompare(b.name)).map((skill, i) =>
						<Grid item key={i}>
							<Paper elevation={2} sx={{ cursor: "pointer", padding: "2px 6px" }}>
								<PopoverLink data={skill} />
							</Paper>
						</Grid>
					)
					: <Alert severity="warning" sx={{ width: "100%", maxWidth: "600px", margin: "12px auto" }}>Could not find any matches. Try adding more fields or changing search text.</Alert>
				}
			</GenericGrid>
		</Fragment >
	);
}
