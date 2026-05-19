import { consumer } from "./kafka";
import { createStripeProduct, deleteStripeProduct } from "./stripeProduct";

export const runKafkaSubscriptions = async () => {
    consumer.subscribe([
        {
            topicName: "product.created",
            topicHandler: async (message) => {
                const product = message.value;
                console.log(">> RECEIVED_MESSAGE : product.created", product);

                await createStripeProduct(product);
            },
        },
        {
            topicName: "product.deleted",
            topicHandler: async (message) => {
                const productId = message.value;
                console.log(">> RECEIVED_MESSAGE : product.deleted", productId);

                await deleteStripeProduct(productId);
            },
        },
    ]);
};
