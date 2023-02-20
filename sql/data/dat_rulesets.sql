INSERT INTO 
    dat."Rulesets" 
	("Id", "Name", "IsOfficial", "IsPublic", "IsExpansion", "User")
VALUES
    ('bwgr', 	'Burning Wheel Gold Revised', 		true, 	true, 	false, 	null),
    ('bwc', 	'Burning Wheel Codex', 				true, 	true, 	true,	null),
    ('antv1', 	'Burning Wheel Anthology Volume 1', true, 	true, 	true,	null)

INSERT INTO
	dat."RulesetExpansions"
	("Id", "RulesetId", "ExpansionId")
VALUES
	(0, 'bwgr', 'bwc'),
	(1, 'bwgr', 'antv1');