type Item = {
	type: "vs";
	skill?: SkillPath;
	ability?: StatsAndAttributesList;
	opposingSkill?: SkillPath;
	opposingAbility?: StatsAndAttributesList;
	opposingModifier?: number;
};

export type RangeAndCoverResolutionItem =
	RequireOnlyOne<Item, "skill" | "ability">
	& RequireOnlyOne<Item, "opposingSkill" | "opposingAbility">;

export interface RangeAndCoverAction {
	name: string;
	group: "Closing" | "Maintaining" | "Withdrawal";
	advantages: {
		modifier: number;
		forks: boolean;
		weaponRange: boolean;
		position: boolean;
		stride: boolean;
		openEnded: boolean;
	},
	effect: string;
	specialRestriction?: string;
	specialAction?: string;
	however?: string;
	resolution: { [key: string]: RangeAndCoverResolutionItem; };
}

export const RangeAndCoverActions: RangeAndCoverAction[] = [
	{
		name: "Close",
		group: "Closing",
		advantages: {
			modifier: 0,
			forks: false,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: false
		},
		effect: "Using Close, the character attempts to dash into position quickly. If successful, the character advances one range category for his weapon.",
		resolution: {
			"Close": { type: "vs", ability: "Speed", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", ability: "Speed", opposingAbility: "Steel" },
			"Maintain": { type: "vs", ability: "Speed", opposingAbility: "Speed" },
			"Hold": { type: "vs", ability: "Speed", opposingAbility: "Perception" },
			"Withdraw": { type: "vs", ability: "Speed", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", ability: "Speed", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Sneak In",
		group: "Closing",
		advantages: {
			modifier: 0,
			forks: true,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: false
		},
		effect: "Using camouflage and stealth, you move unseen toward your opponent's position. If successful, the character advances one range category.",
		resolution: {
			"Close": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Steel" },
			"Maintain": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Speed" },
			"Hold": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Observation" },
			"Withdraw": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Flank",
		group: "Closing",
		advantages: {
			modifier: 0,
			forks: true,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: false
		},
		effect: "Using your knowledge of battle, you outmaneuver your opponent. If successful, the character advances one range category.",
		resolution: {
			"Close": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Steel" },
			"Maintain": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Speed" },
			"Hold": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Observation" },
			"Withdraw": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Charge",
		group: "Closing",
		advantages: {
			modifier: 0,
			forks: false,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: true
		},
		effect: "A player may choose to press on using his character's Steel rather than Speed, Stealth or Tactics. He pricks up his nerve, dashes from cover and charges screaming at his opponent. This is a difficult and dangerous maneuver. If he wins the versus test, then he closes one range.",
		however: "Your opponents may always shoot —even if they lose the positioning test. If your Charge is successful, your opponent gets one free shot before you close in. If the Charge is tied, everyone on both teams gets to shoot. Very ugly. If the Charge is failed, your opponent gets two free shots plus whatever successes he spends on shooting.",
		resolution: {
			"Close": { type: "vs", ability: "Steel", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", ability: "Steel", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", ability: "Steel", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", ability: "Steel", opposingAbility: "Steel" },
			"Maintain": { type: "vs", ability: "Steel", opposingAbility: "Speed" },
			"Hold": { type: "vs", ability: "Steel", opposingAbility: "Perception" },
			"Withdraw": { type: "vs", ability: "Steel", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", ability: "Steel", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", ability: "Steel", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", ability: "Steel", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Maintain",
		group: "Maintaining",
		advantages: {
			modifier: 0,
			forks: false,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: false
		},
		effect: "Using his footwork and reflexes, the character attempts to get the better of his opponent. If your opponent moves forward, you move back. If he moves back, you move forward. If the character is successful, he's held his opponent at the current range.",
		resolution: {
			"Close": { type: "vs", ability: "Speed", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", ability: "Speed", opposingAbility: "Steel" },
			"Maintain": { type: "vs", ability: "Speed", opposingAbility: "Speed" },
			"Hold": { type: "vs", ability: "Speed", opposingAbility: "Perception" },
			"Withdraw": { type: "vs", ability: "Speed", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", ability: "Speed", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Hold",
		group: "Maintaining",
		advantages: {
			modifier: 0,
			forks: false,
			weaponRange: true,
			position: true,
			stride: false,
			openEnded: false
		},
		effect: "When using the Hold action, the team does not move. Feet planted, they hold their ground and let fly for all they're worth.",
		specialAction: "There are three special effects for the Hold action. First, your opponent always moves in with a close-type maneuver or away with a withdraw-type. Second, you always shoot, even if you lose the maneuver test. If you win the maneuver test, you get a free shot in addition to your other actions. Finally, advantage dice from a position are carried over from Hold into your next maneuver.",
		resolution: {
			"Close": { type: "vs", ability: "Perception", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", skill: "Any General➞Observation", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", skill: "Any General➞Observation", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", ability: "Perception", opposingAbility: "Steel" },
			"Maintain": { type: "vs", ability: "Perception", opposingAbility: "Speed" },
			"Hold": { type: "vs", ability: "Perception", opposingAbility: "Perception" },
			"Withdraw": { type: "vs", ability: "Perception", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", skill: "Any General➞Observation", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", skill: "Any General➞Observation", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", ability: "Perception", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Withdraw",
		group: "Withdrawal",
		advantages: {
			modifier: 2,
			forks: false,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: false
		},
		effect: "Using Speed to Withdraw you beat a hasty retreat. If successful, you withdraw one range category. Position dice are not carried to the next volley. You abandon your position. You may allocate margin of success to finding a new position in this maneuver if appropriate.",
		specialRestriction: "While this maneuver grants a +2D advant age, any actions taken while using Withdraw cost two successes. Taking a shot, shrugging off a wound or bolting a door closed requires that you win by at least two.",
		specialAction: "For two successes from a successful Withdraw action, you can remain at your current range but then consult your range chart to find your opponent's adjusted range. You rerange your weapons!",
		resolution: {
			"Close": { type: "vs", ability: "Speed", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", ability: "Speed", opposingAbility: "Steel" },
			"Maintain": { type: "vs", ability: "Speed", opposingAbility: "Speed" },
			"Hold": { type: "vs", ability: "Speed", opposingAbility: "Perception" },
			"Withdraw": { type: "vs", ability: "Speed", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", ability: "Speed", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", ability: "Speed", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Sneak Out",
		group: "Withdrawal",
		advantages: {
			modifier: 0,
			forks: true,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: false
		},
		effect: "Using guile and subterfuge, you move unseen away from your opponent's position. If successful, the character withdraws one range category. Position dice are not carried to the next volley. You abandon your position. You may allocate margin of success to finding a new position in this maneuver if appropriate.",
		resolution: {
			"Close": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Steel" },
			"Maintain": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Speed" },
			"Hold": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Observation" },
			"Withdraw": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", skill: "Any General➞Stealthy", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", skill: "Any General➞Stealthy", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Fall Back",
		group: "Withdrawal",
		advantages: {
			modifier: 0,
			forks: true,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: false
		},
		effect: "Using sound tactics, you abandon your position to take up another, better rearward one. If successful, the character withdraws one range category. Position dice are not carried to the next volley. You abandon your position. You may allocate margin of success to finding a new position in this maneuver if appropriate.",
		specialAction: "For two successes from a successful Fall Back action, you can set your range to your current range but then consult your range chart to find your opponent's range. You rerang e your weapons!",
		resolution: {
			"Close": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Steel" },
			"Maintain": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Speed" },
			"Hold": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Observation" },
			"Withdraw": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", skill: "Any General➞Tactics", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", skill: "Any General➞Tactics", opposingAbility: "Steel", opposingModifier: 1 }
		}
	},
	{
		name: "Retreat",
		group: "Withdrawal",
		advantages: {
			modifier: 1,
			forks: false,
			weaponRange: true,
			position: true,
			stride: true,
			openEnded: true
		},
		effect: "Sometimes you've had quite enough. Screw this position, it's time to beat a retreat. This takes nerves! A player may choose to make tracks using his character's Steel rather than Speed, Stealth or Tactics. He pricks up his nerve, dashes from cover and makes a hasty advance to the rear. If successful, the character withdraws one range category. Position dice are not carried to the next volley. You abandon your position. You may allocate margin of success to finding a new position in this maneuver if appropriate.",
		however: "Your opponents may always, shoot —even if they lose the positioning test. If the Retreat is successful, your opponent gets one free shot before you move out. If the Retreat is tied, your opponent gets two free shots. If the Retreat is failed, your opponents gets two free shots plus whatever he spends on his margin of success. Lastly, if you fail a Retreat, you hesitate in the next volley.",
		resolution: {
			"Close": { type: "vs", ability: "Steel", opposingAbility: "Speed" },
			"Sneak In": { type: "vs", ability: "Steel", opposingSkill: "Any General➞Stealthy" },
			"Flank": { type: "vs", ability: "Steel", opposingSkill: "Any General➞Tactics" },
			"Charge": { type: "vs", ability: "Steel", opposingAbility: "Steel" },
			"Maintain": { type: "vs", ability: "Steel", opposingAbility: "Speed" },
			"Hold": { type: "vs", ability: "Steel", opposingAbility: "Perception" },
			"Withdraw": { type: "vs", ability: "Steel", opposingAbility: "Speed", opposingModifier: 2 },
			"Sneak Out": { type: "vs", ability: "Steel", opposingSkill: "Any General➞Stealthy" },
			"Fall Back": { type: "vs", ability: "Steel", opposingSkill: "Any General➞Tactics" },
			"Retreat": { type: "vs", ability: "Steel", opposingAbility: "Steel", opposingModifier: 1 }
		}
	}
];
