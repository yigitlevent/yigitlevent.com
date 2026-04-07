type RoleName = "Boss" | "Chronicler" | "Dog Handler" | "Enforcer" | "Fixer" | "Gearhead" | "Grunt" | "Stalker";

type TalentName =
	"Commander" | "Gunslingers" | "Rackateer"
	| "Bonesaw" | "Agitator" | "Performer"
	| "Bloodhound" | "Fight Dog" | "Mutant's Best Friend"
	| "Barge Through" | "Mean Streak" | "Sucker Punch"
	| "Wheeler Dealer" | "Vicious Creep" | "Juicy Info"
	| "Inventor" | "Motorhead" | "Tinkerer"
	| "Cynic" | "Rebel" | "Resilient"
	| "Scavanger" | "Monster Hunter" | "Rot Finder"
	| "Admirer" | "Archeologist" | "Assassin" | "Bad Omens" | "Bodyguard"
	| "Butcher" | "Combat Veteran" | "Cool Head" | "Counselor" | "Coward"
	| "Fast Draw" | "Flyweight" | "Gadgeteer" | "Good Footwork" | "Hard Hitter"
	| "Workhorse" | "Jack of All Trades" | "Light Eater" | "Loner" | "Never Surrender"
	| "Pack Mule" | "Personal Arithmetic" | "Sharpshooter" | "Sleepless" | "Stoic"
	| "Therapist" | "Weapon Specialist" | "Zone Cook";

type AttributeName = "Strength" | "Agility" | "Wits" | "Empathy";

type PenaltyName = "Damage" | "Fatigue" | "Confusion" | "Doubt";

type SkillName =
	"Endure" | "Force" | "Fight"
	| "Sneak" | "Move" | "Shoot"
	| "Scout" | "Comprehend" | "Know the Zone"
	| "Sense Emotion" | "Manipulate" | "Heal";

type SpecialistSkillName =
	"Intimidate" | "Jury-Rig" | "Find the Path"
	| "Make a Deal" | "Sic a Dog" | "Inspire"
	| "Command" | "Shake it Off";

type MutationName =
	"Acid Spit" | "Amphibian" | "Corpse-Eater"
	| "Extreme Reflexes" | "Flame Breather" | "Four-Armed"
	| "Frog Legs" | "Human Magnet" | "Human Plant"
	| "Insectoid" | "Insect Wings" | "Luminescence"
	| "Manbeast" | "Mind Terror" | "Puppeteer"
	| "Parasite" | "Pathokinesis" | "Pyrokinesis"
	| "Reptilian" | "Rot-Eater" | "Sonar" | "Spores"
	| "Sprinter" | "Telepathy" | "Tracker";

interface Talent {
	name: TalentName;
	description: string;
}

interface Mutation {
	name: MutationName;
	description: string[];
}

interface Role {
	name: RoleName;
	appearance: {
		face: string[];
		body: string[];
		clothing: string[];
	};
	talents: TalentName[];
	keyAttribute: AttributeName;
	specialistSkillName: SpecialistSkillName;
}

interface Attribute {
	name: AttributeName;
	base: number;
	penaltyName: PenaltyName;
	penalty: number;
}

interface Skill {
	name: SkillName;
	rank: number;
	attribute: AttributeName;
}

interface SpecialistSkill {
	name: SpecialistSkillName;
	rank: number;
	attribute: AttributeName;
}

interface Relationship {
	name: string;
	relationship: string;
	isBuddy: boolean;
}

interface Character {
	name: string;
	age: number;
	roleName: RoleName | undefined;

	appearance: {
		face: string;
		body: string;
		clothings: string;
	};

	talentName: TalentName | undefined;

	hasExtraMutation: boolean;

	attributes: Record<AttributeName, Attribute>;
	skills: Record<SkillName, Skill>;
	specialistSkill: SpecialistSkill | undefined;
	mutationName: MutationName | undefined;
	extraMutationName: MutationName | undefined;
	relationships: Relationship[];
	iHate: { name: string; relationship: string; };
	iNeedToProtect: { name: string; relationship: string; };
	myBigDream: { description: string; };
}
