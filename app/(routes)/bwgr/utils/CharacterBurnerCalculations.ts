import type { BwgrCharacterSkill, BwgrCharacterTrait } from "@/types/bwgr/character";
import type { BwgrLifepath } from "@/types/bwgr/lifepath";


interface PoolTotals {
  eitherStatPool: number;
  mentalStatPool: number;
  physicalStatPool: number;
  generalSkillPool: number;
  lifepathSkillPool: number;
  traitPool: number;
  resourcePoints: number;
}

export function CalculateTotalPools(lifepaths: BwgrLifepath[]): PoolTotals {
  return lifepaths.reduce(
    (acc, lifepath) => {
      const years = Array.isArray(lifepath.years) ? Math.max(...lifepath.years) : lifepath.years;

      const gspMultiplier = lifepath.flags.isGSPMultipliedByYear ? years : 1;
      const lspMultiplier = lifepath.flags.isLSPMultipliedByYear ? years : 1;
      const rpMultiplier = lifepath.flags.isRPMultipliedByYear ? years : 1;

      acc.eitherStatPool += lifepath.pools.eitherStatPool;
      acc.mentalStatPool += lifepath.pools.mentalStatPool;
      acc.physicalStatPool += lifepath.pools.physicalStatPool;
      acc.generalSkillPool += lifepath.pools.generalSkillPool * gspMultiplier;
      acc.lifepathSkillPool += lifepath.pools.lifepathSkillPool * lspMultiplier;
      acc.traitPool += lifepath.pools.traitPool;
      acc.resourcePoints += lifepath.pools.resourcePoints * rpMultiplier;

      return acc;
    },
    {
      eitherStatPool: 0,
      mentalStatPool: 0,
      physicalStatPool: 0,
      generalSkillPool: 0,
      lifepathSkillPool: 0,
      traitPool: 0,
      resourcePoints: 0
    }
  );
}

export function CalculateAge(lifepaths: BwgrLifepath[]): number {
  return lifepaths.reduce((sum, lifepath) => {
    if (Array.isArray(lifepath.years)) {
      return sum + Math.max(...lifepath.years);
    }
    return sum + lifepath.years;
  }, 0);
}

export function CalculateSkillPoolSpending(skills: BwgrCharacterSkill[], generalPool: number, lifepathPool: number): { general: { spent: number; remaining: number; }; lifepath: { spent: number; remaining: number; }; } {
  let generalSpent = 0;
  let lifepathSpent = 0;

  skills.forEach(skill => {
    if (skill.type === "General") {
      generalSpent += skill.advancement.general;
    }
    else if (skill.type === "Lifepath") {
      lifepathSpent += skill.advancement.lifepath;
    }
  });

  return {
    general: { spent: generalSpent, remaining: Math.max(0, generalPool - generalSpent) },
    lifepath: { spent: lifepathSpent, remaining: Math.max(0, lifepathPool - lifepathSpent) }
  };
}

export function CalculateTraitPoolSpending(traits: BwgrCharacterTrait[], traitCosts: Record<string, number>): { spent: number; remaining: number; } {
  const spent = traits
    .filter(t => t.type === "General" && t.isOpen)
    .reduce((sum, t) => sum + (traitCosts[String(t.id)] || 0), 0);

  return {
    spent,
    remaining: Math.max(0, 0 - spent) // Will be calculated with actual pool from lifepaths
  };
}

export function CalculateResourcePoolSpending(resources: Record<string, { cost: number | number[]; }>): { spent: number; } {
  const spent = Object.values(resources).reduce((sum, r) => {
    const cost = Array.isArray(r.cost) ? r.cost[0] : r.cost;
    return sum + (cost || 0);
  }, 0);

  return { spent };
}

export function CalculateYearsTotal(lifepaths: BwgrLifepath[]): number {
  return lifepaths.reduce((sum, lifepath) => {
    if (Array.isArray(lifepath.years)) {
      return sum + Math.max(...lifepath.years);
    }
    return sum + lifepath.years;
  }, 0);
}
