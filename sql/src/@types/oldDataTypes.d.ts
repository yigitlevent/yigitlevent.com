type CoreRulesetIdOld = "bwgr" | "bs";
type ExpansionRulesetId = "bwc" | "antv1" | "amw";
type RulesetIdOld = CoreRulesetIdOld | ExpansionRulesetId;

type StocksList = "Dwarf" | "Elf" | "Human" | "Orc" | "Roden" | "Troll" | "Great Wolf";
type SubStocksList = "Dark Elf";
type StocksListExtended = StocksList | SubStocksList;
type SettingTypesList = "Setting" | "Subsetting";
type ToolsList = "No" | "Tools" | "Workshop" | "Traveling Gear" | "Other";
type StatsList = "Will" | "Perception" | "Agility" | "Speed" | "Power" | "Forte";
type AttributesList = "Health" | "Steel" | "Reflexes" | "Hesitation" | "Resources" | "Circles" | "Greed" | "Grief" | "Spite" | "Faith" | "Faith in Dead Gods" | "Hatred" | "Void Embrace" | "Ancestral Taint" | "Corruption";
type StatsAndAttributesList = StatsList | AttributesList;
type SkillTypesList = "Academic" | "Artisan" | "Artist" | "Craftsman" | "Forester" | "Martial" | "Medicinal" | "Military" | "Musical" | "Peasant" | "Physical" | "School of Thought" | "Seafaring" | "Social" | "Sorcerous" | "Special";
type TraitTypesList = "Character" | "Call-on" | "Die" | "Call-on and Die";
type ShadesList = "B" | "G" | "W";
type ShadesListLimited = Exclude<ShadesList, "W">;

type StockPath = `${StocksList}`;
type SettingPath = `${StockPath}➞${string}`;
type LifepathPath = `${SettingPath}➞${string}`;

type SkillCategoryPath = `${"Any"} ${"General" | "Monstrous" | "Wise"}`
	| `${"Dwarf" | "Elf" | "Human" | "Orc" | "Roden" | "Troll" | "Great Wolf"} ${"Special"}`
	| `Dwarf ${"Art"}`
	| `Elf ${"Skill Song" | "Spell Song"}`
	| `Dark Elf ${"Skill Song" | "Spell Song"}`
	| `Human ${"Magical"}`
	| `Great Wolf ${"Spirit Hunter Song"}`;
type SkillPath = `${SkillCategoryPath}➞${string}`;

type TraitCategoryPath = `${"Any"} ${"Character" | "Call-on" | "Die" | "Monstrous"}`
	| `${"Dwarf" | "Elf" | "Orc" | "Roden" | "Troll" | "Great Wolf"} ${"Common"}`
	| `${"Dwarf" | "Elf" | "Dark Elf" | "Human" | "Orc" | "Roden" | "Troll" | "Great Wolf"} ${"Lifepath" | "Special"}`;
type TraitPath = `${TraitCategoryPath}➞${string}`;

type RequirementItem =
	`Setting➞${SettingPath}`
	| LifepathPath
	| `Skill➞${SkillPath}`
	| `Trait➞${TraitPath}`
	| "LP➞UNIQUE"
	| "FIRSTINSETTING"
	| `GENDER➞${"FEMALE" | "MALE"}`
	| `${"YEARS" | "LP" | "GRIEF"}➞${"MIN" | "MAX"}➞${number}`
	| `OLDESTBY➞${number}`;

interface RequirementBlock {
	type: "AND" | "OR" | "NOT";
	fulfilmentAmount?: number;
	items: RequirementItem[];
}

interface RequirementBlocks {
	type: "AND" | "OR";
	items: RequirementBlock[];
}

interface Requirements {
	conditions?: RequirementBlocks;
	texts?: string[];
}

interface ListItem {
	name: string;
	description: string;
}

type Cell = {
	maxHours: number;
	remaining: number;
	placed: Practice[];
};

type ResolutionTypes = "Ob" | "Std" | "½" | "Skill" | "Vs" | "+Vs" | "Vs+";

interface ResolutionItem {
	type: ResolutionTypes;

	againstSkill?: boolean;
	obstacle?: number;

	skill?: SkillPath;
	ability?: StatsAndAttributesList;

	opposingSkill?: SkillPath;
	opposingAbility?: StatsAndAttributesList;
	opposingModifier?: number;
}
