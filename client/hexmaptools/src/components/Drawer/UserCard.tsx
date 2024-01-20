import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import OpenInBrowserRoundedIcon from "@mui/icons-material/OpenInBrowserRounded";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { Fragment, useState } from "react";

import { SigninModal } from "./SigninModal";
import { SignupModal } from "./SignupModal";
import { useUserStore } from "../../hooks/apiStores/useUserStore";


export function UserCard(): JSX.Element {
	const [openSignin, setOpenSignin] = useState(false);
	const [openSignup, setOpenSignup] = useState(false);
	const [user, signout] = useUserStore(state => [state.user, state.signout]);

	return (
		<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
			{user
				? <Fragment>
					<Box sx={{ minWidth: 0, flex: 1 }}>
						<Typography level="title-sm">{user.username}</Typography>
						<Typography level="body-xs">{user.email}</Typography>
					</Box>

					<IconButton title="Sign out" size="sm" variant="plain" color="neutral" onClick={() => signout()}>
						<LogoutRoundedIcon />
					</IconButton>
				</Fragment>
				: <Fragment>
					<Box sx={{ minWidth: 0, flex: 1 }}>
						<Typography level="body-xs">Sign up to save, load, and much more!</Typography>
					</Box>

					<IconButton title="Sign in" size="sm" variant="plain" color="neutral" onClick={() => setOpenSignin(true)}>
						<LoginRoundedIcon />
					</IconButton>

					<IconButton title="Sign up" size="sm" variant="plain" color="neutral" onClick={() => setOpenSignup(true)}>
						<OpenInBrowserRoundedIcon />
					</IconButton>
				</Fragment>}

			<SigninModal open={openSignin} close={() => setOpenSignin(false)} />
			<SignupModal open={openSignup} close={() => setOpenSignup(false)} />
		</Box>
	);
}
