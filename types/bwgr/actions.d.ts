import type { BwgrAbilityId } from "./ability";
import type { BwgrSkillId } from "./skill";
import type { Nominal } from "../utility/nominal";


export type BwgrDoWActionId = Nominal<number, "BwgrDoWActionId">;

export type BwgrRaCActionId = Nominal<number, "BwgrRaCActionId">;
export type BwgrRaCActionGroupId = Nominal<number, "BwgrRaCActionGroupId">;

export type BwgrFightActionGroupId = Nominal<number, "BwgrFightActionGroupId">;
export type BwgrFightActionId = Nominal<number, "BwgrFightActionId">;

export type BwgrActionResolutionTypeId = Nominal<number, "BwgrActionResolutionTypeId">;

export interface BwgrDoWActionDBO {
  Id: BwgrDoWActionId;
  Name: string;
  SpeakingThePart: string | null;
  Special: string | null;
  Effect: string | null;
}

export interface BwgrRaCActionDBO {
  Id: BwgrRaCActionId;
  Name: string;
  GroupId: BwgrRaCActionGroupId;
  Group: string;
  UseForks: boolean;
  UseWeaponRangeAdvantage: boolean;
  UsePositionAdvantage: boolean;
  UseStrideAdvantage: boolean;
  IsOpenEnded: boolean;
  Effect: string;
  SpecialRestriction: string | null;
  SpecialAction: string | null;
  However: string | null;
}

export interface BwgrFightActionDBO {
  Id: BwgrFightActionId;
  Name: string;
  GroupId: BwgrFightActionGroupId;
  Group: string;
  ActionCost: number | null;
  TestExtra: string | null;
  Restrictions: string | null;
  Effect: string | null;
  Special: string | null;
  CountsAsNoAction: boolean;
}

export interface BwgrActionTestDBO {
  ActionId: number;
  SkillId: BwgrSkillId | null;
  Skill: string | null;
  AbilityId: BwgrAbilityId | null;
  Ability: string | null;
}

export interface BwgrActionResolutionDBO<T> {
  ActionId: number;
  OpposingActionId: T;
  OpposingAction: string;
  ResolutionTypeId: BwgrActionResolutionTypeId;
  ResolutionType: string;
  IsAgainstSkill: boolean | null;
  Obstacle: number | null;
  OpposingModifier: number | null;
  SkillId: BwgrSkillId | null;
  Skill: string;
  AbilityId: BwgrAbilityId | null;
  Ability: string;
  OpposingSkillId: BwgrSkillId | null;
  OpposingSkill: string;
  OpposingAbilityId: BwgrAbilityId | null;
  OpposingAbility: string;
}

type BwgrDoWActionResolutionDBO = BwgrActionResolutionDBO<BwgrDoWActionId>;
type BwgrRaCActionResolutionDBO = BwgrActionResolutionDBO<BwgrRaCActionId>;
type BwgrFightActionResolutionDBO = BwgrActionResolutionDBO<BwgrFightActionId>;

export interface BwgrActionResolution<T> {
  opposingAction: [id: T, name: string];
  type: [id: BwgrActionResolutionTypeId, name: string];
  isAgainstSkill?: boolean;
  obstacle?: number;
  opposingModifier?: number;
  skill?: [id: BwgrSkillId, name: string];
  ability?: [id: BwgrAbilityId, name: string];
  opposingSkill?: [id: BwgrSkillId, name: string];
  opposingAbility?: [id: BwgrAbilityId, name: string];
}

export interface BwgrActionTests {
  skills: [id: BwgrSkillId, name: string][];
  abilities: [id: BwgrAbilityId, name: string][];
}

export interface BwgrDoWAction {
  id: BwgrDoWActionId;
  name: string;
  speakingThePart?: string;
  special?: string;
  effect?: string;
  tests?: BwgrActionTests;
  resolutions?: BwgrActionResolution<BwgrDoWActionId>[];
}

export interface BwgrRaCAction {
  id: BwgrRaCActionId;
  name: string;
  group: [id: BwgrRaCActionGroupId, name: string];
  flags: {
    useFoRKs?: boolean;
    useWeaponRangeAdvantage?: boolean;
    usePositionAdvantage?: boolean;
    useStrideAdvantage?: boolean;
    isOpenEnded?: boolean;
  };
  effect: string;
  specialRestriction?: string;
  specialAction?: string;
  however?: string;
  resolutions?: BwgrActionResolution<BwgrRaCActionId>[];
}

export interface BwgrFightAction {
  id: BwgrFightActionId;
  name: string;
  group: [id: BwgrFightActionGroupId, name: string];
  flags: {
    countsAsNoAction?: boolean;
  };
  actionCost?: number;
  testExtra?: string;
  restrictions?: string;
  effect?: string;
  special?: string;
  tests?: BwgrActionTests;
  resolutions?: BwgrActionResolution<BwgrFightActionId>[];
}

export interface BwgrActionPlannerExtension {
  open: boolean;
  visible: boolean;
}

export type BwgrDoWActionExtended = BwgrDoWAction & BwgrActionPlannerExtension;
export type BwgrRaCActionExtended = BwgrRaCAction & BwgrActionPlannerExtension;
export type BwgrFightActionExtended = BwgrFightAction & BwgrActionPlannerExtension;
