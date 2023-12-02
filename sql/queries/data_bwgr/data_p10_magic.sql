INSERT INTO bwgr."SpellFacetTypes"
	("Id", "Name")
VALUES
	(0, 'Origin'),
	(1, 'Duration'),
	(2, 'Area of Effect'),
	(3, 'Element'),
	(4, 'Impetus');

INSERT INTO bwgr."SpellOriginFacets"
	("Id", "Name", "Obstacle", "Actions", "Resource")
VALUES
	(0, 'Personal', 2, 1, 3),
	(1, 'Presence', 3, 3, 9),
	(2, 'Sight', 4, 5, 15);

INSERT INTO bwgr."SpellDurationFacets"
	("Id", "Name", "Obstacle", "Actions", "Resource")
VALUES
	(0, 'Instantaneous', 1, 1, 3),
	(1, 'Sustained', 2, 2, 4),
	(2, 'Elapsed Time', -1, -1, -1),
	(3, 'Permanent', 10, 500, 1302);

INSERT INTO bwgr."SpellAreaOfEffectFacets"
	("Id", "Name", "Obstacle", "Actions", "Resource")
VALUES
	(0, 'Caster', 1, 1, 3),
	(1, 'Single Target', 2, 2, 6),
	(2, 'Presence', 3, 4, 9),
	(3, 'Natural Effect', 4, 8, 18),
	(4, 'Measured Area', -1, -1, -1);

INSERT INTO bwgr."SpellElementFacets"
	("Id", "Name", "Obstacle", "Actions", "Resource")
VALUES
	(0, 'Anima', 5, 9, 24),
	(1, 'Arcana', 5, 24, 45),
	(2, 'Heaven', 4, 30, 39),
	(3, 'White', 5, 4, 18),
	(4, 'Fire', 5, 2, 15),
	(5, 'Air', 4, 2, 12),
	(6, 'Earth', 3, 8, 12),
	(7, 'Water', 4, 6, 15);

INSERT INTO bwgr."SpellImpetusFacets"
	("Id", "Name", "Obstacle", "Actions", "Resource")
VALUES
	(0, 'Create', 8, 4, 42),
	(1, 'Destroy', 6, 7, 32),
	(2, 'Tax', 9, 33, 117),
	(3, 'Transmute', 5, 1, 15),
	(4, 'Control', 7, 13, 48),
	(5, 'Influence', 4, 1, 9),
	(6, 'Enhance', 10, 27, 120);
