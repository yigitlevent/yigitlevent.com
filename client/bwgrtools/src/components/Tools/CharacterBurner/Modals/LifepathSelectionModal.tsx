import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Fragment, useCallback, useEffect, useState } from "react";

import { useCharacterBurnerLifepathStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { GenericGrid } from "../../../Shared/Grids";
import { LifepathBox } from "../../LifepathLists/LifepathBox";


// TODO: random lifepath selection: "Choose Lifepaths" or "Random Lifepaths"
export function LifepathSelectionModal({ isOpen, close }: { isOpen: boolean; close: () => void; }): JSX.Element {
	const { availableLifepaths, lifepaths, addLifepath, removeLastLifepath } = useCharacterBurnerLifepathStore();

	const [disabled, setDisabled] = useState(false);
	const [chosen, setChosen] = useState<BwgrLifepath>(availableLifepaths[0]);
	const [available, setAvailable] = useState(availableLifepaths);

	const handle = useCallback((lifepath?: BwgrLifepath) => {
		setDisabled(true);
		if (lifepath) addLifepath(lifepath);
		else removeLastLifepath();
	}, [addLifepath, removeLastLifepath]);

	useEffect(() => {
		setAvailable(availableLifepaths);
		setChosen(availableLifepaths[0]);
		setDisabled(false);
	}, [availableLifepaths]);

	return (
		<Modal open={isOpen} onClose={() => close()}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "1000px", width: "100%", padding: "0 24px 24px", border: "none", overflow: "auto" }}>
				<GenericGrid columns={5} spacing={[2, 2]} center>
					<Grid item xs={5} sm={3} md={3}>
						<Autocomplete
							value={chosen}
							options={available}
							getOptionLabel={(option) => option.name}
							groupBy={(option) => option.setting[1]}
							renderInput={(params) => <TextField {...params} label="Lifepath" variant="standard" fullWidth />}
							onChange={(_, v) => setChosen(v)}
							fullWidth
							disableClearable
							disabled={disabled}
						/>
					</Grid>

					<Grid item xs={5} sm={1} md={1}>
						<Button variant="outlined" size="medium" onClick={() => handle(chosen)} fullWidth disabled={disabled}>Add Lifepath</Button>
					</Grid>

					<Grid item xs={5} sm={1} md={1}>
						<Button variant="outlined" size="medium" onClick={() => handle()} fullWidth disabled={disabled}>Remove Lifepath</Button>
					</Grid>

					<Fragment>
						{lifepaths.map((lp, i) => (
							<Grid key={i} item xs={5}>
								<LifepathBox lifepath={lp} />
							</Grid>
						))}
					</Fragment>
				</GenericGrid>
			</Paper>
		</Modal>
	);
}
