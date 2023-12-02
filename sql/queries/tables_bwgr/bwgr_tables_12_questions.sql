-- Table: bwgr.Questions

-- DROP TABLE IF EXISTS bwgr."Questions";

CREATE TABLE bwgr."Questions"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Question" character varying(325124) NOT NULL,
    PRIMARY KEY ("Id"),
    UNIQUE ("Name")
);

ALTER TABLE IF EXISTS bwgr."Questions"
    OWNER to apiuser;