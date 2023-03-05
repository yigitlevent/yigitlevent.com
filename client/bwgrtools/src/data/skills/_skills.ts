import { AnyGeneral, AnyMonstrous, AnyWise } from "./any";
import { DwarfArt, DwarfSpecial } from "./dwarf";
import { ElfSkillSong, ElfSpecial, ElfSpellSong } from "./elf";
import { GreatWolfSpecial, GreatWolfSpiritHunterSong } from "./greatwolf";
import { HumanMagical, HumanSpecial } from "./human";
import { OrcSpecial } from "./orc";
import { RodenSpecial } from "./roden";
import { TrollSpecial } from "./troll";


export interface Skill {
	name: string;
	description?: string;

	allowed: RulesetId[];
	magical: boolean;
	noList: boolean;
	restriction: "N/A" | `${"ONLY" | "ONLYBURN"}➞${StocksList}${"" | `➞WITH➞${AttributesList}`}`;
	root: [] | [StatsAndAttributesList] | [StatsAndAttributesList, StatsAndAttributesList];
	tools: [ToolsList, string];
	training: boolean;
	type: SkillTypesList;

	subskills?: SkillPath[];
}

export interface SkillCategory {
	allowed: RulesetId[];
	name: SkillCategoryPath;
	skills: Skill[];
}

export interface SkillCategories {
	[key: string]: SkillCategory;
}

export const SkillCategories: SkillCategories = {
	"Any General": AnyGeneral,
	"Any Monstrous": AnyMonstrous,
	"Any Wise": AnyWise,
	"Dwarf Art": DwarfArt,
	"Dwarf Special": DwarfSpecial,
	"Elf Special": ElfSpecial,
	"Elf Skill Song": ElfSkillSong,
	"Elf Spell Song": ElfSpellSong,
	"Human Magical": HumanMagical,
	"Human Special": HumanSpecial,
	"Orc Special": OrcSpecial,
	"Roden Special": RodenSpecial,
	"Troll Special": TrollSpecial,
	"Great Wolf Special": GreatWolfSpecial,
	"Great Wolf Spirit Hunter Song": GreatWolfSpiritHunterSong
};
