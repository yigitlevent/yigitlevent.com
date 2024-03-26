import { Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GroupBy } from "@utility/GroupBy";
import { Fragment } from "react";

import { usePracticePlannerStore } from "../../../hooks/featureStores/usePracticePlannerStore";


export function PracticePlannerTimetableSummary(): JSX.Element {
	const { cells } = usePracticePlannerStore();

	return (
		<Fragment>
			{cells.length > 0 && cells.some(v => v.placed.length > 0) ? <Divider sx={{ margin: "10px 0 0 " }}>Timetable Summary</Divider> : null}

			<Grid container columns={3}>
				{Object.entries(GroupBy(cells.map(cell => cell.placed).flat(), v => v.name))
					.map(([k, v]) => {
						return { name: k, days: v.length, testType: v[0].testType };
					})
					.sort((a, b) => a.days - b.days)
					.map((v, i) => (
						<Grid item xs={3} sm={2} md={1} key={i} flexGrow={1}>
							<Paper key={i} elevation={3} sx={{ margin: "8px", padding: "8px 16px" }}>
								<Typography key={i}>{v.name} ({v.testType}): {v.days} days</Typography>
							</Paper>
						</Grid>
					))}
			</Grid>
		</Fragment>
	);
}
