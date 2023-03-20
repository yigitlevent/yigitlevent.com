-- Table: dat.RangeAndCoverActionGroups

-- DROP TABLE IF EXISTS dat."RangeAndCoverActionGroups";

CREATE TABLE dat."RangeAndCoverActionGroups"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."RangeAndCoverActionGroups"
    OWNER to apiuser;


-- Table: dat.RangeAndCoverActions

-- DROP TABLE IF EXISTS dat."RangeAndCoverActions";

CREATE TABLE dat."RangeAndCoverActions"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"GroupId" integer NOT NULL,
	"Modifier" int NOT NULL,
	"UseFoRKs" boolean NOT NULL,
	"UseWeaponRangeAdvantage" boolean NOT NULL,
	"UsePositionAdvantage" boolean NOT NULL,
	"UseStrideAdvantage" boolean NOT NULL,
	"IsOpenEnded" boolean NOT NULL,
	"Effect" character varying(325124),
	"SpecialRestriction" character varying(325124),
	"SpecialAction" character varying(325124),
	"However" character varying(325124),
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("GroupId")
        REFERENCES dat."RangeAndCoverActionGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RangeAndCoverActions"
    OWNER to apiuser;
	
	
-- Table: dat.RangeAndCoverActionResolutions

-- DROP TABLE IF EXISTS dat."RangeAndCoverActionResolutions";

CREATE TABLE dat."RangeAndCoverActionResolutions"
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
        REFERENCES dat."RangeAndCoverActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingActionId")
        REFERENCES dat."RangeAndCoverActions" ("Id") MATCH SIMPLE
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

ALTER TABLE IF EXISTS dat."RangeAndCoverActionResolutions"
    OWNER to apiuser;

