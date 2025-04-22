import type { Route } from "./+types/home";
import useWebSocket from "react-use-websocket";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context, request }: Route.LoaderArgs) {
  const wsUrl = new URL(request.url);
  wsUrl.protocol = wsUrl.protocol === "https:" ? "wss:" : "ws:";
  wsUrl.pathname = "/do/ws";

  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
    wsUrl: wsUrl.toString(),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { sendMessage, lastMessage } = useWebSocket(loaderData.wsUrl, {});
  return (
    <div>
      <h1>{loaderData.message}</h1>
      <button type="button" onClick={() => sendMessage("Hello")}>
        Send
      </button>
      <p>Last: {lastMessage?.data}</p>
    </div>
  );
}
