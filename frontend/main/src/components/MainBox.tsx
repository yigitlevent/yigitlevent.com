import { Route, Routes } from "react-router-dom";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Home } from "./Home";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { NotFound } from "./NotFound";
import { Admin } from "./Admin";


export function MainBox() {
	return (
		<Container maxWidth="lg" sx={{ margin: "10px auto" }}>
			<Box sx={{ margin: "0 0 16px 0" }}>
				<Typography variant="h4">yigitlevent.com</Typography>
				<Typography variant="subtitle1">my unnecessarily complicated website</Typography>
			</Box>

			<Paper sx={{ padding: "10px 20px" }}>
				<Routes>
					<Route path="/" index element={<Home />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Paper>

			<Box sx={{ margin: "0 0 200px" }} />
		</Container>
	);
}
