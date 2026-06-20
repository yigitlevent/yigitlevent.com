export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("Questions").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull().unique())
    .addColumn("Question", "text", col => col.notNull())
    .addColumn("AttributeId1", "integer")
    .addColumn("AttributeId2", "integer")
    .addForeignKeyConstraint("fk_questions_attribute1", ["AttributeId1"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_questions_attribute2", ["AttributeId2"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("Questions").ifExists().execute();
}