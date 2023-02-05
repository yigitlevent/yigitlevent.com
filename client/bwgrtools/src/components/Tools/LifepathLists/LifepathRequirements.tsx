import { Fragment } from "react";

import { Lifepath } from "../../../data/stocks/_stocks";
import { useRulesetStore } from "../../../hooks/stores/useRulesetStore";
import { GetOrdinalSuffix, MakeName } from "../../../utils/misc";
import { GetLifepathFromPath, GetSettingFromPath, GetSkillFromPath, GetTraitFromPath } from "../../../utils/pathFinder";


export function LifepathRequirements({ lifepath }: { lifepath: Lifepath; }) {
	const { checkRulesets } = useRulesetStore();

	const requirementsResolver = (conditionsBlock: Condition): string => {

		const tempSet = new Set<string>();

		conditionsBlock.items.forEach(condition => {
			if (typeof condition === "string") {
				if (condition.startsWith("Skill") && checkRulesets(GetSkillFromPath(condition).allowed)) {
					tempSet.add(MakeName(condition, 2, ["skill", "skills"]));
				}
				else if (condition.startsWith("Trait") && checkRulesets(GetTraitFromPath(condition).allowed)) {
					tempSet.add(MakeName(condition, 2, ["trait", "traits"]));
				}
				else if (condition.includes("ANY") && checkRulesets(GetSettingFromPath(condition).allowed)) {
					tempSet.add(MakeName(condition, 2, ["lifepath", "lifepaths"]));
				}
				else if (condition.includes("*")) {
					const split = condition.split("➞");
					split[2] = split[2].split("*")[1];
					if (checkRulesets(GetLifepathFromPath(split.join("➞")).allowed)) {
						tempSet.add(MakeName(condition, 2, ["lifepath", "lifepaths"]));
					}
				}
				else if (!condition.includes("ANY") && checkRulesets(GetLifepathFromPath(condition).allowed)) {
					tempSet.add(MakeName(condition, 2, ["lifepath", "lifepaths"]));
				}
			}
			else tempSet.add(requirementsResolver(condition));
		});

		const array = [...tempSet];

		if (array.length > 1 && conditionsBlock.type !== "NOT") {
			array[array.length - 1] = `${conditionsBlock.type.toLowerCase()} ${array[array.length - 1]}`;
		}
		else if (conditionsBlock.type === "NOT") {
			array[0] = `Character cannot have ${array[0]}`;

			if (array.length > 1) {
				array[array.length - 1] = `and ${array[array.length - 1]}`;
			}
		}

		return (array.length < 3) ? array.join(" ") : array.join(", ");
	};

	const limitsResolver = (limitsBlock: Limit[]): JSX.Element[] => {
		const limits: string[] = [];
		limitsBlock.forEach((limit) => {
			const temp = limit.split("➞");
			if (temp[0] === "LP") {
				if (temp[1] === "UNIQUE") limits.push("This cannot be selected twice.");
				else if (temp[1] === "MIN") limits.push(`This can be selected as the ${GetOrdinalSuffix(parseInt(temp[2]))} lifepath or higher.`);
				else if (temp[1] === "MAX") limits.push(`This can be selected as the ${GetOrdinalSuffix(parseInt(temp[2]))} lifepath or lower.`);
			}
			else if (temp[0] === "YEARS") {
				if (temp[1] === "MIN") limits.push(`Character must be at least ${parseInt(temp[2])} years old.`);
				else if (temp[1] === "MAX") limits.push(`Character must be at most ${parseInt(temp[2])} years old.`);
			}
			else if (temp[0] === "GRIEF") {
				if (temp[1] === "MIN") limits.push(`Character must have at least a ${temp[0].toLowerCase()} of ${parseInt(temp[2])}.`);
				else if (temp[1] === "MAX") limits.push(`Character must have at most a ${temp[0].toLowerCase()} of ${parseInt(temp[2])}.`);
			}
			else if (temp[0] === "GENDER") {
				limits.push(`Character's must be a ${temp[1].toLowerCase()}.`);
			}
		});

		return limits.map((limit, i) => <span key={i}>{limit}</span>);
	};

	return (
		<Fragment>
			<b>Requirements: </b>

			{(lifepath.requirements.conditions)
				? <span>{requirementsResolver(lifepath.requirements.conditions)}. </span>
				: null}

			{(lifepath.requirements.limits)
				? limitsResolver(lifepath.requirements.limits)
				: null}

			{(lifepath.requirements.texts)
				? lifepath.requirements.texts.map((text, textIndex) => <span key={textIndex}>{text} </span>)
				: null}
		</Fragment>
	);
}
