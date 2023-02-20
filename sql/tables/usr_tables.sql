-- SCHEMA: usr

-- DROP SCHEMA IF EXISTS usr;

CREATE SCHEMA IF NOT EXISTS usr
    AUTHORIZATION apiuser;

-- Table: usr.UserRoles

-- DROP TABLE IF EXISTS usr."UserRoles";

CREATE TABLE IF NOT EXISTS usr."UserRoles"
(
    "Id" serial NOT NULL,
    "Name" character varying(63) COLLATE pg_catalog."default",
    PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS usr."UserRoles"
    OWNER to apiuser;


-- Table: usr.Users

-- DROP TABLE IF EXISTS usr."Users";

CREATE TABLE IF NOT EXISTS usr."Users"
(
    "Id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "Username" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "Enabled" boolean NOT NULL DEFAULT true,
    "Role" integer NOT NULL DEFAULT 1,
    "CreatedAt" timestamp with time zone NOT NULL DEFAULT now(),
    "LastSigninAt" timestamp with time zone,
    PRIMARY KEY ("Id"),
    UNIQUE ("Email"),
    UNIQUE ("Username"),
    FOREIGN KEY ("Role")
        REFERENCES usr."UserRoles" ("Id") MATCH SIMPLE
		ON UPDATE RESTRICT
		ON DELETE RESTRICT
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS usr."Users"
    OWNER to apiuser;


-- Table: usr.UserSessions

-- DROP TABLE IF EXISTS usr."UserSessions";

CREATE TABLE IF NOT EXISTS usr."UserSessions"
(
    sid character varying COLLATE pg_catalog."default" NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (sid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS usr."UserSessions"
    OWNER to apiuser;
-- Index: IDX_session_expire

-- DROP INDEX IF EXISTS usr."IDX_session_expire";

CREATE INDEX IF NOT EXISTS "IDX_session_expire"
    ON usr."UserSessions" USING btree
    (expire ASC NULLS LAST)
    TABLESPACE pg_default;
