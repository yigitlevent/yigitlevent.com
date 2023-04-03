import { PgPool } from "../index";


export async function FindUserByEmail(email: string) {
	const query = `select * from usr."Users" where "Email" = '${email}';`;

	const data = await PgPool.query(query);

	if (data.rows.length > 0) return data.rows[0];
	else return false;
}

export async function FindUserByUsername(username: string) {
	const query = `select * from usr."Users" where "Username" = '${username}';`;

	const data = await PgPool.query(query);

	if (data.rows.length > 0) return data.rows[0];
	else return false;
}
