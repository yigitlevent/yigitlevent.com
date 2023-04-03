import { Request, Response, NextFunction } from "express";
import { PgPool } from "../index";


export async function CleanSessions(request: Request, response: Response, next: NextFunction) {
	const query =
		`delete from usr."UserSessions"
		where ("expire"::date + '7 day'::interval) < now();`;
	PgPool.query(query);
	next();
}
