-- Table: dat.Resources

-- DROP TABLE IF EXISTS dat."Resources";

CREATE TABLE dat."Resources"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"StockId" int NOT NULL,
	"ResourceTypeId" integer NOT NULL,
	"Description" character varying(325124), -- 10485760?,
	"VariableCost" boolean NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ResourceTypeId")
        REFERENCES dat."ResourceTypes" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."Resources"
    OWNER to apiuser;


-- Table: dat.ResourceCosts

-- DROP TABLE IF EXISTS dat."ResourceCosts";

CREATE TABLE dat."ResourceCosts"
(
	"ResourceId" int NOT NULL,
	"Cost" int NOT NULL,
	"Description" character varying(255)
    PRIMARY KEY ("ResourceId", "Cost"),
    FOREIGN KEY ("ResourceId")
        REFERENCES dat."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."ResourceCosts"
    OWNER to apiuser;


-- Table: dat.ResourceModifiers

-- DROP TABLE IF EXISTS dat."ResourceModifiers";

CREATE TABLE dat."ResourceModifiers"
(
	"ResourceId" int NOT NULL,
	"Cost" int NOT NULL,
	"IsPerCost" boolean NOT NULL,
	"Description" character varying(255)
    PRIMARY KEY ("ResourceId", "Cost"),
    FOREIGN KEY ("ResourceId")
        REFERENCES dat."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."ResourceModifiers"
    OWNER to apiuser;


-- Table: dat.ResourceMagicDetails

-- DROP TABLE IF EXISTS dat."ResourceMagicDetails";

CREATE TABLE dat."ResourceMagicDetails"
(
	"Id" serial NOT NULL,
	"ResourceId" int NOT NULL,

	"OriginId" int NOT NULL,
	"OriginModifierId" int NOT NULL,

	"DurationId" int NOT NULL,
	"DurationUnitId" int NOT NULL,

	"AreaOfEffectId" int NOT NULL,
	"AreaOfEffectUnitId" int NOT NULL,
	"AreaOfEffectModifierId" int NOT NULL,

	"Element1Id" int NOT NULL,
	"Element2Id" int NOT NULL,
	"Element3Id" int NOT NULL,

	"Impetus1Id" int NOT NULL,
	"Impetus2Id" int NOT NULL,

	"Actions" int NOT NULL,
	"ActionsMultiply" boolean NOT NULL,

    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ResourceId")
        REFERENCES dat."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OriginModifierId")
        REFERENCES dat."UnitModifiers" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AreaOfEffectModifierId")
        REFERENCES dat."UnitModifiers" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("DurationUnitId")
        REFERENCES dat."TimeUnits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AreaOfEffectUnitId")
        REFERENCES dat."DistanceUnits" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("OriginId")
        REFERENCES dat."SpellOriginFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("DurationId")
        REFERENCES dat."SpellDurationFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("AreaOfEffectId")
        REFERENCES dat."SpellAreaOfEffectFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Element1Id")
        REFERENCES dat."SpellElementFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Element2Id")
        REFERENCES dat."SpellElementFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Element3Id")
        REFERENCES dat."SpellElementFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Impetus1Id")
        REFERENCES dat."SpellImpetusFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("Impetus2Id")
        REFERENCES dat."SpellImpetusFacets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."ResourceMagicDetails"
    OWNER to apiuser;


-- Table: dat.ResourceMagicObstacles

-- DROP TABLE IF EXISTS dat."ResourceMagicObstacles";

CREATE TABLE dat."ResourceMagicObstacles"
(
	"Id" serial NOT NULL,
	"ResourceId" int NOT NULL,
	"Obstacle" int NOT NULL,
	"ObstacleAbility1Id" int NOT NULL,
	"ObstacleAbility2Id" int,
	"ObstacleCaret" boolean NOT NULL,
	"Description" character varying(255)
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("ResourceId")
        REFERENCES dat."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ObstacleAbility1Id")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("ObstacleAbility2Id")
        REFERENCES dat."Abilities" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."ResourceMagicObstacles"
    OWNER to apiuser;


-- Table: dat.RulesetResources

-- DROP TABLE IF EXISTS dat."RulesetResources";

CREATE TABLE dat."RulesetResources"
(
	"ResourceId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("ResourceId", "RulesetId"),
    FOREIGN KEY ("ResourceId")
        REFERENCES dat."Resources" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS dat."RulesetResources"
    OWNER to apiuser;
