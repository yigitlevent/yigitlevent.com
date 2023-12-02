-- Table: bwgr.RangeAndCoverActionGroups

-- DROP TABLE IF EXISTS bwgr."RangeAndCoverActionGroups";

CREATE TABLE bwgr."RangeAndCoverActionGroups"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."RangeAndCoverActionGroups"
    OWNER to apiuser;


-- Table: bwgr.RangeAndCoverActions

-- DROP TABLE IF EXISTS bwgr."RangeAndCoverActions";

CREATE TABLE bwgr."RangeAndCoverActions"
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
        REFERENCES bwgr."RangeAndCoverActionGroups" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."RangeAndCoverActions"
    OWNER to apiuser;
	
	
-- Table: bwgr.RangeAndCoverActionResolutions

-- DROP TABLE IF EXISTS bwgr."RangeAndCoverActionResolutions";

CREATE TABLE bwgr."RangeAndCoverActionResolutions"
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
        REFERENCES bwgr."RangeAndCoverActions" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OpposingActionId")
        REFERENCES bwgr."RangeAndCoverActions" ("Id") MATCH SIMPLE
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

ALTER TABLE IF EXISTS bwgr."RangeAndCoverActionResolutions"
    OWNER to apiuser;

