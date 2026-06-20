import { sql } from "kysely";

export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("Skills").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("StockId", "integer")
    .addColumn("CategoryId", "integer", col => col.notNull())
    .addColumn("TypeId", "integer", col => col.notNull())
    .addColumn("IsMagical", "boolean", col => col.notNull())
    .addColumn("IsTraining", "boolean", col => col.notNull())
    .addColumn("DontList", "boolean", col => col.notNull())
    .addColumn("Root1Id", "integer")
    .addColumn("Root2Id", "integer")
    .addColumn("Description", "text")
    .addColumn("ToolTypeId", "integer")
    .addColumn("ToolDescription", "varchar(255)")
    .addColumn("RestrictionOnlyStockId", "integer")
    .addColumn("RestrictionWhenBurning", "boolean")
    .addColumn("RestrictionAbilityId", "integer")
    .addForeignKeyConstraint("fk_skills_stock", ["StockId"], "bwgr.Stocks", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_skills_category", ["CategoryId"], "bwgr.SkillCategories", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_skills_type", ["TypeId"], "bwgr.SkillTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_skills_root1", ["Root1Id"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_skills_root2", ["Root2Id"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_skills_tooltype", ["ToolTypeId"], "bwgr.SkillToolTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_skills_restriction_stock", ["RestrictionOnlyStockId"], "bwgr.Stocks", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_skills_restriction_ability", ["RestrictionAbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("RulesetSkills").ifNotExists()
    .addColumn("SkillId", "integer", col => col.notNull())
    .addColumn("RulesetId", "varchar(15)", col => col.notNull())
    .addPrimaryKeyConstraint("pk_ruleset_skills", ["SkillId", "RulesetId"])
    .addForeignKeyConstraint("fk_ruleset_skills_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_ruleset_skills_ruleset", ["RulesetId"], "bwgr.Rulesets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("SkillSubskills").ifNotExists()
    .addColumn("SkillId", "integer", col => col.notNull())
    .addColumn("SubskillId", "integer", col => col.notNull())
    .addPrimaryKeyConstraint("pk_skill_subskills", ["SkillId", "SubskillId"])
    .addForeignKeyConstraint("fk_skill_subskills_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_skill_subskills_subskill", ["SubskillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addCheckConstraint("chk_skill_subskills_different", sql`"SkillId" <> "SubskillId"`)
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("SkillSubskills").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("RulesetSkills").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("Skills").ifExists().execute();
}