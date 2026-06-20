import { sql } from "kysely";

export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("Lifepaths").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("StockId", "integer", col => col.notNull())
    .addColumn("SettingId", "integer", col => col.notNull())
    .addColumn("Born", "boolean", col => col.notNull())
    .addColumn("Years", sql`integer[]`, col => col.notNull())
    .addColumn("EitherPool", "integer", col => col.notNull())
    .addColumn("MentalPool", "integer", col => col.notNull())
    .addColumn("PhysicalPool", "integer", col => col.notNull())
    .addColumn("GeneralSkillPool", "integer", col => col.notNull())
    .addColumn("LifepathSkillPool", "integer", col => col.notNull())
    .addColumn("TraitPool", "integer", col => col.notNull())
    .addColumn("ResourcePoints", "integer", col => col.notNull())
    .addColumn("IsGSPMultiplier", "boolean", col => col.notNull())
    .addColumn("IsLSPMultiplier", "boolean", col => col.notNull())
    .addColumn("IsRPMultiplier", "boolean", col => col.notNull())
    .addColumn("HalfGSPFromPrev", "boolean", col => col.notNull())
    .addColumn("HalfLSPFromPrev", "boolean", col => col.notNull())
    .addColumn("HalfRPFromPrev", "boolean", col => col.notNull())
    .addColumn("RequirementText", "text")
    .addForeignKeyConstraint("fk_lifepaths_stock", ["StockId"], "bwgr.Stocks", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lifepaths_setting", ["SettingId"], "bwgr.Settings", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("LifepathLeads").ifNotExists()
    .addColumn("LifepathId", "integer", col => col.notNull())
    .addColumn("SettingId", "integer", col => col.notNull())
    .addPrimaryKeyConstraint("pk_lifepath_leads", ["LifepathId", "SettingId"])
    .addForeignKeyConstraint("fk_lifepath_leads_lifepath", ["LifepathId"], "bwgr.Lifepaths", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lifepath_leads_setting", ["SettingId"], "bwgr.Settings", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("LifepathSkills").ifNotExists()
    .addColumn("LifepathId", "integer", col => col.notNull())
    .addColumn("SkillId", "integer", col => col.notNull())
    .addColumn("Index", "integer", col => col.notNull())
    .addPrimaryKeyConstraint("pk_lifepath_skills", ["LifepathId", "SkillId"])
    .addForeignKeyConstraint("fk_lifepath_skills_lifepath", ["LifepathId"], "bwgr.Lifepaths", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lifepath_skills_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("LifepathTraits").ifNotExists()
    .addColumn("LifepathId", "integer", col => col.notNull())
    .addColumn("TraitId", "integer", col => col.notNull())
    .addColumn("Index", "integer", col => col.notNull())
    .addPrimaryKeyConstraint("pk_lifepath_traits", ["LifepathId", "TraitId"])
    .addForeignKeyConstraint("fk_lifepath_traits_lifepath", ["LifepathId"], "bwgr.Lifepaths", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lifepath_traits_trait", ["TraitId"], "bwgr.Traits", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("LifepathCompanions").ifNotExists()
    .addColumn("LifepathId", "integer", col => col.primaryKey().notNull())
    .addColumn("CompanionName", "varchar(63)", col => col.notNull())
    .addColumn("GivesSkills", "boolean", col => col.notNull())
    .addColumn("GSPMultiplier", "float8", col => col.notNull())
    .addColumn("LSPMultiplier", "float8", col => col.notNull())
    .addColumn("RPMultiplier", "float8", col => col.notNull())
    .addForeignKeyConstraint("fk_lifepath_companions_lifepath", ["LifepathId"], "bwgr.Lifepaths", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("LifepathCompanionSettings").ifNotExists()
    .addColumn("LifepathId", "integer", col => col.notNull())
    .addColumn("CompanionSettingId", "integer", col => col.notNull())
    .addPrimaryKeyConstraint("pk_lifepath_companion_settings", ["LifepathId", "CompanionSettingId"])
    .addForeignKeyConstraint("fk_lp_companion_settings_lifepath", ["LifepathId"], "bwgr.Lifepaths", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lp_companion_settings_setting", ["CompanionSettingId"], "bwgr.Settings", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("RulesetLifepaths").ifNotExists()
    .addColumn("LifepathId", "integer", col => col.notNull())
    .addColumn("RulesetId", "varchar(15)", col => col.notNull())
    .addPrimaryKeyConstraint("pk_ruleset_lifepaths", ["LifepathId", "RulesetId"])
    .addForeignKeyConstraint("fk_ruleset_lifepaths_lifepath", ["LifepathId"], "bwgr.Lifepaths", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_ruleset_lifepaths_ruleset", ["RulesetId"], "bwgr.Rulesets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("LifepathRequirements").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("LifepathId", "integer", col => col.notNull())
    .addColumn("LogicTypeId", "integer", col => col.notNull())
    .addColumn("MustFulfill", "boolean", col => col.notNull())
    .addColumn("FulfillmentAmount", "integer", col => col.notNull())
    .addForeignKeyConstraint("fk_lp_requirements_lifepath", ["LifepathId"], "bwgr.Lifepaths", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lp_requirements_logictype", ["LogicTypeId"], "bwgr.LogicTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("LifepathRequirementItems").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("RequirementId", "integer", col => col.notNull())
    .addColumn("RequirementTypeId", "integer", col => col.notNull())
    .addColumn("ForCompanion", "boolean", col => col.notNull())
    .addColumn("Min", "integer")
    .addColumn("Max", "integer")
    .addColumn("SettingId", "integer")
    .addColumn("LifepathId", "integer")
    .addColumn("SkillId", "integer")
    .addColumn("TraitId", "integer")
    .addColumn("AttributeId", "integer")
    .addForeignKeyConstraint("fk_lp_req_items_requirement", ["RequirementId"], "bwgr.LifepathRequirements", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lp_req_items_type", ["RequirementTypeId"], "bwgr.RequirementItemTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lp_req_items_setting", ["SettingId"], "bwgr.Settings", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lp_req_items_lifepath", ["LifepathId"], "bwgr.Lifepaths", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lp_req_items_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lp_req_items_trait", ["TraitId"], "bwgr.Traits", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_lp_req_items_attribute", ["AttributeId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("LifepathRequirementItems").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("LifepathRequirements").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("RulesetLifepaths").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("LifepathCompanionSettings").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("LifepathCompanions").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("LifepathTraits").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("LifepathSkills").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("LifepathLeads").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("Lifepaths").ifExists().execute();
} 