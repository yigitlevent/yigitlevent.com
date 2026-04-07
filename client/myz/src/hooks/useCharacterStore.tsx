import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


export const AttributeNames: AttributeName[] = [
	"Strength", "Agility", "Wits", "Empathy"
];

export const SkillNames: SkillName[] = [
	"Endure", "Force", "Fight",
	"Sneak", "Move", "Shoot",
	"Scout", "Comprehend", "Know the Zone",
	"Sense Emotion", "Manipulate", "Heal"
];

export const SpecialistSkills: SpecialistSkill[] = [
	{ name: "Intimidate", rank: 1, attribute: "Strength" },
	{ name: "Jury-Rig", rank: 1, attribute: "Wits" },
	{ name: "Find the Path", rank: 1, attribute: "Agility" },
	{ name: "Make a Deal", rank: 1, attribute: "Empathy" },
	{ name: "Sic a Dog", rank: 1, attribute: "Agility" },
	{ name: "Inspire", rank: 1, attribute: "Empathy" },
	{ name: "Command", rank: 1, attribute: "Wits" },
	{ name: "Shake it Off", rank: 1, attribute: "Wits" }
];

export const Roles: Role[] = [
	{
		name: "Boss",
		appearance: {
			face: ["moon face", "scarred face", "hairless", "greasy hair", "watery eyes"],
			body: ["standing upright", "short", "abnormally fat", "has no legs and needs to be carried"],
			clothing: ["suit", "dress", "protective coverall", "fur coat", "hat", "jewelry"]
		},
		talents: ["Commander", "Gunslingers", "Rackateer"],
		keyAttribute: "Wits",
		specialistSkillName: "Command"
	},
	{
		name: "Chronicler",
		appearance: {
			face: ["sickly pale skin", "hairless head", "friendly face", "piercing eyes", "serious"],
			body: ["skinny", "hunchback", "abnormally tiny", "gnarled"],
			clothing: ["worn coveralls with a number on it", "raincoat", "worn suit", "covered by paraphernalia from the old age"]
		},
		talents: ["Bonesaw", "Agitator", "Performer"],
		keyAttribute: "Empathy",
		specialistSkillName: "Inspire"
	},
	{
		name: "Dog Handler",
		appearance: {
			face: ["hairless", "scarred", "pastry pale", "unblinking", "disfigured"],
			body: ["wiry", "scrawny", "short", "hunched"],
			clothing: ["overalls", "padded jacket", "leather jacket", "hoodie", "heavy boots"]
		},
		talents: ["Bloodhound", "Fight Dog", "Mutant's Best Friend"],
		keyAttribute: "Agility",
		specialistSkillName: "Sic a Dog"
	},
	{
		name: "Enforcer",
		appearance: {
			face: ["broken nose", "dead eyes", "scarred head", "welding mask", "hockey mask", "metal jaw"],
			body: ["scarred", "muscular", "compact", "wiry", "huge", "arm prosthesis"],
			clothing: ["worn leather coat", "dirty coverall", "undersized t-shirt", "cut-up car tires", "hubcaps"]
		},
		talents: ["Barge Through", "Mean Streak", "Sucker Punch"],
		keyAttribute: "Strength",
		specialistSkillName: "Intimidate"
	},
	{
		name: "Fixer",
		appearance: {
			face: ["pleasant", "always smiling", "unnaturally attractive", "greasy"],
			body: ["slender", "skinny", "short", "abnormally fat", "no legs"],
			clothing: ["suit", "dress", "colorful t-shirt", "leather coat", "hat", "gloves"]
		},
		talents: ["Wheeler Dealer", "Vicious Creep", "Juicy Info"],
		keyAttribute: "Empathy",
		specialistSkillName: "Make a Deal"
	},
	{
		name: "Gearhead",
		appearance: {
			face: ["goggles", "grinning", "spiked hair", "fairless", "bloodshot eyes", "dirty", "always chewing"],
			body: ["thin", "wiry", "extremely skinny", "very short", "abnormally fat"],
			clothing: ["dirty yellow coverall", "bicycle chains", "patched-up raincoat", "t-shirt with heavy metal motif", "cables and light bulbs"]
		},
		talents: ["Inventor", "Motorhead", "Tinkerer"],
		keyAttribute: "Wits",
		specialistSkillName: "Jury-Rig"
	},
	{
		name: "Grunt",
		appearance: {
			face: ["expressionless", "disfigured", "rough", "dead eyes", "hairless"],
			body: ["powerful", "muscular", "skinny", "hunchback", "ape-like"],
			clothing: ["none", "chains", "torn T-shirt", "dirty coverall"]
		},
		talents: ["Cynic", "Rebel", "Resilient"],
		keyAttribute: "Strength",
		specialistSkillName: "Shake it Off"
	},
	{
		name: "Stalker",
		appearance: {
			face: ["hidden under a hood", "scarred face", "hair-less", "sickly pale", "bandaged"],
			body: ["androgynous", "wiry", "muscular", "short"],
			clothing: ["raincoat", "coverall", "camouflage gear", "army boots", "backpack"]
		},
		talents: ["Scavanger", "Monster Hunter", "Rot Finder"],
		keyAttribute: "Agility",
		specialistSkillName: "Find the Path"
	}
];

