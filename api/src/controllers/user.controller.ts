import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { PgPool } from "../index";



export async function UserAuth(request: Request, response: Response) {
	return response.json({ user: request.session.user });
}

export async function UserSignUp(request: Request, response: Response) {
	const { username, email, password } = request.body;

	if (username == null || email == null || password == null) return response.sendStatus(403);

	try {
		const hashedPassword = bcrypt.hashSync(request.body.password, 10);

		const query = `insert into usr."Users"("Username", "Email", "Password") values ('${username}', '${email}', '${hashedPassword}') returning *;`;

		const data = await PgPool.query(query);

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
		const query = `select "Id", "Username", "Email", "Password" from usr."Users" where "Email" = '${email}';`;

		const data = await PgPool.query<UserDBO>(query);

		if (data.rows.length === 0) { return response.sendStatus(403); }
		const user = data.rows[0];

		const matches = bcrypt.compareSync(password, user.Password);
		if (!matches) { return response.sendStatus(403); }

		request.session.user = { id: user.Id, username: user.Username, email: user.Email };

		const updateQuery =
			`UPDATE usr."Users" 
				SET "LastSigninAt" = (to_timestamp(${Date.now()} / 1000.0))
				WHERE "Id" = '${user.Id}';`;

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
