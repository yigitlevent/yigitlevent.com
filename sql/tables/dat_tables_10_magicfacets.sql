-- Table: dat.MagicFacetGroups

-- DROP TABLE IF EXISTS dat."MagicFacetGroups";

CREATE TABLE dat."MagicFacetGroups"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."MagicFacetGroups"
    OWNER to apiuser;


-- Table: dat.MagicFacets

-- DROP TABLE IF EXISTS dat."MagicFacets";

CREATE TABLE dat."MagicFacets"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"GroupId" integer NOT NULL,
	"Obstacle" integer NOT NULL,
	"Actions" integer NOT NULL,
	"Resource" integer NOT NULL,
	"IsAlternative" boolean NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("GroupId")
        REFERENCES dat."MagicFacetGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."MagicFacets"
    OWNER to apiuser;
