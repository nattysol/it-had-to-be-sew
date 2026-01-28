"use client";

import React, { useState } from 'react';
import { ProjectWorkspaceModal } from '../../components/ProjectWorkspaceModal';

// Define the Order type matching your Sanity Schema
export interface Order {
  id: string;
  clientName: string;
  pattern: string;
  dimensions: string;
  dueDate: string;
  status: string;
  battingLength: number;
  materialsAvailable?: boolean;
  lowStock?: boolean;
  img?: string;
}

export default function OrderDashboard({ initialOrders }: { initialOrders: Order[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // 👇 ADD THIS SAFETY CHECK
  if (!initialOrders || initialOrders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f6f8] dark:bg-[#151022] text-[#131118] dark:text-white">
        <h2 className="text-xl font-bold mb-2">No Orders Found</h2>
        <p className="opacity-60 mb-4">Check your Sanity connection or add an order.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#652bee] text-white rounded-lg">
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#151022] min-h-screen pb-24 font-sans text-[#131118] dark:text-white">
      {/* ... (Paste the Header & Main Grid Code from your previous page.tsx here) ... */}
     
      {/* 👇 DEBUGGER: This will print the Raw Data on top of your screen */}
      <div className="bg-black text-green-400 p-4 font-mono text-xs overflow-auto max-h-64 border-b-4 border-green-600">
        <h3 className="font-bold text-white mb-2">DEBUG: RAW DATA FROM SANITY</h3>
        <pre>{JSON.stringify(initialOrders, null, 2)}</pre>
      </div>
      {/* 👆 END DEBUGGER */}

      <main className="max-w-xl mx-auto p-4 space-y-6">
        <h2 className="text-lg font-bold font-display">Current Queue</h2>
        <div className="grid gap-6">
          {/* Map through the PASSED PROPS instead of mock data */}
          {initialOrders.map((order) => (
            <div 
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white dark:bg-[#1e1635] rounded-xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445] overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
            >
              {/* ... (The Card UI Code remains exactly the same) ... */}
            </div>
          ))}
        </div>
      </main>

      <ProjectWorkspaceModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
}