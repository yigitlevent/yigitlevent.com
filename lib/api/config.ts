export const ApiConfig = {
  env: process.env.API_ENV ?? process.env.NODE_ENV,
  pg: {
    user: process.env.API_PGUSER,
    password: process.env.API_PGPASSWORD,
    database: process.env.API_PGDATABASE,
    host: process.env.API_PGHOST,
    port: Number.parseInt(process.env.API_PGPORT ?? "5432", 10)
  },
  session: {
    secret: process.env.API_SECRET ?? "local-dev-secret",
    cookieName: "connect.sid",
    maxAgeMs: 1000 * 60 * 60 * 24
  }
};

export const IsDev = ApiConfig.env === "development";

export function ValidateApiConfig(): void {
  const required = [
    ["API_PGUSER", ApiConfig.pg.user],
    ["API_PGPASSWORD", ApiConfig.pg.password],
    ["API_PGDATABASE", ApiConfig.pg.database],
    ["API_PGHOST", ApiConfig.pg.host]
  ] as const;

  const missing = required.filter(entry => !entry[1]).map(entry => entry[0]);
  if (missing.length > 0) {
    throw new Error(`Missing API env vars: ${missing.join(", ")}`);
  }
}
