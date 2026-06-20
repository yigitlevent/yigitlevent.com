import { GetRulesetsList, GetRulesetsData } from "@/lib/api/bwgr";
import { Forbidden, Json, Options, WithCors } from "@/lib/api/response";


export function OPTIONS(): Response {
  return Options();
}

export async function GET(): Promise<Response> {
  try {
    const data = await GetRulesetsList();
    return WithCors(Json(data, { status: 200 }));
  }
  catch (error) {
    console.error(error);
    return Forbidden();
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const payload = await request.json().catch(() => ({})) as Record<string, unknown>;
    const data = await GetRulesetsData(payload);
    return WithCors(Json(data, { status: 200 }));
  }
  catch (error) {
    console.error(error);
    return Forbidden();
  }
}
