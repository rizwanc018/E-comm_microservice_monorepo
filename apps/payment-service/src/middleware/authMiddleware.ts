import { getAuth } from "@hono/clerk-auth";
import type { CustomJwtSessionClaims } from "@repo/types";
import { createMiddleware } from "hono/factory";

export const userAuthMiddleware = createMiddleware<{ Variables: { userId: string } }>(async (c, next) => {
    const auth = getAuth(c);
    const userId = auth?.userId;
    if (!userId) {
        return c.json({ message: "User not authenticated" }, 401);
    }
    c.set("userId", auth.userId);
    await next();
});

export const adminAuthMiddleware = createMiddleware<{ Variables: { userId: string } }>(async (c, next) => {
    const auth = getAuth(c);
    const userId = auth?.userId;
    if (!userId) {
        return c.json({ message: "User not authenticated" }, 401);
    }
    const claims = auth.sessionClaims as CustomJwtSessionClaims;

    if (claims.metadata?.role !== "admin") {
        return c.json({ message: "Unauthorized" }, 401);
    }
    c.set("userId", auth.userId);
    await next();
});
