-- Table: bwgr.Rulesets

-- DROP TABLE IF EXISTS bwgr."Rulesets";

CREATE TABLE bwgr."Rulesets"
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

ALTER TABLE IF EXISTS bwgr."Rulesets"
    OWNER to apiuser;


-- Table: bwgr.RulesetsExpansions

-- DROP TABLE IF EXISTS bwgr."RulesetExpansions";

CREATE TABLE bwgr."RulesetExpansions"
(
	"RulesetId" character varying(15) NOT NULL,
	"ExpansionId" character varying(15) NOT NULL,
    PRIMARY KEY ("RulesetId", "ExpansionId"),
    FOREIGN KEY ("RulesetId")
        REFERENCES bwgr."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ExpansionId")
        REFERENCES bwgr."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."RulesetExpansions"
    OWNER to apiuser;

