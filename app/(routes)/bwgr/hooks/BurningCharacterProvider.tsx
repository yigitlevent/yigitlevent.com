"use client";

import { createContext, Fragment, useCallback, useContext, useEffect, useState } from "react";

import type { BwgrCharacterSkill, BwgrCharacterTrait, BwgrCharacterAttribute, BwgrCharacterResource } from "@/types/bwgr/character";
import type { BwgrLifepath } from "@/types/bwgr/lifepath";
import type { JSX } from "react";


interface BasicsData {
  name: string;
  concept: string;
  gender: "Male" | "Female";
  stock: [id: string, name: string] | null;
  beliefs: { name: string; belief: string; }[];
  instincts: { name: string; instinct: string; }[];
}

interface StatData {
  poolType: "Mental" | "Physical";
  shadeShifted: boolean;
  mainPoolSpent: { shade: number; exponent: number; };
  eitherPoolSpent: { shade: number; exponent: number; };
}

interface BurningCharacterState {
  basics: BasicsData;
  lifepaths: { lifepaths: BwgrLifepath[]; selectedIds: string[]; };
  stats: Record<string, StatData>;
  skills: BwgrCharacterSkill[];
  traits: BwgrCharacterTrait[];
  resources: Record<string, BwgrCharacterResource & { description: string; }>;
  attributes: BwgrCharacterAttribute[];
  miscData: {
    tolerances: Record<string, number>;
    questions: Record<string, unknown>;
    limits: Record<string, unknown>;
  };
}

interface BurningCharacterContextType {
  state: BurningCharacterState;
  setBasics: (basics: Partial<BasicsData>) => void;
  setStock: (stock: [id: string, name: string] | null) => void;
  addLifepath: (lifepath: BwgrLifepath) => void;
  removeLifepath: (lifepathId: string) => void;
  addSkill: (skill: BwgrCharacterSkill) => void;
  removeSkill: (skillId: string) => void;
  toggleSkillOpen: (skillId: string) => void;
  updateSkillExponent: (skillId: string, exponent: number) => void;
  addTrait: (trait: BwgrCharacterTrait) => void;
  removeTrait: (traitId: string) => void;
  toggleTraitOpen: (traitId: string) => void;
  addResource: (resource: BwgrCharacterResource & { description: string; }) => void;
  removeResource: (resourceId: string) => void;
  updateResource: (resourceId: string, updates: Partial<BwgrCharacterResource & { description: string; }>) => void;
  setStat: (statName: string, updates: Partial<StatData>) => void;
  reset: () => void;
}

const BurningCharacterContext = createContext<BurningCharacterContextType | undefined>(undefined);

const EmptyState: BurningCharacterState = {
  basics: {
    name: "",
    concept: "",
    gender: "Male",
    stock: null,
    beliefs: Array.from({ length: 4 }, (_, i) => ({ name: i === 3 ? "Instinct" : "", belief: "" })),
    instincts: Array.from({ length: 3 }, () => ({ name: "", instinct: "" }))
  },
  lifepaths: { lifepaths: [], selectedIds: [] },
  stats: {
    Will: { poolType: "Mental", shadeShifted: false, mainPoolSpent: { shade: 0, exponent: 0 }, eitherPoolSpent: { shade: 0, exponent: 0 } },
    Perception: { poolType: "Mental", shadeShifted: false, mainPoolSpent: { shade: 0, exponent: 0 }, eitherPoolSpent: { shade: 0, exponent: 0 } },
    Power: { poolType: "Physical", shadeShifted: false, mainPoolSpent: { shade: 0, exponent: 0 }, eitherPoolSpent: { shade: 0, exponent: 0 } },
    Agility: { poolType: "Physical", shadeShifted: false, mainPoolSpent: { shade: 0, exponent: 0 }, eitherPoolSpent: { shade: 0, exponent: 0 } },
    Forte: { poolType: "Physical", shadeShifted: false, mainPoolSpent: { shade: 0, exponent: 0 }, eitherPoolSpent: { shade: 0, exponent: 0 } },
    Speed: { poolType: "Physical", shadeShifted: false, mainPoolSpent: { shade: 0, exponent: 0 }, eitherPoolSpent: { shade: 0, exponent: 0 } }
  },
  skills: [],
  traits: [],
  resources: {},
  attributes: [],
  miscData: {
    tolerances: {},
    questions: {},
    limits: {}
  }
};

const StorageKey = "bwgr_burning_character";

