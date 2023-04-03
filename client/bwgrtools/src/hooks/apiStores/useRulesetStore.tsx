import produce from "immer";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericGet } from "../../utils/genericRequests";


// TODO: research index key signatures to see if there is a workaround
interface RulesetStore {
	readonly fetching: boolean;

	readonly rulesets: Ruleset[];
	readonly chosenRulesets: RulesetId[];

	readonly abilities: Ability[];
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

	toggleFetching: () => void;
	fetchList: () => void;
	fetchData: () => void;

	// TODO: Might be useful to create a hash table of id-index pairs to quicken the search -- name/string search being slow is fine, it should be used veeery rarely
	serveResult: <T>(row: T[], error: [id: any, msg: string]) => T;
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

	toggleDataset: (dataset: RulesetId) => void;
	checkRulesets: (allowed: RulesetId[]) => boolean;
	checkExactRulesets: (allowed: RulesetId[]) => boolean;
}

const Name = "RulesetStore";
const Store: StateCreator<RulesetStore, [["zustand/devtools", never]], [], RulesetStore> = (set, get) => ({
	fetching: true,

	rulesets: [],
	chosenRulesets: ["bwgr" as unknown as RulesetId], // TODO: this shouldn't be fixed

	abilities: [],
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
		GenericGet<RulesetList>("/rulesets/list")
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

		GenericGet<RulesetData>("/rulesets/data")
			.then(response => {
				if (response.status === 200) {
					set(produce<RulesetStore>((state) => {
						state.abilities = response.data.abilities;
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
					}));
				}
				else throw new Error();
			})
			.catch(reason => console.error(reason))
			.finally(() => toggleFetching());
	},

	serveResult<T>(row: T[], error: [id: any, msg: string]): Readonly<T> {
		if (row.length == 1) return row[0];
		else if (row.length > 1) throw new Error(`Found multiple ${error[1]} rows with ${typeof error[0] === "string" ? "name" : "id"} '${error[0]}'`);
		else throw new Error(`Could not find any ${error[1]} with ${typeof error[0] === "string" ? "name" : "id"} '${error[0]}'`);
	},

	getAbility(search: AbilityId | string) {
		const rows = (typeof search === "string") ? this.abilities.filter(v => v.name = search) : this.abilities.filter(v => v.id = search);
		return this.serveResult(rows, [search, "abilities"]);
	},

	getStock(search: StockId | string) {
		const rows = (typeof search === "string") ? this.stocks.filter(v => v.name = search) : this.stocks.filter(v => v.id = search);
		return this.serveResult(rows, [search, "stocks"]);
	},

	getSetting(search: SettingId | string) {
		const rows = (typeof search === "string") ? this.settings.filter(v => v.name = search) : this.settings.filter(v => v.id = search);
		return this.serveResult(rows, [search, "settings"]);
	},

	getSkill(search: SkillId | string) {
		const rows = (typeof search === "string") ? this.skills.filter(v => v.name = search) : this.skills.filter(v => v.id = search);
		return this.serveResult(rows, [search, "skills"]);
	},

	getTrait(search: TraitId | string) {
		const rows = (typeof search === "string") ? this.traits.filter(v => v.name = search) : this.traits.filter(v => v.id = search);
		return this.serveResult(rows, [search, "traits"]);
	},

	getLifepath(search: LifepathId | string) {
		const rows = (typeof search === "string") ? this.lifepaths.filter(v => v.name = search) : this.lifepaths.filter(v => v.id = search);
		return this.serveResult(rows, [search, "lifepaths"]);
	},

	getResource(search: ResourceId | string) {
		const rows = (typeof search === "string") ? this.resources.filter(v => v.name = search) : this.resources.filter(v => v.id = search);
		return this.serveResult(rows, [search, "resources"]);
	},

	getDoWAction(search: DoWActionId | string) {
		const rows = (typeof search === "string") ? this.dowActions.filter(v => v.name = search) : this.dowActions.filter(v => v.id = search);
		return this.serveResult(rows, [search, "dowActions"]);
	},

	getRaCAction(search: RaCActionId | string) {
		const rows = (typeof search === "string") ? this.racActions.filter(v => v.name = search) : this.racActions.filter(v => v.id = search);
		return this.serveResult(rows, [search, "racActions"]);
	},

	getFightAction(search: FightActionId | string) {
		const rows = (typeof search === "string") ? this.fightActions.filter(v => v.name = search) : this.fightActions.filter(v => v.id = search);
		return this.serveResult(rows, [search, "fightActions"]);
	},

	toggleDataset: (ruleset: RulesetId) => {
		set(produce<RulesetStore>((state) => {
			if (state.chosenRulesets.includes(ruleset)) {
				state.chosenRulesets = state.chosenRulesets.filter(v => v != ruleset);
			}
			else {
				state.chosenRulesets = [...state.chosenRulesets, ruleset];
			}
		}));
	},

	checkRulesets: (allowed: RulesetId[]) => {
		const state = get();
		return state.chosenRulesets.some(ruleset => allowed.includes(ruleset));
	},

	checkExactRulesets: (allowed: RulesetId[]) => {
		const state = get();
		return allowed.every(ruleset => state.chosenRulesets.includes(ruleset));
	}
});

export const useRulesetStore = create<RulesetStore>()(
	devtools(Store, { name: Name })
	// TODO: Enable persistance devtools(persist(Store, { name: Name, version: 1 }), { name: Name })
);
