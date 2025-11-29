import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { SxProps, Theme } from "@mui/material/styles";
import { Fragment, useState } from "react";

import { Checklist } from "./Drawers/Checklist";
import { RulesetSelector } from "./Drawers/RulesetSelector";
import { Tools } from "./Drawers/Tools";
import { Signin } from "./Signin/Signin";
import { Signup } from "./Signup/Signup";
import { useUserStore } from "../../hooks/apiStores/useUserStore";
import { useDrawerStore, DrawerNames } from "../../hooks/useDrawerStore";
import { THEME } from "../../theme/theme";


function DrawerIconButton({ title, icon, onClick }: { title: string; icon: React.JSX.Element; onClick: () => void; }): React.JSX.Element {
	return (
		<Grid sx={{ margin: "8px 0 8px 8px" }}>
			<Paper variant="outlined" sx={{ padding: "4px 4px" }}>
				<IconButton title={title} onClick={() => { onClick(); }}>{icon}</IconButton>
			</Paper>
		</Grid>
	);
}

export function Menu({ bottom }: { bottom: boolean; }): React.JSX.Element {
	const { drawer } = useDrawerStore();
	const { user, signout } = useUserStore();
	const { toggleDrawer } = useDrawerStore();

	const [signinOpen, setSigninOpen] = useState(false);
	const [signupOpen, setSignupOpen] = useState(false);

	const buttons: { title: DrawerNames, icon: React.JSX.Element; authOnly: boolean; }[] = [
		{ title: "Tools", icon: <ListAltOutlinedIcon color="primary" />, authOnly: false },
		{ title: "Datasets", icon: <DatasetOutlinedIcon color="primary" />, authOnly: false },
		{ title: "Checklist", icon: <FactCheckOutlinedIcon color="primary" />, authOnly: false },
		{ title: "My Things", icon: <AutoStoriesOutlinedIcon color="primary" />, authOnly: true }
	];

	const style: SxProps<Theme> = {
		position: "fixed", width: "100%", left: 0, bottom: 0,
		padding: "0 0", background: THEME.palette.background.paper, zIndex: 123456789
	};

	return (
		<Grid container alignItems="center" justifyContent={bottom ? "center" : "end"} sx={bottom ? style : undefined}>
			{user
				? <DrawerIconButton title={"Sign out"} icon={<LogoutOutlinedIcon color="primary" />} onClick={signout} />
				: <Fragment>
					<DrawerIconButton title={"Sign in"} icon={<LoginOutlinedIcon color="primary" />} onClick={() => { setSigninOpen(true); }} />
					<DrawerIconButton title={"Sign up"} icon={<OpenInBrowserOutlinedIcon color="primary" />} onClick={() => { setSignupOpen(true); }} />
				</Fragment>}

			{buttons.reverse()
				.filter(v => !v.authOnly || user)
				.map((v, i) => <DrawerIconButton key={i} title={v.title} icon={v.icon} onClick={() => { toggleDrawer(v.title); }} />)}

			<Signin open={signinOpen} handleClose={() => { setSigninOpen(false); }} />
			<Signup open={signupOpen} handleClose={() => { setSignupOpen(false); }} />
			<Tools expanded={drawer === "Tools"} />
			<RulesetSelector expanded={drawer === "Datasets"} />
			<Checklist expanded={drawer === "Checklist"} />
			{/*<MyThings expanded={drawer === "My Things"} />*/}
		</Grid>
	);
}
