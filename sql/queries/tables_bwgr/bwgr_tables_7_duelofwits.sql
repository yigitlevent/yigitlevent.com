-- Table: bwgr.DuelOfWitsActions

-- DROP TABLE IF EXISTS bwgr."DuelOfWitsActions";

CREATE TABLE bwgr."DuelOfWitsActions"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"SpeakingThePart" character varying(325124),
	"Special" character varying(325124),
	"Effect" character varying(325124),
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."DuelOfWitsActions"
    OWNER to apiuser;


-- Table: bwgr.DuelOfWitsActionTests

-- DROP TABLE IF EXISTS bwgr."DuelOfWitsActionTests";

CREATE TABLE bwgr."DuelOfWitsActionTests"
(
	"Id" serial NOT NULL,
	"ActionId" int NOT NULL,
	"SkillId" int,
	"AbilityId" int,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ActionId")
        REFERENCES bwgr."DuelOfWitsActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AbilityId")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
	CHECK (("SkillId" IS NULL) <> ("AbilityId" IS NULL))
);

ALTER TABLE IF EXISTS bwgr."DuelOfWitsActionTests"
    OWNER to apiuser;


-- Table: bwgr.DuelOfWitsActionResolutions

-- DROP TABLE IF EXISTS bwgr."DuelOfWitsActionResolutions";

CREATE TABLE bwgr."DuelOfWitsActionResolutions"
(
	"Id" serial NOT NULL,
	"ActionId" int NOT NULL,
	"OpposingActionId" int NOT NULL,
	"ResolutionTypeId" int NOT NULL,
	"IsAgainstSkill" boolean,
	"Obstacle" int,
	"SkillId" int,
	"AbilityId" int,
	"OpposingSkillId" int,
	"OpposingAbilityId" int,
	"OpposingModifier" int,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ActionId")
        REFERENCES bwgr."DuelOfWitsActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingActionId")
        REFERENCES bwgr."DuelOfWitsActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ResolutionTypeId")
        REFERENCES bwgr."ActionResolutionTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AbilityId")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingSkillId")
        REFERENCES bwgr."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingAbilityId")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."DuelOfWitsActionResolutions"
    OWNER to apiuser;

