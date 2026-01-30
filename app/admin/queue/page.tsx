import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 FINAL QUERY: Uses your exact field names ("customer", "pattern", "orderDate")
const QUERY = `*[_type == "order"] | order(orderDate asc) {
  _id,
  
  // 1. CUSTOMER: Follow the link to find the name
  "clientName": coalesce(
    customer->name,        // Try "name" inside the customer doc
    customer->fullName,    // Try "fullName"
    customer->firstName,   // Try "firstName"
    "Unknown Customer"     // Fallback
  ),

  // 2. PATTERN: Follow the link to find the pattern name
  "pattern": coalesce(
    pattern->name,         // Try "name" inside the pattern doc
    pattern->title,        // Try "title"
    "Custom Pattern"
  ),

  // 3. DATES & STATUS
  "dueDate": orderDate,    // Mapping your "orderDate" to our "dueDate"
  status,
  dimensions,
  
  // 4. INVENTORY / EXTRAS
  // You have a 'backing' field, assuming it might be related or we default to 0 for now
  "battingLength": coalesce(dimensions, 0), 
  
  "img": coalesce(image.asset->url, img.asset->url)
}`;

async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    return data.map((item: any) => ({
      id: item._id,
      
      // ✅ No more JSON.stringify! We expect real text now.
      clientName: item.clientName || 'Unknown',
      pattern: item.pattern || 'Custom Pattern',
      
      dimensions: item.dimensions || 'N/A',
      dueDate: item.dueDate || new Date().toISOString(),
      status: item.status || 'Pending',
      
      // Just a default for now since we don't have a clear batting field yet
      battingLength: 100, 
      materialsAvailable: true, // Defaulting to true for now
      lowStock: false,
      
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