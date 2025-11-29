import { PgPool } from "../index";


export async function FindUserBySessionId(sessionId: string): Promise<UserDBO | undefined> {
	const query = `
		select 
			u."Id",
			u."Username",
			u."Email",
			u."Password",
			array( 
				select uat."Name"
				from usr."UserAccessTypes" uat
				where uat."Id" = (
					select ua."UserAccessTypeId"
					from usr."UserAccess" ua
					where u."Id"::text = ua."UserId"::text
				)
			) as "UserAccess"
		from usr."Users" u
		where u."Id" = (
			select (us."sess"->'user'->>'id')::uuid as UserId
			from usr."UserSessions" us
			where us."sid" = '${sessionId}'
			and us."expire" > now()
			limit 1
		);
	`;

	const data = await PgPool.query<UserDBO>(query);

	console.log(data.rows);

	if (data.rows.length > 0) return data.rows[0];
}

export async function FindUserByEmail(email: string): Promise<UserDBO | undefined> {
	const query = `
		select 
			u."Id",
			u."Username",
			u."Email",
			u."Password",
			array( 
				select uat."Name"
				from usr."UserAccessTypes" uat
				where uat."Id" = (
					select ua."UserAccessTypeId"
					from usr."UserAccess" ua
					where u."Id"::text = ua."UserId"::text
				)
			) as "UserAccess"
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
			array( 
				select uat."Name"
				from usr."UserAccessTypes" uat
				where uat."Id" = (
					select ua."UserAccessTypeId"
					from usr."UserAccess" ua
					where u."Id"::text = ua."UserId"::text
				)
			) as "UserAccess"
		from usr."Users" u
		where u."Username" = '${username}';
	`;

	const data = await PgPool.query<UserDBO>(query);

	if (data.rows.length > 0) return data.rows[0];
	else return false;
}

export async function UpdateUserLastSignInAt(userId: string): Promise<void> {
	await PgPool.query(`update usr."Users" set "LastSigninAt" = (to_timestamp(${Date.now().toString()} / 1000.0)) where "Id" = '${userId}';`);
}
