import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
import { client } from '../../lib/sanity';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 UPDATED: We now check 5+ different possibilities for the name and pattern
const QUERY = `*[_type == "order"] | order(dueDate asc) {
  _id,
  
  // 1. Try finding the name in these fields (in order)
  "clientName": coalesce(
    clientName,       // Text string
    name,             // Maybe the order itself is named "Danica"?
    customer,         // Text string
    customerName,     // Text string
    client->name,     // Reference to a client doc
    client->firstName,// Reference to a client doc
    customer->name,   // Reference to a customer doc
    "Unknown Client"  // Fallback
  ),

  // 2. Try finding the pattern
  "pattern": coalesce(
    pattern, 
    patternName,
    title,
    pattern->name, 
    pattern->title, 
    "Custom Pattern"
  ),

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
    
    return data.map((item: any) => ({
      id: item._id,
      // Safety check: Ensure we print a string, not an object
      clientName: typeof item.clientName === 'object' ? 'Complex Object (Check Schema)' : item.clientName,
      pattern: typeof item.pattern === 'object' ? 'Complex Object (Check Schema)' : item.pattern,
      
      dimensions: item.dimensions || 'N/A',
      dueDate: item.dueDate || new Date().toISOString(),
      status: item.status || 'Pending',
      battingLength: item.battingLength || 0,
      materialsAvailable: item.materialsAvailable || false,
      lowStock: item.lowStock || false,
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