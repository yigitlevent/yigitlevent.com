import { Fragment, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useDrawerStore } from "../../hooks/stores/useDrawerStore";

import { MenuButtons } from "./MenuButtons";
import { Signin } from "./Signin/Signin";
import { Signup } from "./Signup/Signup";
import { Tools } from "./Drawers/Tools";
import { RulesetSelector } from "./Drawers/RulesetSelector";


export function Menu() {
	const { drawer } = useDrawerStore();

	const [signinOpen, setSigninOpen] = useState(false);
	const [signupOpen, setSignupOpen] = useState(false);

	return (
		<Fragment>
			<Grid container columns={8} justifyContent="space-between" alignItems="start" flexWrap="wrap-reverse">
				<Grid item>
					<Box>
						<Typography variant="h1">BWGR Tools</Typography>
					</Box>
				</Grid>

				<Grid item sx={{ margin: "16px 0" }}>
					<MenuButtons openSignin={() => setSigninOpen(true)} openSignup={() => setSignupOpen(true)} />
				</Grid>
			</Grid>

			<Signin open={signinOpen} handleClose={() => setSigninOpen(false)} />
			<Signup open={signupOpen} handleClose={() => setSignupOpen(false)} />

			<Tools expanded={drawer === "Tools"} />
			<RulesetSelector expanded={drawer === "Datasets"} />
			{/*<Checklist expanded={drawer === "Checklist"} />
			<MyThings expanded={drawer === "My Things"} />*/}
		</Fragment>
	);
}
