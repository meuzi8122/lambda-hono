import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

export const app = new Hono();

app.get("/", context => {
    return context.json({ message: "ok" }, 200);
});

export const handler = handle(app);