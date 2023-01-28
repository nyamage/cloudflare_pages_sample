function authentication(context) {
  console.log(`func:authentication context:${JSON.stringify(context)}`);
  console.log(`func:authentication context.cf:${JSON.stringify(context.cf)}`);
  for (const pair in context.headers) {
    console.log(`func:authentication ${pair[0]}:${pair[1]}`);
  }

  if (context.request.headers.get("x-email") != "admin@example.com") {
    return new Response("Unauthorized", { status: 403 });
  }
  return context.next();
}

export const onRequest = [authentication];
