"use client";

/* eslint-disable react-refresh/only-export-components */

import { useCallback, useContext, useEffect, useReducer, createContext } from "react";

import { GenericGet, GenericPost } from "../utils/GenericRequests";

import type { BwgrAbility, BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrDoWAction, BwgrRaCAction, BwgrFightAction, BwgrDoWActionId, BwgrRaCActionId, BwgrFightActionId } from "@/types/bwgr/actions";
import type { BwgrLifepath, BwgrLifepathId } from "@/types/bwgr/lifepath";
import type { BwgrPractice, BwgrPracticeId } from "@/types/bwgr/practice";
import type { BwgrQuestion } from "@/types/bwgr/question";
import type { BwgrResource, BwgrResourceId } from "@/types/bwgr/resource";
import type { BwgrRuleset, BwgrRulesetId } from "@/types/bwgr/ruleset";
import type { BwgrSetting, BwgrSettingId } from "@/types/bwgr/setting";
import type { BwgrSkill, BwgrSkillId } from "@/types/bwgr/skill";
import type { BwgrSpellFacets, BwgrAltSpellFacets } from "@/types/bwgr/spell";
import type { BwgrStock, BwgrStockId } from "@/types/bwgr/stock";
import type { BwgrTrait, BwgrTraitId } from "@/types/bwgr/trait";
import type { ReactNode } from "react";


interface RulesetsResponse {
  rulesets: BwgrRuleset[];
}

type RulesetDataPayload = Extract<RulesetAction, { type: "SET_RULESET_DATA"; }>["payload"];

interface RulesetResponse {
  ruleset: RulesetDataPayload;
}


type FetchState = "fetch-full" | "fetching-list" | "fetch-data" | "fetching-data" | "done" | "failed";

interface RulesetContextType {
  fetchState: FetchState;
  rulesets: BwgrRuleset[];
  chosenRulesets: BwgrRulesetId[];
  abilities: BwgrAbility[];
  abilityTypes: string[];
  stocks: BwgrStock[];
  settings: BwgrSetting[];
  skills: BwgrSkill[];
  skillCategories: string[];
  skillTypes: string[];
  traits: BwgrTrait[];
  traitCategories: string[];
  traitTypes: string[];
  lifepaths: BwgrLifepath[];
  resources: BwgrResource[];
  resourceTypes: string[];
  spellFacets: BwgrSpellFacets;
  spellAltFacets: BwgrAltSpellFacets;
  dowActions: BwgrDoWAction[];
  racActions: BwgrRaCAction[];
  fightActions: BwgrFightAction[];
  practices: BwgrPractice[];
  questions: BwgrQuestion[];

  // Actions
  setFetchState: (fetchState: FetchState) => void;
  fetchList: () => void;
  fetchData: () => void;
  toggleDataset: (ruleset: BwgrRulesetId) => void;
  checkRulesets: (allowed: BwgrRulesetId[]) => boolean;
  checkExactRulesets: (allowed: BwgrRulesetId[]) => boolean;

  // Getters
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
}

const RulesetContext = createContext<RulesetContextType | undefined>(undefined);

interface RulesetState {
  fetchState: FetchState;
  rulesets: BwgrRuleset[];
  chosenRulesets: BwgrRulesetId[];
  abilities: BwgrAbility[];
  abilityTypes: string[];
  stocks: BwgrStock[];
  settings: BwgrSetting[];
  skills: BwgrSkill[];
  skillCategories: string[];
  skillTypes: string[];
  traits: BwgrTrait[];
  traitCategories: string[];
  traitTypes: string[];
  lifepaths: BwgrLifepath[];
  resources: BwgrResource[];
  resourceTypes: string[];
  spellFacets: BwgrSpellFacets;
  spellAltFacets: BwgrAltSpellFacets;
  dowActions: BwgrDoWAction[];
  racActions: BwgrRaCAction[];
  fightActions: BwgrFightAction[];
  practices: BwgrPractice[];
  questions: BwgrQuestion[];
}

type RulesetAction =
  | { type: "SET_FETCH_STATE"; payload: FetchState; }
  | { type: "SET_RULESETS"; payload: BwgrRuleset[]; }
  | { type: "SET_CHOSEN_RULESETS"; payload: BwgrRulesetId[]; }
  | {
    type: "SET_RULESET_DATA";
    payload: {
      abilities: BwgrAbility[];
      abilityTypes: string[];
      stocks: BwgrStock[];
      settings: BwgrSetting[];
      skills: BwgrSkill[];
      skillCategories: string[];
      skillTypes: string[];
      traits: BwgrTrait[];
      traitCategories: string[];
      traitTypes: string[];
      lifepaths: BwgrLifepath[];
      resources: BwgrResource[];
      resourceTypes: string[];
      spellFacets: BwgrSpellFacets;
      spellAltFacets: BwgrAltSpellFacets;
      dowActions: BwgrDoWAction[];
      racActions: BwgrRaCAction[];
      fightActions: BwgrFightAction[];
      practices: BwgrPractice[];
      questions: BwgrQuestion[];
    };
  }
  | { type: "TOGGLE_DATASET"; payload: BwgrRulesetId; };

