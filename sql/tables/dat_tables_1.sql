-- Table: dat.AbilityTypes

-- DROP TABLE IF EXISTS dat."AbilityTypes";

CREATE TABLE dat."AbilityTypes"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL
)

ALTER TABLE IF EXISTS dat."AbilityTypes"
    OWNER to apiuser;


-- Table: dat.Abilities

-- DROP TABLE IF EXISTS dat."Abilities";

CREATE TABLE dat."Abilities"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"AbilityTypeId" integer NOT NULL,
	"HasShades" boolean NOT NULL,
    FOREIGN KEY ("AbilityTypeId")
        REFERENCES dat."AbilityTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."Abilities"
    OWNER to apiuser;