export const Talents: Talent[] = [
	{ name: "Commander", description: "You get a +2 modification when you order your gang to fight for you. You don’t get the modification in any other situations, nor for racketeering." },
	{ name: "Gunslingers", description: "The members of your gang all have scrap guns (pistols or rifles). As long as they’re in the Ark, they have enough bullets to get by (but not more). In the Zone however, you have to supply the bullets" },
	{ name: "Rackateer", description: "You get a +2 modification when you use the Command skill for racketeering in the Ark (page 61), but not for other uses" },
	{ name: "Bonesaw", description: "You have learned the art of sawing bones and sewing skin – all in the interest of saving lives, of course. You get a +2 modification when you roll to Heal a critical injury (page 90), but not when tending to someone who is broken by trauma." },
	{ name: "Agitator", description: "You get a +2 modification when you Inspire someone to Fight or Shoot." },
	{ name: "Performer", description: "Once per session, if you’re in the Ark, you can perform for the People. You can tell a story by a trashcan fire, recite poetry or sing a song. Roll to Inspire. Every / gives you D6 bullets or rations of grub. A failed roll means someone doesn’t appreciate your art..." },
	{ name: "Bloodhound", description: "You have trained your dog to be a skilled tracker. You get a +2 modification when you use your dog to follow a track (page 59). If the dog dies, you keep the talent for your next hound." },
	{ name: "Fight Dog", description: "You have trained your dog to be a deadly little monster. You get a +2 modification when you use the dog to Fight (page 58). If the dog dies, you keep the talent for your next mutt." },
	{ name: "Mutant's Best Friend", description: "Your dog can get you out of any trouble. It can help you Endure and Move. Use your Sic a Dog skill level instead of these skills, and the dog’s attribute scores – Strength and Agility, respectively. You can push the rolls normally. Any trauma is suffered by your dog instead of you, but you don’t get any Mutation Points. If the dog dies, you keep the talent for your next hound." },
	{ name: "Barge Through", description: "You can Move using Strength instead of Agility." },
	{ name: "Mean Streak", description: "When you Intimidate someone and give your victim doubt, he suffers one extra point of it." },
	{ name: "Sucker Punch", description: "The weapon damage of your unarmed attacks is 2 instead of 1." },
	{ name: "Wheeler Dealer", description: "When you use the Make a Deal skill to make small business on the side (page 57), you earn twice as much of the commodity you choose." },
	{ name: "Vicious Creep", description: "When you Manipulate someone and give him doubt, he suffers one extra point of it." },
	{ name: "Juicy Info", description: "Choose one important NPC of whom you have incriminating information. Decide the nature of this information together with the GM. Don’t overuse this hold over the NPC – it could come back to haunt you…" },
	{ name: "Inventor", description: "You get a +2 modification when you use Jury-Rig to create a new device (page 54) – but not when you repair something." },
	{ name: "Motorhead", description: "You get a +1 modification when you use a vehicle to ram someone (Fight) or to escape from a conflict (Move). You also get a +1 when you Jury-Rig to repair or modify a vehicle (page 56)." },
	{ name: "Tinkerer", description: "You get a +2 modification when you Jury-Rig to repair a piece of gear – but not when you build something new." },
	{ name: "Cynic", description: "You get a +2 modification to Shake it Off, but only when suffering doubt (and for no other kinds of trauma)." },
	{ name: "Rebel", description: "When rolling to Shake it Off, for every / you roll, you get a +1 modification to your next action. You must use this bonus at the earliest possible oppor- tunity – that is, in the current turn or the next if you already acted in the turn" },
	{ name: "Resilient", description: "You get a +2 modification to Shake it Off, but only when suffering damage (and for no other kinds of trauma)." },
	{ name: "Scavanger", description: "You get a +2 modification to Find a Path – with success you find any artifacts that may exist in a sector. To identify threats, you must instead get stunts. You can choose whether or not to use this talent when you enter a new sector" },
	{ name: "Monster Hunter", description: "You get a +2 modification when you Scout a beast of any kind." },
	{ name: "Rot Finder", description: "When using Find a Path you have access to a new stunt that you can choose when you roll extra / – to find the most Rot-free route through the sector.The Rot level counts as one step lower during thisvisit to the sector." },
	{ name: "Admirer", description: "One NPC is very impressed by you, and will do anything to help you or just to be near you. Create this NPC together with the GM" },
	{ name: "Archeologist", description: "You get a +2 modification when trying to Comprehend a ruined building or other installation from the Old Age." },
	{ name: "Assassin", description: "When you Shoot someone and hit, the target suffers one extra point of damage – but only if you fire at Near range or at Arms Length." },
	{ name: "Bad Omens", description: "You can Scout using Empathy instead of Wits." },
	{ name: "Bodyguard", description: "If someone Shoots at and hits a person at Arms Length or Near you, you can dive in to take the bullet. Roll to Move. It doesn’t count as an action in conflict. If you roll one or more / you take the hit instead of your friend. You can push the roll." },
	{ name: "Butcher", description: "When you’ve killed a monster in the Zone, you can extract a number of rations of grub from the carcass equal to the creature’s original Strength. It doesn’t work on swarms (page 176). The meat will usually be contaminated by the Rot. That means it’s a good idea to combine this talent with Zone Cook" },
	{ name: "Combat Veteran", description: "You keep your cool under fire and can act effectively when your enemy hesitates. You get to roll two dice when rolling for initiative (page 79) and choose the highest one. You can also use this talent to increase your initiative score by +2 during combat – but this will cost you a maneuver. You can do this as many times as you like during a conflict." },
	{ name: "Cool Head", description: "You can Move with Wits instead of Agility." },
	{ name: "Counselor", description: "When you help someone, he gets an extra +1 modification – but only if he is doing something you told him to do." },
	{ name: "Coward", description: "If someone Shoots at you and rolls a hit, you can take cover behind a friend at Arms Length or Near you. The friend has to accept taking a hit for you. Roll to Move. It doesn’t count as an action. If the roll is successful, the shot hits your friend instead of you." },
	{ name: "Fast Draw", description: "You can draw your weapon so fast it doesn’t cost you a maneuver (page 80)." },
	{ name: "Flyweight", description: "When you defend yourself in close combat (page 84), you can use Agility instead of Strength." },
	{ name: "Gadgeteer", description: "You get a +2 modification when you try to Comprehend an artifact from the Old Age." },
	{ name: "Good Footwork", description: "You get a +2 modification when you defend in close combat (page 84)." },
	{ name: "Hard Hitter", description: "You get a +2 modification to Fight if you sacrifice your maneuver in the turn. You can’t use the talent for parrying" },
	{ name: "Workhorse", description: "You get a +2 modification when you work on a project in the Ark (Chapter 7)." },
	{ name: "Jack of All Trades", description: "You adopt a new role and immediately achieve skill level 1 in the specialist skill of that role. You keep your current skill level in the specialist skill of your old role, but you can no longer improve it. You also keep those of your talents that are specific to the old role, but you can’t get new talents tied to the role. It must make sense in the story for you to get the new role. For example, to become a Boss you need to find a gang that will follow you. Limitation: This talent requires more experience than others. You can’t get it until you have learned at least three other talents first." },
	{ name: "Light Eater", description: "You need only to eat one ration of grub every other day to avoid losing Strength." },
	{ name: "Loner", description: "You can recover lost Empathy (page 89) without the company of others – all you need is to be by yourself for a few hours." },
	{ name: "Never Surrender", description: "When you are broken by damage (your Strength hits zero), you can get back on your feet immedi- ately, without anyone Healing you. Roll to Endure, but without Base Dice (your Strength being zero). For every / you roll, you get one point of Strength back can keep fighting a little while longer. You can’t push the roll. The talent has no effect against critical injuries." },
	{ name: "Pack Mule", description: "You can carry twice as many objects as normal without being encumbered (page 23)." },
	{ name: "Personal Arithmetic", description: "You can Sense Emotion with Wits instead of Empathy." },
	{ name: "Sharpshooter", description: "When you Shoot someone and hit, the target suffers one extra point of damage – but only if you fire at Long or Distant range." },
	{ name: "Sleepless", description: "You can recover lost Wits by several other means than sleeping (page 90): Jury-Rig a device (page 54). Enter an unexplored sector of the Zone. Comprehend an artefact." },
	{ name: "Stoic", description: "You can Endure using Wits instead of Strength" },
	{ name: "Therapist", description: "You get a +2 modification when you Heal someone who is broken by doubt." },
	{ name: "Weapon Specialist", description: "You’re an expert at using a certain type of weapon – choose one from the weapon lists (page 86) or an artifact. When you use this weapon, you get a +1 modification. You can choose this talent sev- eral times, once for each weapon type. You can be a specialist at fighting unarmed or at using a “blunt ob- ject” – there are plenty of those in the Zone." },
	{ name: "Zone Cook", description: "You have mastered the art of cooking contaminated food from the Zone well enough to purge it from the Rot. You can also purify con- taminated water. Roll to Know the Zone – every / rolled purifies D6 ra- tions of grub or water." }
];

