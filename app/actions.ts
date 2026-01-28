"use server";

import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";

// 1. Create a Secure Client with Write Access
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // 👈 This requires the API Token in your .env file
  apiVersion: "2024-01-01",
  useCdn: false,
});

// 2. The Function to Complete the Order
export async function completeOrder(orderId: string, stats: { 
  finalTimeSeconds: number, 
  actualFabricUsed: string, 
  battingScrap: string,
  efficiencySpeed: number
}) {
  try {
    // Send update to Sanity
    await writeClient
      .patch(orderId)
      .set({
        status: "completed",
        // Save the actual stats
        actualTimeSeconds: stats.finalTimeSeconds,
        actualFabricUsed: stats.actualFabricUsed,
        efficiencyMetrics: {
          speed: stats.efficiencySpeed,
          scrap: stats.battingScrap
        },
        completedAt: new Date().toISOString()
      })
      .commit();

    // Refresh the dashboard so the order moves to "History" instantly
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    console.error("Sanity Update Failed:", error);
    return { success: false, error };
  }
}