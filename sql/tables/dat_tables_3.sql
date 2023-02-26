-- Table: dat.SkillTools

-- DROP TABLE IF EXISTS dat."SkillTools";

CREATE TABLE dat."SkillTools"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL
)

ALTER TABLE IF EXISTS dat."SkillTools"
    OWNER to apiuser;
	

-- Table: dat.SkillTypes

-- DROP TABLE IF EXISTS dat."SkillTypes";

CREATE TABLE dat."SkillTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL
)

ALTER TABLE IF EXISTS dat."SkillTypes"
    OWNER to apiuser;

-- Table: dat.SkillCategories

-- DROP TABLE IF EXISTS dat."SkillCategories";

CREATE TABLE dat."SkillCategories"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL
)

ALTER TABLE IF EXISTS dat."SkillCategories"
    OWNER to apiuser;


-- Table: dat.SkillGroups

-- DROP TABLE IF EXISTS dat."SkillGroups";

CREATE TABLE dat."SkillGroups"
(
	"Id" serial NOT NULL,
	"StockId" integer,
	"CategoryId" integer NOT NULL,
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("CategoryId")
        REFERENCES dat."SkillCategories" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."SkillGroups"
    OWNER to apiuser;
	

-- Table: dat.RulesetSkillGroups

-- DROP TABLE IF EXISTS dat."RulesetSkillGroups";

CREATE TABLE dat."RulesetSkillGroups"
(
	"SkillGroupId" integer NOT NULL,
	"RulesetId" integer NOT NULL,
    PRIMARY KEY ("SkillGroupId", "RulesetId"),
    FOREIGN KEY ("SkillGroupId")
        REFERENCES dat."SkillGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RulesetSkillGroups"
    OWNER to apiuser;


-- Table: dat.Skills

-- DROP TABLE IF EXISTS dat."Skills";

CREATE TABLE dat."Skills"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"SkillGroupId" integer NOT NULL,
	"SkillTypeId" integer NOT NULL,
	"IsMagical" boolean NOT NULL,
	"IsTraining" boolean NOT NULL,
	"DontList" boolean NOT NULL,
	"Root1Id" integer,
	"Root2Id" integer,
	"Root3Id" integer,
	"Description" character varying(325124), -- 10485760?
	"ToolsTypeId" integer,
	"ToolsDescription" character varying(255),
    FOREIGN KEY ("SkillGroupId")
        REFERENCES dat."SkillGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillTypeId")
        REFERENCES dat."SkillTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Root1Id")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Root2Id")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Root3Id")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ToolsTypeId")
        REFERENCES dat."SkillTools" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."Skills"
    OWNER to apiuser;


-- Table: dat.RulesetSkills

-- DROP TABLE IF EXISTS dat."RulesetSkills";

CREATE TABLE dat."RulesetSkills"
(
	"SkillId" integer NOT NULL,
	"RulesetId" integer NOT NULL,
    PRIMARY KEY ("SkillId", "RulesetId"),
    FOREIGN KEY ("SkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RulesetSkills"
    OWNER to apiuser;