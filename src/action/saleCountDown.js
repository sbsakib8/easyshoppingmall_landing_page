"use server";

import { dbConnect, collections } from "../lib/dbConnect";

// Fetch existing Sale Countdown details
export async function getSaleCountDown() {
  try {
    const collection = await dbConnect(collections.SALE_COUNTDOWN);
    const data = await collection.findOne({ type: "sale_countdown" });
    if (data) {
      return { 
        title: data.title, 
        description: data.description, 
        targetDate: data.targetDate 
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch sale countdown data:", error);
    return null;
  }
}

// Update or insert Sale Countdown details
export async function updateSaleCountDown(title, description, targetDate) {
  try {
    const collection = await dbConnect(collections.SALE_COUNTDOWN);
    
    await collection.updateOne(
      { type: "sale_countdown" },
      {
        $set: {
          title: title,
          description: description,
          targetDate: targetDate,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    
    return { success: true, message: "Sale countdown updated successfully." };
  } catch (error) {
    console.error("Failed to update sale countdown data:", error);
    return { success: false, message: "Failed to update sale countdown." };
  }
}
