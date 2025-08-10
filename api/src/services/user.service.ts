import { PgPool } from "../index";


export async function FindUserByEmail(email: string): Promise<UserDBO | undefined> {
	const query = `
		select 
			u."Id",
			u."Username",
			u."Email",
			u."Password",
			ARRAY( 
				SELECT ua."UserAccessTypeId"
				FROM usr."UserAccess" ua
				WHERE u."Id"::text = ua."UserId"::text
			) AS "UserAccessIds"
		from usr."Users" u
		where u."Email" = '${email}';
	`;

	const data = await PgPool.query<UserDBO>(query);

	if (data.rows.length > 0) return data.rows[0];
}

export async function FindUserByUsername(username: string): Promise<UserDBO | boolean> {
	const query = `
		select 
			u."Id",
			u."Username",
			u."Email",
			u."Password",
			ARRAY( 
				SELECT ua."UserAccessTypeId"
				FROM usr."UserAccess" ua
				WHERE u."Id"::text = ua."UserId"::text
			) AS "UserAccessIds"
		from usr."Users" u
		where u."Username" = '${username}';
	`;

	const data = await PgPool.query<UserDBO>(query);

	if (data.rows.length > 0) return data.rows[0];
	else return false;
}

export async function UpdateUserLastSignInAt(userId: string): Promise<void> {
	PgPool.query(`update usr."Users" set "LastSigninAt" = (to_timestamp(${Date.now()} / 1000.0)) where "Id" = '${userId}';`);
}

export function MapUserAccess(userAccess: number[]): UserAccessType[] {
	const access: UserAccessType[] = [];

	userAccess.forEach((id) => {
		switch (id) {
			case 0:
				access.push("BurningWheel");
				break;
			case 1:
				access.push("Admin");
				break;
		}
	});

	return access;
}
