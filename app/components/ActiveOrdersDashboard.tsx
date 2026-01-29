"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProjectWorkspaceModal } from './ProjectWorkspaceModal';

// Shared Types (ideally move to types.ts)
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
  img: string;
}

export const ActiveOrdersDashboard = ({ initialOrders }: { initialOrders: Order[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. URL STATE LOGIC:
  // Check if ?orderId=... exists in the URL
  const activeOrderId = searchParams.get('orderId');
  const selectedOrder = initialOrders.find(o => o.id === activeOrderId) || null;

  // 2. HANDLERS:
  // Instead of setState, we push a new URL. Next.js updates the view instantly.
  const openOrder = (id: string) => {
    router.push(`?orderId=${id}`, { scroll: false });
  };

  const closeOrder = () => {
    router.push('/admin/orders', { scroll: false });
  };

  return (
    <>
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

      {/* GRID */}
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <h2 className="text-lg font-bold font-display">Current Queue</h2>
        <div className="grid gap-6">
          {initialOrders.map((order) => (
            <div 
              key={order.id}
              onClick={() => openOrder(order.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openOrder(order.id)} // Accessibility
              className="bg-white dark:bg-[#1e1635] rounded-xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445] overflow-hidden cursor-pointer hover:shadow-md transition-shadow group relative"
            >
              <div className="p-5 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block ${
                      order.status === 'Ready to Start' ? 'bg-[#8DAA91]/15 text-[#8DAA91]' : 'bg-[#708090]/15 text-[#708090]'
                    }`}>
                      {order.status}
                    </span>
                    <h3 className="text-xl font-bold font-display leading-tight group-hover:text-[#652bee] transition-colors">
                      {order.clientName}
                    </h3>
                  </div>
                  {order.lowStock ? (
                    <div className="bg-[#D97706]/10 text-[#D97706] flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D97706]/20">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      <span className="text-xs font-semibold">Low Stock</span>
                    </div>
                  ) : (
                    <div className="bg-[#2D5A27]/10 text-[#2D5A27] flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2D5A27]/20">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span className="text-xs font-semibold">Materials OK</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="material-symbols-outlined text-lg">content_cut</span>
                    <p className="text-sm">{order.pattern}</p>
                  </div>
                </div>

                <button className="w-full bg-[#652bee] text-white py-3 rounded-xl font-bold text-sm">
                  {order.status === 'In Progress' ? 'Resume Work' : 'Start Quilting'}
                </button>
              </div>

              {/* IMAGE OPTIMIZATION: Replacing background-image with next/image */}
              <div className="h-[150px] w-full relative opacity-90 group-hover:opacity-100 transition-opacity mt-[-20px]">
                 <Image 
                   src={order.img}
                   alt={`Pattern preview for ${order.clientName}`}
                   fill
                   className="object-cover"
                   sizes="(max-width: 600px) 100vw, 600px"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL CONNECTION */}
      {/* We control visibility by checking if selectedOrder exists */}
      <ProjectWorkspaceModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={closeOrder} 
      />
    </>
  );
};