import { GetAbilityDBOs } from "@/lib/db/abilities";
import { GetDoWActionResolutionDBOs, GetDoWActionTestDBOs, GetDuelOfWitsActionDBOs } from "@/lib/db/dow-actions";
import { GetFightActionDBOs, GetFightActionResolutionDBOs, GetFightActionTestDBOs } from "@/lib/db/fight-actions";
import { GetLifepathDBOs, GetLifepathRequirementBlockDBOs, GetLifepathRequirementBlockItemDBOs } from "@/lib/db/lifepaths";
import { GetPracticeDBOs, GetQuestionDBOs } from "@/lib/db/practices";
import { GetRangeAndCoverActionDBOs, GetRangeAndCoverActionResolutionDBOs } from "@/lib/db/rac-actions";
import { GetResourceDBOs, GetResourceMagicDetailDBOs, GetResourceMagicObstacleDBOs } from "@/lib/db/resources";
import { GetRulesetDBOs } from "@/lib/db/rulesets";
import { GetSettingDBOs } from "@/lib/db/settings";
import { GetSkillDBOs } from "@/lib/db/skills";
import { GetAltSpellAreaOfEffectFacetDBOs, GetAltSpellDurationFacetDBOs, GetAltSpellImpetusFacetDBOs, GetAltSpellOriginFacetDBOs, GetAltSpellPrimeElementFacetDBOs, GetAltSpellSecondaryElementFacetDBOs, GetAltSpellTertiaryElementFacetDBOs, GetSpellAreaOfEffectFacetDBOs, GetSpellDurationFacetDBOs, GetSpellElementFacetDBOs, GetSpellImpetusFacetDBOs, GetSpellOriginFacetDBOs } from "@/lib/db/spells";
import { GetAgePools, GetStocksDBOs } from "@/lib/db/stocks";
import { GetTraitDBOs } from "@/lib/db/traits";

import type { BwgrAbility, BwgrAbilityId } from "@/types/bwgr/ability";
import type { BwgrDoWAction, BwgrActionResolution, BwgrDoWActionId, BwgrRaCAction, BwgrRaCActionId, BwgrFightAction, BwgrFightActionId } from "@/types/bwgr/actions";
import type { BwgrLifepath, BwgrLifepathRequirementBlock, BwgrLifepathRequirementBlockItemDBO, BwgrLifepathRequirementItem } from "@/types/bwgr/lifepath";
import type { BwgrPractice } from "@/types/bwgr/practice";
import type { BwgrQuestion } from "@/types/bwgr/question";
import type { BwgrResource, BwgrResourceMagicObstacleDetails, BwgrResourceMagicDetails } from "@/types/bwgr/resource";
import type { BwgrRuleset } from "@/types/bwgr/ruleset";
import type { BwgrSetting } from "@/types/bwgr/setting";
import type { BwgrSkill } from "@/types/bwgr/skill";
import type { BwgrSpellFacets, BwgrAltSpellFacets } from "@/types/bwgr/spell";
import type { BwgrStock } from "@/types/bwgr/stock";
import type { BwgrTrait } from "@/types/bwgr/trait";
import type { LogicTypeId } from "@/types/utility/ids";


function RulesetsArray(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input.filter(value => typeof value === "string");
}

export async function GetRulesetsList(): Promise<BwgrRulesetsResponse> {
  const rows = await GetRulesetDBOs();

  return {
    rulesets: rows.map(v => {
      const ruleset: BwgrRuleset = {
        id: v.Id,
        name: v.Name,
        isOfficial: v.IsOfficial,
        isPublic: v.IsPublic,
        isExpansion: v.IsExpansion
      };

      if (Array.isArray(v.ExpansionIds) && v.ExpansionIds.length > 0) ruleset.expansionIds = v.ExpansionIds;
      if (v.User) ruleset.user = v.User;

      return ruleset;
    })
  };
}

