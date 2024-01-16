import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment, useCallback, useState } from "react";

import { RandomLifepathsBasics } from "./RandomLifepathsModal/RandomLifepathsBasics";
import { RandomLifepathsLists } from "./RandomLifepathsModal/RandomLifepathsLists";
import { useRulesetStore } from "../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerBasicsStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerLifepathStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useLifepathRandomizerStore } from "../../../../hooks/featureStores/useLifepathRandomizerStore";
import { FilterLifepaths } from "../../../../utils/FilterLifepaths";
import { GenericGrid } from "../../../Shared/Grids";
import { RandomNumber } from "@utility/RandomNumber";


export function RandomLifepathsModal({ isOpen, close }: { isOpen: boolean; close: () => void; }): JSX.Element {
	const ruleset = useRulesetStore();
	const {
		stock, setting, noDuplicates, maxLeads, maxLifepaths, minLifepaths,
		changeStock, changeMaxLeads, changeMaxLifepaths, changeMinLifepaths, toggleNoDuplicates
	} = useLifepathRandomizerStore();

	const { setStockAndReset } = useCharacterBurnerBasicsStore();
	const { addLifepath } = useCharacterBurnerLifepathStore();

	const [newStock, setNewStock] = useState<BwgrStock>();
	const [chosenLifepaths, setChosen] = useState<BwgrLifepath[]>([]);
	const [triedTooMuch, setTriedTooMuch] = useState(false);

	const createRandom = useCallback((): void => {
		const tempChosenLifepaths: BwgrLifepath[] = [];

		let leadsCounter = 0;
		let chosenAmount = 0;
		const lpAmount = RandomNumber(minLifepaths - 1, maxLifepaths - 1);

		const chosenStock = ruleset.stocks.find(v => v.id === stock) || ruleset.stocks[RandomNumber(0, ruleset.stocks.length - 1)];
		setNewStock(chosenStock);

		const possibleSettings = ruleset.settings.filter(setting => chosenStock.settingIds.includes(setting.id) && !setting.isSubsetting);
		const chosenSetting = ruleset.settings[ruleset.settings.findIndex(v => v.id === setting)] || possibleSettings[RandomNumber(0, possibleSettings.length - 1)];

		const bornLPs = ruleset.lifepaths.filter(v => v.stock[0] === chosenStock.id && v.setting[0] === chosenSetting.id && v.flags.isBorn);
		tempChosenLifepaths.push(bornLPs[RandomNumber(0, bornLPs.length - 1)]);

		const maxTries = 20;
		let tries = 0;

		while (tries < maxTries && chosenAmount < lpAmount) {
			// chosenStock, tempChosenLifepaths, maxLeads, leadsCounter, checkRulesets
			const possibilities = FilterLifepaths({
				rulesetLifepaths: ruleset.lifepaths,
				stock: [chosenStock.id, chosenStock.name],
				age: tempChosenLifepaths.reduce((p, c) => (typeof c.years === "number") ? p + c.years : p + c.years[0], 0) + leadsCounter,
				lifepaths: tempChosenLifepaths,
				noLeads: maxLeads < leadsCounter ? tempChosenLifepaths[tempChosenLifepaths.length - 1].setting : undefined
			});

			const chosenLP = possibilities[RandomNumber(0, possibilities.length - 1)];

			if (chosenLP.setting !== tempChosenLifepaths[tempChosenLifepaths.length - 1].setting) {
				leadsCounter = leadsCounter + 1;
			}

			const isDuplicate = tempChosenLifepaths.filter(v => (v.name === chosenLP.name && v.setting === chosenLP.setting)).length > 0;
			if (isDuplicate && noDuplicates) {
				tries += 1;
				continue;
			}
			else {
				tries = 0;
				chosenAmount += 1;
				tempChosenLifepaths.push(chosenLP);
			}
		}

		if (tempChosenLifepaths.length < minLifepaths) setTriedTooMuch(true);

		setChosen(tempChosenLifepaths);
	}, [maxLeads, maxLifepaths, minLifepaths, noDuplicates, ruleset.lifepaths, ruleset.settings, ruleset.stocks, setting, stock]);

	const transferCharacter = useCallback(() => {
		if (newStock) {
			setStockAndReset([newStock.id, newStock.name]);
			chosenLifepaths.forEach(addLifepath);
			close();
		}
	}, [addLifepath, chosenLifepaths, close, newStock, setStockAndReset]);

	return (
		<Modal open={isOpen} onClose={() => close()}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "800px", width: "100%", padding: "0 24px 24px", border: "none", overflow: "auto" }}>
				{<GenericGrid columns={7} center>
					<Grid item xs={7} sm={3} md={2}>
						<FormControl fullWidth variant="standard">
							<InputLabel>Stock</InputLabel>

							<Select label="Stock" value={stock} onChange={e => changeStock(e.target.value as BwgrStockId | "Random")}>
								<MenuItem key={"Random"} value={"Random"}>Random</MenuItem>
								{ruleset.stocks.map(v => { return <MenuItem key={v.name} value={v.id}>{v.name}</MenuItem>; })}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={7} sm={4} md={1}>
						<TextField
							label="Max Leads"
							inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
							value={maxLeads}
							onChange={e => changeMaxLeads(e.target.value)}
							fullWidth
							variant="standard"
						/>
					</Grid>

					<Grid item xs={7} sm={2} md={1}>
						<TextField
							label="Min Lifepaths"
							inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
							value={minLifepaths}
							onChange={e => changeMinLifepaths(e.target.value)}
							fullWidth
							variant="standard"
						/>
					</Grid>

					<Grid item xs={7} sm={2} md={1}>
						<TextField
							label="Max Lifepaths"
							inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
							value={maxLifepaths}
							onChange={e => changeMaxLifepaths(e.target.value)}
							fullWidth
							variant="standard"
						/>
					</Grid>

					<Grid item xs={7} sm={3} md={2}>
						<FormControlLabel
							label="No Duplicates"
							labelPlacement="start"
							control={<Checkbox checked={noDuplicates} onChange={toggleNoDuplicates} />}
						/>
					</Grid>

					<Grid item xs={7}>
						<Alert severity="info">Random lifepath selection does not consider the gender, lifepaths with variable ages, and emotional attribute limits. Please make sure to check those requirements seperately.</Alert>
					</Grid>

					<Grid item xs={7}>
						<Button variant="outlined" onClick={() => createRandom()} fullWidth>Generate Random Character</Button>
					</Grid>
				</GenericGrid>}

				{chosenLifepaths.length > 0
					? <GenericGrid columns={2}>
						{triedTooMuch
							? <Grid item xs={2}>
								<Alert severity="warning">There might be lifepaths missing because of the chosen options.</Alert>
							</Grid>
							: <Fragment />}

						<Grid item xs={2} md={1}>
							<Divider sx={{ margin: "0 0 6px" }}>
								<Typography>Lifepaths</Typography>
							</Divider>

							<Stack spacing={2}>
								{chosenLifepaths.map((v, i) =>
									<Paper key={i}>{i + 1}. {`${v.setting[1]}➞${v.name}`}</Paper>
								)}
							</Stack>

							<Divider sx={{ margin: "30px 0 6px" }}>
								<Typography>Basic Information</Typography>
							</Divider>

							<RandomLifepathsBasics chosenLifepaths={chosenLifepaths} />
						</Grid>

						<Grid item xs={2} md={1}>
							<Divider sx={{ margin: "0 0 6px" }}>
								<Typography>Skills, Traits, and Misc</Typography>
							</Divider>

							<RandomLifepathsLists chosenLifepaths={chosenLifepaths} />
						</Grid>

						<Grid item xs={2}>
							<Button variant="outlined" onClick={() => transferCharacter()} fullWidth>I like this Character</Button>
						</Grid>
					</GenericGrid>
					: null}
			</Paper>
		</Modal>
	);
}
