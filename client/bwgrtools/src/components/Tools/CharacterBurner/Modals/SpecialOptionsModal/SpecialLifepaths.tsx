import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment, useCallback } from "react";

import { useRulesetStore } from "../../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerLifepathStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerLifepath";
import { useCharacterBurnerMiscStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { AbilityButton } from "../../../../Shared/AbilityButton";


export function SpecialLifepaths(): React.JSX.Element {
	const ruleset = useRulesetStore();
	const { lifepaths } = useCharacterBurnerLifepathStore();

	const { special, modifyVariableAge, modifyCompanionSkills } = useCharacterBurnerMiscStore();

	const getPossibleLifepaths = useCallback(() => {
		return ruleset.lifepaths
			.filter(lifepath => !lifepath.flags.isBorn && ["City Dweller", "Noble", "Professional Soldier", "Villager"].some(v => lifepath.setting.includes(v)))
			.sort((a, b) => a.name.localeCompare(b.name))
			.map(lifepath => ({ label: lifepath.name, id: lifepath.id }));
	}, [ruleset.lifepaths]);

	const possibleLifepaths = getPossibleLifepaths();

	return (
		<Fragment>
			{lifepaths // variable age
				.map((lifepath, i) => {
					if (Array.isArray(lifepath.years)) {
						const years = lifepath.years;
						const chosenYears = special.variableAge[lifepath.id];
						return (
							<Fragment key={i}>
								<Grid size={{ xs: 1 }}>
									<Typography>{lifepath.name} years</Typography>
								</Grid>

								<Grid size={{ xs: 2 }}>
									<AbilityButton
										onClick={() => { modifyVariableAge(lifepath.id, chosenYears ? chosenYears + 1 : 1, years); }}
										onContextMenu={() => { modifyVariableAge(lifepath.id, chosenYears ? chosenYears - 1 : 1, years); }}
									>
										{chosenYears}
									</AbilityButton>
								</Grid>
							</Fragment>
						);
					}
					else return null;
				})}

			{lifepaths // companion gives skills
				.map((lifepath, i) => {
					if (lifepath.companion?.givesSkills) {
						const compationName = lifepath.companion.name;

						return (
							<Fragment key={i}>
								<Grid size={{ xs: 1 }}>
									<Typography>{lifepath.name} {compationName} lifepath</Typography>
								</Grid>

								<Grid size={{ xs: 2 }}>
									<Autocomplete
										value={{ id: special.companionLifepath[compationName], label: compationName }}
										options={possibleLifepaths}
										getOptionLabel={(option) => option.label}
										renderInput={(params) => <TextField {...params} label={`${compationName}'s Lifepath`} />}
										onChange={(_, v) => { modifyCompanionSkills(v.id, ruleset.getLifepath(v.id).skills); }}
										fullWidth
										disableClearable
										size="small"
									/>
								</Grid>
							</Fragment>
						);
					}
					else return null;
				})}
		</Fragment>
	);
}
