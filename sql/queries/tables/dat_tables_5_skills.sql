-- Table: dat.Skills

-- DROP TABLE IF EXISTS dat."Skills";

CREATE TABLE dat."Skills"
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
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("CategoryId")
        REFERENCES dat."SkillCategories" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TypeId")
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
    FOREIGN KEY ("ToolTypeId")
        REFERENCES dat."SkillToolTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."Skills"
    OWNER to apiuser;

-- Table: dat.RulesetSkills

-- DROP TABLE IF EXISTS dat."RulesetSkills";

CREATE TABLE dat."RulesetSkills"
(
	"SkillId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
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
);

ALTER TABLE IF EXISTS dat."RulesetSkills"
    OWNER to apiuser;


-- Table: dat.SkillSubskills

-- DROP TABLE IF EXISTS dat."SkillSubskills";

CREATE TABLE dat."SkillSubskills"
(
	"SkillId" integer NOT NULL,
	"SubskillId" integer NOT NULL,
    PRIMARY KEY ("SkillId", "SubskillId"),
    FOREIGN KEY ("SkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SubskillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
	CHECK ("SkillId" <> "SubskillId")
);

ALTER TABLE IF EXISTS dat."SkillSubskills"
    OWNER to apiuser;