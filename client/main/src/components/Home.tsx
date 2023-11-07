import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { JourneySoFar } from "./home/JourneySoFar";
import { MyCurrentProjects } from "./home/MyCurrentProjects";
import { MyOldProjects } from "./home/MyOldProjects";
import { Skills } from "./home/Skills";


export function Home(): JSX.Element {
	return (
		<Fragment>
			<Box sx={{ padding: "10px 20px" }}>
				<Typography variant="h5">me</Typography>
			</Box>
			<Paper sx={{ padding: "10px 20px 16px", margin: "0 0 16px" }}>
				<Grid container columns={4} rowSpacing={3} columnSpacing={4}>
					<Grid item xs={4} md={3}>
						<JourneySoFar />
					</Grid>
					<Grid item xs={4} md={1}>
						<Skills />
					</Grid>
				</Grid>
			</Paper>
			<Box sx={{ padding: "10px 20px" }}>
				<Typography variant="h5">my current projects</Typography>
			</Box>
			<Paper sx={{ padding: "10px 20px 16px", margin: "0 0 16px" }}>
				<Grid container columns={2} rowSpacing={3} columnSpacing={4}>
					<MyCurrentProjects />
				</Grid>
			</Paper>
			<Box sx={{ padding: "10px 20px 10px" }}>
				<Typography variant="h5">my old projects</Typography>
			</Box>
			<Paper sx={{ padding: "10px 20px 16px", margin: "0 0 16px" }}>
				<Grid container columns={2} rowSpacing={3} columnSpacing={4}>
					<MyOldProjects />
				</Grid>
			</Paper>
		</Fragment>
	);
}
