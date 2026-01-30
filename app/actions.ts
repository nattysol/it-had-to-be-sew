"use server";

import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";

// 1. Create a specific client just for WRITING (uses the secret token)
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // 👈 The key you just added
  apiVersion: "2024-01-01",
  useCdn: false,
});

// 2. The Function called when you click "Start Quilting"
export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    console.log(`Updating Order ${orderId} to ${newStatus}...`);

    // Sanity specific command: PATCH the document
    await writeClient
      .patch(orderId)
      .set({ status: newStatus }) // Update the status field
      .commit(); // Save it to the database

    console.log("Success!");

    // 3. Tell Next.js to refresh the dashboard so you see the change instantly
    revalidatePath("/admin/queue");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update order:", error);
    return { success: false, error };
  }
}