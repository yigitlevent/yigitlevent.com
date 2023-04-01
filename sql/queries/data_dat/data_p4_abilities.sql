INSERT INTO dat."Abilities"
	("Id", "Name", "AbilityTypeId", "HasShades", "Cycle", "Routine", "Difficult", "Challenging", "RequiredTraitId")
VALUES
	(0, 'Will', 0, true, 12, 4, 8, 16, null),
	(1, 'Perception', 0, true, 6, 3, 6, 12, null),
	(2, 'Power', 1, true, 1, 2, 4, 8, null),
	(3, 'Agility', 1, true, 3, 2, 4, 8, null),
	(4, 'Forte', 1, true, 2, 4, 8, 16, null),
	(5, 'Speed', 1, true, 3, 3, 6, 9, null),
	(6, 'Health', 2, true, null, null, null, null, null),
	(7, 'Steel', 2, true, 2, 1, 3, 9, null),
	(8, 'Reflexes', 2, true, null, null, null, null, null),
	(9, 'Resources', 2, true, null, null, null, null, null),
	(10, 'Circles', 2, true, null, null, null, null, null),
	(11, 'Hesitation', 2, false, null, null, null, null, null),
	(12, 'Greed', 3, true, null, null, null, null, 737),
	(13, 'Grief', 3, true, null, null, null, null, 773),
	(14, 'Spite', 3, true, null, null, null, null, 798),
	(15, 'Faith', 3, true, 12, 5, 10, 20, 893),
	(16, 'Faith in Dead Gods', 3, true, null, null, null, null, 827),
	(17, 'Hatred', 3, true, null, null, null, null, 920),
	(18, 'Void Embrace', 3, true, null, null, null, null, 954),
	(19, 'Ancestral Taint', 3, true, null, null, null, null, 1121),
	(20, 'Corruption', 3, true, null, null, null, null, 885);
