import { Kafka } from "kafkajs";

export const createKafkaClient = (servce: string) => {
    return new Kafka({
        clientId: servce,
        brokers: ["localhost:9094", "localhost:9095", "localhost:9096"],
    });
};
