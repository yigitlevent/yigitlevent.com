-- Table: bwgr.Abilities

-- DROP TABLE IF EXISTS bwgr."Abilities";

CREATE TABLE bwgr."Abilities"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"AbilityTypeId" integer NOT NULL,
	"HasShades" boolean NOT NULL,
	"Cycle" integer,
	"Routine" integer,
	"Difficult" integer,
	"Challenging" integer,
	"RequiredTraitId" integer,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("AbilityTypeId")
        REFERENCES bwgr."AbilityTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RequiredTraitId")
        REFERENCES bwgr."Traits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."Abilities"
    OWNER to apiuser;