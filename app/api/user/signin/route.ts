import { Forbidden, Json, Options, WithCors } from "@/lib/api/response";
import { CreateUserSession } from "@/lib/api/session";
import { LoginUser } from "@/lib/api/user";


function ParseSigninPayload(payload: unknown): { email?: string; password?: string; } {
  if (!payload || typeof payload !== "object") return {};

  const input = payload as Record<string, unknown>;

  return {
    email: typeof input.email === "string" ? input.email : undefined,
    password: typeof input.password === "string" ? input.password : undefined
  };
}

export function OPTIONS(): Response {
  return Options();
}

export async function POST(request: Request): Promise<Response> {
  const payload = ParseSigninPayload(await request.json().catch(() => ({})));

  if (!payload.email || !payload.password) {
    return Forbidden();
  }

  const user = await LoginUser(payload.email, payload.password);
  if (!user) return Forbidden();

  const session = await CreateUserSession(user);
  return WithCors(Json({ user }, { status: 200, headers: { "Set-Cookie": session.setCookie } }));
}
