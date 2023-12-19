-- Table: bwgr.FightActionGroups

-- DROP TABLE IF EXISTS bwgr."FightActionGroups";

CREATE TABLE bwgr."FightActionGroups"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."FightActionGroups"
    OWNER to apiuser;


-- Table: bwgr.FightActions

-- DROP TABLE IF EXISTS bwgr."FightActions";

CREATE TABLE bwgr."FightActions"
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
        REFERENCES bwgr."FightActionGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."FightActions"
    OWNER to apiuser;


-- Table: bwgr.FightActionTests

-- DROP TABLE IF EXISTS bwgr."FightActionTests";

CREATE TABLE bwgr."FightActionTests"
(
	"Id" int NOT NULL,
	"ActionId" int NOT NULL,
	"SkillId" int,
	"AbilityId" int,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ActionId")
        REFERENCES bwgr."FightActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AbilityId")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
	CHECK (("SkillId" IS NULL) <> ("AbilityId" IS NULL))
);

ALTER TABLE IF EXISTS bwgr."FightActionTests"
    OWNER to apiuser;
	
	
-- Table: bwgr.FightActionResolutions

-- DROP TABLE IF EXISTS bwgr."FightActionResolutions";

CREATE TABLE bwgr."FightActionResolutions"
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
        REFERENCES bwgr."FightActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingActionId")
        REFERENCES bwgr."FightActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ResolutionTypeId")
        REFERENCES bwgr."ActionResolutionTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AbilityId")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingSkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingAbilityId")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."FightActionResolutions"
    OWNER to apiuser;