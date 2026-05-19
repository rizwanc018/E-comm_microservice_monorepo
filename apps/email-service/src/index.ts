import { consumer } from "./utils/kafak";
import sendMail from "./utils/mailer";

const start = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe([
            {
                topicName: "user.created",
                topicHandler: async (message) => {
                    const { email, username } = message.value;

                    if (email) {
                        await sendMail(
                            email,
                            "Welcome to E-commerce App",
                            `Welcome ${username}. You account has been created!`,
                        );
                    }
                },
            },
            {
                topicName: "order.created",
                topicHandler: async (message) => {
                    const { email, amount, status } = message.value;

                    if (email) {
                        await sendMail(
                            email,
                            "Order has been created",
                            `Hello! Your order: Amount: ${amount / 100}, Status: ${status}`,
                        );
                    }
                },
            },
        ]);
    } catch (error) {
        console.log(error);
    }
};

start();
