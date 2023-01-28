function authentication(context) {
  console.log("func:authentication context:%O", context);
  console.log("func:authentication context.request:%O", context.request);
  console.log(
    "func:authentication context.request.headers:%O",
    context.request.headers
  );
  if (context.request.headers.get("x-email") != "admin@example.com") {
    return new Response("Unauthorized", { status: 403 });
  }
  return context.next();
}

export const onRequest = [authentication];
