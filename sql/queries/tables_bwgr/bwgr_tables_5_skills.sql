-- Table: bwgr.Skills

-- DROP TABLE IF EXISTS bwgr."Skills";

CREATE TABLE bwgr."Skills"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"StockId" integer,
	"CategoryId" integer NOT NULL,
	"TypeId" integer NOT NULL,
	"IsMagical" boolean NOT NULL,
	"IsTraining" boolean NOT NULL,
	"DontList" boolean NOT NULL,
	"Root1Id" integer,
	"Root2Id" integer,
	"Description" character varying(325124), -- 10485760?
	"ToolTypeId" integer,
	"ToolDescription" character varying(255),
	"RestrictionOnlyStockId" integer,
	"RestrictionWhenBurning" boolean,
	"RestrictionAbilityId" integer, 
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES bwgr."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("CategoryId")
        REFERENCES bwgr."SkillCategories" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TypeId")
        REFERENCES bwgr."SkillTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Root1Id")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Root2Id")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ToolTypeId")
        REFERENCES bwgr."SkillToolTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RestrictionOnlyStockId")
        REFERENCES bwgr."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RestrictionAbilityId")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."Skills"
    OWNER to apiuser;

-- Table: bwgr.RulesetSkills

-- DROP TABLE IF EXISTS bwgr."RulesetSkills";

CREATE TABLE bwgr."RulesetSkills"
(
	"SkillId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("SkillId", "RulesetId"),
    FOREIGN KEY ("SkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES bwgr."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."RulesetSkills"
    OWNER to apiuser;


-- Table: bwgr.SkillSubskills

-- DROP TABLE IF EXISTS bwgr."SkillSubskills";

CREATE TABLE bwgr."SkillSubskills"
(
	"SkillId" integer NOT NULL,
	"SubskillId" integer NOT NULL,
    PRIMARY KEY ("SkillId", "SubskillId"),
    FOREIGN KEY ("SkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SubskillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
	CHECK ("SkillId" <> "SubskillId")
);

ALTER TABLE IF EXISTS bwgr."SkillSubskills"
    OWNER to apiuser;