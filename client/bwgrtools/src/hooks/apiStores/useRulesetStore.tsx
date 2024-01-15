import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericGet, GenericPost } from "../../utils/genericRequests";


type FetchState =
	| "fetch-full"
	| "fetching-list"
	| "fetch-data"
	| "fetching-data"
	| "done"
	| "failed";

// TODO: research index key signatures to see if there is a workaround
interface RulesetStore {
	readonly fetchState: FetchState;

	readonly rulesets: BwgrRuleset[];
	readonly chosenRulesets: BwgrRulesetId[];

	readonly abilities: BwgrAbility[];
	readonly abilityTypes: string[];

	readonly stocks: BwgrStock[];
	readonly settings: BwgrSetting[];

	readonly skills: BwgrSkill[];
	readonly skillCategories: string[];
	readonly skillTypes: string[];

	readonly traits: BwgrTrait[];
	readonly traitCategories: string[];
	readonly traitTypes: string[];

	readonly lifepaths: BwgrLifepath[];

	readonly resources: BwgrResource[];
	readonly resourceTypes: string[];

	readonly spellFacets: BwgrSpellFacets;

	readonly dowActions: BwgrDoWAction[];
	readonly racActions: BwgrRaCAction[];
	readonly fightActions: BwgrFightAction[];

	readonly practices: BwgrPractice[];
	readonly questions: BwgrQuestion[];

	setFetchState: (fetchState: FetchState) => void;
	fetchList: () => void;
	fetchData: () => void;

	// TODO: Might be useful to create a hash table of id-index pairs to quicken the search -- name/string search being slow is fine, it should be used veeery rarely
	serveResult: <T>(row: T[], error: [id: unknown, msg: string]) => T;
	getAbility: (search: BwgrAbilityId | string) => BwgrAbility;
	getStock: (search: BwgrStockId | string) => BwgrStock;
	getSetting: (search: BwgrSettingId | string) => BwgrSetting;
	getSkill: (search: BwgrSkillId | string) => BwgrSkill;
	getTrait: (search: BwgrTraitId | string) => BwgrTrait;
	getLifepath: (search: BwgrLifepathId | string) => BwgrLifepath;
	getResource: (search: BwgrResourceId | string) => BwgrResource;
	getDoWAction: (search: BwgrDoWActionId | string) => BwgrDoWAction;
	getRaCAction: (search: BwgrRaCActionId | string) => BwgrRaCAction;
	getFightAction: (search: BwgrFightActionId | string) => BwgrFightAction;
	getPractice: (search: BwgrPracticeId) => BwgrPractice;

	toggleDataset: (dataset: BwgrRulesetId) => void;
	checkRulesets: (allowed: BwgrRulesetId[]) => boolean;
	checkExactRulesets: (allowed: BwgrRulesetId[]) => boolean;
}

