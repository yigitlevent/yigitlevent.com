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

import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useSearch } from "../../../hooks/useSearch";

import { PopoverLink } from "../../Shared/PopoverLink";
import { GenericGrid } from "../../Shared/Grids";


export function TraitLists() {
	const { stocks, traits, traitCategories, traitTypes } = useRulesetStore();
	const { searchString, searchFields, filters, setFilter, searchResults } = useSearch<Trait>(traits, ["stock", "category", "type"]);

	return (
		<Fragment>
			<Typography variant="h3">Trait Explorer</Typography>

			<GenericGrid columns={3} center>
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
						<InputLabel>Category</InputLabel>
						<Select label="Category" value={filters["category"]} onChange={v => setFilter([{ key: "category", value: v.target.value }])}>
							<MenuItem value="Any">Any</MenuItem>
							{traitCategories.map((v, i) => <MenuItem key={i} value={v}>{v}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={3} sm={3} md={1}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Type</InputLabel>
						<Select label="Type" value={filters["type"]} onChange={v => setFilter([{ key: "type", value: v.target.value }])}>
							<MenuItem value="Any">Any</MenuItem>
							{traitTypes.map((v, i) => <MenuItem key={i} value={v}>{v}</MenuItem>)}
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
							{["Name", "Description"].map((name) => (
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
					? [...searchResults].sort((a, b) => a.name.localeCompare(b.name)).map((trait, i) =>
						<Grid item key={i}>
							<Paper elevation={2} sx={{ cursor: "pointer", padding: "2px 6px" }}>
								<PopoverLink data={trait} />
							</Paper>
						</Grid>
					)
					: <Alert severity="warning" sx={{ width: "100%", maxWidth: "600px", margin: "12px auto" }}>
						Could not find any matches. Try adding more fields or changing search text or filters.
					</Alert>
				}
			</GenericGrid>
		</Fragment>
	);
}
