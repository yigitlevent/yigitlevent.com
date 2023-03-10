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
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { useRulesetStore } from "../../../hooks/stores/useRulesetStore";
import { Resource, Resources } from "../../../data/resources/_resources";
import { useSearch } from "../../../hooks/useSearch";

import { GenericGrid } from "../../Shared/Grids";


export function ResourceItem({ resource }: { resource: Resource; }) {
	return (
		<GenericGrid columns={3}>
			<Grid item xs={2}>
				<Typography variant="h4">{resource.name} </Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography sx={{ float: "right" }}>{resource.type}</Typography>
			</Grid>
			<Grid item xs={resource.magical ? 1 : 3}>
				{typeof resource.cost === "string"
					? <Typography>Cost: {resource.cost}</Typography>
					: typeof resource.cost === "number"
						? <Typography variant="body2">Cost: {resource.cost}{resource.cost > 1 ? "rps" : "rp"}</Typography>
						: <Box>Cost: {resource.cost.map((v, i) => <Typography variant="body2" key={i}>{v[0]}: {v[1]}{v[1] > 1 ? "rps" : "rp"}</Typography>)}</Box>
				}
			</Grid>
			{resource.magical
				? <Fragment>
					<Grid item xs={1}>
						<Typography variant="body2">Obstacle: {resource.magical.obstacle}</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Actions: {resource.magical.actions}</Typography>
					</Grid>
				</Fragment>
				: null
			}
			<Grid item xs={3}>
				{resource.modifiers
					? <Fragment>
						<Box>
							Modifiers: {resource.modifiers.map((v, i) => <Typography variant="body2" key={i}>{v[0]}: {v[1]}{v[1] > 1 ? "rps" : "rp"}</Typography>)}
						</Box>
					</Fragment>
					: null
				}
			</Grid>
			{resource.magical
				? <Fragment>
					<Grid item xs={3}><Divider /></Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Origin: {resource.magical.origin}</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Element: {resource.magical.element.join("/")}</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Duration: {resource.magical.duration}</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Area of Effect: {resource.magical.areaOfEffect}</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Impetus: {resource.magical.impetus.join("/")}</Typography>
					</Grid>
				</Fragment>
				: null
			}
			{resource.description
				? <Fragment>
					<Grid item xs={3}><Divider /></Grid>
					<Grid item xs={3}>
						{resource.description.split("<br>").map((v, i) => {
							if (resource.magical && i === 0) return <Typography key={i} variant="subtitle2">{v}</Typography>;
							return <Typography key={i} variant="body2">{v}</Typography>;
						})}
					</Grid>
				</Fragment>
				: null
			}
		</GenericGrid>
	);
}

export function ResourcesList() {
	const { checkRulesets, resourceStock, changeResourceStock } = useRulesetStore();
	const { searchString, setSearchString, searchFields, setSearchFields, setList, searchResults } = useSearch<Resource>(Resources[resourceStock].resources);

	const [searchParams, setSearchParams] = useSearchParams();

	const allowedCategories = Object.values(Resources).filter(v => checkRulesets(v.allowed));

	useEffect(() => {
		if (!(allowedCategories.map(v => v.name).includes(resourceStock))) {
			changeResourceStock(allowedCategories[0].name as StocksList);
		}
	}, [allowedCategories, changeResourceStock, resourceStock]);

	useEffect(() => {
		const arr = [...searchParams.entries()];
		const prms: { [key: string]: string; } = {};
		for (const item in arr) { prms[arr[item][0]] = arr[item][1]; }
		prms["stock"] = resourceStock;
		setSearchParams(prms);
	}, [resourceStock, searchParams, setSearchParams]);

	useEffect(() => {
		const arr = [...searchParams.entries()];
		const prms: { [key: string]: string; } = {};
		for (const item in arr) { prms[arr[item][0]] = arr[item][1]; }
		if ("stock" in prms) { changeResourceStock(prms["stock"] as StocksList); }
	}, [changeResourceStock, searchParams]);

	useEffect(() => {
		setList(Resources[resourceStock].resources);
	}, [setList, resourceStock]);

	return (
		<Fragment>
			<Typography variant="h3">Resources List</Typography>

			<GenericGrid columns={4} center>
				<Grid item xs={4} sm={4} md={2}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Resource Stock</InputLabel>
						<Select
							label="Resource Stock"
							value={allowedCategories.map(v => v.name).includes(resourceStock) ? resourceStock : allowedCategories[0].name}
							onChange={v => changeResourceStock(v.target.value as StocksList)}
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
							{["Name", "Type", "Description"].map((name) => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={searchFields.indexOf(name) > -1} />
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</GenericGrid>

			<GenericGrid columns={1}>
				{searchResults.length > 0
					? searchResults.map((resource, i) =>
						<Grid item xs={1} key={i}>
							<Paper elevation={2} sx={{ padding: "0 12px 16px" }}>
								<ResourceItem resource={resource} />
							</Paper>
						</Grid>
					)
					: <Alert severity="warning" sx={{ width: "100%", maxWidth: "600px", margin: "12px auto" }}>Could not find any matches. Try adding more fields or changing search text.</Alert>
				}
			</GenericGrid>
		</Fragment>
	);
}
