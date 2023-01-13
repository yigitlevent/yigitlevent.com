import { Client } from "pg";

export const PgClient = new Client({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
	host: process.env.GHOST,
	port: parseInt(process.env.PGPORT as string)
});
