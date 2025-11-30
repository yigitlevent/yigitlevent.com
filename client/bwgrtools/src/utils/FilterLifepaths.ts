import { UniqueArray } from "@utility/UniqueArray";


interface FilterLifepathsProps {
	rulesetLifepaths: BwgrLifepath[];
	stock: [id: BwgrStockId, name: string];
	age: number;
	lifepaths: BwgrLifepath[];
	gender?: "Male" | "Female";
	attributes?: UniqueArray<BwgrAbilityId, BwgrCharacterAttribute>;
	hasAttribute?: (id: BwgrAbilityId) => boolean;
	hasSkillOpen?: (id: BwgrSkillId) => boolean;
	hasTraitOpen?: (id: BwgrTraitId) => boolean;
	hasSetting?: (id: BwgrSettingId) => number;
	hasQuestionTrue?: (id: BwgrQuestionId) => boolean;
	noLeads?: [id: BwgrSettingId, name: string];
}

export function FilterLifepaths({ rulesetLifepaths, stock, age, lifepaths, gender, attributes, hasAttribute, hasSkillOpen, hasTraitOpen, hasSetting, hasQuestionTrue, noLeads }: FilterLifepathsProps): BwgrLifepath[] {
	const checkLifepath = (id: BwgrLifepathId): number => lifepaths.findIndex(lp => lp.id === id);
	const countLifepath = (id: BwgrLifepathId): number => lifepaths.filter(lp => lp.id === id).length;

	const checkRequirementBlock = (lifepath: BwgrLifepath, block: BwgrLifepathRequirementBlock): boolean => {
		const itemResults = block.items.map((item): boolean => {
			// TODO: item.forCompanion

			if ("isUnique" in item) return checkLifepath(lifepath.id) === -1;
			else if ("isSettingEntry" in item) return true; // TODO: Check if any other lifepath from this setting chosen (true), else, other lifepaths should be disabled
			else if ("minLpIndex" in item) return lifepaths.length >= item.minLpIndex;
			else if ("maxLpIndex" in item) return lifepaths.length <= item.maxLpIndex;
			else if ("minYears" in item) return age >= item.minYears;
			else if ("maxYears" in item) return age <= item.maxYears;
			else if ("gender" in item) {
				if (gender) return item.gender === gender;
				else return true;
			}
			else if ("oldestBy" in item) return true; // TODO: Implementable only by having the campaign
			else if (attributes && "attribute" in item) {
				const exp = attributes.find(item.attribute[0])?.exponent;
				if (item.min) return exp ? exp >= item.min : false;
				else if (item.max) return exp ? exp <= item.max : false;
				else if (hasAttribute) return hasAttribute(item.attribute[0]);
				else return true;
			}
			else if ("skill" in item) {
				if (hasSkillOpen) return hasSkillOpen(item.skill[0]);
				else return true;
			}
			else if ("trait" in item) {
				if (hasTraitOpen) return hasTraitOpen(item.trait[0]);
				else return true;
			}
			else if ("lifepath" in item) return countLifepath(item.lifepath[0]) >= block.fulfillmentAmount;
			else if ("setting" in item) {
				if (hasSetting) return hasSetting(item.setting[0]) >= block.fulfillmentAmount;
				else return true;
			}
			else if ("question" in item) {
				if (hasQuestionTrue) return hasQuestionTrue(item.question[0]);
				else return true;
			}
			else throw new Error(`Unidentified requirement block item: ${item.logicType.toString()}`);
		});

		if (block.logicType[1] === "OR") return itemResults.some(v => v);
		else if (block.logicType[1] === "AND") return itemResults.every(v => v);
		else if (block.logicType[1] === "NOT") return !itemResults.every(v => !v);
		return false;
	};

	let possibleLifepaths: BwgrLifepath[] = [];

	if (lifepaths.length === 0) possibleLifepaths = rulesetLifepaths.filter(lp => lp.flags.isBorn && stock[0] === lp.stock[0]);
	else {
		const lastLifepath = lifepaths[lifepaths.length - 1];
		const possibleSettingIds = lastLifepath.leads ? [lastLifepath.setting[0], ...lastLifepath.leads] : [lastLifepath.setting[0]];

		possibleLifepaths =
			possibleSettingIds
				.map(settingId => rulesetLifepaths.filter(x => stock[0] === x.stock[0] && x.setting[0] === settingId && !x.flags.isBorn))
				.flat()
				.filter(lifepath => {
					if (lifepath.requirements) {
						const blockResults = lifepath.requirements.map(block => ({ mustFulfill: block.mustFulfill, result: checkRequirementBlock(lifepath, block) }));
						const musts = blockResults.every(v => v.mustFulfill && v.result);
						const atLeastOne = blockResults.some(v => v.result);
						return musts && atLeastOne;
					}
					return true;
				});
	}

	if (noLeads) possibleLifepaths = possibleLifepaths.filter(lp => lp.setting[0] === noLeads[0]);

	return possibleLifepaths;
}
