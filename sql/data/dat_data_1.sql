INSERT INTO
	dat."AbilityTypes"
	("Id", "Name")
VALUES
	(0, 'Stat'),
	(1, 'Attribute');

INSERT INTO
	dat."Abilities"
	("Id", 	"Name", 				"AbilityTypeId", 	"HasShades")
VALUES
	(0,		'Will',					0, 					true),
	(1,		'Perception',			0, 					true),
	(2,		'Power',				0, 					true),
	(3,		'Agility',				0, 					true),
	(4,		'Forte',				0, 					true),
	(5,		'Speed',				0, 					true),
	(6,		'Stride',				1, 					false),
	(6,		'Health',				1, 					true),
	(7,		'Steel',				1, 					true),
	(8,		'Reflexes',				1, 					false),
	(9,		'Resources',			1, 					true),
	(10,	'Circles',				1, 					true),
	(11,	'Hesitation',			1, 					false),
	(12,	'Greed',				1, 					true),
	(13,	'Grief',				1, 					true),
	(14,	'Spite',				1, 					true),
	(15,	'Faith',				1, 					true),
	(16,	'Faith in Dead Gods',	1, 					true),
	(17,	'Hatred',				1, 					true),
	(18,	'Void Embrace',			1, 					true),
	(19,	'Ancestral Taint',		1, 					true),
	(20,	'Corruption',			1, 					true);