import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Timers } from "./Timers/Timers";
import { useUserStore } from "../hooks/apiStores/useUserStore";
import { THEME } from "../theme/theme";


export function MainBox(): JSX.Element {
	const { user } = useUserStore();
	const matches = useMediaQuery(THEME.breakpoints.down("sm"));

	const [fetchState, setFetchState] = useState("done");

	const fetchList = () => {
		// Simulate fetching list
		setFetchState("done");
	};

	return (
		<Container maxWidth="lg" sx={{ margin: "10px auto" }}>
			<Box>
				<Typography variant="h2">Dune: Megagame</Typography>
			</Box>

			<Grid>
				<Box sx={{ textAlign: "right" }}>{user ? `welcome, ${user.username}` : null}</Box>
			</Grid>

			<Paper sx={{ padding: "10px 20px" }}>
				{fetchState === "failed"
					? <Typography>Data fetching failed.</Typography>
					: null}

				{fetchState === "done"
					? <Routes>
						<Route path="/" element={<Timers />} />
					</Routes>
					: <Typography>Loading</Typography>}
			</Paper>

			<Box sx={{ margin: "0 0 200px" }} />
		</Container>
	);
}
