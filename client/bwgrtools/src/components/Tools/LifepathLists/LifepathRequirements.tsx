import { Fragment } from "react";

import { Lifepath } from "../../../data/stocks/_stocks";
import { useRulesetStore } from "../../../hooks/stores/useRulesetStore";
import { GetOrdinalSuffix, MakeName } from "../../../utils/misc";
import { GetLifepathFromPath, GetSettingFromPath, GetSkillFromPath, GetTraitFromPath } from "../../../utils/pathFinder";


// FIX: Requirements string resolution is probably completely broken now
function ResolveString(requirementBlockItem: string, checkRulesets: (allowed: RulesetId[]) => boolean): string {
	const temp = requirementBlockItem.split("➞");

	if (requirementBlockItem.startsWith("LP")) {
		if (temp[1] === "UNIQUE") return "This cannot be selected twice.";
		else if (temp[1] === "MIN") return `This can be selected as the ${GetOrdinalSuffix(parseInt(temp[2]))} lifepath or higher.`;
		else if (temp[1] === "MAX") return `This can be selected as the ${GetOrdinalSuffix(parseInt(temp[2]))} lifepath or lower.`;
		else throw new Error(`unidentified lp block item: ${requirementBlockItem}`);
	}
	else if (requirementBlockItem.startsWith("YEARS")) {
		if (temp[1] === "MIN") return `Character must be at least ${parseInt(temp[2])} years old.`;
		else if (temp[1] === "MAX") return `Character must be at most ${parseInt(temp[2])} years old.`;
		else throw new Error(`unidentified years block item: ${requirementBlockItem}`);
	}
	else if (requirementBlockItem.startsWith("GRIEF")) {
		if (temp[1] === "MIN") return `Character must have at least a ${temp[0].toLowerCase()} of ${parseInt(temp[2])}.`;
		else if (temp[1] === "MAX") return `Character must have at most a ${temp[0].toLowerCase()} of ${parseInt(temp[2])}.`;
		else throw new Error(`unidentified attribute block item: ${requirementBlockItem}`);
	}
	else if (requirementBlockItem.startsWith("GENDER")) {
		return `Character must be a ${temp[1].toLowerCase()}.`;
	}
	else if (requirementBlockItem.startsWith("OLDESTBY")) {
		return `Character must be oldest by ${temp[1].toLowerCase()}.`;
	}
	else if (requirementBlockItem.startsWith("FIRSTINSETTING")) {
		return "If character leads into this setting, this lifepath must be chosen as the first one in this setting.";
	}
	else if (requirementBlockItem.startsWith("Skill") && checkRulesets(GetSkillFromPath(requirementBlockItem).allowed)) {
		return MakeName(requirementBlockItem, 2, ["skill", "skills"]);
	}
	else if (requirementBlockItem.startsWith("Trait") && checkRulesets(GetTraitFromPath(requirementBlockItem).allowed)) {
		return MakeName(requirementBlockItem, 2, ["trait", "traits"]);
	}
	else if (requirementBlockItem.includes("ANY") && checkRulesets(GetSettingFromPath(requirementBlockItem).allowed)) {
		return MakeName(requirementBlockItem, 2, ["lifepath", "lifepaths"]);
	}
	else if (requirementBlockItem.includes("*") && checkRulesets(GetLifepathFromPath(requirementBlockItem).allowed)) {
		return MakeName(requirementBlockItem, 2, ["lifepath", "lifepaths"]);
	}
	else if (!requirementBlockItem.includes("ANY") && checkRulesets(GetLifepathFromPath(requirementBlockItem).allowed)) {
		return MakeName(requirementBlockItem, 2, ["lifepath", "lifepaths"]);
	}
	else {
		throw new Error(`unidentified requirement block item: ${requirementBlockItem}`);
	}
}

// FIX: Requirements string resolution is probably completely broken now
function BlockJoiner(type: "AND" | "OR" | "NOT", arr: string[]) {
	switch (type) {
		case "AND":
			return `All of the following must be true: \n ${arr.map(s => `➞ ${s}`).join(" \n")}`;
		case "OR":
			return `At least one of the following must be true: \n ${arr.map(s => `➞ ${s}`).join(" \n")}`;
		case "NOT":
			return `None of the following must be true: \n ${arr.map(s => `➞ ${s}`).join(" \n")}`;
		default:
			throw new Error(`unidentified requirement block type: ${type}`);
	}
}

// FIX: Requirements string resolution is probably completely broken now
function ResolveRequirementBlock(requirementBlock: RequirementBlock, checkRulesets: (allowed: RulesetId[]) => boolean): string {
	const blockSet = new Set<string>();
	requirementBlock.items.forEach(item => blockSet.add(ResolveString(item, checkRulesets)));
	return BlockJoiner(requirementBlock.type, [...blockSet]);
}

// FIX: Requirements string resolution is probably completely broken now
function ResolveRequirementBlocks(requirementBlocks: RequirementBlocks, checkRulesets: (allowed: RulesetId[]) => boolean): string {
	const blocksSet = new Set<string>();
	requirementBlocks.items.map(requirementBlock => ResolveRequirementBlock(requirementBlock, checkRulesets));
	return BlockJoiner(requirementBlocks.type, [...blocksSet]);
}

// FIX: Requirements string resolution is probably completely broken now
export function LifepathRequirements({ lifepath }: { lifepath: Lifepath; }) {
	const { checkRulesets } = useRulesetStore();

	return (
		<Fragment>
			<b>Requirements: </b>

			{(lifepath.requirements.conditions)
				? <span>{ResolveRequirementBlocks(lifepath.requirements.conditions, checkRulesets)}. </span>
				: null}

			{(lifepath.requirements.texts)
				? lifepath.requirements.texts.map((text, textIndex) => <span key={textIndex}>{text} </span>)
				: null}
		</Fragment>
	);
}
