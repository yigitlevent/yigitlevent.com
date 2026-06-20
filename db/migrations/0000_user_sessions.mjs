import { sql } from "kysely";

export async function up(db) {
  await sql`CREATE SCHEMA IF NOT EXISTS usr`.execute(db);

  await db.schema
    .withSchema("usr")
    .createTable("UserRoles")
    .ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(63)")
    .execute();

  await db.schema
    .withSchema("usr")
    .createTable("Users")
    .ifNotExists()
    .addColumn("Id", "uuid", col => col.primaryKey().notNull().defaultTo(sql`gen_random_uuid()`))
    .addColumn("Username", "varchar(255)", col => col.notNull().unique())
    .addColumn("Email", "varchar(255)", col => col.notNull().unique())
    .addColumn("Password", "varchar(255)", col => col.notNull())
    .addColumn("Enabled", "boolean", col => col.notNull().defaultTo(true))
    .addColumn("Role", "integer", col => col.notNull().defaultTo(1))
    .addColumn("CreatedAt", sql`timestamp with time zone`, col => col.notNull().defaultTo(sql`now()`))
    .addColumn("LastSigninAt", sql`timestamp with time zone`)
    .addForeignKeyConstraint("fk_users_role", ["Role"], "usr.UserRoles", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema
    .withSchema("usr")
    .createTable("UserSessions")
    .ifNotExists()
    .addColumn("sid", "varchar", col => col.primaryKey().notNull())
    .addColumn("sess", "json", col => col.notNull())
    .addColumn("expire", sql`timestamp(6) without time zone`, col => col.notNull())
    .execute();

  await db.schema
    .withSchema("usr")
    .createIndex("IDX_session_expire")
    .ifNotExists()
    .on("UserSessions")
    .column("expire")
    .execute();

  await db
    .insertInto("usr.UserRoles")
    .values([
      { Id: 0, Name: "Admin" },
      { Id: 1, Name: "User" }
    ])
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("usr").dropTable("UserSessions").ifExists().execute();
  await db.schema.withSchema("usr").dropTable("Users").ifExists().execute();
  await db.schema.withSchema("usr").dropTable("UserRoles").ifExists().execute();
  await sql`DROP SCHEMA IF EXISTS usr`.execute(db);
}