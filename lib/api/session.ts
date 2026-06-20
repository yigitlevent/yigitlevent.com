import { ApiConfig, IsDev } from "@/lib/api/config";
import { FindUser } from "@/lib/api/user";
import { GetSession, CreateSession, DeleteSession } from "@/lib/db/sessions";

import type { User } from "@/types/user/user";


function ParseCookie(cookieHeader: string | null, cookieName: string): string | undefined {
  if (!cookieHeader) return undefined;

  const cookies = cookieHeader.split(";").map(cookie => cookie.trim());
  const match = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
  if (!match) return undefined;

  return decodeURIComponent(match.slice(cookieName.length + 1));
}

export function GetSessionIdFromRequest(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  return ParseCookie(cookieHeader, ApiConfig.session.cookieName);
}

export async function GetSessionUser(request: Request): Promise<User | undefined> {
  const sid = GetSessionIdFromRequest(request);
  if (!sid) return undefined;

  const row = await GetSession(sid);
  if (row?.sid) return await FindUser({ sessionId: row.sid });
}

export async function CreateUserSession(user: User): Promise<{ sid: string; setCookie: string; }> {
  const sid = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + ApiConfig.session.maxAgeMs);

  await CreateSession(sid, { user }, expiresAt);

  const maxAge = String(Math.floor(ApiConfig.session.maxAgeMs / 1000));

  return { sid, setCookie: `${ApiConfig.session.cookieName}=${encodeURIComponent(sid)}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Strict${IsDev ? "" : "; Secure"}` };
}

export async function DestroySession(request: Request): Promise<string> {
  const sid = GetSessionIdFromRequest(request);
  if (sid) await DeleteSession(sid);
  return `${ApiConfig.session.cookieName}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${IsDev ? "" : "; Secure"}`;
}
