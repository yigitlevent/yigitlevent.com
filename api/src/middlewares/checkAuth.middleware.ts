import { Request, Response, NextFunction } from "express";


export function CheckAuth(request: Request, response: Response, next: NextFunction) {
	if (request.sessionID && request.session.user) return next();
	// TODO: Figure out what to do here
	return response.sendStatus(401);
}
