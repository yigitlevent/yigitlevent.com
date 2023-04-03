import { PgPool } from "../index";


export async function FindUserByEmail(email: string) {
	const query = `select * from usr."Users" where "Email" = '${email}';`;

	const data = await PgPool.query<UserDBO>(query);

	if (data.rows.length > 0) return data.rows[0];
}

export async function FindUserByUsername(username: string) {
	const query = `select * from usr."Users" where "Username" = '${username}';`;

	const data = await PgPool.query<UserDBO>(query);

	if (data.rows.length > 0) return data.rows[0];
	else return false;
}

export async function UpdateUserLastSignInAt(userId: string) {
	PgPool.query(`update usr."Users" set "LastSigninAt" = (to_timestamp(${Date.now()} / 1000.0)) where "Id" = '${userId}';`);
}
