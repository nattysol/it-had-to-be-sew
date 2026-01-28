"use client";

import React, { useState } from 'react';
import { ProjectWorkspaceModal, Order } from '../../components/ProjectWorkspaceModal';
export type { Order };
export default function OrderDashboard({ initialOrders = [] }: { initialOrders?: Order[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // 1. EMPTY STATE HANDLER
  if (!initialOrders || initialOrders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f6f8] dark:bg-[#151022] text-[#131118] dark:text-white">
        <h2 className="text-xl font-bold mb-2">No Active Orders</h2>
        <p className="opacity-60 mb-4">Add an order in Sanity with status "Processing" or "Ready"</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#652bee] text-white rounded-lg">
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#151022] min-h-screen pb-24 font-sans text-[#131118] dark:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#f6f6f8]/80 dark:bg-[#151022]/80 backdrop-blur-md border-b border-[#dedbe6] dark:border-[#332a4d]">
        <div className="flex items-center p-4 justify-between max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-[#652bee]/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-[#652bee]">grid_view</span>
            </div>
            <h1 className="text-xl font-bold font-display tracking-tight">Active Orders</h1>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-xl mx-auto p-4 space-y-6">
        <h2 className="text-lg font-bold font-display">Current Queue ({initialOrders.length})</h2>

        <div className="grid gap-6">
          {initialOrders.map((order) => (
            <div 
              key={order.id}
              onClick={() => setSelectedOrder(order)} 
              className="bg-white dark:bg-[#1e1635] rounded-xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445] overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* STATUS PILL */}
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block ${
                      ['ready', 'Ready'].includes(order.status) 
                        ? 'bg-[#8DAA91]/15 text-[#8DAA91]' 
                        : 'bg-[#708090]/15 text-[#708090]'
                    }`}>
                      {order.status || 'Unknown'}
                    </span>
                    <h3 className="text-xl font-bold font-display leading-tight group-hover:text-[#652bee] transition-colors">
                      {order.clientName || 'Unnamed Client'}
                    </h3>
                  </div>
                  
                  {/* STOCK BADGE */}
                  {order.lowStock ? (
                    <div className="bg-[#D97706]/10 text-[#D97706] flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D97706]/20">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      <span className="text-xs font-semibold">Low Stock</span>
                    </div>
                  ) : (
                    <div className="bg-[#2D5A27]/10 text-[#2D5A27] flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2D5A27]/20">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span className="text-xs font-semibold">Ready</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="material-symbols-outlined text-lg">content_cut</span>
                    <p className="text-sm">{order.pattern || 'No Pattern Selected'}</p>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="material-symbols-outlined text-lg">straighten</span>
                    {/* SAFETY CHECK: Handle missing dimensions */}
                    <p className="text-sm">{order.dimensions || 'Dimensions Pending'}</p>
                  </div>
                </div>

                <button className="w-full bg-[#652bee] text-white py-3 rounded-xl font-bold text-sm">
                  Start Quilting
                </button>
              </div>
              
              {/* IMAGE PREVIEW (Safety Check applied) */}
              {order.img && (
                <div 
                  className="h-[150px] w-full bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity" 
                  style={{ backgroundImage: `url('${order.img}')` }}
                />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      <ProjectWorkspaceModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />

    </div>
  );
}