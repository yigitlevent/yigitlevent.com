interface HeartQuestion {
	title?: string;
	rest: string;
}

interface HeartAncestry {
	name: string;
	nameAlt: string | null;
	description: string;
	questions: HeartQuestion[];
	exampleNames: string[];
	trinkets: string[];
}

type HeartAbilityTypes = "Core";
type HeartCallingBeatType = "Minor" | "Major" | "Zenith";

interface HeartAbility {
	name: string;
	type: HeartAbilityTypes;
	description: string;
	effect: string;
}

interface HeartCallingBeats {
	description: string;
	type: HeartCallingBeatType;
}

interface HeartCalling {
	name: string;
	description: string;
	ability: HeartAbility;
	questions: HeartQuestion[];
	beats: HeartCallingBeats[];
	trinkets: string[];
}

type HeartResistanceName = "Blood" | "Echo" | "Mind" | "Fortune" | "Supplies";

interface HeartResistance {
	name: HeartResistanceName;
	shortDescription: string;
}

type HeartSkillName = "Compel" | "Delve" | "Discern" | "Endure" | "Evade" | "Hunt" | "Kill" | "Mend" | "Sneak";

interface HeartSkill {
	name: HeartSkillName;
	shortDescription: string;
}

type HeartDomainName = "Cursed" | "Desolate" | "Haven" | "Occult" | "Religion" | "Technology" | "Warren" | "Wild";

interface HeartDomain {
	name: HeartDomainName;
	shortDescription: string;
}

type HeartDice = 4 | 6 | 8 | 10 | 12;

type HeartResourceTagName = "Harmful" | "Fragile" | "Awkward" | "Deteriorating" | "Taboo" | "Volatile" | "Mobile" | "Beacon" | "Niche" | "Block" | "Bloodbound" | "Brutal" | "Conduit" | "Dangerous" | "Debilitating" | "Degenerating" | "Distressing" | "Double-barreled" | "Expensive" | "Extreme range" | "Limited X" | "Loud" | "Obscuring" | "One-shot" | "Piercing" | "Point-blank" | "Potent" | "Ranged" | "Reload" | "Smoke" | "Spread" | "Tiring" | "Trusty" | "Unreliable" | "Wyrd";

interface HeartResourceTags {
	name: HeartResourceTagName;
	hasVariable: boolean;
	description: string;
}

interface HeartResource {
	name: string;
	dice: HeartDice;
	skill?: HeartSkillName;
	domain?: HeartDomainName;
	resistance?: [HeartResistanceName] | [HeartResistanceName, HeartResistanceName];
	tags?: (HeartResourceTagName | [tagName: HeartResourceTagName, variable: number])[];
}

interface HeartClass {
	name: string;
	description: string;
	skill: HeartSkillName;
	domain: HeartDomainName;
	resource: HeartResource;
	equipment?: HeartResource[];
	equipments: HeartResource[][];
	abilities: HeartAbility[];
}
