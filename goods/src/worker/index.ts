import { Hono } from "hono";
import { createHub } from "kolenkainc-honohub";
import { cors } from "hono/cors";
import hubConfig from "./hub.config";

const app = new Hono<{ Bindings: Env }>();

app.get("/healthcheck", (c) => c.text("ok"));
app.use(cors()).route("/", createHub(hubConfig));

export default app;
