import { sql } from "kysely";

export async function up(db) {
  await sql`CREATE SCHEMA IF NOT EXISTS bwgr`.execute(db);

  await db.schema.withSchema("bwgr").createTable("LogicTypes").ifNotExists()
    .addColumn("Id", "integer", col => col.primaryKey().notNull())
    .addColumn("Name", "varchar(7)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("RequirementItemTypes").ifNotExists()
    .addColumn("Id", "integer", col => col.primaryKey().notNull())
    .addColumn("Name", "varchar(31)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("AbilityTypes").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("SkillToolTypes").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("SkillTypes").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("Cycle", "integer", col => col.notNull())
    .addColumn("Routine", "integer", col => col.notNull())
    .addColumn("Difficult", "integer", col => col.notNull())
    .addColumn("Challenging", "integer", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("SkillCategories").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("TraitTypes").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("TraitCategories").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("ActionResolutionTypes").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(15)", col => col.notNull())
    .addColumn("NameLong", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("ResourceTypes").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("TimeUnits").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("DistanceUnits").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();

  await db.schema.withSchema("bwgr").createTable("UnitModifiers").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("UnitModifiers").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("DistanceUnits").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("TimeUnits").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("ResourceTypes").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("ActionResolutionTypes").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("TraitCategories").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("TraitTypes").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("SkillCategories").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("SkillTypes").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("SkillToolTypes").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("AbilityTypes").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("RequirementItemTypes").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("LogicTypes").ifExists().execute();
  await sql`DROP SCHEMA IF EXISTS bwgr`.execute(db);
}