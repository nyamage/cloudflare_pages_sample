function authentication(context) {
  console.log('func:authentication context:%O, context.request:%O, context.request.headers', context, context.request, context.request.headers);
  if (context.request.headers.get("x-email") != "admin@example.com") {
    return new Response("Unauthorized", { status: 403 });
  }
  return context.next();
}

export const onRequest = [authentication];