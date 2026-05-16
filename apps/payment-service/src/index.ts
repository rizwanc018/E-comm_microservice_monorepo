import { clerkMiddleware } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { userAuthMiddleware } from "./middleware/authMiddleware.js";

const app = new Hono();
app.use("*", clerkMiddleware());

app.get("/health", (c) => {
    return c.json({
        status: "ok",
        uptime: process.uptime(),
        // timestamp: Date.now(),
        timestamp: new Date().toLocaleString(),
        msg: "Payment service running",
    });
});

app.get("/test", userAuthMiddleware, async (c) => {
    const userId = c.get("userId");
    return c.json({ message: "Payment service authenticated", userId });
});

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
