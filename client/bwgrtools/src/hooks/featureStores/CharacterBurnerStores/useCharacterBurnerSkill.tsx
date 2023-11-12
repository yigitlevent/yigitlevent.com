import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerLifepathStore } from "./useCharacterBurnerLifepath";
import { useCharacterBurnerStatStore } from "./useCharacterBurnerStat";
import { Clamp } from "../../../utils/misc";
import { UniqueArray } from "../../../utils/uniqueArray";
import { useRulesetStore } from "../../apiStores/useRulesetStore";


export type CharacterBurnerSkillState = {
	skills: UniqueArray<SkillId, CharacterSkill>;

	reset: () => void;

	openSkill: (skillId: SkillId) => void;
	modifySkillExponent: (skillId: SkillId, decrease?: boolean) => void;

	getSkillPools: () => { general: Points; lifepath: Points; };
	getSkill: (skillId: SkillId) => AbilityPoints;

	hasSkillOpen: (id: SkillId) => boolean;
	hasSkillOpenByName: (name: string) => boolean;


	/**
	 * Updates the character's skills list.
	 * It re-adds previously selected general skills, if they are not present in the lifepath skills list.
	 * @remarks TODO: Repated lifepaths should be checked to determine the mandatory-ness.
	**/
	updateSkills: () => void;
};

export const useCharacterBurnerSkillStore = create<CharacterBurnerSkillState>()(
	devtools(
		(set, get) => ({
			skills: new UniqueArray<SkillId, CharacterSkill>(),

			reset: (): void => {
				set({
					skills: new UniqueArray<SkillId, CharacterSkill>()
				});
			},

			openSkill: (skillId: SkillId): void => {
				set(produce<CharacterBurnerSkillState>((state) => {
					// TODO: Check remaining counts, use either pool too
					const charSkill = state.skills.find(skillId);
					if (charSkill) {
						charSkill.isOpen = !charSkill.isOpen;
						state.skills = new UniqueArray(state.skills.add(charSkill).items);
					}
				}));
			},

			modifySkillExponent: (skillId: SkillId, decrease?: boolean): void => {
				set(produce<CharacterBurnerSkillState>((state) => {
					// TODO: Check remaining counts, use either pool too
					const charSkill = state.skills.find(skillId);
					if (charSkill) {
						charSkill.advancement.lifepath = Clamp(charSkill.advancement.lifepath + (decrease ? -1 : 1), 0, 10);
						state.skills = new UniqueArray(state.skills.add(charSkill).items);
					}
				}));
			},

			getSkillPools: (): { general: Points; lifepath: Points; } => {
				const state = get();
				const { lifepaths } = useCharacterBurnerLifepathStore.getState();

				const gpTotal = lifepaths.reduce((pv, cv) => pv + cv.pools.generalSkillPool, 0);
				const lpTotal = lifepaths.reduce((pv, cv) => pv + cv.pools.lifepathSkillPool, 0);

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
			},

			getSkill: (skillId: SkillId): AbilityPoints => {
				const { skills, hasSkillOpen } = get();
				const ruleset = useRulesetStore.getState();
				const { getStat } = useCharacterBurnerStatStore.getState();

				const charSkill = skills.find(skillId);

				let shade: Shades = "B";
				// TODO: exponent starts from root average
				let exponent = 0;

				if (charSkill && hasSkillOpen(skillId)) {
					exponent = charSkill.advancement.general + charSkill.advancement.lifepath;
					const skillRoots = ruleset.getSkill(skillId).roots;
					if (skillRoots) shade = skillRoots.map(s => getStat(s[1]).shade).every(v => v === "G") ? "G" : "B";
				}

				return { shade, exponent };
			},

			hasSkillOpen: (skillId: SkillId): boolean => {
				return get().skills.exists(skillId, "isOpen", true);
			},

			hasSkillOpenByName: (name: string): boolean => {
				return get().skills.filter(v => v.name === name).some(v => v.isOpen);
			},

			updateSkills: (): void => {
				const { getSkill } = useRulesetStore.getState();
				const { lifepaths } = useCharacterBurnerLifepathStore.getState();
				const state = get();

				const characterSkills = new UniqueArray(lifepaths.map(lp => {
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
					.forEach(skill => { if (characterSkills.existsAny("id", skill.id) === 0) characterSkills.add(skill); });

				set(produce<CharacterBurnerSkillState>((state) => {
					state.skills = characterSkills;
				}));
			}
		})
	)
);
