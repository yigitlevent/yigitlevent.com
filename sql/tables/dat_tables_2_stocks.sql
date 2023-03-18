
-- Table: dat.Stocks

-- DROP TABLE IF EXISTS dat."Stocks";

CREATE TABLE dat."Stocks"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"NamePlural" character varying(255) NOT NULL,
	"Stride" integer NOT NULL,
    PRIMARY KEY ("Id")
)

ALTER TABLE IF EXISTS dat."Stocks"
    OWNER to apiuser;


-- Table: dat.AgePools

-- DROP TABLE IF EXISTS dat."AgePools";

CREATE TABLE dat."AgePools"
(
	"Id" serial NOT NULL,
	"StockId" serial NOT NULL,
	"MinAge" integer NOT NULL,
	"MentalPool" integer NOT NULL,
	"PhysicalPool" integer NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
)

ALTER TABLE IF EXISTS dat."AgePools"
    OWNER to apiuser;


-- Table: dat.RulesetStocks

-- DROP TABLE IF EXISTS dat."RulesetStocks";

CREATE TABLE dat."RulesetStocks"
(
	"StockId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("StockId", "RulesetId"),
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RulesetStocks"
    OWNER to apiuser;


-- Table: dat.Settings

-- DROP TABLE IF EXISTS dat."Settings";

CREATE TABLE dat."Settings"
(
	"Id" serial NOT NULL,
	"Name" character varying(255) NOT NULL,
	"NameShort" character varying(255) NOT NULL,
	"StockId" integer NOT NULL,
	"IsSubsetting" boolean NOT NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("StockId")
        REFERENCES dat."Stocks" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
)

ALTER TABLE IF EXISTS dat."Settings"
    OWNER to apiuser;


-- Table: dat.RulesetSettings

-- DROP TABLE IF EXISTS dat."RulesetSettings";

CREATE TABLE dat."RulesetSettings"
(
	"SettingId" integer NOT NULL,
	"RulesetId" character varying(15) NOT NULL,
    PRIMARY KEY ("SettingId", "RulesetId"),
    FOREIGN KEY ("SettingId")
        REFERENCES dat."Settings" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    FOREIGN KEY ("RulesetId")
        REFERENCES dat."Rulesets" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
)

ALTER TABLE IF EXISTS dat."RulesetSettings"
    OWNER to apiuser;

