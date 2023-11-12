import { PoolConfig } from "pg";


export const PgConfig: PoolConfig = {
	user: process.env.API_PGUSER,
	password: process.env.API_PGPASSWORD,
	database: process.env.API_PGDATABASE,
	host: process.env.API_PGHOST,
	port: parseInt(process.env.API_PGPORT as string),
	max: 20,
	idleTimeoutMillis: 0,
	connectionTimeoutMillis: 0
	//log: (messages) => console.log(messages)
};

declare module "express-session" {
	interface SessionData {
		user: UserSession;
	}
}


