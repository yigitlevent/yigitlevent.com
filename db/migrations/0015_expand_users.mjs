export async function up(db) {
  await db.schema
    .withSchema("usr")
    .createTable("UserAccessTypes")
    .ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(63)")
    .execute();

  await db.schema
    .withSchema("usr")
    .createTable("UserAccess")
    .ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("UserId", "uuid", col => col.notNull())
    .addColumn("UserAccessTypeId", "integer", col => col.notNull())
    .addForeignKeyConstraint("fk_useraccess_userid", ["UserId"], "usr.Users", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_useraccess_useraccesstypeid", ["UserAccessTypeId"], "usr.UserAccessTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("usr").dropTable("UserAccess").ifExists().execute();
  await db.schema.withSchema("usr").dropTable("UserAccessTypes").ifExists().execute();
}
