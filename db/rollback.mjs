import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnv, createDb } from "./env.mjs";

await loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, "../db/migrations");
const db = createDb();

async function main() {
  try {
    const row = await db.withSchema("sys")
      .selectFrom("Migrations")
      .select("name")
      .orderBy("name", "desc")
      .limit(1)
      .executeTakeFirst();

    if (!row) {
      console.log("No migrations to roll back.");
      return;
    }

    const { down } = await import(join(MIGRATIONS_DIR, row.name));
    console.log(`Rolling back: ${row.name}`);

    try {
      await db.transaction().execute(async (trx) => {
        await down(trx);
        await trx.withSchema("sys").deleteFrom("Migrations").where("name", "=", row.name).execute();
      });
      console.log(`  Rolled back: ${row.name}`);
    } catch (err) {
      console.error(`  Failed: ${row.name}\n  ${err.message}`);
      process.exit(1);
    }
  } finally {
    await db.destroy();
  }
}

main().catch(err => { console.error(err.message); process.exit(1); });
