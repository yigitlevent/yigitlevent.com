import produce from "immer";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericGet } from "../stores/_genericRequests";


// TODO: research index key signatures to see if there is a workaround
interface RulesetStore {
	fetching: boolean;

	rulesets: Ruleset[];
	chosenRulesets: RulesetId[];

	abilities: Ability[];

	stocks: Stock[];

	settings: Setting[];

	skills: Skill[];
	skillCategories: string[];
	skillTypes: string[];

	traits: Trait[];
	traitCategories: string[];
	traitTypes: string[];

	lifepaths: Lifepath[];

	toggleFetching: () => void;
	fetchList: () => void;
	fetchData: () => void;

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
					}));
				}
				else throw new Error();
			})
			.catch(reason => console.error(reason))
			.finally(() => toggleFetching());
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
