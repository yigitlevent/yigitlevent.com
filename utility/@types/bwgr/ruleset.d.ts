type BwgrRulesetId = Nominal<string, "BwgrRulesetId">;

interface BwgrRulesetDBO {
	Id: BwgrRulesetId;
	Name: string;
	IsOfficial: boolean;
	IsPublic: boolean;
	IsExpansion: boolean;
	User: string | null;
	ExpansionIds: BwgrRulesetId[];
}

interface BwgrRuleset {
	id: BwgrRulesetId;
	name: string;
	isOfficial: boolean;
	isPublic: boolean;
	isExpansion: boolean;
	user?: string;
	expansionIds?: BwgrRulesetId[];
}

interface BwgrRulesetData {
	abilities: BwgrAbility[];
	stocks: BwgrStock[];
	settings: BwgrSetting[];
	skills: BwgrSkill[];
	traits: BwgrTrait[];
	lifepaths: BwgrLifepath[];
	resources: BwgrResource[];
	spellFacets: BwgrSpellFacets;
	dowActions: BwgrDoWAction[];
	racActions: BwgrRaCAction[];
	fightActions: BwgrFightAction[];
	practices: BwgrPractice[];
	questions: BwgrQuestion[];
}
