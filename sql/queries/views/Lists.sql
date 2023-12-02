-- View: bwgr."RulesetsList"

-- DROP VIEW bwgr."RulesetsList";

CREATE OR REPLACE VIEW bwgr."RulesetsList" AS
 SELECT r."Id",
    r."Name",
    r."IsOfficial",
    r."IsPublic",
    r."IsExpansion",
    r."User",
    ARRAY( SELECT re."ExpansionId"
           FROM bwgr."RulesetExpansions" re
          WHERE r."Id"::text = re."RulesetId"::text) AS "ExpansionIds"
   FROM bwgr."Rulesets" r;

ALTER TABLE bwgr."RulesetsList"
    OWNER TO apiuser;


-- View: bwgr."AbilitiesList"

-- DROP VIEW bwgr."AbilitiesList";

CREATE OR REPLACE VIEW bwgr."AbilitiesList" AS
 SELECT a."Id",
    a."Name",
    a."AbilityTypeId",
    aty."Name" AS "AbilityType",
    a."HasShades",
    a."Cycle",
    a."Routine",
    a."Difficult",
    a."Challenging",
    a."RequiredTraitId",
    t."Name" as "RequiredTrait"
   FROM bwgr."Abilities" a
     LEFT JOIN bwgr."AbilityTypes" aty ON aty."Id" = a."AbilityTypeId"
     LEFT JOIN bwgr."Traits" t ON t."Id" = a."RequiredTraitId";

ALTER TABLE bwgr."AbilitiesList"
    OWNER TO apiuser;


-- View: bwgr."StocksList"

-- DROP VIEW bwgr."StocksList";

CREATE OR REPLACE VIEW bwgr."StocksList" AS
 SELECT ARRAY( SELECT rs."RulesetId"
           FROM bwgr."RulesetStocks" rs
          WHERE rs."StockId" = s."Id") AS "Rulesets",
    s."Id",
    s."Name",
    s."NamePlural",
    s."Stride",
    ARRAY( SELECT ss."Id"
           FROM bwgr."Settings" ss
          WHERE ss."StockId" = s."Id") AS "SettingIds"
   FROM bwgr."Stocks" s;

ALTER TABLE bwgr."StocksList"
    OWNER TO apiuser;


-- View: bwgr."SettingsList"

-- DROP VIEW bwgr."SettingsList";

CREATE OR REPLACE VIEW bwgr."SettingsList" AS
 SELECT ARRAY( SELECT rs."RulesetId"
           FROM bwgr."RulesetSettings" rs
          WHERE rs."SettingId" = s."Id") AS "Rulesets",
    s."Id",
    s."Name",
    s."NameShort",
    s."StockId",
    ss."Name" AS "StockName",
    s."IsSubsetting"
   FROM bwgr."Settings" s
     LEFT JOIN bwgr."Stocks" ss ON ss."Id" = s."StockId";

ALTER TABLE bwgr."SettingsList"
    OWNER TO apiuser;


-- View: bwgr."SkillsList"

-- DROP VIEW bwgr."SkillsList";

CREATE OR REPLACE VIEW bwgr."SkillsList" AS
 SELECT ARRAY( SELECT rs."RulesetId"
           FROM bwgr."RulesetSkills" rs
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
           FROM bwgr."SkillSubskills" ss
          WHERE ss."SkillId" = s."Id") AS "SubskillIds"
   FROM bwgr."Skills" s
     LEFT JOIN bwgr."Stocks" sto ON sto."Id" = s."StockId"
     LEFT JOIN bwgr."Stocks" sto2 ON sto2."Id" = s."RestrictionOnlyStockId"
     LEFT JOIN bwgr."SkillCategories" sc ON sc."Id" = s."CategoryId"
     LEFT JOIN bwgr."SkillTypes" sty ON sty."Id" = s."TypeId"
     LEFT JOIN bwgr."SkillToolTypes" stt ON stt."Id" = s."ToolTypeId"
     LEFT JOIN bwgr."Abilities" ab1 ON ab1."Id" = s."Root1Id"
     LEFT JOIN bwgr."Abilities" ab2 ON ab2."Id" = s."Root2Id"
     LEFT JOIN bwgr."Abilities" ab3 ON ab3."Id" = s."RestrictionAbilityId";

ALTER TABLE bwgr."SkillsList"
    OWNER TO apiuser;


-- View: bwgr."TraitsList"

-- DROP VIEW bwgr."TraitsList";

