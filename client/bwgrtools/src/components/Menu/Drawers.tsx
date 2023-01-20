import { Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";

import { useUserStore } from "../../hooks/stores/useUserStore";

import { Menu } from "./Menu";
import { Checklist } from "./Checklist";
import { RulesetSelector } from "./RulesetSelector";
import { Signin } from "../Signin/Signin";
import { Signup } from "../Signup/Signup";


export function Drawers() {
	const navigate = useNavigate();
	const { user, signout } = useUserStore();

	const [menuExpanded, setMenuExpanded] = useState(false);
	const [datasetsExpanded, setDatasetsExpanded] = useState(false);
	const [checklistExpanded, setChecklistExpanded] = useState(false);

	const [signinOpen, setSigninOpen] = useState(false);
	const [signupOpen, setSignupOpen] = useState(false);

	const changeMenu = useCallback((menu: boolean, datasets: boolean, checklist: boolean) => {
		setMenuExpanded(menu ? v => !v : menu);
		setChecklistExpanded(checklist ? v => !v : checklist);
		setDatasetsExpanded(datasets ? v => !v : datasets);
	}, []);

	const style = { position: "fixed", top: "8px", padding: "4px 4px", zIndex: 100000 };

	const buttons = [
		{ title: "Menu", callback: () => changeMenu(true, false, false), icon: <ListAltOutlinedIcon color="primary" /> },
		{ title: "Datasets", callback: () => changeMenu(false, true, false), icon: <DatasetOutlinedIcon color="primary" /> },
		{ title: "Checklist", callback: () => changeMenu(false, false, true), icon: <FactCheckOutlinedIcon color="primary" /> }
	];

	return (
		<Fragment>
			{user
				? <Paper variant="outlined" sx={{ ...style, right: "190px" }}>
					<IconButton title="Sign out" onClick={() => signout(navigate)}><LogoutOutlinedIcon color="primary" /></IconButton>
				</Paper>
				: <Fragment>
					<Paper variant="outlined" sx={{ ...style, right: "248px" }}>
						<IconButton title="Sign in" onClick={() => setSigninOpen(true)}><LoginOutlinedIcon color="primary" /></IconButton>
					</Paper>
					<Paper variant="outlined" sx={{ ...style, right: "190px" }}>
						<IconButton title="Sign up" onClick={() => setSignupOpen(true)}><OpenInBrowserOutlinedIcon color="primary" /></IconButton>
					</Paper>
				</Fragment>
			}

			<Signin open={signinOpen} handleClose={() => setSigninOpen(false)} />
			<Signup open={signupOpen} handleClose={() => setSignupOpen(false)} />

			{buttons.reverse().map((v, i) =>
				<Paper key={i} variant="outlined" sx={{ ...style, right: `${16 + (58 * i)}px` }}>
					<IconButton title={v.title} onClick={v.callback}>{v.icon}</IconButton>
				</Paper>
			)}

			<Menu expanded={menuExpanded} />
			<RulesetSelector expanded={datasetsExpanded} />
			<Checklist expanded={checklistExpanded} />
		</Fragment>
	);
}
