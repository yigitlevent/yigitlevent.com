import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import { useDrawerStore } from "../../hooks/useDrawerStore";


export function DrawerBox({ children, title, expanded }: { children: React.ReactNode; title: string; expanded: boolean; }): JSX.Element {
	const { toggleDrawer } = useDrawerStore();

	return (
		<Drawer
			anchor={"right"}
			open={expanded}
			onClose={() => toggleDrawer()}
		>
			<Card variant="outlined" sx={{ overflow: "auto", position: "fixed", width: "350px", maxWidth: "calc(100svw - 32px)", height: "calc(100svh - 118px)", maxHeight: "calc(100svh - 118px)", bottom: "16px", right: "16px", zIndex: 100000 }}>
				<Box sx={{ padding: "12px 16px 36px" }}>
					<Typography variant="h5" sx={{ textAlign: "center" }}>{title}</Typography>
					<Divider sx={{ margin: "0 0 8px" }} />
					{children}
				</Box>
			</Card>
		</Drawer>
	);
}
