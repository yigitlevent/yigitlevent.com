export function GetSkillRestrictionString(skill: Skill) {
	if (skill.restriction) {
		const attribute = (skill.restriction.onlyWithAbility) ? ` with ${skill.restriction.onlyWithAbility[1]} ` : " ";
		const type = (skill.restriction.onlyAtBurn) ? " in character burning" : "";
		return `${skill.restriction.onlyStock[1]}${attribute}only${type}.`;
	}

	return "N/A";
}
