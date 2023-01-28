function createUnauthorizedResponse() {
  return new Response("Unauthorized", {
    status: 401,
    headers: new Headers({
      "WWW-Authenticate": "Basic",
    }),
  });
}
function authentication(context) {
  console.log(`func:authentication context:${JSON.stringify(context)}`);
  console.log(
    `func:authentication context.request.cf:${JSON.stringify(
      context.request.cf
    )}`
  );
  for (const pair in context.request.headers) {
    console.log(`func:authentication ${pair[0]}:${pair[1]}`);
  }

  const authorization = context.request.headers.get("authorization");
  if (authorization == null) {
    return new Response("Unauthorized", {
      status: 401,
      headers: new Headers({
        "WWW-Authenticate": "Basic",
      }),
    });
  }
  const arrayOfAuthorization = authorization.split(" ");
  const type = arrayOfAuthorization[0];
  const credentials = atob(arrayOfAuthorization[1]);
  if (type == "Basic" && credentials == "user:test") {
    return context.next();
  }

  return new Response("Forbidden", {
    status: 403,
  });
}

export const onRequest = [authentication];
