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
    a."Challenging",
    a."RequiredTraitId",
    t."Name" as "RequiredTrait"
   FROM dat."Abilities" a
     LEFT JOIN dat."AbilityTypes" aty ON aty."Id" = a."AbilityTypeId"
     LEFT JOIN dat."Traits" t ON t."Id" = a."RequiredTraitId";

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


-- View: dat."ResourcesList"

-- DROP VIEW dat."ResourcesList";

CREATE OR REPLACE VIEW dat."ResourcesList" AS
 SELECT ARRAY( SELECT rr."RulesetId"
           FROM dat."RulesetResources" rr
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
           FROM dat."ResourceCosts" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id") AS "Costs",
    array_remove(ARRAY( SELECT rc."Description"
           FROM dat."ResourceCosts" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id"), NULL::character varying) AS "CostDescriptions",
    ARRAY( SELECT rc."Cost"
           FROM dat."ResourceModifiers" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id") AS "Modifiers",
    ARRAY( SELECT rc."IsPerCost"
           FROM dat."ResourceModifiers" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id") AS "ModifierIsPerCosts",
    ARRAY( SELECT rc."Description"
           FROM dat."ResourceModifiers" rc
          WHERE r."Id" = rc."ResourceId"
          ORDER BY rc."Id") AS "ModifierDescriptions"
   FROM dat."Resources" r
     LEFT JOIN dat."Stocks" s ON s."Id" = r."StockId"
     LEFT JOIN dat."ResourceTypes" rt ON rt."Id" = r."ResourceTypeId";

ALTER TABLE dat."ResourcesList"
    OWNER TO apiuser;


-- View: dat."ResourceMagicDetailsList"

-- DROP VIEW dat."ResourceMagicDetailsList";

CREATE OR REPLACE VIEW dat."ResourceMagicDetailsList" AS
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
   FROM dat."ResourceMagicDetails" rmd
     LEFT JOIN dat."SpellOriginFacets" sof ON sof."Id" = rmd."OriginId"
     LEFT JOIN dat."SpellDurationFacets" sdf ON sdf."Id" = rmd."DurationId"
     LEFT JOIN dat."SpellAreaOfEffectFacets" saf ON saf."Id" = rmd."AreaOfEffectId"
     LEFT JOIN dat."SpellElementFacets" sef1 ON sef1."Id" = rmd."Element1Id"
     LEFT JOIN dat."SpellElementFacets" sef2 ON sef2."Id" = rmd."Element2Id"
     LEFT JOIN dat."SpellElementFacets" sef3 ON sef3."Id" = rmd."Element3Id"
     LEFT JOIN dat."SpellImpetusFacets" sif1 ON sif1."Id" = rmd."Impetus1Id"
     LEFT JOIN dat."SpellImpetusFacets" sif2 ON sif2."Id" = rmd."Impetus2Id"
     LEFT JOIN dat."DistanceUnits" du ON du."Id" = rmd."AreaOfEffectUnitId"
     LEFT JOIN dat."UnitModifiers" um ON um."Id" = rmd."AreaOfEffectModifierId";

ALTER TABLE dat."ResourceMagicDetailsList"
    OWNER TO apiuser;


-- View: dat."ResourceMagicObstaclesList"

-- DROP VIEW dat."ResourceMagicObstaclesList";

CREATE OR REPLACE VIEW dat."ResourceMagicObstaclesList" AS
 SELECT rmo."Id",
    rmo."ResourceId",
    rmo."Obstacle",
    rmo."ObstacleAbility1Id",
    a1."Name" AS "ObstacleAbility1",
    rmo."ObstacleAbility2Id",
    a2."Name" AS "ObstacleAbility2",
    rmo."ObstacleCaret",
    rmo."Description"
   FROM dat."ResourceMagicObstacles" rmo
     LEFT JOIN dat."Abilities" a1 ON a1."Id" = rmo."ObstacleAbility1Id"
     LEFT JOIN dat."Abilities" a2 ON a2."Id" = rmo."ObstacleAbility2Id";

ALTER TABLE dat."ResourceMagicObstaclesList"
    OWNER TO apiuser;


-- View: dat."DoWActionTestList"

-- DROP VIEW dat."DoWActionTestList";

CREATE OR REPLACE VIEW dat."DoWActionTestList" AS
 SELECT a."ActionId",
    a."SkillId",
    s."Name" AS "Skill",
    a."AbilityId",
    ab."Name" AS "Ability"
   FROM dat."DuelOfWitsActionTests" a
     LEFT JOIN dat."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN dat."Abilities" ab ON ab."Id" = a."AbilityId";

ALTER TABLE dat."DoWActionTestList"
    OWNER TO apiuser;


-- View: dat."DoWActionResolutionList"

-- DROP VIEW dat."DoWActionResolutionList";

CREATE OR REPLACE VIEW dat."DoWActionResolutionList" AS
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
   FROM dat."DuelOfWitsActionResolutions" a
     LEFT JOIN dat."DuelOfWitsActions" oa ON oa."Id" = a."OpposingActionId"
     LEFT JOIN dat."ActionResolutionTypes" rt ON rt."Id" = a."ResolutionTypeId"
     LEFT JOIN dat."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN dat."Skills" os ON os."Id" = a."SkillId"
     LEFT JOIN dat."Abilities" ab ON ab."Id" = a."AbilityId"
     LEFT JOIN dat."Abilities" oab ON ab."Id" = a."AbilityId";

ALTER TABLE dat."DoWActionResolutionList"
    OWNER TO apiuser;


-- View: dat."RangeAndCoverActionsList"

-- DROP VIEW dat."RangeAndCoverActionsList";

CREATE OR REPLACE VIEW dat."RangeAndCoverActionsList" AS
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
   FROM dat."RangeAndCoverActions" r
     LEFT JOIN dat."RangeAndCoverActionGroups" rg ON rg."Id" = r."GroupId";

ALTER TABLE dat."RangeAndCoverActionsList"
    OWNER TO apiuser;


-- View: dat."RangeAndCoverActionResolutionList"

-- DROP VIEW dat."RangeAndCoverActionResolutionList";

CREATE OR REPLACE VIEW dat."RangeAndCoverActionResolutionList" AS
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
   FROM dat."RangeAndCoverActionResolutions" a
     LEFT JOIN dat."RangeAndCoverActions" oa ON oa."Id" = a."OpposingActionId"
     LEFT JOIN dat."ActionResolutionTypes" rt ON rt."Id" = a."ResolutionTypeId"
     LEFT JOIN dat."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN dat."Skills" os ON os."Id" = a."SkillId"
     LEFT JOIN dat."Abilities" ab ON ab."Id" = a."AbilityId"
     LEFT JOIN dat."Abilities" oab ON ab."Id" = a."AbilityId";

ALTER TABLE dat."RangeAndCoverActionResolutionList"
    OWNER TO apiuser;


-- View: dat."FightActionsList"

-- DROP VIEW dat."FightActionsList";

CREATE OR REPLACE VIEW dat."FightActionsList" AS
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
   FROM dat."FightActions" f
     LEFT JOIN dat."FightActionGroups" fg ON fg."Id" = f."GroupId";

ALTER TABLE dat."FightActionsList"
    OWNER TO apiuser;


-- View: dat."FightActionTestList"

-- DROP VIEW dat."FightActionTestList";

CREATE OR REPLACE VIEW dat."FightActionTestList" AS
 SELECT a."ActionId",
    a."SkillId",
    s."Name" AS "Skill",
    a."AbilityId",
    ab."Name" AS "Ability"
   FROM dat."FightActionTests" a
     LEFT JOIN dat."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN dat."Abilities" ab ON ab."Id" = a."AbilityId";

ALTER TABLE dat."FightActionTestList"
    OWNER TO apiuser;


-- View: dat."FightActionResolutionList"

-- DROP VIEW dat."FightActionResolutionList";

CREATE OR REPLACE VIEW dat."FightActionResolutionList" AS
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
   FROM dat."FightActionResolutions" a
     LEFT JOIN dat."FightActions" oa ON oa."Id" = a."OpposingActionId"
     LEFT JOIN dat."ActionResolutionTypes" rt ON rt."Id" = a."ResolutionTypeId"
     LEFT JOIN dat."Skills" s ON s."Id" = a."SkillId"
     LEFT JOIN dat."Skills" os ON os."Id" = a."SkillId"
     LEFT JOIN dat."Abilities" ab ON ab."Id" = a."AbilityId"
     LEFT JOIN dat."Abilities" oab ON ab."Id" = a."AbilityId";

ALTER TABLE dat."FightActionResolutionList"
    OWNER TO apiuser;
