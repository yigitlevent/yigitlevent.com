import { useCallback, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";

import { useRulesetStore } from "../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerStoreOld } from "../../../../hooks/oldStores/useCharacterBurnerStoreOld";
import { FilterLifepaths } from "../../../../utils/lifepathFilter";

import { GenericGrid } from "../../../Shared/Grids";
import { LifepathBox } from "../../LifepathLists/LifepathBox";


export function LifepathModal({ openLp, openLpModal }: { openLp: boolean; openLpModal: (open: boolean) => void; }) {
	const { stocks, checkRulesets, getStock, getLifepath } = useRulesetStore();
	const { stockId, lifepathIds, addLifepath } = useCharacterBurnerStoreOld();

	const [chosenLP, setChosenLP] = useState("");

	const getPossibleLifepaths = useCallback(() => {
		if (lifepathIds.length > 0) {
			const possibilities = FilterLifepaths(Stocks[stock], lifepathPaths.map((lp) => GetLifepathFromPath(lp)), Infinity, 0, checkRulesets);
			return possibilities.sort((a, b) => a.name.localeCompare(b.name));
		}

		const possibilities = Object.values(stocks[stock].settings).map(setting => setting.lifepaths.filter(lp => lp.born)).flat().filter(v => checkRulesets(v.allowed));
		return possibilities.sort((a, b) => a.name.localeCompare(b.name));
	}, [checkRulesets, lifepathPaths, stock]);

	const resetDefaultChosen = useCallback(() => {
		setChosenLP(GetPathFromLifepath(getPossibleLifepaths()[0]));
	}, [getPossibleLifepaths]);

	const addNewLifepath = () => {
		openLpModal(false);
		addLifepath(chosenLP as LifepathPath);
		resetDefaultChosen();
	};

	useEffect(() => {
		resetDefaultChosen();
	}, [resetDefaultChosen]);

	return (
		<Modal open={openLp} onClose={() => openLpModal(false)}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "800px", width: "100%", padding: "0 24px 24px", border: "none", overflow: "auto" }}>
				<GenericGrid columns={1} spacing={[2, 2]} center>
					<Grid item xs={1}>
						<Autocomplete
							value={chosenLP}
							options={getPossibleLifepaths().map(GetPathFromLifepath).sort((a, b) => a.localeCompare(b))}
							getOptionLabel={(option) => option.split("➞")[2]}
							groupBy={(option) => option.split("➞")[1]}
							renderInput={(params) => <TextField {...params} label="Chosen Lifepath" />}
							onChange={(e, v) => setChosenLP(v as string)}
							fullWidth
							disableClearable
						/>
					</Grid>

					{(chosenLP.length > 0)
						? <Grid item xs={1}>
							<LifepathBox lifepath={GetLifepathFromPath(chosenLP)} />
						</Grid>
						: null
					}

					<Grid item xs={1}>
						<Button variant="outlined" size="medium" onClick={addNewLifepath} fullWidth>Add Lifepath</Button>
					</Grid>
				</GenericGrid>
			</Paper>
		</Modal>
	);
}
