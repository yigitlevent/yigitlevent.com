-- DROP SCHEMA dat CASCADE;

-- SCHEMA: dat

-- DROP SCHEMA IF EXISTS dat;

CREATE SCHEMA IF NOT EXISTS bwgr
    AUTHORIZATION apiuser;
	
	
-- Table: bwgr.LogicTypes

-- DROP TABLE IF EXISTS bwgr."LogicTypes";

CREATE TABLE bwgr."LogicTypes"
(
	"Id" int NOT NULL,
	"Name" character varying(7) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."LogicTypes"
    OWNER to apiuser;
	

-- Table: bwgr.RequirementItemTypes

-- DROP TABLE IF EXISTS bwgr."RequirementItemTypes";

CREATE TABLE bwgr."RequirementItemTypes"
(
	"Id" int NOT NULL,
	"Name" character varying(31) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."RequirementItemTypes"
    OWNER to apiuser;
	

-- Table: bwgr.AbilityTypes

-- DROP TABLE IF EXISTS bwgr."AbilityTypes";

CREATE TABLE bwgr."AbilityTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."AbilityTypes"
    OWNER to apiuser;


-- Table: bwgr.SkillToolTypes

-- DROP TABLE IF EXISTS bwgr."SkillToolTypes";

CREATE TABLE bwgr."SkillToolTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SkillToolTypes"
    OWNER to apiuser;
	
	
-- Table: bwgr.SkillTypes

-- DROP TABLE IF EXISTS bwgr."SkillTypes";

CREATE TABLE bwgr."SkillTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Cycle" integer NOT NULL,
	"Routine" integer NOT NULL,
	"Difficult" integer NOT NULL,
	"Challenging" integer NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SkillTypes"
    OWNER to apiuser;

-- Table: bwgr.SkillCategories

-- DROP TABLE IF EXISTS bwgr."SkillCategories";

CREATE TABLE bwgr."SkillCategories"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SkillCategories"
    OWNER to apiuser;


-- Table: bwgr.TraitTypes

-- DROP TABLE IF EXISTS bwgr."TraitTypes";

CREATE TABLE bwgr."TraitTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."TraitTypes"
    OWNER to apiuser;

-- Table: bwgr.TraitCategories

-- DROP TABLE IF EXISTS bwgr."TraitCategories";

CREATE TABLE bwgr."TraitCategories"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."TraitCategories"
    OWNER to apiuser;


-- Table: bwgr.ActionResolutionTypes

-- DROP TABLE IF EXISTS bwgr."ActionResolutionTypes";

CREATE TABLE bwgr."ActionResolutionTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(15) NOT NULL,
	"NameLong" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."ActionResolutionTypes"
    OWNER to apiuser;


-- Table: bwgr.ResourceTypes

-- DROP TABLE IF EXISTS bwgr."ResourceTypes";

CREATE TABLE bwgr."ResourceTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."ResourceTypes"
    OWNER to apiuser;


-- Table: bwgr.TimeUnits

-- DROP TABLE IF EXISTS bwgr."TimeUnits";

CREATE TABLE bwgr."TimeUnits"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."TimeUnits"
    OWNER to apiuser;


-- Table: bwgr.DistanceUnits

-- DROP TABLE IF EXISTS bwgr."DistanceUnits";

CREATE TABLE bwgr."DistanceUnits"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."DistanceUnits"
    OWNER to apiuser;


-- Table: bwgr.UnitModifiers

-- DROP TABLE IF EXISTS bwgr."UnitModifiers";

CREATE TABLE bwgr."UnitModifiers"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."UnitModifiers"
    OWNER to apiuser;