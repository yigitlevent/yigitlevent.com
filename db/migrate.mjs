import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { sql } from "kysely";
import { loadEnv, createDb } from "./env.mjs";

await loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, "../db/migrations");
const db = createDb();

async function ensureMigrationsTable() {
  await sql`CREATE SCHEMA IF NOT EXISTS sys`.execute(db);

  await db.schema
    .withSchema("sys")
    .createTable("Migrations")
    .ifNotExists()
    .addColumn("name", "varchar(255)", col => col.primaryKey().notNull())
    .addColumn("runAt", sql`timestamp with time zone`, col => col.notNull().defaultTo(sql`NOW()`))
    .execute();
}

async function getAppliedMigrations() {
  const rows = await db.withSchema("sys").selectFrom("Migrations").select("name").execute();
  return new Set(rows.map(r => r.name));
}

async function main() {
  try {
    await ensureMigrationsTable();

    const files = (await readdir(MIGRATIONS_DIR))
      .filter(f => f.endsWith(".mjs"))
      .sort();

    const applied = await getAppliedMigrations();
    const pending = files.filter(f => !applied.has(f));

    if (pending.length === 0) {
      console.log("No pending migrations.");
      return;
    }

    for (const file of pending) {
      const { up } = await import(join(MIGRATIONS_DIR, file));
      console.log(`Running: ${file}`);

      try {
        await db.transaction().execute(async (trx) => {
          await up(trx);
          await trx.withSchema("sys").insertInto("Migrations").values({ name: file }).execute();
        });
        console.log(`  Applied: ${file}`);
      } catch (err) {
        console.error(`  Failed: ${file}\n  ${err.message}`);
        process.exit(1);
      }
    }

    console.log(`\nApplied ${pending.length} migration(s).`);
  } finally {
    await db.destroy();
  }
}

main().catch(err => { console.error(err.message); process.exit(1); });
