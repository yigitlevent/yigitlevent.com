import { PgPool } from "../index";

import type { Request, Response, NextFunction } from "express";


export async function CleanSessions(request: Request, response: Response, next: NextFunction): Promise<void> {
	const query = "delete from usr.\"UserSessions\" where (\"expire\"::date + '7 day'::interval) < now();";
	await PgPool.query(query);
	next();
}
