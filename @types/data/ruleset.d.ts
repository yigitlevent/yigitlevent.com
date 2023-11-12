type RulesetId = Nominal<number, "RulesetId">;

interface Ruleset {
	id: RulesetId;
	name: string;
	isOfficial: boolean;
	isPublic: boolean;
	isExpansion: boolean;
	user?: string;
	expansionIds?: RulesetId[];
}

interface RulesetData {
	abilities: Ability[];
	stocks: Stock[];
	settings: Setting[];
	skills: Skill[];
	traits: Trait[];
	lifepaths: Lifepath[];
	resources: Resource[];
	spellFacets: SpellFacets;
	dowActions: DoWAction[];
	racActions: RaCAction[];
	fightActions: FightAction[];
	practices: Practice[];
}
