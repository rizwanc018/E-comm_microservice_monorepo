import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express, { Request, Response } from "express";
import { userAuthMiddleware } from "./middleware/authMiddleware.js";

const app = express();
app.use(
    cors({
        origin: ["http://localhost:3002", "http://localhost:3003"],
        credentials: true,
    }),
);
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
        msg: "Product service running",
    });
});

app.get("/test", userAuthMiddleware, (req: Request, res: Response) => {
    const userId = req.userId;
    res.json({ message: "Product service authenticated", userId });
});

app.listen(8000, () => {
    console.log("Product service running on port 8000");
});
