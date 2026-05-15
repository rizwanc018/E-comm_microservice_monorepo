import Fastify from "fastify";

const fastify = Fastify({
    logger: true,
});

fastify.get("/health", (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
        msg: "Order service running",
    });
});

// Run the server!
fastify.listen({ port: 8001 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Order service is running on ${address}`);
});

const start = async () => {
    try {
        await fastify.listen({ port: 8001 });
        console.log("Order service is running on port 8001");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
start();
