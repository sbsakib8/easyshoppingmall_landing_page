"use server"

import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const placeOrder = async (orderData) => {
    try {
        const orderCollection = await dbConnect(collections.ORDER);
        const result = await orderCollection.insertOne({
            ...orderData,
            status: "Pending",
            date: new Date().toISOString()
        });
        return { success: true, message: "Order placed successfully.", id: result.insertedId.toString() };
    } catch (error) {
        console.error("Failed to place order:", error);
        return { success: false, message: "Failed to place order." };
    }
}

export const getOrders = async () => {
    try {
        const orderCollection = await dbConnect(collections.ORDER);
        const orders = await orderCollection.find().sort({ date: -1 }).toArray();
        return orders.map(order => ({
            ...order,
            _id: order._id.toString()
        }));
    } catch (error) {
        console.log("Failed to get orders:", error);
        return [];
    }
}

export const updateOrderStatus = async (id, status) => {
    try {
        const orderCollection = await dbConnect(collections.ORDER);
        const result = await orderCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );
        if (result.matchedCount === 1) {
            return { success: true, message: "Order status updated successfully." };
        }
        return { success: false, message: "Order not found." };
    } catch (error) {
        console.error("Failed to update order status:", error);
        return { success: false, message: "Failed to update order status." };
    }
}

export const deleteOrder = async (id) => {
    try {
        const orderCollection = await dbConnect(collections.ORDER);
        const result = await orderCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            return { success: true, message: "Order deleted successfully." };
        }
        return { success: false, message: "Order not found." };
    } catch (error) {
        console.error("Failed to delete order:", error);
        return { success: false, message: "Failed to delete order." };
    }
}
