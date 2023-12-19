-- Table: bwgr.Questions

-- DROP TABLE IF EXISTS bwgr."Questions";

CREATE TABLE bwgr."Questions"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Question" character varying(325124) NOT NULL,
	"AttributeId1" int,
	"AttributeId2" int,
    PRIMARY KEY ("Id"),
    UNIQUE ("Name"),
    FOREIGN KEY ("AttributeId1")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AttributeId2")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."Questions"
    OWNER to apiuser;