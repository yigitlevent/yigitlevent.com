import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import { GenericGrid } from "../../Shared/Grids";


export function BlockDivider(): React.JSX.Element {
	return (
		<GenericGrid columns={1} center>
			<Grid size={{ xs: 1 }}>
				<Divider />
			</Grid>
		</GenericGrid>
	);
}
