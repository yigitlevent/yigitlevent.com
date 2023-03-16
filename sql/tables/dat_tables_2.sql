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

-- Table: dat.Traits

-- DROP TABLE IF EXISTS dat."Traits";

CREATE TABLE dat."Traits"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"StockId" integer,
	"CategoryId" integer NOT NULL,
	"TypeId" integer NOT NULL,
	"Cost" integer NOT NULL,
	"Description" character varying(325124), -- 10485760?,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("CategoryId")
        REFERENCES dat."TraitCategories" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TypeId")
        REFERENCES dat."TraitTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."Traits"
    OWNER to apiuser;


-- Table: dat.RulesetTraits

-- DROP TABLE IF EXISTS dat."RulesetTraits";

CREATE TABLE dat."RulesetTraits"
(
	"TraitId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("TraitId", "RulesetId"),
    FOREIGN KEY ("TraitId")
        REFERENCES dat."Traits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RulesetTraits"
    OWNER to apiuser;