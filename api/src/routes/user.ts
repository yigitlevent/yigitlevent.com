import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { PgPool } from "../index.js";


async function CleanSessions() {
	const query =
		`delete from usr."UserSessions"
		where ("expire"::date + '7 day'::interval) < now();`;
	PgPool.query(query);
}

export function CheckAuth(request: Request, response: Response, next: NextFunction) {
	if (request.sessionID && request.session.user) {
		return next();
	}
	return response.sendStatus(401);
}

export async function UserAuth(request: Request, response: Response) {
	CleanSessions();

	console.log(request.session.user);
	return response.json({ user: request.session.user });
}

export async function UserSignUp(request: Request, response: Response) {
	const { username, email, password } = request.body;

	if (username == null || email == null || password == null) { return response.sendStatus(403); }

	try {
		const hashedPassword = bcrypt.hashSync(request.body.password, 10);

		const query =
			`insert into usr."Users"("Username", "Email", "Password") 
			values ($1, $2, $3) 
			RETURNING *;`;

		const data = await PgPool.query(query, [username, email, hashedPassword]);

		if (data.rows.length === 0) { response.sendStatus(403); }

		const user = data.rows[0];

		request.session.user = { id: user.Id, username: user.username, email: user.email };

		response.status(200);
		return response.json({ user: request.session.user });
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function UserSignIn(request: Request, response: Response) {
	const { email, password } = request.body;

	if (email == null || password == null) { return response.sendStatus(403); }

	try {
		const query =
			`select "Id", "Username", "Email", "Password"
			from usr."Users" 
			where "Email" = '${email}';`;

		const data = await PgPool.query(query);

		if (data.rows.length === 0) { return response.sendStatus(403); }
		const user: User = data.rows[0];

		const matches = bcrypt.compareSync(password, data.rows[0].Password);
		if (!matches) { return response.sendStatus(403); }

		request.session.user = { id: user.id, username: user.username, email: user.email };

		const updateQuery =
			`UPDATE usr."Users" 
				SET "LastSigninAt" = (to_timestamp(${Date.now()} / 1000.0))
				WHERE "Id" = '${user.id}';`;

		PgPool.query(updateQuery);

		response.status(200);
		return response.json({ user: request.session.user });
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function UserSignOut(request: Request, response: Response) {
	try {
		request.session.destroy(() => { /* console.log("session destroyed") */ });
		response.clearCookie("connect.sid");
		return response.sendStatus(200);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(500);
	}
}
