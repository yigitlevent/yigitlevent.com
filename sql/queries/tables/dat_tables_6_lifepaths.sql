-- Table: dat.Lifepaths

-- DROP TABLE IF EXISTS dat."Lifepaths";

CREATE TABLE dat."Lifepaths"
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
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SettingId")
        REFERENCES dat."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."Lifepaths"
    OWNER to apiuser;


-- Table: dat.LifepathLeads

-- DROP TABLE IF EXISTS dat."LifepathLeads";

CREATE TABLE dat."LifepathLeads"
(
	"LifepathId" int NOT NULL,
	"SettingId" int NOT NULL,
    PRIMARY KEY ("LifepathId", "SettingId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES dat."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SettingId")
        REFERENCES dat."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."LifepathLeads"
    OWNER to apiuser;


-- Table: dat.LifepathSkills

-- DROP TABLE IF EXISTS dat."LifepathSkills";

CREATE TABLE dat."LifepathSkills"
(
	"LifepathId" int NOT NULL,
	"SkillId" int NOT NULL,
	"Index" int NOT NULL,
    PRIMARY KEY ("LifepathId", "SkillId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES dat."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."LifepathSkills"
    OWNER to apiuser;


-- Table: dat.LifepathTraits

-- DROP TABLE IF EXISTS dat."LifepathTraits";

CREATE TABLE dat."LifepathTraits"
(
	"LifepathId" int NOT NULL,
	"TraitId" int NOT NULL,
	"Index" int NOT NULL,
    PRIMARY KEY ("LifepathId", "TraitId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES dat."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TraitId")
        REFERENCES dat."Traits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."LifepathTraits"
    OWNER to apiuser;


-- Table: dat.LifepathCompanions

-- DROP TABLE IF EXISTS dat."LifepathCompanions";

CREATE TABLE dat."LifepathCompanions"
(
	"LifepathId" int NOT NULL,
	"CompanionName" character varying(63) NOT NULL,
	"GivesSkills" boolean NOT NULL,
	"GSPMultiplier" float NOT NULL,
	"LSPMultiplier" float NOT NULL,
	"RPMultiplier" float NOT NULL,
    PRIMARY KEY ("LifepathId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES dat."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."LifepathCompanions"
    OWNER to apiuser;


-- Table: dat.LifepathCompanionSettings

-- DROP TABLE IF EXISTS dat."LifepathCompanionSettings";

CREATE TABLE dat."LifepathCompanionSettings"
(
	"LifepathId" int NOT NULL,
	"CompanionSettingId" int,
    PRIMARY KEY ("LifepathId", "CompanionSettingId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES dat."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("CompanionSettingId")
        REFERENCES dat."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."LifepathCompanionSettings"
    OWNER to apiuser;


-- Table: dat.RulesetLifepaths

-- DROP TABLE IF EXISTS dat."RulesetLifepaths";

CREATE TABLE dat."RulesetLifepaths"
(
	"LifepathId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("LifepathId", "RulesetId"),
    FOREIGN KEY ("LifepathId")
        REFERENCES dat."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."RulesetLifepaths"
    OWNER to apiuser;


-- Table: dat.LifepathRequirements

-- DROP TABLE IF EXISTS dat."LifepathRequirements";

CREATE TABLE dat."LifepathRequirements"
(
	"Id" serial NOT NULL,
	"LifepathId" int NOT NULL,
	"LogicTypeId" int NOT NULL,
	"MustFulfill" boolean NOT NULL,
	"FulfillmentAmount" int NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("LifepathId")
        REFERENCES dat."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("LogicTypeId")
        REFERENCES dat."LogicTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."LifepathRequirements"
    OWNER to apiuser;


-- Table: dat.LifepathRequirementItems

-- DROP TABLE IF EXISTS dat."LifepathRequirementItems";

CREATE TABLE dat."LifepathRequirementItems"
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
        REFERENCES dat."LifepathRequirements" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RequirementTypeId")
        REFERENCES dat."RequirementItemTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SettingId")
        REFERENCES dat."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("LifepathId")
        REFERENCES dat."Lifepaths" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("TraitId")
        REFERENCES dat."Traits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AttributeId")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."LifepathRequirementItems"
    OWNER to apiuser;