export function BurningCharacterProvider({ children }: { children: React.ReactNode; }): JSX.Element | null {
  const [state, setState] = useState<BurningCharacterState>(EmptyState);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(StorageKey);
    if (saved) {
      try {
        setState(JSON.parse(saved) as BurningCharacterState);
      }
      catch {
        console.error("Failed to load character state");
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(StorageKey, JSON.stringify(state));
    }
  }, [state, mounted]);

  const setBasics = useCallback((basics: Partial<BasicsData>) => {
    setState(prev => ({ ...prev, basics: { ...prev.basics, ...basics } }));
  }, []);

  const setStock = useCallback((stock: [id: string, name: string] | null) => {
    setState(() => ({
      ...EmptyState,
      basics: { ...EmptyState.basics, stock }
    }));
  }, []);

  const addLifepath = useCallback((lifepath: BwgrLifepath) => {
    setState(prev => {
      const newId = String(lifepath.id);
      if (prev.lifepaths.selectedIds.includes(newId)) return prev;
      return {
        ...prev,
        lifepaths: {
          lifepaths: [...prev.lifepaths.lifepaths, lifepath],
          selectedIds: [...prev.lifepaths.selectedIds, newId]
        }
      };
    });
  }, []);

  const removeLifepath = useCallback((lifepathId: string) => {
    setState(prev => ({
      ...prev,
      lifepaths: {
        lifepaths: prev.lifepaths.lifepaths.filter(lp => String(lp.id) !== lifepathId),
        selectedIds: prev.lifepaths.selectedIds.filter(id => id !== lifepathId)
      }
    }));
  }, []);

  const addSkill = useCallback((skill: BwgrCharacterSkill) => {
    setState(prev => {
      if (prev.skills.some(s => s.id === skill.id)) return prev;
      return { ...prev, skills: [...prev.skills, skill] };
    });
  }, []);

  const removeSkill = useCallback((skillId: string) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.filter(s => String(s.id) !== skillId)
    }));
  }, []);

  const toggleSkillOpen = useCallback((skillId: string) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s =>
        String(s.id) === skillId ? { ...s, isOpen: s.isOpen === "yes" ? "no" : "yes" } : s
      )
    }));
  }, []);

  const updateSkillExponent = useCallback((skillId: string, exponent: number) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s =>
        String(s.id) === skillId ? { ...s, advancement: { ...s.advancement, general: exponent } } : s
      )
    }));
  }, []);

  const addTrait = useCallback((trait: BwgrCharacterTrait) => {
    setState(prev => {
      if (prev.traits.some(t => t.id === trait.id)) return prev;
      return { ...prev, traits: [...prev.traits, trait] };
    });
  }, []);

  const removeTrait = useCallback((traitId: string) => {
    setState(prev => ({
      ...prev,
      traits: prev.traits.filter(t => String(t.id) !== traitId)
    }));
  }, []);

  const toggleTraitOpen = useCallback((traitId: string) => {
    setState(prev => ({
      ...prev,
      traits: prev.traits.map(t =>
        String(t.id) === traitId ? { ...t, isOpen: !t.isOpen } : t
      )
    }));
  }, []);

  const addResource = useCallback((resource: BwgrCharacterResource & { description: string; }) => {
    setState(prev => ({
      ...prev,
      resources: { ...prev.resources, [String(resource.id)]: resource }
    }));
  }, []);

  const removeResource = useCallback((resourceId: string) => {
    setState(prev => {
      const newResources = { ...prev.resources };
      delete newResources[resourceId];
      return { ...prev, resources: newResources };
    });
  }, []);

  const updateResource = useCallback((resourceId: string, updates: Partial<BwgrCharacterResource & { description: string; }>) => {
    setState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        [resourceId]: { ...prev.resources[resourceId], ...updates }
      }
    }));
  }, []);

  const setStat = useCallback((statName: string, updates: Partial<StatData>) => {
    setState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statName]: { ...prev.stats[statName], ...updates }
      }
    }));
  }, []);

  const reset = useCallback(() => {
    setState(EmptyState);
  }, []);

  if (!mounted) return null;

  const value: BurningCharacterContextType = {
    state,
    setBasics,
    setStock,
    addLifepath,
    removeLifepath,
    addSkill,
    removeSkill,
    toggleSkillOpen,
    updateSkillExponent,
    addTrait,
    removeTrait,
    toggleTraitOpen,
    addResource,
    removeResource,
    updateResource,
    setStat,
    reset
  };

  return (
    <BurningCharacterContext.Provider value={value}>
      {children}
    </BurningCharacterContext.Provider>
  );
}

export function useBurningCharacter(): BurningCharacterContextType {
  const context = useContext(BurningCharacterContext);
  if (!context) {
    throw new Error("useBurningCharacter must be used within BurningCharacterProvider");
  }
  return context;
}