async function GetAbilities(): Promise<BwgrAbility[]> {
  const rows = await GetAbilityDBOs();
  return rows.map(v => {
    const ability: BwgrAbility = {
      id: v.Id,
      name: v.Name,
      abilityType: [v.AbilityTypeId, v.AbilityType],
      hasShades: v.HasShades
    };

    if (v.RequiredTraitId !== null && v.RequiredTrait) {
      ability.requiredTrait = [v.RequiredTraitId, v.RequiredTrait];
    }

    if (v.Cycle !== null && v.Routine !== null && v.Difficult !== null && v.Challenging !== null) {
      ability.practice = {
        cycle: v.Cycle,
        routineTests: v.Routine,
        difficultTests: v.Difficult,
        challengingTests: v.Challenging
      };
    }

    return ability;
  });
}

async function GetStocks(rulesets: string[]): Promise<BwgrStock[]> {
  const [stocks, agePools] = await Promise.all([
    GetStocksDBOs(rulesets),
    GetAgePools()
  ]);

  return stocks.map(stock => ({
    rulesets: stock.Rulesets,
    id: stock.Id,
    name: stock.Name,
    namePlural: stock.NamePlural,
    stride: stock.Stride,
    settingIds: stock.SettingIds,
    agePool: agePools
      .filter(pool => pool.StockId === stock.Id)
      .map(pool => ({ minAge: pool.MinAge, mentalPool: pool.MentalPool, physicalPool: pool.PhysicalPool }))
  }));
}

async function GetSettings(rulesets: string[]): Promise<BwgrSetting[]> {
  const rows = await GetSettingDBOs(rulesets);
  return rows.map(v => ({
    rulesets: v.Rulesets,
    id: v.Id,
    name: v.Name,
    nameShort: v.NameShort,
    stock: [v.StockId, v.StockName],
    isSubsetting: v.IsSubsetting
  }));
}

async function GetSkills(rulesets: string[]): Promise<BwgrSkill[]> {
  const rows = await GetSkillDBOs(rulesets);

  return rows.map(v => {
    const skill: BwgrSkill = {
      rulesets: v.Rulesets,
      id: v.Id,
      name: v.Name,
      category: [v.CategoryId, v.Category],
      type: [v.TypeId, v.Type],
      flags: {
        dontList: v.DontList,
        isMagical: v.IsMagical,
        isTraining: v.IsTraining
      },
      tool: {
        typeId: v.ToolTypeId,
        tool: v.Tool
      }
    };

    if (v.StockId !== null && v.Stock !== null) skill.stock = [v.StockId, v.Stock];
    if (Array.isArray(v.RootIds) && v.RootIds.length > 0) skill.roots = v.RootIds.map((rootId: BwgrAbilityId, index: number) => [rootId, v.Roots[index]]);
    if (v.ToolDescription !== null) skill.tool.description = v.ToolDescription;
    if (v.Description !== null) skill.description = v.Description;
    if (Array.isArray(v.SubskillIds) && v.SubskillIds.length > 0) skill.subskillIds = v.SubskillIds;

    if (v.RestrictionOnlyStockId !== null && v.RestrictionOnlyStock !== null) {
      skill.restriction = { onlyStock: [v.RestrictionOnlyStockId, v.RestrictionOnlyStock] };
      if (v.RestrictionWhenBurning !== null) skill.restriction.onlyAtBurn = v.RestrictionWhenBurning;
      if (v.RestrictionAbilityId !== null && v.RestrictionAbility !== null) {
        skill.restriction.onlyWithAbility = [v.RestrictionAbilityId, v.RestrictionAbility];
      }
    }

    return skill;
  });
}

async function GetTraits(rulesets: string[]): Promise<BwgrTrait[]> {
  const rows = await GetTraitDBOs(rulesets);
  return rows.map(v => {
    const trait: BwgrTrait = {
      rulesets: v.Rulesets,
      id: v.Id,
      name: v.Name,
      category: [v.CategoryId, v.Category],
      type: [v.TypeId, v.Type],
      cost: v.Cost
    };

    if (v.StockId !== null && v.Stock !== null) trait.stock = [v.StockId, v.Stock];
    if (v.Description !== null) trait.description = v.Description;

    return trait;
  });
}

