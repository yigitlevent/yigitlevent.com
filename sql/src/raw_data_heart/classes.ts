export const Classes: HeartClass[] = [
	{
		name: "Cleaver",
		description: "The Heart is a wild place, and it calls to wild people —those on the edge of society who find that the yoke of civilisation chafes against their skin. The wildest of all are known as Cleavers. They step out into the shifting nightmare of the City Beneath and make a home there. They are the first people to set foot in each new chamber of the place, forging ahead through a dark and strange frontier.\nTheir bodies change. Some welcome and seek out transformation, being unsatisfied with their physical forms —they modify their bodies with surgeries that are impossible in the City Above, or hunt and consume beasts of the Heart to gain their power. Some struggle with the change, but it is inevitable. Just as they scar the Heart into new patterns with each footstep forward, the Heart scars them in return and remakes them in a more suitable form: twisting horns, night-black eyes, curious senses unknown to the surface world and so on.\n Cleavers are a common sight amongst parties of delvers, especially those in need of a guide —no-one knows the Heart like they do. No amount of research, no technological device and no arcane scrying ritual can tell you as much as burying yourself waist-deep in the red wet heaven and eating the bounty it generously offers up.",
		skill: "Hunt",
		domain: "Cursed",
		resource: { name: "A freshly-harvested heart that still occasionally twitches", dice: 6, domain: "Wild" },
		equipment: [
			{ name: "Hunting Knife", dice: 6, skill: "Kill" }
		],
		equipments: [
			[{ name: "Cleaver", dice: 8, skill: "Kill", tags: ["Brutal", "Tiring"] }],
			[{ name: "Bone charms and animal-gut sutures", dice: 6, skill: "Mend", resistance: ["Blood"] }],
			[{ name: "Heavy-draw bow", dice: 8, skill: "Kill", tags: ["Ranged", "Tiring"] }]
		],
		abilities: []
	},
	{
		name: "Deadwalker",
		description: "You were always obsessed with death; maybe you were a nihilistic cultist, a moneyed arcanist, a radical theologist or a sanctified killer. But your initial fascination was nothing compared to what happened after you died for the first time. Nothing's been the same ever since.\nYou didn't die properly; somehow, through willpower, luck or trickery, you stayed alive. Your tattered soul gives you a near-unique ability to step between the lands of the living and the dead with relative ease. Your constant companion —a spectral manifestation of the death that didn't take— guards you jealously and whispers secrets from beyond the veil into your ear while you slumber.",
		skill: "Delve",
		domain: "Desolate",
		resource: { name: "Bag of interesting teeth", dice: 6, domain: "Desolate" },
		equipments: [
			[{ name: "Hunting Rifle", dice: 6, skill: "Kill", tags: ["Extreme range", "Reload"] }],
			[{ name: "Greatsword", dice: 10, skill: "Kill", tags: ["Tiring"] }],
			[
				{ name: "Bootleg ambrosia", dice: 6, skill: "Mend", resistance: ["Mind"], tags: ["Potent", "Expensive"] },
				{ name: "Ritual blade", dice: 6, skill: "Kill" }
			]
		],
		abilities: []
	},
	{
		name: "Deep Apiarist",
		description: "They called to you: a distant buzzing hivehum reverberating through the City, a message of control and hope, a secret means of scraping meaning and reason from the unfathomable and ever-changing Heart. They are the Hive, they say —a megaconsciousness, a defence network, grown from within the Spire. They are here to help you push back the tide of unreality.\nDesperate, you accepted them into you. Ten dozen glyph- marked bees crawled into your sinuses and built waxen bulwarks against the disorder within. You are better now. You see the world in different patterns, and can sift through the chaff and noise that only confused you before. You have a crystal clear, perfect vision of what Should Be.\nYou are a Deep Apiarist —one of a small sect of occultists who use the power of the Hive to work magic that manipulates order and chaos. The sigil-covered bees crawling through their bodies can unleash deadly attacks on those who would stand in their way.",
		skill: "Mend",
		domain: "Occult",
		resource: { name: "Heartsbloom rose in a glass jar", dice: 6, domain: "Occult", tags: ["Fragile"] },
		equipment: [
			{ name: "Hive Tool", dice: 4, skill: "Kill", tags: ["Brutal"] }
		],
		equipments: [
			[{ name: "Dimensional barometer", dice: 6, skill: "Delve" }],
			[{ name: "Hunting rifle", dice: 6, skill: "Kill", tags: ["Reload", "Extreme range"] }],
			[{ name: "Smoker", dice: 4, skill: "Kill", tags: ["Debilitating", "Smoke"] }]
		],
		abilities: []
	},
	{
		name: "Heretic",
		description: "The Church of the Moon were driven out of the City Above two hundred years ago. Their faith had been outlawed by invading forces, their temples burned, their idols smashed to pieces, their priests slain in the street —but still they believed in Damnou, goddess of the moon tripartite, bringer of light and life to the drow. They fled into the undercity, seeking solace; what they found was a communion with their goddess greater than anything they could dream of in Spire. They found secrets hidden deep within the earth. They found the Moon Beneath.\nYou are an adherent to the faith of the Moon Beneath. Your great-grandparents might have been among the original refugees driven down to the Heart, or you might be a recent convert to the religion. Either way, you draw power from your faith and unearth the hidden wisdom of your queens who dwell deep in the earth. You proudly bear the symbols of your church-jewellery adorned with eyes, sacred chains that symbolise the restraints on the Moon Beneath, moonsilver piercings, and reams of sacred text —that would have you shot in the street in the City Above.",
		skill: "Mend",
		domain: "Religion",
		resource: { name: "A single devotional candle that burns with a silver flame", dice: 6, domain: "Religion" },
		equipments: [
			[
				{ name: "Spireblack brazier (unlit)", dice: 6, skill: "Kill" },
				{ name: "Spireblack brazier (lit)", dice: 8, skill: "Kill", tags: ["Obscuring", "Dangerous"] }
			],
			[
				{ name: "Breech-loading pistol", dice: 6, skill: "Kill", tags: ["Ranged", "Reload"] },
				{ name: "Seeker's blade", dice: 6, skill: "Kill", tags: ["Brutal"] }
			],
			[
				{ name: "Scripture-etched bandages and blessed oils", dice: 6, skill: "Mend", resistance: ["Blood", "Mind"] },
				{ name: "Staff", dice: 6, skill: "Kill" }
			]
		],
		abilities: []
	},
	{
		name: "Hound",
		description: "In the past: the 33rd Regiment were sent down to pacify the Heart by a mad warrior-poet from the City Above. Of the nine hundred or so enlisted soldiers who set off, three hundred survived. Surrounded by forces beyond their understanding and on the verge of total destruction, the surviving officers did what they could to save their troops. They did something terrible.\nNow: there are three hundred badges, each marked with the name of the original hero who carried it. When you steal one, or have it bestowed upon you, you join the Hounds: the new name of the 33rd, protectors of the fragile populace of the Heart. You carry the weight of their deeds on your shoulders.\nYou hear that some of the original three hundred are still out there, still wearing their badges. You've heard of Hounds holding back the darkness alone, withstanding tremendous amounts of punishment, defending havens for days on end without sleep or food.\nThe Hounds draw on one another and the people of the Heart for strength. So long as someone draws breath in the City Beneath, they cannot be destroyed; this is their gift, and their curse.",
		skill: "Hunt",
		domain: "Haven",
		resource: { name: "Bottle of rotgut liquor", dice: 6, domain: "Haven" },
		equipments: [
			[{ name: "Standard-issue Legrande rifle", dice: 8, skill: "Kill", tags: ["Piercing", "Expensive"] }],
			[
				{ name: "Repeater Sidearm", dice: 6, skill: "Kill", tags: ["Ranged", "Brutal", "Reload"] },
				{ name: "Knife", dice: 6, skill: "Kill" }
			],
			[
				{ name: "Well-stocked Haversack", dice: 6, skill: "Mend", resistance: ["Supplies"] },
				{ name: "Cudgel", dice: 6, skill: "Kill" }
			]
		],
		abilities: []
	},
	{
		name: "Incarnadine",
		description: "It's easy to fall into debt; it's not easy to fall into the catastrophic levels of debt that you managed to achieve. You had to be good at borrowing money —and time, and the faith of others, anything you could get your hands on— to attract the attention of Incarne, the Crimson God of Debt.\nOne day you woke up and found parts of your life missing as though it had been rummaged through by celestial bailiffs: property, possessions, memories, family members, emotions and desires were divided up between your creditors by an unseen force. Maybe your husband didn't recognise you anymore; maybe you were never married in the first place. Maybe you came home to find the rooms barren and filthy as though it hadn't been lived in for decades.\nIncarne made their mark on you: a brand across your heart which brought an end to your life as you knew it. Some people seek out the mark; there's power and freedom associated with burning your old life to ashes, and Incarne rewards those they claim with uncanny abilities that can bring them (and others) even deeper into debt. You stepped into the Heart to find meaning, fortune or oblivion.\nYou rarely speak of the mark or talk about how far you have fallen to be trading stories, hours and lives down in the dark of the City Beneath. But the mark itches. Your greed itches. You carry a heavier weight than can be seen and push anger, sadness and loss out into the darkness, far beyond the light of the haven.",
		skill: "Compel",
		domain: "Haven",
		resource: { name: "Second-hand wedding ring", dice: 6, domain: "Haven" },
		equipment: [
			{ name: "Hooked Blade", dice: 6, skill: "Kill" }
		],
		equipments: [
			[{ name: "Filigreed Revolver", dice: 8, skill: "Kill", tags: ["Ranged", "Expensive"] }],
			[{ name: "Bailiff's Iron Cudgel", dice: 8, skill: "Kill", tags: ["Tiring"] }],
			[{ name: "Home-made Spireblack Pipe Bombs", dice: 6, skill: "Kill", tags: ["Ranged", "Spread", "One-shot"] }]
		],
		abilities: []
	},
	{
		name: "Junk Mage",
		description: "You were a magician, but you always knew there was something more. In the City Above, magic is a pale imitation of what it can be in the Heart. Down here, there is true power to be channeled (i.e. stolen) from beings of tremendous power. You see that the rites of the spell- slinging occultists and the miracle-summoning priests of Spire are nothing but two sides of the same coin-tricks that redirect ambient energy into desired effects.\nYou've tasted the dreams of the ancients. You know that vastly powerful things slumber in the City Beneath, and you know the secrets that plumb your brain directly into their vast, alien consciousnesses. Your spells are cobbled together from snatches of dreams, shards of true-names and the ravings of madmen. You are on the bleeding edge of magic.\nThe power is undeniable; addictive, in fact. To channel —to steal— the power of godlike beings is intoxicating. You relish the touch of madness, of accursed insight, into the vast and terrible truths that hide beneath reality. Sanity, safety, reputation; all these are secondary to the pursuit of arcane majesty.",
		skill: "Discern",
		domain: "Occult",
		resource: { name: "Vial of cursed ink", dice: 6, domain: "Occult" },
		equipments: [
			[{ name: "Two old-fashioned pistols", dice: 8, skill: "Kill", tags: ["Ranged", "Loud", "One-shot"] }],
			[{ name: "Hungry knife", dice: 6, skill: "Kill", tags: ["Brutal", "Bloodbound", "Dangerous"] }],
			[
				{ name: "Overstuffed coat", dice: 6, skill: "Mend", resistance: ["Supplies"] },
				{ name: "Blunderbuss", dice: 4, skill: "Kill", tags: ["Spread", "Point-blank", "One-shot"] }
			]
		],
		abilities: []
	},
	{
		name: "Vermissian Knight",
		description: "The Vermissian is a cursed, centuries-old mass transport network that the people from the City Above built to get from place to place quicker. To power it, they tapped into the wellspring of potential that is the Heart, and damned every single tunnel and station to eternal weirdness. The Vermissian never officially opened. Now, desperate people, fringe historians and heretic cults hide in the infrastructure, using the strange unreality within to further their own ends.\nUsing barely-understood technology and living in the space between worlds, the Vermissian Knights do their level best to understand the parasite reality and protect others they find there. They are in high demand as companions on delves: they have an understanding of the Heart, a good sword arm and a suit of powered armour built from scavenged train materials that helps keep them (and their allies) alive.\nKnights will inscribe the names of landmarks that they have discovered, or found stable routes to, on their armour —it is as much a research project and an advertisement of their prowess as it is a means of protection. Each knight's suit is utterly unique, using technology taken from a dozen different places: different gauges of steels, different weights and levels of protection and flexibility and controls that are often inscrutable to anyone but the creator themselves.",
		skill: "Delve",
		domain: "Technology",
		resource: { name: "Spare capacitors and wires", dice: 6, domain: "Technology" },
		equipments: [
			[{ name: "Pneumatic hammer", dice: 8, skill: "Kill", tags: ["Brutal", "Loud", "Tiring"] }],
			[
				{ name: "Scrapsword", dice: 6, skill: "Kill" },
				{ name: "Magelight rig", dice: 6, skill: "Delve" }
			],
			[{ name: "Steel door shield", dice: 6, skill: "Kill", tags: ["Block"] }]
		],
		abilities: []
	},
	{
		name: "Witch",
		description: "There is a disease, deep in the City Beneath, that worms its way inside the blood and binds the victim to the place; they become a part of something far greater than themselves. Those who have made such a bond are called witches, and are viewed with a mixture of suspicion and awe by the other inhabitants of the Heart.\nEach strain of the disease has a lineage and history associated with it, and witches are careful not to infect those who they think would squander the gift. This long tradition, combined with the way that some witches can kill the average person simply by glancing at them, means that the sect is treated as nobility or emissaries of the Heart Itself. They are almost fae-like, existing in their own world of strange practices and esoteric arts whispered from teacher to student over several centuries.\nThe witches' base of power is Hallow, a ramshackle town built within a burned-out cathedral inside the Heart. Almost every witch has passed through there, is going to pass through there or is trying to avoid it at all costs.",
		skill: "Compel",
		domain: "Occult",
		resource: { name: "Tattered finery (a silk scarf,worn jewellery,etc)", dice: 6, domain: "Haven" },
		equipments: [
			[{ name: "Sacred Blade", dice: 6, skill: "Kill", tags: ["Bloodbound"] }],
			[{ name: "Goat's Leg Carbine", dice: 6, skill: "Kill", tags: ["Ranged", "Reload"] }],
			[{ name: "Physiker's bag", dice: 6, skill: "Mend", resistance: ["Blood"] }]
		],
		abilities: []
	}
];
