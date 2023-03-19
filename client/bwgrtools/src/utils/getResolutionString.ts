export function GetResolutionString(item: ResolutionItem): string {
	const parts = [];

	if (item.type === "Skill") parts.push("Skill");
	else {
		if (item.type === "Ob") {
			if (item.obstacle) parts.push("Ob ");
			else parts.push("Ob=");
		}
		else if (item.type === "½") parts.push("½ ");
		else if (item.type === "Vs") parts.push("Vs ");
		else if (item.type === "+Vs") parts.push("+Vs ");
		else if (item.type === "Vs+") parts.push("Vs+ ");
	}

	// Prefix
	if (item.ability) parts.unshift(`${item.ability} `);
	else if (item.skill) parts.unshift(`${item.skill} `);

	// Suffix
	if (item.obstacle) parts.push(item.obstacle);
	else if (item.againstSkill) parts.push("Skill");
	else if (item.opposingAbility) parts.push(item.opposingAbility);

	// Suffix modifier
	if (item.opposingModifier) parts.push(` +${item.opposingModifier}D`);

	return parts.join("");
}
