import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/do/ws", "routes/do.tsx"),
] satisfies RouteConfig;
