import { produce } from "immer";

import { UniqueArray } from "../../../utils/uniqueArray";
import { useRulesetStore } from "../../apiStores/useRulesetStore";
import { CharacterBurnerState, BurnerFunc } from "../useCharacterBurnerStore";


function Add(bf: BurnerFunc, lifepath: Lifepath): void {
	bf.set(produce<CharacterBurnerState>((state) => {
		state.lifepaths.push(lifepath);
	}));
	const state = bf.get();
	state.updateAvailableLifepaths();
	state.updateSkills();
	state.updateTraits();
	state.updateAttributes();
}

function RemoveLast(bf: BurnerFunc): void {
	bf.set(produce<CharacterBurnerState>((state) => {
		state.lifepaths = state.lifepaths.slice(0, state.lifepaths.length - 1);
	}));
	const state = bf.get();
	state.updateAvailableLifepaths();
	state.updateSkills();
	state.updateTraits();
	state.updateAttributes();
}

function Has(bf: BurnerFunc, id: LifepathId): number {
	return bf.get().lifepaths.filter(v => v.id === id).length;
}

function HasByName(bf: BurnerFunc, name: string): boolean {
	return bf.get().attributes.filter(v => v.name === name).length > 0;
}

function UpdateAvailable(bf: BurnerFunc): Lifepath[] {
	const { lifepaths } = useRulesetStore.getState();

	const state = bf.get();

	if (state.lifepaths.length === 0) {
		const bornLps = lifepaths.filter(lp => lp.flags.isBorn && state.stock[0] === lp.stock[0]);

		bf.set(produce<CharacterBurnerState>((state) => {
			state.availableLifepaths = lifepaths.filter(lp => lp.flags.isBorn && state.stock[0] === lp.stock[0]);
		}));

		return bornLps;
	}

	const checkRequirementBlock = (lifepath: Lifepath, block: LifepathRequirementBlock): boolean => {
		const itemResults = block.items.map((item): boolean => {
			// TODO: item.forCompanion

			if ("isUnique" in item) return state.hasLifepath(lifepath.id) === 0;
			else if ("isSettingEntry" in item) return true; // TODO: Check if any other lifepath from this setting chosen (true), else, other lifepaths should be disabled
			else if ("minLpIndex" in item) return state.lifepaths.length >= item.minLpIndex;
			else if ("maxLpIndex" in item) return state.lifepaths.length <= item.maxLpIndex;
			else if ("minYears" in item) return state.getAge() >= item.minYears;
			else if ("maxYears" in item) return state.getAge() <= item.maxYears;
			else if ("gender" in item) return item.gender === state.gender;
			else if ("oldestBy" in item) return true; // TODO: Implementable only by having the campaign 
			else if ("attribute" in item) {
				const exp = state.attributes.find(item.attribute[0])?.exponent;
				if (item.min) return exp ? exp >= item.min : false;
				else if (item.max) return exp ? exp <= item.max : false;
				else return state.hasAttribute(item.attribute[0]);
			}
			else if ("skill" in item) return state.hasSkillOpen(item.skill[0]);
			else if ("trait" in item) return state.hasTraitOpen(item.trait[0]);
			else if ("lifepath" in item) return state.hasLifepath(item.lifepath[0]) >= block.fulfillmentAmount;
			else if ("setting" in item) return state.hasSetting(item.setting[0]) >= block.fulfillmentAmount;
			else if ("question" in item) return state.hasQuestionTrue(item.question[0]);
			else throw new Error(`Unidentified requirement block item: ${item}`);
		});

		if (block.logicType[1] === "OR") return itemResults.some(v => v === true);
		else if (block.logicType[1] === "AND") return itemResults.every(v => v === true);
		else if (block.logicType[1] === "NOT") return !itemResults.every(v => v === false);
		return false;
	};

	const lastLifepath = state.lifepaths[state.lifepaths.length - 1];
	const possibleSettingIds = lastLifepath.leads ? [lastLifepath.setting[0], ...lastLifepath.leads] : [lastLifepath.setting[0]];
	const possibleLifepaths
		= possibleSettingIds
			.map(settingId => lifepaths.filter(x => state.stock[0] === x.stock[0] && x.setting[0] === settingId && x.flags.isBorn === false))
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

	bf.set(produce<CharacterBurnerState>((state) => {
		state.availableLifepaths = possibleLifepaths;
	}));

	return possibleLifepaths;
}

export type LifepathState = {
	availableLifepaths: Lifepath[];
	lifepaths: Lifepath[];

	addLifepath: (lifepath: Lifepath) => void;
	removeLastLifepath: () => void;
	hasLifepath: (id: LifepathId) => number;
	hasLifepathByName: (name: string) => number;
	updateAvailableLifepaths: () => Lifepath[];
};

export const LifepathProperties = {
	skills: new UniqueArray<SkillId, CharacterSkill>()
};

export const LifepathFunctions = {
	Add,
	RemoveLast,
	Has,
	HasByName,
	UpdateAvailable
};
