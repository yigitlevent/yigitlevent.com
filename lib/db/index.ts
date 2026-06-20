import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import type { DB as DBType } from "@/types/db";


const GlobalForKysely = globalThis as unknown as { KyselyDb?: Kysely<DBType>; };

export function CreateKyselyDb(): Kysely<DBType> {
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

export const DB = GlobalForKysely.KyselyDb ?? CreateKyselyDb();
