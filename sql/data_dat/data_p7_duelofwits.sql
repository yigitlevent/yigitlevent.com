INSERT INTO dat."DuelOfWitsActions"
	("Id", "Name", "SpeakingThePart", "Special", "Effect")
VALUES
	(0, 'Avoid the Topic', 'The speaking player must veer off topic, even to the point of sounding desperate or ridiculous.', null, 'Avoid successes are subtracted from your opponent''s Point, Obfuscate or Incite successes. This reduces the effectiveness of an opposed action. If Obfuscate or Incite successes aren''t reduced to zero, then the incoming action wins and takes effect. Avoid never suffers a double obstacle penalty for stat versus skill. It''s special.'),
	(1, 'Dismiss', 'This maneuver is used for the cataclysmic and undeniable conclusion of an argument. Loudly declare that your opponent knows nothing about the topic at hand and, furthermore, he''s a fool and a dullard and shouldn''t be listened to any further!', 'If a character fails to win the duel via his Dismiss action, he must hesitate for his next volley. Either cross off the next action, or skip the first volley of the coming exchange.', 'Scripting a Dismiss adds +2D to the character''s skill. In a standard test, subtract each success rolled from your opponent''s body of argument. Against Rebuttal, subtract your margin of success over your opponent''s defense from the body of argument. If you win against Obfuscate, all Dismiss successes are subtracted from the body of argument —not just your margin of success.'),
	(2, 'Feint', 'Using a Feint, the speaker leads his opponent on into a trap. He lures him to think he is discussing one point, until the hidden barb is revealed.', null, 'Feint can be used to bypass Rebuttal and to attack Feint, Incite and Obfuscate. In a standard test, each success subtracts from your opponent''s body of argument. In a versus test, margin of success is subtracted from your opponent''s body of argument.'),
	(3, 'Incite', 'With an acid tongue and biting wit, a character may attempt to distract or dismay his opponent. The speaking player must pronounce an outright insult to his opponent.', null, 'In a standard test, the obstacle is equal to the victim''s Will exponent. If the In citing player passes the standard test or wins the versus test, the victim must make a Steel test. If the victim hesit ates, he misses his next action. However, if the Incite fails, the margin of failure is added as advantage dice to the opponent''s next test.'),
	(4, 'Obfuscate', 'Obfuscate is a verbal block . The player attempting to Obfuscate must present some non sequitur or bizarre, unrelated point in an attempt to confuse or distract his opponent. Obfuscate is spoken while your opponent is speaking.', null, 'Obfuscate is tested versus everything, even itself. If the Obfuscator wins, the victim of this tactic loses his current action. If the Obfuscator exceeds his obstacle, his opponent also suffers a +1 Ob to his next action. If the Obfuscator loses the versus test, his opponent''s current action goes off and his successes are applied as per his action description. Furthermore, he gain +1D to his next action.'),
	(5, 'Point', 'The Point action is the main attack of the verbal duelist. Hammer away using your statement of purpose and related points!', null, 'In a standard test, subtract your Point successes from your opponent''s body of argument. In a versus test, subtract the margin of success from your opponent''s body of argument. This is the way to win debates!'),
	(6, 'Rebuttal', 'The player first lets his opponent make his attack. He then refutes the arguments made while making a fresh point himself.', 'When making a Rebuttal, you must divide your dice between attack and defense. This division happens before his opponent roll s. You must put at least one die in each pool. Any penalties to the action are applied to both pools. Any bonuses to the action are only applied to either attack or defense. If you only have one die, you can choose whether you attack or defend.', 'Successes from the defense roll are subtracted from the opponent''s successes. To fully defend against an Obfuscate action, you must get more defense successes than your opponent''s Obfuscate successes. Each success on the attacking portion of a Rebuttal reduces your opponent''s body of argument.'),
	(7, 'Pray/Cast/etc', null, null, null),
	(8, 'Hesitate', null, null, null);

INSERT INTO dat."DuelOfWitsActionTests"
	("ActionId", "SkillId", "AbilityId")
