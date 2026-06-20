import { Forbidden, Json, Options, WithCors } from "@/lib/api/response";
import { CreateUserSession } from "@/lib/api/session";
import { RegisterUser } from "@/lib/api/user";


function ParseSignupPayload(payload: unknown): { username?: string; email?: string; password?: string; } {
  if (!payload || typeof payload !== "object") return {};

  const input = payload as Record<string, unknown>;

  return {
    username: typeof input.username === "string" ? input.username : undefined,
    email: typeof input.email === "string" ? input.email : undefined,
    password: typeof input.password === "string" ? input.password : undefined
  };
}

export function OPTIONS(): Response {
  return Options();
}

export async function POST(request: Request): Promise<Response> {
  const payload = ParseSignupPayload(await request.json().catch(() => ({})));

  if (!payload.username || !payload.email || !payload.password) {
    return Forbidden();
  }

  const user = await RegisterUser(payload.username, payload.email, payload.password);
  if (!user) return Forbidden();

  const session = await CreateUserSession(user);
  return WithCors(Json({ user }, { status: 200, headers: { "Set-Cookie": session.setCookie } }));
}
