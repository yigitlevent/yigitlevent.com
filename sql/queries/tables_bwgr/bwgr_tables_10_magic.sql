-- Table: bwgr.SpellFacetTypes

-- DROP TABLE IF EXISTS bwgr."SpellFacetTypes";

CREATE TABLE bwgr."SpellFacetTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SpellFacetTypes"
    OWNER to apiuser;


-- Table: bwgr.SpellOriginFacets

-- DROP TABLE IF EXISTS bwgr."SpellOriginFacets";

CREATE TABLE bwgr."SpellOriginFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SpellOriginFacets"
    OWNER to apiuser;


-- Table: bwgr.SpellDurationFacets

-- DROP TABLE IF EXISTS bwgr."SpellDurationFacets";

CREATE TABLE bwgr."SpellDurationFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SpellDurationFacets"
    OWNER to apiuser;


-- Table: bwgr.SpellAreaOfEffectFacets

-- DROP TABLE IF EXISTS bwgr."SpellAreaOfEffectFacets";

CREATE TABLE bwgr."SpellAreaOfEffectFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SpellAreaOfEffectFacets"
    OWNER to apiuser;


-- Table: bwgr.SpellElementFacets

-- DROP TABLE IF EXISTS bwgr."SpellElementFacets";

CREATE TABLE bwgr."SpellElementFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SpellElementFacets"
    OWNER to apiuser;


-- Table: bwgr.SpellImpetusFacets

-- DROP TABLE IF EXISTS bwgr."SpellImpetusFacets";

CREATE TABLE bwgr."SpellImpetusFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."SpellImpetusFacets"
    OWNER to apiuser;
