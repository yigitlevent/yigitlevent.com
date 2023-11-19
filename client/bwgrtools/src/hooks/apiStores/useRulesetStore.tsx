import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericGet, GenericPost } from "../../utils/genericRequests";


// TODO: research index key signatures to see if there is a workaround
interface RulesetStore {
	readonly fetching: boolean;

	readonly rulesets: Ruleset[];
	readonly chosenRulesets: RulesetId[];

	readonly abilities: Ability[];
	readonly abilityTypes: string[];

	readonly stocks: Stock[];
	readonly settings: Setting[];

	readonly skills: Skill[];
	readonly skillCategories: string[];
	readonly skillTypes: string[];

	readonly traits: Trait[];
	readonly traitCategories: string[];
	readonly traitTypes: string[];

	readonly lifepaths: Lifepath[];

	readonly resources: Resource[];
	readonly resourceTypes: string[];

	readonly spellFacets: SpellFacets;

	readonly dowActions: DoWAction[];
	readonly racActions: RaCAction[];
	readonly fightActions: FightAction[];

	readonly practices: Practice[];

	toggleFetching: () => void;
	fetchList: () => void;
	fetchData: () => void;

	// TODO: Might be useful to create a hash table of id-index pairs to quicken the search -- name/string search being slow is fine, it should be used veeery rarely
	serveResult: <T>(row: T[], error: [id: unknown, msg: string]) => T;
	getAbility: (search: AbilityId | string) => Ability;
	getStock: (search: StockId | string) => Stock;
	getSetting: (search: SettingId | string) => Setting;
	getSkill: (search: SkillId | string) => Skill;
	getTrait: (search: TraitId | string) => Trait;
	getLifepath: (search: LifepathId | string) => Lifepath;
	getResource: (search: ResourceId | string) => Resource;
	getDoWAction: (search: DoWActionId | string) => DoWAction;
	getRaCAction: (search: RaCActionId | string) => RaCAction;
	getFightAction: (search: FightActionId | string) => FightAction;
	getPractice: (search: PracticeId) => Practice;

	toggleDataset: (dataset: RulesetId) => void;
	checkRulesets: (allowed: RulesetId[]) => boolean;
	checkExactRulesets: (allowed: RulesetId[]) => boolean;
}