async function GetLifepaths(rulesets: string[]): Promise<BwgrLifepath[]> {
  const [lifepaths, requirementBlocks, requirementBlockItems] = await Promise.all([
    GetLifepathDBOs(rulesets),
    GetLifepathRequirementBlockDBOs(),
    GetLifepathRequirementBlockItemDBOs()
  ]);

  lifepaths.forEach(lp => {
    if (lp.SettingId === 11) {
      console.log("Found a lifepath with setting 11:", lp);
    }
  });

  return lifepaths.map(lifepath => {
    const lp: BwgrLifepath = {
      rulesets: lifepath.Rulesets,
      id: lifepath.Id,
      name: lifepath.Name,
      stock: [lifepath.StockId, lifepath.Stock],
      setting: [lifepath.SettingId, lifepath.Setting],
      years: Array.isArray(lifepath.Years) && lifepath.Years.length === 1 ? lifepath.Years[0] : lifepath.Years,
      pools: {
        eitherStatPool: lifepath.EitherPool,
        mentalStatPool: lifepath.MentalPool,
        physicalStatPool: lifepath.PhysicalPool,
        generalSkillPool: lifepath.GeneralSkillPool,
        lifepathSkillPool: lifepath.LifepathSkillPool,
        traitPool: lifepath.TraitPool,
        resourcePoints: lifepath.ResourcePoints
      },
      flags: {
        isBorn: lifepath.Born,
        isGSPMultipliedByYear: lifepath.IsGSPMultiplier,
        isLSPMultipliedByYear: lifepath.IsLSPMultiplier,
        isRPMultipliedByYear: lifepath.IsRPMultiplier,
        getHalfGSPFromPrevLP: lifepath.HalfGSPFromPrev,
        getHalfLSPFromPrevLP: lifepath.HalfLSPFromPrev,
        getHalfRPFromPrevLP: lifepath.HalfRPFromPrev
      }
    };

    if (Array.isArray(lifepath.LeadIds) && lifepath.LeadIds.length > 0) lp.leads = lifepath.LeadIds;
    if (Array.isArray(lifepath.SkillIds) && lifepath.SkillIds.length > 0) lp.skills = lifepath.SkillIds;
    if (Array.isArray(lifepath.TraitIds) && lifepath.TraitIds.length > 0) lp.traits = lifepath.TraitIds;

    if (lifepath.CompanionName && lifepath.CompanionGivesSkills && Array.isArray(lifepath.CompanionSettingIds) && lifepath.CompanionSettingIds.length > 0) {
      lp.companion = {
        name: lifepath.CompanionName,
        givesSkills: lifepath.CompanionGivesSkills,
        settingIds: lifepath.CompanionSettingIds
      };

      if (lifepath.CompanionGSPMultiplier && lifepath.CompanionGSPMultiplier > 0) lp.companion.inheritGSPMultiplier = lifepath.CompanionGSPMultiplier;
      if (lifepath.CompanionLSPMultiplier && lifepath.CompanionLSPMultiplier > 0) lp.companion.inheritLSPMultiplier = lifepath.CompanionLSPMultiplier;
      if (lifepath.CompanionRPMultiplier && lifepath.CompanionRPMultiplier > 0) lp.companion.inheritRPMultiplier = lifepath.CompanionRPMultiplier;
    }

    if (lifepath.RequirementText) lp.requirementsText = lifepath.RequirementText;

    const reqBlocks = requirementBlocks.filter(item => item.LifepathId === lifepath.Id);
    if (reqBlocks.length > 0) {
      lp.requirements = reqBlocks.map(block => {
        const requirementBlock: BwgrLifepathRequirementBlock = {
          logicType: [block.LogicTypeId, block.LogicType] as [id: LogicTypeId, name: string],
          mustFulfill: block.MustFulfill,
          fulfillmentAmount: block.FulfillmentAmount,
          items: []
        };

        const items: BwgrLifepathRequirementItem[] = requirementBlockItems
          .filter(item => item.RequirementId === block.Id)
          .map((item: BwgrLifepathRequirementBlockItemDBO): BwgrLifepathRequirementItem => {
            const requirement = {
              logicType: [item.RequirementTypeId, item.RequirementType] as [id: LogicTypeId, name: string]
            };

            if (item.RequirementType === "UNIQUE") {
              return { ...requirement, isUnique: true };
            }
            if (item.RequirementType === "SETTINGENTRY") {
              return { ...requirement, isSettingEntry: true };
            }
            if (item.RequirementType === "LPINDEX") {
              if (item.Min) return { ...requirement, minLpIndex: item.Min };
              if (item.Max) return { ...requirement, maxLpIndex: item.Max };
              throw new Error(`Invalid LPINDEX requirement item with id ${String(item.RequirementId)}: missing both Min and Max values.`);
            }
            if (item.RequirementType === "YEARS") {
              if (item.Min) return { ...requirement, minYears: item.Min };
              if (item.Max) return { ...requirement, maxYears: item.Max };
              throw new Error(`Invalid YEARS requirement item with id ${String(item.RequirementId)}: missing both Min and Max values.`);
            }
            if (item.RequirementType === "FEMALE") {
              return { ...requirement, gender: "Female" };
            }
            if (item.RequirementType === "MALE") {
              return { ...requirement, gender: "Male" };
            }
            if (item.RequirementType === "OLDESTBY") {
              if (item.Max) return { ...requirement, oldestBy: item.Max };
              throw new Error(`Invalid OLDESTBY requirement item with id ${String(item.RequirementId)}: missing Max value.`);
            }
            if (item.RequirementType === "ATTRIBUTE") {
              if (item.AttributeId && item.Attribute) {
                const value: BwgrLifepathRequirementItem = {
                  ...requirement,
                  attribute: [item.AttributeId, item.Attribute],
                  forCompanion: item.ForCompanion
                };
                if (item.Min) value.min = item.Min;
                if (item.Max) value.max = item.Max;
                return value;
              }
              throw new Error(`Invalid ATTRIBUTE requirement item with id ${String(item.RequirementId)}: missing AttributeId or Attribute values.`);
            }
            if (item.RequirementType === "SKILL") {
              if (item.SkillId && item.Skill) return { ...requirement, skill: [item.SkillId, item.Skill], forCompanion: item.ForCompanion };
              throw new Error(`Invalid SKILL requirement item with id ${String(item.RequirementId)}: missing SkillId or Skill values.`);
            }
            if (item.RequirementType === "TRAIT") {
              if (item.TraitId && item.Trait) return { ...requirement, trait: [item.TraitId, item.Trait], forCompanion: item.ForCompanion };
              throw new Error(`Invalid TRAIT requirement item with id ${String(item.RequirementId)}: missing TraitId or Trait values.`);
            }
            if (item.RequirementType === "LIFEPATH") {
              if (item.LifepathId && item.Lifepath) return { ...requirement, lifepath: [item.LifepathId, item.Lifepath], forCompanion: item.ForCompanion };
              throw new Error(`Invalid LIFEPATH requirement item with id ${String(item.RequirementId)}: missing LifepathId or Lifepath values.`);
            }
            if (item.RequirementType === "SETTING") {
              if (item.SettingId && item.Setting) return { ...requirement, setting: [item.SettingId, item.Setting], forCompanion: item.ForCompanion };
              throw new Error(`Invalid SETTING requirement item with id ${String(item.RequirementId)}: missing SettingId or Setting values.`);
            }

            return requirement as unknown as BwgrLifepathRequirementItem;
          });

        requirementBlock.items = items;
        return requirementBlock;
      });
    }

    return lp;
  });
}

