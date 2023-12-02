-- Table: bwgr.Traits

-- DROP TABLE IF EXISTS bwgr."Traits";

CREATE TABLE bwgr."Traits"
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
        REFERENCES bwgr."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("CategoryId")
        REFERENCES bwgr."TraitCategories" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TypeId")
        REFERENCES bwgr."TraitTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."Traits"
    OWNER to apiuser;


-- Table: bwgr.RulesetTraits

-- DROP TABLE IF EXISTS bwgr."RulesetTraits";

CREATE TABLE bwgr."RulesetTraits"
(
	"TraitId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("TraitId", "RulesetId"),
    FOREIGN KEY ("TraitId")
        REFERENCES bwgr."Traits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES bwgr."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."RulesetTraits"
    OWNER to apiuser;