import { DurableObject } from "cloudflare:workers";

export class LikeServer extends DurableObject<Env> {
  async fetch(request: Request): Promise<Response> {
    console.log("handling it…");

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    this.ctx.acceptWebSocket(server);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  async webSocketMessage(ws: WebSocket, message: string): Promise<void> {
    console.log("Received:", message);
    ws.send(
      `[Durable Object] message: ${message}, connections: ${
        this.ctx.getWebSockets().length
      }`
    );
  }

  webSocketClose(ws: WebSocket, code: number): void {
    ws.close(code, "Durable Object is closing WebSocket");
  }
}
