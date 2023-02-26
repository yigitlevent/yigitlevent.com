INSERT INTO
	dat."AbilityTypes"
	("Id", "Name")
VALUES
	(0, 'Stat'),
	(1, 'Attributes');

INSERT INTO
	dat."Abilities"
	("Id", 	"Name", 				"AbilityTypeId", 	"HasShades")
VALUES
	(0,		'Will',					'Stat', 			true),
	(1,		'Perception',			'Stat', 			true),
	(2,		'Power',				'Stat', 			true),
	(3,		'Agility',				'Stat', 			true),
	(4,		'Forte',				'Stat', 			true),
	(5,		'Speed',				'Stat', 			true),
	(6,		'Stride',				'Attributes', 		false),
	(6,		'Health',				'Attributes', 		true),
	(7,		'Steel',				'Attributes', 		true),
	(8,		'Reflexes',				'Attributes', 		false),
	(9,		'Resources',			'Attributes', 		true),
	(10,	'Circles',				'Attributes', 		true),
	(11,	'Hesitation',			'Attributes', 		false),
	(12,	'Greed',				'Attributes', 		true),
	(13,	'Grief',				'Attributes', 		true),
	(14,	'Spite',				'Attributes', 		true),
	(15,	'Faith',				'Attributes', 		true),
	(16,	'Faith in Dead Gods',	'Attributes', 		true),
	(17,	'Hatred',				'Attributes', 		true),
	(18,	'Void Embrace',			'Attributes', 		true),
	(19,	'Ancestral Taint',		'Attributes', 		true),
	(20,	'Corruption',			'Attributes', 		true);