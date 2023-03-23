-- Table: dat.SpellFacetTypes

-- DROP TABLE IF EXISTS dat."SpellFacetTypes";

CREATE TABLE dat."SpellFacetTypes"
(
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Name")
);

ALTER TABLE IF EXISTS dat."SpellFacetTypes"
    OWNER to apiuser;


-- Table: dat.SpellOriginFacets

-- DROP TABLE IF EXISTS dat."SpellOriginFacets";

CREATE TABLE dat."SpellOriginFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS dat."SpellOriginFacets"
    OWNER to apiuser;


-- Table: dat.SpellDurationFacets

-- DROP TABLE IF EXISTS dat."SpellDurationFacets";

CREATE TABLE dat."SpellDurationFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS dat."SpellDurationFacets"
    OWNER to apiuser;


-- Table: dat.SpellAreaOfEffectFacets

-- DROP TABLE IF EXISTS dat."SpellAreaOfEffectFacets";

CREATE TABLE dat."SpellAreaOfEffectFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS dat."SpellAreaOfEffectFacets"
    OWNER to apiuser;



-- Table: dat.SpellElementFacets

-- DROP TABLE IF EXISTS dat."SpellElementFacets";

CREATE TABLE dat."SpellElementFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS dat."SpellElementFacets"
    OWNER to apiuser;



-- Table: dat.SpellImpetusFacets

-- DROP TABLE IF EXISTS dat."SpellImpetusFacets";

CREATE TABLE dat."SpellImpetusFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS dat."SpellImpetusFacets"
    OWNER to apiuser;
