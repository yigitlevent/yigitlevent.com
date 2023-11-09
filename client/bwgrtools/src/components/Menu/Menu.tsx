import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";


import { RulesetSelector } from "./Drawers/RulesetSelector";
import { Tools } from "./Drawers/Tools";
import { MenuButtons } from "./MenuButtons";
import { Signin } from "./Signin/Signin";
import { Signup } from "./Signup/Signup";
import { useDrawerStore } from "../../hooks/apiStores/useDrawerStore";


export function Menu(): JSX.Element {
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
