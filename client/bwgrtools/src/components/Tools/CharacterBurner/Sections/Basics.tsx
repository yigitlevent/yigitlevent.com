import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useRulesetStore } from "../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerBasicsStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerLifepathStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerSkillStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerSkill";
import { GenericGrid } from "../../../Shared/Grids";


export function Basics({ openModal }: { openModal: (name: BwgrCharacterBurnerModals) => void; }): React.JSX.Element {
	const ruleset = useRulesetStore();
	const { name, stock, gender, concept, setName, setGender, setConcept, setStockAndReset } = useCharacterBurnerBasicsStore();
	const { getAge, lifepaths } = useCharacterBurnerLifepathStore();
	const { skills } = useCharacterBurnerSkillStore();

	const rulesetStock = ruleset.getStock(stock[0]);

	const lifepathsText = lifepaths.map(v => v.name).join(", ");

	const hasSpecialStock = (stock[1] === "Orc" && lifepaths.length > 4) || (stock[1] === "Great Wolf" && lifepaths.length > 0);

	const hasSpecialLifepath
		= lifepaths.some(lifepath => Array.isArray(lifepath.years) || (lifepath.companion?.givesSkills));

	const hasSpecialSkills
		= skills.filter(charSkill => { return charSkill.name === "Any Skill" || charSkill.name === "Any Wise" || ruleset.getSkill(charSkill.id).subskillIds !== undefined; }).length > 0;

	const disableSpecialOptionsModal = !hasSpecialStock && !hasSpecialLifepath && !hasSpecialSkills;

	return (
		<GenericGrid columns={12} center extraBottomMargin>
			<Grid size={{ xs: 12 }}>
				<TextField label="Name" value={name} onChange={(e) => { setName(e.target.value); }} fullWidth variant="standard" />
			</Grid>

			<Grid size={{ xs: 12 }}>
				<TextField label="Concept" value={concept} onChange={(e) => { setConcept(e.target.value); }} fullWidth variant="standard" />
			</Grid>

			<Grid size={{ xs: 12, sm: 4 }}>
				<Autocomplete
					renderInput={(params) => <TextField {...params} label="Stock" variant="standard" fullWidth />}
					options={ruleset.stocks.map(v => [v.id, v.name] as [id: BwgrStockId, name: string])}
					getOptionLabel={v => v[1]}
					isOptionEqualToValue={(o, v) => o[0] === v[0] && o[1] === v[1]}
					value={stock}
					onChange={(_, v) => { setStockAndReset(v); }}
					disableClearable
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 4 }}>
				<Autocomplete
					value={gender}
					options={["Male", "Female"]}
					renderInput={(params) => <TextField {...params} label="Gender" variant="standard" fullWidth />}
					onChange={(_, v) => { setGender(v as "Male" | "Female"); }}
					fullWidth
					disableClearable
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 2 }}>
				<TextField label="Age" value={getAge()} fullWidth variant="standard" disabled />
			</Grid>

			<Grid size={{ xs: 12, sm: 2 }}>
				<TextField label="Stride" value={rulesetStock.stride} fullWidth variant="standard" disabled />
			</Grid>

			<Grid size={{ xs: 12 }}>
				<TextField label="Lifepaths" value={lifepathsText} fullWidth variant="standard" disabled multiline rows={Math.ceil(lifepathsText.length / 100)} />
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<Button variant="outlined" size="medium" onClick={() => { openModal("lp"); }} fullWidth>Select</Button>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<Button variant="outlined" size="medium" onClick={() => { openModal("randLp"); }} fullWidth>Random</Button>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<Button variant="outlined" size="medium" onClick={() => { openModal("qu"); }} disabled={lifepaths.length === 0} fullWidth>Questions</Button>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<Button variant="outlined" size="medium" onClick={() => { openModal("so"); }} disabled={disableSpecialOptionsModal} fullWidth>Special</Button>
			</Grid>
		</GenericGrid>
	);
}
