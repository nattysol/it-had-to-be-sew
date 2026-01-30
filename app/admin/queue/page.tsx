import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 QUERY MATCHING YOUR EXACT JSON
const QUERY = `*[_type == "order"] | order(orderDate asc) {
  _id,
  
  // 1. CUSTOMER (Direct Object Access)
  "firstName": customer.firstName,
  "lastName": customer.lastName,

  // 2. PATTERN (Reference Link)
  "patternName": coalesce(pattern->name, pattern->title, "Custom Pattern"),

  // 3. DIMENSIONS (Direct Object Access)
  "width": dimensions.width,
  "height": dimensions.height,

  orderDate,
  status,
  
  "img": coalesce(image.asset->url, img.asset->url)
}`;

async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    return data.map((item: any) => ({
      id: item._id,
      
      // ✅ Combine First + Last Name
      clientName: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown Client',
      
      pattern: item.patternName || 'Custom Pattern',
      
      // ✅ Combine Width + Height into a string
      dimensions: (item.width && item.height) ? `${item.width}" x ${item.height}"` : 'N/A',
      
      dueDate: item.orderDate || new Date().toISOString(),
      status: item.status || 'Pending',
      
      battingLength: 100, // Placeholder
      materialsAvailable: true, 
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