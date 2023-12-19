import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { useRulesetStore } from "../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerAttributeStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerAttribute";
import { useCharacterBurnerBasicsStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerTraitStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerTrait";
import { GenericGrid } from "../../../Shared/Grids";


export function GeneralTraitModal({ isOpen, close }: { isOpen: boolean; close: () => void; }): JSX.Element {
	const ruleset = useRulesetStore();
	const { stock } = useCharacterBurnerBasicsStore();
	const { traits, addGeneralTrait, getTraitPools } = useCharacterBurnerTraitStore();
	const { hasAttribute } = useCharacterBurnerAttributeStore();

	const [possibleTraits, setPossibleTraits] = useState<Trait[]>([]);
	const [chosenTrait, setChosenTrait] = useState<Trait>();

	const addNewTrait = () => {
		if (chosenTrait) {
			addGeneralTrait(chosenTrait);
			close();
		}
	};

	useEffect(() => {
		if (ruleset.fetchState === "done") {
			const traitPools = getTraitPools();

			const possible = ruleset.traits.filter(trait =>
				!traits.has(trait.id)
				&& (trait.stock ? trait.stock === stock : true)
				&& trait.cost <= traitPools.remaining
			);
			setPossibleTraits(possible);
		}
	}, [hasAttribute, ruleset.fetchState, ruleset.traits, traits, stock, getTraitPools]);

	useEffect(() => {
		if (possibleTraits.length > 0) setChosenTrait(possibleTraits[0]);
	}, [possibleTraits]);

	return (
		<Modal open={isOpen} onClose={() => close()}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "800px", width: "100%", padding: "0 24px 24px", border: "none", overflow: "auto" }}>
				<GenericGrid columns={1} spacing={[2, 2]} center>
					{chosenTrait
						? <Grid item xs={1}>
							<Autocomplete
								value={chosenTrait}
								options={possibleTraits.sort((a, b) => a.category[1].localeCompare(b.category[1]) || a.name.localeCompare(b.name))}
								getOptionLabel={(option) => option.name}
								groupBy={(option) => option.category[1]}
								renderInput={(params) => <TextField {...params} label="Chosen Trait" />}
								onChange={(_, v) => setChosenTrait(v)}
								fullWidth
								disableClearable
							/>
						</Grid>
						: null}

					{chosenTrait
						? <Grid item xs={1}>
							<Grid container spacing={1} columns={3}>
								<Grid item xs={3}>
									<Typography variant="h6">{chosenTrait.name}</Typography>
								</Grid>

								<Grid item sm={3} md={1}>
									<Typography variant="caption">Type: {chosenTrait.type[1]}</Typography>
								</Grid>

								{chosenTrait.cost !== 0
									? <Grid item sm={3} md={1}>
										<Typography variant="caption">
											Cost: {chosenTrait.cost}
										</Typography>
									</Grid>
									: null}

								<Grid item sm={3} md={1}>
									{chosenTrait.stock
										? <Typography variant="caption">Stock: {chosenTrait.stock}</Typography>
										: null}
								</Grid>

								<Grid item xs={3}>
									{chosenTrait.description
										? chosenTrait.description.split("<br>").map(v => <Typography key={v} variant="body2" sx={{ textIndent: "8px" }}>{v}</Typography>)
										: null}
								</Grid>
							</Grid>
						</Grid>
						: null}

					<Grid item xs={1}>
						<Button variant="outlined" size="medium" onClick={addNewTrait} fullWidth>Add Trait</Button>
					</Grid>
				</GenericGrid>
			</Paper>
		</Modal>

	);
}
