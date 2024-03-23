import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { UniqueArray } from "@utility/UniqueArray";
import { Fragment, useCallback, useEffect, useState } from "react";

import { useRulesetStore } from "../../../../../hooks/apiStores/useRulesetStore";
import { useCharacterBurnerAttributeStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerAttribute";
import { useCharacterBurnerBasicsStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerBasics";
import { useCharacterBurnerMiscStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { useCharacterBurnerSkillStore } from "../../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerSkill";


export function SpecialSkills(): JSX.Element {
	const ruleset = useRulesetStore();
	const { stock } = useCharacterBurnerBasicsStore();
	const { skills } = useCharacterBurnerSkillStore();
	const { special, resetSkillSubskills, modifySkillSubskills } = useCharacterBurnerMiscStore();
	const { hasAttribute } = useCharacterBurnerAttributeStore();
	const [specialSkillIds, setSpecialSkillIds] = useState<BwgrSkillId[]>([]);

	const getSpecialSkillIds = useCallback((characterSkills: UniqueArray<BwgrSkillId, BwgrCharacterSkill>): BwgrSkillId[] => {
		return characterSkills
			.filter(charSkill =>
				charSkill.name === "Any Skill"
				|| charSkill.name === "Any Wise"
				|| ruleset.getSkill(charSkill.id).subskillIds !== undefined
			)
			.map(charSkill => charSkill.id);
	}, [ruleset]);

	useEffect(() => {
		setSpecialSkillIds(getSpecialSkillIds(skills));
	}, [getSpecialSkillIds, skills]);

	useEffect(() => {
		resetSkillSubskills(specialSkillIds);
	}, [resetSkillSubskills, specialSkillIds]);

	return (
		<Fragment>
			{specialSkillIds.map((charSkillId, i) => {
				const skill = ruleset.getSkill(charSkillId);
				const canSelectMultiple = skill.name === "Appropriate Weapons";

				const subskillIds = skill.subskillIds;
				let subskills: BwgrSkill[] = [];

				if (skill.name === "Any Skill") {
					subskills = ruleset.skills.filter(s =>
						!skills.has(s.id)
						&& (s.stock === stock || (s.restriction?.onlyStock ? s.restriction.onlyStock[0] === stock[0] ? true : false : true))
						&& (s.restriction?.onlyWithAbility ? hasAttribute(s.restriction.onlyWithAbility[0]) ? true : false : true)
						&& !s.flags.dontList
					);
				}
				else if (skill.name === "Any Wise") {
					subskills = ruleset.skills.filter(s =>
						!skills.has(s.id)
						&& (s.stock === stock || (s.restriction?.onlyStock ? s.restriction.onlyStock[0] === stock[0] ? true : false : true))
						&& (s.restriction?.onlyWithAbility ? hasAttribute(s.restriction.onlyWithAbility[0]) ? true : false : true)
						&& s.category[1] === "Wise"
						&& !s.flags.dontList
					);
				}
				else if (subskillIds) {
					subskills = ruleset.skills.filter(s =>
						!skills.has(s.id)
						&& subskillIds.includes(s.id)
						&& (s.stock === stock || (s.restriction?.onlyStock ? s.restriction.onlyStock[0] === stock[0] ? true : false : true))
						&& (s.restriction?.onlyWithAbility ? hasAttribute(s.restriction.onlyWithAbility[0]) ? true : false : true)
					);
				}

				return (
					<Fragment key={i}>
						{skill.id in special.chosenSubskills
							? canSelectMultiple
								? <Autocomplete
									value={special.chosenSubskills[skill.id].map(ruleset.getSkill)}
									options={subskills.sort((a, b) => a.category[1].localeCompare(b.category[1]) || a.name.localeCompare(b.name))}
									getOptionLabel={(option) => option.name}
									groupBy={(option) => option.category[1]}
									renderInput={(params) => <TextField {...params} label="Chosen Skills" />}
									onChange={(_, v) => modifySkillSubskills(skill.id, v.map(v => v.id), canSelectMultiple)}
									fullWidth
									multiple
								/>
								: <Autocomplete
									value={special.chosenSubskills[skill.id].map(ruleset.getSkill)[0]}
									options={subskills.sort((a, b) => a.category[1].localeCompare(b.category[1]) || a.name.localeCompare(b.name))}
									getOptionLabel={(option) => option.name}
									groupBy={(option) => option.category[1]}
									renderInput={(params) => <TextField {...params} label="Chosen Skill" />}
									onChange={(_, v) => modifySkillSubskills(skill.id, v ? [v.id] : null, canSelectMultiple)}
									fullWidth
								/>
							: null}
					</Fragment>
				);
			})}
		</Fragment>
	);
}
