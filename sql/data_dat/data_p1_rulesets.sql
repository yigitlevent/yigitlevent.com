INSERT INTO dat."Rulesets"
	("Id", "Name", "IsOfficial", "IsPublic", "IsExpansion", "User")
VALUES
	('bwgr', 'Burning Wheel Gold Revised', true, true, false, null),
	('bs', 'Burning Sun', false, true, false, null),
	('bwc', 'Burning Wheel Codex', true, true, true, null),
	('antv1', 'Burning Wheel Anthology Volume 1', true, true, true, null);

INSERT INTO dat."RulesetExpansions"
	("RulesetId", "ExpansionId")
VALUES
	('bwgr', 'bwc'),
	('bwgr', 'antv1');
