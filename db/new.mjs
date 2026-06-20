import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFile } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, "./migrations");

async function main() {
  const name = process.argv[2];

  if (!name) {
    console.error("Usage: node db/new.mjs <migration_name>");
    console.error("Example: node db/new.mjs add_users_table");
    process.exit(1);
  }

  try {
    const files = (await readdir(MIGRATIONS_DIR))
      .filter(f => f.endsWith(".mjs"))
      .sort();

    const lastFile = files[files.length - 1];
    const lastNumber = parseInt(lastFile.split("_")[0], 10);
    const nextNumber = String(lastNumber + 1).padStart(4, "0");

    const fileName = `${nextNumber}_${name}.mjs`;
    const filePath = join(MIGRATIONS_DIR, fileName);

    const template = `export async function up(db) {
  // TODO: Implement migration
}

export async function down(db) {
  // TODO: Implement rollback
}
`;

    await writeFile(filePath, template);
    console.log(`Created migration: ${fileName}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
