export function GET(): Response {
  return Response.json({ message: "Hello World" });
}

export function OPTIONS(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET,OPTIONS"
    }
  });
}
