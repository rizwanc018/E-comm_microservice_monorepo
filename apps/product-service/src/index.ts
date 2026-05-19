import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { userAuthMiddleware } from "./middleware/authMiddleware";
import categoryRouter from "./routes/category.route";
import productRouter from "./routes/product.route";
import { consumer, producer } from "./utils/kafka";

const app = express();
app.use(
    cors({
        origin: ["http://localhost:3002", "http://localhost:3003"],
        credentials: true,
    }),
);
app.use(express.json());
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

app.use("/products", productRouter);
app.use("/category", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(err.status || 500).json({ message: err.message || "Inter Server Error!" });
});

const start = async () => {
    try {
        Promise.all([await producer.connect(), await consumer.connect()]);
        app.listen(8000, () => {
            console.log("Product service is running on 8000");
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
