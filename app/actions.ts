"use server";

import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";

// --- CLIENT SETUP ---
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// --- 1. AI PATTERN MATCHER ---
export async function getAIPatternSuggestions(userQuery: string, availablePatterns: any[]) {
  try {
    console.log(`[AI Search] User asked for: "${userQuery}"`);
    
    // Check if Key Exists
    if (!process.env.OPENAI_API_KEY) {
      console.warn("⚠️ [AI Search] No API Key found! Falling back to simple text search.");
      
      const lowerQuery = userQuery.toLowerCase();
      const filtered = availablePatterns.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        (p.category && p.category.toLowerCase().includes(lowerQuery))
      );
      
      return { success: true, matches: filtered.map(p => p._id) };
    }

    console.log("✅ [AI Search] API Key found. Asking OpenAI...");

    // Prepare data for AI (Small payload to save cost/time)
    const patternListLite = availablePatterns.map(p => ({ 
      id: p._id, 
      title: p.title, 
      category: p.category 
    }));
    
    const prompt = `
      You are a helpful quilting assistant.
      User Query: "${userQuery}"
      
      Match this query to the following patterns based on vibe, theme, and title:
      ${JSON.stringify(patternListLite)}
      
      Return ONLY a JSON array of the best 3-5 matching IDs. 
      Example: ["id_1", "id_2"]
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    if (!response.ok) {
        throw new Error("OpenAI API Failed");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const suggestedIds = JSON.parse(content);
    
    return { success: true, matches: suggestedIds };

  } catch (error) {
    console.error("❌ [AI Search] Failed:", error);
    return { success: false, error };
  }
}

// --- 2. CREATE ORDER ---
export async function createOrder(orderData: any) {
  try {
    const doc = {
      _type: 'order',
      status: 'pending',
      orderDate: new Date().toISOString(),
      
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

      dimensions: {
        width: Number(orderData.dimensions.width),
        height: Number(orderData.dimensions.height),
      },

      pattern: orderData.selectedPattern ? {
        _type: 'reference',
        _ref: orderData.selectedPattern._id
      } : undefined,

      designDetails: {
        threadColor: orderData.designDetails.threadColor,
        isDirectional: orderData.designDetails.isDirectional,
      },

      backing: {
        width: Number(orderData.backing.width),
        height: Number(orderData.backing.height),
      },
      
      battingDescription: orderData.selectedBatting?.name,

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

      consent: {
        socialMedia: orderData.consent.socialMedia
      },
      
      estimatedTotal: orderData.estimatedTotal
    };

    await writeClient.create(doc);
    revalidatePath("/admin/queue");
    return { success: true };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: String(error) };
  }
}

// --- 3. INVENTORY ACTIONS ---

// A. Simple Stock Adjustment (+/- buttons)
export async function updateInventoryStock(id: string, newQuantity: number) {
  try {
    await writeClient.patch(id).set({ quantity: newQuantity }).commit();
    revalidatePath("/admin/queue");
    return { success: true };
  } catch (error) {
    console.error("Failed to update stock:", error);
    return { success: false, error };
  }
}

// B. Create New Item (With Weights/Lengths)
export async function createInventoryItem(data: any) {
  try {
    await writeClient.create({
      _type: 'inventory',
      name: data.name,
      category: data.category,
      quantity: Number(data.quantity),
      unit: data.unit || 'units',
      totalLength: Number(data.length),
      totalWeight: Number(data.weight),
      lowStockThreshold: 1
    });
    
    revalidatePath("/admin/queue");
    return { success: true };
  } catch (error) {
    console.error("Failed to create item:", error);
    return { success: false, error };
  }
}

// C. Deduct Material Logic (MRP)
export async function deductMaterialUsage(inventoryId: string, weightUsed: number) {
  try {
    // 1. Get the item to know its ratio
    const item = await writeClient.fetch(`*[_type == "inventory" && _id == $id][0]`, { id: inventoryId });
    
    if (!item || !item.totalWeight) {
      // If we don't have physics data, we can't do math. Just return success (skip).
      console.warn("Skipping deduction: Item has no weight data");
      return { success: true, skipped: true };
    }

    // 2. Calculate usage ratio
    // Fraction Used = Used Weight / Total Spool Weight
    const fractionUsed = weightUsed / item.totalWeight;
    
    // 3. Update Stock
    const newQuantity = Math.max(0, item.quantity - fractionUsed);

    await writeClient.patch(inventoryId).set({ quantity: newQuantity }).commit();
    
    revalidatePath("/admin/queue");
    return { success: true, fractionUsed };
  } catch (error) {
    console.error("Deduction failed:", error);
    return { success: false, error };
  }
}

// --- 4. ORDER STATUS & TIME TRACKING ---
export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    await writeClient.patch(orderId).set({ status: newStatus }).commit();
    revalidatePath("/admin/queue");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function updateOrderTime(orderId: string, seconds: number) {
  try {
    await writeClient.patch(orderId).set({ actualTimeSeconds: seconds }).commit();
    revalidatePath("/admin/queue");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}