export const Mutations: Mutation[] = [
	{ name: "Acid Spit", description: [] },
	{ name: "Amphibian", description: [] },
	{ name: "Corpse-Eater", description: [] },
	{ name: "Extreme Reflexes", description: [] },
	{ name: "Flame Breather", description: [] },
	{ name: "Four-Armed", description: [] },
	{ name: "Frog Legs", description: [] },
	{ name: "Human Magnet", description: [] },
	{ name: "Human Plant", description: [] },
	{ name: "Insectoid", description: [] },
	{ name: "Insect Wings", description: [] },
	{ name: "Luminescence", description: [] },
	{ name: "Manbeast", description: [] },
	{ name: "Mind Terror", description: [] },
	{ name: "Puppeteer", description: [] },
	{ name: "Parasite", description: [] },
	{ name: "Pathokinesis", description: [] },
	{ name: "Pyrokinesis", description: [] },
	{ name: "Reptilian", description: [] },
	{ name: "Rot-Eater", description: [] },
	{ name: "Sonar", description: [] },
	{ name: "Spores", description: [] },
	{ name: "Sprinter", description: [] },
	{ name: "Telepathy", description: [] },
	{ name: "Tracker", description: [] }
];

const EMPTY: Character = {
	name: "",
	age: 18,
	roleName: undefined,
	appearance: {
		face: "",
		body: "",
		clothings: ""
	},
	talentName: undefined,
	hasExtraMutation: false,
	attributes: {
		Strength: { name: "Strength", base: 2, penaltyName: "Damage", penalty: 0 },
		Agility: { name: "Agility", base: 2, penaltyName: "Fatigue", penalty: 0 },
		Wits: { name: "Wits", base: 2, penaltyName: "Confusion", penalty: 0 },
		Empathy: { name: "Empathy", base: 2, penaltyName: "Doubt", penalty: 0 }
	},
	skills: {
		"Endure": { name: "Endure", rank: 0, attribute: "Strength" },
		"Force": { name: "Force", rank: 0, attribute: "Strength" },
		"Fight": { name: "Fight", rank: 0, attribute: "Strength" },
		"Sneak": { name: "Sneak", rank: 0, attribute: "Agility" },
		"Move": { name: "Move", rank: 0, attribute: "Agility" },
		"Shoot": { name: "Shoot", rank: 0, attribute: "Agility" },
		"Scout": { name: "Scout", rank: 0, attribute: "Wits" },
		"Comprehend": { name: "Comprehend", rank: 0, attribute: "Wits" },
		"Know the Zone": { name: "Know the Zone", rank: 0, attribute: "Wits" },
		"Sense Emotion": { name: "Sense Emotion", rank: 0, attribute: "Empathy" },
		"Manipulate": { name: "Manipulate", rank: 0, attribute: "Empathy" },
		"Heal": { name: "Heal", rank: 0, attribute: "Empathy" }
	},
	specialistSkill: undefined,
	mutationName: undefined,
	extraMutationName: undefined,
	relationships: Array.from({ length: 3 }).map(() => ({ name: "", relationship: "", isBuddy: false })),
	iHate: { name: "", relationship: "" },
	iNeedToProtect: { name: "", relationship: "" },
	myBigDream: { description: "" }
};

