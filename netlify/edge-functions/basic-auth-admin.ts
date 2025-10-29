export default async function handler(request: Request, context: any) {
  const hdr = request.headers.get("authorization") || "";

  const expectedUser = (globalThis as any).Deno?.env?.get("ADMIN_USER") || context?.env?.ADMIN_USER;
  const expectedPass = (globalThis as any).Deno?.env?.get("ADMIN_PASS") || context?.env?.ADMIN_PASS;

  if (!expectedUser || !expectedPass) {
    return new Response("Admin protection misconfigured", {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
  }

  if (!hdr.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const decoded = atob(hdr.slice(6));
    const [user, pass] = decoded.split(":");
    if (user === expectedUser && pass === expectedPass) {
      return context.next();
    }
  } catch (_e) {
    // fall through to unauthorized
  }

  return unauthorized();
}

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
      "content-type": "text/plain",
    },
  });
}
