INSERT INTO 
    dat."Rulesets" 
	("Id", "Name", "IsOfficial", "IsPublic", "IsExpansion", "ParentRulesetId", "User")
VALUES
    ('bwgr', 	'Burning Wheel Gold Revised', 		true, 	true, 	false, 	null, 		null),
    ('bwc', 	'Burning Wheel Codex', 				true, 	true, 	true,	'bwgr',		null),
    ('antv1', 	'Burning Wheel Anthology Volume 1', true, 	true, 	true,	'bwgr',		null)