"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProjectWorkspaceModal } from './ProjectWorkspaceModal';

// --- TYPES ---
export interface Order {
  id: string;
  clientName: string;
  pattern: string;
  dimensions: string;
  dueDate: string;
  status: string;
  
  // Specific Materials
  backing?: string;
  binding?: string;
  thread?: string;

  // Financials
  totalPrice?: number;
  actualFabricUsed?: string; 
  actualTimeSeconds?: number;

  battingLength: number;
  materialsAvailable?: boolean;
  lowStock?: boolean;
  img: string;
}

// --- HELPER: Profit Calculator ---
const getProfitMetrics = (order: Order) => {
  const revenue = order.totalPrice || 0;
  
  // Costs Configuration
  const laborRate = 25; // $25/hr
  const fabricCostPerUnit = 12; // $12/yd
  
  const hours = (order.actualTimeSeconds || 0) / 3600;
  const fabric = parseFloat(order.actualFabricUsed || "0");
  
  const laborCost = hours * laborRate;
  const materialCost = fabric * fabricCostPerUnit;
  const totalCost = laborCost + materialCost;
  
  const profit = revenue - totalCost;
  const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(0) : 0;

  return { 
    revenue, 
    profit: profit.toFixed(2), 
    margin, 
    isProfitable: profit > 0 
  };
};

