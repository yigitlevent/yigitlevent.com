-- Table: dat.TraitTypes

-- DROP TABLE IF EXISTS dat."TraitTypes";

CREATE TABLE dat."TraitTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL
)

ALTER TABLE IF EXISTS dat."TraitTypes"
    OWNER to apiuser;

-- Table: dat.TraitCategories

-- DROP TABLE IF EXISTS dat."TraitCategories";

CREATE TABLE dat."TraitCategories"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL
)

ALTER TABLE IF EXISTS dat."TraitCategories"
    OWNER to apiuser;


-- Table: dat.TraitGroups

-- DROP TABLE IF EXISTS dat."TraitGroups";

CREATE TABLE dat."TraitGroups"
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
        REFERENCES dat."TraitCategories" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
	CHECK (CASE "StockId" 
		WHEN (not null and not 2) 	THEN "CategoryId" IN (5, 6)
		WHEN (not null) 			THEN "CategoryId" IN (4)
		WHEN null 					THEN "CategoryId" IN (0, 1, 2, 3)
		ELSE false END)
)

ALTER TABLE IF EXISTS dat."TraitGroups"
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


-- Table: dat.Traits

-- DROP TABLE IF EXISTS dat."Traits";

CREATE TABLE dat."Traits"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"TraitGroupId" integer NOT NULL,
	"TraitTypeId" integer NOT NULL,
	"Cost" integer NOT NULL,
	"Description" character varying(325124), -- 10485760?
    FOREIGN KEY ("TraitGroupId")
        REFERENCES dat."TraitGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TraitTypeId")
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
	"RulesetId" integer NOT NULL,
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