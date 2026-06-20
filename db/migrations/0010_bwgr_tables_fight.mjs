import { sql } from "kysely";

export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("FightActionGroups").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("FightActions").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("GroupId", "integer", col => col.notNull())
    .addColumn("ActionCost", "integer")
    .addColumn("TestExtra", "text")
    .addColumn("Restrictions", "text")
    .addColumn("Effect", "text")
    .addColumn("Special", "text")
    .addColumn("CountsAsNoAction", "boolean", col => col.notNull())
    .addForeignKeyConstraint("fk_fight_actions_group", ["GroupId"], "bwgr.FightActionGroups", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("FightActionTests").ifNotExists()
    .addColumn("Id", "integer", col => col.primaryKey().notNull())
    .addColumn("ActionId", "integer", col => col.notNull())
    .addColumn("SkillId", "integer")
    .addColumn("AbilityId", "integer")
    .addForeignKeyConstraint("fk_fight_tests_action", ["ActionId"], "bwgr.FightActions", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_fight_tests_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_fight_tests_ability", ["AbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addCheckConstraint("chk_fight_tests_skill_or_ability", sql`("SkillId" IS NULL) <> ("AbilityId" IS NULL)`)
    .execute();

  await db.schema.withSchema("bwgr").createTable("FightActionResolutions").ifNotExists()
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
    .addForeignKeyConstraint("fk_fight_res_action", ["ActionId"], "bwgr.FightActions", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_fight_res_opposing", ["OpposingActionId"], "bwgr.FightActions", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_fight_res_type", ["ResolutionTypeId"], "bwgr.ActionResolutionTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_fight_res_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_fight_res_ability", ["AbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_fight_res_opp_skill", ["OpposingSkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_fight_res_opp_ability", ["OpposingAbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("FightActionResolutions").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("FightActionTests").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("FightActions").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("FightActionGroups").ifExists().execute();
}