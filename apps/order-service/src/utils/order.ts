import { Order } from "@repo/order-db";
import { OrderType } from "@repo/types";
import { producer } from "./kafka";

export const createOrder = async (order: OrderType) => {
    const newOrder = new Order(order);
    console.log("SENDING ORDER EMAIL");

    try {
        const order = await newOrder.save();
        producer.send("order.created", {
            value: {
                email: order.email,
                amount: order.amount,
                status: order.status,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
