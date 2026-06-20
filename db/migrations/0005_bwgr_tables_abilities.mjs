export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("Abilities").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("AbilityTypeId", "integer", col => col.notNull())
    .addColumn("HasShades", "boolean", col => col.notNull())
    .addColumn("Cycle", "integer")
    .addColumn("Routine", "integer")
    .addColumn("Difficult", "integer")
    .addColumn("Challenging", "integer")
    .addColumn("RequiredTraitId", "integer")
    .addForeignKeyConstraint("fk_abilities_type", ["AbilityTypeId"], "bwgr.AbilityTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_abilities_trait", ["RequiredTraitId"], "bwgr.Traits", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("Abilities").ifExists().execute();
}