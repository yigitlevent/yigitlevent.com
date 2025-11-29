import VisibilityIcon from "@mui/icons-material/Visibility";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { FightPlannerActionDetails } from "./FightActionDetails";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useFightPlannerStore } from "../../../hooks/featureStores/useFightPlannerStore";


export function FightPlanner(): React.JSX.Element {
	const { fightActions } = useRulesetStore();

	const { actions, selectedAction, addAction, changeSelectedAction, toggleActionVisibility } = useFightPlannerStore();

	return (
		<Fragment>
			<Typography variant="h3">Fight Planner</Typography>

			<Grid container justifyContent="space-evenly" spacing={{ xs: 1, sm: 1, md: 2 }} columns={{ xs: 1, sm: 1, md: 3 }} sx={{ maxWidth: "100%", padding: "16px 0" }}>
				{actions.map((action, volleyIndex) => (
					<Grid key={volleyIndex} size={{ xs: 1 }} sx={{ minWidth: "30%" }}>
						<Card sx={{ padding: "10px" }}>
							<Typography variant="h5">Volley {volleyIndex + 1}</Typography>
							<Divider sx={{ margin: "8px 0" }} />

							{action.map((action, actionIndex) => (
								<Paper key={`${volleyIndex.toString()}-${actionIndex.toString()}`} elevation={2} sx={{ padding: "8px", marginBottom: "8px" }}>
									{action.visible
										? <FightPlannerActionDetails action={action} volleyIndex={volleyIndex} actionIndex={actionIndex} />
										: <IconButton disableRipple sx={{ width: "100%" }} onClick={() => { toggleActionVisibility(volleyIndex, actionIndex); }}>
											<VisibilityIcon sx={{ fontSize: 100 }} />
										</IconButton>}
								</Paper>
							))}

							<Autocomplete
								value={fightActions.find(v => v.name === selectedAction[volleyIndex])}
								options={[...fightActions].sort((a, b) => a.group[1].localeCompare(b.group[1]) || a.name.localeCompare(b.name))}
								getOptionLabel={(option) => option.name}
								groupBy={(option) => option.group[1]}
								renderInput={(params) => <TextField {...params} />}
								onChange={(_, v) => { changeSelectedAction(v.name, volleyIndex); }}
								fullWidth
								disableClearable
							/>

							<Button size="large" fullWidth sx={{ padding: "16px", margin: "16px 0 8px" }} onClick={() => { addAction(fightActions, volleyIndex, selectedAction[volleyIndex]); }}>Add Action</Button>
						</Card>
					</Grid>
				))}
			</Grid>
		</Fragment>
	);
}
