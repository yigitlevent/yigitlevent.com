-- Table: dat.Abilities

-- DROP TABLE IF EXISTS dat."Abilities";

CREATE TABLE dat."Abilities"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"AbilityTypeId" integer NOT NULL,
	"HasShades" boolean NOT NULL,
	"Cycle" integer,
	"Routine" integer,
	"Difficult" integer,
	"Challenging" integer,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("AbilityTypeId")
        REFERENCES dat."AbilityTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."Abilities"
    OWNER to apiuser;
