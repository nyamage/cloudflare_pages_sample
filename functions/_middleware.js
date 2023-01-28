function authentication(context) {
  console.log(`func:authentication context:${context}`);
  console.log(
    `func:authentication context.request:${JSON.stringify(context.request)}`
  );
  console.log(
    `func:authentication context.request.headers:${JSON.stringify(
      context.request.headers
    )}`
  );
  if (context.request.headers.get("x-email") != "admin@example.com") {
    return new Response("Unauthorized", { status: 403 });
  }
  return context.next();
}

export const onRequest = [authentication];
