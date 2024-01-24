import AbcIcon from "@mui/icons-material/Abc";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Tooltip from "@mui/joy/Tooltip";

import { useHexmapStore } from "../hooks/apiStores/useHexmapStore";
import { useDrawerStore } from "../hooks/useDrawerStore";


export function Controls(): JSX.Element {
	const [switchShowNames] = useHexmapStore(state => [state.switchShowNames]);
	const [toggleDrawer] = useDrawerStore(state => [state.toggleDrawer]);

	return (
		<Stack
			direction="column"
			rowGap={1}
			sx={{ position: "absolute", bottom: 0, right: 0, margin: 1 }}
		>
			<Tooltip title="Show Titles" variant="solid" size="sm" placement="left" sx={{ zIndex: 10001 }}>
				<IconButton variant="solid" color="neutral" onClick={() => switchShowNames()}>
					<AbcIcon />
				</IconButton>
			</Tooltip>

			<Tooltip title="Toggle Drawer" variant="solid" size="sm" placement="left" sx={{ zIndex: 10001 }}>
				<IconButton variant="solid" color="neutral" onClick={() => toggleDrawer()} sx={{ display: { md: "none" } }}>
					<MenuIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
}
