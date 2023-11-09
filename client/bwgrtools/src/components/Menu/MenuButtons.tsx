import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { Fragment } from "react";


//import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";

import { useDrawerStore, DrawerNames } from "../../hooks/apiStores/useDrawerStore";
import { useUserStore } from "../../hooks/apiStores/useUserStore";


function DrawerIconButton({ title, icon, onClick }: { title: string; icon: JSX.Element; onClick: () => void; }) {
	return (
		<Grid item>
			<Paper variant="outlined" sx={{ padding: "4px 4px" }}>
				<IconButton title={title} onClick={() => onClick()}>{icon}</IconButton>
			</Paper>
		</Grid>
	);
}

export function MenuButtons({ openSignin, openSignup }: { openSignin: () => void; openSignup: () => void; }) {
	const { user, signout } = useUserStore();
	const { openDrawer } = useDrawerStore();

	const buttons: { title: DrawerNames, icon: JSX.Element; authOnly: boolean; }[] = [
		{ title: "Tools", icon: <ListAltOutlinedIcon color="primary" />, authOnly: false },
		{ title: "Datasets", icon: <DatasetOutlinedIcon color="primary" />, authOnly: false },
		//{ title: "Checklist", icon: <FactCheckOutlinedIcon color="primary" />, authOnly: false },
		{ title: "My Things", icon: <AutoStoriesOutlinedIcon color="primary" />, authOnly: true }
	];

	return (
		<Grid container spacing={1} alignItems="center" justifySelf="end">
			<Grid item>
				<Box sx={{ textAlign: "right" }}>{user ? `welcome, ${user.username}` : null}</Box>
			</Grid>

			{user
				? <DrawerIconButton title={"Sign out"} icon={<LogoutOutlinedIcon color="primary" />} onClick={signout} />
				: <Fragment>
					<DrawerIconButton title={"Sign in"} icon={<LoginOutlinedIcon color="primary" />} onClick={openSignin} />

					<DrawerIconButton title={"Sign up"} icon={<OpenInBrowserOutlinedIcon color="primary" />} onClick={openSignup} />
				</Fragment>}

			{buttons.reverse()
				.filter(v => !v.authOnly || user)
				.map((v, i) => <DrawerIconButton key={i} title={v.title} icon={v.icon} onClick={() => openDrawer(v.title)} />)}
		</Grid>
	);
}
