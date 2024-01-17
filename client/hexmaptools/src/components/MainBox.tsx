import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useUserStore } from "../hooks/apiStores/useUserStore";


export function MainBox(): JSX.Element {
	const { user } = useUserStore();
	//const { fetchState, fetchList, fetchData } = useRulesetStore();
	//const matches = useMediaQuery(THEME.breakpoints.down("sm"));

	//useEffect(() => {
	//	if (fetchState === "fetch-full") fetchList();
	//}, [fetchList, fetchState]);

	//useEffect(() => {
	//	if (fetchState === "fetch-data") fetchData();
	//}, [fetchData, fetchState]);

	return (
		<Container maxWidth="lg" sx={{ margin: "10px auto" }}>
			<Box>
				<Typography variant="h2">Hexmap Tools</Typography>
			</Box>

			<Grid item>
				<Box sx={{ textAlign: "right" }}>{user ? `welcome, ${user.username}` : null}</Box>
			</Grid>

			<Typography variant="h2">work in progress</Typography>
			{/*<Menu bottom={matches} />

			<Paper sx={{ padding: "10px 20px" }}>
				{fetchState === "failed"
					? <Typography>Data fetching failed.</Typography>
					: null}

				{fetchState === "done"
					? <Routes>
						<Route path="/" element={<Navigate replace to="/generate" />} />
					</Routes>
					: <Typography>Loading</Typography>}
			</Paper>*/}

			<Box sx={{ margin: "0 0 200px" }} />
		</Container >
	);
}
