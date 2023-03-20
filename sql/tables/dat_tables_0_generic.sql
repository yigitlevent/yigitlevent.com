-- Table: dat.LogicTypes

-- DROP TABLE IF EXISTS dat."LogicTypes";

CREATE TABLE dat."LogicTypes"
(
	"Id" int NOT NULL,
	"Name" character varying(7) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."LogicTypes"
    OWNER to apiuser;
	

-- Table: dat.RequirementItemTypes

-- DROP TABLE IF EXISTS dat."RequirementItemTypes";

CREATE TABLE dat."RequirementItemTypes"
(
	"Id" int NOT NULL,
	"Name" character varying(31) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."RequirementItemTypes"
    OWNER to apiuser;
	

-- Table: dat.AbilityTypes

-- DROP TABLE IF EXISTS dat."AbilityTypes";

CREATE TABLE dat."AbilityTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."AbilityTypes"
    OWNER to apiuser;


-- Table: dat.SkillToolTypes

-- DROP TABLE IF EXISTS dat."SkillToolTypes";

CREATE TABLE dat."SkillToolTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."SkillToolTypes"
    OWNER to apiuser;
	
	
-- Table: dat.SkillTypes

-- DROP TABLE IF EXISTS dat."SkillTypes";

CREATE TABLE dat."SkillTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Cycle" integer NOT NULL,
	"Routine" integer NOT NULL,
	"Difficult" integer NOT NULL,
	"Challenging" integer NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."SkillTypes"
    OWNER to apiuser;

-- Table: dat.SkillCategories

-- DROP TABLE IF EXISTS dat."SkillCategories";

CREATE TABLE dat."SkillCategories"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."SkillCategories"
    OWNER to apiuser;


-- Table: dat.TraitTypes

-- DROP TABLE IF EXISTS dat."TraitTypes";

CREATE TABLE dat."TraitTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."TraitTypes"
    OWNER to apiuser;

-- Table: dat.TraitCategories

-- DROP TABLE IF EXISTS dat."TraitCategories";

CREATE TABLE dat."TraitCategories"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."TraitCategories"
    OWNER to apiuser;


-- Table: dat.ActionResolutionTypes

-- DROP TABLE IF EXISTS dat."ActionResolutionTypes";

CREATE TABLE dat."ActionResolutionTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(15) NOT NULL,
	"NameLong" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."ActionResolutionTypes"
    OWNER to apiuser;