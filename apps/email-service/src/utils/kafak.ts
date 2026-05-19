import { createConsumer, createKafkaClient, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("email-service");

export const producer = createProducer(kafkaClient);
export const consumer = createConsumer(kafkaClient, "email-group");
