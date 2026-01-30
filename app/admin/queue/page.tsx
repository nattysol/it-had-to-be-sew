import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order, InventoryItem } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

// ⚡️ Force dynamic rendering so data is always fresh
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 1. UPDATE QUERY to get full customer details
const QUERY = `{
  "orders": *[_type == "order"] | order(orderDate asc) {
    _id,
    "firstName": customer.firstName,
    "lastName": customer.lastName,
    
    // NEW: Contact Info
    "email": customer.email,
    "phone": customer.phone,
    "address": customer.address,
    "city": customer.city,
    "state": customer.state,
    "zip": customer.zip,

    "patternName": coalesce(pattern->name, pattern->title, "Custom Pattern"),
    "width": dimensions.width,
    "height": dimensions.height,
    "backingHeight": backing.height,
    "backingWidth": backing.width,
    "bindingMethod": binding.method,
    "threadColor": designDetails.threadColor,
    orderDate,
    status,
    totalPrice,
    actualFabricUsed,
    actualTimeSeconds,
    "img": coalesce(pattern->image.asset->url, pattern->img.asset->url, image.asset->url, img.asset->url)
  },
  "inventory": *[_type == "inventory"] | order(name asc) {
    _id, name, category, quantity, unit, lowStockThreshold, "imageUrl": image.asset->url
  }
}`;

async function getData() {
  try {
    const data = await client.fetch(QUERY);
    
    // 2. MAP THE NEW FIELDS
    const orders: Order[] = (data.orders || []).map((item: any) => ({
      id: item._id,
      clientName: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown Client',
      
      // Store full contact info in the order object
      customer: {
        email: item.email || 'N/A',
        phone: item.phone || 'N/A',
        address: item.address ? `${item.address}, ${item.city}, ${item.state} ${item.zip}` : 'No Address'
      },

      pattern: item.patternName || 'Custom Pattern',
      dimensions: (item.width && item.height) ? `${item.width}" x ${item.height}"` : 'N/A',
      dueDate: item.orderDate || new Date().toISOString(),
      status: item.status || 'pending',
      backing: (item.backingWidth && item.backingHeight) ? `${item.backingWidth}" x ${item.backingHeight}"` : 'Not specified',
      binding: item.bindingMethod || 'Standard',
      thread: item.threadColor || 'White',
      totalPrice: item.totalPrice || 0,
      actualFabricUsed: item.actualFabricUsed || "0",
      actualTimeSeconds: item.actualTimeSeconds || 0,
      battingLength: 100, 
      materialsAvailable: true, 
      lowStock: false,
      img: item.img || 'https://images.unsplash.com/photo-1598555848889-8d5f30e78f7e?q=80&w=600'
    }));

    // 2. MAP INVENTORY
    const inventory: InventoryItem[] = (data.inventory || []).map((item: any) => ({
      id: item._id,
      name: item.name,
      category: item.category || 'general',
      quantity: item.quantity || 0,
      unit: item.unit || 'units',
      isLowStock: (item.quantity || 0) <= (item.lowStockThreshold || 5),
      imageUrl: item.imageUrl
    }));

    return { orders, inventory };
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return { orders: [], inventory: [] };
  }
}

export default async function QueuePage() {
  const { orders, inventory } = await getData();

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Dashboard...</div>}>
      <AdminDashboard initialOrders={orders} initialInventory={inventory} />
    </Suspense>
  );
}