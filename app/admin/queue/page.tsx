import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 DEBUG QUERY: We are fetching the ENTIRE Client document to inspect it
const QUERY = `*[_type == "order"] | order(dueDate asc) {
  _id,
  
  // 1. Fetch the entire referenced document so we can see its fields
  "debugClient": clientName->, 
  
  // 2. Also try to get the raw text if it's not a reference
  "rawClientName": clientName,

  // 3. Pattern
  "pattern": coalesce(pattern->name, pattern->title, pattern, "Custom Pattern"),

  dimensions,
  dueDate,
  status,
  battingLength,
  materialsAvailable,
  lowStock,
  "img": coalesce(image.asset->url, img.asset->url)
}`;

async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    return data.map((item: any) => {
      // 🕵️‍♂️ INSPECTION LOGIC
      let finalName = "Unknown";

      if (item.debugClient) {
        // If we found the linked document, PRINT ITS KEYS so we can see the name field!
        // We filter out system fields (starting with _) to make it readable
        const keys = Object.keys(item.debugClient).filter(k => !k.startsWith('_'));
        finalName = `FIELDS FOUND: ${keys.join(', ')} (Value: ${JSON.stringify(item.debugClient)})`;
      } else if (typeof item.rawClientName === 'string') {
        finalName = item.rawClientName;
      } else {
        finalName = "Link Found but Document Empty/Missing";
      }

      return {
        id: item._id,
        clientName: finalName, // 👈 This will print the secret fields on the screen
        pattern: typeof item.pattern === 'object' ? 'Pattern Object' : item.pattern,
        dimensions: item.dimensions || 'N/A',
        dueDate: item.dueDate || new Date().toISOString(),
        status: item.status || 'Pending',
        battingLength: item.battingLength || 0,
        materialsAvailable: item.materialsAvailable || false,
        lowStock: item.lowStock || false,
        img: item.img || 'https://images.unsplash.com/photo-1598555848889-8d5f30e78f7e?q=80&w=600'
      };
    });
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return [];
  }
}

export default async function QueuePage() {
  const orders = await getOrders();
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Queue...</div>}>
      <AdminDashboard initialOrders={orders} />
    </Suspense>
  );
}