export const useRulesetStore = create<RulesetStore>()(
	devtools(
		(set, get) => ({
			fetchState: "fetch-full",

			rulesets: [],
			chosenRulesets: [],

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
			questions: [],

			spellFacets: {
				origins: [],
				elements: [],
				impetus: [],
				areaOfEffects: [],
				duration: []
			},

			setFetchState: (fetchState: FetchState) => {
				set(produce<RulesetStore>((state) => { state.fetchState = fetchState; }));
			},

			fetchList: () => {
				const setFetchState = get().setFetchState;
				setFetchState("fetching-list");

				GenericGet<BwgrRulesetsResponse>("/bwgr/ruleset/list")
					.then(response => {
						if (response.status === 200) {
							set(produce<RulesetStore>((state) => {
								state.rulesets = response.data.rulesets;
								state.chosenRulesets = [response.data.rulesets[0].id];
							}));

							// TODO: this should instead use a cancellation token to stop current fetch and start a new one
							if (get().fetchState !== "fetching-data") setFetchState("fetch-data");
						}
						else throw new Error();
					})
					.catch(reason => console.error(reason));
			},

			fetchData: () => {
				const fetchState = get().fetchState;
				const setFetchState = get().setFetchState;
				const rulesets = get().chosenRulesets;

				if (fetchState === "fetch-data") {
					setFetchState("fetching-data");

					GenericPost<BwgrRulesetResponse>("/bwgr/ruleset/data", { rulesets })
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
									state.questions = response.data.ruleset.questions;
								}));

								setFetchState("done");
							}
							else {
								setFetchState("failed");
								throw new Error();
							}
						})
						.catch(reason => {
							console.error(reason);
							setFetchState("failed");
						});
				}
			},

			serveResult<T>(row: T[], error: [id: unknown, msg: string]): Readonly<T> {
				if (row.length === 1) return row[0];
				else if (row.length > 1) throw new Error(`Found multiple ${error[1]} rows with ${typeof error[0] === "string" ? "name" : "id"} '${error[0]}'`);
				else throw new Error(`Could not find any ${error[1]} with ${typeof error[0] === "string" ? "name" : "id"} '${error[0]}'`);
			},

			getAbility(search: BwgrAbilityId | string) {
				const abilities = get().abilities;
				const rows = (typeof search === "string") ? abilities.filter(v => v.name === search) : abilities.filter(v => v.id === search);
				return get().serveResult(rows, [search, "abilities"]);
			},

			getStock(search: BwgrStockId | string) {
				const stocks = get().stocks;
				const rows = (typeof search === "string") ? stocks.filter(v => v.name === search) : stocks.filter(v => v.id === search);
				return get().serveResult(rows, [search, "stocks"]);
			},

			getSetting(search: BwgrSettingId | string) {
				const settings = get().settings;
				const rows = (typeof search === "string") ? settings.filter(v => v.name === search) : settings.filter(v => v.id === search);
				return get().serveResult(rows, [search, "settings"]);
			},

			getSkill(search: BwgrSkillId | string) {
				const skills = get().skills;
				const rows = (typeof search === "string") ? skills.filter(v => v.name === search) : skills.filter(v => v.id === search);
				return get().serveResult(rows, [search, "skills"]);
			},

			getTrait(search: BwgrTraitId | string) {
				const traits = get().traits;
				const rows = (typeof search === "string") ? traits.filter(v => v.name === search) : traits.filter(v => v.id === search);
				return get().serveResult(rows, [search, "traits"]);
			},

			getLifepath(search: BwgrLifepathId | string) {
				const lifepaths = get().lifepaths;
				const rows = (typeof search === "string") ? lifepaths.filter(v => v.name === search) : lifepaths.filter(v => v.id === search);
				return get().serveResult(rows, [search, "lifepaths"]);
			},

			getResource(search: BwgrResourceId | string) {
				const resources = get().resources;
				const rows = (typeof search === "string") ? resources.filter(v => v.name === search) : resources.filter(v => v.id === search);
				return get().serveResult(rows, [search, "resources"]);
			},

			getDoWAction(search: BwgrDoWActionId | string) {
				const dowActions = get().dowActions;
				const rows = (typeof search === "string") ? dowActions.filter(v => v.name === search) : dowActions.filter(v => v.id === search);
				return get().serveResult(rows, [search, "dowActions"]);
			},

			getRaCAction(search: BwgrRaCActionId | string) {
				const racActions = get().racActions;
				const rows = (typeof search === "string") ? racActions.filter(v => v.name === search) : racActions.filter(v => v.id === search);
				return get().serveResult(rows, [search, "racActions"]);
			},

			getFightAction(search: BwgrFightActionId | string) {
				const fightActions = get().fightActions;
				const rows = (typeof search === "string") ? fightActions.filter(v => v.name === search) : fightActions.filter(v => v.id === search);
				return get().serveResult(rows, [search, "fightActions"]);
			},

			getPractice(search: BwgrPracticeId) {
				const practices = get().practices;
				const rows = practices.filter(v => v.id === search);
				return get().serveResult(rows, [search, "practices"]);
			},

			toggleDataset: (ruleset: BwgrRulesetId) => {
				set(produce<RulesetStore>((state) => {
					if (state.chosenRulesets.includes(ruleset) && state.chosenRulesets.length > 1) {
						state.fetchState = "fetch-data";
						state.chosenRulesets = state.chosenRulesets.filter(v => v !== ruleset);
					}
					else {
						state.fetchState = "fetch-data";
						state.chosenRulesets = [...state.chosenRulesets, ruleset];
					}
				}));
			},

			checkRulesets: (allowed: BwgrRulesetId[]) => {
				return get().chosenRulesets.some(ruleset => allowed.includes(ruleset));
			},

			checkExactRulesets: (allowed: BwgrRulesetId[]) => {
				const state = get();
				return allowed.every(ruleset => state.chosenRulesets.includes(ruleset));
			}
		}),
		{ name: "RulesetStore" }
	)
	// TODO: Enable persistance devtools(persist(Store, { name: Name, version: 1 }), { name: Name })
);
