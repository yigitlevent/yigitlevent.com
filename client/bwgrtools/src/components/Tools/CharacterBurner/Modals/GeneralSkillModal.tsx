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
import { useCharacterBurnerSkillStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerSkill";
import { GenericGrid } from "../../../Shared/Grids";


export function GeneralSkillModal({ isOpen, close }: { isOpen: boolean; close: () => void; }): JSX.Element {
	const ruleset = useRulesetStore();
	const { stock } = useCharacterBurnerBasicsStore();
	const { skills, addGeneralSkill } = useCharacterBurnerSkillStore();
	const { hasAttribute } = useCharacterBurnerAttributeStore();

	const [possibleSkills, setPossibleSkills] = useState<Skill[]>([]);
	const [chosenSkill, setChosenSkill] = useState<Skill>();

	const addNewSkill = () => {
		if (chosenSkill) {
			addGeneralSkill(chosenSkill);
			close();
		}
	};

	const getRestrictionString = (skill: Skill) => {
		if (skill.restriction) {
			const rest = [];
			if (skill.restriction.onlyStock) rest.push(`Only ${skill.restriction.onlyStock[1]}.`);
			if (skill.restriction.onlyWithAbility) rest.push(`Only ${skill.restriction.onlyWithAbility[1]}.`);
			if (skill.restriction.onlyAtBurn) rest.push("Only during character burn.");
			return rest.join(" ");
		}
		return null;
	};

	useEffect(() => {
		if (ruleset.fetchState === "done") {
			const possible = ruleset.skills.filter(skill =>
				!skills.has(skill.id)
				&& (skill.stock === stock || (skill.restriction?.onlyStock ? skill.restriction.onlyStock[0] === stock[0] ? true : false : true))
				&& (skill.restriction?.onlyWithAbility ? hasAttribute(skill.restriction.onlyWithAbility[0]) ? true : false : true)
			);
			setPossibleSkills(possible);
		}
	}, [hasAttribute, ruleset.fetchState, ruleset.skills, skills, stock]);

	useEffect(() => {
		if (possibleSkills.length > 0) setChosenSkill(possibleSkills[0]);
	}, [possibleSkills]);

	return (
		<Modal open={isOpen} onClose={() => close()}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "800px", width: "100%", padding: "0 24px 24px", border: "none", overflow: "auto" }}>
				<GenericGrid columns={1} spacing={[2, 2]} center>
					{chosenSkill
						? <Grid item xs={1}>
							<Autocomplete
								value={chosenSkill}
								options={possibleSkills.sort((a, b) => a.category[1].localeCompare(b.category[1]) || a.name.localeCompare(b.name))}
								getOptionLabel={(option) => option.name}
								groupBy={(option) => option.category[1]}
								renderInput={(params) => <TextField {...params} label="Chosen Skill" />}
								onChange={(_, v) => setChosenSkill(v)}
								fullWidth
								disableClearable
							/>
						</Grid>
						: null}

					{chosenSkill
						? <Grid item xs={1}>
							<Grid container spacing={1} columns={2}>
								<Grid item xs={2}>
									<Typography variant="h6">{chosenSkill.name}</Typography>
								</Grid>

								<Grid item xs={2} md={1}>
									{chosenSkill.roots
										? <Typography variant="caption">Root: {chosenSkill.roots.join("/")}</Typography>
										: null}
								</Grid>

								<Grid item xs={2} md={1}>
									<Typography variant="caption">Type: {chosenSkill.type[1]}</Typography>
								</Grid>

								<Grid item xs={2}>
									<Typography variant="caption">Tools: {chosenSkill.tool.tool} {chosenSkill.tool.description}</Typography>
								</Grid>

								<Grid item xs={2}>
									{chosenSkill.restriction
										? <Typography variant="caption">Restrictions: {getRestrictionString(chosenSkill)}</Typography>
										: null}
								</Grid>

								<Grid item xs={2}>
									{chosenSkill.description
										? chosenSkill.description.split("<br>").map(v => <Typography key={v} variant="body2">{v}</Typography>)
										: null}
								</Grid>
							</Grid>
						</Grid>
						: null}

					<Grid item xs={1}>
						<Button variant="outlined" size="medium" onClick={addNewSkill} fullWidth>Add Skill</Button>
					</Grid>
				</GenericGrid>
			</Paper>
		</Modal>

	);
}
