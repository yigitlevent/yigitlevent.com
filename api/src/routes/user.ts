import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { PgPool } from "../index.js";


declare module "express-session" {
	interface SessionData {
		user: User;
	}
}

export function AuthUser(request: Request) {
	return request.sessionID && request.session.user;
}

export async function UserFetch(request: Request, response: Response) {
	if (AuthUser(request)) {
		response.status(200);
		return response.json({ user: request.session.user });
	}
	return response.sendStatus(403);
}

export async function UserFetchAll(request: Request, response: Response) {
	const query =
		`select * 
		from dbo."Users";`;

	const data = await PgPool.query(query);

	response.status(200);
	return response.json({ bloop: data });
}

export async function UserSignUp(request: Request, response: Response) {
	const { username, email, password } = request.body;

	if (username == null || email == null || password == null) {
		return response.sendStatus(403);
	}

	try {
		const hashedPassword = bcrypt.hashSync(request.body.password, 10);

		const query =
			`INSERT INTO Users (username, email, password) 
			VALUES ($1, $2, $3) 
			RETURNING *;`;

		const data = await PgPool.query(query, [username, email, hashedPassword]);

		if (data.rows.length === 0) { response.sendStatus(403); }

		const user = data.rows[0];

		request.session.user = { id: user.id, username: user.username, email: user.email };

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
			`SELECT id, username, email, password 
			FROM users 
			WHERE email = $1;`;

		const data = await PgPool.query(query, [email]);

		if (data.rows.length === 0) { return response.sendStatus(403); }
		const user = data.rows[0];

		const matches = bcrypt.compareSync(password, user.password);
		if (!matches) { return response.sendStatus(403); }

		request.session.user = { id: user.id, username: user.username, email: user.email };

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
		request.session.destroy(() => console.log("session destroyed"));
		return response.sendStatus(200);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(500);
	}
}
