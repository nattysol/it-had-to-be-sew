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
// ... (keep existing updateOrderStatus)

// 👇 NEW: Save the timer data
export async function updateOrderTime(orderId: string, seconds: number) {
  try {
    await writeClient
      .patch(orderId)
      .set({ actualTimeSeconds: seconds })
      .commit();
      
    revalidatePath("/admin/queue");
    return { success: true };
  } catch (error) {
    console.error("Failed to save time:", error);
    return { success: false, error };
  }
}
// ... existing imports

// 👇 NEW: Update Inventory Quantity
export async function updateInventoryStock(id: string, newQuantity: number) {
  try {
    await writeClient
      .patch(id)
      .set({ quantity: newQuantity })
      .commit();
      
    revalidatePath("/admin/queue");
    return { success: true };
  } catch (error) {
    console.error("Failed to update stock:", error);
    return { success: false, error };
  }
}
// ... existing imports ...
// (Make sure you have these imported at the top: createClient, revalidatePath)

// 👇 NEW: Create a new order from the Wizard
export async function createOrder(orderData: any) {
  try {
    console.log("Creating order...", orderData);

    const doc = {
      _type: 'order',
      status: 'pending',
      orderDate: new Date().toISOString(),
      
      // Customer Info
      customer: {
        firstName: orderData.customer.firstName,
        lastName: orderData.customer.lastName,
        email: orderData.customer.email,
        phone: orderData.customer.phone,
        address: orderData.customer.address,
        city: orderData.customer.city,
        state: orderData.customer.state,
        zip: orderData.customer.zip,
      },

      // Dimensions
      dimensions: {
        width: Number(orderData.dimensions.width),
        height: Number(orderData.dimensions.height),
      },

      // Pattern (If selected)
      pattern: orderData.selectedPattern ? {
        _type: 'reference',
        _ref: orderData.selectedPattern._id
      } : undefined,

      // Design Details
      designDetails: {
        threadColor: orderData.designDetails.threadColor,
        isDirectional: orderData.designDetails.isDirectional,
      },

      // Materials
      backing: {
        width: Number(orderData.backing.width),
        height: Number(orderData.backing.height),
      },
      
      // We store the selected batting info as text for now
      battingDescription: orderData.selectedBatting?.name,

      // Finishing
      trimming: {
        wanted: orderData.trimming.wanted,
        method: orderData.trimming.method,
        returnScraps: orderData.trimming.returnScraps
      },
      binding: {
        wanted: orderData.binding.wanted,
        method: orderData.binding.method,
        stripWidth: orderData.binding.stripWidth
      },

      // Consent
      consent: {
        socialMedia: orderData.consent.socialMedia
      },
      
      // Estimated Price (Saved for reference)
      estimatedTotal: orderData.estimatedTotal
    };

    const result = await writeClient.create(doc);
    
    // Refresh the admin dashboard so the new order appears immediately
    revalidatePath("/admin/queue");
    
    return { success: true, id: result._id };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: String(error) };
  }
}