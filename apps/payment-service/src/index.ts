import { clerkMiddleware } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { userAuthMiddleware } from "./middleware/authMiddleware";
import sessionRoute from "./routes/session.route";
import webhookRoute from "./routes/webhooks.route";

const app = new Hono();
app.use("*", clerkMiddleware());
app.use("*", cors({ origin: ["http://localhost:3002"] }));

app.get("/health", (c) => {
    return c.json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toLocaleString(),
        msg: "Payment service running",
    });
});

app.get("/test", userAuthMiddleware, async (c) => {
    const userId = c.get("userId");
    return c.json({ message: "Payment service authenticated", userId });
});

app.route("/sessions", sessionRoute);
app.route("/webhooks", webhookRoute);

const start = async () => {
    try {
        serve(
            {
                fetch: app.fetch,
                port: 8002,
            },
            (info) => {
                console.log(`Server is running on http://localhost:${info.port}`);
            },
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
