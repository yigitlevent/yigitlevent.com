import { Empty, Options, WithCors } from "@/lib/api/response";
import { DestroySession } from "@/lib/api/session";


export function OPTIONS(): Response {
  return Options();
}

export async function POST(request: Request): Promise<Response> {
  const clearCookie = await DestroySession(request);
  return WithCors(Empty(200, { headers: { "Set-Cookie": clearCookie } }));
}
