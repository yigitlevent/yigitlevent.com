import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Fragment, useEffect, useState } from "react";

import { useRulesetStore } from "../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerBasicsStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerLifepathStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { GenericGrid } from "../../../Shared/Grids";


export function Basics({ openModal }: { openModal: (name: CharacterBurnerModals) => void; }): JSX.Element {
	const { stocks, getStock } = useRulesetStore();
	const { setStockAndReset, name, gender, concept, setName, setGender, setConcept } = useCharacterBurnerBasicsStore();
	const { getAge, lifepaths } = useCharacterBurnerLifepathStore();

	const [stock, setStock] = useState<[StockId, string]>([0 as unknown as StockId, "Dwarf"]);

	useEffect(() => {
		setStockAndReset(stock);
	}, [setStockAndReset, stock]);

	return (
		<GenericGrid columns={6} center extraBottomMargin>
			<Grid item xs={6} sm={6} md={2}>
				<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth variant="standard" />
			</Grid>

			<Grid item xs={6} sm={1}>
				<Autocomplete
					renderInput={(params) => <TextField {...params} label="Stock" variant="standard" fullWidth />}
					options={stocks.map(v => [v.id, v.name] as [id: StockId, name: string])}
					getOptionLabel={v => v[1]}
					isOptionEqualToValue={(o, v) => o[0] === v[0] && o[1] === v[1]}
					value={stock}
					onChange={(_, v) => setStock(v)}
					disableClearable
				/>
			</Grid>

			<Grid item xs={6} sm={1}>
				<Autocomplete
					value={gender}
					options={["Male", "Female"]}
					renderInput={(params) => <TextField {...params} label="Gender" variant="standard" fullWidth />}
					onChange={(_, v) => setGender(v as "Male" | "Female")}
					fullWidth
					disableClearable
				/>
			</Grid>

			<Grid item xs={6} sm={1}>
				<TextField label="Age" value={getAge()} fullWidth variant="standard" disabled />
			</Grid>

			<Grid item xs={6} sm={1}>
				<TextField label="Stride" value={getStock(stock[0]).stride} fullWidth variant="standard" disabled />
			</Grid>

			<Grid item xs={6} sm={6} md={6}>
				<TextField label="Concept" value={concept} onChange={(e) => setConcept(e.target.value)} fullWidth variant="standard" />
			</Grid>

			<Grid item xs={6} sm={4} md={4}>
				<TextField label="Lifepaths" value={lifepaths.map(v => v.name).join(", ")} fullWidth variant="standard" disabled />
			</Grid>

			<Grid item xs={6} sm={1} md={1}>
				<Button variant="outlined" size="medium" onClick={() => openModal("lp")} fullWidth>Select</Button>
			</Grid>

			<Grid item xs={6} sm={1} md={1}>
				<Button variant="outlined" size="medium" onClick={() => openModal("randLp")} fullWidth>Randomize</Button>
			</Grid>

			<Grid item xs={6} sm={2} md={2}>
				<Button variant="outlined" size="medium" onClick={() => openModal("qu")} disabled={lifepaths.length === 0} fullWidth>Questions</Button>
			</Grid>
		</GenericGrid>
	);
}
