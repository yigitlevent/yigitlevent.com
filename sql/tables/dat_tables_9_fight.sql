-- Table: dat.FightActionGroups

-- DROP TABLE IF EXISTS dat."FightActionGroups";

CREATE TABLE dat."FightActionGroups"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS dat."FightActionGroups"
    OWNER to apiuser;


-- Table: dat.FightActions

-- DROP TABLE IF EXISTS dat."FightActions";

CREATE TABLE dat."FightActions"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"GroupId" integer NOT NULL,
	"ActionCost" integer,
	"TestExtra" character varying(325124),
	"Restrictions" character varying(325124),
	"Effect" character varying(325124),
	"Special" character varying(325124),
	"CountsAsNoAction" boolean NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("GroupId")
        REFERENCES dat."FightActionGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."FightActions"
    OWNER to apiuser;


-- Table: dat.FightActionTests

-- DROP TABLE IF EXISTS dat."FightActionTests";

CREATE TABLE dat."FightActionTests"
(
	"Id" int NOT NULL,
	"ActionId" int NOT NULL,
	"SkillId" int,
	"AbilityId" int,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ActionId")
        REFERENCES dat."FightActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AbilityId")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
	CHECK (("SkillId" IS NULL) <> ("AbilityId" IS NULL))
);

ALTER TABLE IF EXISTS dat."FightActionTests"
    OWNER to apiuser;
	
	
-- Table: dat.FightActionResolutions

-- DROP TABLE IF EXISTS dat."FightActionResolutions";

CREATE TABLE dat."FightActionResolutions"
(
	"Id" serial NOT NULL,
	"ActionId" int NOT NULL,
	"OpposingActionId" int NOT NULL,
	"ResolutionTypeId" int NOT NULL,
	"IsAgainstSkill" boolean,
	"Obstacle" int,
	"SkillId" int,
	"AbilityId" int,
	"OpposingSkillId" int,
	"OpposingAbilityId" int,
	"OpposingModifier" int,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ActionId")
        REFERENCES dat."FightActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingActionId")
        REFERENCES dat."FightActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ResolutionTypeId")
        REFERENCES dat."ActionResolutionTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AbilityId")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingSkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingAbilityId")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."FightActionResolutions"
    OWNER to apiuser;