async function GetResources(rulesets: string[]): Promise<BwgrResource[]> {
  const [resources, magicDetails, magicObstacles] = await Promise.all([
    GetResourceDBOs(rulesets),
    GetResourceMagicDetailDBOs(),
    GetResourceMagicObstacleDBOs()
  ]);

  return resources.map(resource => {
    const output: BwgrResource = {
      rulesets: resource.Rulesets,
      id: resource.Id,
      name: resource.Name,
      stock: [resource.StockId, resource.Stock],
      type: [resource.ResourceTypeId, resource.ResourceType],
      costs: [],
      modifiers: []
    };

    if (resource.VariableCost) output.variableCost = true;
    if (resource.Description) output.description = resource.Description;

    resource.Costs.forEach((cost: number, i: number) => output.costs.push([cost, resource.CostDescriptions[i]]));
    resource.Modifiers.forEach((modifier: number, i: number) => {
      output.modifiers.push([modifier, resource.ModifierIsPerCosts[i], resource.ModifierDescriptions[i]]);
    });

    const details = magicDetails.find(item => item.ResourceId === resource.Id);
    if (details) {
      const magical: BwgrResourceMagicDetails = {
        origin: [details.OriginId, details.Origin],
        duration: [details.DurationId, details.Duration],
        areaOfEffect: [details.AreaOfEffectId, details.AreaOfEffect],
        elements: [],
        impetus: [],
        actions: details.Actions,
        doActionsMultiply: details.ActionsMultiply
      };

      if (details.AreaOfEffectModifierId !== null || details.AreaofEffectModifier || details.AreaOfEffectUnitId !== null || details.AreaOfEffectUnit) {
        magical.areaOfEffectDetails = {};
      }

      if (magical.areaOfEffectDetails && details.AreaOfEffectUnitId !== null && details.AreaOfEffectUnit) {
        magical.areaOfEffectDetails.unit = [details.AreaOfEffectUnitId, details.AreaOfEffectUnit];
      }

      if (magical.areaOfEffectDetails && details.AreaOfEffectModifierId !== null && details.AreaofEffectModifier) {
        magical.areaOfEffectDetails.modifier = [details.AreaOfEffectModifierId, details.AreaofEffectModifier];
      }

      if (details.Element1) magical.elements.push([details.Element1Id, details.Element1]);
      if (details.Element2Id !== null && details.Element2) magical.elements.push([details.Element2Id, details.Element2]);
      if (details.Element3Id !== null && details.Element3) magical.elements.push([details.Element3Id, details.Element3]);
      if (details.Impetus1) magical.impetus.push([details.Impetus1Id, details.Impetus1]);
      if (details.Impetus2Id !== null && details.Impetus2) magical.impetus.push([details.Impetus2Id, details.Impetus2]);

      const obs = magicObstacles.filter(item => item.ResourceId === resource.Id);
      if (obs.length > 0) {
        magical.obstacleDetails = obs.map(item => {
          const obstacle: BwgrResourceMagicObstacleDetails = {};

          if (item.Obstacle) obstacle.obstacle = item.Obstacle;
          else if (item.ObstacleAbility1Id !== null || item.ObstacleAbility1 !== null || item.ObstacleAbility2Id !== null || item.ObstacleAbility2 !== null) {
            obstacle.abilities = [];
            if (item.ObstacleAbility1Id !== null && item.ObstacleAbility1 !== null) {
              obstacle.abilities.push([item.ObstacleAbility1Id, item.ObstacleAbility1]);
            }
            if (item.ObstacleAbility2Id !== null && item.ObstacleAbility2 !== null) {
              obstacle.abilities.push([item.ObstacleAbility2Id, item.ObstacleAbility2]);
            }
          }

          if (item.ObstacleCaret) obstacle.caret = item.ObstacleCaret;
          if (item.Description !== null) obstacle.description = item.Description;

          return obstacle;
        });
      }

      output.magical = magical;
    }

    return output;
  });
}

