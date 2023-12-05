-- Table: bwgr.Lifepaths

-- DROP TABLE IF EXISTS bwgr."Lifepaths";

CREATE TABLE bwgr."Lifepaths"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"StockId" int NOT NULL, 
	"SettingId" int NOT NULL,

	"Born" boolean NOT NULL,

	"Years" int[] NOT NULL, 
	"EitherPool" int NOT NULL,
	"MentalPool" int NOT NULL,
	"PhysicalPool" int NOT NULL,

	"GeneralSkillPool" int NOT NULL,
	"LifepathSkillPool" int NOT NULL,
	"TraitPool" int NOT NULL,
	"ResourcePoints" int NOT NULL,

	"IsGSPMultiplier" boolean NOT NULL,
	"IsLSPMultiplier" boolean NOT NULL,
	"IsRPMultiplier" boolean NOT NULL,
	
	"HalfGSPFromPrev" boolean NOT NULL,
	"HalfLSPFromPrev" boolean NOT NULL,
	"HalfRPFromPrev" boolean NOT NULL,

	"RequirementText" character varying(325124),

    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES bwgr."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SettingId")
        REFERENCES bwgr."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."Lifepaths"
    OWNER to apiuser;


-- Table: bwgr.LifepathLeads

-- DROP TABLE IF EXISTS bwgr."LifepathLeads";

CREATE TABLE bwgr."LifepathLeads"
(
	"LifepathId" int NOT NULL,
	"SettingId" int NOT NULL,
    PRIMARY KEY ("LifepathId", "SettingId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES bwgr."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SettingId")
        REFERENCES bwgr."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."LifepathLeads"
    OWNER to apiuser;


-- Table: bwgr.LifepathSkills

-- DROP TABLE IF EXISTS bwgr."LifepathSkills";

CREATE TABLE bwgr."LifepathSkills"
(
	"LifepathId" int NOT NULL,
	"SkillId" int NOT NULL,
	"Index" int NOT NULL,
    PRIMARY KEY ("LifepathId", "SkillId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES bwgr."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."LifepathSkills"
    OWNER to apiuser;


-- Table: bwgr.LifepathTraits

-- DROP TABLE IF EXISTS bwgr."LifepathTraits";

CREATE TABLE bwgr."LifepathTraits"
(
	"LifepathId" int NOT NULL,
	"TraitId" int NOT NULL,
	"Index" int NOT NULL,
    PRIMARY KEY ("LifepathId", "TraitId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES bwgr."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TraitId")
        REFERENCES bwgr."Traits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."LifepathTraits"
    OWNER to apiuser;


-- Table: bwgr.LifepathCompanions

-- DROP TABLE IF EXISTS bwgr."LifepathCompanions";

CREATE TABLE bwgr."LifepathCompanions"
(
	"LifepathId" int NOT NULL,
	"CompanionName" character varying(63) NOT NULL,
	"GivesSkills" boolean NOT NULL,
	"GSPMultiplier" float NOT NULL,
	"LSPMultiplier" float NOT NULL,
	"RPMultiplier" float NOT NULL,
    PRIMARY KEY ("LifepathId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES bwgr."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."LifepathCompanions"
    OWNER to apiuser;


-- Table: bwgr.LifepathCompanionSettings

-- DROP TABLE IF EXISTS bwgr."LifepathCompanionSettings";

CREATE TABLE bwgr."LifepathCompanionSettings"
(
	"LifepathId" int NOT NULL,
	"CompanionSettingId" int,
    PRIMARY KEY ("LifepathId", "CompanionSettingId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES bwgr."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("CompanionSettingId")
        REFERENCES bwgr."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."LifepathCompanionSettings"
    OWNER to apiuser;


-- Table: bwgr.RulesetLifepaths

-- DROP TABLE IF EXISTS bwgr."RulesetLifepaths";

CREATE TABLE bwgr."RulesetLifepaths"
(
	"LifepathId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("LifepathId", "RulesetId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES bwgr."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES bwgr."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."RulesetLifepaths"
    OWNER to apiuser;


-- Table: bwgr.LifepathRequirements

-- DROP TABLE IF EXISTS bwgr."LifepathRequirements";

CREATE TABLE bwgr."LifepathRequirements"
(
	"Id" serial NOT NULL,
	"LifepathId" int NOT NULL,
	"LogicTypeId" int NOT NULL,
	"MustFulfill" boolean NOT NULL,
	"FulfillmentAmount" int NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("LifepathId")
        REFERENCES bwgr."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("LogicTypeId")
        REFERENCES bwgr."LogicTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."LifepathRequirements"
    OWNER to apiuser;


-- Table: bwgr.LifepathRequirementItems

-- DROP TABLE IF EXISTS bwgr."LifepathRequirementItems";

CREATE TABLE bwgr."LifepathRequirementItems"
(
	"Id" serial NOT NULL,
	"RequirementId" int NOT NULL,
	"RequirementTypeId" int NOT NULL,
	"ForCompanion" boolean NOT NULL,
	"Min" int,
	"Max" int,
	"SettingId" int,
	"LifepathId" int,
	"SkillId" int,
	"TraitId" int,
	"AttributeId" int,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("RequirementId")
        REFERENCES bwgr."LifepathRequirements" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RequirementTypeId")
        REFERENCES bwgr."RequirementItemTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SettingId")
        REFERENCES bwgr."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("LifepathId")
        REFERENCES bwgr."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TraitId")
        REFERENCES bwgr."Traits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AttributeId")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."LifepathRequirementItems"
    OWNER to apiuser;

