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
  const arrayOfAuthorization = authorization.split(" ");
  const type = arrayOfAuthorization[0];
  const credential = atob(arrayOfAuthorization[1]);
  if (type == "Basic" && credential == "test") {
    return context.next();
  }

  return new Response("Unauthorized", {
    status: 403,
    headers: new Headers({
      "WWW-Authenticate": "Basic",
    }),
  });
}

export const onRequest = [authentication];
