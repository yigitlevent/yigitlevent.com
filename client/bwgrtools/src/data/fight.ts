export interface FightAction {
	name: string;
	group: "No Action" | "Attack" | "Defense" | "Basic" | "Special" | "Shooting & Throwing" | "Magic" | "Social" | "Hesitation";
	actionCost: number | "variable";
	tests?: (SkillPath | StatsList)[];
	testExtra?: string;
	restrictions?: string;
	effect?: string;
	special?: string;
	countsAsNoAction?: boolean;
	resolution?: { [key: string]: ResolutionItem; };
}

export const FightActions: FightAction[] = [
	{
		name: "No Action",
		group: "No Action",
		effect: "If your Reflexes allows you to play an action, but your opponent doesn't have anything scripted because he's slower than you, consult the following table for your obstacle.",
		actionCost: 1
	},
	{
		name: "Strike",
		group: "Attack",
		tests: [
			"Any General➞Axe",
			"Any General➞Boxing",
			"Any General➞Brawling",
			"Any General➞Cudgel",
			"Any General➞Hammer",
			"Any General➞Knives",
			"Any General➞Lance",
			"Any General➞Mace",
			"Any General➞Martial Arts",
			"Any General➞Spear",
			"Any General➞Staff",
			"Any General➞Sword"
		],
		effect: "Successes over the obstacle or margin of success in versus tests are used to increase damage and target a specific location. See the Weapons chapter for in structions on doing damage. You can only Strike consecutively a number of times equal to your weapon speed. If you're alternating between different weapons, use the lower weapon speed.",
		actionCost: 1,
		resolution: {
			"No Action": { type: "Ob", obstacle: 1 },
			"Great Strike": { type: "Ob", obstacle: 1 },
			"Strike": { type: "Ob", obstacle: 1 },
			"Avoid": { type: "Vs", opposingAbility: "Speed" },
			"Block": { type: "Vs" },
			"Counterstrike": { type: "Vs" },
			"Beat": { type: "Ob", obstacle: 1 },
			"Disarm": { type: "Ob", obstacle: 1 },
			"Feint": { type: "Ob", obstacle: 1 },
			"Charge/Tackle": { type: "Ob", obstacle: 1 },
			"Lock": { type: "Ob", obstacle: 1 },
			"Push": { type: "Ob", obstacle: 1 },
			"Throw Person": { type: "Ob", obstacle: 1 },
			"Throw Object/Weapon": { type: "Ob", obstacle: 1 },
			"Fall Prone (and beg for mercy)": { type: "Ob", obstacle: 1 },
			"Run Screaming": { type: "½", opposingAbility: "Speed" },
			"Stand and Drool": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Great Strike",
		group: "Attack",
		tests: [
			"Any General➞Axe",
			"Any General➞Boxing",
			"Any General➞Brawling",
			"Any General➞Cudgel",
			"Any General➞Hammer",
			"Any General➞Knives",
			"Any General➞Lance",
			"Any General➞Mace",
			"Any General➞Martial Arts",
			"Any General➞Spear",
			"Any General➞Staff",
			"Any General➞Sword"
		],
		restrictions: "On the first action, you take a breath to set up your attack. You are effectively defenseless on this action; you count as performing a Physical Action. Also, while any weapon can perform a Great Strike, you must be able to put two hands on the weapon to do so. A Great Strike counts as one action against your weapon speed limitation.",
		effect: "A Great Strike, is a lunging thrust, an overhand strike or a half-sword technique. On the second action, Great Strike acts like a Strike but with two exceptions: It bypasses the Block action (but not shields) and it grants a bonus to damage or armor penetration. Choose before you roll: +1 to your Incidental, Mark and Superb damage results or +1 to your weapon's versus armor rating.",
		actionCost: 2,
		resolution: {
			"No Action": { type: "Ob", obstacle: 1 },
			"Great Strike": { type: "Ob", obstacle: 1 },
			"Strike": { type: "Ob", obstacle: 1 },
			"Avoid": { type: "Vs", opposingAbility: "Speed" },
			"Block": { type: "Ob", obstacle: 1 },
			"Counterstrike": { type: "Vs" },
			"Beat": { type: "Ob", obstacle: 1 },
			"Disarm": { type: "Ob", obstacle: 1 },
			"Feint": { type: "Ob", obstacle: 1 },
			"Charge/Tackle": { type: "Ob", obstacle: 1 },
			"Lock": { type: "Ob", obstacle: 1 },
			"Push": { type: "Ob", obstacle: 1 },
			"Throw Person": { type: "Ob", obstacle: 1 },
			"Throw Object/Weapon": { type: "Ob", obstacle: 1 },
			"Fall Prone (and beg for mercy)": { type: "Ob", obstacle: 1 },
			"Run Screaming": { type: "½", opposingAbility: "Speed" },
			"Stand and Drool": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Block & Strike",
		group: "Attack",
		tests: [
			"Any General➞Axe",
			"Any General➞Boxing",
			"Any General➞Brawling",
			"Any General➞Cudgel",
			"Any General➞Hammer",
			"Any General➞Knives",
			"Any General➞Lance",
			"Any General➞Mace",
			"Any General➞Martial Arts",
			"Any General➞Spear",
			"Any General➞Staff",
			"Any General➞Sword"
		],
		testExtra: "Divide your dice into two pools before rolling-one for defense, one for attack.",
		restrictions: "Block and Strike is a special action reserved for characters with Shield Training who are fighting with a shield or parrying blade, or with Two-Fisted Fighting Training and two weapons.",
		effect: "Add any shield dice to the defense portion, less the versus armor rating of your opponent's weapon. Successes from the Block portion reduce the successes of your opponent's action. The Strike dice act like a Strike action. Apply penalties from wounds, light, weather and knock down to both parts of the actions. Any advantages are only applied to one side. You don't have to allocate any skill dice to defense, you can rely solely on your shield to protect you. Disadvantage from weapon length or vying for position only applies to the Strike portion.",
		special: "Block and Strike counts as Block and a Strike for the purposes of interactions. Test your divided pool against the possible interactions for both of those actions. Against Counterstrike, both characters defend and both attack according to their action.",
		actionCost: 1
	},
	{
		name: "Lock & Strike",
		group: "Attack",
		tests: [
			"Any Monstrous➞Savage Attack",
			"Great Wolf Special➞Savage Attack"
		],
		restrictions: "This action requires a special trait like Crushing Jaws",
		effect: "Successes over the obstacle count as damage as per the standard IMS damage rules and as a Lock as per the Lock action.",
		actionCost: 1,
		resolution: {
			"Great Strike": { type: "Ob", obstacle: 1 },
			"Strike": { type: "Ob", obstacle: 1 },
			"Avoid": { type: "Vs", opposingAbility: "Speed" },
			"Block": { type: "Vs" },
			"Counterstrike": { type: "Vs" },
			"Beat": { type: "Ob", obstacle: 1 },
			"Disarm": { type: "Ob", obstacle: 1 },
			"Feint": { type: "Ob", obstacle: 1 },
			"Charge/Tackle": { type: "Ob", obstacle: 1 },
			"Lock": { type: "Ob", obstacle: 1 },
			"Push": { type: "Ob", obstacle: 1 },
			"Throw Person": { type: "Ob", obstacle: 1 },
			"Throw Object/Weapon": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Avoid",
		group: "Defense",
		tests: [
			"Speed"
		],
		effect: "Successes from the Avoid action reduce the effectiveness of the opposing action. If you roll one success on an Avoid, and your opponent rolls two, you've reduced his effective total to one. If you roll two and he rolls two, you have stopped his action altogether.",
		special: "Avoid defends against all incoming attack, basic and special actions. Test once; let Avoid successes ride for the action. Avoid is special: it never suffers a double-obstacle penalty for being unskilled. It does not protect against Shooting, Throwing or Magical Actions.",
		actionCost: 1,
		resolution: {
			"Great Strike": { type: "Vs" },
			"Strike": { type: "Vs" },
			"Beat": { type: "Vs" },
			"Disarm": { type: "+Vs", againstSkill: true },
			"Charge/Tackle": { type: "Vs", opposingAbility: "Power" },
			"Lock": { type: "Vs", opposingAbility: "Power" },
			"Push": { type: "Vs", opposingAbility: "Power" },
			"Throw Person": { type: "Vs" },
			"Throw Object/Weapon": { type: "Vs" }
		}
	},
	{
		name: "Block",
		group: "Defense",
		tests: [
			"Any General➞Axe",
			"Any General➞Boxing",
			"Any General➞Brawling",
			"Any General➞Cudgel",
			"Any General➞Hammer",
			"Any General➞Knives",
			"Any General➞Lance",
			"Any General➞Mace",
			"Any General➞Martial Arts",
			"Any General➞Spear",
			"Any General➞Staff",
			"Any General➞Sword"
		],
		testExtra: "Add shield or off-hand weapon dice.",
		effect: "Block deflects and redirects the incoming attack. Like Avoid, your successes reduce the effectiveness of the opposed action. Each Block success reduces your opponent's total. If you roll successes equal to your opponent, you've stopped his action completely. Spend your margin of success as follows:<br>• One extra success: +1D to your next action or, to vying for position if Block is your last action of the exchange).<br>• Two extra successes: +1 Ob to the blocked character's next action.<br>• Three extra successes: Blocked character loses his next action. He hesitates, but may only Stand and Drool as a result.",
		special: "These effects can only be generated through the use of the Block action, Counterstrike, Change Stance, and the Block & Strike actions do not gain these extra effects.",
		actionCost: 1,
		resolution: {
			"Strike": { type: "Vs" },
			"Beat": { type: "Vs" },
			"Disarm": { type: "+Vs", againstSkill: true },
			"Lock": { type: "Vs", opposingAbility: "Power" },
			"Push": { type: "Vs", opposingAbility: "Power" }
		}
	},
	{
		name: "Counterstrike",
		group: "Defense",
		tests: [
			"Any General➞Axe",
			"Any General➞Boxing",
			"Any General➞Brawling",
			"Any General➞Cudgel",
			"Any General➞Hammer",
			"Any General➞Knives",
			"Any General➞Lance",
			"Any General➞Mace",
			"Any General➞Martial Arts",
			"Any General➞Spear",
			"Any General➞Staff",
			"Any General➞Sword"
		],
		testExtra: "After actions are revealed, but before your opponent rolls, divide your fighting skill and any advantages into two pools-one for defense and one for attack.",
		effect: "In versus tests, use the defensive portion to oppose your opponent's action. Successes from your defense reduce his successes. The attack portion counts as a Strike action. However, the Strike portion of Counterstrike doesn't suffer disadvantages from weapon length or vying for position.",
		actionCost: 1,
		resolution: {
			"Great Strike": { type: "Vs" },
			"Strike": { type: "Vs" },
			"Beat": { type: "Vs" },
			"Disarm": { type: "+Vs", againstSkill: true },
			"Lock": { type: "Vs", opposingAbility: "Power" },
			"Push": { type: "Vs", opposingAbility: "Power" }
		}
	},
	{
		name: "Assess",
		group: "Basic",
		tests: [
			"Perception"
		],
		effect: "Assessing allows a player to look for specific details —easy exits, the sources of that burning smell and unarmored locations on his opponent.",
		special: "This is a quick, over the shoulder glance. Additional actions may be spent on an assess in order to gain advantage dice to the Perception test; +1D for a second action and +2D for a third.",
		actionCost: 1,
		resolution: {
			"Great Strike": { type: "Ob", obstacle: 1 },
			"Strike": { type: "Ob", obstacle: 1 },
			"Beat": { type: "½", againstSkill: true },
			"Disarm": { type: "Skill" },
			"Charge/Tackle": { type: "½", opposingAbility: "Speed" },
			"Lock": { type: "½", opposingAbility: "Power" },
			"Push": { type: "½", opposingAbility: "Power" },
			"Throw Person": { type: "½", opposingAbility: "Speed" },
			"Throw Object/Weapon": { type: "½", opposingAbility: "Speed" }
		}
	},
	{
		name: "Change Stance",
		group: "Basic",
		testExtra: "It does not require a test to change stances. There are three fighting stances: neutral, defensive and aggressive. Decide which stance you're changing to when you select this action.",
		restrictions: "You keep your stance until you change stance, disengage, are incapacitated, hesitate or use the Charge/Tackle action. Any of these conditions automatically drops the character back to neutral stance. You may be Locked (but not incapacitated), on top of your opponent, on your back, riding a horse or unskilled and still take a stance.",
		effect: "• Neutral Stance: Neutral stance is the default. You start a fight in neutral stance unless otherwise noted. It grants no advantage and suffers no disadvantages. The Change Stance: Neutral action counts as a Feint.<br>• Defensive stance: Defensive stance grants +2D to Avoid, Block and Counterstrike. Strike and Great Strike suffer a +2 Ob penalty when performed from defensive stance. The Change Stance: Defensive action counts as a Block.<br>• Aggressive stance: Aggressive stance grants +2D to Strike and Great Strike. Block and Counterstrike suffer +2 Ob penalty. You may not Avoid. If you accidently script Avoid while in aggressive stance, you hesitate for an action. The Change Stance: Aggressive action counts as the first action of Intimidate (found in the Social Actions section). If you wish to complete the action, script one more action of Intimidate. See Social Actions for rules on Intimidate.",
		special: "Instead of using the stance dice as a bonus to actions in the script, a player may use his +2D bonus to aid in vying for position. Obviously, this must be declared at the top of the exchange. Stance dice used to position cannot then be used as a bonus to actions, but all other action/stance penalties apply.",
		actionCost: 1
	},
	{
		name: "Charge/Tackle",
		group: "Basic",
		tests: [
			"Power"
		],
		testExtra: "+1D advantage plus stride advantage.",
		restrictions: "Charge/Tackle must be your first action in the volley. Your stance reverts to neutral stance if you Charge/Tackle. If you fail trus action, you give your opponent the advantage and you Stand and Drool for your next action.",
		effect: "When performing this action, choose whether you're charging your opponent or tackling him. If you charge, you attempt to knock him down but you remain on your feet yourself. If you tackle, you take your opponent down with you. If you win the versus test by one or meet your obstacle in a standard test, you stagger your opponent. He's at +1 Ob to his next test, whatever it may be. If you win the versus test by two or exceed your obstacle in the standard test, you knock your opponent down. He is off his feet and suffers the appropriate penalties until he rights himself.<br>• Charge: If you successfully charge, you also take the advantage for your hands or for whatever weapon you're holding except spears and missiles-your choice.<br>• Tackle: If you tackle your opponent, you take the advantage at the Hands fighting distance. If you successfully tackle your opponent, he may not use the Shooting and Throwing or Magic actions. There is one exception: He may discharge a pistol at this range.",
		special: "When you use this action you change weapons to your hands, unless you're charging specifically with a shield, which uses the short weapon length.",
		actionCost: 1,
		resolution: {
			"No Action": { type: "½", opposingAbility: "Forte" },
			"Great Strike": { type: "½", opposingAbility: "Forte" },
			"Strike": { type: "½", opposingAbility: "Forte" },
			"Avoid": { type: "Vs", opposingAbility: "Speed" },
			"Block": { type: "½", opposingAbility: "Speed" },
			"Counterstrike": { type: "½", opposingAbility: "Speed" },
			"Beat": { type: "½", opposingAbility: "Speed" },
			"Disarm": { type: "½", opposingAbility: "Forte" },
			"Feint": { type: "½", opposingAbility: "Forte" },
			"Charge/Tackle": { type: "Vs", opposingAbility: "Power" },
			"Lock": { type: "½", opposingAbility: "Forte" },
			"Push": { type: "Vs", opposingAbility: "Power" },
			"Throw Person": { type: "Vs" },
			"Throw Object/Weapon": { type: "Vs" },
			"Fall Prone (and beg for mercy)": { type: "Ob", obstacle: 1 },
			"Run Screaming": { type: "Vs", opposingAbility: "Speed" },
			"Stand and Drool": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Draw Weapon",
		group: "Basic",
		effect: "Two actions are required to unsheathe/unsling a handheld weapon. This includes sheathed swords, throwing knives, slung crossbows, etc. Readying a weapon before a fight —on a strap or in an off hand— decreases draw time to one action. Counts as Physical Action for action interaction.",
		actionCost: 2
	},
	{
		name: "Physical Action",
		group: "Basic",
		tests: [
			"Power",
			"Agility",
			"Speed"
		],
		effect: "Physical actions typically use Power (to rip something open), Agility (to grab something) or Speed (to vault something). This category of actions covers everything from overturning tables to opening doors and climbing through windows.",
		actionCost: 2,
		resolution: {
			"Great Strike": { type: "Ob", obstacle: 1 },
			"Strike": { type: "Ob", obstacle: 1 },
			"Beat": { type: "½", againstSkill: true },
			"Disarm": { type: "Skill" },
			"Charge/Tackle": { type: "½", opposingAbility: "Speed" },
			"Lock": { type: "½", opposingAbility: "Power" },
			"Push": { type: "½", opposingAbility: "Speed" },
			"Throw Person": { type: "½", opposingAbility: "Speed" },
			"Throw Object/Weapon": { type: "½", opposingAbility: "Speed" }
		}
	},
	{
		name: "Push",
		group: "Basic",
		tests: [
			"Power"
		],
		testExtra: "Push uses the Hands weapon length.",
		effect: "If you win the versus test by one or meet your obstacle in a standard test, you stagger your opponent: He's at+1 Ob to his next test, whatever it may be. If you win the versus test by two or exceed your obstacle in a standard test, you stagger your opponent and take the advantage so long as your weapon length is long or shorter. If you win the versus test by three or exceed your obstacle by two a standard test, you knock your opponent down. He is off his feet and suffers the appropriate penalties until he rights himself.",
		special: "When you use this action you change weapons to your hands, unless you're using a shield which uses the short weapon length.",
		actionCost: 1,
		resolution: {
			"No Action": { type: "½", opposingAbility: "Speed" },
			"Great Strike": { type: "½", opposingAbility: "Speed" },
			"Strike": { type: "½", opposingAbility: "Speed" },
			"Avoid": { type: "Vs", opposingAbility: "Speed" },
			"Block": { type: "Vs" },
			"Counterstrike": { type: "Vs" },
			"Beat": { type: "½", opposingAbility: "Speed" },
			"Disarm": { type: "½", opposingAbility: "Power" },
			"Feint": { type: "½", opposingAbility: "Speed" },
			"Charge/Tackle": { type: "Vs", opposingAbility: "Power" },
			"Lock": { type: "½", opposingAbility: "Speed" },
			"Push": { type: "Vs", opposingAbility: "Power" },
			"Throw Person": { type: "Vs" },
			"Throw Object/Weapon": { type: "Vs" },
			"Fall Prone (and beg for mercy)": { type: "Ob", obstacle: 1 },
			"Run Screaming": { type: "Vs", opposingAbility: "Speed" },
			"Stand and Drool": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Lock",
		group: "Basic",
		tests: [
			"Power"
		],
		testExtra: "Lock uses the Hands weapon length.",
		restrictions: "You must have at least one hand free to perform this action. If you do not, you drop one item that you're holding as you go for the grab. You cannot vie for position, engage or disengage until you've broken or let go of any locks.",
		effect: "If you win the versus test by one or meet your obstacle in a standard test, you grab your opponent: His Agility, Speed, Power and Forte and his fighting, shooting and magical skills are all reduced by one die. Each additional success reduces your opponent's abilities by another point. (Reflexes is not reduced.)<br>• Pulled In: If you manage to grab your opponent with a Lock, you pull him in. You have the advantage at the Hands fighting distance.<br>• In Your Face: If you successfully Lock your opponent, he may not use the Shooting and Throwing or Magic Actions with one exception: He may shoot if he's using a pistol.<br>• Increase the Pressure: You can script multiple Lock actions and increase the value of your Lock on your opponent. You maintain your grip so long as your opponent fails to escape, you don't hesitate or voluntarily let go. Each additional successful Lock test further reduces your opponent's abilities by your margin of success.<br>• Incapacitation: If you reduce your opponent's Agility, Speed, Power or Forte to zero dice, he is incapacitated. He may not resist or act in any fashion until you release him. Skills cannot be used at all.<br>• Escaping Locks: If you're in a Lock and wish to escape, use the Avoid action but replace Speed with Agility, Power or Forte (your choice). If scripted against a Dash interaction, test Avoid against Ob 0, otherwise use the results of the versus test. Margin of success for the action reduces any standing Lock penalty. The dice are regained and may be used on the next action.",
		special: "When you use this action you change weapons to your hands.",
		actionCost: 1,
		resolution: {
			"No Action": { type: "½", opposingAbility: "Power" },
			"Great Strike": { type: "½", opposingAbility: "Power" },
			"Strike": { type: "½", opposingAbility: "Power" },
			"Avoid": { type: "Vs", opposingAbility: "Speed" },
			"Block": { type: "Vs" },
			"Counterstrike": { type: "Vs" },
			"Beat": { type: "½", opposingAbility: "Power" },
			"Disarm": { type: "Vs" },
			"Feint": { type: "½", opposingAbility: "Power" },
			"Charge/Tackle": { type: "½", opposingAbility: "Power" },
			"Lock": { type: "Vs", opposingAbility: "Power" },
			"Push": { type: "½", opposingAbility: "Power" },
			"Throw Person": { type: "½", opposingAbility: "Power" },
			"Throw Object/Weapon": { type: "½", opposingAbility: "Power" },
			"Fall Prone (and beg for mercy)": { type: "Ob", obstacle: 1 },
			"Run Screaming": { type: "Vs", opposingAbility: "Agility" },
			"Stand and Drool": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Get Up",
		group: "Basic",
		effect: "Characters are always getting knocked down. It requires two actions to get up from being laid flat. See the Knocked Down rules.",
		actionCost: 2,
		resolution: {
			"Great Strike": { type: "Ob", obstacle: 1 },
			"Strike": { type: "Ob", obstacle: 1 },
			"Beat": { type: "½", againstSkill: true },
			"Disarm": { type: "Skill" },
			"Charge/Tackle": { type: "½", opposingAbility: "Forte" },
			"Lock": { type: "½", opposingAbility: "Power" },
			"Push": { type: "½", opposingAbility: "Speed" },
			"Throw Person": { type: "½", opposingAbility: "Speed" },
			"Throw Object/Weapon": { type: "½", opposingAbility: "Speed" }
		}
	},
	{
		name: "Beat",
		group: "Special",
		tests: [
			"Any General➞Axe",
			"Any General➞Boxing",
			"Any General➞Brawling",
			"Any General➞Cudgel",
			"Any General➞Hammer",
			"Any General➞Knives",
			"Any General➞Lance",
			"Any General➞Mace",
			"Any General➞Martial Arts",
			"Any General➞Spear",
			"Any General➞Staff",
			"Any General➞Sword"
		],
		effect: "If you meet the obstacle or win the versus test, you steal the advantage from your opponent. He now suffers the appropriate disadvantage according to your weapons and you gain an advantage to the positioning test at the start of the next exchange (provided you maintain advantage). If you already have the advantage, you can give your opponent a +1 Ob penalty to his next action or you can take +1D to your next action. You choose.",
		special: "Gain a +1D advantage to the Beat test if you're using two hands on your weapon. You cannot hold anything in your off hand!",
		actionCost: 1,
		resolution: {
			"No Action": { type: "½", againstSkill: true },
			"Great Strike": { type: "½", againstSkill: true },
			"Strike": { type: "½", againstSkill: true },
			"Avoid": { type: "Vs", opposingAbility: "Speed" },
			"Block": { type: "Vs" },
			"Counterstrike": { type: "Vs" },
			"Beat": { type: "Vs" },
			"Disarm": { type: "+Vs", againstSkill: true },
			"Feint": { type: "Vs" },
			"Charge/Tackle": { type: "½", againstSkill: true },
			"Lock": { type: "½", againstSkill: true },
			"Push": { type: "½", againstSkill: true },
			"Throw Person": { type: "½", againstSkill: true },
			"Throw Object/Weapon": { type: "½", againstSkill: true },
			"Fall Prone (and beg for mercy)": { type: "Ob", obstacle: 1 },
			"Run Screaming": { type: "Ob", obstacle: 1 },
			"Stand and Drool": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Disarm",
		group: "Special",
		tests: [
			"Any General➞Axe",
			"Any General➞Boxing",
			"Any General➞Brawling",
			"Any General➞Cudgel",
			"Any General➞Hammer",
			"Any General➞Knives",
			"Any General➞Lance",
			"Any General➞Mace",
			"Any General➞Martial Arts",
			"Any General➞Spear",
			"Any General➞Staff",
			"Any General➞Sword"
		],
		effect: "Disarm is a difficult action to pull off, but if successful its results are spectacular. If successful, you knock your opponent's weapon away. A successful Disarm also grants you the advantage for your weapon.",
		special: "Versus Test Rules: In order to Disarm someone in a versus test, you must win by a margin of success equal to his weapon skill —except in the case of Disarm vs Feint. Hence the + sign in the interactions tables for Disarm.",
		actionCost: 1,
		resolution: {
			"No Action": { type: "Ob", againstSkill: true },
			"Great Strike": { type: "Skill" },
			"Strike": { type: "Skill" },
			"Avoid": { type: "Vs+", opposingAbility: "Speed" },
			"Block": { type: "Vs+", againstSkill: true },
			"Counterstrike": { type: "Vs+", againstSkill: true },
			"Beat": { type: "Vs+", againstSkill: true },
			"Disarm": { type: "Skill" },
			"Feint": { type: "Vs" },
			"Charge/Tackle": { type: "Skill" },
			"Lock": { type: "Skill" },
			"Push": { type: "Skill" },
			"Throw Person": { type: "Skill" },
			"Throw Object/Weapon": { type: "Skill" },
			"Fall Prone (and beg for mercy)": { type: "Ob", obstacle: 1 },
			"Run Screaming": { type: "½", opposingAbility: "Speed" },
			"Stand and Drool": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Feint",
		group: "Special",
		tests: [
			"Any General➞Axe",
			"Any General➞Boxing",
			"Any General➞Brawling",
			"Any General➞Cudgel",
			"Any General➞Hammer",
			"Any General➞Knives",
			"Any General➞Lance",
			"Any General➞Mace",
			"Any General➞Martial Arts",
			"Any General➞Spear",
			"Any General➞Staff",
			"Any General➞Sword"
		],
		effect: "Feint is a special attack designed to defeat defenses. Feint does damage like a Strike. See the Weapons chapter for the damage rules.",
		actionCost: 1,
		resolution: {
			"Block": { type: "Ob", obstacle: 1 },
			"Counterstrike": { type: "Ob", obstacle: 1 },
			"Beat": { type: "Vs" },
			"Disarm": { type: "Vs" },
			"Feint": { type: "Vs" }
		}
	},
	{
		name: "Throw Person",
		group: "Special",
		tests: [
			"Any General➞Boxing"
		],
		restrictions: "You must have a hand free to perform this action. If you do not, you drop your weapon as you go for the grab.",
		effect: "If you win the versus test by one or meet your obstacle in a standard test, you successfully throw your opponent off his feet and he suffers the appropriate penalties until he rights himself. You can choose how to spend additional successes: One additional success can be spent to do an Incidental bare-fisted hit or cause a Steel test. Two additional successes can be spent to cause a Mark hit or an Incidental and a Steel test. Four additional successes can be spent to deliver a Superb hit.",
		actionCost: 1,
		resolution: {
			"No Action": { type: "½", opposingAbility: "Speed" },
			"Great Strike": { type: "½", opposingAbility: "Speed" },
			"Strike": { type: "½", opposingAbility: "Speed" },
			"Avoid": { type: "Vs", opposingAbility: "Speed" },
			"Block": { type: "Vs" },
			"Counterstrike": { type: "Vs" },
			"Beat": { type: "½", opposingAbility: "Agility" },
			"Disarm": { type: "½", opposingAbility: "Agility" },
			"Feint": { type: "½", opposingAbility: "Speed" },
			"Charge/Tackle": { type: "Vs", opposingAbility: "Power" },
			"Lock": { type: "Vs", opposingAbility: "Power" },
			"Push": { type: "Vs", opposingAbility: "Power" },
			"Throw Person": { type: "Vs" },
			"Throw Object/Weapon": { type: "Vs" },
			"Fall Prone (and beg for mercy)": { type: "Ob", obstacle: 1 },
			"Run Screaming": { type: "Vs", opposingAbility: "Speed" },
			"Stand and Drool": { type: "Ob", obstacle: 1 }
		}
	},
	{
		name: "Throw Object/Weapon",
		group: "Shooting & Throwing",
		tests: [
			"Any General➞Throwing"
		],
		testExtra: "It's an Ob 2 test to hit plus disadvantages from vying for position, weather and light.",
		restrictions: "Once you throw, you cede advantage to your target.",
		effect: "Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		actionCost: 2,
		countsAsNoAction: true
	},
	{
		name: "Aim",
		group: "Shooting & Throwing",
		special: "A player may spend actions aiming a loaded and ready weapon —a knife in the hand, nocked and drawn bow, a loaded gun, etc. Each action spent gives a +1D advantage. Characters may aim for as many actions as half their Perception exponent rounded up. When aiming with a crossbow, gun or thrown weapon, script your Aim actions first, then script your Throw or Fire actions. When aiming a bow, put your Aim actions after your Nock and Draw actions, before you script Release.",
		effect: "Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		actionCost: "variable",
		countsAsNoAction: true
	},
	{
		name: "Nock Arrow and Draw Bow",
		group: "Shooting & Throwing",
		effect: "This extended action readies your bow to shoot. To hit your target, script the Release action after Nock and Draw. Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		special: "You can prep a bow and keep it ready by spending three actions to nock the arrow. Then when you wa nt to get down to business, you can pay the remainder of the Nock and Draw action to finish readying it. 'Always keep an arrow nocked' is a good Instinct.",
		actionCost: 5,
		countsAsNoAction: true
	},
	{
		name: "Nock Arrow and Draw Great Bow",
		group: "Shooting & Throwing",
		effect: "This extended action readies your bow to shoot. To hit your target, script the Release action after Nock and Draw. Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		special: "You can prep a bow and keep it ready by spending three actions to nock the arrow. Then when you wa nt to get down to business, you can pay the remainder of the Nock and Draw action to finish readying it. 'Always keep an arrow nocked' is a good Instinct.",
		actionCost: 7,
		countsAsNoAction: true
	},
	{
		name: "Reload Crossbow or Pistol",
		group: "Shooting & Throwing",
		effect: "Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		actionCost: 16,
		countsAsNoAction: true
	},
	{
		name: "Reload Heavy Crossbow or Musket",
		group: "Shooting & Throwing",
		effect: "Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		actionCost: 32,
		countsAsNoAction: true
	},
	{
		name: "Fire Crossbow or Gun",
		group: "Shooting & Throwing",
		tests: [
			"Any General➞Crossbow",
			"Any General➞Firearms"
		],
		testExtra: "It's an Ob 2 test to hit with a gun plus disadvantages for vying for position, light, and weather.",
		restrictions: "Once you fire, you cede advantage to your target.",
		effect: "Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		actionCost: 2,
		countsAsNoAction: true
	},
	{
		name: "Release Bow",
		group: "Shooting & Throwing",
		tests: [
			"Any General➞Bow"
		],
		testExtra: "It's an Ob 1 test to hit with a gun plus disadvantages for vying for position, light, and weather.",
		restrictions: "Once your arrow is released you cede advantage to your target.",
		effect: "Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		actionCost: 1,
		countsAsNoAction: true
	},
	{
		name: "Snapshot",
		group: "Shooting & Throwing",
		tests: [
			"Any General➞Bow",
			"Any General➞Crossbow",
			"Any General➞Firearms",
			"Any General➞Throwing"
		],
		testExtra: "Snapshot is a base Ob 4 test.",
		restrictions: "You can use a snapshot with a bow, crossbow, gun or thrown weapon. You may not aim a Snapshot, and once you snap that shot off, you cede advantage to your opponent.",
		effect: "For a crossbow, gun or thrown weapon, a snapshot costs one action. For a bow of any type, a snapshot reduces your draw and nock time by one action. It allows you to release one action sooner. Shooting and Throwing actions don't interact with the fighting actions like other fighting actions.",
		actionCost: 1,
		countsAsNoAction: true
	},
	{
		name: "Cast Spell",
		group: "Magic",
		tests: [
			"Human Magical➞Sorcery"
		],
		effect: "Spells have effects listed in their individual descriptions.",
		special: "Spells take a number of actions to perform. Spell actions must be performed continuously and without interruption (otherwise bad things happen). Spells have weapon lengths. See the Sorcery chapter for details. Spell casting suffers from weapon length and vying for position disadvantage penalties at the time of its release. If you have the advantage, there's no worry. If you've lost (or never gained) the advantage, apply the appropriate obstacle penalties.",
		actionCost: "variable",
		countsAsNoAction: true
	},
	{
		name: "Drop Spell",
		group: "Magic",
		special: "If a caster no longer wishes to concentrate on a spell being sustained, it costs one action to drop it.",
		actionCost: 1,
		countsAsNoAction: true
	},
	{
		name: "Command Spirit",
		group: "Magic",
		tests: [
			"Human Magical➞Spirit Binding"
		],
		effect: "It only costs one action, but it's very risky. These rules are described in detail in the Burning Wheel Codex.",
		actionCost: 1,
		countsAsNoAction: true
	},
	{
		name: "Command",
		group: "Social",
		tests: [
			"Any General➞Command"
		],
		effect: "Command can help reduce hesitation. Commanding another character to get back into the fight costs two actions. See the Command skill description for the rules.",
		actionCost: 2,
		countsAsNoAction: true
	},
	{
		name: "Intimidate",
		group: "Social",
		tests: [
			"Any General➞Intimidation"
		],
		testExtra: "Ob=Will.",
		effect: "If successful, target must test Steel. Using the Intimidation skill on another character in a melee costs two actions. Your target hesitates for one action per point of margin of failure.",
		actionCost: 2,
		countsAsNoAction: true
	},
	{
		name: "Stand and Drool",
		group: "Hesitation",
		effect: "The character is stunned. He does nothing while hesitating.",
		special: "If you hesitate for a complete volley, you give up your advantage in positioning (if you had any). This hesitation option count as Let 'Em Come.",
		actionCost: 1
	},
	{
		name: "Fall Prone (and beg for mercy)",
		group: "Hesitation",
		effect: "The character falls to his knees or stomach and pleads for his life in the name of compassion, honor, mercy or the gods.",
		special: "If you hesitate for a complete volley, you give up your advantage in positioning (if you had any). This hesitation option count as Let 'Em Come.",
		actionCost: 1
	},
	{
		name: "Run Screaming",
		group: "Hesitation",
		effect: "The character drops what he is holding, turns about and bolts for the exit. If the hesitation crosses the top of the exchange, the player must choose to disengage. He does not have access to weapon length dice.",
		special: "If you hesitate for a complete volley, you give up your advantage in positioning (if you had any). If you are hesitating at the start of an exchange, you can only disengage.",
		actionCost: 1
	},
	{
		name: "Swoon",
		group: "Hesitation",
		effect: "The character passes out. He's out of the fight. If appropriate, he appears dead! He cannot be acted against unless another character pays special attention to him —to finish him, slit his throat, check his pulse or whatever.",
		special: "If you hesitate for a complete volley, you give up your advantage in positioning (if you had any). This hesitation option count as Let 'Em Come.",
		actionCost: 1
	}
];
