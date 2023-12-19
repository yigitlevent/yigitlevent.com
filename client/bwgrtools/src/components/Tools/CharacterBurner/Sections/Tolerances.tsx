import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { useCharacterBurnerMiscStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { useCharacterBurnerStatStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerStat";
import { GenericGrid } from "../../../Shared/Grids";


export function Tolerances(): JSX.Element {
	const { stats } = useCharacterBurnerStatStore();
	const { getTolerances } = useCharacterBurnerMiscStore();

	const [tolerances, setTolerances] = useState<string[]>(Array(16).fill("—"));

	useEffect(() => {
		setTolerances(getTolerances());
	}, [getTolerances, stats]);

	return (
		<GenericGrid columns={16} spacing={[0, 1]} center extraBottomMargin>
			<Grid item xs={16}>
				<Typography variant="h4">Tolerances</Typography>
			</Grid>

			<Grid item xs={16}>
				<TableContainer component={Paper}>
					<Table size="small">
						<TableHead>
							<TableRow>
								{Array.from(Array(16).keys()).map(v => (
									<TableCell key={v} sx={{ textAlign: "center" }}>
										B{v + 1}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							<TableRow sx={{ margin: "8px 0 0", "&:last-child td": { border: 0 } }}>
								{tolerances.map((tolerance, i) => (
									<TableCell key={i} component="td" scope="row" sx={{ textAlign: "center" }}>
										{tolerance}
									</TableCell>
								))}
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</GenericGrid>
	);
}
