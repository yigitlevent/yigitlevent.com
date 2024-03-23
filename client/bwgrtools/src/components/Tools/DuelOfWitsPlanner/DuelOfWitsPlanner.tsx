import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { DuelOfWitsActionDetails } from "./DuelOfWitsActionDetails";
import { useRulesetStore } from "../../../hooks/apiStores/useRulesetStore";
import { useDuelOfWitsPlannerStore } from "../../../hooks/featureStores/useDuelOfWitsPlannerStore";


export function DuelOfWitsPlanner(): JSX.Element {
	const { dowActions } = useRulesetStore();

	const { actions, selectedAction, addAction, selectedChangeAction, toggleActionVisibility } = useDuelOfWitsPlannerStore();

	return (
		<Fragment>
			<Typography variant="h3">Duel of Wits Planner</Typography>

			<Grid container justifyContent="space-evenly" spacing={{ xs: 1, sm: 1, md: 2 }} columns={{ xs: 1, sm: 1, md: 3 }} sx={{ maxWidth: "100%", padding: "16px 0" }}>
				{actions.map((action, volleyIndex) => (
					<Grid key={volleyIndex} item xs={1} sx={{ minWidth: "30%" }}>
						<Card sx={{ padding: "10px" }}>
							<Typography variant="h5">Volley {volleyIndex + 1}</Typography>
							<Divider sx={{ margin: "8px 0" }} />

							{action
								? action.visible
									? <Paper elevation={2} sx={{ padding: "8px" }}>
										<DuelOfWitsActionDetails action={action} volleyIndex={volleyIndex} />
									</Paper>
									: <IconButton disableRipple sx={{ width: "100%" }} onClick={() => toggleActionVisibility(volleyIndex)}>
										<VisibilityIcon sx={{ fontSize: 100 }} />
									</IconButton>
								: <Fragment>
									<Select fullWidth value={selectedAction[volleyIndex]} onChange={(e) => selectedChangeAction(e.target.value, volleyIndex)}>
										{dowActions.map(v => <MenuItem key={v.name} value={v.name}>{v.name}</MenuItem>)}
									</Select>

									<Button size="large" fullWidth sx={{ padding: "16px", margin: "16px 0 8px" }} onClick={() => addAction(dowActions, volleyIndex, selectedAction[volleyIndex])}>Add Action</Button>
								</Fragment>}
						</Card>
					</Grid>
				))}
			</Grid>
		</Fragment>
	);
}
