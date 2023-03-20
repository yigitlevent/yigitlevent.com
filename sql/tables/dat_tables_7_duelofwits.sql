-- Table: dat.DuelOfWitsActions

-- DROP TABLE IF EXISTS dat."DuelOfWitsActions";

CREATE TABLE dat."DuelOfWitsActions"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"SpeakingThePart" character varying(325124),
	"Special" character varying(325124),
	"Effect" character varying(325124),
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."DuelOfWitsActions"
    OWNER to apiuser;


-- Table: dat.DuelOfWitsActionTests

-- DROP TABLE IF EXISTS dat."DuelOfWitsActionTests";

CREATE TABLE dat."DuelOfWitsActionTests"
(
	"ActionId" int NOT NULL,
	"SkillId" int NOT NULL,
	"AbilityId" int NOT NULL,
    PRIMARY KEY ("ActionId", "SkillId", "AbilityId"),
    FOREIGN KEY ("ActionId")
        REFERENCES dat."DuelOfWitsActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AbilityId")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
	CHECK (("SkillId" IS NULL) <> ("AbilityId" IS NULL))
)

ALTER TABLE IF EXISTS dat."DuelOfWitsActionTests"
    OWNER to apiuser;


-- Table: dat.DuelOfWitsActionResolutions

-- DROP TABLE IF EXISTS dat."DuelOfWitsActionResolutions";

CREATE TABLE dat."DuelOfWitsActionResolutions"
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
        REFERENCES dat."DuelOfWitsActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingActionId")
        REFERENCES dat."DuelOfWitsActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ResolutionTypeId")
        REFERENCES dat."ResolutionTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("SkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AbilityId")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingSkillId")
        REFERENCES dat."Skills" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingAbilityId")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."DuelOfWitsActionResolutions"
    OWNER to apiuser;

