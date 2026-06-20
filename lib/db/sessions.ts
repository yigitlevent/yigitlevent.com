import { DB } from "@/lib/db/index";

import type { UsrUserSessions } from "@/types/db";


interface SessionRow {
  sid: string;
  sess: unknown;
}

export async function GetSession(sid: string): Promise<SessionRow | undefined> {
  const row = await DB
    .selectFrom("usr.UserSessions as us")
    .select(["us.sid", "us.sess"])
    .where("us.sid", "=", sid)
    .where("us.expire", ">", new Date())
    .limit(1)
    .executeTakeFirst();

  if (!row) return undefined;
  return { sid: row.sid, sess: row.sess };
}

export async function CreateSession(sid: string, sess: object, expiresAt: Date): Promise<void> {
  await DB
    .insertInto("usr.UserSessions")
    .values({
      sid,
      sess: sess as unknown as UsrUserSessions["sess"],
      expire: expiresAt
    })
    .onConflict(oc =>
      oc.column("sid").doUpdateSet({
        sess: sess as unknown as UsrUserSessions["sess"],
        expire: expiresAt
      })
    )
    .execute();
}

export async function DeleteSession(sid: string): Promise<void> {
  await DB
    .deleteFrom("usr.UserSessions")
    .where("sid", "=", sid)
    .execute();
}
