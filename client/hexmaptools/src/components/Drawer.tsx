import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/material/SvgIcon";

import { ModalButton } from "./Drawer/ModalButton";
import { RouteButton } from "./Drawer/RouteButton";
import { UserCard } from "./Drawer/UserCard";
import { useDrawerStore } from "../hooks/useDrawerStore";


export function Drawer(): JSX.Element {
	const [open, width] = useDrawerStore(state => [state.isDrawerOpen, state.drawerWidth]);

	const routes: [string, string, typeof SvgIcon][] = [
		["Home", "", HomeRoundedIcon],
		["Dashboard", "", DashboardRoundedIcon],
		["Orders", "", ShoppingCartRoundedIcon]
	];

	const modals: [string, () => void, typeof SvgIcon][] = [
		["Settings", () => { /** */ }, SupportRoundedIcon]
	];

	return (
		<Sheet
			sx={{
				position: { xs: "fixed", md: "sticky" },
				transform: {
					xs: open ? "none" : "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
					md: "none"
				},
				transition: "transform 0.4s, width 0.4s",
				zIndex: 10000,
				width: `${width}px`,
				bottom: 0,
				padding: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2
			}}
		>
			<Box>
				<Typography level="h3">Hexmap Tools</Typography>
			</Box>

			<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
				<List size="sm" sx={{ gap: 1 }}>
					{routes.map((item, index) => <RouteButton key={index} title={item[0]} route={item[1]} Icon={item[2]} />)}
				</List>

				<List size="sm" sx={{ flexGrow: 0 }}>
					{modals.map((item, index) => <ModalButton key={index} title={item[0]} onClick={item[1]} Icon={item[2]} />)}
				</List>
			</Box>

			<Divider />
			<UserCard />
		</Sheet>
	);
}