async function GetSpellFacets(): Promise<BwgrSpellFacets> {
  const [origins, elements, impetus, duration, areaOfEffects] = await Promise.all([
    GetSpellOriginFacetDBOs(),
    GetSpellElementFacetDBOs(),
    GetSpellImpetusFacetDBOs(),
    GetSpellDurationFacetDBOs(),
    GetSpellAreaOfEffectFacetDBOs()
  ]);

  const transformFacet = (facet: { Id: unknown; Name: string; Obstacle: number; Actions: number; Resource: number; }): { id: unknown; name: string; obstacle: number; actions: number; resource: number; } => ({
    id: facet.Id,
    name: facet.Name,
    obstacle: facet.Obstacle,
    actions: facet.Actions,
    resource: facet.Resource
  });

  return {
    origins: origins.map(transformFacet),
    elements: elements.map(transformFacet),
    impetus: impetus.map(transformFacet),
    duration: duration.map(transformFacet),
    areaOfEffects: areaOfEffects.map(transformFacet)
  } as BwgrSpellFacets;
}

async function GetAltSpellFacets(): Promise<BwgrAltSpellFacets> {
  const [origins, primeElements, lowerElements, higherElements, impetus, duration, areaOfEffects] = await Promise.all([
    GetAltSpellOriginFacetDBOs(),
    GetAltSpellPrimeElementFacetDBOs(),
    GetAltSpellSecondaryElementFacetDBOs(),
    GetAltSpellTertiaryElementFacetDBOs(),
    GetAltSpellImpetusFacetDBOs(),
    GetAltSpellDurationFacetDBOs(),
    GetAltSpellAreaOfEffectFacetDBOs()
  ]);

  const transformFacet = (facet: { Id: unknown; Name: string; Obstacle: number; Actions: number; Resource: number; }): { id: unknown; name: string; obstacle: number; actions: number; resource: number; } => ({
    id: facet.Id,
    name: facet.Name,
    obstacle: facet.Obstacle,
    actions: facet.Actions,
    resource: facet.Resource
  });

  return {
    origins: origins.map(transformFacet),
    primeElements: primeElements.map(transformFacet),
    lowerElements: lowerElements.map(transformFacet),
    higherElements: higherElements.map(transformFacet),
    impetus: impetus.map(transformFacet),
    duration: duration.map(transformFacet),
    areaOfEffects: areaOfEffects.map(transformFacet)
  } as BwgrAltSpellFacets;
}