const InitialState: RulesetState = {
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
  spellFacets: {
    origins: [],
    elements: [],
    impetus: [],
    areaOfEffects: [],
    duration: []
  },
  spellAltFacets: {
    origins: [],
    primeElements: [],
    lowerElements: [],
    higherElements: [],
    impetus: [],
    areaOfEffects: [],
    duration: []
  },
  dowActions: [],
  racActions: [],
  fightActions: [],
  practices: [],
  questions: []
};

function RulesetReducerFn(state: RulesetState, action: RulesetAction): RulesetState {
  switch (action.type) {
    case "SET_FETCH_STATE":
      return { ...state, fetchState: action.payload };
    case "SET_RULESETS":
      return { ...state, rulesets: action.payload };
    case "SET_CHOSEN_RULESETS":
      return { ...state, chosenRulesets: action.payload };
    case "SET_RULESET_DATA":
      return { ...state, ...action.payload };
    case "TOGGLE_DATASET": {
      const ruleset = action.payload;
      const currentRulesets = state.rulesets.find(v => v.id === ruleset);
      if (!currentRulesets?.isExpansion) {
        return {
          ...state,
          fetchState: "fetch-data",
          chosenRulesets: [ruleset]
        };
      }
      else if (state.chosenRulesets.includes(ruleset) && state.chosenRulesets.length > 1) {
        return {
          ...state,
          fetchState: "fetch-data",
          chosenRulesets: state.chosenRulesets.filter(v => v !== ruleset)
        };
      }
      else {
        return {
          ...state,
          fetchState: "fetch-data",
          chosenRulesets: [...state.chosenRulesets, ruleset]
        };
      }
    }
    default:
      return state;
  }
}

function ServeResultFn<T>(row: T[], error: [id: unknown, msg: string]): Readonly<T> {
  if (row.length === 1) return row[0];
  else if (row.length > 1) {
    throw new Error(`Found multiple ${error[1]} rows with ${typeof error[0] === "string" ? "name" : "id"} '${error[0] as string}'`);
  }
  else {
    throw new Error(`Could not find any ${error[1]} with ${typeof error[0] === "string" ? "name" : "id"} '${error[0] as string}'`);
  }
}

interface RulesetProviderProps {
  children: ReactNode;
}

