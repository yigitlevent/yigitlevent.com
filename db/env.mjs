import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const { Pool } = pkg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

export async function loadEnv() {
  const envFile = join(ROOT, ".env");
  let raw;

  try {
    raw = await readFile(envFile, "utf8");
  } catch {
    return;
  }

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

export function buildConnectionUrl() {
  const user = process.env.API_PGUSER;
  const password = process.env.API_PGPASSWORD;
  const host = process.env.API_PGHOST ?? "localhost";
  const port = process.env.API_PGPORT ?? "5432";
  const database = process.env.API_PGDATABASE;

  if (!user || !password || !database || !host) {
    const missing = ["API_PGUSER", "API_PGPASSWORD", "API_PGHOST", "API_PGDATABASE"]
      .filter(k => !process.env[k])
      .join(", ");
    throw new Error(`Missing required env vars: ${missing}`);
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

export function createDb() {
  const user = process.env.API_PGUSER;
  const password = process.env.API_PGPASSWORD;
  const host = process.env.API_PGHOST ?? "localhost";
  const port = parseInt(process.env.API_PGPORT ?? "5432", 10);
  const database = process.env.API_PGDATABASE;

  if (!user || !password || !database || !host) {
    const missing = ["API_PGUSER", "API_PGPASSWORD", "API_PGHOST", "API_PGDATABASE"]
      .filter(k => !process.env[k])
      .join(", ");
    throw new Error(`Missing required env vars: ${missing}`);
  }

  const pool = new Pool({ user, password, host, port, database });
  return new Kysely({ dialect: new PostgresDialect({ pool }) });
}
