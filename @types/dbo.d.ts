interface UserDBO {
	Id: string;
	Username: string;
	Email: string;
	Password: string;
}

interface RulesetDBO {
	Id: string;
	Name: string;
	IsOfficial: boolean;
	IsPublic: boolean;
	IsExpansion: boolean;
	User: string | null;
	ExpansionIds: string[];
}

interface AbilityDBO {
	Id: number;
	Name: string;
	AbilityTypeId: number;
	AbilityType: string;
	HasShades: boolean;
	Cycle: number | null;
	Routine: number | null;
	Difficult: number | null;
	Challenging: number | null;
}

interface StockDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	NamePlural: string;
	Stride: number;
	SettingIds: string[];
}

interface SettingDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	NameShort: string;
	StockId: number;
	StockName: string;
	IsSubsetting: boolean;
}

interface SkillDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	StockId: number | null;
	Stock: string | null;
	CategoryId: number;
	Category: string;
	TypeId: number;
	Type: string;
	RootIds: number[];
	Roots: string[];
	DontList: boolean;
	IsMagical: boolean;
	IsTraining: boolean;
	ToolTypeId: number;
	Tool: string;
	ToolDescription: string | null;
	Description: string | null;
	SubskillIds: number[];
}

interface TraitDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	StockId: number | null;
	Stock: string | null;
	CategoryId: number;
	Category: string;
	TypeId: number;
	Type: string;
	Cost: number;
	Description: string | null;
}

interface RulesetsDataDBO {
	Skills: Skill[];
	Traits: Trait[];
}