-- Table: bwgr.Resources

-- DROP TABLE IF EXISTS bwgr."Resources";

CREATE TABLE bwgr."Resources"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"StockId" int NOT NULL,
	"ResourceTypeId" integer NOT NULL,
	"Description" character varying(325124), -- 10485760?,
	"VariableCost" boolean NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES bwgr."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ResourceTypeId")
        REFERENCES bwgr."ResourceTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."Resources"
    OWNER to apiuser;


-- Table: bwgr.ResourceCosts

-- DROP TABLE IF EXISTS bwgr."ResourceCosts";

CREATE TABLE bwgr."ResourceCosts"
(
	"Id" int NOT NULL,
	"ResourceId" int NOT NULL,
	"Cost" int NOT NULL,
	"Description" character varying(255),
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ResourceId")
        REFERENCES bwgr."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."ResourceCosts"
    OWNER to apiuser;


-- Table: bwgr.ResourceModifiers

-- DROP TABLE IF EXISTS bwgr."ResourceModifiers";

CREATE TABLE bwgr."ResourceModifiers"
(
	"Id" int NOT NULL,
	"ResourceId" int NOT NULL,
	"Cost" int NOT NULL,
	"IsPerCost" boolean NOT NULL,
	"Description" character varying(255),
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ResourceId")
        REFERENCES bwgr."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."ResourceModifiers"
    OWNER to apiuser;


-- Table: bwgr.ResourceMagicDetails

-- DROP TABLE IF EXISTS bwgr."ResourceMagicDetails";

CREATE TABLE bwgr."ResourceMagicDetails"
(
	"Id" serial NOT NULL,
	"ResourceId" int NOT NULL,

	"OriginId" int NOT NULL,
	"OriginModifierId" int,

	"DurationId" int NOT NULL,
	"DurationUnitId" int,

	"AreaOfEffectId" int NOT NULL,
	"AreaOfEffectUnitId" int,
	"AreaOfEffectModifierId" int,

	"Element1Id" int NOT NULL,
	"Element2Id" int,
	"Element3Id" int,

	"Impetus1Id" int NOT NULL,
	"Impetus2Id" int,

	"Actions" int NOT NULL,
	"ActionsMultiply" boolean NOT NULL,

    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ResourceId")
        REFERENCES bwgr."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OriginModifierId")
        REFERENCES bwgr."UnitModifiers" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AreaOfEffectModifierId")
        REFERENCES bwgr."UnitModifiers" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("DurationUnitId")
        REFERENCES bwgr."TimeUnits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AreaOfEffectUnitId")
        REFERENCES bwgr."DistanceUnits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OriginId")
        REFERENCES bwgr."SpellOriginFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("DurationId")
        REFERENCES bwgr."SpellDurationFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AreaOfEffectId")
        REFERENCES bwgr."SpellAreaOfEffectFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Element1Id")
        REFERENCES bwgr."SpellElementFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Element2Id")
        REFERENCES bwgr."SpellElementFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Element3Id")
        REFERENCES bwgr."SpellElementFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Impetus1Id")
        REFERENCES bwgr."SpellImpetusFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Impetus2Id")
        REFERENCES bwgr."SpellImpetusFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."ResourceMagicDetails"
    OWNER to apiuser;


-- Table: bwgr.ResourceMagicObstacles

-- DROP TABLE IF EXISTS bwgr."ResourceMagicObstacles";

CREATE TABLE bwgr."ResourceMagicObstacles"
(
	"Id" serial NOT NULL,
	"ResourceId" int NOT NULL,
	"Obstacle" int,
	"ObstacleAbility1Id" int,
	"ObstacleAbility2Id" int,
	"ObstacleCaret" boolean NOT NULL,
	"Description" character varying(255),
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ResourceId")
        REFERENCES bwgr."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ObstacleAbility1Id")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ObstacleAbility2Id")
        REFERENCES bwgr."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."ResourceMagicObstacles"
    OWNER to apiuser;


-- Table: bwgr.RulesetResources

-- DROP TABLE IF EXISTS bwgr."RulesetResources";

CREATE TABLE bwgr."RulesetResources"
(
	"ResourceId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("ResourceId", "RulesetId"),
    FOREIGN KEY ("ResourceId")
        REFERENCES bwgr."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES bwgr."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."RulesetResources"
    OWNER to apiuser;
