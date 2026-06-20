import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnv, createDb } from "./env.mjs";

await loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, "../db/migrations");
const db = createDb();

async function main() {
  try {
    const appliedMigrations = await db.withSchema("sys")
      .selectFrom("Migrations")
      .select("name")
      .orderBy("name", "desc")
      .execute();

    if (appliedMigrations.length === 0) {
      console.log("No migrations to roll back.");
      return;
    }

    console.log(`Rolling back ${appliedMigrations.length} migration(s)...\n`);

    for (const row of appliedMigrations) {
      const { down } = await import(join(MIGRATIONS_DIR, row.name));
      console.log(`Rolling back: ${row.name}`);

      try {
        await db.transaction().execute(async (trx) => {
          await down(trx);
          await trx.withSchema("sys").deleteFrom("Migrations").where("name", "=", row.name).execute();
        });
        console.log(`  ✓ Rolled back: ${row.name}`);
      } catch (err) {
        console.error(`  ✗ Failed: ${row.name}\n  ${err.message}`);
        process.exit(1);
      }
    }

    console.log(`\n✓ All migrations rolled back successfully.`);
  } finally {
    await db.destroy();
  }
}

await main();
