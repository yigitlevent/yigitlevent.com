import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Home } from "./components/Home";


export function App(): JSX.Element {
	if (import.meta.env.MODE === "development") console.debug("This is a debug build.");

	return (
		<Container maxWidth="lg" sx={{ margin: "10px auto" }}>
			<Box sx={{ margin: "0 0 16px 0" }}>
				<Typography variant="h4">yigit levent . com</Typography>
				<Typography variant="subtitle1">my unnecessarily complicated website</Typography>
			</Box>

			<Home />

			<Box sx={{ margin: "0 0 200px" }} />
		</Container>
	);
}