export const useRulesetStore = create<RulesetStore>()(
	devtools(
		(set, get) => ({
			fetching: true,

			rulesets: [],
			chosenRulesets: ["bwgr" as RulesetId, "bwc" as RulesetId], // TODO: this shouldn't be fixed

			abilities: [],
			abilityTypes: [],

			stocks: [],
			settings: [],

			skills: [],
			skillCategories: [],
			skillTypes: [],

			traits: [],
			traitCategories: [],
			traitTypes: [],

			lifepaths: [],

			resources: [],
			resourceTypes: [],

			dowActions: [],
			racActions: [],
			fightActions: [],

			practices: [],

			spellFacets: {
				origins: [],
				elements: [],
				impetus: [],
				areaOfEffects: [],
				duration: []
			},

			toggleFetching: () => {
				set(produce<RulesetStore>((state) => { state.fetching = !state.fetching; }));
			},

			fetchList: () => {
				GenericGet<RulesetsResponse>("/ruleset/list")
					.then(response => {
						if (response.status === 200) {
							set(produce<RulesetStore>((state) => { state.rulesets = response.data.rulesets; }));
						}
						else throw new Error();
					})
					.catch(reason => console.error(reason));
			},

			fetchData: () => {
				const toggleFetching = get().toggleFetching;
				const rulesets = get().chosenRulesets;

				GenericPost<RulesetResponse>("/ruleset/data", { rulesets })
					.then(response => {
						if (response.status === 200) {
							const abilities = response.data.ruleset.abilities;
							const abilityTypes = [...response.data.ruleset.abilities.reduce((a, v) => a.add(v.abilityType[1]), new Set<string>())];
							const stocks = response.data.ruleset.stocks;
							const settings = response.data.ruleset.settings;
							const skills = response.data.ruleset.skills;
							const skillCategories = [...response.data.ruleset.skills.reduce((a, v) => a.add(v.category[1]), new Set<string>())];
							const skillTypes = [...response.data.ruleset.skills.reduce((a, v) => a.add(v.type[1]), new Set<string>())];

							const traits = response.data.ruleset.traits;
							const traitCategories = [...response.data.ruleset.traits.reduce((a, v) => a.add(v.category[1]), new Set<string>())];
							const traitTypes = [...response.data.ruleset.traits.reduce((a, v) => a.add(v.type[1]), new Set<string>())];

							set(produce<RulesetStore>((state) => {
								state.abilities = abilities;
								state.abilityTypes = abilityTypes;

								state.stocks = stocks;
								state.settings = settings;

								state.skills = skills;
								state.skillCategories = skillCategories;
								state.skillTypes = skillTypes;

								state.traits = traits;
								state.traitCategories = traitCategories;
								state.traitTypes = traitTypes;

								state.lifepaths
									= response.data.ruleset.lifepaths
										.map(lifepath => {
											const lp = { ...lifepath };
											if (lifepath.leads) lp.leads = lifepath.leads.filter(leadId => settings.some(x => x.id === leadId));
											if (lifepath.skills) lp.skills = lifepath.skills.filter(skillId => skills.some(x => x.id === skillId));
											if (lifepath.traits) lp.traits = lifepath.traits.filter(traitId => traits.some(x => x.id === traitId));

											if (lp.requirements) {
												lp.requirements
													= lp.requirements
														.map(rb => {
															return {
																...rb,
																items: rb.items
																	.filter(item => {
																		if ("setting" in item) return state.settings.some(x => x.id === item.setting[0]);
																		else if ("lifepath" in item) return response.data.ruleset.lifepaths.some(x => x.id === item.lifepath[0]);
																		else if ("skill" in item) return state.skills.some(x => x.id === item.skill[0]);
																		else if ("trait" in item) return state.traits.some(x => x.id === item.trait[0]);
																		return true;
																	})
															};
														});
											}

											return lp;
										});

								state.resources = response.data.ruleset.resources;
								state.resourceTypes = [...response.data.ruleset.resources.reduce((a, v) => a.add(v.type[1]), new Set<string>())];

								state.spellFacets = response.data.ruleset.spellFacets;

								state.dowActions = response.data.ruleset.dowActions;
								state.racActions = response.data.ruleset.racActions;
								state.fightActions = response.data.ruleset.fightActions;

								state.practices = response.data.ruleset.practices;
							}));
						}
						else throw new Error();
					})
					.catch(reason => console.error(reason))
					.finally(() => toggleFetching());
			},

			serveResult<T>(row: T[], error: [id: unknown, msg: string]): Readonly<T> {
				if (row.length === 1) return row[0];
				else if (row.length > 1) throw new Error(`Found multiple ${error[1]} rows with ${typeof error[0] === "string" ? "name" : "id"} '${error[0]}'`);
				else throw new Error(`Could not find any ${error[1]} with ${typeof error[0] === "string" ? "name" : "id"} '${error[0]}'`);
			},

			getAbility(search: AbilityId | string) {
				const abilities = get().abilities;
				const rows = (typeof search === "string") ? abilities.filter(v => v.name === search) : abilities.filter(v => v.id === search);
				return get().serveResult(rows, [search, "abilities"]);
			},

			getStock(search: StockId | string) {
				const stocks = get().stocks;
				const rows = (typeof search === "string") ? stocks.filter(v => v.name === search) : stocks.filter(v => v.id === search);
				return get().serveResult(rows, [search, "stocks"]);
			},

			getSetting(search: SettingId | string) {
				const settings = get().settings;
				const rows = (typeof search === "string") ? settings.filter(v => v.name === search) : settings.filter(v => v.id === search);
				return get().serveResult(rows, [search, "settings"]);
			},

			getSkill(search: SkillId | string) {
				const skills = get().skills;
				const rows = (typeof search === "string") ? skills.filter(v => v.name === search) : skills.filter(v => v.id === search);
				return get().serveResult(rows, [search, "skills"]);
			},

			getTrait(search: TraitId | string) {
				const traits = get().traits;
				const rows = (typeof search === "string") ? traits.filter(v => v.name === search) : traits.filter(v => v.id === search);
				return get().serveResult(rows, [search, "traits"]);
			},

			getLifepath(search: LifepathId | string) {
				const lifepaths = get().lifepaths;
				const rows = (typeof search === "string") ? lifepaths.filter(v => v.name === search) : lifepaths.filter(v => v.id === search);
				return get().serveResult(rows, [search, "lifepaths"]);
			},

			getResource(search: ResourceId | string) {
				const resources = get().resources;
				const rows = (typeof search === "string") ? resources.filter(v => v.name === search) : resources.filter(v => v.id === search);
				return get().serveResult(rows, [search, "resources"]);
			},

			getDoWAction(search: DoWActionId | string) {
				const dowActions = get().dowActions;
				const rows = (typeof search === "string") ? dowActions.filter(v => v.name === search) : dowActions.filter(v => v.id === search);
				return get().serveResult(rows, [search, "dowActions"]);
			},

			getRaCAction(search: RaCActionId | string) {
				const racActions = get().racActions;
				const rows = (typeof search === "string") ? racActions.filter(v => v.name === search) : racActions.filter(v => v.id === search);
				return get().serveResult(rows, [search, "racActions"]);
			},

			getFightAction(search: FightActionId | string) {
				const fightActions = get().fightActions;
				const rows = (typeof search === "string") ? fightActions.filter(v => v.name === search) : fightActions.filter(v => v.id === search);
				return get().serveResult(rows, [search, "fightActions"]);
			},

			getPractice(search: PracticeId) {
				const practices = get().practices;
				const rows = practices.filter(v => v.id === search);
				return get().serveResult(rows, [search, "practices"]);
			},

			toggleDataset: (ruleset: RulesetId) => {
				set(produce<RulesetStore>((state) => {
					if (state.chosenRulesets.includes(ruleset)) {
						state.chosenRulesets = state.chosenRulesets.filter(v => v !== ruleset);
					}
					else {
						state.chosenRulesets = [...state.chosenRulesets, ruleset];
					}
				}));
			},

			checkRulesets: (allowed: RulesetId[]) => {
				return get().chosenRulesets.some(ruleset => allowed.includes(ruleset));
			},

			checkExactRulesets: (allowed: RulesetId[]) => {
				const state = get();
				return allowed.every(ruleset => state.chosenRulesets.includes(ruleset));
			}
		}),
		{ name: "RulesetStore" })
	// TODO: Enable persistance devtools(persist(Store, { name: Name, version: 1 }), { name: Name })
);
