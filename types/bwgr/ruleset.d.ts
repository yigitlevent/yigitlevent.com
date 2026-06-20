import type { Nominal } from "../utility/nominal";


export type BwgrRulesetId = Nominal<string, "BwgrRulesetId">;

export interface BwgrRulesetDBO {
  Id: BwgrRulesetId;
  Name: string;
  IsOfficial: boolean;
  IsPublic: boolean;
  IsExpansion: boolean;
  User: string | null;
  ExpansionIds: BwgrRulesetId[];
}

export interface BwgrRuleset {
  id: BwgrRulesetId;
  name: string;
  isOfficial: boolean;
  isPublic: boolean;
  isExpansion: boolean;
  user?: string;
  expansionIds?: BwgrRulesetId[];
}

export interface BwgrRulesetData {
  abilities: BwgrAbility[];
  stocks: BwgrStock[];
  settings: BwgrSetting[];
  skills: BwgrSkill[];
  traits: BwgrTrait[];
  lifepaths: BwgrLifepath[];
  resources: BwgrResource[];
  spellFacets: BwgrSpellFacets;
  spellAltFacets: BwgrAltSpellFacets;
  dowActions: BwgrDoWAction[];
  racActions: BwgrRaCAction[];
  fightActions: BwgrFightAction[];
  practices: BwgrPractice[];
  questions: BwgrQuestion[];
}