async function GetDoWActions(): Promise<BwgrDoWAction[]> {
  const [actions, tests, resolutions] = await Promise.all([
    GetDuelOfWitsActionDBOs(),
    GetDoWActionTestDBOs(),
    GetDoWActionResolutionDBOs()
  ]);

  return actions.map(action => {
    const output: BwgrDoWAction = {
      id: action.Id,
      name: action.Name
    };

    if (action.Effect) output.effect = action.Effect;
    if (action.SpeakingThePart) output.speakingThePart = action.SpeakingThePart;
    if (action.Special) output.special = action.Special;

    const actionTests = tests.filter(test => test.ActionId === action.Id);
    if (actionTests.length > 0) {
      output.tests = { skills: [], abilities: [] };
      actionTests.forEach(test => {
        if (output.tests && test.Ability && test.AbilityId !== null) output.tests.abilities.push([test.AbilityId, test.Ability]);
        if (output.tests && test.Skill && test.SkillId !== null) output.tests.skills.push([test.SkillId, test.Skill]);
      });
    }

    const actionResolutions = resolutions.filter(resolution => resolution.ActionId === action.Id);
    if (actionResolutions.length > 0) {
      output.resolutions = actionResolutions.map(resolution => {
        const item: BwgrActionResolution<BwgrDoWActionId> = {
          opposingAction: [resolution.OpposingActionId, resolution.OpposingAction],
          type: [resolution.ResolutionTypeId, resolution.ResolutionType]
        };

        if (resolution.IsAgainstSkill) item.isAgainstSkill = resolution.IsAgainstSkill;
        if (resolution.Obstacle) item.obstacle = resolution.Obstacle;
        if (resolution.OpposingModifier) item.opposingModifier = resolution.OpposingModifier;

        if (resolution.SkillId !== null) item.skill = [resolution.SkillId, resolution.Skill];
        if (resolution.AbilityId !== null) item.ability = [resolution.AbilityId, resolution.Ability];
        if (resolution.OpposingSkillId !== null && resolution.OpposingSkill) {
          item.opposingSkill = [resolution.OpposingSkillId, resolution.OpposingSkill];
        }
        if (resolution.OpposingAbilityId !== null && resolution.OpposingAbility) {
          item.opposingAbility = [resolution.OpposingAbilityId, resolution.OpposingAbility];
        }

        return item;
      });
    }

    return output;
  });
}

