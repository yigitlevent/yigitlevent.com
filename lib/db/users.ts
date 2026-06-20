import { sql } from "kysely";

import { DB } from "@/lib/db/index";

import type { UserId, UserAccess, UserDBO } from "@/types/user/user";


const UserSelectFragment = [
  sql<UserId>`u.Id`.as("Id"),
  "u.Username",
  "u.Email",
  "u.Password",
  sql<UserAccess[]>`ARRAY(
    SELECT uat."Name"
    FROM usr."UserAccessTypes" uat
    WHERE uat."Id" = (
      SELECT ua."UserAccessTypeId"
      FROM usr."UserAccess" ua
      WHERE u."Id"::text = ua."UserId"::text
    )
  )`.as("UserAccess")
] as const;

export async function FindUserByEmail(email: string): Promise<UserDBO> {
  return await DB.selectFrom("usr.Users as u")
    .select(UserSelectFragment)
    .where("u.Email", "=", email)
    .executeTakeFirstOrThrow();
}

export async function FindUserByUsername(username: string): Promise<UserDBO> {
  return await DB.selectFrom("usr.Users as u")
    .select(UserSelectFragment)
    .where("u.Username", "=", username)
    .executeTakeFirstOrThrow();
}

export async function FindUserBySessionId(sessionId: string): Promise<UserDBO> {
  return await DB.selectFrom("usr.Users as u")
    .select(UserSelectFragment)
    .where("u.Id", "=", sql<string>`(
      SELECT (us."sess"->'user'->>'id')::uuid
      FROM usr."UserSessions" us
      WHERE us."sid" = ${sessionId} AND us."expire" > now()
      LIMIT 1
    )` as unknown as string)
    .executeTakeFirstOrThrow();
}

export async function UpdateUserLastSignInAt(userId: string): Promise<void> {
  await DB.updateTable("usr.Users")
    .set({ LastSigninAt: new Date() })
    .where("Id", "=", userId)
    .executeTakeFirstOrThrow();
}

export async function CreateUser(username: string, email: string, hashedPassword: string): Promise<UserDBO> {
  await DB.insertInto("usr.Users")
    .values({ Username: username, Email: email, Password: hashedPassword })
    .executeTakeFirstOrThrow();

  return FindUserByEmail(email);
}

