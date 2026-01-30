import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 1. UPDATED QUERY: Safely handles References and different field names
const QUERY = `*[_type == "order"] | order(dueDate asc) {
  _id,
  
  // Handle Client Name (Try 'clientName' text, OR follow 'client' reference to its name)
  "clientName": coalesce(clientName, client->name, "Unknown Client"),

  // Handle Pattern (Try 'pattern' text, OR follow 'pattern' reference to its title/name)
  "pattern": coalesce(pattern, pattern->title, pattern->name, "Custom Pattern"),

  dimensions,
  dueDate,
  status,
  battingLength,
  materialsAvailable,
  lowStock,
  
  // Handle Images (Check both 'image' and 'img' field names)
  "img": coalesce(image.asset->url, img.asset->url)
}`;

async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    // 2. SAFETY MAPPING: Ensure no objects slip through to React
    return data.map((item: any) => ({
      id: item._id,
      // Force these to be strings to prevent Error #31
      clientName: typeof item.clientName === 'object' ? 'Linked Client' : (item.clientName || 'Unknown'),
      pattern: typeof item.pattern === 'object' ? 'Linked Pattern' : (item.pattern || 'Custom'),
      
      dimensions: item.dimensions || 'N/A',
      dueDate: item.dueDate || new Date().toISOString(),
      status: item.status || 'Pending',
      battingLength: item.battingLength || 0,
      materialsAvailable: item.materialsAvailable || false,
      lowStock: item.lowStock || false,
      // Fallback image if Sanity image is missing
      img: item.img || 'https://images.unsplash.com/photo-1598555848889-8d5f30e78f7e?q=80&w=600'
    }));
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