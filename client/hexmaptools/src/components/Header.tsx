import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";

import { useDrawerStore } from "../hooks/useDrawerStore";


export function Header(): JSX.Element {
	const [toggleDrawer] = useDrawerStore(state => [state.toggleDrawer]);

	return (
		<IconButton sx={{ position: "absolute", bottom: 0, right: 0, display: { md: "none" }, margin: 1 }} variant="solid" color="neutral" size="sm" onClick={() => toggleDrawer()}>
			<MenuIcon />
		</IconButton>
	);
}
