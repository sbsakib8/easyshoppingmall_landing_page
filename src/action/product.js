"use server"

import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
    try {
        const productCollection = await dbConnect(collections.PRODUCT);
        const products = await productCollection.find().toArray();
        return products.map(product => ({
            ...product,
            _id: product._id.toString()
        }));
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (productData) => {
    try {
        const products = await getProducts()
        if (products.length >= 8) {
            return { success: false, message: "You can only add 8 featured products." };
        }
        const productCollection = await dbConnect(collections.PRODUCT);
        const result = await productCollection.insertOne(productData);
        return { success: true, message: "Product added successfully.", id: result.insertedId.toString() };
    } catch (error) {
        console.error("Failed to add product:", error);
        return { success: false, message: "Failed to add product." };
    }
}

export const deleteProduct = async (id) => {
    try {
        const productCollection = await dbConnect(collections.PRODUCT);
        const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            return { success: true, message: "Product deleted successfully." };
        }
        return { success: false, message: "Product not found." };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, message: "Failed to delete product." };
    }
}

export const updateProduct = async (id, productData) => {
    try {
        const productCollection = await dbConnect(collections.PRODUCT);
        const result = await productCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: productData }
        );
        if (result.matchedCount === 1) {
            return { success: true, message: "Product updated successfully." };
        }
        return { success: false, message: "Product not found." };
    } catch (error) {
        console.error("Failed to update product:", error);
        return { success: false, message: "Failed to update product." };
    }
}