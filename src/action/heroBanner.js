"use server";

import { dbConnect, collections } from "../lib/dbConnect";

// Fetch the existing Hero Banner details. Returns null if not found.
export async function getHeroBanner() {
  try {
    const collection = await dbConnect(collections.HERO_BANNER);
    const banner = await collection.findOne({ type: "main_banner" });
    if (banner) {
      return { title: banner.title, description: banner.description, imageUrl: banner.imageUrl };
    }
    return null; // Return null to indicate no configured banner found
  } catch (error) {
    console.error("Failed to fetch hero banner data:", error);
    return null;
  }
}

// Update or insert the Hero Banner details
export async function updateHeroBanner(title, description, imageUrl) {
  try {
    const collection = await dbConnect(collections.HERO_BANNER);
    
    // We update the single 'main_banner' document, upserting if it doesn't exist
    const result = await collection.updateOne(
      { type: "main_banner" },
      {
        $set: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    
    return { success: true, message: "Hero banner updated successfully." };
  } catch (error) {
    console.error("Failed to update hero banner data:", error);
    return { success: false, message: "Failed to update hero banner." };
  }
}
