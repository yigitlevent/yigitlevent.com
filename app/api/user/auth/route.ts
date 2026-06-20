import { Options, Unauthorized, WithCors, Json } from "@/lib/api/response";
import { GetSessionIdFromRequest, GetSessionUser } from "@/lib/api/session";
import { FindUser } from "@/lib/api/user";


export function OPTIONS(): Response {
  return Options();
}

export async function POST(request: Request): Promise<Response> {
  const sessionUser = await GetSessionUser(request);
  if (!sessionUser) return Unauthorized();

  const sid = GetSessionIdFromRequest(request);
  if (!sid) return Unauthorized();

  const user = await FindUser({ sessionId: sid });
  if (!user) return Unauthorized();

  return WithCors(Json({ user: sessionUser }, { status: 200 }));
}
