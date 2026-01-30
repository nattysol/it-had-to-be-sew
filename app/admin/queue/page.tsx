import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 Fetch EVERYTHING to inspect structure
const QUERY = `*[_type == "order"] | order(dueDate asc) {
  ...,
  "img": coalesce(image.asset->url, img.asset->url)
}`;

async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    return data.map((item: any) => {
      // 1. Get all field names for debugging
      const keys = Object.keys(item).filter(k => !k.startsWith('_') && k !== 'img');

      return {
        id: item._id,
        
        // 🛡️ SAFETY FORCE-FIELD: We wrap everything in String() or JSON.stringify()
        // This guarantees React only ever sees text.
        
        clientName: `FIELDS: ${keys.join(', ')}`,
        
        // If pattern is an object, turn it into text so it doesn't crash
        pattern: typeof item.pattern === 'object' 
          ? `(Ref: ${JSON.stringify(item.pattern)})` 
          : String(item.pattern || 'No Pattern'),
          
        dimensions: String(item.dimensions || 'N/A'),
        dueDate: String(item.dueDate || new Date().toISOString()),
        status: String(item.status || 'Pending'),
        
        battingLength: Number(item.battingLength || 0),
        materialsAvailable: Boolean(item.materialsAvailable),
        lowStock: Boolean(item.lowStock),
        
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