import type { Route } from "./+types/do";

export async function action(args: Route.LoaderArgs) {
  return await loader(args);
}

export async function loader({ context, request }: Route.LoaderArgs) {
  if (request.headers.get("Upgrade") !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 });
  }

  const id = context.cloudflare.env.LIKE_SERVER.idFromName("my-like-server");
  const stub = context.cloudflare.env.LIKE_SERVER.get(id);
  return stub.fetch(request);
}

export default function NothingHere() {
  return <div>Nothing here</div>;
}
