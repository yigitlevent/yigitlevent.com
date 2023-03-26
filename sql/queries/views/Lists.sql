-- View: dat."RulesetsList"

-- DROP VIEW dat."RulesetsList";

CREATE OR REPLACE VIEW dat."RulesetsList" AS
 SELECT r."Id",
    r."Name",
    r."IsOfficial",
    r."IsPublic",
    r."IsExpansion",
    r."User",
    ARRAY( SELECT re."ExpansionId"
           FROM dat."RulesetExpansions" re
          WHERE r."Id"::text = re."RulesetId"::text) AS "ExpansionIds"
   FROM dat."Rulesets" r;

ALTER TABLE dat."RulesetsList"
    OWNER TO apiuser;


-- View: dat."AbilitiesList"

-- DROP VIEW dat."AbilitiesList";

CREATE OR REPLACE VIEW dat."AbilitiesList" AS
 SELECT a."Id",
    a."Name",
    a."AbilityTypeId",
    aty."Name" AS "AbilityType",
    a."HasShades",
    a."Cycle",
    a."Routine",
    a."Difficult",
    a."Challenging"
   FROM dat."Abilities" a
     LEFT JOIN dat."AbilityTypes" aty ON aty."Id" = a."AbilityTypeId";

ALTER TABLE dat."AbilitiesList"
    OWNER TO apiuser;


-- View: dat."StocksList"

-- DROP VIEW dat."StocksList";

CREATE OR REPLACE VIEW dat."StocksList" AS
 SELECT ARRAY( SELECT rs."RulesetId"
           FROM dat."RulesetStocks" rs
          WHERE rs."StockId" = s."Id") AS "Rulesets",
    s."Id",
    s."Name",
    s."NamePlural",
    s."Stride",
    ARRAY( SELECT ss."Id"
           FROM dat."Settings" ss
          WHERE ss."StockId" = s."Id") AS "SettingIds"
   FROM dat."Stocks" s;

ALTER TABLE dat."StocksList"
    OWNER TO apiuser;


-- View: dat."SettingsList"

-- DROP VIEW dat."SettingsList";

CREATE OR REPLACE VIEW dat."SettingsList" AS
 SELECT ARRAY( SELECT rs."RulesetId"
           FROM dat."RulesetSettings" rs
          WHERE rs."SettingId" = s."Id") AS "Rulesets",
    s."Id",
    s."Name",
    s."NameShort",
    s."StockId",
    ss."Name" AS "StockName",
    s."IsSubsetting"
   FROM dat."Settings" s
     LEFT JOIN dat."Stocks" ss ON ss."Id" = s."StockId";

ALTER TABLE dat."SettingsList"
    OWNER TO apiuser;


-- View: dat."SkillsList"

-- DROP VIEW dat."SkillsList";

CREATE OR REPLACE VIEW dat."SkillsList" AS
 SELECT ARRAY( SELECT rs."RulesetId"
           FROM dat."RulesetSkills" rs
          WHERE rs."SkillId" = s."Id") AS "Rulesets",
    s."Id",
    s."Name",
    s."StockId",
    sto."Name" AS "Stock",
    s."CategoryId",
    sc."Name" AS "Category",
    s."TypeId",
    sty."Name" AS "Type",
    array_remove(ARRAY[s."Root1Id", s."Root2Id"], NULL::integer) AS "RootIds",
    array_remove(ARRAY[ab1."Name", ab2."Name"], NULL::character varying) AS "Roots",
    s."DontList",
    s."IsMagical",
    s."IsTraining",
    s."ToolTypeId",
    stt."Name" AS "Tool",
    s."ToolDescription",
    s."Description",
	s."RestrictionOnlyStockId",
	sto2."Name" as "RestrictionOnlyStock",
	s."RestrictionWhenBurning",
	s."RestrictionAbilityId",
	ab3."Name" as "RestrictionAbility",
    ARRAY( SELECT ss."SubskillId"
           FROM dat."SkillSubskills" ss
          WHERE ss."SkillId" = s."Id") AS "SubskillIds"
   FROM dat."Skills" s
     LEFT JOIN dat."Stocks" sto ON sto."Id" = s."StockId"
     LEFT JOIN dat."Stocks" sto2 ON sto2."Id" = s."RestrictionOnlyStockId"
     LEFT JOIN dat."SkillCategories" sc ON sc."Id" = s."CategoryId"
     LEFT JOIN dat."SkillTypes" sty ON sty."Id" = s."TypeId"
     LEFT JOIN dat."SkillToolTypes" stt ON stt."Id" = s."ToolTypeId"
     LEFT JOIN dat."Abilities" ab1 ON ab1."Id" = s."Root1Id"
     LEFT JOIN dat."Abilities" ab2 ON ab2."Id" = s."Root2Id"
     LEFT JOIN dat."Abilities" ab3 ON ab3."Id" = s."RestrictionAbilityId";

ALTER TABLE dat."SkillsList"
    OWNER TO apiuser;


-- View: dat."TraitsList"

-- DROP VIEW dat."TraitsList";

