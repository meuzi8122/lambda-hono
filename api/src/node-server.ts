import { serve } from "@hono/node-server";
import { app } from ".";

serve({
    fetch: app.fetch,
    port: 8000
});

console.log("start server http://localhost:8000")