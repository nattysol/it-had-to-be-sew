import React, { Suspense } from 'react';
import type { Metadata } from 'next';
// ✅ Importing the Real Dashboard component
import { AdminDashboard, Order } from '../../components/RealDashboard'; 
// ✅ Importing the Sanity Client
import { client } from '../../lib/sanity';

// ⚡️ Force the page to always fetch fresh data (no caching)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// 👇 THE MAGIC QUERY
// This checks every possible variation of "Client Name" and "Pattern"
const QUERY = `*[_type == "order"] | order(dueDate asc) {
  _id,
  
  // 1. CLIENT NAME HUNT:
  "clientName": coalesce(
    // A. If 'clientName' is a link, look inside the linked document:
    clientName->name,
    clientName->firstName,
    clientName->fullName,
    clientName->title,
    
    // B. If the field is named 'client' (common convention):
    client->name,
    client->firstName,
    client->fullName,
    
    // C. If it is just a plain text string:
    clientName,
    name,
    
    // D. Fallback if nothing works
    "Unknown Client"
  ),

  // 2. PATTERN HUNT:
  "pattern": coalesce(
    // A. If 'pattern' is a link:
    pattern->name,
    pattern->title,
    
    // B. If it's plain text:
    pattern,
    patternName,
    
    "Custom Pattern"
  ),

  dimensions,
  dueDate,
  status,
  battingLength,
  materialsAvailable,
  lowStock,
  
  // 3. IMAGE HUNT:
  "img": coalesce(image.asset->url, img.asset->url)
}`;

// ⚡️ DATA FETCHING FUNCTION
async function getOrders(): Promise<Order[]> {
  try {
    const data = await client.fetch(QUERY);
    
    return data.map((item: any) => ({
      id: item._id,
      
      // 🛡️ SAFETY CHECK: 
      // If Sanity *still* returns an object (weird edge case), force it to a string.
      // This prevents the "Minified React Error #31" crash.
      clientName: typeof item.clientName === 'object' ? 'Linked Data Error' : (item.clientName || 'Unknown'),
      pattern: typeof item.pattern === 'object' ? 'Linked Data Error' : (item.pattern || 'Custom'),
      
      dimensions: item.dimensions || 'N/A',
      dueDate: item.dueDate || new Date().toISOString(),
      status: item.status || 'Pending',
      battingLength: item.battingLength || 0,
      materialsAvailable: item.materialsAvailable || false,
      lowStock: item.lowStock || false,
      
      // Fallback image
      img: item.img || 'https://images.unsplash.com/photo-1598555848889-8d5f30e78f7e?q=80&w=600'
    }));
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return [];
  }
}

// ⚡️ MAIN PAGE COMPONENT
export default async function QueuePage() {
  const orders = await getOrders();

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Queue...</div>}>
      <AdminDashboard initialOrders={orders} />
    </Suspense>
  );
}