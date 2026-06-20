export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("Stocks").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("NamePlural", "varchar(255)", col => col.notNull())
    .addColumn("Stride", "integer", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("AgePools").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("StockId", "serial", col => col.notNull())
    .addColumn("MinAge", "integer", col => col.notNull())
    .addColumn("MentalPool", "integer", col => col.notNull())
    .addColumn("PhysicalPool", "integer", col => col.notNull())
    .addForeignKeyConstraint("fk_agepools_stock", ["StockId"], "bwgr.Stocks", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("RulesetStocks").ifNotExists()
    .addColumn("StockId", "integer", col => col.notNull())
    .addColumn("RulesetId", "varchar(15)", col => col.notNull())
    .addPrimaryKeyConstraint("pk_ruleset_stocks", ["StockId", "RulesetId"])
    .addForeignKeyConstraint("fk_ruleset_stocks_stock", ["StockId"], "bwgr.Stocks", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_ruleset_stocks_ruleset", ["RulesetId"], "bwgr.Rulesets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("Settings").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("NameShort", "varchar(255)", col => col.notNull())
    .addColumn("StockId", "integer", col => col.notNull())
    .addColumn("IsSubsetting", "boolean", col => col.notNull())
    .addForeignKeyConstraint("fk_settings_stock", ["StockId"], "bwgr.Stocks", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("RulesetSettings").ifNotExists()
    .addColumn("SettingId", "integer", col => col.notNull())
    .addColumn("RulesetId", "varchar(15)", col => col.notNull())
    .addPrimaryKeyConstraint("pk_ruleset_settings", ["SettingId", "RulesetId"])
    .addForeignKeyConstraint("fk_ruleset_settings_setting", ["SettingId"], "bwgr.Settings", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_ruleset_settings_ruleset", ["RulesetId"], "bwgr.Rulesets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("RulesetSettings").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("Settings").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("RulesetStocks").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AgePools").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("Stocks").ifExists().execute();
}