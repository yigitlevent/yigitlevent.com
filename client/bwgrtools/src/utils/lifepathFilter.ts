import { Lifepath, Stock } from "../data/stocks/_stocks";


function CheckString(chosenLifepaths: Lifepath[], currentAge: number, lp: Lifepath, conditionString: string): boolean {
	// NOT CONSIDERED: GENDER➞FEMALE/MALE, GRIEF➞MIN/MAX, YEARS➞MIN/MAX
	if (conditionString === "LP➞UNIQUE" && chosenLifepaths.includes(lp)) {
		return false;
	}
	else if (conditionString.startsWith("LP➞MIN") && chosenLifepaths.length < parseInt(conditionString.split("➞")[2])) {
		return false;
	}
	else if (conditionString.startsWith("LP➞MAX") && chosenLifepaths.length > parseInt(conditionString.split("➞")[2])) {
		return false;
	}
	else if (conditionString.startsWith("YEARS➞MIN") && currentAge <= parseInt(conditionString.split("➞")[2])) {
		return false;
	}
	else if (conditionString.startsWith("YEARS➞MAX") && currentAge >= parseInt(conditionString.split("➞")[2])) {
		return false;
	}
	else if (conditionString.startsWith("Skill")) {
		const hasSkill = chosenLifepaths.some(lifepath => lifepath.skills.includes((conditionString as any).slice(6)));
		if (!hasSkill) return false;
	}
	else if (conditionString.startsWith("Trait")) {
		const hasTrait = !chosenLifepaths.some(lifepath => lifepath.traits.includes((conditionString as any).slice(6)));
		if (!hasTrait) return false;
	}
	else if (!chosenLifepaths.some(lifepath => lifepath.name === conditionString.split("➞")[2])) {
		return false;
	}

	return true;
}

function CheckResults(blockType: "AND" | "OR" | "NOT", blockResults: boolean[]): boolean {
	switch (blockType) {
		case "AND":
			return blockResults.every(b => b);
		case "OR":
			return blockResults.some(b => b);
		case "NOT":
			return blockResults.every(b => !b);
		default:
			throw new Error("unidentified block type");
	}
}

function CheckBlocks(chosenLifepaths: Lifepath[], currentAge: number, lp: Lifepath, condition: RequirementBlocks): boolean {
	const blocksResults = condition.items.map(block => CheckResults(block.type, block.items.map(item => CheckString(chosenLifepaths, currentAge, lp, item))));
	return CheckResults(condition.type, blocksResults);
}

function GetCurrentAge(chosenLifepaths: Lifepath[], leadCount: number) {
	const yrs = chosenLifepaths.map(v => v.years).filter(v => typeof v === "number") as number[];
	const sum = yrs.reduce((prev, curr) => prev + curr);
	return sum + leadCount;
}

function FilterByRequirements(combinedPossibleLifepaths: Lifepath[], chosenLifepaths: Lifepath[], currentAge: number, checkRulesets: (allowed: RulesetId[]) => boolean): Lifepath[] {
	const filteredLifepaths: Lifepath[] = [];

	combinedPossibleLifepaths = combinedPossibleLifepaths.filter(v => v.born === false).filter(v => checkRulesets(v.allowed));

	for (const lifepathKey in combinedPossibleLifepaths) {
		const lp = combinedPossibleLifepaths[lifepathKey];
		const conditions = lp.requirements.conditions;

		if (conditions && CheckBlocks(chosenLifepaths, currentAge, lp, conditions)) {
			filteredLifepaths.push(lp);
		}
	}

	return filteredLifepaths;
}

export function FilterLifepaths(currentStock: Stock, chosenLifepaths: Lifepath[], maxLeads: number, prevLeadsCount: number, checkRulesets: (allowed: RulesetId[]) => boolean) {
	const lastLP = chosenLifepaths[chosenLifepaths.length - 1];
	let possibilities = [...currentStock.settings[lastLP.setting].lifepaths];
	if (prevLeadsCount < maxLeads) {
		for (const leadKey in lastLP.leads) {
			const leadLifepaths = currentStock.settings[lastLP.leads[leadKey].split("➞")[1]].lifepaths;
			possibilities = [...possibilities, ...leadLifepaths];
		}
	}

	const currentAge = GetCurrentAge(chosenLifepaths, prevLeadsCount);
	return FilterByRequirements(possibilities, chosenLifepaths, currentAge, checkRulesets);
}
