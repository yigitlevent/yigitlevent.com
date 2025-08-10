import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Panels } from "./Panels";
import { useMegagameStore } from "../hooks/apiStores/useMegagameStore";
import { useUserStore } from "../hooks/apiStores/useUserStore";


export function MainBox(): React.JSX.Element {
	const { user } = useUserStore();

	const { fetchState, fetchData } = useMegagameStore();

	useEffect(() => {
		if (fetchState === "fetch-data") fetchData();
	}, [fetchData, fetchState]);


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
						<Route path="/" element={<Panels />} />
					</Routes>
					: <Typography>Loading</Typography>}
			</Paper>

			<Box sx={{ margin: "0 0 200px" }} />
		</Container>
	);
}
