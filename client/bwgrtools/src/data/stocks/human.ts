import { Stock } from "./_stocks";

export const Human: Stock = {
	agePool: [
		{
			max: 10,
			min: 0,
			m: 5,
			p: 10
		},
		{
			max: 14,
			min: 11,
			m: 6,
			p: 13
		},
		{
			max: 16,
			min: 15,
			m: 6,
			p: 16
		},
		{
			max: 25,
			min: 17,
			m: 7,
			p: 16
		},
		{
			max: 29,
			min: 26,
			m: 7,
			p: 15
		},
		{
			max: 35,
			min: 30,
			m: 7,
			p: 14
		},
		{
			max: 40,
			min: 36,
			m: 7,
			p: 13
		},
		{
			max: 55,
			min: 41,
			m: 7,
			p: 12
		},
		{
			max: 65,
			min: 56,
			m: 7,
			p: 11
		},
		{
			max: 79,
			min: 66,
			m: 7,
			p: 10
		},
		{
			max: 99999,
			min: 80,
			m: 6,
			p: 9
		}
	],
	allowed: [
		"bwgr",
		"bs"
	],
	hasSetting: true,
	hasSubsetting: true,
	name: "Human",
	namePlural: "Humans",
	stride: 7,
	settings: {
		"City Dweller": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "City Dweller",
			short: "City",
			stock: "Human",
			type: "Setting",
			lifepaths: [
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 4,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Noble",
						"Human➞Outcast",
						"Human➞College of Magic"
					],
					mentalPool: 0,
					name: "City Born",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "City Dweller",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 12
				},
				{
					allowed: [
						"bwc"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Gifted Child",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "City Dweller",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Misunderstood",
						"Human Special➞Gifted",
						"Any Character➞Abused",
						"Human Special➞Spirit Familiar"
					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Runner",
					physicalPool: 1,
					requirements: {
					},
					resources: 7,
					setting: "City Dweller",
					skillPool: 3,
					skills: [
						"Any General➞Streetwise",
						"Any General➞Inconspicuous"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Urchin",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞3"
									]
								}
							]
						}
					},
					resources: 4,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Falsehood",
						"Any General➞Streetwise",
						"Any General➞Stealthy"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Die➞Sickly",
						"Any Call-on➞Fleet of Foot",
						"Human Lifepath➞Unheeded"
					],
					years: 2
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Beggar",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "City Dweller",
					skillPool: 7,
					skills: [
						"Any General➞Beggardry",
						"Any General➞Inconspicuous",
						"Any General➞Persuasion",
						"Any General➞Falsehood",
						"Any Wise➞City-wise",
						"Any Wise➞City Guard-wise",
						"Any Wise➞Wealth-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Die➞Lame",
						"Any Character➞Downtrodden",
						"Any Character➞Hurt",
						"Human Lifepath➞Broken"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Courier",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Riding",
						"Any General➞Streetwise",
						"Any Wise➞Countryside-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Laborer",
					physicalPool: 1,
					requirements: {
					},
					resources: 4,
					setting: "City Dweller",
					skillPool: 2,
					skills: [
						"Any General➞Ditch Digging",
						"Any General➞Hauling"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Drunk",
						"Human Lifepath➞Mind-Numbing Work"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Religious",
						"Human➞Servitude and Captive",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Pilgrim",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Religious Diatribe",
						"Any Wise➞City-wise",
						"Any Wise➞Shrine-wise",
						"Any General➞Doctrine"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Tall Tale Teller",
						"Any Character➞Stinky"
					],
					years: 2
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Groom",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any Wise➞Road-wise",
						"Any General➞Driving",
						"Any General➞Riding",
						"Any General➞Animal Husbandry",
						"Any General➞Mending",
						"Any Wise➞City-wise",
						"Any Wise➞Traveler-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Peripatetic"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Duelist",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞City Dweller➞City Guard",
										"Human➞City Dweller➞Guard Captain",
										"Human➞Servitude and Captive➞Gladiator",
										"Setting➞Human➞Outcast",
										"Setting➞Human➞Professional Soldier"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "City Dweller",
					skillPool: 7,
					skills: [
						"Any General➞Sword",
						"Any General➞Brawling",
						"Any General➞Two-Fisted Fighting Training",
						"Any General➞Streetwise",
						"Any General➞Haggling",
						"Any General➞Conspicuous",
						"Any Wise➞Trial by Combat-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Mercenary",
						"Any Die➞Cold Blooded",
						"Any Die➞Fearless"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Coin Clipper",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Streetwise",
						"Any General➞Forgery",
						"Any General➞Falsehood",
						"Any General➞Intimidation",
						"Any General➞Counterfeiting",
						"Any Wise➞Coin-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Die➞Light Sleeper"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Pickpocket",
					physicalPool: 1,
					requirements: {
					},
					resources: 8,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Streetwise",
						"Any General➞Sleight of Hand",
						"Any Wise➞Crowd-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Call-on➞Plain Faced"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Street Thug",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Brawling",
						"Any General➞Intimidation",
						"Any General➞Streetwise",
						"Any Wise➞Darkened Streets-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Cruel",
						"Any Call-on➞Street Smart"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Criminal",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Streetwise",
						"Any General➞Intimidation",
						"Any General➞Knives",
						"Any General➞Climbing"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Cynical",
						"Any Call-on➞Poker Face",
						"Any Die➞Rainman",
						"Any Die➞Alert"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Confidence Man",
					physicalPool: 0,
					requirements: {
					},
					resources: 12,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Falsehood",
						"Any General➞Inconspicuous",
						"Any General➞Disguise",
						"Any General➞Persuasion",
						"Any Wise➞Grift-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Peasant",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "City Peddler",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "City Dweller",
					skillPool: 7,
					skills: [
						"Any General➞Mending",
						"Any General➞Sing",
						"Any General➞Haggling",
						"Any General➞Chandler",
						"Any General➞Persuasion",
						"Any General➞Inconspicuous",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞The Story"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Seafaring",
						"Human➞Peasant",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Sailor",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Rigging",
						"Any General➞Knots",
						"Any General➞Brawling",
						"Any General➞Mending",
						"Any General➞Sing",
						"Any General➞Gambling"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Superstitious",
						"Any Call-on➞Sea Legs"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Student",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 11,
					skills: [
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Philosophy",
						"Any General➞Rule of Law",
						"Any General➞History",
						"Any General➞Symbology",
						"Any General➞Anatomy",
						"Human Special➞Astrology",
						"Any General➞Inconspicuous",
						"Any General➞Streetwise",
						"Any Wise➞City-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Rabble-Rouser",
						"Any Character➞Drunk",
						"Any Die➞Geometric"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Ganymede",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any Wise➞Fashion-wise",
						"Any General➞Inconspicuous",
						"Any General➞Conspicuous",
						"Any General➞Soothing Platitudes"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Flamboyant",
						"Any Character➞Comely",
						"Any Character➞Sharp Dresser",
						"Human Special➞Catalyst"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Noble Court",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Dilettante",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any Wise➞Sorcery-wise",
						"Any General➞Obscure History",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Superstitious",
						"Any Die➞Entropic",
						"Any Die➞Cipher"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞College of Magic"
					],
					mentalPool: 1,
					name: "Neophyte Sorcerer",
					physicalPool: 0,
					requirements: {
					},
					resources: 12,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Research",
						"Any General➞Symbology",
						"Any Wise➞Great Masters-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Extremely Respectful of One's Betters",
						"Any Character➞Bitter",
						"Human Special➞Gifted"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Temple Acolyte",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Bureaucracy",
						"Any General➞Read",
						"Any General➞Write",
						"Any Wise➞Temple-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Believer",
						"Human Lifepath➞Tonsured",
						"Human Special➞Faithful"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Sculptor",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Sculpture",
						"Any General➞Mason",
						"Any General➞Blacksmith",
						"Any General➞Carpentry",
						"Any Wise➞Stone-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Passionate"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Painter",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Painting",
						"Any General➞Illuminations",
						"Any General➞Anatomy",
						"Any Wise➞Paint-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Odd",
						"Any Call-on➞Perspective",
						"Any Die➞Greater Muse"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Composer",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Music Composition",
						"Any General➞Poetry",
						"Any General➞Sing",
						"Any General➞Musical Instrument"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Esoteric",
						"Any Character➞Remote",
						"Any Die➞Deaf"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Dramaturge",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Playwright",
						"Any General➞Composition",
						"Any General➞Write",
						"Any Wise➞Drama-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Other Life"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Performer",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Acting",
						"Any General➞Persuasion",
						"Any General➞Sing",
						"Any General➞Falsehood",
						"Any General➞Conspicuous",
						"Any General➞Sleight of Hand",
						"Any General➞Musical Instrument"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Colorful"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Tinkerer",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Mending",
						"Any General➞Scavenging",
						"Any Wise➞Junk-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [

					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Peasant",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Coal Man",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Firebuilding",
						"Any General➞Streetwise",
						"Any Wise➞Charcoal-wise",
						"Any General➞Haggling"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Hacking Cough"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Seamstress",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Sewing",
						"Any General➞Embroidery",
						"Any Wise➞Clothing-wise",
						"Any Wise➞Fashion-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Fretful",
						"Any Character➞Sharp Dresser"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Barkeep",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any Wise➞Drink-wise",
						"Any Wise➞Drunk-wise",
						"Any General➞Persuasion"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Good Listener"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant"
					],
					mentalPool: 1,
					name: "Shopkeeper",
					physicalPool: 0,
					requirements: {
					},
					resources: 16,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any Wise➞Merchant-wise",
						"Any General➞Haggling",
						"Any General➞Accounting",
						"Any General➞Observation"
					],
					stock: "Human",
					traitPool: 0,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Baker",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Baking",
						"Any General➞Cooking",
						"Any Wise➞Daily Bread-wise",
						"Any Wise➞Sweet Tooth-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Floury"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞Peasant",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Alewife",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"GENDER➞FEMALE"
									]
								}
							]
						}
					},
					resources: 12,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Brewer",
						"Any General➞Mending",
						"Any General➞Drinking",
						"Any General➞Administration",
						"Any Wise➞Drunk Husband-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Domineering Presence"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞Peasant",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Conner",
					physicalPool: 0,
					requirements: {
					},
					resources: 12,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Brewer",
						"Any General➞Mending",
						"Any General➞Drinking",
						"Any General➞Cooper",
						"Any Wise➞Beer-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Red Cheeks",
						"Any Character➞Drunk"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Clerk",
					physicalPool: 0,
					requirements: {
					},
					resources: 9,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Bureaucracy",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Accounting",
						"Any Wise➞Bribe-wise",
						"Any Wise➞Paperwork-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant"
					],
					mentalPool: 1,
					name: "Scribe",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Religious➞Temple Acolyte",
										"Human➞Villager➞Acolyte",
										"Human➞City Dweller➞Clerk",
										"Human➞Villager➞Clerk"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Write",
						"Any General➞Illuminations",
						"Any General➞Foreign Languages",
						"Any Wise➞Handwriting-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Near-Sighted",
						"Any Character➞Cramped Hands"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant"
					],
					mentalPool: 1,
					name: "Accountant",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Clerk",
										"Human➞Villager➞Clerk",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Accounting",
						"Any General➞Bureaucracy",
						"Any General➞Extortion",
						"Any Wise➞Ledger-wise",
						"Any Wise➞Graft-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Bored"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞College of Magic"
					],
					mentalPool: 1,
					name: "Scholar",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Scribe",
										"Human➞Outcast➞Thinker",
										"Human➞Religious➞Archivist",
										"Human➞Religious➞Interpreter",
										"Human➞Religious➞Custodian",
										"Human➞City Dweller➞Bishop",
										"Human➞Religious➞Bishop",
										"Skill➞Human Magical➞Sorcery",
										"Skill➞Human Magical➞Enchanting",
										"Skill➞Human Magical➞Summoning"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 11,
					skills: [
						"Any General➞Read",
						"Any General➞Research",
						"Any General➞History",
						"Any General➞Philosophy",
						"Any General➞Symbology",
						"Any General➞Instruction",
						"Any General➞Illuminations",
						"Any General➞Foreign Languages",
						"Any General➞Ancient Languages"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Know It All",
						"Any Die➞Bookworm"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Moneylender",
					physicalPool: 0,
					requirements: {
					},
					resources: 20,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any Wise➞Currency-wise",
						"Any General➞Haggling",
						"Any General➞Accounting"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Penny-wise"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Tax Collector",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MIN➞3"
									]
								}
							]
						}
					},
					resources: 18,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Accounting",
						"Any General➞Haggling",
						"Any General➞Interrogation"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Hard-Hearted"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Taskmaster",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MIN➞3"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Brawling",
						"Any General➞Sing",
						"Any General➞Conspicuous",
						"Any Wise➞Laborer-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Intimidating",
						"Any Call-on➞Dreadful"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Seafaring",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Mercenary Captain",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor",
										"Human➞Outcast➞Pirate",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Pilot",
						"Any Wise➞Fat Merchant-wise",
						"Any General➞Sword",
						"Any General➞Climbing",
						"Any General➞Intimidation"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Predatory"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "City Guard",
					physicalPool: 1,
					requirements: {
					},
					resources: 9,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Brawling",
						"Any General➞Intimidation",
						"Any General➞Drinking",
						"Any General➞Appropriate Weapons",
						"Any General➞Armor Training"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Drunk"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Sergeant-at-Arms",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞City Guard",
										"Human➞City Dweller➞Guard Captain",
										"Human➞Seafaring➞Marine",
										"Human➞Seafaring➞First Mate",
										"Human➞Professional Soldier➞Foot Soldier",
										"Human➞Outcast➞Freebooter",
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞Noble Court➞Man-at-Arms",
										"Human➞Professional Soldier➞Cavalryman"
									]
								}
							]
						}
					},
					resources: 11,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Appropriate Weapons",
						"Any General➞Armor Training",
						"Any General➞Field Dressing"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Overworked"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Guard Captain",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Human➞Professional Soldier➞Captain",
										"Human➞Villager➞Village Sergeant",
										"Human➞Villager➞Corrupt Sergeant",
										"Human➞Professional Soldier➞Sergeant"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Etiquette",
						"Any General➞Riding",
						"Any General➞Intimidation",
						"Any General➞Command",
						"Any General➞Appropriate Weapons"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Exasperated"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Seafaring"
					],
					mentalPool: 0,
					name: "Apprentice",
					physicalPool: 1,
					requirements: {
					},
					resources: 8,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Mending",
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Hauling",
						"Any General➞Driving",
						"Any General➞Ditch Digging"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Broken In",
						"Human Lifepath➞Back-Breaking Labor"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Apprentice Artisan",
					physicalPool: 1,
					requirements: {
					},
					resources: 10,
					setting: "City Dweller",
					skillPool: 8,
					skills: [
						"Any Wise➞Artisan-wise",
						"Any General➞Mason",
						"Any General➞Any -smith",
						"Any General➞Carpentry",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Jargon"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Seafaring"
					],
					mentalPool: 0,
					name: "Journeyman",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Apprentice",
										"Human➞Professional Soldier➞Apprentice",
										"Human➞Villager➞Apprentice"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 7,
					skills: [
						"Any General➞Haggling",
						"Any General➞Appraisal",
						"Any General➞Blacksmith",
						"Any General➞Carpentry",
						"Any General➞Tanner",
						"Any General➞Potter",
						"Any General➞Cooper"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Made Man",
						"Any Die➞Geometric"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Engraver",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Engraving",
						"Any General➞Etching",
						"Any General➞Jargon"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Gentle but Firm"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Saddler",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Saddlery",
						"Any General➞Tanner",
						"Any General➞Sewing",
						"Any General➞Embroidery",
						"Any General➞Mending",
						"Any Wise➞Mount-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Noble Court",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Armorer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "City Dweller",
					skillPool: 7,
					skills: [
						"Any Wise➞Swordsman-wise",
						"Any General➞Blacksmith",
						"Any General➞Tanner",
						"Any General➞Armorer",
						"Any General➞Weaponsmith"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Diligent"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Plumber",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Plumbing",
						"Any General➞Engineering",
						"Any General➞Coppersmith",
						"Any Wise➞Waterworks-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Touch of Madness"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Locksmith",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 13,
					setting: "City Dweller",
					skillPool: 3,
					skills: [
						"Any General➞Locksmith",
						"Any Wise➞Lock-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Steady Hands"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Jeweler",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Jeweler",
						"Any General➞Lapidary",
						"Any General➞Appraisal",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Guarded"
					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Professional Soldier",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Gaol Warden",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Born Noble",
										"Human➞City Dweller➞Merchant",
										"Human➞Villager➞Merchant",
										"Human➞Professional Soldier➞Sergeant",
										"Human➞Noble Court➞Man-at-Arms",
										"Human➞City Dweller➞Judge"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Administration",
						"Any General➞Etiquette",
						"Any Wise➞Gaol-wise",
						"Any Wise➞Everybody's Innocent-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Advocate",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Rule of Law",
						"Any General➞Bureaucracy",
						"Any General➞Persuasion",
						"Any General➞History",
						"Any General➞Rhetoric"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Shrewd"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Doctor",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Anatomy",
						"Any General➞Apothecary",
						"Any General➞Bloodletting",
						"Any General➞Surgery",
						"Any General➞Soothing Platitudes"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Frustrated"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞Professional Soldier",
						"Human➞Peasant"
					],
					mentalPool: 1,
					name: "Physician",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Peasant➞Midwife",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Herbalism",
						"Any General➞Apothecary",
						"Any General➞Anatomy",
						"Any General➞Research",
						"Any Wise➞Herbalist-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Hospital Warden",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Setting➞Human➞Noble",
										"Setting➞Human➞Noble Court",
										"Setting➞Human➞Religious"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Administration",
						"Any Wise➞Beggar-wise",
						"Any Wise➞Vagrant-wise",
						"Any Wise➞Leper-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Overworked",
						"Any Character➞Generous",
						"Any Character➞Venal",
						"Any Character➞Hypochondriac"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞Noble Court",
						"Human➞Noble"
					],
					mentalPool: 0,
					name: "Banker",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Merchant",
										"Human➞Villager➞Merchant",
										"Human➞City Dweller➞Moneylender",
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞City Dweller➞Accountant",
										"Human➞Noble Court➞Chamberlain"
									]
								}
							]
						}
					},
					resources: 60,
					setting: "City Dweller",
					skillPool: 4,
					skills: [
						"Any General➞Accounting",
						"Any General➞Administration",
						"Any Wise➞Currency-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Intense"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Merchant",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Master Craftsman",
										"Human➞Villager➞Master Craftsman",
										"Human➞Noble Court➞Master of Horses",
										"Human➞Noble Court➞Master of Hounds",
										"Human➞City Dweller➞Moneylender",
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞City Dweller➞Jeweler",
										"Human➞City Dweller➞Saddler",
										"Human➞City Dweller➞Armorer",
										"Human➞Noble Court➞Armorer",
										"Human➞Professional Soldier➞Armorer",
										"Human➞Villager➞Cobbler",
										"Human➞Noble Court➞Courtier",
										"Human➞Noble Court➞Chamberlain"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Accounting",
						"Any General➞Haggling",
						"Any Wise➞Supplier-wise",
						"Any Wise➞Lord-wise",
						"Any Wise➞Peasant-wise"
					],
					stock: "Human",
					traitPool: 0,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞College of Magic"
					],
					mentalPool: 1,
					name: "Sorcerer",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Wizard's Apprentice",
										"Human➞City Dweller➞Neophyte Sorcerer",
										"Human➞Noble➞Arcane Devotee",
										"Human➞Seafaring➞Weather Witch"
									]
								}
							]
						}
					},
					resources: 32,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Human Magical➞Sorcery",
						"Human Magical➞Enchanting",
						"Any General➞Calligraphy"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Temple Priest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Religious Acolyte",
										"Human➞City Dweller➞Temple Acolyte",
										"Human➞Religious➞Temple Acolyte",
										"Human➞Religious➞Military Order"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "City Dweller",
					skillPool: 8,
					skills: [
						"Any Wise➞Church Politics-wise",
						"Any General➞Doctrine",
						"Any General➞Oratory",
						"Any General➞Suasion",
						"Any General➞Symbology"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Vested",
						"Any Character➞Aloof",
						"Any Character➞Imperious",
						"Any Character➞Strong-Willed"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Judge",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Town Official",
										"Human➞City Dweller➞Tax Collector",
										"Human➞Villager➞Tax Collector",
										"Human➞Noble Court➞Bailiff",
										"Human➞Noble Court➞Justiciar"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Rule of Law",
						"Any General➞Amercement",
						"Any Wise➞Criminal-wise",
						"Any General➞Interrogation"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Ornery",
						"Any Die➞Quick-Witted"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Noble Court",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Municipal Minister",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Town Official",
										"Human➞City Dweller➞Scholar",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞City Dweller➞Bishop",
										"Human➞Religious➞Bishop",
										"Human➞Professional Soldier➞Captain",
										"Human➞Seafaring➞Ship's Captain",
										"Human➞City Dweller➞Artisan",
										"Human➞City Dweller➞Master Craftsman",
										"Human➞Villager➞Master Craftsman",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Human➞Noble Court➞Courtier",
										"Human➞Noble Court➞Master of Horses"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Persuasion",
						"Any General➞Rule of Law",
						"Any General➞Administration",
						"Any General➞Oratory",
						"Any Wise➞Law-wise",
						"Any Wise➞Minister-wise"
					],
					stock: "Human",
					traitPool: 0,
					traits: [

					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Artisan",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Apprentice Artisan",
										"Human➞Professional Soldier➞Engineer",
										"Human➞Seafaring➞Engineer",
										"Human➞City Dweller➞Master Craftsman",
										"Human➞Villager➞Master Craftsman"
									]
								}
							]
						}
					},
					resources: 45,
					setting: "City Dweller",
					skillPool: 9,
					skills: [
						"Any General➞Jargon",
						"Any General➞Mason",
						"Any General➞Engineering",
						"Any General➞Architect"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Self-Confident"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 3,
					leads: [
						"Human➞Villager",
						"Human➞Noble Court",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Master Craftsman",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								},
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Locksmith",
										"Human➞City Dweller➞Plumber",
										"Human➞City Dweller➞Engraver",
										"Human➞City Dweller➞Saddler",
										"Human➞City Dweller➞Armorer",
										"Human➞Noble Court➞Armorer",
										"Human➞Professional Soldier➞Armorer",
										"Human➞Noble Court➞Atilliator",
										"Human➞Professional Soldier➞Atilliator",
										"Human➞Villager➞Cobbler",
										"Human➞Villager➞Bowyer",
										"Human➞City Dweller➞Taskmaster",
										"Human➞Villager➞Taskmaster"
									]
								}
							]
						}
					},
					resources: 45,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any Wise➞Craftsman-wise",
						"Any Wise➞Artisan-wise",
						"Any Wise➞Materials-wise",
						"Any Wise➞Tools-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Ambitious",
						"Any Call-on➞Charismatic"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Bishop",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Archpriest",
										"Human➞Religious➞Canon",
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞Noble Court➞Chamberlain",
										"Trait➞Human Lifepath➞Your Grace"
									]
								}
							]
						}
					},
					resources: 60,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Etiquette",
						"Any General➞Bureaucracy",
						"Any General➞Ritual",
						"Any Wise➞Church-wise",
						"Any Wise➞City-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Holier"
					],
					years: 12
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 1,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞Noble",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Magnate",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Merchant",
										"Human➞Villager➞Merchant",
										"Human➞Noble Court➞Master of Horses"
									]
								}
							]
						}
					},
					resources: 75,
					setting: "City Dweller",
					skillPool: 6,
					skills: [
						"Any General➞Administration",
						"Any Wise➞Merchant-wise",
						"Any Wise➞Court-wise",
						"Any Wise➞Commodities-wise",
						"Any Wise➞Pirates-wise",
						"Any Wise➞Bandit-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Self-Satisfied",
						"Any Character➞Greedy",
						"Human Lifepath➞Affinity for Business"
					],
					years: 12
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "City Wife",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "City Dweller",
					skillPool: 2,
					skills: [
						"Any General➞Child-Rearing",
						"Any Wise➞Husband-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Evangelist",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Dilettante",
										"Human➞Noble Court➞Court Summoner",
										"Human➞College of Magic➞Master Summoner",
										"Human➞Outcast➞Mad Summoner",
										"Human➞Outcast➞Crazy Witch",
										"Human➞Outcast➞Oasis Witch",
										"Human➞Seafaring➞Weather Witch",
										"Setting➞Human➞Religious"
									]
								}
							]
						}
					},
					resources: 6,
					setting: "City Dweller",
					skillPool: 5,
					skills: [
						"Any General➞Empyrealia",
						"Any General➞Demonology",
						"Any General➞Oratory",
						"Any Wise➞Cultist-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Believer",
						"Human Special➞Fiery"
					],
					years: 3
				}
			]
		},
		"College of Magic": {
			allowed: [
				"bwc"
			],
			name: "College of Magic",
			short: "College",
			stock: "Human",
			type: "Subsetting",
			lifepaths: [
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Supplicant",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 3,
					setting: "College of Magic",
					skillPool: 2,
					skills: [
						"Any General➞Animal Husbandry",
						"Any General➞Firebuilding"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Broken In",
						"Human Special➞Gifted",
						"Any Die➞Second Sight",
						"Any Die➞Fey Blood"
					],
					years: 1
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Junior Student",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Supplicant",
										"Human➞Noble➞Arcane Devotee",
										"Human➞Noble Court➞Apt Pupil",
										"Human➞Outcast➞Apt Pupil",
										"Human➞Professional Soldier➞Apt Pupil",
										"Human➞Religious➞Apt Pupil",
										"Human➞City Dweller➞Neophyte Sorcerer"
									]
								},
								{
									type: "AND",
									items: [
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 5,
					setting: "College of Magic",
					skillPool: 8,
					skills: [
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Ancient History",
						"Human Magical➞Circination",
						"Any General➞Illuminations",
						"Human Special➞Astrology",
						"Any General➞Symbology"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Hazed"
					],
					years: 2
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Senior Student",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Junior Student",
										"Human➞City Dweller➞Sorcerer"
									]
								},
								{
									type: "AND",
									items: [
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "College of Magic",
					skillPool: 8,
					skills: [
						"Any General➞Calligraphy",
						"Any General➞Rhetoric",
						"Any General➞Aura Reading",
						"Any General➞Empyrealia",
						"Any General➞Demonology",
						"Any General➞Doctrine",
						"Any Wise➞School of Magic-wise",
						"Any Wise➞Junior Student-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Graduate",
						"Human Special➞Bully"
					],
					years: 2
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Religious",
						"Human➞Outcast",
						"Human➞City Dweller"
					],
					mentalPool: 1,
					name: "Adjunct",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Senior Student"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "College of Magic",
					skillPool: 7,
					skills: [
						"Any General➞Research",
						"Any General➞Folklore",
						"Human Magical➞Alchemy",
						"Any General➞Taxidermy",
						"Any Wise➞Library-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Overworked",
						"Any Call-on➞Familiar Face"
					],
					years: 6
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Seafaring"
					],
					mentalPool: 1,
					name: "Master Sorcerer",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Adjunct",
										"Human➞Noble Court➞Court Sorcerer"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "College of Magic",
					skillPool: 6,
					skills: [
						"Human Magical➞Sorcery",
						"Any General➞Instruction",
						"Any Wise➞Facet-wise",
						"Any Wise➞Aura-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Versatile",
						"Any Die➞Sixth Sense"
					],
					years: 8
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Master Enchanter",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Adjunct",
										"Human➞Noble Court➞Court Enchanter"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "College of Magic",
					skillPool: 6,
					skills: [
						"Human Magical➞Enchanting",
						"Any General➞Instruction",
						"Any General➞Carving",
						"Any General➞Etching",
						"Any General➞Herbalism",
						"Any General➞Jeweler",
						"Any Wise➞Vessel-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Call-on➞Nimble",
						"Any Die➞Practiced Precision"
					],
					years: 8
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Master Summoner",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Adjunct",
										"Human➞Noble Court➞Court Summoner"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "College of Magic",
					skillPool: 8,
					skills: [
						"Human Magical➞Summoning",
						"Any General➞Instruction",
						"Human Magical➞Bargaining",
						"Any General➞Ugly Truth",
						"Any General➞Soothing Platitudes",
						"Any General➞Rule of Law",
						"Any General➞Philosophy",
						"Any Wise➞Scheme-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Die➞Extrovert",
						"Any Die➞Fearless",
						"Any Die➞Obscure Aura"
					],
					years: 8
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Researcher",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Adjunct",
										"Human➞City Dweller➞Scholar"
									]
								},
								{
									type: "AND",
									items: [
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "College of Magic",
					skillPool: 12,
					skills: [
						"Any General➞Research",
						"Any General➞Composition",
						"Any General➞Cartography",
						"Any General➞Cryptography",
						"Any General➞Doctrine",
						"Any General➞Apothecary",
						"Any General➞Ritual",
						"Human Magical➞Death Art",
						"Any General➞Foreign Languages",
						"Any Wise➞Dark Arts-wise",
						"Any Wise➞Elven Songs-wise",
						"Any Wise➞Orc Rituals-wise",
						"Any Wise➞Dwarven Art-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Myopic",
						"Any Die➞Bookworm",
						"Any Character➞Speaker of the Secret Language"
					],
					years: 10
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞City Dweller"
					],
					mentalPool: 1,
					name: "Councillor",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Master Sorcerer",
										"Human➞College of Magic➞Master Enchanter",
										"Human➞College of Magic➞Master Summoner"
									]
								}
							]
						}
					},
					resources: 45,
					setting: "College of Magic",
					skillPool: 6,
					skills: [
						"Any General➞Administration",
						"Any General➞Rhetoric",
						"Any General➞Wine Tasting",
						"Any Wise➞Troubled Student-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Council of Mages",
						"Human Lifepath➞Imperious Demeanor"
					],
					years: 5
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 1,
					leads: [
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Headmaster",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Councillor"
									]
								}
							]
						}
					},
					resources: 50,
					setting: "College of Magic",
					skillPool: 7,
					skills: [
						"Any General➞Oratory",
						"Any General➞Etiquette",
						"Any General➞Poetry",
						"Any General➞Strategy Games",
						"Any General➞Vintner",
						"Any Wise➞Dark Secret-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Die➞Stoic",
						"Human Special➞Master of Mages",
						"Human Lifepath➞Domineering Presence"
					],
					years: 12
				}
			]
		},
		"Death Cult": {
			allowed: [
				"bwc"
			],
			name: "Death Cult",
			short: "Cult",
			stock: "Human",
			type: "Subsetting",
			lifepaths: [
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Harem Slave",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Death Cult",
					skillPool: 4,
					skills: [
						"Any Wise➞Creepy Priest-wise",
						"Any Wise➞Disgusting Necromancer-wise",
						"Any Wise➞Death Cult-wise",
						"Any Monstrous➞Escape Artist"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Orc Lifepath➞Numb"
					],
					years: 3
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Death Cultist",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Death Cult",
					skillPool: 3,
					skills: [
						"Any Wise➞Death-wise",
						"Any Wise➞Riot-wise",
						"Any Wise➞Secret Cult Worship-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Zealot",
						"Human Special➞Suicidal"
					],
					years: 2
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Grave Robber",
					physicalPool: 0,
					requirements: {
					},
					resources: 7,
					setting: "Death Cult",
					skillPool: 4,
					skills: [
						"Any General➞Ditch Digging",
						"Any Wise➞Graveyard-wise",
						"Any Wise➞Night Watch-wise",
						"Any Wise➞Shovel-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Lunatic"
					],
					years: 3
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 1,
					name: "Spy",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Cultist",
										"Human➞Outcast➞Insurrectionist"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Death Cult",
					skillPool: 7,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Stealthy",
						"Any General➞Falsehood",
						"Any General➞Forgery",
						"Any General➞Observation",
						"Any Wise➞Righteous Priest-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Monstrous➞Furtive",
						"Any Die➞Manhunter"
					],
					years: 4
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Factotum",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Death Cult➞Spy",
										"Human➞Death Cult➞Tomb Guard",
										"Human➞Outcast➞Deranged",
										"Human➞City Dweller➞Evangelist",
										"Human➞Outcast➞Insurrectionist"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Death Cult",
					skillPool: 7,
					skills: [
						"Any General➞Haggling",
						"Any General➞Persuasion",
						"Any General➞Hauling",
						"Any General➞Appraisal",
						"Any General➞Taxidermy",
						"Any Wise➞Local Law-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Polite",
						"Human Special➞Efficient",
						"Any Die➞Stoic"
					],
					years: 7
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Tomb Guard",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Cultist",
										"Human➞Outcast➞Gravedigger",
										"Human➞Outcast➞Freebooter",
										"Setting➞Human➞Professional Soldier"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Death Cult",
					skillPool: 5,
					skills: [
						"Any General➞Spear",
						"Any General➞Knives",
						"Any General➞Brawling",
						"Any Wise➞Walking Corpse-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Disfigured",
						"Any Die➞Loyal"
					],
					years: 4
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Death Priest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Venal Priest",
										"Human➞Outcast➞Heretic Priest"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "Death Cult",
					skillPool: 6,
					skills: [
						"Any General➞Command",
						"Any General➞Ritual",
						"Any Wise➞God of Death-wise",
						"Any Wise➞Death Cult-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Creepy",
						"Human Special➞Invocations of the Damned",
						"Any Die➞Iron Will",
						"Human Special➞Cult Leader"
					],
					years: 6
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Death Artist",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Evil Necromancer",
										"Human➞Noble Court➞Apt Pupil",
										"Human➞Outcast➞Apt Pupil",
										"Human➞Professional Soldier➞Apt Pupil",
										"Human➞Religious➞Apt Pupil",
										"Human➞Outcast➞Rogue Wizard"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Death Cult",
					skillPool: 8,
					skills: [
						"Human Magical➞Death Art",
						"Any Wise➞Tomb-wise",
						"Any Wise➞Orc Servant-wise",
						"Any Wise➞Evil Necromancer-wise",
						"Any Wise➞Death Cult-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Cynical",
						"Any Die➞Mind over Matter",
						"Any Die➞Missing Limb",
						"Any Die➞Paranoid Ear",
						"Any Call-on➞Meticulous",
						"Human Special➞Corrupted"
					],
					years: 10
				}
			]
		},
		"Noble": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "Noble",
			short: "Noble",
			stock: "Human",
			type: "Setting",
			lifepaths: [
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 5,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞College of Magic"
					],
					mentalPool: 0,
					name: "Born Noble",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Noble",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Mark of Privilage",
						"Human Lifepath➞Your Lordship",
						"Human Lifepath➞Your Eminence",
						"Human Lifepath➞Your Grace"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Bastard",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble",
					skillPool: 4,
					skills: [
						"Any Wise➞Family Secret-wise",
						"Any General➞Etiquette",
						"Any General➞Extortion"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Bastard",
						"Any Character➞Bitter",
						"Any Character➞Cynical",
						"Any Character➞Happy-Go-Lucky"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Page",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble",
					skillPool: 7,
					skills: [
						"Any General➞Riding",
						"Any General➞Brawling",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Sword",
						"Any General➞Etiquette"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Religious",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Student",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble",
					skillPool: 8,
					skills: [
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Rule of Law",
						"Any General➞Oratory",
						"Any General➞Doctrine",
						"Any General➞Etiquette"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Squire",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Page",
										"Human➞Noble Court➞Page",
										"Setting➞Human➞Professional Soldier"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble",
					skillPool: 9,
					skills: [
						"Any General➞Sword",
						"Any General➞Mounted Combat Training",
						"Any General➞Shield Training",
						"Any General➞Armor Training",
						"Any General➞Lance",
						"Any General➞Knives",
						"Any General➞Crossbow"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Outcast",
						"Human➞College of Magic"
					],
					mentalPool: 1,
					name: "Arcane Devotee",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble",
					skillPool: 6,
					skills: [
						"Any General➞Calligraphy",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Research",
						"Any General➞Symbology"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Base Humility",
						"Human Special➞Gifted"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Religious",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Religious Acolyte",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble",
					skillPool: 6,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Bureaucracy",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Etiquette"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Tonsured",
						"Human Special➞Faithful"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Young Lady",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞3",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Noble",
					skillPool: 11,
					skills: [
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Etiquette",
						"Any General➞Dance",
						"Human Special➞Astrology",
						"Any General➞Musical Instrument",
						"Any General➞Composition",
						"Any General➞Field Dressing",
						"Any General➞Apothecary",
						"Any General➞Doctrine"
					],
					stock: "Human",
					traitPool: 2,
					traits: [

					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Knight",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞Professional Soldier➞Cavalryman"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Noble",
					skillPool: 10,
					skills: [
						"Any General➞Mounted Combat Training",
						"Any General➞Appropriate Weapons",
						"Any General➞Intimidation",
						"Any General➞Hunting",
						"Any General➞Conspicuous"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Sworn Homage"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Religious",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Lady",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady",
										"Human➞Noble Court➞Courtier",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Human➞City Dweller➞City Wife"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "Noble",
					skillPool: 11,
					skills: [
						"Any General➞Etiquette",
						"Any General➞Estate Management",
						"Any General➞Persuasion",
						"Any General➞Seduction",
						"Any General➞Inconspicuous",
						"Any General➞Doctrine",
						"Any Wise➞Husband-wise",
						"Any Wise➞Estate-wise",
						"Any Wise➞Staff-wise",
						"Any Wise➞Court-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 1,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Noble Court",
						"Human➞City Dweller"
					],
					mentalPool: 1,
					name: "Lord",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Trait➞Human Lifepath➞Your Lordship"
									]
								}
							]
						}
					},
					resources: 50,
					setting: "Noble",
					skillPool: 6,
					skills: [
						"Any General➞Hunting",
						"Any General➞Dance",
						"Any General➞Sing",
						"Any General➞Falconry",
						"Any General➞Estate Management"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Outcast",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Dame",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Lady",
										"Trait➞Human Lifepath➞Your Lordship",
										"Human➞City Dweller➞City Wife"
									]
								}
							]
						}
					},
					resources: 40,
					setting: "Noble",
					skillPool: 3,
					skills: [
						"Any General➞Estate Management",
						"Any Wise➞Noble-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 1,
					leads: [
						"Human➞Noble Court",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Baron",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Magnate",
										"Human➞Noble Court➞Master of Horses",
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞Noble➞Lord",
										"Human➞Noble Court➞Constable",
										"Human➞Noble Court➞Justiciar"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble➞Knight",
										"Trait➞Human Lifepath➞Your Lordship"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble Court➞Knight",
										"Trait➞Human Lifepath➞Your Lordship"
									]
								}
							]
						}
					},
					resources: 60,
					setting: "Noble",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Noblesse Oblige",
						"Any Character➞Regal Bearing",
						"Any Character➞Pompous",
						"Any Character➞Sharp Dresser",
						"Any Character➞Callous"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 2,
					leads: [
						"Human➞Noble Court",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Viscount",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Magnate",
										"Human➞Noble Court➞Constable",
										"Human➞Noble Court➞Justiciar",
										"Human➞Noble➞Baron"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble➞Knight",
										"Trait➞Human Lifepath➞Your Eminence"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble Court➞Knight",
										"Trait➞Human Lifepath➞Your Eminence"
									]
								}
							]
						}
					},
					resources: 65,
					setting: "Noble",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Noblesse Oblige",
						"Any Character➞Regal Bearing",
						"Any Character➞Pompous",
						"Any Character➞Sharp Dresser",
						"Any Character➞Callous"
					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 3,
					leads: [
						"Human➞Noble Court",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Count",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Magnate",
										"Human➞Noble Court➞Constable",
										"Human➞Noble Court➞Justiciar"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble➞Knight",
										"Trait➞Human Lifepath➞Your Eminence"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble Court➞Knight",
										"Trait➞Human Lifepath➞Your Eminence"
									]
								}
							]
						}
					},
					resources: 70,
					setting: "Noble",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Noblesse Oblige",
						"Any Character➞Regal Bearing",
						"Any Character➞Pompous",
						"Any Character➞Sharp Dresser",
						"Any Character➞Callous"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 3,
					leads: [
						"Human➞Noble Court",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Duke",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Count"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble➞Knight",
										"Trait➞Human Lifepath➞Your Grace"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble Court➞Knight",
										"Trait➞Human Lifepath➞Your Grace"
									]
								}
							]
						}
					},
					resources: 90,
					setting: "Noble",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Noblesse Oblige",
						"Any Character➞Regal Bearing",
						"Any Character➞Pompous",
						"Any Character➞Sharp Dresser",
						"Any Character➞Callous"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 4,
					leads: [
						"Human➞Noble Court",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Noble Prince",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Duke"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble➞Knight",
										"Trait➞Human Lifepath➞Your Grace"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble Court➞Knight",
										"Trait➞Human Lifepath➞Your Grace"
									]
								}
							]
						}
					},
					resources: 100,
					setting: "Noble",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Noblesse Oblige",
						"Any Character➞Regal Bearing",
						"Any Character➞Pompous",
						"Any Character➞Sharp Dresser",
						"Any Character➞Callous"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞Noble Court",
						"Human➞Professional Soldier",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Prince of the Blood",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Trait➞Human Lifepath➞Your Grace"
									]
								}
							]
						},
						"texts": [
							"Requires express permission from the GM and all players in the current game. Length of this lifepath is suject to GM's approval."
						]
					},
					resources: 60,
					setting: "Noble",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Born to be King",
						"Human Lifepath➞Noblesse Oblige",
						"Any Character➞Regal Bearing",
						"Any Character➞Pompous",
						"Any Character➞Sharp Dresser",
						"Any Character➞Callous"
					],
					years: [1, 20]
				}
			]
		},
		"Noble Court": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "Noble Court",
			short: "Court",
			stock: "Human",
			type: "Subsetting",
			lifepaths: [
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞College of Magic",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Apt Pupil",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞3",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Noble Court",
					skillPool: 3,
					skills: [
						"Any General➞Obscure History",
						"Any General➞Ugly Truth",
						"Any General➞Intimidation"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Believer",
						"Human Special➞Gifted",
						"Any Die➞Tainted Legacy"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Minstrel",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Poetry",
						"Any General➞Sing",
						"Any General➞Musical Instrument"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Recondite"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Court Jester",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble Court",
					skillPool: 7,
					skills: [
						"Any General➞Sing",
						"Any General➞Sleight of Hand",
						"Any General➞Climbing",
						"Any General➞Conspicuous",
						"Any General➞Throwing",
						"Any General➞Ugly Truth"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Scapegoat",
						"Any Call-on➞Aura of Innocence"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Court Artist",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble Court➞Court Jester",
										"Human➞City Dweller➞Painter",
										"Human➞Outcast➞Thinker",
										"Human➞City Dweller➞Scholar",
										"Human➞City Dweller➞Sculptor"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Sculpture",
						"Any General➞Painting",
						"Any General➞Engraving",
						"Any General➞Seduction",
						"Any Wise➞Genius-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Romantic"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Servant",
					physicalPool: 0,
					requirements: {
					},
					resources: 7,
					setting: "Noble Court",
					skillPool: 4,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Etiquette",
						"Any Wise➞Court Gossip-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Veneer of Obedience",
						"Human Lifepath➞Lifting Heavy Things",
						"Any Character➞Bored"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Nurse",
					physicalPool: 0,
					requirements: {
					},
					resources: 7,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Child-Rearing",
						"Any General➞Etiquette",
						"Any Wise➞Court Gossip-wise",
						"Any General➞Field Dressing",
						"Any Wise➞Child-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Maternal"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Groom",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Animal Husbandry",
						"Any General➞Riding",
						"Any General➞Mending",
						"Any Wise➞Border-wise",
						"Any Wise➞Road-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Gardener",
					physicalPool: 1,
					requirements: {
					},
					resources: 10,
					setting: "Noble Court",
					skillPool: 7,
					skills: [
						"Any Wise➞Plant-wise",
						"Any Wise➞Flower-wise",
						"Any Wise➞Tree-wise",
						"Any Wise➞Pest-wise",
						"Any General➞Herbalism",
						"Any General➞Farming",
						"Any General➞Almanac"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Earthy Smell",
						"Any Character➞Salt of the Earth",
						"Human Lifepath➞Down to Earth",
						"Any Die➞Affinity for Plants"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Torturer",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Interrogation",
						"Any General➞Torture",
						"Any General➞Anatomy",
						"Any Wise➞Torture Devices-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Unsavory Madman"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Noble Court",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Forester",
					physicalPool: 0,
					requirements: {
					},
					resources: 9,
					setting: "Noble Court",
					skillPool: 8,
					skills: [
						"Any General➞Observation",
						"Any General➞Orienteering",
						"Any General➞Foraging",
						"Any General➞Survival",
						"Any General➞Tracking",
						"Any General➞Trapper",
						"Any General➞Cudgel",
						"Any General➞Staff",
						"Any General➞Bow",
						"Any Wise➞Poacher-wise",
						"Any Wise➞Park-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Student",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble Court",
					skillPool: 9,
					skills: [
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Rule of Law",
						"Any General➞Oratory",
						"Any General➞Doctrine",
						"Any General➞Etiquette"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Dangerous",
						"Any Die➞Geometric"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Page",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble Court",
					skillPool: 6,
					skills: [
						"Any General➞Riding",
						"Any General➞Brawling",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Sword"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Man-at-Arms",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Page",
										"Human➞Noble Court➞Page",
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Setting➞Human➞Professional Soldier"
									]
								}
							]
						}
					},
					resources: 12,
					setting: "Noble Court",
					skillPool: 8,
					skills: [
						"Any General➞Mounted Combat Training",
						"Any General➞Shield Training",
						"Any General➞Armor Training",
						"Any General➞Brawling",
						"Any General➞Intimidation",
						"Any General➞Etiquette",
						"Any General➞Appropriate Weapons"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Falconer",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble Court",
					skillPool: 4,
					skills: [
						"Any General➞Falconry",
						"Any General➞Animal Husbandry",
						"Any General➞Hunting"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Boaster",
						"Any Character➞Weird",
						"Human Lifepath➞Birdie Talk"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Huntsman",
					physicalPool: 0,
					requirements: {
					},
					resources: 12,
					setting: "Noble Court",
					skillPool: 8,
					skills: [
						"Any General➞Hunting",
						"Any General➞Animal Husbandry",
						"Any Wise➞Forest-wise",
						"Any General➞Stealthy",
						"Any General➞Cooking",
						"Any General➞Tracking",
						"Any General➞Orienteering",
						"Any General➞Crossbow"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Herald",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Noble Court",
					skillPool: 4,
					skills: [
						"Any General➞Heraldry",
						"Any Wise➞Noble-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Formalist",
						"Any Die➞Rainman",
						"Any Die➞Eidetic Memory"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller"
					],
					mentalPool: 1,
					name: "Court Chef",
					physicalPool: 0,
					requirements: {
					},
					resources: 14,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Cooking",
						"Any General➞Sing",
						"Any General➞Herbalism",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Squire",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Corrupt Sergeant",
										"Human➞Villager➞Village Sergeant",
										"Human➞Professional Soldier➞Sergeant",
										"Human➞Professional Soldier➞Veteran",
										"Human➞Noble➞Page",
										"Human➞Noble Court➞Page",
										"Human➞Noble Court➞Man-at-Arms"
									]
								}
							]
						}
					},
					resources: 14,
					setting: "Noble Court",
					skillPool: 9,
					skills: [
						"Any General➞Sword",
						"Any General➞Shield Training",
						"Any General➞Armor Training",
						"Any General➞Lance",
						"Any General➞Brawling",
						"Any General➞Mounted Combat Training",
						"Any General➞Etiquette"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Pragmatic",
						"Any Die➞Tough",
						"Any Character➞Determined"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Young Lady",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞3",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "Noble Court",
					skillPool: 10,
					skills: [
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Etiquette",
						"Any General➞Poetry",
						"Human Special➞Astrology",
						"Any General➞Musical Instrument",
						"Any General➞Composition",
						"Any General➞Field Dressing",
						"Any General➞Apothecary",
						"Any Wise➞Court Gossip-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Noble Court",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Knight",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞Professional Soldier➞Cavalryman"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Noble Court",
					skillPool: 7,
					skills: [
						"Any General➞Conspicuous",
						"Any General➞Intimidation",
						"Any General➞Falconry",
						"Any General➞Appropriate Weapons"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Sworn Homage",
						"Any Character➞Sense of Entitlement"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Courtier",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Noble Court",
					skillPool: 8,
					skills: [
						"Any General➞Etiquette",
						"Any General➞Observation",
						"Any General➞Persuasion",
						"Any General➞Seduction",
						"Any General➞Inconspicuous",
						"Any Wise➞Court Gossip-wise",
						"Any Wise➞Noble-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Rapier Wit"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Governess",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble Court➞Nurse",
										"Human➞Peasant➞Midwife",
										"Human➞Noble➞Lady",
										"Human➞Villager➞Village Wife",
										"Human➞Peasant➞Country Wife",
										"Human➞City Dweller➞City Wife"
									]
								}
							]
						}
					},
					resources: 12,
					setting: "Noble Court",
					skillPool: 7,
					skills: [
						"Any Wise➞Family-wise",
						"Any General➞Administration",
						"Any General➞Intimidation",
						"Any General➞Etiquette",
						"Any General➞Persuasion",
						"Any General➞Ugly Truth"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Dismissive",
						"Any Character➞You Should Know Better than That!",
						"Any Character➞Bitter"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Religious",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Chaplain",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Military Order",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞Religious➞Archpriest",
										"Human➞City Dweller➞Temple Priest",
										"Human➞Outcast➞Heretic Priest",
										"Human➞Death Cult➞Death Priest",
										"Human➞Peasant➞Itinerant Priest",
										"Human➞Villager➞Village Priest",
										"Human➞Villager➞Venal Priest",
										"Human➞Noble Court➞Court Priest"
									]
								}
							]
						}
					},
					resources: 18,
					setting: "Noble Court",
					skillPool: 8,
					skills: [
						"Any General➞Oratory",
						"Any General➞Doctrine",
						"Any General➞Riding",
						"Any General➞Armor Training",
						"Any General➞Mounted Combat Training",
						"Any General➞Shield Training",
						"Any General➞Appropriate Weapons"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞College of Magic"
					],
					mentalPool: 1,
					name: "Court Sorcerer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Arcane Devotee",
										"Human➞Outcast➞Rogue Wizard",
										"Human➞City Dweller➞Sorcerer"
									]
								}
							]
						}
					},
					resources: 32,
					setting: "Noble Court",
					skillPool: 7,
					skills: [
						"Any General➞Etiquette",
						"Any General➞Falsehood",
						"Human Special➞Astrology",
						"Human Magical➞Alchemy",
						"Human Magical➞Sorcery"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Inscrutable",
						"Human Special➞Gifted",
						"Any Die➞Second Sight"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Court Lawyer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞City Dweller➞Advocate"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "Noble Court",
					skillPool: 6,
					skills: [
						"Any General➞Etiquette",
						"Any General➞Oratory",
						"Any General➞Persuasion",
						"Any General➞Amercement",
						"Any General➞History"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Rhetorical",
						"Any Character➞Evasive"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Court Doctor",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Religious➞Itinerant Monk",
										"Human➞Religious➞Cloistered Nun",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Noble Court",
					skillPool: 7,
					skills: [
						"Any General➞Etiquette",
						"Any General➞Apothecary",
						"Any General➞Bloodletting",
						"Any General➞Surgery",
						"Any General➞Anatomy",
						"Human Special➞Astrology",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Incomprehensible Diagnosis"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Chronicler",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Religious➞Custodian",
										"Human➞Religious➞Interpreter",
										"Human➞Religious➞Archivist",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble Court",
					skillPool: 6,
					skills: [
						"Any General➞Composition",
						"Any General➞History",
						"Any General➞Etiquette",
						"Any General➞Illuminations",
						"Any General➞Obscure History"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Prone to Exaggeration",
						"Any Character➞Flatterer",
						"Any Character➞Denouncer",
						"Any Character➞Cynical",
						"Any Character➞Righteous"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Armorer",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "Noble Court",
					skillPool: 9,
					skills: [
						"Any General➞Etching",
						"Any General➞Armorer",
						"Any General➞Blacksmith",
						"Any General➞Tanner",
						"Any General➞Sewing",
						"Any General➞Weaponsmith"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Proud"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Atilliator",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "Noble Court",
					skillPool: 6,
					skills: [
						"Any General➞Atilliator",
						"Any General➞Carpentry",
						"Any General➞Carving"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Professionally Diligent"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Court Priest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble Court➞Chaplain",
										"Human➞Professional Soldier➞Chaplain",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞Noble➞Religious Acolyte"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Etiquette",
						"Any General➞History",
						"Any General➞Symbology",
						"Any General➞Doctrine",
						"Any General➞Persuasion"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Royal Favorite",
						"Human Special➞Faithful"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Outcast",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Steward",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Town Official",
										"Human➞City Dweller➞Municipal Minister",
										"Human➞City Dweller➞Judge",
										"Human➞Noble Court➞Court Lawyer",
										"Human➞Noble Court➞Court Doctor",
										"Human➞Noble Court➞Governess",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady",
										"Human➞City Dweller➞Magnate",
										"Human➞Noble➞Lord"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble Court",
					skillPool: 6,
					skills: [
						"Any General➞Estate Management",
						"Any General➞Accounting",
						"Any General➞Observation",
						"Any Wise➞Manor-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 7
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Master of Horses",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Professional Soldier➞Captain",
										"Human➞Noble➞Baron",
										"Human➞City Dweller➞Saddler",
										"Human➞City Dweller➞Merchant",
										"Human➞Villager➞Merchant",
										"Human➞City Dweller➞Magnate"
									]
								}
							]
						}
					},
					resources: 40,
					setting: "Noble Court",
					skillPool: 4,
					skills: [
						"Any General➞Horse Husbandry",
						"Any General➞Appraisal",
						"Any Wise➞Horse-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Love of the Horse",
						"Any Die➞Low Speech",
						"Human Lifepath➞Affinity for Horses"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Master of Hounds",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Professional Soldier➞Captain",
										"Human➞Noble➞Baron",
										"Human➞City Dweller➞Saddler",
										"Human➞City Dweller➞Merchant",
										"Human➞Villager➞Merchant",
										"Human➞City Dweller➞Magnate"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Noble Court",
					skillPool: 7,
					skills: [
						"Any General➞Dog Husbandry",
						"Any Wise➞Dog-wise",
						"Any General➞Hunting",
						"Any General➞Instruction",
						"Any General➞Mimicry"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Dog Lover",
						"Any Character➞Pigpen",
						"Any Character➞Emotional",
						"Any Call-on➞Iron Stomach"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Professional Soldier",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Hostage",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Setting➞Human➞Noble"
									]
								}
							]
						}
					},
					resources: "*",
					setting: "Noble Court",
					skillPool: 4,
					skills: [
						"Any General➞Etiquette",
						"Any Wise➞Court-wise",
						"Any General➞Foreign Languages",
						"Any General➞Foreign History"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Homesick",
						"Any Character➞Bored",
						"Any Die➞Darling of the Court"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Bailiff",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Trait➞Human Lifepath➞Your Lordship"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble Court",
					skillPool: 7,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Interrogation",
						"Any General➞Rule of Law",
						"Any Wise➞Outlaw-wise",
						"Any Wise➞Village-wise",
						"Any Wise➞City-wise",
						"Any Wise➞Tax-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Nose for Trouble"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Religious",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Justiciar",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Judge",
										"Human➞Professional Soldier➞Captain",
										"Human➞Noble Court➞Bailiff",
										"Human➞Noble➞Lord"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble Court",
					skillPool: 6,
					skills: [
						"Any General➞Rule of Law",
						"Any General➞Amercement",
						"Any General➞Interrogation",
						"Any Wise➞Criminal-wise",
						"Any Wise➞Circuit-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Stern Demeanor",
						"Any Character➞Amenable to Other Options"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Coroner",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞Villager➞Town Official",
										"Human➞City Dweller➞Municipal Minister",
										"Human➞City Dweller➞Judge",
										"Human➞Noble Court➞Court Lawyer",
										"Human➞Noble Court➞Court Doctor",
										"Human➞City Dweller➞Magnate",
										"Human➞Noble➞Lord"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Rule of Law",
						"Any General➞Anatomy",
						"Any Wise➞Writ-wise",
						"Any General➞Observation"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Hard-Hearted",
						"Any Character➞Seen It All"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Constable",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Professional Soldier➞Captain",
										"Human➞Noble➞Baron",
										"Human➞Noble➞Viscount",
										"Human➞Noble➞Count",
										"Human➞Noble➞Duke"
									]
								}
							]
						}
					},
					resources: 50,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Command",
						"Any General➞Heraldry",
						"Any General➞Logistics",
						"Any Wise➞Kingdom-wise",
						"Any Wise➞Obligation-wise",
						"Any Wise➞Soldier-wise",
						"Any Wise➞Cavalry-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Weight of the World"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Treasurer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞Villager➞Town Official",
										"Human➞City Dweller➞Municipal Minister",
										"Human➞City Dweller➞Judge",
										"Human➞Noble Court➞Court Lawyer",
										"Human➞Noble Court➞Court Doctor",
										"Human➞City Dweller➞Magnate",
										"Human➞Noble➞Baron",
										"Human➞City Dweller➞Bishop",
										"Human➞Religious➞Bishop",
										"Human➞Noble➞Viscount",
										"Human➞Noble➞Count",
										"Human➞Noble➞Duke"
									]
								}
							]
						}
					},
					resources: 45,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Accounting",
						"Any General➞Estate Management",
						"Any Wise➞Tax-wise",
						"Any Wise➞Debt-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Pecunious",
						"Any Character➞Lavish Taste"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 1,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Chamberlain",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Scholar",
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞Villager➞Town Official",
										"Human➞City Dweller➞Municipal Minister",
										"Human➞City Dweller➞Judge",
										"Human➞Noble Court➞Court Lawyer",
										"Human➞Noble Court➞Court Doctor",
										"Human➞City Dweller➞Magnate",
										"Human➞Noble➞Baron",
										"Human➞City Dweller➞Bishop",
										"Human➞Religious➞Bishop",
										"Human➞Noble➞Viscount",
										"Human➞Noble➞Count",
										"Human➞Noble➞Duke"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Soothing Platitudes",
						"Any General➞Persuasion",
						"Any General➞Ugly Truth"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Die➞Power Behind the Throne"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: "1/yr",
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Noble",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Advisor to the Court",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Thinker",
										"Human➞Professional Soldier➞Captain",
										"Human➞City Dweller➞Magnate",
										"Human➞City Dweller➞Master Craftsman",
										"Human➞Villager➞Master Craftsman",
										"Human➞City Dweller➞Artisan",
										"Human➞City Dweller➞Bishop",
										"Human➞Religious➞Bishop",
										"Human➞Outcast➞Rogue Wizard",
										"Human➞Outcast➞Mad Summoner",
										"Human➞Outcast➞Heretic Priest",
										"Human➞Noble➞Dame",
										"Human➞Noble➞Baron",
										"Human➞Noble➞Viscount",
										"Human➞Noble➞Count",
										"Human➞Noble➞Duke",
										"Human➞Noble➞Prince of the Blood",
										"Human➞Noble➞Noble Prince"
									]
								}
							]
						}
					},
					resources: "10/yr",
					setting: "Noble Court",
					skillPool: 1,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: [1, 3]
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞College of Magic"
					],
					mentalPool: 1,
					name: "Court Enchanter",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Senior Student",
										"Human➞City Dweller➞Neophyte Sorcerer",
										"Human➞Noble Court➞Apt Pupil",
										"Human➞Outcast➞Apt Pupil",
										"Human➞Professional Soldier➞Apt Pupil",
										"Human➞Religious➞Apt Pupil",
										"Human➞Villager➞Wizard's Apprentice"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Noble Court",
					skillPool: 5,
					skills: [
						"Any General➞Etiquette",
						"Human Special➞Astrology",
						"Human Magical➞Alchemy",
						"Human Magical➞Enchanting",
						"Any Wise➞Excuses-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Late",
						"Human Special➞Harried"
					],
					years: 8
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞College of Magic"
					],
					mentalPool: 0,
					name: "Court Summoner",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞College of Magic➞Senior Student",
										"Human➞Outcast➞Mad Summoner",
										"Human➞Noble Court➞Apt Pupil",
										"Human➞Outcast➞Apt Pupil",
										"Human➞Professional Soldier➞Apt Pupil",
										"Human➞Religious➞Apt Pupil",
										"Human➞Villager➞Wizard's Apprentice"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "Noble Court",
					skillPool: 6,
					skills: [
						"Any General➞Etiquette",
						"Human Special➞Astrology",
						"Human Magical➞Summoning",
						"Human Magical➞Circination",
						"Human Magical➞Bargaining",
						"Any Wise➞Inane Requst-wise",
						"Any Wise➞Promise-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Dismissive",
						"Human Special➞Polite",
						"Any Character➞Arrogant",
						"Any Character➞Frustrated",
						"Human Special➞Faust"
					],
					years: 8
				}
			]
		},
		"Outcast": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "Outcast",
			short: "Outcast",
			stock: "Human",
			type: "Subsetting",
			lifepaths: [
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞College of Magic",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Apt Pupil",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Outcast",
					skillPool: 3,
					skills: [
						"Any General➞Obscure History",
						"Any General➞Ugly Truth",
						"Any General➞Intimidation"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Believer",
						"Human Special➞Gifted",
						"Any Die➞Tainted Legacy"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Urchin",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 3,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Streetwise",
						"Any General➞Sleight of Hand"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Addicted",
						"Human Lifepath➞The Story"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Apostate",
					physicalPool: 0,
					requirements: {
					},
					resources: 6,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Heretical Doctrine",
						"Any General➞Foreign Doctrine"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Apostate"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Villager",
						"Human➞Seafaring"
					],
					mentalPool: 1,
					name: "Blackmailer",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any General➞Extortion",
						"Any General➞Forgery",
						"Any General➞Ugly Truth",
						"Any General➞Falsehood",
						"Any Wise➞Bribe-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Cold Hearted"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Villager",
						"Human➞Seafaring"
					],
					mentalPool: 1,
					name: "Kidnapper",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any General➞Interrogation",
						"Any General➞Torture",
						"Any General➞Intimidation",
						"Any Wise➞Ransom-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Hard-Hearted"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Seafaring",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Pillager",
					physicalPool: 0,
					requirements: {
					},
					resources: 7,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any General➞Scavenging",
						"Any General➞Foraging",
						"Any Wise➞Army-wise",
						"Any Wise➞Battle-wise",
						"Any General➞Haggling"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Vagrant",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any Wise➞Road-wise",
						"Any Wise➞Hostel-wise",
						"Any Wise➞Hospital-wise",
						"Any General➞Inconspicuous"
					],
					stock: "Human",
					traitPool: 2,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞City Dweller",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Cripple",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Any General➞Beggardry",
						"Any General➞Inconspicuous",
						"Any General➞Conspicuous"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Die➞Lame",
						"Any Die➞Missing Limb"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Poacher",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Any Wise➞Royal Parks-wise",
						"Any General➞Hunting",
						"Any General➞Stealthy",
						"Any General➞Tracking",
						"Any General➞Orienteering"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Deranged",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Outcast",
					skillPool: 3,
					skills: [
						"Any General➞Inconspicuous",
						"Any Wise➞Quack-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Sick",
						"Any Die➞Phobia",
						"Any Character➞Lunatic",
						"Any Call-on➞Linguist",
						"Human Lifepath➞Possessed"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Seafaring"
					],
					mentalPool: 0,
					name: "Outlaw",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any Wise➞Authority-wise",
						"Any General➞Inconspicuous",
						"Any General➞Conspicuous"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Outlaw"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Fence",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Shopkeeper",
										"Human➞Villager➞Shopkeeper",
										"Human➞City Dweller➞Barkeep",
										"Human➞City Dweller➞Moneylender",
										"Human➞City Dweller➞Coin Clipper",
										"Human➞City Dweller➞Pickpocket",
										"Human➞City Dweller➞Street Thug",
										"Human➞City Dweller➞Criminal",
										"Human➞City Dweller➞Confidence Man",
										"Setting➞Human➞Outcast"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Any General➞Appraisal",
						"Any General➞Haggling",
						"Any General➞Inconspicuous",
						"Any General➞Streetwise",
						"Any Wise➞Guard-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Shrewd"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Gravedigger",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Any General➞Ditch Digging",
						"Any General➞Philosophy",
						"Any Wise➞Grave-wise",
						"Any Wise➞Cemetary-wise",
						"Any Wise➞Bone-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Bitter"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [

					],
					mentalPool: 0,
					name: "Ratcatcher",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any General➞Trapper",
						"Any General➞Poisons",
						"Any General➞Ratiquette"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Diseased",
						"Human Lifepath➞Rat-Speak"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Beggar",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Conspicuous",
						"Any General➞Streetwise",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞The Story"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: -1,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Peasant",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Leper",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any General➞Inconspicuous",
						"Any Wise➞Hospital-wise",
						"Any Wise➞Priest-wise",
						"Any Wise➞Pilgrim-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Leprosy",
						"Any Character➞Unbeliever",
						"Any Character➞White-Gold Wielder"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Prostitute",
					physicalPool: 0,
					requirements: {
					},
					resources: 6,
					setting: "Outcast",
					skillPool: 3,
					skills: [
						"Any General➞Conspicuous",
						"Any General➞Inconspicuous",
						"Any General➞Persuasion",
						"Any General➞Falsehood",
						"Any General➞Haggling",
						"Any General➞Soothing Platitudes"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Tolerant"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Whoremonger",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Venal Priest",
										"Human➞City Dweller➞Shopkeeper",
										"Human➞Villager➞Shopkeeper",
										"Human➞City Dweller➞Barkeep",
										"Human➞City Dweller➞Moneylender",
										"Human➞City Dweller➞Coin Clipper",
										"Human➞City Dweller➞Pickpocket",
										"Human➞City Dweller➞Street Thug",
										"Human➞City Dweller➞Criminal",
										"Human➞City Dweller➞Confidence Man",
										"Setting➞Human➞Outcast"
									]
								}
							]
						}
					},
					resources: 12,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Haggling",
						"Any Wise➞Prostitute-wise",
						"Any Wise➞City-wise",
						"Any Wise➞Guard-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Itinerant Performer",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 8,
					skills: [
						"Any General➞Cooking",
						"Any General➞Sewing",
						"Any General➞Acting",
						"Any General➞Sleight of Hand",
						"Any General➞Haggling",
						"Any General➞Mending",
						"Any General➞Disguise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Odd"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Insurrectionist",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any General➞Philosophy",
						"Any General➞Rule of Law",
						"Any General➞Doctrine",
						"Any General➞Oratory",
						"Human Special➞Arson"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Zealot"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Cultist",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any General➞Cult Doctrine",
						"Any General➞Inconspicuous",
						"Any General➞Conspicuous",
						"Any General➞Falsehood",
						"Any General➞Persuasion"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Zealot",
						"Any Character➞Rabble-Rouser",
						"Any Character➞Speaker of the Secret Language"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Poisoner",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any General➞Poisons",
						"Any General➞Cooking",
						"Any General➞Inconspicuous",
						"Any General➞Disguise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Off-Kilter"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Thug",
					physicalPool: 0,
					requirements: {
					},
					resources: 7,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any General➞Streetwise",
						"Any Wise➞Murder-wise",
						"Any Wise➞Guard-wise",
						"Any General➞Brawling"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Die➞Cold Blooded",
						"Any Die➞Jaded"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Desperate Killer",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any General➞Appropriate Weapons",
						"Any General➞Inconspicuous",
						"Any Wise➞Assassination-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Desperate",
						"Any Character➞Murderous",
						"Human Lifepath➞Cold Hearted",
						"Human Lifepath➞Hard-Hearted"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Bandit",
					physicalPool: 1,
					requirements: {
					},
					resources: 7,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Any General➞Appropriate Weapons",
						"Any General➞Intimidation",
						"Any General➞Stealthy",
						"Any Wise➞Caravan-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Seafaring",
						"Human➞City Dweller",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Pirate",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Any Wise➞Pirate Cove-wise",
						"Any General➞Rigging",
						"Any General➞Knots",
						"Any General➞Knives",
						"Any Wise➞Sea-wise",
						"Any Wise➞Map-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Problem with Authority",
						"Any Character➞Scurvy",
						"Human Lifepath➞Maimed",
						"Human Lifepath➞Crippled",
						"Any Die➞Lame"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Smuggler",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Any General➞Persuasion",
						"Any General➞Falsehood",
						"Any General➞Appraisal",
						"Any Wise➞Law-wise",
						"Any General➞Forgery",
						"Any General➞Stealthy",
						"Any General➞Inconspicuous"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Paranoid"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Freebooter",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Bandit",
										"Human➞Outcast➞Smuggler",
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Human➞City Dweller➞City Guard",
										"Human➞Villager➞Village Tough",
										"Human➞Seafaring➞Marine",
										"Setting➞Human➞Professional Soldier"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Outcast",
					skillPool: 8,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Appropriate Weapons",
						"Any Wise➞Countryside-wise",
						"Any Wise➞Fortress-wise",
						"Any Wise➞Mercenary Company-wise",
						"Any General➞Foreign Languages",
						"Any Wise➞War-wise",
						"Any Wise➞Loot-wise",
						"Any Wise➞Extortion-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Die➞Cold Blooded",
						"Any Character➞Merciless"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Peasant",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Strider",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Born Noble",
										"Human➞Peasant➞Hunter",
										"Human➞Peasant➞Trapper",
										"Human➞Noble Court➞Huntsman",
										"Human➞Professional Soldier➞Scout"
									]
								}
							]
						}
					},
					resources: 6,
					setting: "Outcast",
					skillPool: 9,
					skills: [
						"Any Wise➞Forest-wise",
						"Any Wise➞Desert-wise",
						"Any General➞Orienteering",
						"Any General➞Foraging",
						"Any General➞Tracking",
						"Any General➞Firebuilding",
						"Any General➞Riding",
						"Any General➞Stealthy",
						"Any General➞Appropriate Weapons"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Loner"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞City Dweller",
						"Human➞Seafaring"
					],
					mentalPool: 0,
					name: "Mad Summoner",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Cultist",
										"Human➞Peasant➞Augur",
										"Human➞Villager➞Wizard's Apprentice",
										"Human➞City Dweller➞Neophyte Sorcerer",
										"Human➞Noble➞Arcane Devotee"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Human Magical➞Summoning",
						"Human Magical➞Enchanting",
						"Any General➞Demonology",
						"Any General➞Empyrealia"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Mad",
						"Any Character➞Fear of Cheese",
						"Any Character➞Fear of Wet Noises",
						"Any Character➞Alarming"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Seafaring",
						"Human➞Religious",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Rogue Wizard",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Cultist",
										"Human➞Peasant➞Augur",
										"Human➞Villager➞Wizard's Apprentice",
										"Human➞City Dweller➞Neophyte Sorcerer",
										"Human➞Noble➞Arcane Devotee"
									]
								}
							]
						}
					},
					resources: 24,
					setting: "Outcast",
					skillPool: 8,
					skills: [
						"Human Magical➞Sorcery",
						"Any General➞Inconspicuous",
						"Any Wise➞Graveyard-wise",
						"Human Special➞Astrology",
						"Any General➞Bloodletting",
						"Any General➞Ugly Truth",
						"Any Wise➞Apocalypse-wise",
						"Human Magical➞Enchanting",
						"Human Magical➞Alchemy"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Spooky",
						"Any Die➞Aura of Fear",
						"Any Die➞Obscure Aura"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Crazy Witch",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Seafaring➞Weather Witch",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady",
										"Human➞Peasant➞Augur",
										"Human➞Peasant➞Midwife"
									]
								}
							]
						}
					},
					resources: 6,
					setting: "Outcast",
					skillPool: 5,
					skills: [
						"Any General➞Folklore",
						"Any General➞Herbalism",
						"Any General➞Poisons",
						"Human Magical➞Summoning",
						"Any Wise➞Profanity-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞A Little Crazy",
						"Human Special➞Gifted",
						"Any Character➞Mark of the Beast"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Heretic Priest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Temple Acolyte",
										"Human➞Villager➞Acolyte",
										"Human➞Outcast➞Cultist",
										"Human➞Outcast➞Apostate",
										"Human➞Religious➞Theologian",
										"Human➞Villager➞Venal Priest",
										"Human➞Religious➞Interpreter",
										"Human➞Religious➞Archivist"
									]
								}
							]
						}
					},
					resources: 6,
					setting: "Outcast",
					skillPool: 7,
					skills: [
						"Any General➞Heretical Doctrine",
						"Any General➞Oratory",
						"Any Wise➞Apostate-wise",
						"Any General➞Demonology",
						"Any Wise➞Summoner-wise",
						"Any Wise➞Cultist-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Lunatic",
						"Any Character➞Overbearing Loony",
						"Human Lifepath➞Faith in Dead Gods"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 1,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Noble",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Thinker",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"YEARS➞MIN➞36"
									]
								}
							]
						}
					},
					resources: 5,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Any General➞Philosophy",
						"Any General➞Strategy",
						"Any General➞Strategy Games",
						"Any General➞Calligraphy",
						"Any General➞History",
						"Any General➞Painting"
					],
					stock: "Human",
					traitPool: 2,
					traits: [

					],
					years: 15
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Demented Inventor",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Rogue Wizard",
										"Human➞Noble Court➞Apt Pupil",
										"Human➞Outcast➞Apt Pupil",
										"Human➞Professional Soldier➞Apt Pupil",
										"Human➞Religious➞Apt Pupil",
										"Human➞Villager➞Wizard's Apprentice"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Outcast",
					skillPool: 6,
					skills: [
						"Any Wise➞Mad Invention-wise",
						"Any General➞Mending",
						"Human Magical➞Enchanting",
						"Any General➞Blacksmith",
						"Any General➞Whitesmith"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Demented",
						"Dwarf Lifepath➞Tinkerer"
					],
					years: 7
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Evil Necromancer",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble Court➞Coroner",
										"Human➞Death Cult➞Death Cultist",
										"Human➞Outcast➞Cultist",
										"Human➞Noble Court➞Apt Pupil",
										"Human➞Outcast➞Apt Pupil",
										"Human➞Professional Soldier➞Apt Pupil",
										"Human➞Religious➞Apt Pupil"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Outcast",
					skillPool: 4,
					skills: [
						"Human Magical➞Death Art",
						"Any General➞Anatomy",
						"Any Wise➞Graveyard-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Corrupted",
						"Human Special➞Evil"
					],
					years: 10
				},
				{
					name: "Neophyte Sorcerer",
					born: false,
					years: 6,
					resources: 12,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 1,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier",
						"Human➞College of Magic"
					],
					skills: [
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Symbology",
						"Human Magical➞Sorcery",
						"Any General➞Research"
					],
					traits: [
						"Any Character➞Lust for Power",
						"Any Character➞Bitter",
						"Human Special➞Gifted"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Defiler",
					born: false,
					years: 5,
					resources: 32,
					mentalPool: 1,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Professional Soldier"
					],
					skills: [
						"Human Magical➞Sorcery",
						"Human Magical➞Enchanting",
						"Any General➞Intimidation",
						"Any Wise➞Fertile Land-wise"
					],
					traits: [
						"Human Lifepath➞Ashen Stink",
						"Any Character➞Addicted to Power",
						"Human Lifepath➞Willfully Destructive",
						"Any Character➞Mad"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Neophyte Sorcerer"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Preserver",
					born: false,
					years: 7,
					resources: 28,
					mentalPool: 1,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Professional Soldier"
					],
					skills: [
						"Human Magical➞Sorcery",
						"Human Magical➞Enchanting",
						"Any Wise➞Defiler-wise",
						"Any General➞Inconspicuous"
					],
					traits: [
						"Any Character➞Frugal"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Neophyte Sorcerer"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Desert Hermit",
					born: false,
					years: 6,
					resources: 4,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 3,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞Nomad"
					],
					skills: [
						"Any Wise➞Desert-wise",
						"Any General➞Survival",
						"Any General➞Meditation",
						"Any Wise➞Mountain-wise",
						"Any General➞Philosophy"
					],
					traits: [
						"Any Character➞Sun-Crazed",
						"Any Die➞Pickled",
						"Any Die➞Weather Sense"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Oasis Witch",
					born: false,
					years: 5,
					resources: 20,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [

					],
					skills: [
						"Any Wise➞Oasis-wise",
						"Any Wise➞Superstition-wise",
						"Human Special➞Astrology",
						"Any Wise➞Desert-wise",
						"Human Magical➞Spirit Binding"
					],
					traits: [
						"Any Die➞Weather Sense"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Bandit Lord",
					born: false,
					years: 6,
					resources: 15,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Servitude and Captive",
						"Human➞Nomad"
					],
					skills: [
						"Any General➞Intimidation",
						"Any General➞Command",
						"Any General➞Orienteering",
						"Any Wise➞Bandit-wise",
						"Any Wise➞Caravan-wise",
						"Any General➞Appropriate Weapons",
						"Any Wise➞Defiler-wise",
						"Any Wise➞Duststorm-wise"
					],
					traits: [
						"Any Character➞Brutal",
						"Any Character➞Sadistic",
						"Any Character➞Bitter",
						"Any Die➞Scheming"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Freebooter",
										"Human➞Outcast➞Ravager",
										"Human➞Outcast➞Bandit",
										"Human➞Nomad➞Bandit",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Human➞Professional Soldier➞Captain",
										"Human➞Villager➞Village Sergeant",
										"Human➞Villager➞Corrupt Sergeant",
										"Human➞Professional Soldier➞Sergeant"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Scavenger",
					born: false,
					years: 4,
					resources: 3,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Scavenging",
						"Any Wise➞Ruins-wise",
						"Any Wise➞Waste-wise",
						"Any General➞Survival",
						"Any General➞Brawling"
					],
					traits: [
						"Any Character➞Misanthropic",
						"Any Character➞Scavenger",
						"Any Character➞Obsessed",
						"Any Character➞Nasty Cough"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Monster Hunter",
					born: false,
					years: 4,
					resources: 6,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Noble Court"
					],
					skills: [
						"Any Wise➞Fell Beast-wise",
						"Any Wise➞Unspeakable Horror-wise",
						"Any General➞Appropriate Weapons",
						"Any General➞Stealthy",
						"Any Wise➞Ruins-wise",
						"Any General➞Hunting",
						"Any General➞Survival"
					],
					traits: [
						"Any Character➞Disturbingly Confident",
						"Any Die➞Fearless",
						"Any Die➞Light Sleeper",
						"Any Character➞Hearty",
						"Any Character➞Mad"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Bandit Hunter",
										"Human➞Peasant➞Hunter",
										"Human➞Peasant➞Hunter",
										"Human➞Nomad➞Hunter",
										"Human➞Servitude and Captive➞Champion",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Setting➞Human➞Professional Soldier"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Ravager",
					born: false,
					years: 6,
					resources: 25,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Nomad",
						"Human➞Villager"
					],
					skills: [
						"Any General➞Intimidation",
						"Any General➞Command",
						"Any General➞Extortion",
						"Any Wise➞Tribute-wise"
					],
					traits: [
						"Human Lifepath➞Swath of Destruction",
						"Any Character➞Paranoid",
						"Any Character➞Complacent",
						"Any Die➞Aura of Fear"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Defiler"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				},
				{
					name: "Bonecaster",
					born: false,
					years: 10,
					resources: 20,
					mentalPool: 1,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 3,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Nomad"
					],
					skills: [
						"Any Wise➞Bone-wise",
						"Human Magical➞Death Art",
						"Any General➞Folklore",
						"Any General➞Symbology",
						"Any General➞Obscure History",
						"Human Special➞Astrology",
						"Any Wise➞Omen-wise"
					],
					traits: [
						"Any Character➞Flint-Eyed",
						"Any Character➞Lunatic",
						"Any Character➞Mind Over Matter",
						"Any Die➞Penetrating Gaze"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Rogue Wizard",
										"Human➞Nomad➞Shaman"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Outcast",
					allowed: [
						"bs"
					]
				}
			]
		},
		"Peasant": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "Peasant",
			short: "Peasant",
			stock: "Human",
			type: "Setting",
			lifepaths: [
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 3,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Seafaring",
						"Human➞Religious",
						"Human➞College of Magic"
					],
					mentalPool: 0,
					name: "Born Peasant",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Peasant",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 2,
					traits: [

					],
					years: 8
				},
				{
					allowed: [
						"bwc"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Gifted Child",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Peasant",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Misunderstood",
						"Human Special➞Gifted",
						"Any Character➞Abused",
						"Human Special➞Spirit Familiar"
					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Farmer",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MIN➞3"
									]
								}
							]
						}
					},
					resources: 5,
					setting: "Peasant",
					skillPool: 8,
					skills: [
						"Any General➞Farming",
						"Any General➞Mending",
						"Any General➞Animal Husbandry",
						"Any General➞Weaving",
						"Any General➞Cooking",
						"Any General➞Sewing",
						"Any General➞Firebuilding",
						"Any General➞Sing"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Hoarding"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Head of Household",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Peasant➞Farmer",
										"Human➞Peasant➞Itinerant Priest"
									]
								},
								{
									type: "AND",
									items: [
										"GENDER➞FEMALE"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Peasant",
					skillPool: 8,
					skills: [
						"Any General➞Carpentry",
						"Any General➞Hunting",
						"Any General➞Haggling",
						"Any General➞Almanac"
					],
					stock: "Human",
					traitPool: 2,
					traits: [

					],
					years: 15
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Midwife",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Peasant➞Augur",
										"Human➞Peasant➞Midwife",
										"Human➞Peasant➞Country Wife",
										"Human➞Villager➞Serving Girl",
										"Human➞Villager➞Village Wife",
										"Human➞City Dweller➞Alewife",
										"Human➞City Dweller➞City Wife",
										"Human➞Noble➞Young Lady",
										"Human➞Noble➞Lady",
										"Human➞Noble➞Dame",
										"Human➞Noble Court➞Nurse",
										"Human➞Noble Court➞Young Lady",
										"Human➞Noble Court➞Governess",
										"Human➞Religious➞Cloistered Nun",
										"Human➞Religious➞Abbot/Abbess",
										"Human➞Outcast➞Crazy Witch",
										"Human➞Outcast➞Oasis Witch",
										"Human➞Peasant➞Farmer",
										"Human➞Peasant➞Itinerant Priest"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Peasant",
					skillPool: 7,
					skills: [
						"Any General➞Animal Husbandry",
						"Any General➞Herbalism",
						"Any General➞Midwifery",
						"Any Wise➞Omen-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Bedside Manner"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Lazy Stayabout",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Peasant",
					skillPool: 3,
					skills: [
						"Any Wise➞Lazy-wise",
						"Any Wise➞Peasant-wise",
						"Any Wise➞Wife-wise",
						"Any Wise➞Work-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞A Little Fat"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Conscript",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Peasant",
					skillPool: 2,
					skills: [
						"Any General➞Foraging",
						"Any Wise➞Battle-wise",
						"Any Wise➞Rumor-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Flee from Battle"
					],
					years: 1
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Peasant Pilgrim",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Peasant",
					skillPool: 3,
					skills: [
						"Any General➞Doctrine",
						"Any Wise➞Pilgrimage-wise",
						"Any Wise➞Saint-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Road Weary",
						"Any Character➞Alms-Taker"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Miller",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Peasant",
					skillPool: 5,
					skills: [
						"Any General➞Miller",
						"Any General➞Brewer",
						"Any General➞Mending",
						"Any General➞Carpentry"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Lord's Favorite"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier",
						"Human➞Seafaring"
					],
					mentalPool: 0,
					name: "Fisherman",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "Peasant",
					skillPool: 6,
					skills: [
						"Any General➞Fishing",
						"Any General➞Rigging",
						"Any General➞Knots",
						"Any General➞Mending",
						"Any General➞Cooking",
						"Any General➞Boatwright"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Superstitious"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Shepherd",
					physicalPool: 1,
					requirements: {
					},
					resources: 4,
					setting: "Peasant",
					skillPool: 5,
					skills: [
						"Any General➞Animal Husbandry",
						"Any General➞Sing",
						"Any General➞Climbing",
						"Any General➞Flute",
						"Any General➞Throwing"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Cry Wolf"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Woodcutter",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "Peasant",
					skillPool: 5,
					skills: [
						"Any General➞Firebuilding",
						"Any General➞Mending",
						"Any General➞Foraging",
						"Any General➞Orienteering",
						"Any Wise➞Tree-wise",
						"Any General➞Tree Cutting"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Hunter",
					physicalPool: 1,
					requirements: {
					},
					resources: 6,
					setting: "Peasant",
					skillPool: 7,
					skills: [
						"Any General➞Hunting",
						"Any General➞Tracking",
						"Any General➞Stealthy",
						"Any General➞Cooking",
						"Any General➞Orienteering",
						"Any General➞Javelin or Bow"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Trapper",
					physicalPool: 1,
					requirements: {
					},
					resources: 8,
					setting: "Peasant",
					skillPool: 6,
					skills: [
						"Any General➞Trapper",
						"Any General➞Stealthy",
						"Any General➞Tracking",
						"Any General➞Cooking",
						"Any General➞Haggling",
						"Any General➞Taxidermy"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Foul Smelling"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Peddler",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Peasant",
					skillPool: 7,
					skills: [
						"Any General➞Mending",
						"Any General➞Sing",
						"Any General➞Haggling",
						"Any General➞Chandler",
						"Any General➞Persuasion",
						"Any General➞Inconspicuous",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Die➞Blank Stare",
						"Any Call-on➞Glib",
						"Any Die➞Eidetic Memory"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Elder",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"YEARS➞MIN➞50"
									]
								}
							]
						}
					},
					resources: 5,
					setting: "Peasant",
					skillPool: 6,
					skills: [
						"Any General➞Observation",
						"Any General➞Persuasion",
						"Any General➞Ugly Truth",
						"Any Wise➞Peasant-wise",
						"Any General➞Local History"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Crotchety"
					],
					years: 15
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Augur",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Peasant➞Midwife",
										"Human➞Peasant➞Country Wife"
									]
								},
								{
									type: "AND",
									items: [
										"GENDER➞FEMALE",
										"LP➞MAX➞4"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Peasant",
					skillPool: 4,
					skills: [
						"Human Special➞Astrology",
						"Human Magical➞Sorcery",
						"Any General➞Falsehood",
						"Any General➞Ugly Truth",
						"Any Wise➞Omen-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Disturbed",
						"Any Die➞Dreamer",
						"Any Character➞Cassandra",
						"Any Die➞Touch of Ages"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞City Dweller"
					],
					mentalPool: 1,
					name: "Itinerant Priest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Acolyte",
										"Human➞Villager➞Failed Acolyte",
										"Human➞City Dweller➞Temple Acolyte",
										"Human➞Noble➞Religious Acolyte",
										"Human➞Religious➞Temple Acolyte"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Peasant",
					skillPool: 7,
					skills: [
						"Any General➞Oratory",
						"Any General➞Suasion",
						"Any General➞Chandler",
						"Any General➞Riding",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Doctrine"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Dusty",
						"Human Special➞Faithful"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Recluse Wizard",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Skill➞Human Magical➞Sorcery"
									]
								}
							]
						}
					},
					resources: 28,
					setting: "Peasant",
					skillPool: 7,
					skills: [
						"Human Special➞Astrology",
						"Human Magical➞Alchemy",
						"Human Magical➞Enchanting",
						"Any General➞Illuminations",
						"Any General➞Ancient History",
						"Any General➞Obscure History"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Batshit",
						"Human Special➞Gifted"
					],
					years: 15
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Religious"
					],
					mentalPool: 1,
					name: "Country Wife",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "Peasant",
					skillPool: 2,
					skills: [
						"Any General➞Child-Rearing",
						"Any General➞Cooking"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 10
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Villager"
					],
					mentalPool: 1,
					name: "Speaker of Names",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Peasant➞Augur",
										"Human➞Outcast➞Crazy Witch",
										"Human➞Outcast➞Oasis Witch",
										"Human➞City Dweller➞Neophyte Sorcerer",
										"Human➞Villager➞Wizard's Apprentice",
										"Human➞Peasant➞Elder"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Peasant",
					skillPool: 6,
					skills: [
						"Human Magical➞Spirit Binding",
						"Human Magical➞Circination",
						"Any Wise➞Paths-wise",
						"Any Wise➞Spirit-wise",
						"Any Wise➞Domain-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Well Traveled",
						"Human Special➞Brook No Fools",
						"Any Die➞Fey Blood"
					],
					years: 7
				}
			]
		},
		"Professional Soldier": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "Professional Soldier",
			short: "Soldier",
			stock: "Human",
			type: "Subsetting",
			lifepaths: [
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞College of Magic",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Apt Pupil",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞3",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Professional Soldier",
					skillPool: 3,
					skills: [
						"Any General➞Obscure History",
						"Any General➞Ugly Truth",
						"Any General➞Intimidation"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Believer",
						"Human Special➞Gifted",
						"Any Die➞Tainted Legacy"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Runner",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "Professional Soldier",
					skillPool: 4,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Stealthy",
						"Any General➞Sing"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Skinny",
						"Any Call-on➞Fleet of Foot",
						"Any Die➞Sprinter"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Apprentice",
					physicalPool: 1,
					requirements: {
					},
					resources: 6,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Mending",
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Hauling",
						"Any General➞Driving",
						"Any General➞Ditch Digging"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Exhausted",
						"Human Lifepath➞Back-Breaking Labor"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Musician",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Professional Soldier",
					skillPool: 4,
					skills: [
						"Any General➞Musical Instrument",
						"Any General➞Conspicuous",
						"Any General➞Riding"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Foot Soldier",
					physicalPool: 1,
					requirements: {
					},
					resources: 6,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Soldiering",
						"Any General➞Appropriate Weapons",
						"Any General➞Shield Training",
						"Any General➞Brawling",
						"Any General➞Foraging",
						"Any General➞Firebuilding"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Archer",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "Professional Soldier",
					skillPool: 5,
					skills: [
						"Any General➞Bow",
						"Any General➞Fletcher",
						"Any General➞Brawling",
						"Any General➞Foraging",
						"Any General➞Firebuilding"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Crossbowman",
					physicalPool: 1,
					requirements: {
					},
					resources: 8,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Crossbow",
						"Any General➞Fletcher",
						"Any General➞Brawling",
						"Any General➞Foraging",
						"Any General➞Soldiering"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Seafaring",
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Sailor",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Seamanship",
						"Any General➞Rigging",
						"Any General➞Knots",
						"Any General➞Mending",
						"Any General➞Navigation",
						"Any General➞Knives",
						"Any General➞Sword"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Call-on➞Iron Stomach",
						"Any Call-on➞Sea Legs",
						"Any Die➞Affinity for Rope"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Herald",
					physicalPool: 0,
					requirements: {
					},
					resources: 7,
					setting: "Professional Soldier",
					skillPool: 4,
					skills: [
						"Any General➞Oratory",
						"Any General➞Conspicuous",
						"Any General➞Riding",
						"Any General➞Heraldry",
						"Any Wise➞Bannerman-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Bannerman",
					physicalPool: 1,
					requirements: {
					},
					resources: 7,
					setting: "Professional Soldier",
					skillPool: 5,
					skills: [
						"Any General➞Conspicuous",
						"Any General➞Riding",
						"Any General➞Appropriate Weapons",
						"Any General➞Armor Training"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Honored",
						"Any Character➞Brutal",
						"Any Character➞Aggressive"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Scout",
					physicalPool: 1,
					requirements: {
					},
					resources: 4,
					setting: "Professional Soldier",
					skillPool: 5,
					skills: [
						"Any General➞Stealthy",
						"Any General➞Foraging",
						"Any General➞Orienteering",
						"Any General➞Appropriate Weapons",
						"Any General➞Observation"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Sergeant",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Templar",
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞Villager➞Village Tough",
										"Human➞City Dweller➞City Guard",
										"Human➞Professional Soldier➞Foot Soldier"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Command",
						"Any General➞Field Dressing",
						"Any General➞Appropriate Weapons"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Veteran",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Professional Soldier➞Sergeant",
										"Human➞City Dweller➞Sergeant-at-Arms",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Human➞Religious➞Military Order",
										"Human➞Outcast➞Freebooter"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Professional Soldier",
					skillPool: 5,
					skills: [
						"Any Wise➞Soldier-wise",
						"Any General➞Soldiering",
						"Any General➞Campaign History",
						"Any General➞Tactics"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Die➞Stubborn",
						"Human Lifepath➞Maimed"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Cavalryman",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Groom",
										"Human➞Villager➞Farrier",
										"Human➞City Dweller➞Courier",
										"Human➞City Dweller➞Groom",
										"Human➞City Dweller➞Guard Captain",
										"Human➞City Dweller➞Saddler",
										"Human➞Noble➞Page",
										"Human➞Noble➞Squire",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Groom",
										"Human➞Noble Court➞Page",
										"Human➞Noble Court➞Man-at-Arms",
										"Human➞Noble Court➞Squire",
										"Human➞Noble Court➞Master of Horses",
										"Human➞Religious➞Military Order",
										"Human➞Professional Soldier➞Bannerman",
										"Human➞Professional Soldier➞Cavalryman",
										"Human➞Professional Soldier➞Chaplain",
										"Human➞Professional Soldier➞Captain"
									]
								}
							]
						}
					},
					resources: 9,
					setting: "Professional Soldier",
					skillPool: 10,
					skills: [
						"Any General➞Riding",
						"Any General➞Mounted Combat Training",
						"Any General➞Armor Training",
						"Any General➞Shield Training",
						"Any General➞Appropriate Weapons",
						"Any Wise➞Horse-wise",
						"Any General➞Haggling"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Journeyman",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Apprentice",
										"Human➞Professional Soldier➞Apprentice",
										"Human➞Villager➞Apprentice"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Professional Soldier",
					skillPool: 5,
					skills: [
						"Any General➞Blacksmith",
						"Any General➞Appraisal",
						"Any General➞Haggling",
						"Any Wise➞Ridiculous Request-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Armorer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Professional Soldier",
					skillPool: 9,
					skills: [
						"Any General➞Mending",
						"Any General➞Blacksmith",
						"Any General➞Armorer",
						"Any General➞Weaponsmith",
						"Any General➞Etching",
						"Any General➞Tanner"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Atilliator",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 22,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Atilliator",
						"Any General➞Carpentry",
						"Any General➞Carving",
						"Any General➞Blacksmith",
						"Any General➞Tanner"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Seafaring",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Chaplain",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞Religious➞Archpriest",
										"Human➞Religious➞High Templar",
										"Human➞City Dweller➞Temple Priest",
										"Human➞Outcast➞Heretic Priest",
										"Human➞Death Cult➞Death Priest",
										"Human➞Peasant➞Itinerant Priest",
										"Human➞Villager➞Village Priest",
										"Human➞Villager➞Venal Priest",
										"Human➞Noble Court➞Court Priest",
										"Human➞Religious➞Military Order"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Oratory",
						"Any General➞Riding",
						"Any General➞Armor Training",
						"Any General➞Mounted Combat Training",
						"Any General➞Appropriate Weapons"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Ideologue",
						"Any Character➞Psychotic"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Engineer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Professional Soldier➞Engineer",
										"Human➞Seafaring➞Engineer",
										"Human➞Villager➞Mining Engineer"
									]
								}
							]
						}
					},
					resources: 18,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Artillerist",
						"Any General➞Engineering",
						"Any General➞Fortifications"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Smart",
						"Human Lifepath➞Sense of Distance"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Wizard of War",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Wizard's Apprentice",
										"Human➞City Dweller➞Neophyte Sorcerer",
										"Human➞Noble➞Arcane Devotee",
										"Human➞Seafaring➞Weather Witch",
										"Human➞Outcast➞Rogue Wizard",
										"Human➞Outcast➞Mad Summoner"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Professional Soldier",
					skillPool: 7,
					skills: [
						"Human Magical➞Sorcery",
						"Any General➞Strategy Games",
						"Any Wise➞Soldier-wise",
						"Any Wise➞War-wise",
						"Any General➞Haggling",
						"Any General➞Cartography"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Arrogant"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Quartermaster",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Professional Soldier➞Sergeant",
										"Human➞Professional Soldier➞Veteran",
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞Seafaring➞Ship's Captain",
										"Human➞City Dweller➞Merchant",
										"Human➞Villager➞Merchant",
										"Human➞Noble Court➞Man-at-Arms",
										"Human➞Outcast➞Smuggler",
										"Human➞Noble Court➞Constable",
										"Human➞Noble➞Lord"
									]
								}
							]
						}
					},
					resources: 17,
					setting: "Professional Soldier",
					skillPool: 6,
					skills: [
						"Any General➞Administration",
						"Any General➞Accounting",
						"Any General➞Haggling",
						"Any General➞Logistics"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Die➞Light Sleeper"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Captain",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞High Templar",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Human➞Noble➞Lord",
										"Human➞Noble Court➞Constable"
									]
								},
								{
									type: "OR",
									fulfilmentAmount: 2,
									items: [
										"Human➞Outcast➞Freebooter"
									]
								}
							]
						}
					},
					resources: 35,
					setting: "Professional Soldier",
					skillPool: 9,
					skills: [
						"Any General➞Command",
						"Any Wise➞Contract-wise",
						"Any General➞Haggling",
						"Any General➞Oratory",
						"Any General➞Appropriate Weapons",
						"Any General➞Field Dressing",
						"Any General➞Riding",
						"Any General➞Strategy"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Savvy"
					],
					years: 6
				}
			]
		},
		"Religious": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "Religious",
			short: "Religious",
			stock: "Human",
			type: "Subsetting",
			lifepaths: [
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞College of Magic",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Apt Pupil",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞3",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Religious",
					skillPool: 3,
					skills: [
						"Any General➞Obscure History",
						"Any General➞Ugly Truth",
						"Any General➞Intimidation"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Believer",
						"Human Special➞Gifted",
						"Any Die➞Tainted Legacy"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Castrati",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Religious",
					skillPool: 7,
					skills: [
						"Any General➞Sing",
						"Any General➞Persuasion",
						"Any General➞Falsehood",
						"Any General➞Etiquette",
						"Any General➞Administration",
						"Any General➞Rule of Law"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Eunuch",
						"Any Call-on➞Perfect Pitch",
						"Any Character➞Patient",
						"Any Die➞Scheming"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Pardoner",
					physicalPool: 0,
					requirements: {
					},
					resources: 12,
					setting: "Religious",
					skillPool: 5,
					skills: [
						"Any General➞Persuasion",
						"Any General➞Falsehood",
						"Any General➞Intimidation",
						"Any General➞Doctrine"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Pardoner",
						"Any Character➞Corrupt"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Zealous Convert",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Religious",
					skillPool: 4,
					skills: [
						"Any General➞Religious Diatribe",
						"Any General➞Doctrine",
						"Any General➞Rhetoric"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Infallible Religious Logic",
						"Any Character➞Righteous",
						"Any Character➞Firm",
						"Any Character➞Demagogue"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Noble",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Military Order",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Setting➞Human➞Professional Soldier"
									]
								}
							]
						}
					},
					resources: 7,
					setting: "Religious",
					skillPool: 5,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Riding",
						"Any General➞Armor Training",
						"Any General➞Appropriate Weapons"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Disciplined",
						"Any Character➞Fanatical Devotion",
						"Human Lifepath➞Sworn to the Order"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞City Dweller",
						"Human➞Death Cult",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Grave Digger",
					physicalPool: 0,
					requirements: {
					},
					resources: 6,
					setting: "Religious",
					skillPool: 4,
					skills: [
						"Any General➞Ditch Digging",
						"Any Wise➞Grave-wise",
						"Any Wise➞Cemetery-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Superstitious",
						"Human Lifepath➞Burial Rites"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Porter",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Religious",
					skillPool: 4,
					skills: [
						"Any Wise➞Temple-wise",
						"Any Wise➞Priest-wise",
						"Any Wise➞Worshipper-wise",
						"Any Wise➞Church Treasure-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Keys to the Church",
						"Any Call-on➞Familiar Face"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Notary",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Religious",
					skillPool: 4,
					skills: [
						"Any General➞Rule of Law",
						"Any General➞Bureaucracy",
						"Any General➞Church Law",
						"Any Wise➞Bribe-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Custodian",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady",
										"Human➞Religious➞Itinerant Monk",
										"Human➞Religious➞Cloistered Nun",
										"Human➞City Dweller➞Temple Acolyte",
										"Human➞Religious➞Temple Acolyte",
										"Human➞Religious➞Inquisitor",
										"Human➞Religious➞Exorcist",
										"Human➞Religious➞Theologian"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Religious",
					skillPool: 7,
					skills: [
						"Any Wise➞Relic-wise",
						"Any General➞Observation",
						"Any General➞Obscure History",
						"Any General➞Religious History",
						"Any General➞Folklore",
						"Any Wise➞Saint-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Strange",
						"Any Character➞Erudite",
						"Any Character➞Obsessed",
						"Any Character➞Arcane"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Villager"
					],
					mentalPool: 0,
					name: "Interpreter",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Noble➞Young Lady",
										"Human➞Noble Court➞Young Lady",
										"Human➞City Dweller➞Temple Acolyte",
										"Human➞Religious➞Temple Acolyte",
										"Human➞Religious➞Exorcist",
										"Human➞Religious➞Theologian"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Religious",
					skillPool: 7,
					skills: [
						"Any General➞Read",
						"Any General➞Ancient Languages",
						"Any General➞Instruction",
						"Any General➞Write",
						"Any General➞Doctrine",
						"Any General➞Foreign Languages"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Ink-Stained Hands",
						"Any Character➞Condescending"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Archivist",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "Religious",
					skillPool: 5,
					skills: [
						"Any General➞Research",
						"Any Wise➞Library-wise",
						"Any General➞Ancient History",
						"Any General➞Symbology"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Myopic",
						"Any Die➞Affinity for Books and Scrolls"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Itinerant Monk",
					physicalPool: 0,
					requirements: {
					},
					resources: 6,
					setting: "Religious",
					skillPool: 7,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Suasion",
						"Any General➞Meditation",
						"Any General➞Beggardry",
						"Any Wise➞Alms-wise",
						"Any General➞Streetwise",
						"Any Wise➞Road-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Tonsured"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Cloistered Nun",
					physicalPool: 0,
					requirements: {
					},
					resources: 12,
					setting: "Religious",
					skillPool: 6,
					skills: [
						"Any General➞Research",
						"Any General➞History",
						"Any General➞Meditation",
						"Any General➞Vintner",
						"Any General➞Symbology"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Tonsured",
						"Any Character➞Restless",
						"Any Character➞Bored",
						"Human Lifepath➞Monastic"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Temple Acolyte",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Religious",
					skillPool: 4,
					skills: [
						"Any General➞Write",
						"Any General➞Read",
						"Any General➞Doctrine",
						"Any Wise➞Temple-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Tonsured",
						"Any Character➞Obedient",
						"Human Special➞Faithful"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Priest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Temple Acolyte",
										"Human➞Religious➞Temple Acolyte",
										"Human➞Noble➞Religious Acolyte"
									]
								}
							]
						}
					},
					resources: 18,
					setting: "Religious",
					skillPool: 7,
					skills: [
						"Any General➞Oratory",
						"Any General➞Suasion",
						"Any General➞Ritual",
						"Any General➞Symbology",
						"Any General➞Religious History",
						"Any Wise➞Sacrament-wise",
						"Any Wise➞Bishop-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Vested"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Exorcist",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Temple Priest",
										"Human➞Peasant➞Itinerant Priest",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞Noble Court➞Court Priest",
										"Human➞Religious➞Archivist"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Religious",
					skillPool: 9,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Obscure History",
						"Any General➞Observation",
						"Any General➞Church Law",
						"Any General➞Symbology",
						"Any General➞Demonology",
						"Any General➞Ancient Languages"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Skeptical",
						"Any Character➞Haunted",
						"Human Lifepath➞Possessed",
						"Human Lifepath➞Lost Faith",
						"Human Special➞Faithful",
						"Human Lifepath➞Exorcism Ritualist"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Inquisitor",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Temple Priest",
										"Human➞Peasant➞Itinerant Priest",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞Noble Court➞Court Priest",
										"Human➞City Dweller➞Judge",
										"Human➞Noble Court➞Justiciar"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Religious",
					skillPool: 6,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Interrogation",
						"Any General➞Torture",
						"Any Wise➞Heresy-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Suspicious",
						"Any Character➞Merciless",
						"Any Die➞Cold Blooded",
						"Any Character➞Righteous"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Theologian",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Scribe",
										"Human➞Religious➞Archivist",
										"Human➞Noble Court➞Court Lawyer",
										"Human➞City Dweller➞Advocate",
										"Human➞Religious➞Custodian",
										"Human➞Religious➞Interpreter",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞City Dweller➞Bishop",
										"Human➞Religious➞Bishop"
									]
								}
							]
						}
					},
					resources: 9,
					setting: "Religious",
					skillPool: 10,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Rhetoric",
						"Any General➞Philosophy",
						"Any General➞History",
						"Any General➞Religious History",
						"Any General➞Church Law",
						"Any General➞Obscure History",
						"Any General➞Read",
						"Any General➞Write"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Learned",
						"Any Character➞Insightful",
						"Any Die➞Bookworm",
						"Any Character➞Academic"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Archpriest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Temple Priest",
										"Human➞Peasant➞Itinerant Priest",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞Noble Court➞Court Priest",
										"Human➞Noble Court➞Chaplain",
										"Human➞Professional Soldier➞Chaplain"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "Religious",
					skillPool: 10,
					skills: [
						"Any General➞Oratory",
						"Any General➞Suasion",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Doctrine",
						"Any General➞History",
						"Any General➞Religious History",
						"Any General➞Ritual",
						"Any Wise➞Church-wise",
						"Any Wise➞Parish-wise",
						"Any Wise➞Tithe-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Imperious Demeanor"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Canon",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Archpriest",
										"Human➞Religious➞Theologian",
										"Human➞Religious➞Abbot/Abbess"
									]
								}
							]
						}
					},
					resources: 45,
					setting: "Religious",
					skillPool: 6,
					skills: [
						"Any General➞Rule of Law",
						"Any General➞Church Law",
						"Any General➞Administration",
						"Any General➞Doctrine",
						"Any Wise➞Church-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Authoritative"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Abbot/Abbess",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Itinerant Monk",
										"Human➞Religious➞Cloistered Nun",
										"Human➞Religious➞Theologian",
										"Human➞Villager➞Vintner"
									]
								}
							]
						}
					},
					resources: 45,
					setting: "Religious",
					skillPool: 6,
					skills: [
						"Any General➞Administration",
						"Any General➞Accounting",
						"Any General➞Vintner",
						"Any General➞Wine Tasting",
						"Any Wise➞Royal Secret-wise",
						"Any Wise➞Abbey-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Bishop",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Archpriest",
										"Human➞Noble➞Baron",
										"Human➞Noble➞Viscount",
										"Human➞Noble➞Count",
										"Human➞Noble➞Duke"
									]
								},
								{
									type: "AND",
									items: [
										"Human➞Noble➞Lord",
										"Trait➞Human Lifepath➞Your Grace"
									]
								}
							]
						}
					},
					resources: 45,
					setting: "Religious",
					skillPool: 7,
					skills: [
						"Any General➞Religious History",
						"Any General➞Intimidation",
						"Any General➞Ritual",
						"Any General➞Symbology",
						"Any General➞History",
						"Any General➞Obscure History"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Domineering Presence"
					],
					years: 8
				},
				{
					stock: "Human",
					setting: "Religious",
					allowed: [
						"bs"
					],
					name: "Acolyte",
					born: false,
					years: 6,
					resources: 5,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 1,
					leads: [

					],
					skills: [
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Bureaucracy",
						"Any General➞Doctrine",
						"Any General➞Rule of Law"
					],
					traits: [
						"Human Lifepath➞Tonsured",
						"Any Character➞Ambitious",
						"Any Die➞Scheming"
					],
					requirements: {
					}
				},
				{
					stock: "Human",
					setting: "Religious",
					allowed: [
						"bs"
					],
					name: "Clerk",
					born: false,
					years: 4,
					resources: 9,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 1,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Bureaucracy",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Accounting",
						"Any Wise➞Bribe-wise",
						"Any Wise➞Paperwork-wise"
					],
					traits: [

					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Acolyte"
									]
								}
							]
						}
					}
				},
				{
					stock: "Human",
					setting: "Religious",
					allowed: [
						"bs"
					],
					name: "Scribe",
					born: false,
					years: 7,
					resources: 10,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 1,
					leads: [
						"Human➞Villager",
						"Human➞Peasant",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Write",
						"Any General➞Illuminations",
						"Any General➞Read",
						"Any Wise➞Handwriting-wise"
					],
					traits: [
						"Human Lifepath➞Near-Sighted",
						"Any Character➞Cramped Hands"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Acolyte"
									]
								}
							]
						}
					}
				},
				{
					stock: "Human",
					setting: "Religious",
					allowed: [
						"bs"
					],
					name: "Templar",
					born: false,
					years: 5,
					resources: 18,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Oratory",
						"Any General➞Doctrine",
						"Any General➞Symbology",
						"Any General➞Intimidation",
						"Any General➞Read",
						"Any General➞Write",
						"Any Wise➞Templar Politics-wise",
						"Any General➞Official History"
					],
					traits: [
						"Human Lifepath➞Vested",
						"Any Character➞Imperious",
						"Any Character➞Strong Willed",
						"Any Die➞Favored"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Acolyte"
									]
								}
							]
						}
					}
				},
				{
					stock: "Human",
					setting: "Religious",
					allowed: [
						"bs"
					],
					name: "High Templar",
					born: false,
					years: 5,
					resources: 25,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 10,
					traitPool: 2,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					skills: [
						"Any General➞Oratory",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Doctrine",
						"Any General➞History",
						"Any General➞Ritual",
						"Any Wise➞Tithe-wise",
						"Any Wise➞City-wise",
						"Any Wise➞Sorcerer-King-wise",
						"Any General➞Official History",
						"Any General➞Persuasion"
					],
					traits: [
						"Human Lifepath➞Imperious Demeanor"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Temple Priest",
										"Human➞Peasant➞Itinerant Priest",
										"Human➞Religious➞Templar",
										"Human➞Noble Court➞Court Priest",
										"Human➞Noble Court➞Chaplain",
										"Human➞Professional Soldier➞Chaplain"
									]
								}
							]
						}
					}
				},
				{
					stock: "Human",
					setting: "Religious",
					allowed: [
						"bs"
					],
					name: "Royal Advisor",
					born: false,
					years: 8,
					resources: 45,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Noble Court"
					],
					skills: [
						"Any General➞Official History",
						"Any General➞Soothing Platitudes",
						"Any General➞Intimidation",
						"Any General➞Ritual",
						"Any General➞Symbology",
						"Any General➞History",
						"Any General➞Obscure History"
					],
					traits: [
						"Human Lifepath➞Domineering Presence"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Temple Priest",
										"Human➞Peasant➞Itinerant Priest",
										"Human➞Religious➞High Templar",
										"Human➞Noble➞Baron",
										"Human➞Noble➞Viscount",
										"Human➞Noble➞Count",
										"Human➞Noble➞Duke"
									]
								}
							]
						}
					}
				}
			]
		},
		"Seafaring": {
			allowed: [
				"bwgr"
			],
			name: "Seafaring",
			short: "Seafaring",
			stock: "Human",
			type: "Setting",
			lifepaths: [
				{
					allowed: [
						"bwgr"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 3,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞College of Magic"
					],
					mentalPool: 0,
					name: "Son of a Gun",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Seafaring",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Call-on➞Sea Legs"
					],
					years: 8
				},
				{
					allowed: [
						"bwc"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Gifted Child",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Seafaring",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Misunderstood",
						"Human Special➞Gifted",
						"Any Character➞Abused",
						"Human Special➞Spirit Familiar"
					],
					years: 9
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Boy",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Seafaring",
					skillPool: 4,
					skills: [
						"Any Wise➞Sailor-wise",
						"Any Wise➞Ship-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Veneer of Obedience",
						"Any Character➞Curses like a Sailor",
						"Any Die➞Sprinter"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Galley Slave",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Seafaring",
					skillPool: 3,
					skills: [
						"Any Wise➞Slave Deck-wise",
						"Any Wise➞Taskmaster-wise",
						"Any General➞Sing",
						"Any General➞Seamanship",
						"Any General➞Knots"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Human Lifepath➞Tasting the Lash",
						"Any Character➞Eating Maggots",
						"Any Character➞Following the Beat",
						"Any Call-on➞Iron Stomach",
						"Any Die➞Bottomless Stomach",
						"Any Character➞Gnawing Hunger"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Ratcatcher",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Seafaring",
					skillPool: 5,
					skills: [
						"Any General➞Trapper",
						"Any General➞Poisons",
						"Any General➞Ratiquette"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Bilge-Drinker",
						"Human Lifepath➞Rat-Speak",
						"Any Character➞Feral"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Landsman",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Seafaring",
					skillPool: 3,
					skills: [
						"Any General➞Seamanship",
						"Any General➞Knots",
						"Any General➞Brawling",
						"Any Wise➞Rope-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Cursing",
						"Any Character➞Aches and Pains"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Drummer",
					physicalPool: 0,
					requirements: {
					},
					resources: 6,
					setting: "Seafaring",
					skillPool: 3,
					skills: [
						"Any General➞Drum",
						"Any General➞Sing",
						"Any General➞Drum Maker"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Incessant Tapping"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Sailor",
					physicalPool: 1,
					requirements: {
					},
					resources: 7,
					setting: "Seafaring",
					skillPool: 6,
					skills: [
						"Any General➞Seamanship",
						"Any General➞Rigging",
						"Any General➞Knots",
						"Any General➞Brawling",
						"Any General➞Sing",
						"Any Wise➞Sea-wise",
						"Any General➞Gambling"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Drunk"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Crazy Old Sailor",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor",
										"Human➞Outcast➞Pirate",
										"Human➞City Dweller➞Mercenary Captain"
									]
								},
								{
									type: "AND",
									items: [
										"YEARS➞MIN➞40",
										"YEARS➞MAX➞50"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Seafaring",
					skillPool: 3,
					skills: [
						"Any General➞Ugly Truth",
						"Any General➞Intimidation",
						"Any Wise➞Omen-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Superstitious",
						"Any Character➞Metal Plate in the Skull",
						"Any Character➞He's a Jonah That One"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Purser",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Clerk",
										"Human➞Villager➞Clerk",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor"
									]
								}
							]
						}
					},
					resources: 9,
					setting: "Seafaring",
					skillPool: 4,
					skills: [
						"Any General➞Accounting",
						"Any Wise➞Crew-wise",
						"Any Wise➞Supply-wise",
						"Any Wise➞Ship-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Gnawing Hunger",
						"Any Character➞Bitter"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Signalman",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "Seafaring",
					skillPool: 5,
					skills: [
						"Any General➞Signaling",
						"Any General➞Observation",
						"Any General➞Cryptography"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Cryptic"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Pilot",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor",
										"Human➞Outcast➞Pirate",
										"Human➞City Dweller➞Mercenary Captain"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Seafaring",
					skillPool: 5,
					skills: [
						"Any General➞Pilot",
						"Any Wise➞Ship-wise",
						"Any General➞Observation",
						"Any Wise➞Shoal-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Blisters",
						"Any Die➞Light Sleeper",
						"Any Character➞Bored",
						"Any Character➞Paranoid About the Ship"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Marine",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor",
										"Human➞Outcast➞Pirate",
										"Human➞City Dweller➞Mercenary Captain"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Seafaring",
					skillPool: 4,
					skills: [
						"Any General➞Appropriate Weapons",
						"Any General➞Knots",
						"Any General➞Intimidation"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Bruiser",
						"Any Call-on➞Sea Legs"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Bosun",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor",
										"Human➞Outcast➞Pirate",
										"Human➞City Dweller➞Mercenary Captain"
									]
								}
							]
						}
					},
					resources: 8,
					setting: "Seafaring",
					skillPool: 3,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Brawling",
						"Any Wise➞Sailor-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Mean",
						"Any Character➞Obedient"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Sailmaker",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor",
										"Human➞Outcast➞Pirate",
										"Human➞City Dweller➞Seamstress"
									]
								}
							]
						}
					},
					resources: 9,
					setting: "Seafaring",
					skillPool: 5,
					skills: [
						"Any General➞Sewing",
						"Any General➞Weaving",
						"Any General➞Mending",
						"Any Wise➞Sail-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Ship's Doctor",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Doctor",
										"Human➞Noble Court➞Court Doctor",
										"Human➞City Dweller➞Physician",
										"Human➞Villager➞Barber",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Seafaring",
					skillPool: 8,
					skills: [
						"Any General➞Apothecary",
						"Any General➞Bloodletting",
						"Any General➞Surgery",
						"Any General➞Anatomy",
						"Human Special➞Astrology",
						"Any General➞Falsehood",
						"Any Wise➞Tar-wise",
						"Any Wise➞Scurvy-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Human Lifepath➞Incomprehensible Diagnosis",
						"Human Lifepath➞Ugly Reputation"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Ship's Cook",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor",
										"Human➞Outcast➞Pirate"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Seafaring",
					skillPool: 6,
					skills: [
						"Any General➞Cooking",
						"Any General➞Firebuilding",
						"Any General➞Sing",
						"Any General➞Falsehood",
						"Any Wise➞Mystery Meat-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Human Lifepath➞Crippled",
						"Any Character➞Cookie",
						"Any Character➞Maggot Connoisseur"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Religious",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Ship's Chaplain",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble Court➞Chaplain",
										"Human➞Professional Soldier➞Chaplain",
										"Human➞Religious➞Military Order",
										"Human➞City Dweller➞Temple Acolyte",
										"Human➞Religious➞Temple Acolyte",
										"Human➞Noble➞Religious Acolyte"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Seafaring",
					skillPool: 4,
					skills: [
						"Any General➞Oratory",
						"Any General➞Doctrine",
						"Any Wise➞Ship-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Dark Elf Lifepath➞Saturnine",
						"Human Lifepath➞Burial at Sea",
						"Any Character➞Secretly Worships the Black Sea God"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞City Dweller",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Weather Witch",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Peasant➞Augur",
										"Human➞Villager➞Wizard's Apprentice",
										"Human➞City Dweller➞Neophyte Sorcerer",
										"Human➞Noble➞Arcane Devotee",
										"Human➞Outcast➞Rogue Wizard"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Seafaring",
					skillPool: 6,
					skills: [
						"Any Wise➞Sea-wise",
						"Human Magical➞Summoning",
						"Any Wise➞Superstition-wise",
						"Any General➞Navigation",
						"Human Special➞Astrology"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Die➞Weather Sense"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Navigator",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Seafaring➞Pilot",
										"Human➞City Dweller➞Mercenary Captain",
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Seafaring➞Sailor",
										"Human➞Villager➞Sailor",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Seafaring",
					skillPool: 6,
					skills: [
						"Any General➞Navigation",
						"Any Wise➞Sea-wise",
						"Any General➞Cartography",
						"Human Special➞Astrology",
						"Any Wise➞Current-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞Villager",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Carpenter's Mate",
					physicalPool: 1,
					requirements: {
					},
					resources: 8,
					setting: "Seafaring",
					skillPool: 5,
					skills: [
						"Any General➞Mending",
						"Any General➞Gambling",
						"Any Wise➞Wood-wise",
						"Any Wise➞Caulking-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Cursing",
						"Human Lifepath➞Lifting Heavy Things",
						"Human Lifepath➞Bull's-eye Spitter"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Ship's Carpenter",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Apprentice",
										"Human➞Professional Soldier➞Apprentice",
										"Human➞Villager➞Apprentice",
										"Human➞Seafaring➞Carpenter's Mate"
									]
								}
							]
						}
					},
					resources: 16,
					setting: "Seafaring",
					skillPool: 6,
					skills: [
						"Any General➞Carpentry",
						"Any General➞Shipwright",
						"Any General➞Boatwright",
						"Any General➞Rigging",
						"Any Wise➞Ship-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞I Know This Ship Like My Own Hands"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Artillerist's Mate",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "Seafaring",
					skillPool: 4,
					skills: [
						"Any General➞Mending",
						"Any General➞Carpentry",
						"Any General➞Artillerist"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Disturbingly Confident"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Engineer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Seafaring➞Artillerist's Mate",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞Seafaring➞Ship's Carpenter",
										"Human➞Professional Soldier➞Engineer",
										"Human➞Seafaring➞Engineer",
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "Seafaring",
					skillPool: 6,
					skills: [
						"Any General➞Engineering",
						"Human Special➞Munitions",
						"Any General➞Artillerist",
						"Any General➞Carpentry",
						"Any General➞Mending"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞It Just Might Work!"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Officer's Mate",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Born Noble",
										"Human➞Noble➞Page",
										"Human➞Noble Court➞Page",
										"Human➞Seafaring➞Son of a Gun"
									]
								},
								{
									type: "AND",
									items: [
										"YEARS➞MIN➞40",
										"YEARS➞MAX➞50"
									]
								}
							]
						}
					},
					resources: 10,
					setting: "Seafaring",
					skillPool: 4,
					skills: [
						"Any General➞Etiquette",
						"Any Wise➞Captain-wise",
						"Any General➞Seamanship"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Curses like a Sailor"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 1,
					name: "Steward",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Seafaring➞Purser",
										"Human➞City Dweller➞Merchant",
										"Human➞Villager➞Merchant",
										"Human➞Noble Court➞Steward",
										"Human➞Seafaring➞Steward",
										"Human➞City Dweller➞Accountant"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Seafaring",
					skillPool: 5,
					skills: [
						"Any General➞Accounting",
						"Any General➞Ship Management",
						"Any General➞Haggling",
						"Any Wise➞Merchant-wise",
						"Any General➞Appraisal"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 1,
					name: "First Mate",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight"
									]
								},
								{
									type: "OR",
									fulfilmentAmount: 2,
									items: [
										"Human➞City Dweller➞Sailor",
										"Human➞Professional Soldier➞Sailor",
										"Human➞Villager➞Sailor",
										"Setting➞Human➞Seafaring"
									]
								}
							]
						}
					},
					resources: 18,
					setting: "Seafaring",
					skillPool: 6,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Command",
						"Any General➞Conspicuous",
						"Any Wise➞Seaman-wise",
						"Any General➞Sword"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Ship's Captain",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "OR",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Seafaring➞First Mate",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight"
									]
								},
								{
									type: "OR",
									fulfilmentAmount: 2,
									items: [
										"Human➞City Dweller➞Mercenary Captain"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "Seafaring",
					skillPool: 6,
					skills: [
						"Any General➞Command",
						"Any General➞Oratory",
						"Any Wise➞Ship-wise",
						"Any Wise➞Sea-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Stern Demeanor"
					],
					years: 7
				}
			]
		},
		"Servitude and Captive": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "Servitude and Captive",
			short: "Servitude",
			stock: "Human",
			type: "Setting",
			lifepaths: [
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: true,
					eitherPool: -1,
					generalSkillPool: 2,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Born Slave",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Servitude and Captive",
					skillPool: 1,
					skills: [
						"Any Wise➞Slavery-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Human Lifepath➞Broken",
						"Any Character➞Scarred",
						"Human Lifepath➞Maimed",
						"Any Die➞Lame"
					],
					years: 12
				},
				{
					allowed: [
						"bwc"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Gifted Child",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Servitude and Captive",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Misunderstood",
						"Human Special➞Gifted",
						"Any Character➞Abused",
						"Human Special➞Spirit Familiar"
					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Ditch Digger",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Servitude and Captive",
					skillPool: 3,
					skills: [
						"Any General➞Ditch Digging",
						"Any General➞Sing",
						"Any Wise➞Boss-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Blisters",
						"Human Lifepath➞Back-Breaking Labor"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Servant",
					physicalPool: 0,
					requirements: {
					},
					resources: 6,
					setting: "Servitude and Captive",
					skillPool: 3,
					skills: [
						"Any General➞Soothing Platitudes",
						"Any General➞Inconspicuous",
						"Any Wise➞Gossip-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Mind-Numbing Work",
						"Any Character➞Obsequious"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Field Laborer",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Servitude and Captive",
					skillPool: 7,
					skills: [
						"Any General➞Farming",
						"Any General➞Mending",
						"Any General➞Sing",
						"Any General➞Hauling",
						"Any General➞Driving",
						"Any Wise➞Fall Grass-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Any Character➞Hope"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Captive of War",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Servitude and Captive",
					skillPool: 2,
					skills: [
						"Any Wise➞Cell-wise",
						"Any Wise➞Chain-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Die➞Claustrophobic",
						"Any Character➞Resigned to Fate"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Gaol",
					physicalPool: 0,
					requirements: {
					},
					resources: 3,
					setting: "Servitude and Captive",
					skillPool: 3,
					skills: [
						"Any Wise➞Gaol-wise",
						"Any General➞Ratiquette"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Involuntary Shudders"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 0,
					name: "Harem Slave",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Servitude and Captive",
					skillPool: 3,
					skills: [
						"Any General➞Falsehood",
						"Any General➞Seduction"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Numb",
						"Any Character➞Worldly"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Bondsman",
					physicalPool: 0,
					requirements: {
					},
					resources: 7,
					setting: "Servitude and Captive",
					skillPool: "*",
					skills: [

					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Lucky"
					],
					years: 7
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Born Mule",
					born: true,
					years: 10,
					resources: 3,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 2,
					skillPool: 0,
					traitPool: 2,
					leads: [
						"Human➞Nomad",
						"Human➞Merchant House"
					],
					skills: [

					],
					traits: [
						"Human Lifepath➞Mule",
						"Any Die➞Stubborn",
						"Any Die➞Tough"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Slave Soldier",
					born: false,
					years: 4,
					resources: 5,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 2,
					leads: [
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Soldiering",
						"Any Wise➞Cruel and Unusual Punishment-wise",
						"Any General➞Appropriate Weapons",
						"Any General➞Shield Training"
					],
					traits: [
						"Human Lifepath➞Tasting the Lash",
						"Any Character➞Expendable",
						"Any Character➞Branded"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Setting➞Human➞Servitude and Captive"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Mamluk",
					born: false,
					years: 5,
					resources: 10,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 1,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Nomad"
					],
					skills: [
						"Any General➞Spear",
						"Any General➞Soldiering",
						"Any General➞Intimidation",
						"Any Wise➞Master-wise"
					],
					traits: [

					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Servitude and Captive➞Bondsman",
										"Human➞Servitude and Captive➞Slave Soldier"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Child Attendant",
					born: false,
					years: 2,
					resources: 5,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 3,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Religious"
					],
					skills: [
						"Any General➞Soothing Platitudes",
						"Any Wise➞Templar-wise",
						"Any Wise➞Noble-wise"
					],
					traits: [
						"Any Character➞Servile",
						"Any Character➞Abused",
						"Any Character➞Haunted Beauty"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Slave Doctor",
					born: false,
					years: 8,
					resources: 8,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Noble Court"
					],
					skills: [
						"Any Wise➞Sickness-wise",
						"Any General➞Herbalism",
						"Any General➞Midwifery",
						"Any Wise➞Family Secret-wise"
					],
					traits: [
						"Any Character➞Obedient",
						"Any Character➞Humble",
						"Any Character➞Bedside Manner"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Religious➞Castrati",
										"Human➞Servitude and Captive➞Beast Handler"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Slave Artist",
					born: false,
					years: 5,
					resources: 6,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Nomad"
					],
					skills: [
						"Any Wise➞Bad Taste-wise",
						"Any General➞Painting",
						"Any General➞Sculpture"
					],
					traits: [
						"Any Character➞Veneer of Obedience",
						"Any Call-on➞Perspective"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Slave Performer",
					born: false,
					years: 4,
					resources: 3,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 3,
					traitPool: 2,
					leads: [
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Sing",
						"Any General➞Acting",
						"Any General➞Musical Instrument"
					],
					traits: [
						"Any Character➞Bitter",
						"Any Die➞Ear for Voices"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Slave Musician",
					born: false,
					years: 7,
					resources: 5,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 3,
					leads: [
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Musical Instrument",
						"Any General➞Sing"
					],
					traits: [
						"Any Die➞Blind",
						"Any Die➞Lame",
						"Any Call-on➞Perfect Pitch"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Skill➞Any General➞Sing"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Slave Scribe",
					born: false,
					years: 7,
					resources: 5,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Write",
						"Any General➞Illuminations",
						"Any General➞Cartography"
					],
					traits: [
						"Human Lifepath➞Near-Sighted",
						"Any Character➞Cramped Hands",
						"Human Lifepath➞Mind-Numbing Work"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Quarry Slave",
					born: false,
					years: 8,
					resources: 4,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 3,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Hauling",
						"Any Wise➞Stone-wise",
						"Any Wise➞Obsidian-wise",
						"Any Wise➞Salt-wise"
					],
					traits: [
						"Human Lifepath➞Tasting the Lash",
						"Any Character➞Hacking Cough",
						"Human Lifepath➞Maimed",
						"Any Die➞Lame"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Foreman",
					born: false,
					years: 10,
					resources: 8,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller"
					],
					skills: [
						"Any Wise➞Slave-wise",
						"Any Wise➞Grandiose Scheme-wise",
						"Any General➞Soothing Platitudes",
						"Any General➞Field Dressing",
						"Any General➞Command"
					],
					traits: [
						"Any Character➞Yes Boss",
						"Any Character➞Pitiless",
						"Any Call-on➞Booming Voice",
						"Any Call-on➞Familiar Face"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Servitude and Captive➞Taskmaster",
										"Human➞Servitude and Captive➞Beast Handler"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Arena Slave",
					born: false,
					years: 3,
					resources: 5,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 2,
					traitPool: 2,
					leads: [
						"Human➞Outcast"
					],
					skills: [
						"Any Wise➞Arena-wise",
						"Any Wise➞Outlandish Beast-wise"
					],
					traits: [
						"Human Lifepath➞Broken",
						"Any Character➞Desperate",
						"Any Character➞Scarred",
						"Human Lifepath➞Maimed"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Gladiator",
					born: false,
					years: 5,
					resources: 8,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Brawling",
						"Any General➞Appropriate Weapons",
						"Any General➞Acting",
						"Any General➞Drinking",
						"Any Wise➞Champion-wise"
					],
					traits: [
						"Any Character➞Life is Cheap",
						"Any Character➞Drunk",
						"Any Die➞Gloryhound"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Servitude and Captive➞Arena Slave",
										"Human➞Servitude and Captive➞Slave Soldier"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Champion",
					born: false,
					years: 6,
					resources: 10,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Nomad"
					],
					skills: [
						"Any General➞Conspicuous",
						"Any General➞Appropriate Weapons",
						"Any General➞Shield Training",
						"Any General➞Brawling",
						"Any General➞Tactics"
					],
					traits: [
						"Any Character➞Popular Hero",
						"Any Character➞A Little Fat",
						"Any Die➞Spartacus"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Enslaved",
					born: false,
					years: 3,
					resources: 3,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 2,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Merchant House"
					],
					skills: [
						"Any Wise➞Shackles-wise",
						"Any General➞Ditch Digging"
					],
					traits: [
						"Any Character➞Branded",
						"Human Lifepath➞Back-Breaking Labor",
						"Any Character➞Yearning",
						"Any Character➞Cool Hand"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Tortured",
					born: false,
					years: 2,
					resources: 2,
					mentalPool: 0,
					physicalPool: -1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 2,
					traitPool: 3,
					leads: [
						"Human➞Outcast"
					],
					skills: [
						"Any Wise➞Screaming-wise",
						"Any Wise➞Torture Devices-wise"
					],
					traits: [
						"Human Lifepath➞Broken",
						"Human Lifepath➞Maimed",
						"Any Die➞Tongueless",
						"Any Character➞Hoarse",
						"Human Lifepath➞Numb",
						"Any Die➞Thousand-Yard Stare"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Drover",
					born: false,
					years: 3,
					resources: 5,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 2,
					leads: [
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Driving",
						"Any General➞Mending",
						"Any Wise➞Domestic Animals-wise"
					],
					traits: [
						"Any Character➞Dusty",
						"Any Character➞Thirsty"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Beast Handler",
					born: false,
					years: 6,
					resources: 8,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Merchant House"
					],
					skills: [
						"Any Wise➞Outlandish Beast-wise",
						"Any General➞Animal Husbandry",
						"Any Wise➞Chains-wise",
						"Any General➞Intimidation"
					],
					traits: [
						"Any Character➞Gnawed",
						"Any Die➞Missing Eye",
						"Any Character➞Missing Digit",
						"Human Lifepath➞Maimed",
						"Any Character➞Soft Spot",
						"Any Die➞Low Speech"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Servitude and Captive➞Arena Slave",
										"Human➞Servitude and Captive➞Drover"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Laborer",
					born: false,
					years: 4,
					resources: 2,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 2,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Nomad"
					],
					skills: [
						"Any General➞Hauling",
						"Any General➞Ditch Digging"
					],
					traits: [
						"Any Character➞Starved",
						"Any Character➞Callous",
						"Human Lifepath➞Hardened",
						"Human Lifepath➞Back-Breaking Labor"
					],
					requirements: {
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Farmer",
					born: false,
					years: 8,
					resources: 5,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 8,
					traitPool: 1,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier"
					],
					skills: [
						"Any General➞Farming",
						"Any General➞Mending",
						"Any General➞Animal Husbandry",
						"Any General➞Weaving",
						"Any General➞Cooking",
						"Any General➞Sewing",
						"Any General➞Firebuilding",
						"Any General➞Sing"
					],
					traits: [
						"Any Character➞Hoarding"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Servitude and Captive➞Field Laborer"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Shepherd",
					born: false,
					years: 4,
					resources: 4,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 1,
					leads: [
						"Human➞Villager",
						"Human➞Professional Soldier",
						"Human➞Nomad"
					],
					skills: [
						"Any General➞Animal Husbandry",
						"Any General➞Sing",
						"Any General➞Climbing",
						"Any General➞Flute"
					],
					traits: [
						"Any Character➞Cry Wolf"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Servitude and Captive➞Field Laborer"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Taskmaster",
					born: false,
					years: 6,
					resources: 7,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Intimidation",
						"Any General➞Brawling",
						"Any General➞Interrogation",
						"Any General➞Torture"
					],
					traits: [
						"Any Character➞Reviled",
						"Human Lifepath➞Hard-Hearted",
						"Any Character➞Cruel"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									fulfilmentAmount: 2,
									items: [
										"Setting➞Human➞Servitude and Captive"
									]
								}
							]
						}
					}
				},
				{
					allowed: [
						"bs"
					],
					stock: "Human",
					setting: "Servitude and Captive",
					name: "Concubine",
					born: false,
					years: 5,
					resources: 10,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Soothing Platitudes",
						"Any General➞Seduction",
						"Any General➞Falsehood",
						"Any Wise➞Dirty Secret-wise",
						"Any General➞Persuasion"
					],
					traits: [
						"Any Character➞Veneer of Obedience",
						"Any Character➞Favorite",
						"Any Character➞Vain"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Servitude and Captive➞Harem Slave"
									]
								}
							]
						}
					}
				}
			]
		},
		"Villager": {
			allowed: [
				"bwgr",
				"bs"
			],
			name: "Villager",
			short: "Villager",
			stock: "Human",
			type: "Setting",
			lifepaths: [
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 3,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Seafaring",
						"Human➞Religious",
						"Human➞College of Magic"
					],
					mentalPool: 0,
					name: "Village Born",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Villager",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 2,
					traits: [

					],
					years: 10
				},
				{
					allowed: [
						"bwc"
					],
					born: true,
					eitherPool: 0,
					generalSkillPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Noble Court",
						"Human➞Religious"
					],
					mentalPool: 0,
					name: "Gifted Child",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Villager",
					skillPool: 0,
					skills: [

					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Special➞Misunderstood",
						"Human Special➞Gifted",
						"Any Character➞Abused",
						"Human Special➞Spirit Familiar"
					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞City Dweller",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Kid",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2",
										"LP➞UNIQUE"
									]
								}
							]
						}
					},
					resources: 3,
					setting: "Villager",
					skillPool: 3,
					skills: [
						"Any Wise➞Trouble-wise",
						"Any General➞Throwing",
						"Any General➞Inconspicuous"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Bad Egg",
						"Any Character➞Good for Nothing",
						"Any Call-on➞Fleet of Foot"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Idiot",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Conspicuous",
						"Any General➞Ugly Truth",
						"Any Wise➞Village Secrets-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Problems",
						"Any Character➞Alcoholic",
						"Any Character➞Abused",
						"Any Character➞Handicapped"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Religious",
						"Human➞Servitude and Captive",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Pilgrim",
					physicalPool: 0,
					requirements: {
					},
					resources: 4,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any Wise➞Religious Rumor-wise",
						"Any Wise➞Road-wise",
						"Any Wise➞Shrine-wise",
						"Any Wise➞Alms-wise",
						"Any Wise➞Relic-wise",
						"Any General➞Doctrine"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Collector"
					],
					years: 2
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Conscript",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Villager",
					skillPool: 2,
					skills: [
						"Any General➞Foraging",
						"Any Wise➞Baggage Train-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Hide Before Battle"
					],
					years: 1
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Groom",
					physicalPool: 0,
					requirements: {
					},
					resources: 7,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Animal Husbandry",
						"Any General➞Riding",
						"Any General➞Mending",
						"Any Wise➞Horse-wise",
						"Any Wise➞Road-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Runner",
					physicalPool: 1,
					requirements: {
					},
					resources: 6,
					setting: "Villager",
					skillPool: 3,
					skills: [
						"Any General➞Streetwise",
						"Any General➞Inconspicuous",
						"Any Wise➞Shortcut-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Skinny",
						"Any Call-on➞Fleet of Foot"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Village Peddler",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Villager",
					skillPool: 7,
					skills: [
						"Any General➞Mending",
						"Any General➞Sing",
						"Any General➞Haggling",
						"Any General➞Chandler",
						"Any General➞Persuasion",
						"Any General➞Inconspicuous",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Odd"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Shopkeeper",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any General➞Haggling",
						"Any General➞Accounting",
						"Any General➞Observation",
						"Any Wise➞Merchant-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Clerk",
					physicalPool: 0,
					requirements: {
					},
					resources: 9,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Bureaucracy",
						"Any General➞Write",
						"Any General➞Read",
						"Any Wise➞Contract-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Cramped Hands",
						"Any Character➞Mind for Small Details"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞Seafaring"
					],
					mentalPool: 0,
					name: "Sailor",
					physicalPool: 1,
					requirements: {
					},
					resources: 5,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Rigging",
						"Any General➞Knots",
						"Any General➞Brawling",
						"Any General➞Mending",
						"Any General➞Sing",
						"Any General➞Fishing"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Superstitious",
						"Any Call-on➞Sea Legs"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Laborer",
					physicalPool: 1,
					requirements: {
					},
					resources: 4,
					setting: "Villager",
					skillPool: 2,
					skills: [
						"Any General➞Ditch Digging",
						"Any Wise➞Latrine-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Calloused",
						"Any Character➞Starved",
						"Human Lifepath➞Broken",
						"Human Lifepath➞Hardened",
						"Human Lifepath➞Numb"
					],
					years: 4
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Miner",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Laborer",
										"Human➞Villager➞Laborer",
										"Human➞Servitude and Captive➞Field Laborer",
										"Human➞Peasant➞Conscript",
										"Human➞Villager➞Conscript",
										"Human➞Peasant➞Farmer",
										"Human➞Professional Soldier➞Foot Soldier"
									]
								}
							]
						}
					},
					resources: 7,
					setting: "Villager",
					skillPool: 2,
					skills: [
						"Any General➞Mining",
						"Any Wise➞Cave-In-wise"
					],
					stock: "Human",
					traitPool: 3,
					traits: [
						"Orc Lifepath➞Black Lung",
						"Any Character➞Drunk",
						"Any Character➞Superstitious"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 0,
					name: "Taskmaster",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Village Sergeant",
										"Setting➞Human➞Professional Soldier"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Brawling",
						"Any General➞Sing",
						"Any General➞Conspicuous",
						"Any Wise➞Lazy Bastard-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Hard-Hearted",
						"Any Character➞Mean",
						"Any Character➞Barker",
						"Any Call-on➞Booming Voice"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞City Dweller",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Serving Girl",
					physicalPool: 0,
					requirements: {
					},
					resources: 5,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Soothing Platitudes",
						"Any General➞Ugly Truth",
						"Any Wise➞Customer-wise",
						"Any General➞Sleight of Hand"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Bored",
						"Any Character➞Bitter",
						"Any Character➞Comely"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Hosteller",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MAX➞2"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any General➞Cooking",
						"Any General➞Mending",
						"Any General➞Accounting",
						"Any General➞Soothing Platitudes",
						"Any Wise➞Guest-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Fixed Smile",
						"Any Character➞Gossip"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Servitude and Captive"
					],
					mentalPool: 0,
					name: "Village Tough",
					physicalPool: 1,
					requirements: {
					},
					resources: 7,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Appropriate Weapons",
						"Any General➞Intimidation",
						"Any General➞Brawling",
						"Any Wise➞Graft-wise",
						"Any Wise➞Village-wise",
						"Any Wise➞Guard-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Thug"
					],
					years: 3
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Village Sergeant",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Village Tough",
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞Outcast➞Freebooter",
										"Human➞City Dweller➞Sergeant-at-Arms",
										"Human➞Noble Court➞Man-at-Arms"
									]
								}
							]
						}
					},
					resources: 9,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Command",
						"Any General➞Intimidation",
						"Any General➞Field Dressing",
						"Any General➞Appropriate Weapons",
						"Any General➞Shield Training",
						"Any General➞Armor Training",
						"Any Wise➞Bribe-wise",
						"Any Wise➞Wealthy-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Overworked",
						"Any Character➞Underpaid"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Servitude and Captive",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Corrupt Sergeant",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Village Tough",
										"Human➞Noble➞Squire",
										"Human➞Noble Court➞Squire",
										"Human➞Outcast➞Freebooter",
										"Human➞City Dweller➞Sergeant-at-Arms",
										"Human➞Noble Court➞Man-at-Arms"
									]
								}
							]
						}
					},
					resources: 12,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Appropriate Weapons",
						"Any General➞Shield Training",
						"Any General➞Armor Training",
						"Any Wise➞Bribe-wise",
						"Any Wise➞Wealthy-wise",
						"Any Wise➞Criminal-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Predatory"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Tailor",
					physicalPool: 0,
					requirements: {
					},
					resources: 12,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any General➞Sewing",
						"Any General➞Embroidery",
						"Any Wise➞Clothing-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Frippery"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Tax Collector",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MIN➞3"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Intimidation",
						"Any General➞Accounting",
						"Any General➞Haggling",
						"Any General➞Persuasion"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Hard-Hearted",
						"Any Die➞Manhunter"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Cobbler",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Apprentice",
										"Human➞Professional Soldier➞Apprentice"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Cobbler",
						"Any Wise➞Shoe-wise",
						"Any Wise➞Feet-wise",
						"Any Wise➞Leather-wise",
						"Any Wise➞Nail-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Comfortable Shoes"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞City Dweller"
					],
					mentalPool: 0,
					name: "Farrier",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Apprentice",
										"Human➞Professional Soldier➞Apprentice"
									]
								}
							]
						}
					},
					resources: 12,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Blacksmith",
						"Any General➞Animal Husbandry",
						"Any Wise➞Horse-wise",
						"Any General➞Haggling"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞A Bit Deaf"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Butcher",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Butchery",
						"Any General➞Cooking",
						"Any Wise➞Guts-wise",
						"Any General➞Anatomy"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Prominent Scar",
						"Any Die➞Thick Skin",
						"Any Character➞Stinky",
						"Any Character➞Muttering"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Outcast"
					],
					mentalPool: 0,
					name: "Barber",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any General➞Bloodletting",
						"Any General➞Anatomy",
						"Any General➞Apothecary",
						"Any Wise➞Village-wise",
						"Any Wise➞Gossip-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Agreeable",
						"Any Character➞Seemingly Concerned"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Noble Court"
					],
					mentalPool: 0,
					name: "Brewer",
					physicalPool: 0,
					requirements: {
					},
					resources: 15,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Brewer",
						"Any General➞Miller",
						"Any Wise➞Grain-wise",
						"Any Wise➞Brew-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Reeks of Alcohol",
						"Any Character➞Ruddy Complexion"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive",
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Acolyte",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Doctrine",
						"Any General➞Bureaucracy",
						"Any General➞Read",
						"Any General➞Write",
						"Any General➞Ritual",
						"Any General➞Religious History",
						"Any Wise➞Temple-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Tonsured",
						"Any Character➞Early Riser",
						"Human Lifepath➞Broken",
						"Any Call-on➞Perfect Pitch"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Outcast",
						"Human➞Professional Soldier",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Failed Acolyte",
					physicalPool: 0,
					requirements: {
					},
					resources: 8,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any Wise➞Temple-wise",
						"Any Wise➞Dirty Secrets-wise",
						"Any General➞Doctrine",
						"Any General➞Religious History"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Bitter"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞City Dweller",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Village Priest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Acolyte"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any General➞Oratory",
						"Any General➞Suasion",
						"Any General➞Symbology"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Vested",
						"Any Character➞Devout",
						"Human Special➞Faithful"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞City Dweller",
						"Human➞Seafaring",
						"Human➞Servitude and Captive",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Death Cult"
					],
					mentalPool: 1,
					name: "Venal Priest",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Acolyte",
										"Human➞Villager➞Clerk",
										"Human➞City Dweller➞Clerk",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Setting➞Human➞Religious"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Persuasion",
						"Any General➞Soothing Platitudes",
						"Any General➞Falsehood"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Venal",
						"Human Lifepath➞Vested"
					],
					years: 9
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Seafaring"
					],
					mentalPool: 0,
					name: "Apprentice",
					physicalPool: 1,
					requirements: {
					},
					resources: 7,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Mending",
						"Any General➞Blacksmith",
						"Any General➞Carpentry",
						"Any General➞Tanner",
						"Any General➞Potter",
						"Any General➞Cooper"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Lifepath➞Broken In",
						"Human Lifepath➞Back-Breaking Labor"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 1,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Professional Soldier",
						"Human➞Seafaring"
					],
					mentalPool: 0,
					name: "Journeyman",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Apprentice",
										"Human➞Professional Soldier➞Apprentice"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any General➞Haggling",
						"Any General➞Appraisal",
						"Any General➞Read",
						"Any General➞Write"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Human Lifepath➞Made Man",
						"Any Die➞Geometric"
					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant"
					],
					mentalPool: 1,
					name: "Cloth Dyer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Apprentice",
										"Human➞Professional Soldier➞Apprentice"
									]
								}
							]
						}
					},
					resources: 20,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Cloth Dyeing",
						"Any General➞Dye Manufacture",
						"Any General➞Accounting",
						"Any General➞Haggling",
						"Any Wise➞Fabric-wise",
						"Any Wise➞Mineral-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Many-Colored Hands"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Peasant"
					],
					mentalPool: 0,
					name: "Bowyer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Apprentice",
										"Human➞Professional Soldier➞Apprentice",
										"Human➞Noble Court➞Huntsman",
										"Human➞Noble Court➞Forester",
										"Human➞Professional Soldier➞Archer"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Bowyer",
						"Any General➞Fletcher",
						"Any General➞Mending",
						"Any General➞Bow",
						"Any Wise➞Bow-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 6
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Master Craftsman",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any Wise➞Craftsman-wise",
						"Any Wise➞Artisan-wise",
						"Any Wise➞Materials-wise",
						"Any Wise➞Tools-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Perfectionist",
						"Any Character➞Early Riser",
						"Any Die➞Stubborn",
						"Any Call-on➞Healthy"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Noble Court",
						"Human➞Peasant"
					],
					mentalPool: 1,
					name: "Vintner",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MIN➞3"
									]
								}
							]
						}
					},
					resources: 40,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Vintner",
						"Any General➞Wine Tasting",
						"Any General➞Estate Management",
						"Any Wise➞Grape-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Patient",
						"Any Character➞Lugubrious"
					],
					years: 10
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Noble Court"
					],
					mentalPool: 1,
					name: "Apiarist",
					physicalPool: 0,
					requirements: {
					},
					resources: 20,
					setting: "Villager",
					skillPool: 4,
					skills: [
						"Any General➞Insect Husbandry",
						"Any General➞Carpentry",
						"Any General➞Firebuilding",
						"Any Wise➞Honey-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Any Character➞Stung Once (Once)",
						"Human Lifepath➞Beespeaker"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Mining Engineer",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Apprentice",
										"Human➞Professional Soldier➞Apprentice",
										"Human➞Villager➞Miner",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student",
										"Human➞City Dweller➞Journeyman",
										"Human➞Professional Soldier➞Journeyman",
										"Human➞Villager➞Journeyman"
									]
								}
							]
						}
					},
					resources: 15,
					setting: "Villager",
					skillPool: 5,
					skills: [
						"Any General➞Prospecting",
						"Any General➞Engineering",
						"Any Wise➞Ore-wise",
						"Any Wise➞Rock-wise",
						"Any General➞Command"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Grim",
						"Any Character➞Agoraphobic",
						"Dwarf Lifepath➞Deep Sense"
					],
					years: 8
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					mentalPool: 1,
					name: "Town Official",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Clerk",
										"Human➞Villager➞Clerk",
										"Human➞Religious➞Priest",
										"Human➞Religious➞Templar",
										"Human➞City Dweller➞Student",
										"Human➞Noble➞Student",
										"Human➞Noble Court➞Student"
									]
								}
							]
						}
					},
					resources: 25,
					setting: "Villager",
					skillPool: 8,
					skills: [
						"Any General➞Rule of Law",
						"Any General➞Persuasion",
						"Any General➞Etiquette",
						"Any General➞Interrogation",
						"Any General➞Falsehood",
						"Any Wise➞Town-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Pragmatic"
					],
					years: 5
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Seafaring"
					],
					mentalPool: 1,
					name: "Merchant",
					physicalPool: 0,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Accountant",
										"Human➞Seafaring➞Ship's Captain",
										"Human➞City Dweller➞Shopkeeper",
										"Human➞Villager➞Shopkeeper",
										"Human➞Outcast➞Smuggler",
										"Human➞Outcast➞Fence",
										"Human➞Villager➞Vintner",
										"Human➞Noble Court➞Chamberlain"
									]
								}
							]
						}
					},
					resources: 30,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Accounting",
						"Any General➞Persuasion",
						"Any General➞Falsehood",
						"Any Wise➞Wholesale-wise",
						"Any Wise➞Landlord-wise"
					],
					stock: "Human",
					traitPool: 1,
					traits: [
						"Any Character➞Distracted"
					],
					years: 7
				},
				{
					allowed: [
						"bwgr",
						"bs"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Religious",
						"Human➞City Dweller",
						"Human➞Servitude and Captive"
					],
					mentalPool: 1,
					name: "Village Wife",
					physicalPool: 1,
					requirements: {
						"texts": [
							"Players who take the Village Wife lifepath may also choose their husband's lifepath from the Villager setting. The Village Wife may choose from her husband's skills —she gets half of his skill points (including General points), rounded down— and she gets half of her husband's resources."
						]
					},
					resources: 5,
					setting: "Villager",
					skillPool: 2,
					skills: [
						"Any General➞Child-Rearing",
						"Any General➞Cooking"
					],
					stock: "Human",
					traitPool: 1,
					traits: [

					],
					years: 8
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Noble",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					mentalPool: 1,
					name: "Wizard's Apprentice",
					physicalPool: 0,
					requirements: {
					},
					resources: 10,
					setting: "Villager",
					skillPool: 6,
					skills: [
						"Any General➞Read",
						"Any General➞Foraging",
						"Any General➞Symbology",
						"Human Magical➞Circination",
						"Any Wise➞Pig-wise",
						"Any Wise➞Bone Headed-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Always in the Way",
						"Any Die➞Atravieso",
						"Human Special➞Gifted",
						"Human Special➞Assistant Pig-Keeper"
					],
					years: 7
				},
				{
					allowed: [
						"bwc"
					],
					born: false,
					eitherPool: 0,
					generalSkillPool: 0,
					leads: [
						"Human➞Peasant",
						"Human➞Noble",
						"Human➞Outcast"
					],
					mentalPool: 1,
					name: "Hedge Wizard",
					physicalPool: 1,
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Villager➞Wizard's Apprentice",
										"Human➞City Dweller➞Neophyte Sorcerer",
										"Human➞Noble Court➞Apt Pupil",
										"Human➞Outcast➞Apt Pupil",
										"Human➞Professional Soldier➞Apt Pupil",
										"Human➞Religious➞Apt Pupil",
										"Human➞College of Magic➞Junior Student"
									]
								},
								{
									type: "NOT",
									items: [
										"Trait➞Human Lifepath➞Mark of Privilage"
									]
								}
							]
						}
					},
					resources: 24,
					setting: "Villager",
					skillPool: 7,
					skills: [
						"Human Magical➞Sorcery",
						"Human Magical➞Enchanting",
						"Human Magical➞Alchemy",
						"Any General➞Obscure History",
						"Any Wise➞Pest-wise",
						"Any Wise➞Fool-wise"
					],
					stock: "Human",
					traitPool: 2,
					traits: [
						"Human Special➞Low Born",
						"Human Special➞Impressive Hat",
						"Human Special➞Never a Moment of Peace"
					],
					years: 8
				}
			]
		},
		"Nomad": {
			allowed: [
				"bs"
			],
			name: "Nomad",
			short: "Nomad",
			stock: "Human",
			type: "Setting",
			lifepaths: [
				{
					name: "Born Free",
					born: true,
					years: 8,
					resources: 3,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 2,
					skillPool: 2,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any Wise➞Migration-wise",
						"Any General➞Riding"
					],
					traits: [
						"Any Character➞Weathered",
						"Any Call-on➞Sense of Direction"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Forager",
					born: false,
					years: 5,
					resources: 5,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Foraging",
						"Any General➞Scavenging",
						"Any General➞Survival",
						"Any General➞Cooking",
						"Any Wise➞Bone-wise"
					],
					traits: [
						"Any Character➞Hoarding"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Hunter",
					born: false,
					years: 5,
					resources: 5,
					mentalPool: 1,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 1,
					leads: [
						"Human➞Peasant",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Hunting",
						"Any General➞Tracking",
						"Any General➞Stealthy",
						"Any General➞Cooking",
						"Any General➞Orienteering",
						"Any General➞Throwing",
						"Any General➞Bow"
					],
					traits: [
						"Any Character➞Lean"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Apprentice",
					born: false,
					years: 6,
					resources: 6,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 1,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Mending",
						"Any General➞Carving",
						"Any General➞Tanner",
						"Any General➞Firebuilding",
						"Any General➞Potter",
						"Any General➞Weaving"
					],
					traits: [
						"Human Lifepath➞Back-Breaking Labor"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Herder",
					born: false,
					years: 4,
					resources: 4,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 1,
					leads: [
						"Human➞Peasant",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Animal Husbandry",
						"Any General➞Sing",
						"Any General➞Climbing",
						"Any Wise➞Predator-wise",
						"Any General➞Riding"
					],
					traits: [
						"Any Character➞Smelly"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Lost in the Desert",
					born: false,
					years: 1,
					resources: 2,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 3,
					traitPool: 2,
					leads: [
						"Human➞Villager",
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Survival",
						"Any General➞Foraging",
						"Any Wise➞Hidey Hole-wise"
					],
					traits: [
						"Any Die➞Lost",
						"Any Die➞Unlucky",
						"Any Character➞Never Out of Sight"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Strange",
					born: false,
					years: 4,
					resources: 3,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 3,
					traitPool: 3,
					leads: [
						"Human➞Religious",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Inconspicuous",
						"Any General➞Foraging"
					],
					traits: [
						"Any Character➞Strange",
						"Human Lifepath➞Problems",
						"Any Call-on➞Meticulous",
						"Any Die➞Dreamer",
						"Any Die➞Second Sight",
						"Any Die➞Affinity for Bugs"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Pathfinder",
					born: false,
					years: 5,
					resources: 6,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 1,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Orienteering",
						"Any General➞Observation",
						"Any General➞Climbing",
						"Any General➞Riding",
						"Any General➞Survival",
						"Any Wise➞Oasis-wise"
					],
					traits: [

					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Forager",
										"Human➞Peasant➞Hunter",
										"Human➞Nomad➞Hunter"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Guide",
					born: false,
					years: 4,
					resources: 10,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 4,
					traitPool: 1,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Noble",
						"Human➞Servitude and Captive",
						"Human➞Nomad",
						"Human➞Noble Court",
						"Human➞Religious",
						"Human➞Professional Soldier",
						"Human➞Outcast",
						"Human➞Merchant House"
					],
					skills: [
						"Any Wise➞Desert-wise",
						"Any General➞Haggling",
						"Any General➞Soothing Platitudes",
						"Any General➞Survival"
					],
					traits: [
						"Any Character➞Superstitious",
						"Human Lifepath➞Tall Tale Teller"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MIN➞3"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Peddler",
					born: false,
					years: 6,
					resources: 12,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Peasant",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Haggling",
						"Any General➞Sing",
						"Any General➞Falsehood",
						"Any General➞Sleight of Hand"
					],
					traits: [
						"Any Character➞Prone to Exaggeration",
						"Any Call-on➞Glib"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Apprentice",
										"Human➞Villager➞Apprentice",
										"Human➞City Dweller➞Apprentice",
										"Human➞Nomad➞Apprentice",
										"Human➞Nomad➞Forager",
										"Human➞Nomad➞Herder"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Herd Overseer",
					born: false,
					years: 9,
					resources: 20,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 1,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Appraisal",
						"Any General➞Brewer",
						"Any General➞Bloodletting",
						"Any General➞Haggling",
						"Any Wise➞Kank-wise",
						"Any Wise➞Erdlu-wise"
					],
					traits: [
						"Any Character➞Grasping",
						"Any Die➞Rainman"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Herder"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Artisan",
					born: false,
					years: 8,
					resources: 12,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 1,
					leads: [
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Haggling",
						"Any General➞Embroidery",
						"Any General➞Saddlery",
						"Any General➞Bowyer",
						"Any General➞Fletcher",
						"Any General➞Weaponsmith",
						"Any General➞Armorer"
					],
					traits: [
						"Human Lifepath➞Made Man",
						"Any Character➞Improvisation"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞Apprentice",
										"Human➞Villager➞Apprentice",
										"Human➞City Dweller➞Apprentice",
										"Human➞Nomad➞Apprentice"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Warrior",
					born: false,
					years: 7,
					resources: 6,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 1,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					skills: [
						"Any General➞Conspicuous",
						"Any General➞Brawling",
						"Any General➞Spear",
						"Any General➞Bow",
						"Any General➞Knives",
						"Any General➞Intimidation",
						"Any General➞Mounted Combat Training"
					],
					traits: [
						"Any Character➞Proud"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Peasant➞Hunter",
										"Human➞Nomad➞Hunter",
										"Human➞Nomad➞Herder",
										"Human➞Outcast➞Scavenger",
										"Human➞Nomad➞Scavenger"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Performer",
					born: false,
					years: 4,
					resources: 5,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞City Dweller"
					],
					skills: [
						"Any General➞Sing",
						"Any General➞Dance",
						"Any General➞Persuasion",
						"Any General➞Musical Instrument",
						"Any General➞Falsehood",
						"Any General➞Sleight of Hand"
					],
					traits: [
						"Any Character➞Colorful",
						"Any Character➞Exotic"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MIN➞3"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Storyteller",
					born: false,
					years: 5,
					resources: 8,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 1,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞City Dweller"
					],
					skills: [
						"Any General➞Folklore",
						"Any General➞Poetry",
						"Any General➞Acting",
						"Any General➞Oratory",
						"Any General➞Conspicuous"
					],
					traits: [
						"Any Call-on➞Dramatic"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Performer",
										"Human➞Servitude and Captive➞Slave Performer",
										"Human➞Outcast➞Itinerant Performer",
										"Human➞City Dweller➞Performer",
										"Human➞Nomad➞Veteran",
										"Human➞Professional Soldier➞Veteran",
										"Human➞Nomad➞Elder",
										"Human➞Peasant➞Elder"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Tribal Wife",
					born: false,
					years: 9,
					resources: 4,
					mentalPool: 1,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 2,
					traitPool: 2,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Child-Rearing",
						"Any General➞Cooking"
					],
					traits: [
						"Any Character➞Burdened"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"LP➞MIN➞3"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Healer",
					born: false,
					years: 8,
					resources: 9,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Soothing Platitudes",
						"Any General➞Herbalism",
						"Any General➞Bloodletting",
						"Any General➞Midwifery",
						"Any Wise➞Omen-wise"
					],
					traits: [
						"Any Character➞Sick of Death",
						"Any Character➞Superstitious",
						"Any Character➞Bedside Manner"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Herder",
										"Human➞Nomad➞Shaman",
										"Human➞Professional Soldier➞Veteran",
										"Human➞Nomad➞Veteran"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Trader",
					born: false,
					years: 8,
					resources: 25,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Villager",
						"Human➞City Dweller",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Appraisal",
						"Any General➞Haggling",
						"Any Wise➞Goods-wise",
						"Any Wise➞Trade Route-wise",
						"Any Wise➞City Dweller-wise",
						"Any Wise➞Caravan-wise"
					],
					traits: [

					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Herd Overseer",
										"Human➞Nomad➞Artisan",
										"Human➞City Dweller➞Artisan",
										"Human➞Nomad➞Raider",
										"Human➞City Dweller➞City Peddler",
										"Human➞Peasant➞Peddler",
										"Human➞Villager➞Village Peddler"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Raider",
					born: false,
					years: 6,
					resources: 9,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					skills: [
						"Any General➞Appropriate Weapons",
						"Any General➞Stealthy",
						"Any General➞Intimidation",
						"Any Wise➞Town-wise",
						"Any Wise➞Caravan-wise",
						"Any Wise➞Loot-wise"
					],
					traits: [
						"Any Character➞Desperate",
						"Any Die➞Cold Blooded",
						"Any Call-on➞Quiet",
						"Any Character➞Boaster"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Warrior",
										"Human➞Professional Soldier➞Scout",
										"Human➞Nomad➞Trader"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Veteran",
					born: false,
					years: 10,
					resources: 14,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞Servitude and Captive",
						"Human➞Outcast",
						"Human➞Professional Soldier"
					],
					skills: [
						"Any Wise➞Battle-wise",
						"Any General➞Field Dressing",
						"Any General➞Shield Training",
						"Any General➞Soldiering",
						"Any General➞Command"
					],
					traits: [
						"Any Die➞Stubborn",
						"Human Lifepath➞Maimed"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Warrior",
										"Human➞Nomad➞Raider"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Shaman",
					born: false,
					years: 8,
					resources: 9,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Religious"
					],
					skills: [
						"Any General➞Folklore",
						"Human Special➞Astrology",
						"Any General➞Tribal History",
						"Any Wise➞Ancestor-wise",
						"Any Wise➞Ghost-wise",
						"Any General➞Oratory"
					],
					traits: [
						"Human Lifepath➞Revered",
						"Any Character➞Eccentric",
						"Any Call-on➞Empty Faith"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Setting➞Human➞Religious",
										"Human➞Nomad➞Strange"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Patriarch/Matriarch",
					born: false,
					years: 15,
					resources: 18,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 8,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any Wise➞Family-wise",
						"Any Wise➞Ancestor-wise",
						"Any Wise➞Tribe-wise",
						"Any General➞Persuasion",
						"Any General➞Almanac"
					],
					traits: [
						"Any Character➞Honored",
						"Any Character➞Conservative"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Herd Overseer",
										"Human➞Professional Soldier➞Veteran",
										"Human➞Nomad➞Veteran",
										"Human➞Nomad➞Artisan",
										"Human➞City Dweller➞Artisan"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Warleader",
					born: false,
					years: 7,
					resources: 15,
					mentalPool: 1,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 8,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive",
						"Human➞Professional Soldier"
					],
					skills: [
						"Any General➞Command",
						"Any General➞Appropriate Weapons",
						"Any General➞Oratory",
						"Any General➞Riding",
						"Any General➞Tactics",
						"Any General➞Field Dressing",
						"Any General➞Skirmish Tactics Training"
					],
					traits: [
						"Any Character➞Scarred",
						"Any Die➞Cool Headed",
						"Any Die➞Commanding Aura"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Headman",
										"Human➞Professional Soldier➞Veteran",
										"Human➞Nomad➞Veteran"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Headman",
					born: false,
					years: 10,
					resources: 20,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 2,
					skillPool: 4,
					traitPool: 1,
					leads: [
						"Human➞Outcast",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any Wise➞Tribe-wise",
						"Any General➞Oratory",
						"Any General➞Administration",
						"Any Wise➞Waste-wise"
					],
					traits: [
						"Human Lifepath➞Savvy"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Nomad➞Patriarch/Matriarch",
										"Human➞Nomad➞Trader",
										"Human➞Nomad➞Warleader",
										"Human➞Outcast➞Ravager"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Elder",
					born: false,
					years: 15,
					resources: 10,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [
						"Human➞Peasant",
						"Human➞Servitude and Captive"
					],
					skills: [
						"Any General➞Local History",
						"Any Wise➞Tribe-wise",
						"Any General➞Observation",
						"Any General➞Ugly Truth",
						"Any Wise➞Tradition-wise",
						"Any General➞Persuasion"
					],
					traits: [
						"Any Character➞Traditional",
						"Any Character➞Toothless",
						"Any Character➞Eccentric"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "AND",
									items: [
										"YEARS➞MIN➞45"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Wanderer",
					born: false,
					years: 4,
					resources: 3,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [
						"Human➞Villager"
					],
					skills: [
						"Any General➞Survival",
						"Any Wise➞Waste-wise",
						"Any General➞Foraging",
						"Any General➞Firebuilding",
						"Any Wise➞Ruins-wise",
						"Any Wise➞Bandit-wise"
					],
					traits: [
						"Any Character➞Weathered",
						"Any Die➞Light Sleeper",
						"Any Character➞Strange"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Bandit",
					born: false,
					years: 4,
					resources: 8,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 1,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant"
					],
					skills: [
						"Any General➞Appropriate Weapons",
						"Any General➞Stealthy",
						"Any Wise➞Caravan-wise",
						"Any General➞Survival",
						"Any Wise➞Waste-wise",
						"Any General➞Intimidation"
					],
					traits: [

					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Bandit King",
					born: false,
					years: 6,
					resources: 15,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Noble Court"
					],
					skills: [
						"Any General➞Intimidation",
						"Any General➞Command",
						"Any General➞Orienteering",
						"Any Wise➞Bandit-wise",
						"Any Wise➞Duststorm-wise",
						"Any Wise➞Caravan-wise",
						"Any General➞Appropriate Weapons",
						"Any General➞Two-Fisted Fighting Training"
					],
					traits: [
						"Any Die➞Scheming",
						"Any Character➞Sadistic",
						"Any Character➞Bitter"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Bandit",
										"Human➞Nomad➞Bandit",
										"Human➞Villager➞Village Sergeant",
										"Human➞Villager➞Corrupt Sergeant",
										"Human➞Professional Soldier➞Sergeant",
										"Human➞Noble➞Knight",
										"Human➞Noble Court➞Knight",
										"Human➞Professional Soldier➞Captain"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Monster Hunter",
					born: false,
					years: 4,
					resources: 6,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 1,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞Peasant"
					],
					skills: [
						"Any General➞Stealthy",
						"Any Wise➞Fell Beast-wise",
						"Any Wise➞Unspeakable Horror-wise",
						"Any Wise➞Half-Giant-wise",
						"Any General➞Appropriate Weapons",
						"Any General➞Survival",
						"Any Wise➞Waste-wise"
					],
					traits: [
						"Any Character➞Disturbingly Confident",
						"Any Die➞Fearless",
						"Any Character➞Hearty",
						"Any Character➞Mad"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Setting➞Human➞Outcast"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Bandit Hunter",
					born: false,
					years: 4,
					resources: 8,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Professional Soldier"
					],
					skills: [
						"Any Wise➞Bandit-wise",
						"Any General➞Tracking",
						"Any General➞Appropriate Weapons",
						"Any General➞Stealthy",
						"Any General➞Observation",
						"Any General➞Orienteering",
						"Any General➞Survival"
					],
					traits: [
						"Any Character➞Taciturn",
						"Any Die➞Light Sleeper",
						"Any Character➞Callous"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Scavenger",
					born: false,
					years: 4,
					resources: 3,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 2,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Peasant",
						"Human➞Merchant House"
					],
					skills: [
						"Any General➞Scavenging",
						"Any Wise➞Ruins-wise",
						"Any Wise➞Waste-wise",
						"Any General➞Survival",
						"Any General➞Brawling",
						"Any General➞Hunting"
					],
					traits: [
						"Any Character➞Scavenger",
						"Any Character➞Misanthropic",
						"Any Character➞Odd",
						"Any Character➞Nasty Cough"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				},
				{
					name: "Ruin Explorer",
					born: false,
					years: 5,
					resources: 15,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 8,
					traitPool: 3,
					leads: [
						"Human➞Outcast",
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Merchant House"
					],
					skills: [
						"Any Wise➞Ruins-wise",
						"Any Wise➞Loot-wise",
						"Any Wise➞Traps-wise",
						"Any General➞Stealthy",
						"Any General➞Climbing",
						"Any General➞Ancient History",
						"Any General➞Symbology",
						"Any General➞Scavenging"
					],
					traits: [
						"Any Call-on➞Driven",
						"Any Character➞Obsessed",
						"Any Character➞Mad",
						"Any Die➞Touch of Ages"
					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞Outcast➞Scavenger",
										"Human➞Nomad➞Scavenger"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Nomad",
					allowed: [
						"bs"
					]
				}
			]
		},
		"Merchant House": {
			allowed: [
				"bs"
			],
			name: "Merchant House",
			short: "Merchant",
			stock: "Human",
			type: "Subsetting",
			lifepaths: [
				{
					name: "Caravaneer",
					born: false,
					years: 4,
					resources: 5,
					mentalPool: 0,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Driving",
						"Any General➞Mending",
						"Any Wise➞Waste-wise",
						"Any Wise➞Caravan-wise",
						"Any General➞Brawling"
					],
					traits: [
						"Any Character➞Dusty",
						"Any Character➞Tired"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Merchant House",
					allowed: [
						"bs"
					]
				},
				{
					name: "Caravan Guard",
					born: false,
					years: 5,
					resources: 6,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 6,
					traitPool: 1,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Intimidation",
						"Any General➞Brawling",
						"Any General➞Appropriate Weapons",
						"Any General➞Shield Training",
						"Any Wise➞Waste-wise",
						"Any Wise➞Bandit-wise"
					],
					traits: [

					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Human➞City Dweller➞City Guard",
										"Setting➞Human➞Professional Soldier",
										"Human➞Outcast➞Bandit",
										"Human➞Nomad➞Bandit"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Merchant House",
					allowed: [
						"bs"
					]
				},
				{
					name: "Caravan Outrider",
					born: false,
					years: 5,
					resources: 7,
					mentalPool: 0,
					physicalPool: 1,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 8,
					traitPool: 1,
					leads: [
						"Human➞Professional Soldier",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Mounted Combat Training",
						"Any General➞Riding",
						"Any General➞Appropriate Weapons",
						"Any General➞Shield Training",
						"Any General➞Observation",
						"Any Wise➞Horse-wise",
						"Any Wise➞Waste-wise",
						"Any Wise➞Bandit-wise"
					],
					traits: [

					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Skill➞Any General➞Riding",
										"Human➞Merchant House➞Caravan Guard"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Merchant House",
					allowed: [
						"bs"
					]
				},
				{
					name: "Caravan Master",
					born: false,
					years: 5,
					resources: 20,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 7,
					traitPool: 2,
					leads: [
						"Human➞City Dweller",
						"Human➞Noble Court",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Caravan Management",
						"Any General➞Foreign Languages",
						"Any General➞Persuasion",
						"Any General➞Command",
						"Any General➞Haggling",
						"Any Wise➞Waste-wise",
						"Any Wise➞Duststorm-wise"
					],
					traits: [

					],
					requirements: {
						conditions: {
							type: "AND",
							items: [
								{
									type: "OR",
									items: [
										"Skill➞Any General➞Riding",
										"Human➞Merchant House➞Caravan Guard"
									]
								}
							]
						}
					},
					stock: "Human",
					setting: "Merchant House",
					allowed: [
						"bs"
					]
				},
				{
					name: "Camp Follower",
					born: false,
					years: 5,
					resources: 4,
					mentalPool: 1,
					physicalPool: 0,
					eitherPool: 0,
					generalSkillPool: 0,
					skillPool: 5,
					traitPool: 2,
					leads: [
						"Human➞City Dweller",
						"Human➞Outcast"
					],
					skills: [
						"Any General➞Conspicuous",
						"Any General➞Persuasion",
						"Any General➞Falsehood",
						"Any General➞Soothing Platitudes",
						"Any General➞Mending",
						"Any General➞Haggling"
					],
					traits: [
						"Any Character➞Tolerant",
						"Any Character➞Bitter",
						"Human Lifepath➞Broken"
					],
					requirements: {
					},
					stock: "Human",
					setting: "Merchant House",
					allowed: [
						"bs"
					]
				}
			]
		}
	}
};