interface CharacterStore {
	readonly character: Character;

	setName: (name: string) => void;
	setAge: (age: number) => void;
	setRoleName: (roleName: RoleName | undefined) => void;

	setFace: (face: string) => void;
	setBody: (body: string) => void;
	setClothings: (clothings: string) => void;

	setHasExtraMutation: (hasExtraMutation: boolean) => void;

	setAttribute: (attribute: AttributeName, value: number) => void;
	setPenalty: (attribute: AttributeName, value: number) => void;

	getTotalAttributePoints: () => number;
	getMaxAttributePoints: () => number;
	getRemainingAttributePoints: () => number;

	setSkill: (skillName: string, value: number) => void;
	setSpecialistSkill: (skillName: SpecialistSkillName | undefined, value: number, attribute: AttributeName) => void;

	getTotalSkillPoints: () => number;
	getMaxSkillPoints: () => number;
	getRemainingSkillPoints: () => number;

	setTalent: (talentName: TalentName | undefined) => void;
	setMutation: (mutationName: MutationName | undefined) => void;
	setExtraMutation: (extraMutationName: MutationName | undefined) => void;

	setRelationship: (index: number, relationship: Relationship) => void;
	removeRelationship: (index: number) => void;

	setIHate: (name?: string, relationship?: string) => void;
	setINeedToProtect: (name?: string, relationship?: string) => void;
	setMyBigDream: (description: string) => void;
}

