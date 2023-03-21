-- Table: dat.MagicalFacetGroups

-- DROP TABLE IF EXISTS dat."MagicalFacetGroups";

CREATE TABLE dat."MagicalFacetGroups"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."MagicalFacetGroups"
    OWNER to apiuser;


-- Table: dat.MagicalFacets

-- DROP TABLE IF EXISTS dat."MagicalFacets";

CREATE TABLE dat."MagicalFacets"
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
        REFERENCES dat."MagicalFacetGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."MagicalFacets"
    OWNER to apiuser;
