export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("Rulesets").ifNotExists()
    .addColumn("Id", "varchar(15)", col => col.primaryKey().notNull())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("IsOfficial", "boolean", col => col.notNull())
    .addColumn("IsPublic", "boolean", col => col.notNull())
    .addColumn("IsExpansion", "boolean", col => col.notNull())
    .addColumn("User", "uuid")
    .addForeignKeyConstraint("fk_rulesets_user", ["User"], "usr.Users", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("RulesetExpansions").ifNotExists()
    .addColumn("RulesetId", "varchar(15)", col => col.notNull())
    .addColumn("ExpansionId", "varchar(15)", col => col.notNull())
    .addPrimaryKeyConstraint("pk_ruleset_expansions", ["RulesetId", "ExpansionId"])
    .addForeignKeyConstraint("fk_ruleset_expansions_ruleset", ["RulesetId"], "bwgr.Rulesets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_ruleset_expansions_expansion", ["ExpansionId"], "bwgr.Rulesets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("RulesetExpansions").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("Rulesets").ifExists().execute();
}