async function GetRaCActions(): Promise<BwgrRaCAction[]> {
  const [actions, resolutions] = await Promise.all([
    GetRangeAndCoverActionDBOs(),
    GetRangeAndCoverActionResolutionDBOs()
  ]);

  return actions.map(action => {
    const output: BwgrRaCAction = {
      id: action.Id,
      name: action.Name,
      group: [action.GroupId, action.Group],
      flags: {},
      effect: action.Effect
    };

    if (action.Effect) output.effect = action.Effect;
    if (action.SpecialRestriction) output.specialRestriction = action.SpecialRestriction;
    if (action.SpecialAction) output.specialAction = action.SpecialAction;
    if (action.However) output.however = action.However;

    if (action.UseForks) output.flags.useFoRKs = action.UseForks;
    if (action.UseWeaponRangeAdvantage) output.flags.useWeaponRangeAdvantage = action.UseWeaponRangeAdvantage;
    if (action.UsePositionAdvantage) output.flags.usePositionAdvantage = action.UsePositionAdvantage;
    if (action.UseStrideAdvantage) output.flags.useStrideAdvantage = action.UseStrideAdvantage;
    if (action.IsOpenEnded) output.flags.isOpenEnded = action.IsOpenEnded;

    const actionResolutions = resolutions.filter(resolution => resolution.ActionId === action.Id);
    if (actionResolutions.length > 0) {
      output.resolutions = actionResolutions.map(resolution => {
        const item: BwgrActionResolution<BwgrRaCActionId> = {
          opposingAction: [resolution.OpposingActionId, resolution.OpposingAction],
          type: [resolution.ResolutionTypeId, resolution.ResolutionType]
        };

        if (resolution.IsAgainstSkill) item.isAgainstSkill = resolution.IsAgainstSkill;
        if (resolution.Obstacle) item.obstacle = resolution.Obstacle;
        if (resolution.OpposingModifier) item.opposingModifier = resolution.OpposingModifier;

        if (resolution.SkillId !== null) item.skill = [resolution.SkillId, resolution.Skill];
        if (resolution.AbilityId !== null) item.ability = [resolution.AbilityId, resolution.Ability];
        if (resolution.OpposingSkillId !== null && resolution.OpposingSkill) {
          item.opposingSkill = [resolution.OpposingSkillId, resolution.OpposingSkill];
        }
        if (resolution.OpposingAbilityId !== null && resolution.OpposingAbility) {
          item.opposingAbility = [resolution.OpposingAbilityId, resolution.OpposingAbility];
        }

        return item;
      });
    }

    return output;
  });
}

