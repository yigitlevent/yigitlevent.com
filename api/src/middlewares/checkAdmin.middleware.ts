import { FindUserBySessionId } from "../services/user.service";

import type { Request, Response, NextFunction } from "express";


export async function CheckAdmin(request: Request, response: Response, next: NextFunction): Promise<unknown> {
	if (request.sessionID) {
		const user = await FindUserBySessionId(request.sessionID);
		if (user?.UserAccess.includes("Admin" as UserAccess)) { next(); return; }
	}

	return response.sendStatus(401);
}
