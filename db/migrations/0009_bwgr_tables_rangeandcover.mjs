export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("RangeAndCoverActionGroups").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("RangeAndCoverActions").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("GroupId", "integer", col => col.notNull())
    .addColumn("Modifier", "integer", col => col.notNull())
    .addColumn("UseFoRKs", "boolean", col => col.notNull())
    .addColumn("UseWeaponRangeAdvantage", "boolean", col => col.notNull())
    .addColumn("UsePositionAdvantage", "boolean", col => col.notNull())
    .addColumn("UseStrideAdvantage", "boolean", col => col.notNull())
    .addColumn("IsOpenEnded", "boolean", col => col.notNull())
    .addColumn("Effect", "text", col => col.notNull())
    .addColumn("SpecialRestriction", "text")
    .addColumn("SpecialAction", "text")
    .addColumn("However", "text")
    .addForeignKeyConstraint("fk_rac_actions_group", ["GroupId"], "bwgr.RangeAndCoverActionGroups", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("RangeAndCoverActionResolutions").ifNotExists()
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
    .addForeignKeyConstraint("fk_rac_res_action", ["ActionId"], "bwgr.RangeAndCoverActions", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rac_res_opposing", ["OpposingActionId"], "bwgr.RangeAndCoverActions", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rac_res_type", ["ResolutionTypeId"], "bwgr.ActionResolutionTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rac_res_skill", ["SkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rac_res_ability", ["AbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rac_res_opp_skill", ["OpposingSkillId"], "bwgr.Skills", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rac_res_opp_ability", ["OpposingAbilityId"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("RangeAndCoverActionResolutions").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("RangeAndCoverActions").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("RangeAndCoverActionGroups").ifExists().execute();
}