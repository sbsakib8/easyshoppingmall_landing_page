"use server"

import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const addReview = async (reviewData) => {
    try {
        const reviewCollection = await dbConnect(collections.REVIEW);
        const result = await reviewCollection.insertOne({
            ...reviewData,
            createdAt: new Date().toISOString()
        });
        return { success: true, message: "Review added successfully.", id: result.insertedId.toString() };
    } catch (error) {
        console.error("Failed to add review:", error);
        return { success: false, message: "Failed to add review." };
    }
}

export const getReviews = async () => {
    try {
        const reviewCollection = await dbConnect(collections.REVIEW);
        const reviews = await reviewCollection.find().sort({ createdAt: -1 }).toArray();
        return reviews.map(review => ({
            ...review,
            _id: review._id.toString()
        }));
    } catch (error) {
        console.log("Failed to get reviews:", error);
        return [];
    }
}

export const updateReview = async (id, data) => {
    try {
        const reviewCollection = await dbConnect(collections.REVIEW);
        const result = await reviewCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        if (result.matchedCount === 1) {
            return { success: true, message: "Review updated successfully." };
        }
        return { success: false, message: "Review not found." };
    } catch (error) {
        console.error("Failed to update review:", error);
        return { success: false, message: "Failed to update review." };
    }
}

export const deleteReview = async (id) => {
    try {
        const reviewCollection = await dbConnect(collections.REVIEW);
        const result = await reviewCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            return { success: true, message: "Review deleted successfully." };
        }
        return { success: false, message: "Review not found." };
    } catch (error) {
        console.error("Failed to delete review:", error);
        return { success: false, message: "Failed to delete review." };
    }
}