export function RulesetProvider({ children }: RulesetProviderProps): ReactNode {
  const [state, dispatch] = useReducer(RulesetReducerFn, InitialState);

  const setFetchState = useCallback((fetchState: FetchState) => {
    dispatch({ type: "SET_FETCH_STATE", payload: fetchState });
  }, []);

  const fetchList = useCallback(() => {
    setFetchState("fetching-list");
    GenericGet<RulesetsResponse>("/api/bwgr/ruleset")
      .then(response => {
        dispatch({ type: "SET_RULESETS", payload: response.data.rulesets });
        dispatch({ type: "SET_CHOSEN_RULESETS", payload: [response.data.rulesets[0].id] });
        setFetchState("fetch-data");
      })
      .catch((reason: unknown) => {
        console.error(reason);
        setFetchState("failed");
      });
  }, [setFetchState]);

  const fetchData = useCallback(() => {
    if (state.fetchState === "fetch-data") {
      setFetchState("fetching-data");
      GenericPost<RulesetResponse>("/api/bwgr/ruleset", { rulesets: state.chosenRulesets })
        .then(response => {
          const data = response.data.ruleset;
          const abilityTypes = [...new Set(data.abilities.map(v => v.abilityType[1]))];
          const skillCategories = [...new Set(data.skills.map(v => v.category[1]))];
          const skillTypes = [...new Set(data.skills.map(v => v.type[1]))];
          const traitCategories = [...new Set(data.traits.map(v => v.category[1]))];
          const traitTypes = [...new Set(data.traits.map(v => v.type[1]))];
          const resourceTypes = [...new Set(data.resources.map(v => v.type[1]))];

          dispatch({
            type: "SET_RULESET_DATA",
            payload: {
              abilities: data.abilities,
              abilityTypes,
              stocks: data.stocks,
              settings: data.settings,
              skills: data.skills,
              skillCategories,
              skillTypes,
              traits: data.traits,
              traitCategories,
              traitTypes,
              lifepaths: data.lifepaths,
              resources: data.resources,
              resourceTypes,
              spellFacets: data.spellFacets,
              spellAltFacets: data.spellAltFacets,
              dowActions: data.dowActions,
              racActions: data.racActions,
              fightActions: data.fightActions,
              practices: data.practices,
              questions: data.questions
            }
          });
          setFetchState("done");
        })
        .catch((reason: unknown) => {
          console.error(reason);
          setFetchState("failed");
        });
    }
  }, [state.fetchState, state.chosenRulesets, setFetchState]);

  const toggleDataset = useCallback(
    (ruleset: BwgrRulesetId) => {
      dispatch({ type: "TOGGLE_DATASET", payload: ruleset });
    },
    []
  );

  const checkRulesets = useCallback(
    (allowed: BwgrRulesetId[]) => {
      return state.chosenRulesets.some(ruleset => allowed.includes(ruleset));
    },
    [state.chosenRulesets]
  );

  const checkExactRulesets = useCallback(
    (allowed: BwgrRulesetId[]) => {
      return allowed.every(ruleset => state.chosenRulesets.includes(ruleset));
    },
    [state.chosenRulesets]
  );

  const getAbility = useCallback(
    (search: BwgrAbilityId | string) => {
      const rows = typeof search === "string" ? state.abilities.filter(v => v.name === search) : state.abilities.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "abilities"]);
    },
    [state.abilities]
  );

  const getStock = useCallback(
    (search: BwgrStockId | string) => {
      const rows = typeof search === "string" ? state.stocks.filter(v => v.name === search) : state.stocks.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "stocks"]);
    },
    [state.stocks]
  );

  const getSetting = useCallback(
    (search: BwgrSettingId | string) => {
      const rows = typeof search === "string" ? state.settings.filter(v => v.name === search) : state.settings.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "settings"]);
    },
    [state.settings]
  );

  const getSkill = useCallback(
    (search: BwgrSkillId | string) => {
      const rows = typeof search === "string" ? state.skills.filter(v => v.name === search) : state.skills.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "skills"]);
    },
    [state.skills]
  );

  const getTrait = useCallback(
    (search: BwgrTraitId | string) => {
      const rows = typeof search === "string" ? state.traits.filter(v => v.name === search) : state.traits.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "traits"]);
    },
    [state.traits]
  );

  const getLifepath = useCallback(
    (search: BwgrLifepathId | string) => {
      const rows = typeof search === "string" ? state.lifepaths.filter(v => v.name === search) : state.lifepaths.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "lifepaths"]);
    },
    [state.lifepaths]
  );

  const getResource = useCallback(
    (search: BwgrResourceId | string) => {
      const rows = typeof search === "string" ? state.resources.filter(v => v.name === search) : state.resources.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "resources"]);
    },
    [state.resources]
  );

  const getDoWAction = useCallback(
    (search: BwgrDoWActionId | string) => {
      const rows = typeof search === "string" ? state.dowActions.filter(v => v.name === search) : state.dowActions.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "dowActions"]);
    },
    [state.dowActions]
  );

  const getRaCAction = useCallback(
    (search: BwgrRaCActionId | string) => {
      const rows = typeof search === "string" ? state.racActions.filter(v => v.name === search) : state.racActions.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "racActions"]);
    },
    [state.racActions]
  );

  const getFightAction = useCallback(
    (search: BwgrFightActionId | string) => {
      const rows = typeof search === "string" ? state.fightActions.filter(v => v.name === search) : state.fightActions.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "fightActions"]);
    },
    [state.fightActions]
  );

  const getPractice = useCallback(
    (search: BwgrPracticeId) => {
      const rows = state.practices.filter(v => v.id === search);
      return ServeResultFn(rows, [search, "practices"]);
    },
    [state.practices]
  );

  // Initialize on mount
  useEffect(() => {
    if (state.fetchState === "fetch-full") {
      fetchList();
    }
  }, [fetchList, state.fetchState]);

  // Auto-fetch data when switched
  useEffect(() => {
    if (state.fetchState === "fetch-data") {
      fetchData();
    }
  }, [state.fetchState, state.chosenRulesets, fetchData]);

  const value: RulesetContextType = {
    ...state,
    setFetchState,
    fetchList,
    fetchData,
    toggleDataset,
    checkRulesets,
    checkExactRulesets,
    getAbility,
    getStock,
    getSetting,
    getSkill,
    getTrait,
    getLifepath,
    getResource,
    getDoWAction,
    getRaCAction,
    getFightAction,
    getPractice
  };

  return <RulesetContext.Provider value={value}>{children}</RulesetContext.Provider>;
}

export function useRulesetContext(): RulesetContextType {
  const context = useContext(RulesetContext);
  if (!context) {
    throw new Error("useRulesetContext must be used within RulesetProvider");
  }
  return context;
}
