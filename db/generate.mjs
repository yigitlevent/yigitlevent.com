import { execFileSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadEnv, buildConnectionUrl } from "./env.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

await loadEnv();
const url = buildConnectionUrl();

execFileSync(
  "kysely-codegen",
  ["--dialect", "postgres", "--url", url, "--out-file", "types/db.d.ts"],
  { cwd: ROOT, stdio: "inherit" }
);
