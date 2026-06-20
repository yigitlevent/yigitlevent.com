export function Json(data: unknown, init?: ResponseInit): Response {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return new Response(JSON.stringify(data), {
    ...init,
    headers
  });
}

export function Empty(status = 204, init?: ResponseInit): Response {
  return new Response(null, {
    ...init,
    status
  });
}

export function WithCors(response: Response): Response {
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, HEAD");
  return response;
}

export function Options(): Response {
  return WithCors(Empty(204));
}

export function Forbidden(): Response {
  return WithCors(Empty(403));
}

export function Unauthorized(): Response {
  return WithCors(Empty(401));
}
