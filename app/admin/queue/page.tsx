import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 QUERY: Fetch EVERYTHING (...) so we can inspect field names
const QUERY = `*[_type == "order"] | order(dueDate asc) {
  ...,
  "img": coalesce(image.asset->url, img.asset->url)
}`;

async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    return data.map((item: any) => {
      // 🕵️‍♂️ X-RAY VISION: Get a list of all field names in this document
      // We filter out system fields (starting with _) to see the content fields
      const fieldNames = Object.keys(item).filter(key => !key.startsWith('_') && key !== 'img');
      
      return {
        id: item._id,
        // 👇 THIS WILL PRINT THE FIELD NAMES ON YOUR SCREEN
        clientName: `FIELDS: ${fieldNames.join(', ')}`,
        
        pattern: item.pattern || 'Pattern Unknown',
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