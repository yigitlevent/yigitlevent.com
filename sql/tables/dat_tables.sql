-- SCHEMA: dat

-- DROP SCHEMA IF EXISTS dat;

CREATE SCHEMA IF NOT EXISTS dat
    AUTHORIZATION apiuser;


-- Table: dat.Rulesets

-- DROP TABLE IF EXISTS dat."Rulesets";

CREATE TABLE dat."Rulesets"
(
    "Id" character varying(15) NOT NULL,
    "Name" character varying(255) NOT NULL,
    "IsOfficial" boolean NOT NULL,
    "IsPublic" boolean NOT NULL,
	"IsExpansion" boolean NOT NULL,
    "User" uuid,
    PRIMARY KEY ("Id"),
    UNIQUE ("Id"),
    FOREIGN KEY ("User")
        REFERENCES usr."Users" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."Rulesets"
    OWNER to apiuser;


-- Table: dat.RulesetsExpansions

-- DROP TABLE IF EXISTS dat."RulesetExpansions";

CREATE TABLE dat."RulesetExpansions"
(
    "Id" serial NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
	"ExpansionId" character varying(15) NOT NULL,
    PRIMARY KEY ("Id"),
    UNIQUE ("Id"),
    FOREIGN KEY ("ParentRulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ExpansionId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."RulesetExpansions"
    OWNER to apiuser;


-- Table: dat.Stocks

-- DROP TABLE IF EXISTS dat."Stocks";

CREATE TABLE dat."Stocks"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"NameShort" character varying(255) NOT NULL,
	"NamePlural" character varying(255) NOT NULL,
	"Stride" integer NOT NULL
)

ALTER TABLE IF EXISTS dat."Stocks"
    OWNER to apiuser;


-- Table: dat.AgePools

-- DROP TABLE IF EXISTS dat."AgePools";

CREATE TABLE dat."AgePools"
(
	"Id" serial NOT NULL,
	"StockId" serial NOT NULL,
	"MinAge" integer NOT NULL,
	"MentalPool" integer NOT NULL,
	"PhysicalPool" integer NOT NULL,
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
)

ALTER TABLE IF EXISTS dat."AgePools"
    OWNER to apiuser;


-- Table: dat.RulesetStocks

-- DROP TABLE IF EXISTS dat."RulesetStocks";

CREATE TABLE dat."RulesetStocks"
(
	"StockId" integer NOT NULL,
	"RulesetId" integer NOT NULL,
    PRIMARY KEY ("StockId", "RulesetId"),
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RulesetStocks"
    OWNER to apiuser;


-- Table: dat.Settings

-- DROP TABLE IF EXISTS dat."Settings";

CREATE TABLE dat."Settings"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"NameShort" character varying(255) NOT NULL,
	"StockId" integer NOT NULL,
	"IsSubsetting" boolean NOT NULL,
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
)

ALTER TABLE IF EXISTS dat."Settings"
    OWNER to apiuser;


-- Table: dat.RulesetSettings

-- DROP TABLE IF EXISTS dat."RulesetSettings";

CREATE TABLE dat."RulesetSettings"
(
	"SettingId" integer NOT NULL,
	"RulesetId" integer NOT NULL,
    PRIMARY KEY ("SettingId", "RulesetId"),
    FOREIGN KEY ("SettingId")
        REFERENCES dat."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RulesetSettings"
    OWNER to apiuser;


-- Table: dat.SkillGroups

-- DROP TABLE IF EXISTS dat."SkillGroups";

CREATE TABLE dat."SkillGroups"
(
	"Id" serial NOT NULL,
	"StockId" integer,
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
)

ALTER TABLE IF EXISTS dat."SkillGroups"
    OWNER to apiuser;


-- Table: dat.TraitGroups

-- DROP TABLE IF EXISTS dat."TraitGroups";

CREATE TABLE dat."TraitGroups"
(
	"Id" serial NOT NULL,
	"StockId" integer,
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
)

ALTER TABLE IF EXISTS dat."TraitGroups"
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

ALTER TABLE IF EXISTS dat."RulesetTraitGroups"
    OWNER to apiuser;


-- Table: dat.RulesetTraitGroups

-- DROP TABLE IF EXISTS dat."RulesetTraitGroups";

CREATE TABLE dat."RulesetTraitGroups"
(
	"TraitGroupId" integer NOT NULL,
	"RulesetId" integer NOT NULL,
    PRIMARY KEY ("TraitGroupId", "RulesetId"),
    FOREIGN KEY ("TraitGroupId")
        REFERENCES dat."TraitGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RulesetTraitGroups"
    OWNER to apiuser;

