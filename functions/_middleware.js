function authentication(context) {
  if (context.request.headers.get("x-email") != "admin@example.com") {
    return new Response("Unauthorized", { status: 403 });
  }
  console.log(context)
  return context.next();
}

export const onRequest = [authentication];