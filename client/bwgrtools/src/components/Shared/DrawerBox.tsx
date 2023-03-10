import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";


export function DrawerBox({ children, title, expanded }: { children: React.ReactNode; title: string; expanded: boolean; }) {
	return (
		<Slide direction="left" in={expanded}>
			<Card variant="outlined" sx={{ overflow: "auto", position: "fixed", width: "350px", maxWidth: "calc(100vw - 32px)", height: "calc(100vh - 118px)", maxHeight: "calc(100vh - 118px)", bottom: "16px", right: "16px", zIndex: 100000 }}>
				<Box sx={{ padding: "12px 16px 36px" }}>
					<Typography variant="h5" sx={{ textAlign: "center" }}>{title}</Typography>

					<Divider sx={{ margin: "0 0 8px" }} />

					{children}
				</Box>
			</Card>
		</Slide>
	);
}
