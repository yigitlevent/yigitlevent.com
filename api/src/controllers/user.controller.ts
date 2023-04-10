import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { PgPool } from "../index";
import { FindUserByEmail, UpdateUserLastSignInAt } from "../services/user.service";


export async function UserAuth(request: Request, response: Response) {
	return response.json({ user: request.session.user });
}

export async function UserSignUp(request: Request, response: Response) {
	const { username, email, password } = request.body;

	try {
		const hashedPassword = bcrypt.hashSync(password, 10);

		const data = await PgPool.query<UserDBO>(`insert into usr."Users"("Username", "Email", "Password") values ('${username}', '${email}', '${hashedPassword}') returning *;`);
		if (data.rows.length === 0) throw new Error("unable to sign user up");

		const user = data.rows[0];

		request.session.user = { id: user.Id, username: user.Username, email: user.Email };
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

	try {
		const user = await FindUserByEmail(email);

		if (user) {
			const matches = bcrypt.compareSync(password, user.Password);
			if (!matches) throw new Error("invalid password");

			UpdateUserLastSignInAt(user.Id);

			request.session.user = { id: user.Id, username: user.Username, email: user.Email };
			response.status(200);
			return response.json({ user: request.session.user });
		}

		throw new Error("username not found");
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