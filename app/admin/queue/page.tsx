import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 QUERY: Fetches Customer, Pattern, Dimensions, Materials, and Financials
const QUERY = `*[_type == "order"] | order(orderDate asc) {
  _id,
  
  // 1. Customer Name (Object)
  "firstName": customer.firstName,
  "lastName": customer.lastName,

  // 2. Pattern (Reference)
  "patternName": coalesce(pattern->name, pattern->title, "Custom Pattern"),

  // 3. Dimensions (Object)
  "width": dimensions.width,
  "height": dimensions.height,

  // 4. Materials & Details
  "backingHeight": backing.height,
  "backingWidth": backing.width,
  "bindingMethod": binding.method,
  "threadColor": designDetails.threadColor,

  // 5. Financials & Status
  orderDate,
  status,
  totalPrice,
  actualFabricUsed,
  actualTimeSeconds,
  
  "img": coalesce(image.asset->url, img.asset->url)
}`;

async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    return data.map((item: any) => ({
      id: item._id,
      
      // Combine Names
      clientName: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown Client',
      
      pattern: item.patternName || 'Custom Pattern',
      
      // Combine Dimensions
      dimensions: (item.width && item.height) ? `${item.width}" x ${item.height}"` : 'N/A',
      
      dueDate: item.orderDate || new Date().toISOString(),
      status: item.status || 'pending',
      
      // Materials
      backing: (item.backingWidth && item.backingHeight) ? `${item.backingWidth}" x ${item.backingHeight}"` : 'Not specified',
      binding: item.bindingMethod || 'Standard',
      thread: item.threadColor || 'White',

      // Financials (Pass raw data, Dashboard calculates profit)
      totalPrice: item.totalPrice || 0,
      actualFabricUsed: item.actualFabricUsed || "0",
      actualTimeSeconds: item.actualTimeSeconds || 0,
      
      // UI Defaults
      battingLength: 100, 
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