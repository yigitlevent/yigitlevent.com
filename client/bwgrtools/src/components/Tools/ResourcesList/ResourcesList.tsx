import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { ResourceItem } from "./ResourceItem";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useSearch } from "../../../hooks/useSearch";
import { GenericGrid } from "../../Shared/Grids";


export function ResourcesList(): JSX.Element {
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
					? searchResults.map((resource, i) => (
						<Grid item xs={1} key={i}>
							<Paper elevation={2} sx={{ padding: "0 12px 16px" }}>
								<ResourceItem resource={resource} />
							</Paper>
						</Grid>
					)
					)
					: <Alert severity="warning" sx={{ width: "100%", maxWidth: "600px", margin: "12px auto" }}>Could not find any matches. Try adding more fields or changing search text.</Alert>}
			</GenericGrid>
		</Fragment>
	);
}
