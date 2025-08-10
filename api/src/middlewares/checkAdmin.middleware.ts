import { Request, Response, NextFunction } from "express";


export function CheckAdmin(request: Request, response: Response, next: NextFunction): unknown {
	if (request.sessionID && request.session.user && request.session.user.userAccess.includes("Admin")) return next();
	// TODO: Figure out what to do here
	return response.sendStatus(401);
}