// --- SUB-COMPONENT: Orders List ---
const OrdersView = ({ orders, openOrder, showCompleted }: { orders: Order[], openOrder: (id: string) => void, showCompleted: boolean }) => {
  
  // Filter: Show Completed tab vs Active tab
  const displayOrders = orders.filter(o => 
    showCompleted ? o.status === 'completed' : o.status !== 'completed'
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid gap-6">
        {displayOrders.length === 0 && (
          <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
            {showCompleted ? "No completed jobs yet. Keep sewing!" : "Queue is empty!"}
          </div>
        )}

        {displayOrders.map((order) => {
          const financials = getProfitMetrics(order);

          return (
            <div 
              key={order.id}
              onClick={() => openOrder(order.id)}
              className="bg-white dark:bg-[#1e1635] rounded-xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445] overflow-hidden cursor-pointer hover:shadow-md transition-all group relative hover:translate-y-[-2px]"
            >
              <div className="p-5 relative z-10 flex flex-col md:flex-row gap-6">
                
                {/* 1. Main Info Column */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                      'bg-[#652bee]/10 text-[#652bee]'
                    }`}>
                      {order.status === 'in-progress' ? 'In Progress' : order.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-tight text-slate-900 dark:text-white group-hover:text-[#652bee] transition-colors">
                    {order.clientName}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500 mt-1">
                    <span className="material-symbols-outlined text-base">content_cut</span>
                    <p className="text-xs font-bold uppercase tracking-wider">{order.pattern}</p>
                  </div>
                </div>

                {/* 2. Right Column: Money (Completed) OR Status (Active) */}
                {showCompleted ? (
                   <div className="flex items-center gap-4 bg-slate-50 dark:bg-black/20 p-3 rounded-lg border border-slate-100 dark:border-white/5">
                      <div className="text-right">
                         <p className="text-[10px] uppercase text-slate-400 font-bold">Revenue</p>
                         <p className="font-bold text-slate-700 dark:text-white">${financials.revenue}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                      <div className="text-right">
                         <p className="text-[10px] uppercase text-slate-400 font-bold">Net Profit</p>
                         <p className={`font-bold ${financials.isProfitable ? 'text-green-600' : 'text-red-500'}`}>
                           ${financials.profit}
                         </p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold ${financials.isProfitable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                         {financials.margin}%
                      </div>
                   </div>
                ) : (
                  <div className="flex items-center">
                      <div className="bg-[#2D5A27]/10 text-[#2D5A27] flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2D5A27]/20">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span className="text-xs font-semibold">Materials OK</span>
                      </div>
                  </div>
                )}
              </div>
              
              {/* Background Image Effect */}
              <div className="absolute top-0 right-0 w-32 h-full opacity-10 mask-linear-gradient pointer-events-none">
                 {order.img && <Image src={order.img} alt="Pattern" fill className="object-cover" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- INVENTORY VIEW (Placeholder) ---
const InventoryView = () => (
  <div className="text-center p-12 text-slate-400 animate-in fade-in">
    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">inventory_2</span>
    <p>Inventory Module Coming Soon</p>
  </div>
);

// --- MAIN EXPORT ---
export const AdminDashboard = ({ initialOrders }: { initialOrders: Order[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<'queue' | 'inventory'>('queue');
  const [showCompleted, setShowCompleted] = useState(false);

  // Modal State Logic
  const activeOrderId = searchParams.get('orderId');
  const selectedOrder = initialOrders.find(o => o.id === activeOrderId) || null;

  const openOrder = (id: string) => {
    router.push(`/admin/queue?orderId=${id}`, { scroll: false });
  };
  
  const closeOrder = () => {
    router.push('/admin/queue', { scroll: false });
  };

  return (
    <div className="flex min-h-screen bg-[#f6f6f8] dark:bg-[#151022] font-sans text-[#131118] dark:text-white">
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#dedbe6] dark:border-[#332a4d] bg-white/50 dark:bg-[#1e1635]/50 backdrop-blur-xl fixed inset-y-0 z-20">
         <div className="p-6">
            <h1 className="text-xl font-bold font-serif tracking-tight text-[#652bee]">It Had To Be Sew</h1>
         </div>
         <nav className="flex-1 px-4 space-y-2">
            <button 
              onClick={() => setCurrentView('queue')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentView === 'queue' ? 'bg-[#652bee] text-white shadow-lg shadow-[#652bee]/20' : 'text-slate-500 hover:bg-black/5'}`}
            >
              <span className="material-symbols-outlined">assignment</span>
              Orders
            </button>
            <button 
              onClick={() => setCurrentView('inventory')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentView === 'inventory' ? 'bg-[#652bee] text-white shadow-lg shadow-[#652bee]/20' : 'text-slate-500 hover:bg-black/5'}`}
            >
              <span className="material-symbols-outlined">inventory_2</span>
              Inventory
            </button>
         </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 pb-32 md:pb-10">
         <header className="hidden md:flex items-center justify-between p-8 pb-4">
             <div className="flex items-center gap-4">
               <h2 className="text-3xl font-bold font-display capitalize text-slate-900 dark:text-white">
                 {currentView === 'inventory' ? 'Inventory' : (showCompleted ? 'Financial History' : 'Active Queue')}
               </h2>
               
               {/* TOGGLE: Active vs Completed */}
               {currentView === 'queue' && (
                 <div className="flex bg-slate-200 dark:bg-white/10 p-1 rounded-lg">
                    <button 
                      onClick={() => setShowCompleted(false)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!showCompleted ? 'bg-white shadow-sm text-black' : 'text-slate-500'}`}
                    >
                      Active
                    </button>
                    <button 
                      onClick={() => setShowCompleted(true)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${showCompleted ? 'bg-white shadow-sm text-black' : 'text-slate-500'}`}
                    >
                      Completed
                    </button>
                 </div>
               )}
             </div>

             <div className="flex items-center gap-4">
                <span className="text-sm font-bold opacity-60">Admin User</span>
                <div className="size-10 bg-gray-200 rounded-full"></div>
             </div>
         </header>

         <div className="p-4 md:p-8 max-w-4xl mx-auto">
            {currentView === 'queue' ? (
               <OrdersView orders={initialOrders} openOrder={openOrder} showCompleted={showCompleted} />
            ) : (
               <InventoryView />
            )}
         </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-around md:hidden z-30">
          <button onClick={() => setCurrentView('queue')} className="p-2 font-bold text-sm">Orders</button>
          <button onClick={() => setCurrentView('inventory')} className="p-2 font-bold text-sm">Stock</button>
      </nav>

      {/* MODAL POPUP */}
      <ProjectWorkspaceModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={closeOrder} 
      />
    </div>
  );
};