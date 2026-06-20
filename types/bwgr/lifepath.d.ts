import type { BwgrAbilityId } from "./ability";
import type { BwgrQuestionId } from "./question";
import type { BwgrRulesetId } from "./ruleset";
import type { BwgrSettingId } from "./setting";
import type { BwgrSkillId } from "./skill";
import type { BwgrStockId } from "./stock";
import type { BwgrTraitId } from "./trait";
import type { Nominal } from "../utility/nominal";


export type BwgrLifepathId = Nominal<number, "BwgrLifepathId">;

export interface BwgrLifepathDBO {
  Rulesets: BwgrRulesetId[];
  Id: BwgrLifepathId;
  Name: string;
  StockId: BwgrStockId;
  Stock: string;
  SettingId: BwgrSettingId;
  Setting: string;
  LeadIds: BwgrSettingId[];
  SkillIds: BwgrSkillId[];
  TraitIds: BwgrTraitId[];
  Born: boolean;
  Years: number[];
  EitherPool: number;
  MentalPool: number;
  PhysicalPool: number;
  GeneralSkillPool: number;
  LifepathSkillPool: number;
  TraitPool: number;
  ResourcePoints: number;
  IsGSPMultiplier: boolean;
  IsLSPMultiplier: boolean;
  IsRPMultiplier: boolean;
  HalfGSPFromPrev: boolean;
  HalfLSPFromPrev: boolean;
  HalfRPFromPrev: boolean;
  RequirementText: string | null;
  CompanionName: string | null;
  CompanionGivesSkills: boolean | null;
  CompanionGSPMultiplier: number | null;
  CompanionLSPMultiplier: number | null;
  CompanionRPMultiplier: number | null;
  CompanionSettingIds: BwgrSettingId[];
}

export interface BwgrLifepathRequirementBlockDBO {
  Id: number;
  LifepathId: number;
  LogicTypeId: number;
  LogicType: string;
  MustFulfill: boolean;
  FulfillmentAmount: number;
}

export interface BwgrLifepathRequirementBlockItemDBO {
  RequirementId: number;
  RequirementTypeId: number;
  RequirementType: string;
  ForCompanion: boolean;
  Min: number | null;
  Max: number | null;
  SettingId: BwgrSettingId | null;
  Setting: string | null;
  LifepathId: BwgrLifepathId | null;
  Lifepath: string | null;
  SkillId: BwgrSkillId | null;
  Skill: string | null;
  TraitId: BwgrTraitId | null;
  Trait: string | null;
  AttributeId: BwgrAbilityId | null;
  Attribute: string | null;
}

export type BwgrLifepathRequirementItem =
  { logicType: [id: LogicTypeId, name: string]; }
  & ({ isUnique: true; }
    | { isSettingEntry: true; }
    | { minLpIndex: number; }
    | { maxLpIndex: number; }
    | { minYears: number; }
    | { maxYears: number; }
    | { gender: "Male" | "Female"; }
    | { oldestBy: number; }
    | { attribute: [id: BwgrAbilityId, name: string]; min?: number; max?: number; forCompanion: boolean; }
    | { skill: [id: BwgrSkillId, name: string]; forCompanion: boolean; }
    | { trait: [id: BwgrTraitId, name: string]; forCompanion: boolean; }
    | { lifepath: [id: BwgrLifepathId, name: string]; forCompanion: boolean; }
    | { setting: [id: BwgrSettingId, name: string]; forCompanion: boolean; }
    | { question: [id: BwgrQuestionId, name: string]; });

export interface BwgrLifepathRequirementBlock {
  logicType: [id: LogicTypeId, name: string];
  mustFulfill: boolean;
  fulfillmentAmount: number;
  items: BwgrLifepathRequirementItem[];
}

export interface BwgrLifepath {
  rulesets: BwgrRulesetId[];
  id: BwgrLifepathId;
  name: string;
  stock: [id: BwgrStockId, name: string];
  setting: [id: BwgrSettingId, name: string];
  leads?: BwgrSettingId[];
  skills?: BwgrSkillId[];
  traits?: BwgrTraitId[];
  years: number | number[];
  pools: {
    eitherStatPool: number;
    mentalStatPool: number;
    physicalStatPool: number;
    generalSkillPool: number;
    lifepathSkillPool: number;
    traitPool: number;
    resourcePoints: number;
  };
  flags: {
    isBorn: boolean;
    isGSPMultipliedByYear: boolean;
    isLSPMultipliedByYear: boolean;
    isRPMultipliedByYear: boolean;
    getHalfGSPFromPrevLP: boolean;
    getHalfLSPFromPrevLP: boolean;
    getHalfRPFromPrevLP: boolean;
  };
  companion?: {
    name: string;
    givesSkills: boolean;
    inheritGSPMultiplier?: number;
    inheritLSPMultiplier?: number;
    inheritRPMultiplier?: number;
    settingIds: BwgrSettingId[];
  };
  requirements?: BwgrLifepathRequirementBlock[];
  requirementsText?: string;
}
