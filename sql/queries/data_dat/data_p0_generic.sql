INSERT INTO dat."LogicTypes"
	("Id", "Name")
VALUES
	(0, 'AND'),
	(1, 'OR'),
	(2, 'NOT');

INSERT INTO dat."RequirementItemTypes"
	("Id", "Name")
VALUES
	(0, 'UNIQUE'),
	(1, 'MALE'),
	(2, 'FEMALE'),
	(3, 'SETTINGENTRY'),
	(4, 'YEARS'),
	(5, 'LPINDEX'),
	(6, 'OLDESTBY'),
	(7, 'SETTING'),
	(8, 'LIFEPATH'),
	(9, 'SKILL'),
	(10, 'TRAIT'),
	(11, 'ATTRIBUTE'),
	(12, 'QUESTION');

INSERT INTO dat."AbilityTypes"
	("Id", "Name")
VALUES
	(0, 'Mental Stat'),
	(1, 'Physical Stat'),
	(2, 'Attribute'),
	(3, 'Emotional Attribute');

INSERT INTO dat."SkillTypes"
	("Id", "Name", "Cycle", "Routine", "Difficult", "Challenging")
VALUES
	(0, 'Academic', 6, 2, 4, 8),
	(1, 'Artisan', 12, 4, 8, 12),
	(2, 'Artist', 6, 3, 6, 12),
	(3, 'Craftsman', 12, 3, 8, 12),
	(4, 'Forester', 6, 3, 6, 12),
	(5, 'Martial', 1, 2, 4, 8),
	(6, 'Medicinal', 12, 4, 8, 12),
	(7, 'Military', 6, 2, 4, 8),
	(8, 'Musical', 1, 2, 4, 8),
	(9, 'Peasant', 3, 1, 4, 12),
	(10, 'Physical', 1, 2, 4, 8),
	(11, 'School of Thought', 6, 3, 6, 12),
	(12, 'Seafaring', 3, 2, 4, 8),
	(13, 'Social', 1, 2, 4, 8),
	(14, 'Sorcerous', 12, 5, 10, 15),
	(15, 'Special', 3, 3, 6, 12);

INSERT INTO dat."SkillCategories"
	("Id", "Name")
VALUES
	(0, 'General'),
	(1, 'Wise'),
	(2, 'Magical'),
	(3, 'Special'),
	(4, 'Monstrous'),
	(5, 'Art'),
	(6, 'Skill Song'),
	(7, 'Spell Song'),
	(8, 'Spirit Hunter Song');

INSERT INTO dat."SkillToolTypes"
	("Id", "Name")
VALUES
	(0, 'No'),
	(1, 'Tools'),
	(2, 'Workshop'),
	(3, 'Other'),
	(4, 'Traveling Gear');

INSERT INTO dat."TraitTypes"
	("Id", "Name")
VALUES
	(0, 'Character'),
	(1, 'Call-on'),
	(2, 'Die'),
	(3, 'Call-on and Die');

INSERT INTO dat."TraitCategories"
	("Id", "Name")
VALUES
	(0, 'General'),
	(1, 'Monstrous'),
	(2, 'Common'),
	(3, 'Lifepath'),
	(4, 'Special');

INSERT INTO dat."ActionResolutionTypes"
	("Id", "Name", "NameLong")
VALUES
	(0, 'Skill', 'Skill'),
	(1, 'Ob', 'Obstacle'),
	(2, 'Std', 'Standard'),
	(3, 'Vs', 'Versus'),
	(4, 'Vs+', 'Versus plus'),
	(5, '+Vs', 'plus Versus'),
	(6, '½', 'Half of');

INSERT INTO dat."ResourceTypes"
	("Id", "Name")
VALUES
	(0, 'Gear'),
	(1, 'Property'),
	(2, 'Relationship'),
	(3, 'Reputation'),
	(4, 'Affiliation'),
	(5, 'Magical');

INSERT INTO dat."TimeUnits"
	("Id", "Name")
VALUES
	(0, 'Exchanges'),
	(1, 'Minutes'),
	(2, 'Hours'),
	(3, 'Days'),
	(4, 'Weeks'),
	(5, 'Months'),
	(6, 'Seasons'),
	(7, 'Years');

INSERT INTO dat."DistanceUnits"
	("Id", "Name")
VALUES
	(0, 'Paces'),
	(1, '10s of Paces'),
	(2, '100s of Paces'),
	(3, 'Miles');

INSERT INTO dat."UnitModifiers"
	("Id", "Name")
VALUES
	(0, 'Quarter'),
	(1, 'Half'),
	(2, 'Double'),
	(3, 'Triple');
