export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("SpellFacetTypes").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  for (const name of ["SpellOriginFacets", "SpellDurationFacets", "SpellAreaOfEffectFacets", "SpellElementFacets", "SpellImpetusFacets"]) {
    await db.schema.withSchema("bwgr").createTable(name).ifNotExists()
      .addColumn("Id", "serial", col => col.primaryKey())
      .addColumn("Name", "varchar(255)", col => col.notNull())
      .addColumn("Obstacle", "integer", col => col.notNull())
      .addColumn("Actions", "integer", col => col.notNull())
      .addColumn("Resource", "integer", col => col.notNull())
      .execute();
  }
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("SpellImpetusFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("SpellElementFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("SpellAreaOfEffectFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("SpellDurationFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("SpellOriginFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("SpellFacetTypes").ifExists().execute();
}