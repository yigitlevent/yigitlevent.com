import { Fragment } from "react";

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
import Divider from "@mui/material/Divider";

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useSearch } from "../../../hooks/useSearch";

import { GenericGrid } from "../../Shared/Grids";


export function ResourceItem({ resource }: { resource: Resource; }) {
	const getObstacleString = (obstacleDetails: ResourceMagicObstacleDetails[]) => {
		const strs = obstacleDetails.map(v => {
			const desc = v.description ? `${v.description}: ` : "";
			if (v.obstacle) {
				return `${desc}${v.obstacle}${v.caret ? "^" : ""}`;
			}
			else if (v.abilities && v.abilities.length > 0) {
				return `${desc}${v.abilities.map(v => v[1]).join("/")}${v.caret ? "^" : ""}`;
			}
			else throw new Error(`How could this be?! ${resource.id} ${resource.name}`);
		});

		return strs.join("; ");
	};

	const getAreaOfEffectDetails = (aoeDetails: { unit?: [id: DistanceUnitId, name: string] | undefined; modifier?: [id: UnitModifierId, name: string] | undefined; }) => {
		const texts = [];
		if (aoeDetails.unit) { texts.push(aoeDetails.unit[1]); }
		if (aoeDetails.modifier) { texts.push(aoeDetails.modifier[1]); }
		return ` (${texts.join(", ")})`;
	};

	return (
		<GenericGrid columns={3}>
			<Grid item xs={2}>
				<Typography variant="h4">{resource.name}</Typography>
			</Grid>

			<Grid item xs={1}>
				<Typography sx={{ float: "right" }}>{resource.type[1]}</Typography>
			</Grid>

			<Grid item xs={resource.magical ? 1 : 3}>
				{resource.variableCost
					? <Typography variant="body2">variable</Typography>
					: resource.costs.every(v => v[1] === null) ?
						resource.costs.map((res, i) =>
							<Typography variant="body2" key={i}>Resources: {res[0]}{res[0] > 1 ? "rps" : "rp"}</Typography>
						)
						: resource.costs.map((res, i) =>
							<Typography variant="body2" key={i}>{res[1]}: {res[0]}{res[0] > 1 ? "rps" : "rp"}</Typography>
						)
				}
			</Grid>

			<Grid item xs={resource.magical ? 1 : 3}>
				{resource.modifiers.map((res, i) =>
					<Typography variant="body2" key={i}>{res[2]}: {res[0]}{res[0] > 1 ? "rps" : "rp"} {res[1] ? "per" : ""}</Typography>
				)}
			</Grid>

			{resource.magical
				? <Fragment>
					<Grid item xs={1}>
						<Typography variant="body2">Actions: {resource.magical.doActionsMultiply ? "x" : ""}{resource.magical.actions}</Typography>
					</Grid>
				</Fragment>
				: null
			}

			{resource.magical?.obstacleDetails
				? <Grid item xs={3}>
					<Typography variant="body2">Obstacles: {getObstacleString(resource.magical.obstacleDetails)}</Typography>
				</Grid>
				: null
			}

			{resource.magical
				? <Fragment>
					<Grid item xs={3}><Divider /></Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Origin: {resource.magical.origin[1]}</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Element: {resource.magical.elements.map(x => x[1]).join("/")}</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Duration: {resource.magical.duration[1]}</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Area of Effect: {resource.magical.areaOfEffect[1]}
							{resource.magical.areaOfEffectDetails?.unit || resource.magical.areaOfEffectDetails?.modifier ? getAreaOfEffectDetails(resource.magical.areaOfEffectDetails) : ""}
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="body2">Impetus: {resource.magical.impetus.map(x => x[1]).join("/")}</Typography>
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
	const { stocks, resources, resourceTypes } = useRulesetStore();
	const { searchString, searchFields, filters, setFilter, searchResults } = useSearch<Resource>(resources, ["stock", "type"]);

	return (
		<Fragment>
			<Typography variant="h3">Resources List</Typography>

			<GenericGrid columns={4} center>
				<Grid item xs={3} sm={3} md={1}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Stock</InputLabel>
						<Select label="Stock" value={filters["stock"]} onChange={v => setFilter([{ key: "stock", value: v.target.value }])}>
							<MenuItem value="Any">Any</MenuItem>
							{stocks.map(v => v.name).map((v, i) => <MenuItem key={i} value={v}>{v}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={3} sm={3} md={1}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Type</InputLabel>
						<Select label="Type" value={filters["type"]} onChange={v => setFilter([{ key: "type", value: v.target.value }])}>
							<MenuItem value="Any">Any</MenuItem>
							{resourceTypes.map((v, i) => <MenuItem key={i} value={v}>{v}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={3} sm={3} md={2}>
					<TextField
						label={"Search"}
						variant="standard"
						value={searchString}
						onChange={(e) => setFilter([{ key: "s", value: e.target.value }])}
						fullWidth
					/>
				</Grid>
				<Grid item xs={3} sm={3} md={1}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Search Fields</InputLabel>
						<Select
							value={searchFields}
							onChange={(e) => setFilter([{ key: "sf", value: typeof e.target.value !== "string" ? e.target.value.join(",") : e.target.value }])}
							renderValue={(selected) => selected.join(", ")}
							multiple
						>
							{["Name"].map((name) => (
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
