import { clerkPlugin } from "@clerk/fastify";
import { connectOrderDB } from "@repo/order-db";
import Fastify from "fastify";
import { userAuthMiddleware } from "./middleware/authMiddleware.js";
import { orderRoute } from "./routes/order.js";

const fastify = Fastify({
    logger: true,
});
fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
        msg: "Order service running",
    });
});

fastify.get("/test", { preHandler: userAuthMiddleware }, (request, reply) => {
    const userId = request.userId;
    return reply.send({ message: "Order service authenticated", userId });
});

fastify.register(orderRoute);

// Run the server!
// fastify.listen({ port: 8001 }, function (err, address) {
//     if (err) {
//         fastify.log.error(err);
//         process.exit(1);
//     }
//     console.log(`Order service is running on ${address}`);
// });

const start = async () => {
    try {
        await connectOrderDB();
        await fastify.listen({ port: 8001 });
        console.log("Order service is running on port 8001");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
start();
