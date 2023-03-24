create or replace view dat."SkillsList" as
    select 
        array(select rs."RulesetId" from dat."RulesetSkills" rs where rs."SkillId" = s."Id") as "Rulesets",

        s."Id",
        s."Name",

        s."StockId",
        sto."Name" as "Stock", 

        s."CategoryId",
        sc."Name" as "Category",

        s."TypeId",
        sty."Name" as "Type",

        array_remove(array [s."Root1Id", s."Root2Id"], null) as "RootIds",
        array_remove(array [ab1."Name", ab2."Name"], null) as "Roots",

        s."DontList",
        s."IsMagical",
        s."IsTraining",
        s."ToolTypeId",

        stt."Name" as "Tool",
        s."ToolDescription",

        s."Description",
        
        array(select ss."SubskillId" from dat."SkillSubskills" ss where ss."SkillId" = s."Id") as "Subskills"

    from dat."Skills" s
    left join dat."Stocks" sto
        on sto."Id" = s."StockId"
    left join dat."SkillCategories" sc
        on sc."Id" = s."CategoryId"
    left join dat."SkillTypes" sty
        on sty."Id" = s."TypeId"
    left join dat."SkillToolTypes" stt
        on stt."Id" = s."ToolTypeId"
    left join dat."Abilities" ab1
        on ab1."Id" = s."Root1Id"
    left join dat."Abilities" ab2
        on ab2."Id" = s."Root2Id";

alter view if exists dat."SkillsList"
    OWNER to apiuser;


create or replace view dat."TraitsList" as
    select 
        array(select rt."RulesetId" from dat."RulesetTraits" rt where rt."TraitId" = t."Id") as "Rulesets",

        t."Id",
        t."Name",

        t."StockId",
        sto."Name" as "Stock",

        t."CategoryId",
        tc."Name" as "Category",

        t."TypeId",
        tty."Name" as "Type",

        t."Cost",
        t."Description"

    from dat."Traits" t
    left join dat."Stocks" sto
        on sto."Id" = t."StockId"
    left join dat."TraitCategories" tc
        on tc."Id" = t."CategoryId"
    left join dat."TraitTypes" tty
        on tty."Id" = t."TypeId";

alter view if exists dat."TraitsList"
    OWNER to apiuser;


create or replace view dat."LifepathsList" as
    -- TODO: Lifepath Requirements & Lifepath Requirement Items

    select 
        array(select rl."RulesetId" from dat."RulesetLifepaths" rl where rl."LifepathId" = l."Id") as "Rulesets",

        l."Id",
        l."Name",

        l."StockId",
        sto."Name" as "Stock", 

        l."SettingId",
        stt."Name" as "Setting",

        array(select ll."SettingId" from dat."LifepathLeads" ll where ll."LifepathId" = l."Id") as "LeadIds",
        array(select ls."SkillId" from dat."LifepathSkills" ls where ls."LifepathId" = l."Id" order by ls."Index" asc) as "SkillIds",
        array(select lt."TraitId" from dat."LifepathTraits" lt where lt."LifepathId" = l."Id" order by lt."Index" asc) as "TraitIds",

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
        lc."GivesSkills" as "CompanionGivesSkills",
        lc."GSPMultiplier" as "CompanionGSPMultiplier",
        lc."LSPMultiplier" as "CompanionLSPMultiplier",
        lc."RPMultiplier" as "CompanionRPMultiplier",
        array(select lcs."CompanionSettingId" from dat."LifepathCompanionSettings" lcs where lcs."LifepathId" = l."Id") as "CompanionSettingIds"

    from dat."Lifepaths" l

    left join dat."Stocks" sto
        on sto."Id" = l."StockId"
    left join dat."Settings" stt
        on stt."Id" = l."SettingId"
    left join dat."LifepathCompanions" lc
        on lc."LifepathId" = l."Id";

alter view if exists dat."LifepathsList"
    OWNER to apiuser;