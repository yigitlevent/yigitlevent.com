-- Table: dat.Questions

-- DROP TABLE IF EXISTS dat."Questions";

CREATE TABLE dat."Questions"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"Question" character varying(325124) NOT NULL,
    PRIMARY KEY ("Id"),
    UNIQUE ("Name")
);

ALTER TABLE IF EXISTS dat."Questions"
    OWNER to apiuser;