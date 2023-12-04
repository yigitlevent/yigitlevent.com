import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useCharacterBurnerAttributeStore } from "./useCharacterBurnerAttribute";
import { useCharacterBurnerLifepathStore } from "./useCharacterBurnerLifepath";
import { useCharacterBurnerStatStore } from "./useCharacterBurnerStat";
import { GetAverage } from "../../../utils/misc";
import { UniqueArray } from "../../../utils/uniqueArray";
import { useRulesetStore } from "../../apiStores/useRulesetStore";


export type CharacterBurnerSkillState = {
	skills: UniqueArray<SkillId, CharacterSkill>;

	reset: () => void;

	openSkill: (skillId: SkillId) => void;
	modifySkillExponent: (skillId: SkillId, decrease?: boolean) => void;
	addGeneralSkill: (skill: Skill) => void;
	removeGeneralSkill: (skillId: SkillId) => void;

	getSkillPools: (lifepaths?: Lifepath[]) => { general: Points; lifepath: Points; };
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
				const { getSkill } = useRulesetStore.getState();
				const { skills, getSkillPools } = get();
				const { general, lifepath } = getSkillPools();
				const skill = skills.find(skillId);

				if (skill) {
					const rulesetSkill = getSkill(skill.id);

					if (skill.isOpen === "no") {
						if (skill.type === "General" && general.remaining > 0) {
							skill.isOpen = rulesetSkill.flags.isMagical || rulesetSkill.flags.isTraining ? "double" : "yes";
						}
						else if (skill.type !== "General" && (general.remaining > 0 || lifepath.remaining > 0)) {
							skill.isOpen = rulesetSkill.flags.isMagical || rulesetSkill.flags.isTraining ? "double" : "yes";
						}
					}
					else {
						skill.isOpen = "no";
						skill.advancement = { general: 0, lifepath: 0 };
					}

					set(produce<CharacterBurnerSkillState>((state) => {
						state.skills = new UniqueArray(state.skills.add(skill).items);
					}));
				}
			},

			modifySkillExponent: (skillId: SkillId, decrease?: boolean): void => {
				const skill = get().skills.find(skillId);

				if (skill && skill.isOpen !== "no") {
					set(produce<CharacterBurnerSkillState>((state) => {
						if (decrease) {
							const hasGeneralSpending = skill.advancement.general > 0;
							const hasLifepathSpending = skill.advancement.lifepath > 0;

							if (hasGeneralSpending) state.skills = new UniqueArray(state.skills.add({ ...skill, advancement: { ...skill.advancement, general: skill.advancement.general - 1 } }).items);
							else if (hasLifepathSpending) state.skills = new UniqueArray(state.skills.add({ ...skill, advancement: { ...skill.advancement, lifepath: skill.advancement.lifepath - 1 } }).items);
						}
						else {
							const { general, lifepath } = get().getSkillPools();

							if (lifepath.remaining > 0) state.skills = new UniqueArray(state.skills.add({ ...skill, advancement: { ...skill.advancement, lifepath: skill.advancement.lifepath + 1 } }).items);
							else if (general.remaining > 0) state.skills = new UniqueArray(state.skills.add({ ...skill, advancement: { ...skill.advancement, general: skill.advancement.general + 1 } }).items);
						}
					}));
				}
			},

			addGeneralSkill: (skill: Skill): void => {
				const charSkill: CharacterSkill = { id: skill.id, name: skill.name, isOpen: "no", type: "General", isSpecial: skill.subskillIds ? true : false, advancement: { general: 0, lifepath: 0 } };
				set(produce<CharacterBurnerSkillState>((state) => { state.skills = new UniqueArray(state.skills.add(charSkill).items); }));
			},

			removeGeneralSkill: (skillId: SkillId): void => {
				set(produce<CharacterBurnerSkillState>((state) => {
					state.skills = new UniqueArray(state.skills.remove(skillId).items);
				}));
			},

			getSkillPools: (lifepaths?: Lifepath[]): { general: Points; lifepath: Points; } => {
				const state = get();
				const lps = lifepaths || useCharacterBurnerLifepathStore.getState().lifepaths;

				const gpTotal = lps.reduce((pv, cv) => pv + cv.pools.generalSkillPool, 0);
				const lpTotal = lps.reduce((pv, cv) => pv + cv.pools.lifepathSkillPool, 0);

				let gpRemaining = gpTotal;
				let lpRemaining = lpTotal;

				state.skills.forEach(skill => {
					if (skill.type === "General") {
						if (skill.isOpen === "double") gpRemaining -= 2;
						else if (skill.isOpen === "yes") gpRemaining -= 1;
						gpRemaining -= skill.advancement.general;
					}
					else {
						if (skill.isOpen === "double") (lpRemaining > 0) ? lpRemaining -= 2 : lpRemaining -= 2;
						else if (skill.isOpen === "yes") (lpRemaining > 0) ? lpRemaining -= 1 : lpRemaining -= 1;
						lpRemaining -= skill.advancement.lifepath;
						gpRemaining -= skill.advancement.general;
					}
				});

				return {
					general: { total: gpTotal, spent: gpTotal - gpRemaining, remaining: gpRemaining },
					lifepath: { total: lpTotal, spent: lpTotal - lpRemaining, remaining: lpRemaining }
				};
			},

			getSkill: (skillId: SkillId): AbilityPoints => {
				const { skills, hasSkillOpen } = get();
				const ruleset = useRulesetStore.getState();
				const { getStat } = useCharacterBurnerStatStore.getState();
				const { getAttribute, hasAttribute } = useCharacterBurnerAttributeStore.getState();

				const charSkill = skills.find(skillId);

				let shade: Shades = "B";
				let exponent = 0;

				if (charSkill && hasSkillOpen(skillId)) {
					const skillRoots = ruleset.getSkill(skillId).roots;

					if (skillRoots) {
						const rootShades = skillRoots.map(s => {
							if (hasAttribute(s[0])) return getAttribute(s).shade;
							else return getStat(s[1]).shade;
						});

						const rootExponents = skillRoots.map(s => {
							if (hasAttribute(s[0])) return getAttribute(s).exponent;
							else return getStat(s[1]).exponent;
						});

						shade = rootShades.every(v => v === "G") ? "G" : "B";
						exponent = Math.floor(GetAverage(rootExponents) / 2);
					}

					exponent += charSkill.advancement.general + charSkill.advancement.lifepath;
				}

				return { shade, exponent };
			},

			hasSkillOpen: (skillId: SkillId): boolean => {
				return get().skills.existsWithValues(skillId, "isOpen", ["yes", "double"]);
			},

			hasSkillOpenByName: (name: string): boolean => {
				return get().skills.filter(v => v.name === name).some(v => v.isOpen !== "no");
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
							isSpecial: skill.subskillIds ? true : false,
							isOpen: isMandatory ? skill.flags.isMagical || skill.flags.isTraining ? "double" : "yes" : "no",
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
		}),
		{ name: "useCharacterBurnerSkillStore" }
	)
);

