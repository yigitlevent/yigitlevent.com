import { produce } from "immer";

import { Clamp } from "../../../utils/misc";
import { UniqueArray } from "../../../utils/uniqueArray";
import { useRulesetStore } from "../../apiStores/useRulesetStore";
import { CharacterBurnerState, BurnerFunc } from "../useCharacterBurnerStore";


function SetOpen(bf: BurnerFunc, skillId: SkillId): void {
	bf.set(produce<CharacterBurnerState>((state) => {
		// TODO: Check remaining counts, use either pool too
		const charSkill = state.skills.find(skillId);
		if (charSkill) {
			charSkill.isOpen = !charSkill.isOpen;
			state.skills = new UniqueArray(state.skills.add(charSkill).items);
		}
	}));
}

function SetExponent(bf: BurnerFunc, skillId: SkillId, decrease?: boolean): void {
	bf.set(produce<CharacterBurnerState>((state) => {
		// TODO: Check remaining counts, use either pool too
		const charSkill = state.skills.find(skillId);
		if (charSkill) {
			charSkill.advancement.lifepath = Clamp(charSkill.advancement.lifepath + (decrease ? -1 : 1), 0, 10);
			state.skills = new UniqueArray(state.skills.add(charSkill).items);
		}
	}));
}

function GetPools(bf: BurnerFunc): { general: Points; lifepath: Points; } {
	const state = bf.get();

	const gpTotal = state.lifepaths.reduce((pv, cv) => pv + cv.pools.generalSkillPool, 0);
	const lpTotal = state.lifepaths.reduce((pv, cv) => pv + cv.pools.lifepathSkillPool, 0);

	let gpSpent = 0;
	let lpSpent = 0;

	state.skills.forEach(skill => {
		if (skill.isOpen) {
			if (skill.type === "General") {
				if (skill.isDoubleOpen) gpSpent += 2;
				else if (!skill.isDoubleOpen) gpSpent += 1;
				gpSpent += skill.advancement.general;
			}
			else {
				// TODO: maybe gp spent for lp skill
				if (skill.isDoubleOpen) lpSpent += 2;
				else if (!skill.isDoubleOpen) lpSpent += 1;
				lpSpent += skill.advancement.lifepath;
				gpSpent += skill.advancement.general;
			}
		}
	});

	return {
		general: { total: gpTotal, spent: gpSpent, remaining: gpTotal - gpSpent },
		lifepath: { total: lpTotal, spent: lpSpent, remaining: lpTotal - lpSpent }
	};
}

function GetSkill(bf: BurnerFunc, skillId: SkillId): { shade: Shades; exponent: number; } {
	const { getSkill } = useRulesetStore.getState();
	const state = bf.get();

	const charSkill = state.skills.find(skillId);

	let shade: Shades = "B";
	// TODO: exponent starts from root average
	let exponent = 0;

	if (charSkill && state.hasSkillOpen(skillId)) {
		exponent = charSkill.advancement.general + charSkill.advancement.lifepath;
		const skillRoots = getSkill(skillId).roots;
		if (skillRoots) shade = skillRoots.map(s => state.getStat(s[1]).shade).every(v => v === "G") ? "G" : "B";
	}

	return { shade, exponent };
}

function IsOpen(bf: BurnerFunc, skillId: SkillId): boolean {
	return bf.get().skills.exists(skillId, "isOpen", true);
}

function IsOpenByName(bf: BurnerFunc, name: string): boolean {
	return bf.get().skills.filter(v => v.name === name).some(v => v.isOpen);
}

function Update(bf: BurnerFunc): void {
	const { getSkill } = useRulesetStore.getState();
	const state = bf.get();

	const characterSkills = new UniqueArray(state.lifepaths.map(lp => {
		return lp.skills ? lp.skills.map((sk, i) => {
			const skill = getSkill(sk);
			const isMandatory = (i === 0);
			// TODO: Repeat lifepaths also should be checked
			const entry: CharacterSkill = {
				id: skill.id,
				name: skill.name,
				type: isMandatory ? "Mandatory" : "Lifepath",
				isDoubleOpen: skill.flags.isMagical || skill.flags.isTraining,
				isSpecial: skill.subskillIds ? true : false,
				isOpen: isMandatory,
				advancement: { general: 0, lifepath: 0 }
			};
			return entry;
		}) : [];
	}).flat());

	state.skills
		.filter(skill => skill.type === "General")
		.forEach(skill => {
			if (characterSkills.existsAny("id", skill.id) === 0) characterSkills.add(skill);
		});

	bf.set(produce<CharacterBurnerState>((state) => {
		state.skills = characterSkills;
	}));
}

export interface SkillState {
	skills: UniqueArray<SkillId, CharacterSkill>;

	openSkill: (skillId: SkillId) => void;
	modifySkillExponent: (skillId: SkillId, decrease?: boolean) => void;
	getSkillPools: () => { general: Points; lifepath: Points; };
	getSkill: (skillId: SkillId) => AbilityPoints;
	hasSkillOpen: (id: SkillId) => boolean;
	hasSkillOpenByName: (name: string) => boolean;
	updateSkills: () => void;
}

export const SkillProperties = {
	skills: new UniqueArray<SkillId, CharacterSkill>()
};

export const SkillFunctions = {
	SetOpen,
	SetExponent,
	GetPools,
	GetSkill,
	IsOpen,
	IsOpenByName,
	Update
};