CREATE OR REPLACE VIEW dat."TraitsList" AS
 SELECT ARRAY( SELECT rt."RulesetId"
           FROM dat."RulesetTraits" rt
          WHERE rt."TraitId" = t."Id") AS "Rulesets",
    t."Id",
    t."Name",
    t."StockId",
    sto."Name" AS "Stock",
    t."CategoryId",
    tc."Name" AS "Category",
    t."TypeId",
    tty."Name" AS "Type",
    t."Cost",
    t."Description"
   FROM dat."Traits" t
     LEFT JOIN dat."Stocks" sto ON sto."Id" = t."StockId"
     LEFT JOIN dat."TraitCategories" tc ON tc."Id" = t."CategoryId"
     LEFT JOIN dat."TraitTypes" tty ON tty."Id" = t."TypeId";

ALTER TABLE dat."TraitsList"
    OWNER TO apiuser;


-- View: dat."LifepathsList"

-- DROP VIEW dat."LifepathsList";

CREATE OR REPLACE VIEW dat."LifepathsList" AS
 SELECT ARRAY( SELECT rl."RulesetId"
           FROM dat."RulesetLifepaths" rl
          WHERE rl."LifepathId" = l."Id") AS "Rulesets",
    l."Id",
    l."Name",
    l."StockId",
    sto."Name" AS "Stock",
    l."SettingId",
    stt."Name" AS "Setting",
    ARRAY( SELECT ll."SettingId"
           FROM dat."LifepathLeads" ll
          WHERE ll."LifepathId" = l."Id") AS "LeadIds",
    ARRAY( SELECT ls."SkillId"
           FROM dat."LifepathSkills" ls
          WHERE ls."LifepathId" = l."Id"
          ORDER BY ls."Index") AS "SkillIds",
    ARRAY( SELECT lt."TraitId"
           FROM dat."LifepathTraits" lt
          WHERE lt."LifepathId" = l."Id"
          ORDER BY lt."Index") AS "TraitIds",
    l."Born",
    l."Years",
    l."EitherPool",
    l."MentalPool",
    l."PhysicalPool",
    l."GeneralSkillPool",
    l."LifepathSkillPool",
    l."TraitPool",
    l."ResourcePoints",
    l."IsGSPMultiplier",
    l."IsLSPMultiplier",
    l."IsRPMultiplier",
    l."HalfGSPFromPrev",
    l."HalfLSPFromPrev",
    l."HalfRPFromPrev",
    l."RequirementText",
    lc."CompanionName",
    lc."GivesSkills" AS "CompanionGivesSkills",
    lc."GSPMultiplier" AS "CompanionGSPMultiplier",
    lc."LSPMultiplier" AS "CompanionLSPMultiplier",
    lc."RPMultiplier" AS "CompanionRPMultiplier",
    ARRAY( SELECT lcs."CompanionSettingId"
           FROM dat."LifepathCompanionSettings" lcs
          WHERE lcs."LifepathId" = l."Id") AS "CompanionSettingIds"
   FROM dat."Lifepaths" l
     LEFT JOIN dat."Stocks" sto ON sto."Id" = l."StockId"
     LEFT JOIN dat."Settings" stt ON stt."Id" = l."SettingId"
     LEFT JOIN dat."LifepathCompanions" lc ON lc."LifepathId" = l."Id";

ALTER TABLE dat."LifepathsList"
    OWNER TO apiuser;


-- View: dat."LifepathRequirementBlocks"

-- DROP VIEW dat."LifepathRequirementBlocks";

CREATE OR REPLACE VIEW dat."LifepathRequirementBlocks" AS
 SELECT lr."Id",
    lr."LifepathId",
    lr."LogicTypeId",
    lt."Name" AS "LogicType",
    lr."MustFulfill",
    lr."FulfillmentAmount"
   FROM dat."LifepathRequirements" lr
     LEFT JOIN dat."LogicTypes" lt ON lr."LogicTypeId" = lt."Id";

ALTER TABLE dat."LifepathRequirementBlocks"
    OWNER TO apiuser;


-- View: dat."LifepathRequirementBlockItems"

-- DROP VIEW dat."LifepathRequirementBlockItems";

CREATE OR REPLACE VIEW dat."LifepathRequirementBlockItems" AS
 SELECT lri."RequirementId",
    lri."RequirementTypeId",
    rit."Name" AS "RequirementType",
    lri."ForCompanion",
    lri."Min",
    lri."Max",
    lri."SettingId",
    s."Name" AS "Setting",
    lri."LifepathId",
    l."Name" AS "Lifepath",
    lri."SkillId",
    sk."Name" AS "Skill",
    lri."TraitId",
    t."Name" AS "Trait",
    lri."AttributeId",
    a."Name" AS "Attribute"
   FROM dat."LifepathRequirementItems" lri
     LEFT JOIN dat."RequirementItemTypes" rit ON rit."Id" = lri."RequirementTypeId"
     LEFT JOIN dat."Settings" s ON s."Id" = lri."SettingId"
     LEFT JOIN dat."Lifepaths" l ON l."Id" = lri."LifepathId"
     LEFT JOIN dat."Skills" sk ON sk."Id" = lri."SkillId"
     LEFT JOIN dat."Traits" t ON t."Id" = lri."TraitId"
     LEFT JOIN dat."Abilities" a ON a."Id" = lri."AttributeId";

ALTER TABLE dat."LifepathRequirementBlockItems"
    OWNER TO apiuser;

