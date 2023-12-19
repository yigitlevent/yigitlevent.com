import DeleteOutline from "@mui/icons-material/DeleteOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { RangeAndCoverActionDetails } from "./RangeAndCoverActionDetails";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useRangeAndCoverPlannerStore } from "../../../hooks/featureStores/useRangeAndCoverPlannerStore";
import { GroupBy } from "../../../utils/misc";
import { GenericGrid } from "../../Shared/Grids";


export function RangeAndCoverPlanner(): JSX.Element {
	const { racActions } = useRulesetStore();
	const groupedActions = GroupBy(racActions, a => a.group[1]);

	const {
		volleyIndex, actions, selectedAction,
		changeVolleyIndex, addAction, deleteAction, selectedChangeAction, toggleActionDetails, toggleActionVisibility
	} = useRangeAndCoverPlannerStore();

	return (
		<Fragment>
			<Typography variant="h3">Range and Cover Planner</Typography>

			<GenericGrid columns={3} center>
				<Grid item xs={3} sm={3} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel >Volley</InputLabel>

						<Select label="Volley" value={volleyIndex} onChange={(e) => changeVolleyIndex(parseInt(e.target.value as string))}>
							<MenuItem value={0}>Volley 1</MenuItem>
							<MenuItem value={1}>Volley 2</MenuItem>
							<MenuItem value={2}>Volley 3</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={3} sm={3} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Action</InputLabel>

						<Select label="Action" value={selectedAction} onChange={(e) => selectedChangeAction(e.target.value)}>
							{Object.keys(groupedActions).map((groupKey, groupIndex) => {
								const elements = [
									<ListSubheader key={groupIndex}>{groupKey}</ListSubheader>,
									Object.values(groupedActions)[groupIndex].map((action, actionIndex) =>
										<MenuItem key={actionIndex} value={action.name}>{action.name}</MenuItem>
									)
								];
								return elements;
							})}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={3} sm={3} md={1}>
					<Button variant="outlined" size="medium" onClick={() => addAction(racActions, volleyIndex, selectedAction)}>Add Action</Button>
				</Grid>
			</GenericGrid>

			<GenericGrid columns={1}>
				{actions.map((action, volleyIndex) => (
					<Grid item xs={1} key={volleyIndex}>
						<Typography variant="h5" sx={{ padding: "6px 10px" }}>Volley {volleyIndex + 1}</Typography>

						{action
							? <Grid container columns={2} justifyContent="space-between" sx={{ padding: "10px" }}>
								<Grid item xs={2} sm={1} md={1}>
									<Typography variant="h6" sx={{ display: "inline-block" }}>
										{action.visible ? action.name : "────────────────────"}
									</Typography>
								</Grid>

								<Grid item>
									<IconButton size="small" sx={{ margin: "0 8px" }} onClick={() => toggleActionDetails(volleyIndex)}>
										{action.open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
									</IconButton>

									<IconButton size="small" sx={{ margin: "0 8px" }} onClick={() => toggleActionVisibility(volleyIndex)}>
										{action.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
									</IconButton>

									<IconButton size="small" sx={{ margin: "0 8px" }} onClick={() => deleteAction(volleyIndex)}>
										<DeleteOutline />
									</IconButton>
								</Grid>

								<Grid item xs={2}>
									<Divider />
								</Grid>

								{action.visible && action.open ? <RangeAndCoverActionDetails action={action} /> : null}
							</Grid>
							: <Typography variant="body2">No action selected</Typography>}
					</Grid>
				)
				)}
			</GenericGrid>
		</Fragment >
	);
}
