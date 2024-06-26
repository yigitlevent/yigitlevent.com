import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment, useCallback, useState } from "react";

import { LifepathBox } from "./LifepathBox";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useSearch } from "../../../hooks/useSearch";
import { GenericGrid } from "../../Shared/Grids";


export function LifepathLists(): JSX.Element {
	const { stocks, settings, lifepaths } = useRulesetStore();
	const { searchValues, setFilter, filteredList } = useSearch<BwgrLifepath>(lifepaths, ["stock", "setting"], { "stock": stocks[0].name, "setting": settings[0].name });

	const [allowedSettings, setAllowedSettings] = useState(settings.filter(setting => setting.stock[1] === searchValues.filters["stock"]).map(v => v.name));

	const updateStock = useCallback((val: string) => {
		const newAllowed = settings.filter(setting => setting.stock[1] === val).map(v => v.name);
		setAllowedSettings(newAllowed);
		setFilter([{ key: "stock", value: val }, { key: "setting", value: newAllowed[0] }]);
	}, [setFilter, settings]);

	return (
		<Fragment>
			<Typography variant="h3">Lifepath Explorer</Typography>

			<GenericGrid columns={4} center>
				<Grid item xs={4} sm={2} md={1}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Stock</InputLabel>

						<Select label="Stock" value={searchValues.filters["stock"]} onChange={v => updateStock(v.target.value)}>
							{stocks.map(v => v.name).map((v, i) => <MenuItem key={i} value={v}>{v}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={4} sm={2} md={1}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Setting</InputLabel>

						<Select label="Setting" value={allowedSettings.includes(searchValues.filters["setting"]) ? searchValues.filters["setting"] : ""} onChange={v => setFilter([{ key: "setting", value: v.target.value }])}>
							{allowedSettings.map((v, i) => <MenuItem key={i} value={v}>{v}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={4} sm={2} md={2}>
					<TextField
						label={"Search"}
						variant="standard"
						value={searchValues.text}
						onChange={(e) => setFilter([{ key: "s", value: e.target.value }])}
						fullWidth
					/>
				</Grid>

				<Grid item xs={4} sm={2} md={1}>
					<FormControl variant="standard" fullWidth>
						<InputLabel>Search Fields</InputLabel>

						<Select
							value={searchValues.fields}
							onChange={(e) => setFilter([{ key: "sf", value: typeof e.target.value !== "string" ? e.target.value.join(",") : e.target.value }])}
							renderValue={(selected) => selected.join(", ")}
							multiple
						>
							{["Name"/*, "Leads", "Skills", "Traits"*/].map((name) => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={searchValues.fields.indexOf(name) > -1} />
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</GenericGrid>

			<GenericGrid columns={1} spacing={[2, 2]} center>
				{filteredList.length > 0
					? filteredList.map((v, i) => (
						<Grid item xs={1} key={i}>
							<LifepathBox lifepath={v} />
						</Grid>
					)
					)
					: <Alert severity="warning" sx={{ width: "100%", maxWidth: "600px", margin: "12px auto" }}>Could not find any matches. Try adding more fields or changing search text.</Alert>}
			</GenericGrid>
		</Fragment>
	);
}