async function GetFightActions(): Promise<BwgrFightAction[]> {
  const [actions, tests, resolutions] = await Promise.all([
    GetFightActionDBOs(),
    GetFightActionTestDBOs(),
    GetFightActionResolutionDBOs()
  ]);

  return actions.map(action => {
    const output: BwgrFightAction = {
      id: action.Id,
      name: action.Name,
      group: [action.GroupId, action.Group],
      flags: {}
    };

    if (action.Effect) output.effect = action.Effect;
    if (action.Restrictions) output.restrictions = action.Restrictions;
    if (action.Special) output.special = action.Special;
    if (action.TestExtra) output.testExtra = action.TestExtra;
    if (action.ActionCost) output.actionCost = action.ActionCost;
    if (action.CountsAsNoAction) output.flags.countsAsNoAction = action.CountsAsNoAction;

    const actionTests = tests.filter(test => test.ActionId === action.Id);
    if (actionTests.length > 0) {
      output.tests = { skills: [], abilities: [] };
      actionTests.forEach(test => {
        if (output.tests && test.Ability && test.AbilityId !== null) output.tests.abilities.push([test.AbilityId, test.Ability]);
        if (output.tests && test.Skill && test.SkillId !== null) output.tests.skills.push([test.SkillId, test.Skill]);
      });
    }

    const actionResolutions = resolutions.filter(resolution => resolution.ActionId === action.Id);
    if (actionResolutions.length > 0) {
      output.resolutions = actionResolutions.map(resolution => {
        const item: BwgrActionResolution<BwgrFightActionId> = {
          opposingAction: [resolution.OpposingActionId, resolution.OpposingAction],
          type: [resolution.ResolutionTypeId, resolution.ResolutionType]
        };

        if (resolution.IsAgainstSkill) item.isAgainstSkill = resolution.IsAgainstSkill;
        if (resolution.Obstacle) item.obstacle = resolution.Obstacle;
        if (resolution.OpposingModifier) item.opposingModifier = resolution.OpposingModifier;

        if (resolution.SkillId !== null) item.skill = [resolution.SkillId, resolution.Skill];
        if (resolution.AbilityId !== null) item.ability = [resolution.AbilityId, resolution.Ability];
        if (resolution.OpposingSkillId !== null && resolution.OpposingSkill) {
          item.opposingSkill = [resolution.OpposingSkillId, resolution.OpposingSkill];
        }
        if (resolution.OpposingAbilityId !== null && resolution.OpposingAbility) {
          item.opposingAbility = [resolution.OpposingAbilityId, resolution.OpposingAbility];
        }

        return item;
      });
    }

    return output;
  });
}

async function GetPractices(): Promise<BwgrPractice[]> {
  const rows = await GetPracticeDBOs();

  return rows.map(item => {
    if (item.Ability !== null && item.AbilityId !== null) {
      const result: BwgrPractice = {
        id: item.Id,
        ability: [item.AbilityId, item.Ability],
        cycle: item.Cycle,
        routine: item.Routine,
        difficult: item.Difficult,
        challenging: item.Challenging
      };

      return result;
    }

    if (item.SkillTypeId && item.SkillType) {
      const result: BwgrPractice = {
        id: item.Id,
        skillType: [item.SkillTypeId, item.SkillType],
        cycle: item.Cycle,
        routine: item.Routine,
        difficult: item.Difficult,
        challenging: item.Challenging
      };

      return result;
    }
  }).filter((item): item is BwgrPractice => item !== undefined);
}

async function GetQuestions(): Promise<BwgrQuestion[]> {
  const rows = await GetQuestionDBOs();

  return rows.map(item => {
    const output: BwgrQuestion = {
      id: item.Id,
      name: item.Name,
      question: item.Question
    };

    if (item.AttributeId1 || item.AttributeId2) output.attributes = [];
    if (output.attributes && item.AttributeId1 && item.AttributeName1) output.attributes.push([item.AttributeId1, item.AttributeName1]);
    if (output.attributes && item.AttributeId2 && item.AttributeName2) output.attributes.push([item.AttributeId2, item.AttributeName2]);

    return output;
  });
}

export async function GetRulesetsData(body: Record<string, unknown>): Promise<BwgrRulesetResponse> {
  const rulesets = RulesetsArray(body.rulesets);

  const [
    abilities,
    stocks,
    settings,
    skills,
    traits,
    lifepaths,
    resources,
    spellFacets,
    spellAltFacets,
    dowActions,
    racActions,
    fightActions,
    practices,
    questions
  ] = await Promise.all([
    GetAbilities(),
    GetStocks(rulesets),
    GetSettings(rulesets),
    GetSkills(rulesets),
    GetTraits(rulesets),
    GetLifepaths(rulesets),
    GetResources(rulesets),
    GetSpellFacets(),
    GetAltSpellFacets(),
    GetDoWActions(),
    GetRaCActions(),
    GetFightActions(),
    GetPractices(),
    GetQuestions()
  ]);

  return {
    ruleset: {
      abilities,
      stocks,
      settings,
      skills,
      traits,
      lifepaths,
      resources,
      spellFacets,
      spellAltFacets,
      dowActions,
      racActions,
      fightActions,
      practices,
      questions
    }
  };
}
