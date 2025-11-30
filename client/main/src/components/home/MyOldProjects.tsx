import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";


export function MyOldProjects(): React.JSX.Element {
	return (
		<Fragment>
			<Grid size={{ xs: 2, md: 1 }}>
				<Typography variant="h6">
					<Link href="https://github.com/yigitlevent/tersh-boilerplate" sx={{ textDecoration: "none" }}>TERSH Boilerplate</Link>
				</Typography>

				<Typography>
					A boilerplate for desktop development via electron, react, scss, and typescript. Configuration and the codebase are minimal. It also has hot-reloading of the project configured. Versions of electron and other packages used here are probably very old now.
				</Typography>
			</Grid>

			<Grid size={{ xs: 2, md: 1 }}>
				<Typography variant="h6">
					<Link href="https://github.com/yigitlevent/easy-dictionary" sx={{ textDecoration: "none" }}>Easy Dictionary</Link>
				</Typography>

				<Typography>
					My interest in linguistics led me to creating a conlang. This small app was created to help me keep track of the dictionary. I might revisit this in the future and add it to this website.
				</Typography>
			</Grid>

			<Grid size={{ xs: 2, md: 1 }}>
				<Typography variant="h6">
					<Link href="https://github.com/yigitlevent/autarkis" sx={{ textDecoration: "none" }}>Autarkis</Link>
				</Typography>

				<Typography>
					This was another tabletop game utility, this time for VtR 5e. It included character generation utilities and a database connection via supabase. There also was a companion project to this,
					{" "}
					<Link href="https://github.com/yigitlevent/autarkis-bot" sx={{ textDecoration: "none" }}>Autarkis Bot</Link>
					, which was a discord bot that rolled dice and such.
				</Typography>
			</Grid>

			<Grid size={{ xs: 2, md: 1 }}>
				<Typography variant="h6">
					<Link href="https://github.com/yigitlevent/eshaton" sx={{ textDecoration: "none" }}>Eshaton</Link>
				</Typography>

				<Typography>
					Yet another tabletop game utility. This time for the game Degenesis (it has great art by the way, if that's your thing). This one used a proper backend with expressjs and postgresql and such.
				</Typography>
			</Grid>
		</Fragment>
	);
}
