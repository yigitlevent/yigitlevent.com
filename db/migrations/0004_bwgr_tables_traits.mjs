export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("Traits").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("StockId", "integer")
    .addColumn("CategoryId", "integer", col => col.notNull())
    .addColumn("TypeId", "integer", col => col.notNull())
    .addColumn("Cost", "integer", col => col.notNull())
    .addColumn("Description", "text")
    .addForeignKeyConstraint("fk_traits_stock", ["StockId"], "bwgr.Stocks", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_traits_category", ["CategoryId"], "bwgr.TraitCategories", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_traits_type", ["TypeId"], "bwgr.TraitTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("RulesetTraits").ifNotExists()
    .addColumn("TraitId", "integer", col => col.notNull())
    .addColumn("RulesetId", "varchar(15)", col => col.notNull())
    .addPrimaryKeyConstraint("pk_ruleset_traits", ["TraitId", "RulesetId"])
    .addForeignKeyConstraint("fk_ruleset_traits_trait", ["TraitId"], "bwgr.Traits", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_ruleset_traits_ruleset", ["RulesetId"], "bwgr.Rulesets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("RulesetTraits").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("Traits").ifExists().execute();
}
