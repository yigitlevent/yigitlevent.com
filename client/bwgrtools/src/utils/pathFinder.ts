import { Skill, SkillCategories } from "../data/skills/_skills";
import { Lifepath, Setting, Stocks } from "../data/stocks/_stocks";
import { Trait, TraitCategories } from "../data/traits/_traits";


export function GetSettingFromPath(path: string): Setting {
	const spl = path.split("➞");
	const setting = Stocks[spl[0]].settings[spl[1]];
	if (setting) return setting;
	throw `Setting not found: ${setting}`;
}

export function GetPathFromLifepath(lp: Lifepath): LifepathPath {
	return `${lp.stock}➞${lp.setting}➞${lp.name}`;
}

export function GetLifepathFromPath(path: string): Lifepath {
	const spl = path.split("➞");
	const lifepath = Stocks[spl[0]].settings[spl[1]].lifepaths.find(lp => lp.name === spl[2]);
	if (lifepath) return lifepath;
	throw `Lifepath not found: ${lifepath}`;
}

export function GetLifepathsFromPaths(paths: LifepathPath[]): Lifepath[] {
	return paths.map((lp) => GetLifepathFromPath(lp));
}

export function GetSkillFromPath(path: string): Skill {
	const spl = path.split("➞");
	if (spl[0] === "Skill") spl.shift();
	const skill = SkillCategories[spl[0]].skills.find(s => s.name === spl[1]);
	if (skill) return skill;
	throw `Skill not found: ${path}`;
}

export function GetTraitFromPath(path: string): Trait {
	const spl = path.split("➞");
	if (spl[0] === "Trait") spl.shift();
	const trait = TraitCategories[spl[0]].traits.find(t => t.name === spl[1]);
	if (trait) return trait;
	throw `Trait not found: ${path}`;
}