export const useCharacterStore = create<CharacterStore>()(
	// persist(
	devtools(
		(set, get) => ({
			character: EMPTY,

			setName: (name: string) => { set(produce((state: CharacterStore) => { state.character.name = name; })); },
			setAge: (age: number) => { set(produce((state: CharacterStore) => { state.character.age = age; })); },
			setRoleName: (roleName: RoleName | undefined) => { set(produce((state: CharacterStore) => { state.character.roleName = roleName; })); },

			setFace: (face: string) => { set(produce((state: CharacterStore) => { state.character.appearance.face = face; })); },
			setBody: (body: string) => { set(produce((state: CharacterStore) => { state.character.appearance.body = body; })); },
			setClothings: (clothings: string) => { set(produce((state: CharacterStore) => { state.character.appearance.clothings = clothings; })); },

			setHasExtraMutation: (extraMutation: boolean) => { set(produce((state: CharacterStore) => { state.character.hasExtraMutation = extraMutation; })); },

			setAttribute: (attribute: AttributeName, value: number) => {
				const isKeyAttribute = (() => {
					const role = Roles.find(r => r.name === get().character.roleName);
					return role ? role.keyAttribute === attribute : false;
				})();

				if (get().getRemainingAttributePoints() + get().character.attributes[attribute].base >= value) {
					if (value === 5 && isKeyAttribute) { set(produce((state: CharacterStore) => { state.character.attributes[attribute].base = value; })); }
					else if (value > 1 && value < 5) { set(produce((state: CharacterStore) => { state.character.attributes[attribute].base = value; })); }
				}
			},

			setPenalty: (attribute: AttributeName, value: number) => {
				set(produce((state: CharacterStore) => { state.character.attributes[attribute].penalty = value; }));
			},

			getTotalAttributePoints: () => {
				return Object.values(get().character.attributes).reduce((sum, attr) => sum + attr.base, 0);
			},
			getMaxAttributePoints: () => {
				return get().character.hasExtraMutation ? 13 : 14;
			},
			getRemainingAttributePoints: () => {
				return get().getMaxAttributePoints() - get().getTotalAttributePoints();
			},

			setSkill: (name: SkillName, rank: number) => {
				const currentRank = (get().character.skills[name] as Skill | undefined)?.rank ?? 0;

				if (get().getRemainingSkillPoints() + get().character.skills[name].rank >= rank) {
					if (rank === currentRank) { set(produce((state: CharacterStore) => { state.character.skills[name].rank = rank - 1; })); }
					else if (rank < 4) { set(produce((state: CharacterStore) => { state.character.skills[name].rank = rank; })); }
				}
			},
			setSpecialistSkill: (specialistSkillName: SpecialistSkillName, rank: number, attribute: AttributeName) => {
				const specialistSkill = get().character.specialistSkill;

				if (specialistSkill) {
					if (get().getRemainingSkillPoints() + specialistSkill.rank >= rank) {
						if (rank > 0 && rank < 4) {
							set(produce((state: CharacterStore) => {
								state.character.specialistSkill = {
									name: specialistSkillName,
									rank: rank,
									attribute: attribute
								};
							}));
						}
					}
				}
				else {
					set(produce((state: CharacterStore) => {
						state.character.specialistSkill = {
							name: specialistSkillName,
							rank: rank,
							attribute: attribute
						};
					}));
				}
			},

			getTotalSkillPoints: () => {
				return Object.values(get().character.skills).reduce((sum, skill) => sum + skill.rank, 0) + (get().character.specialistSkill?.rank ?? 0);
			},
			getMaxSkillPoints: () => {
				return 10;
			},
			getRemainingSkillPoints: () => {
				return get().getMaxSkillPoints() - get().getTotalSkillPoints();
			},

			setTalent: (talentName: TalentName | undefined) => { set(produce((state: CharacterStore) => { state.character.talentName = talentName; })); },
			setMutation: (mutationName: MutationName | undefined) => { set(produce((state: CharacterStore) => { state.character.mutationName = mutationName; })); },
			setExtraMutation: (extraMutationName: MutationName | undefined) => { set(produce((state: CharacterStore) => { state.character.extraMutationName = extraMutationName; })); },

			setRelationship: (index: number, relationship: Relationship) => { set(produce((state: CharacterStore) => { state.character.relationships[index] = relationship; })); },
			removeRelationship: (index: number) => { set(produce((state: CharacterStore) => { state.character.relationships.splice(index, 1); })); },

			setIHate: (name?: string, relationship?: string) => {
				if (name && relationship) set(produce((state: CharacterStore) => { state.character.iHate = { name, relationship }; }));
				else if (name) set(produce((state: CharacterStore) => { state.character.iHate = { ...state.character.iHate, name }; }));
				else if (relationship) set(produce((state: CharacterStore) => { state.character.iHate = { ...state.character.iHate, relationship }; }));
			},
			setINeedToProtect: (name?: string, relationship?: string) => {
				if (name && relationship) set(produce((state: CharacterStore) => { state.character.iNeedToProtect = { name, relationship }; }));
				else if (name) set(produce((state: CharacterStore) => { state.character.iNeedToProtect = { ...state.character.iNeedToProtect, name }; }));
				else if (relationship) set(produce((state: CharacterStore) => { state.character.iNeedToProtect = { ...state.character.iNeedToProtect, relationship }; }));
			},
			setMyBigDream: (description: string) => { set(produce((state: CharacterStore) => { state.character.myBigDream = { description }; })); }
		})
	)// ,
	// { name: "CharacterStore" }
	// )
);

