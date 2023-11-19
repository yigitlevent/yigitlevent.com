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

import { useCharacterBurnerStatStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerStat";
import { useCharacterBurnerTraitStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerTrait";
import { GetAverage } from "../../../../utils/misc";
import { GenericGrid } from "../../../Shared/Grids";


export function Tolerances(): JSX.Element {
	const { getStat } = useCharacterBurnerStatStore();
	const { hasTraitOpenByName } = useCharacterBurnerTraitStore();

	const [tolerances, setTolerances] = useState<string[]>(Array(16).fill("—"));

	const power = getStat("Power");
	const forte = getStat("Forte");

	useEffect(() => {
		const ptgs: string[] = Array(16).fill("—");

		const maxDistance = Math.ceil(forte.exponent / 2);

		const mortalWound
			= hasTraitOpenByName("Tough")
				? Math.ceil(GetAverage([power.exponent, forte.exponent])) + 6
				: Math.floor(GetAverage([power.exponent, forte.exponent])) + 6;

		let traumatic = mortalWound - 1;
		let severe = mortalWound - 2;
		let midi = mortalWound - 3;
		let light = mortalWound - 4;
		const superficial = Math.floor(forte.exponent / 2) + 1;

		while (light - superficial > maxDistance) light--;
		while (midi - light > maxDistance) midi--;
		while (severe - midi > maxDistance) severe--;
		while (traumatic - severe > maxDistance) traumatic--;

		for (let i = 0; i < ptgs.length; i++) {
			if (i >= superficial && i < light) ptgs[i] = "Su";
			else if (i >= light && i < midi) ptgs[i] = "Li";
			else if (i >= midi && i < severe) ptgs[i] = "Mi";
			else if (i >= severe && i < traumatic) ptgs[i] = "Se";
			else if (i >= traumatic && i < mortalWound) ptgs[i] = "Tr";
			else if (i === mortalWound) ptgs[i] = "MW";
		}

		setTolerances(ptgs);
	}, [forte.exponent, getStat, hasTraitOpenByName, power.exponent]);

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
