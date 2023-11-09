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

const Name = "RulesetStore";

export const useRulesetStore = create<RulesetStore>()(
	devtools(
		(set, get) => ({
			fetching: true,

			rulesets: [],
			chosenRulesets: ["bwgr" as unknown as RulesetId, "bwc" as unknown as RulesetId], // TODO: this shouldn't be fixed

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
				GenericGet<RulesetList>("/ruleset/list")
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

				GenericPost<RulesetData>("/ruleset/data", { rulesets })
					.then(response => {
						if (response.status === 200) {
							set(produce<RulesetStore>((state) => {
								state.abilities = response.data.abilities;
								state.abilityTypes = [...response.data.abilities.reduce((a, v) => a.add(v.abilityType[1]), new Set<string>())];

								state.stocks = response.data.stocks;
								state.settings = response.data.settings;

								state.skills = response.data.skills;
								state.skillCategories = [...response.data.skills.reduce((a, v) => a.add(v.category[1]), new Set<string>())];
								state.skillTypes = [...response.data.skills.reduce((a, v) => a.add(v.type[1]), new Set<string>())];

								state.traits = response.data.traits;
								state.traitCategories = [...response.data.traits.reduce((a, v) => a.add(v.category[1]), new Set<string>())];
								state.traitTypes = [...response.data.traits.reduce((a, v) => a.add(v.type[1]), new Set<string>())];

								state.lifepaths = response.data.lifepaths;

								state.resources = response.data.resources;
								state.resourceTypes = [...response.data.resources.reduce((a, v) => a.add(v.type[1]), new Set<string>())];

								state.spellFacets = response.data.spellFacets;

								state.dowActions = response.data.dowActions;
								state.racActions = response.data.racActions;
								state.fightActions = response.data.fightActions;

								state.practices = response.data.practices;
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
		{ name: Name })
	// TODO: Enable persistance devtools(persist(Store, { name: Name, version: 1 }), { name: Name })
);