CREATE OR REPLACE VIEW bwgr."TraitsList" AS
 SELECT ARRAY( SELECT rt."RulesetId"
           FROM bwgr."RulesetTraits" rt
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
   FROM bwgr."Traits" t
     LEFT JOIN bwgr."Stocks" sto ON sto."Id" = t."StockId"
     LEFT JOIN bwgr."TraitCategories" tc ON tc."Id" = t."CategoryId"
     LEFT JOIN bwgr."TraitTypes" tty ON tty."Id" = t."TypeId";

ALTER TABLE bwgr."TraitsList"
    OWNER TO apiuser;


-- View: bwgr."LifepathsList"

-- DROP VIEW bwgr."LifepathsList";

CREATE OR REPLACE VIEW bwgr."LifepathsList" AS
 SELECT ARRAY( SELECT rl."RulesetId"
           FROM bwgr."RulesetLifepaths" rl
          WHERE rl."LifepathId" = l."Id") AS "Rulesets",
    l."Id",
    l."Name",
    l."StockId",
    sto."Name" AS "Stock",
    l."SettingId",
    stt."Name" AS "Setting",
    ARRAY( SELECT ll."SettingId"
           FROM bwgr."LifepathLeads" ll
          WHERE ll."LifepathId" = l."Id") AS "LeadIds",
    ARRAY( SELECT ls."SkillId"
           FROM bwgr."LifepathSkills" ls
          WHERE ls."LifepathId" = l."Id"
          ORDER BY ls."Index") AS "SkillIds",
    ARRAY( SELECT lt."TraitId"
           FROM bwgr."LifepathTraits" lt
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
           FROM bwgr."LifepathCompanionSettings" lcs
          WHERE lcs."LifepathId" = l."Id") AS "CompanionSettingIds"
   FROM bwgr."Lifepaths" l
     LEFT JOIN bwgr."Stocks" sto ON sto."Id" = l."StockId"
     LEFT JOIN bwgr."Settings" stt ON stt."Id" = l."SettingId"
     LEFT JOIN bwgr."LifepathCompanions" lc ON lc."LifepathId" = l."Id";

ALTER TABLE bwgr."LifepathsList"
    OWNER TO apiuser;


-- View: bwgr."LifepathRequirementBlocks"

-- DROP VIEW bwgr."LifepathRequirementBlocks";

CREATE OR REPLACE VIEW bwgr."LifepathRequirementBlocks" AS
 SELECT lr."Id",
    lr."LifepathId",
    lr."LogicTypeId",
    lt."Name" AS "LogicType",
    lr."MustFulfill",
    lr."FulfillmentAmount"
   FROM bwgr."LifepathRequirements" lr
     LEFT JOIN bwgr."LogicTypes" lt ON lr."LogicTypeId" = lt."Id";

ALTER TABLE bwgr."LifepathRequirementBlocks"
    OWNER TO apiuser;


-- View: bwgr."LifepathRequirementBlockItems"

-- DROP VIEW bwgr."LifepathRequirementBlockItems";

CREATE OR REPLACE VIEW bwgr."LifepathRequirementBlockItems" AS
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
   FROM bwgr."LifepathRequirementItems" lri
     LEFT JOIN bwgr."RequirementItemTypes" rit ON rit."Id" = lri."RequirementTypeId"
     LEFT JOIN bwgr."Settings" s ON s."Id" = lri."SettingId"
     LEFT JOIN bwgr."Lifepaths" l ON l."Id" = lri."LifepathId"
     LEFT JOIN bwgr."Skills" sk ON sk."Id" = lri."SkillId"
     LEFT JOIN bwgr."Traits" t ON t."Id" = lri."TraitId"
     LEFT JOIN bwgr."Abilities" a ON a."Id" = lri."AttributeId";

ALTER TABLE bwgr."LifepathRequirementBlockItems"
    OWNER TO apiuser;


-- View: bwgr."ResourcesList"

-- DROP VIEW bwgr."ResourcesList";

CREATE OR REPLACE VIEW bwgr."ResourcesList" AS
 SELECT ARRAY( SELECT rr."RulesetId"
           FROM bwgr."RulesetResources" rr
          WHERE rr."ResourceId" = r."Id") AS "Rulesets",
    r."Id",
    r."Name",
    r."StockId",
    s."Name" AS "Stock",
    r."ResourceTypeId",
    rt."Name" AS "ResourceType",
    r."Description",
    r."VariableCost",
    ARRAY( SELECT rc."Cost"
           FROM bwgr."ResourceCosts" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id") AS "Costs",
    array_remove(ARRAY( SELECT rc."Description"
           FROM bwgr."ResourceCosts" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id"), NULL::character varying) AS "CostDescriptions",
    ARRAY( SELECT rc."Cost"
           FROM bwgr."ResourceModifiers" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id") AS "Modifiers",
    ARRAY( SELECT rc."IsPerCost"
           FROM bwgr."ResourceModifiers" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id") AS "ModifierIsPerCosts",
    ARRAY( SELECT rc."Description"
           FROM bwgr."ResourceModifiers" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id") AS "ModifierDescriptions"
   FROM bwgr."Resources" r
     LEFT JOIN bwgr."Stocks" s ON s."Id" = r."StockId"
     LEFT JOIN bwgr."ResourceTypes" rt ON rt."Id" = r."ResourceTypeId";

ALTER TABLE bwgr."ResourcesList"
    OWNER TO apiuser;


-- View: bwgr."ResourceMagicDetailsList"

-- DROP VIEW bwgr."ResourceMagicDetailsList";

CREATE OR REPLACE VIEW bwgr."ResourceMagicDetailsList" AS
 SELECT rmd."Id",
    rmd."ResourceId",
    rmd."OriginId",
    sof."Name" AS "Origin",
    rmd."DurationId",
    sdf."Name" AS "Duration",
    rmd."AreaOfEffectId",
    saf."Name" AS "AreaOfEffect",
    rmd."AreaOfEffectUnitId",
    du."Name" AS "AreaOfEffectUnit",
    rmd."AreaOfEffectModifierId",
    um."Name" AS "AreaofEffectModifier",
    rmd."Element1Id",
    sef1."Name" AS "Element1",
    rmd."Element2Id",
    sef2."Name" AS "Element2",
    rmd."Element3Id",
    sef3."Name" AS "Element3",
    rmd."Impetus1Id",
    sif1."Name" AS "Impetus1",
    rmd."Impetus2Id",
    sif2."Name" AS "Impetus2",
    rmd."Actions",
    rmd."ActionsMultiply"
   FROM bwgr."ResourceMagicDetails" rmd
     LEFT JOIN bwgr."SpellOriginFacets" sof ON sof."Id" = rmd."OriginId"
     LEFT JOIN bwgr."SpellDurationFacets" sdf ON sdf."Id" = rmd."DurationId"
     LEFT JOIN bwgr."SpellAreaOfEffectFacets" saf ON saf."Id" = rmd."AreaOfEffectId"
     LEFT JOIN bwgr."SpellElementFacets" sef1 ON sef1."Id" = rmd."Element1Id"
     LEFT JOIN bwgr."SpellElementFacets" sef2 ON sef2."Id" = rmd."Element2Id"
     LEFT JOIN bwgr."SpellElementFacets" sef3 ON sef3."Id" = rmd."Element3Id"
     LEFT JOIN bwgr."SpellImpetusFacets" sif1 ON sif1."Id" = rmd."Impetus1Id"
     LEFT JOIN bwgr."SpellImpetusFacets" sif2 ON sif2."Id" = rmd."Impetus2Id"
     LEFT JOIN bwgr."DistanceUnits" du ON du."Id" = rmd."AreaOfEffectUnitId"
     LEFT JOIN bwgr."UnitModifiers" um ON um."Id" = rmd."AreaOfEffectModifierId";

ALTER TABLE bwgr."ResourceMagicDetailsList"
    OWNER TO apiuser;


-- View: bwgr."ResourceMagicObstaclesList"

-- DROP VIEW bwgr."ResourceMagicObstaclesList";

CREATE OR REPLACE VIEW bwgr."ResourceMagicObstaclesList" AS
 SELECT rmo."Id",
    rmo."ResourceId",
    rmo."Obstacle",
    rmo."ObstacleAbility1Id",
    a1."Name" AS "ObstacleAbility1",
    rmo."ObstacleAbility2Id",
    a2."Name" AS "ObstacleAbility2",
    rmo."ObstacleCaret",
    rmo."Description"
   FROM bwgr."ResourceMagicObstacles" rmo
     LEFT JOIN bwgr."Abilities" a1 ON a1."Id" = rmo."ObstacleAbility1Id"
     LEFT JOIN bwgr."Abilities" a2 ON a2."Id" = rmo."ObstacleAbility2Id";

ALTER TABLE bwgr."ResourceMagicObstaclesList"
    OWNER TO apiuser;


-- View: bwgr."DoWActionTestList"

-- DROP VIEW bwgr."DoWActionTestList";

CREATE OR REPLACE VIEW bwgr."DoWActionTestList" AS
 SELECT a."ActionId",
    a."SkillId",
    s."Name" AS "Skill",
    a."AbilityId",
    ab."Name" AS "Ability"
   FROM bwgr."DuelOfWitsActionTests" a
     LEFT JOIN bwgr."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN bwgr."Abilities" ab ON ab."Id" = a."AbilityId";

ALTER TABLE bwgr."DoWActionTestList"
    OWNER TO apiuser;


-- View: bwgr."DoWActionResolutionList"

-- DROP VIEW bwgr."DoWActionResolutionList";

CREATE OR REPLACE VIEW bwgr."DoWActionResolutionList" AS
 SELECT a."ActionId",
    a."OpposingActionId",
    oa."Name" AS "OpposingAction",
    a."ResolutionTypeId",
    rt."Name" AS "ResolutionType",
    a."IsAgainstSkill",
    a."Obstacle",
    a."OpposingModifier",
    a."SkillId",
    s."Name" AS "Skill",
    a."AbilityId",
    ab."Name" AS "Ability",
    a."OpposingSkillId",
    os."Name" AS "OpposingSkill",
    a."OpposingAbilityId",
    oab."Name" AS "OpposingAbility"
   FROM bwgr."DuelOfWitsActionResolutions" a
     LEFT JOIN bwgr."DuelOfWitsActions" oa ON oa."Id" = a."OpposingActionId"
     LEFT JOIN bwgr."ActionResolutionTypes" rt ON rt."Id" = a."ResolutionTypeId"
     LEFT JOIN bwgr."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN bwgr."Skills" os ON os."Id" = a."SkillId"
     LEFT JOIN bwgr."Abilities" ab ON ab."Id" = a."AbilityId"
     LEFT JOIN bwgr."Abilities" oab ON ab."Id" = a."AbilityId";

ALTER TABLE bwgr."DoWActionResolutionList"
    OWNER TO apiuser;


-- View: bwgr."RangeAndCoverActionsList"

-- DROP VIEW bwgr."RangeAndCoverActionsList";

CREATE OR REPLACE VIEW bwgr."RangeAndCoverActionsList" AS
 SELECT r."Id",
    r."Name",
    r."GroupId",
    rg."Name" AS "Group",
    r."UseFoRKs",
    r."UseWeaponRangeAdvantage",
    r."UsePositionAdvantage",
    r."UseStrideAdvantage",
    r."IsOpenEnded",
    r."Effect",
    r."SpecialRestriction",
    r."SpecialAction",
    r."However"
   FROM bwgr."RangeAndCoverActions" r
     LEFT JOIN bwgr."RangeAndCoverActionGroups" rg ON rg."Id" = r."GroupId";

ALTER TABLE bwgr."RangeAndCoverActionsList"
    OWNER TO apiuser;


-- View: bwgr."RangeAndCoverActionResolutionList"

-- DROP VIEW bwgr."RangeAndCoverActionResolutionList";

CREATE OR REPLACE VIEW bwgr."RangeAndCoverActionResolutionList" AS
 SELECT a."ActionId",
    a."OpposingActionId",
    oa."Name" AS "OpposingAction",
    a."ResolutionTypeId",
    rt."Name" AS "ResolutionType",
    a."IsAgainstSkill",
    a."Obstacle",
    a."OpposingModifier",
    a."SkillId",
    s."Name" AS "Skill",
    a."AbilityId",
    ab."Name" AS "Ability",
    a."OpposingSkillId",
    os."Name" AS "OpposingSkill",
    a."OpposingAbilityId",
    oab."Name" AS "OpposingAbility"
   FROM bwgr."RangeAndCoverActionResolutions" a
     LEFT JOIN bwgr."RangeAndCoverActions" oa ON oa."Id" = a."OpposingActionId"
     LEFT JOIN bwgr."ActionResolutionTypes" rt ON rt."Id" = a."ResolutionTypeId"
     LEFT JOIN bwgr."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN bwgr."Skills" os ON os."Id" = a."SkillId"
     LEFT JOIN bwgr."Abilities" ab ON ab."Id" = a."AbilityId"
     LEFT JOIN bwgr."Abilities" oab ON ab."Id" = a."AbilityId";

ALTER TABLE bwgr."RangeAndCoverActionResolutionList"
    OWNER TO apiuser;


-- View: bwgr."FightActionsList"

-- DROP VIEW bwgr."FightActionsList";

CREATE OR REPLACE VIEW bwgr."FightActionsList" AS
 SELECT f."Id",
    f."Name",
    f."GroupId",
    fg."Name" AS "Group",
    f."ActionCost",
    f."TestExtra",
    f."Restrictions",
    f."Effect",
    f."Special",
    f."CountsAsNoAction"
   FROM bwgr."FightActions" f
     LEFT JOIN bwgr."FightActionGroups" fg ON fg."Id" = f."GroupId";

ALTER TABLE bwgr."FightActionsList"
    OWNER TO apiuser;


-- View: bwgr."FightActionTestList"

-- DROP VIEW bwgr."FightActionTestList";

CREATE OR REPLACE VIEW bwgr."FightActionTestList" AS
 SELECT a."ActionId",
    a."SkillId",
    s."Name" AS "Skill",
    a."AbilityId",
    ab."Name" AS "Ability"
   FROM bwgr."FightActionTests" a
     LEFT JOIN bwgr."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN bwgr."Abilities" ab ON ab."Id" = a."AbilityId";

ALTER TABLE bwgr."FightActionTestList"
    OWNER TO apiuser;


-- View: bwgr."FightActionResolutionList"

-- DROP VIEW bwgr."FightActionResolutionList";

CREATE OR REPLACE VIEW bwgr."FightActionResolutionList" AS
 SELECT a."ActionId",
    a."OpposingActionId",
    oa."Name" AS "OpposingAction",
    a."ResolutionTypeId",
    rt."Name" AS "ResolutionType",
    a."IsAgainstSkill",
    a."Obstacle",
    a."OpposingModifier",
    a."SkillId",
    s."Name" AS "Skill",
    a."AbilityId",
    ab."Name" AS "Ability",
    a."OpposingSkillId",
    os."Name" AS "OpposingSkill",
    a."OpposingAbilityId",
    oab."Name" AS "OpposingAbility"
   FROM bwgr."FightActionResolutions" a
     LEFT JOIN bwgr."FightActions" oa ON oa."Id" = a."OpposingActionId"
     LEFT JOIN bwgr."ActionResolutionTypes" rt ON rt."Id" = a."ResolutionTypeId"
     LEFT JOIN bwgr."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN bwgr."Skills" os ON os."Id" = a."SkillId"
     LEFT JOIN bwgr."Abilities" ab ON ab."Id" = a."AbilityId"
     LEFT JOIN bwgr."Abilities" oab ON ab."Id" = a."AbilityId";

ALTER TABLE bwgr."FightActionResolutionList"
    OWNER TO apiuser;


-- View: bwgr."PracticeList"

-- DROP VIEW bwgr."PracticeList";

CREATE OR REPLACE VIEW bwgr."PracticeList" AS
 SELECT row_number() OVER (ORDER BY x."SkillTypeId", x."AbilityId") AS "Id",
    x."AbilityId",
    x."Ability",
    x."SkillTypeId",
    x."SkillType",
    x."Cycle",
    x."Routine",
    x."Difficult",
    x."Challenging"
   FROM ( SELECT "Abilities"."Id" AS "AbilityId",
            "Abilities"."Name" AS "Ability",
            NULL::integer AS "SkillTypeId",
            NULL::character varying AS "SkillType",
            "Abilities"."Cycle",
            "Abilities"."Routine",
            "Abilities"."Difficult",
            "Abilities"."Challenging"
           FROM bwgr."Abilities"
          WHERE "Abilities"."Cycle" IS NOT NULL
        UNION
         SELECT NULL::integer AS "AbilityId",
            NULL::character varying AS "AbilityName",
            "SkillTypes"."Id" AS "SkillTypeId",
            "SkillTypes"."Name" AS "SkillType",
            "SkillTypes"."Cycle",
            "SkillTypes"."Routine",
            "SkillTypes"."Difficult",
            "SkillTypes"."Challenging"
           FROM bwgr."SkillTypes"
          WHERE "SkillTypes"."Cycle" IS NOT NULL) x;

ALTER TABLE bwgr."PracticeList"
    OWNER TO apiuser;
