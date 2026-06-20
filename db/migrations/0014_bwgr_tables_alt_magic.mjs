export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("AltSpellFacetTypes").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  for (const name of ["AltSpellOriginFacets", "AltSpellPrimeElementFacets", "AltSpellLowerElementFacets", "AltSpellHigherElementFacets", "AltSpellLawFacets"]) {
    await db.schema.withSchema("bwgr").createTable(name).ifNotExists()
      .addColumn("Id", "serial", col => col.primaryKey())
      .addColumn("Name", "varchar(255)", col => col.notNull())
      .addColumn("Obstacle", "integer", col => col.notNull())
      .addColumn("Actions", "integer", col => col.notNull())
      .addColumn("Resource", "integer", col => col.notNull())
      .execute();
  }

  for (const name of ["AltSpellDurationFacets", "AltSpellAreaOfEffectFacets"]) {
    await db.schema.withSchema("bwgr").createTable(name).ifNotExists()
      .addColumn("Id", "serial", col => col.primaryKey())
      .addColumn("Name", "varchar(255)", col => col.notNull())
      .addColumn("Obstacle", "integer", col => col.notNull())
      .addColumn("Actions", "integer", col => col.notNull())
      .addColumn("Resource", "integer", col => col.notNull())
      .addColumn("SubFacet", "varchar(255)")
      .execute();
  }
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("AltSpellAreaOfEffectFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AltSpellDurationFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AltSpellLawFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AltSpellHigherElementFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AltSpellLowerElementFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AltSpellPrimeElementFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AltSpellOriginFacets").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AltSpellFacetTypes").ifExists().execute();
}
