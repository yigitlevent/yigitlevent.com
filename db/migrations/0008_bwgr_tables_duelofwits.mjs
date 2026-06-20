import { sql } from "kysely";

export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("DuelOfWitsActions").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("SpeakingThePart", "text")
    .addColumn("Special", "text")
    .addColumn("Effect", "text")
    .execute();

  await db.schema.withSchema("bwgr").createTable("DuelOfWitsActionTests").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("ActionId", "integer", col => col.notNull())
    .addColumn("SkillId", "integer")
    .addColumn("AbilityId", "integer")
    .addForeignKeyConstraint("fk_dow_tests_action", ["ActionId"], "bwgr.DuelOfWitsActions", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_dow_tests_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_dow_tests_ability", ["AbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addCheckConstraint("chk_dow_tests_skill_or_ability", sql`("SkillId" IS NULL) <> ("AbilityId" IS NULL)`)
    .execute();

  await db.schema.withSchema("bwgr").createTable("DuelOfWitsActionResolutions").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("ActionId", "integer", col => col.notNull())
    .addColumn("OpposingActionId", "integer", col => col.notNull())
    .addColumn("ResolutionTypeId", "integer", col => col.notNull())
    .addColumn("IsAgainstSkill", "boolean")
    .addColumn("Obstacle", "integer")
    .addColumn("SkillId", "integer")
    .addColumn("AbilityId", "integer")
    .addColumn("OpposingSkillId", "integer")
    .addColumn("OpposingAbilityId", "integer")
    .addColumn("OpposingModifier", "integer")
    .addForeignKeyConstraint("fk_dow_res_action", ["ActionId"], "bwgr.DuelOfWitsActions", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_dow_res_opposing", ["OpposingActionId"], "bwgr.DuelOfWitsActions", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_dow_res_type", ["ResolutionTypeId"], "bwgr.ActionResolutionTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_dow_res_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_dow_res_ability", ["AbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_dow_res_opp_skill", ["OpposingSkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_dow_res_opp_ability", ["OpposingAbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("DuelOfWitsActionResolutions").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("DuelOfWitsActionTests").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("DuelOfWitsActions").ifExists().execute();
}