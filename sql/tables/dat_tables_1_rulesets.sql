-- Table: dat.Rulesets

-- DROP TABLE IF EXISTS dat."Rulesets";

CREATE TABLE dat."Rulesets"
(
    "Id" character varying(15) NOT NULL,
    "Name" character varying(255) NOT NULL,
    "IsOfficial" boolean NOT NULL,
    "IsPublic" boolean NOT NULL,
	"IsExpansion" boolean NOT NULL,
    "User" uuid,
    PRIMARY KEY ("Id"),
    UNIQUE ("Id"),
    FOREIGN KEY ("User")
        REFERENCES usr."Users" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."Rulesets"
    OWNER to apiuser;


-- Table: dat.RulesetsExpansions

-- DROP TABLE IF EXISTS dat."RulesetExpansions";

CREATE TABLE dat."RulesetExpansions"
(
	"RulesetId" character varying(15) NOT NULL,
	"ExpansionId" character varying(15) NOT NULL,
    PRIMARY KEY ("RulesetId", "ExpansionId"),
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ExpansionId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."RulesetExpansions"
    OWNER to apiuser;

