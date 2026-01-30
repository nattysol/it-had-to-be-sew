import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
// Import the client we just made
import { client, urlFor } from '../../lib/sanity';

export const dynamic = 'force-dynamic'; // Disable caching so you always see new orders

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 1. Define what we want from Sanity
// 👇 CHANGE "order" to "project" if that is what you named your schema!
const QUERY = `*[_type == "order"] | order(dueDate asc) {
  _id,
  clientName,
  pattern,
  dimensions,
  dueDate,
  status,
  battingLength,
  materialsAvailable,
  lowStock,
  "img": image.asset->url
}`;

// 2. The Data Fetching Function
async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    // Map Sanity data to our Dashboard format
    return data.map((item: any) => ({
      id: item._id,
      clientName: item.clientName || 'Unknown Client',
      pattern: item.pattern || 'Custom Pattern',
      dimensions: item.dimensions || 'N/A',
      dueDate: item.dueDate || new Date().toISOString(),
      status: item.status || 'Pending',
      battingLength: item.battingLength || 0,
      materialsAvailable: item.materialsAvailable || false,
      lowStock: item.lowStock || false,
      // If Sanity has an image, use it; otherwise use a placeholder
      img: item.img || 'https://images.unsplash.com/photo-1598555848889-8d5f30e78f7e?q=80&w=600'
    }));
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return []; // Return empty list on error so page doesn't crash
  }
}

export default async function QueuePage() {
  // 3. Fetch the real data
  const orders = await getOrders();

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Queue...</div>}>
      {/* 4. Pass REAL orders to the dashboard */}
      <AdminDashboard initialOrders={orders} />
    </Suspense>
  );
}