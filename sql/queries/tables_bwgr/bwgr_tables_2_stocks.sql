-- Table: bwgr.Stocks

-- DROP TABLE IF EXISTS bwgr."Stocks";

CREATE TABLE bwgr."Stocks"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"NamePlural" character varying(255) NOT NULL,
	"Stride" integer NOT NULL,
    PRIMARY KEY ("Id")
);

ALTER TABLE IF EXISTS bwgr."Stocks"
    OWNER to apiuser;


-- Table: bwgr.AgePools

-- DROP TABLE IF EXISTS bwgr."AgePools";

CREATE TABLE bwgr."AgePools"
(
	"Id" serial NOT NULL,
	"StockId" serial NOT NULL,
	"MinAge" integer NOT NULL,
	"MentalPool" integer NOT NULL,
	"PhysicalPool" integer NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES bwgr."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."AgePools"
    OWNER to apiuser;


-- Table: bwgr.RulesetStocks

-- DROP TABLE IF EXISTS bwgr."RulesetStocks";

CREATE TABLE bwgr."RulesetStocks"
(
	"StockId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("StockId", "RulesetId"),
    FOREIGN KEY ("StockId")
        REFERENCES bwgr."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES bwgr."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."RulesetStocks"
    OWNER to apiuser;


-- Table: bwgr.Settings

-- DROP TABLE IF EXISTS bwgr."Settings";

CREATE TABLE bwgr."Settings"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"NameShort" character varying(255) NOT NULL,
	"StockId" integer NOT NULL,
	"IsSubsetting" boolean NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES bwgr."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."Settings"
    OWNER to apiuser;


-- Table: bwgr.RulesetSettings

-- DROP TABLE IF EXISTS bwgr."RulesetSettings";

CREATE TABLE bwgr."RulesetSettings"
(
	"SettingId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("SettingId", "RulesetId"),
    FOREIGN KEY ("SettingId")
        REFERENCES bwgr."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES bwgr."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

ALTER TABLE IF EXISTS bwgr."RulesetSettings"
    OWNER to apiuser;

