type Item = {
	obstacle?: number;
	obstacleStat?: StatsList;
};

export type DuelofWitsResolutionItem =
	({ type: "Vs" | "Std"; } & NoneOf<Item>)
	| ({ type: "Ob"; } & RequireOnlyOne<Item, "obstacle" | "obstacleStat">);

export interface DuelOfWitsAction {
	name: string;
	tests?: (SkillPath | StatsList)[];
	speakingThePart?: string;
	special?: string;
	effects?: string;
	resolution: {
		[key: string]: DuelofWitsResolutionItem;
	};
}

export const DuelOfWitsActions: DuelOfWitsAction[] = [
	{
		name: "Avoid the Topic",
		tests: [
			"Will"
		],
		speakingThePart: "The speaking player must veer off topic, even to the point of sounding desperate or ridiculous.",
		effects: "Avoid successes are subtracted from your opponent's Point, Obfuscate or Incite successes. This reduces the effectiveness of an opposed action. If Obfuscate or Incite successes aren't reduced to zero, then the incoming action wins and takes effect. Avoid never suffers a double obstacle penalty for stat versus skill. It's special.",
		resolution: {
			"Incite": { type: "Vs" },
			"Obfuscate": { type: "Vs" },
			"Point": { type: "Vs" }
		}
	},
	{
		name: "Dismiss",
		tests: [
			"Dwarf Art➞Coarse Persuasion",
			"Any General➞Command",
			"Any General➞Intimidation",
			"Any General➞Oratory",
			"Any General➞Religious Diatribe",
			"Any General➞Rhetoric",
			"Dwarf Art➞Stentorious Debate",
			"Any General➞Ugly Truth"
		],
		speakingThePart: "This maneuver is used for the cataclysmic and undeniable conclusion of an argument. Loudly declare that your opponent knows nothing about the topic at hand and, furthermore, he's a fool and a dullard and shouldn't be listened to any further!",
		special: "If a character fails to win the duel via his Dismiss action, he must hesitate for his next volley. Either cross off the next action, or skip the first volley of the coming exchange.",
		effects: "Scripting a Dismiss adds +2D to the character's skill. In a standard test, subtract each success rolled from your opponent's body of argument. Against Rebuttal, subtract your margin of success over your opponent's defense from the body of argument. If you win against Obfuscate, all Dismiss successes are subtracted from the body of argument —not just your margin of success.",
		resolution: {
			"Avoid the Topic": { type: "Std" },
			"Dismiss": { type: "Std" },
			"Feint": { type: "Std" },
			"Incite": { type: "Std" },
			"Obfuscate": { type: "Vs" },
			"Point": { type: "Std" },
			"Rebuttal": { type: "Vs" }
		}
	},
	{
		name: "Feint",
		tests: [
			"Any General➞Extortion",
			"Any General➞Falsehood",
			"Any General➞Interrogation",
			"Any General➞Persuasion",
			"Orc Special➞Poisonous Platitudes",
			"Any General➞Religious Diatribe",
			"Any General➞Rhetoric",
			"Any General➞Soothing Platitudes",
			"Any General➞Seduction"
		],
		speakingThePart: "Using a Feint, the speaker leads his opponent on into a trap. He lures him to think he is discussing one point, until the hidden barb is revealed.",
		effects: "Feint can be used to bypass Rebuttal and to attack Feint, Incite and Obfuscate. In a standard test, each success subtracts from your opponent's body of argument. In a versus test, margin of success is subtracted from your opponent's body of argument.",
		resolution: {
			"Feint": { type: "Vs" },
			"Incite": { type: "Vs" },
			"Obfuscate": { type: "Vs" },
			"Rebuttal": { type: "Std" }
		}
	},
	{
		name: "Incite",
		tests: [
			"Dwarf Art➞Coarse Persuasion",
			"Any General➞Command",
			"Any General➞Extortion",
			"Any General➞Falsehood",
			"Any General➞Intimidation",
			"Any General➞Seduction",
			"Any General➞Ugly Truth"
		],
		speakingThePart: "With an acid tongue and biting wit, a character may attempt to distract or dismay his opponent. The speaking player must pronounce an outright insult to his opponent.",
		effects: "In a standard test, the obstacle is equal to the victim's Will exponent. If the In citing player passes the standard test or wins the versus test, the victim must make a Steel test. If the victim hesit ates, he misses his next action. However, if the Incite fails, the margin of failure is added as advantage dice to the opponent's next test.",
		resolution: {
			"Avoid the Topic": { type: "Vs" },
			"Dismiss": { type: "Std" },
			"Feint": { type: "Vs" },
			"Incite": { type: "Std" },
			"Obfuscate": { type: "Vs" },
			"Point": { type: "Std" },
			"Rebuttal": { type: "Std" }
		}
	},
	{
		name: "Obfuscate",
		tests: [
			"Any General➞Falsehood",
			"Any General➞Oratory",
			"Orc Special➞Poisonous Platitudes",
			"Any General➞Rhetoric",
			"Any General➞Religious Diatribe",
			"Any General➞Soothing Platitudes",
			"Dwarf Art➞Stentorious Debate",
			"Any General➞Suasion",
			"Any General➞Ugly Truth"
		],
		speakingThePart: "Obfuscate is a verbal block . The player attempting to Obfuscate must present some non sequitur or bizarre, unrelated point in an attempt to confuse or distract his opponent. Obfuscate is spoken while your opponent is speaking.",
		effects: "Obfuscate is tested versus everything, even itself. If the Obfuscator wins, the victim of this tactic loses his current action. If the Obfuscator exceeds his obstacle, his opponent also suffers a +1 Ob to his next action. If the Obfuscator loses the versus test, his opponent's current action goes off and his successes are applied as per his action description. Furthermore, he gain +1D to his next action.",
		resolution: {
			"Avoid the Topic": { type: "Vs" },
			"Dismiss": { type: "Vs" },
			"Feint": { type: "Vs" },
			"Incite": { type: "Vs" },
			"Obfuscate": { type: "Vs" },
			"Point": { type: "Vs" },
			"Rebuttal": { type: "Vs" }
		}
	},
	{
		name: "Point",
		tests: [
			"Dwarf Art➞Coarse Persuasion",
			"Any General➞Interrogation",
			"Any General➞Oratory",
			"Any General➞Persuasion",
			"Orc Special➞Poisonous Platitudes",
			"Any General➞Rhetoric",
			"Dwarf Art➞Stentorious Debate"
		],
		speakingThePart: "The Point action is the main attack of the verbal duelist. Hammer away using your statement of purpose and related points!",
		effects: "In a standard test, subtract your Point successes from your opponent's body of argument. In a versus test, subtract the margin of success from your opponent's body of argument. This is the way to win debates!",
		resolution: {
			"Avoid the Topic": { type: "Vs" },
			"Dismiss": { type: "Std" },
			"Feint": { type: "Std" },
			"Incite": { type: "Std" },
			"Obfuscate": { type: "Vs" },
			"Point": { type: "Std" },
			"Rebuttal": { type: "Vs" }
		}
	},
	{
		name: "Rebuttal",
		tests: [
			"Any General➞Extortion",
			"Any General➞Interrogation",
			"Any General➞Oratory",
			"Any General➞Persuasion",
			"Orc Special➞Poisonous Platitudes",
			"Any General➞Rhetoric",
			"Dwarf Art➞Stentorious Debate",
			"Any General➞Suasion"
		],
		speakingThePart: "The player first lets his opponent make his attack. He then refutes the arguments made while making a fresh point himself.",
		special: "When making a Rebuttal, you must divide your dice between attack and defense. This division happens before his opponent roll s. You must put at least one die in each pool. Any penalties to the action are applied to both pools. Any bonuses to the action are only applied to either attack or defense. If you only have one die, you can choose whether you attack or defend.",
		effects: "Successes from the defense roll are subtracted from the opponent's successes. To fully defend against an Obfuscate action, you must get more defense successes than your opponent's Obfuscate successes. Each success on the attacking portion of a Rebuttal reduces your opponent's body of argument.",
		resolution: {
			"Dismiss": { type: "Vs" },
			"Obfuscate": { type: "Vs" },
			"Point": { type: "Vs" }
		}
	},
	{
		name: "Pray/Cast/etc",
		resolution: {
			"Dismiss": { type: "Ob", obstacle: 1 },
			"Feint": { type: "Ob", obstacle: 1 },
			"Incite": { type: "Ob", obstacleStat: "Will" },
			"Obfuscate": { type: "Ob", obstacle: 1 },
			"Point": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Hesitate",
		resolution: {
			"Dismiss": { type: "Ob", obstacle: 1 },
			"Feint": { type: "Ob", obstacle: 1 },
			"Incite": { type: "Ob", obstacleStat: "Will" },
			"Obfuscate": { type: "Ob", obstacle: 1 },
			"Point": { type: "Ob", obstacle: 1 }
		}
	}
];