VALUES
	(0, null, 0),
	(1, 688, null),
	(1, 47, null),
	(1, 111, null),
	(1, 140, null),
	(1, 155, null),
	(1, 158, null),
	(1, 699, null),
	(1, 200, null),
	(2, 76, null),
	(2, 78, null),
	(2, 110, null),
	(2, 143, null),
	(2, 823, null),
	(2, 155, null),
	(2, 158, null),
	(2, 177, null),
	(2, 167, null),
	(3, 688, null),
	(3, 47, null),
	(3, 76, null),
	(3, 78, null),
	(3, 111, null),
	(3, 167, null),
	(3, 200, null),
	(4, 78, null),
	(4, 140, null),
	(4, 823, null),
	(4, 158, null),
	(4, 155, null),
	(4, 177, null),
	(4, 699, null),
	(4, 184, null),
	(4, 200, null),
	(5, 688, null),
	(5, 110, null),
	(5, 140, null),
	(5, 143, null),
	(5, 823, null),
	(5, 158, null),
	(5, 699, null),
	(6, 76, null),
	(6, 110, null),
	(6, 140, null),
	(6, 143, null),
	(6, 823, null),
	(6, 158, null),
	(6, 699, null),
	(6, 184, null);

INSERT INTO dat."DuelOfWitsActionResolutions"
	("Id", "ActionId", "OpposingActionId", "ResolutionTypeId", "IsAgainstSkill", "Obstacle", "SkillId", "AbilityId", "OpposingSkillId", "OpposingAbilityId", "OpposingModifier")
VALUES
	(0, 0, 3, 3, null, null, null, null, null, null, null),
	(1, 0, 4, 3, null, null, null, null, null, null, null),
	(2, 0, 5, 3, null, null, null, null, null, null, null),
	(3, 1, 0, 2, null, null, null, null, null, null, null),
	(4, 1, 1, 2, null, null, null, null, null, null, null),
	(5, 1, 2, 2, null, null, null, null, null, null, null),
	(6, 1, 3, 2, null, null, null, null, null, null, null),
	(7, 1, 4, 3, null, null, null, null, null, null, null),
	(8, 1, 5, 2, null, null, null, null, null, null, null),
	(9, 1, 6, 3, null, null, null, null, null, null, null),
	(10, 2, 2, 3, null, null, null, null, null, null, null),
	(11, 2, 3, 3, null, null, null, null, null, null, null),
	(12, 2, 4, 3, null, null, null, null, null, null, null),
	(13, 2, 6, 2, null, null, null, null, null, null, null),
	(14, 3, 0, 3, null, null, null, null, null, null, null),
	(15, 3, 1, 2, null, null, null, null, null, null, null),
	(16, 3, 2, 3, null, null, null, null, null, null, null),
	(17, 3, 3, 2, null, null, null, null, null, null, null),
	(18, 3, 4, 3, null, null, null, null, null, null, null),
	(19, 3, 5, 2, null, null, null, null, null, null, null),
	(20, 3, 6, 2, null, null, null, null, null, null, null),
	(21, 4, 0, 3, null, null, null, null, null, null, null),
	(22, 4, 1, 3, null, null, null, null, null, null, null),
	(23, 4, 2, 3, null, null, null, null, null, null, null),
	(24, 4, 3, 3, null, null, null, null, null, null, null),
	(25, 4, 4, 3, null, null, null, null, null, null, null),
	(26, 4, 5, 3, null, null, null, null, null, null, null),
	(27, 4, 6, 3, null, null, null, null, null, null, null),
	(28, 5, 0, 3, null, null, null, null, null, null, null),
	(29, 5, 1, 2, null, null, null, null, null, null, null),
	(30, 5, 2, 2, null, null, null, null, null, null, null),
	(31, 5, 3, 2, null, null, null, null, null, null, null),
	(32, 5, 4, 3, null, null, null, null, null, null, null),
	(33, 5, 5, 2, null, null, null, null, null, null, null),
	(34, 5, 6, 3, null, null, null, null, null, null, null),
	(35, 6, 1, 3, null, null, null, null, null, null, null),
	(36, 6, 4, 3, null, null, null, null, null, null, null),
	(37, 6, 5, 3, null, null, null, null, null, null, null),
	(38, 7, 1, 1, null, 1, null, null, null, null, null),
	(39, 7, 2, 1, null, 1, null, null, null, null, null),
	(40, 7, 3, 1, null, null, null, null, null, 0, null),
	(41, 7, 4, 1, null, 1, null, null, null, null, null),
	(42, 7, 5, 1, null, 1, null, null, null, null, null),
	(43, 8, 1, 1, null, 1, null, null, null, null, null),
	(44, 8, 2, 1, null, 1, null, null, null, null, null),
	(45, 8, 3, 1, null, null, null, null, null, 0, null),
	(46, 8, 4, 1, null, 1, null, null, null, null, null),
	(47, 8, 5, 1, null, 1, null, null, null, null, null);
