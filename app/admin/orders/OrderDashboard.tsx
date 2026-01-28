"use client";

import React, { useState } from 'react';
import { ProjectWorkspaceModal, Order } from '../../components/ProjectWorkspaceModal';

export type { Order };

// Helper to format currency
const formatMoney = (amount: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function OrderDashboard({ 
  activeOrders = [], 
  completedOrders = [] 
}: { 
  activeOrders: Order[], 
  completedOrders: Order[] 
}) {
  const [tab, setTab] = useState<'queue' | 'history'>('queue');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const displayedOrders = tab === 'queue' ? activeOrders : completedOrders;

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#151022] min-h-screen pb-24 font-sans text-[#131118] dark:text-white">
      
      {/* HEADER with TABS */}
      <header className="sticky top-0 z-40 bg-[#f6f6f8]/80 dark:bg-[#151022]/80 backdrop-blur-md border-b border-[#dedbe6] dark:border-[#332a4d]">
        <div className="max-w-xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold font-display tracking-tight">Orders</h1>
            {/* Profit Pulse (Only shows in history tab) */}
            {tab === 'history' && (
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Total Revenue</p>
                <p className="text-lg font-bold text-[#13ec13]">
                  {formatMoney(completedOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0))}
                </p>
              </div>
            )}
          </div>
          
          {/* TABS */}
          <div className="flex bg-[#e8e8ed] dark:bg-[#2d2445] p-1 rounded-xl">
            <button 
              onClick={() => setTab('queue')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'queue' ? 'bg-white dark:bg-[#652bee] shadow-sm' : 'opacity-60'}`}
            >
              Current Queue ({activeOrders.length})
            </button>
            <button 
              onClick={() => setTab('history')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'history' ? 'bg-white dark:bg-[#652bee] shadow-sm' : 'opacity-60'}`}
            >
              History ({completedOrders.length})
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LIST */}
      <main className="max-w-xl mx-auto p-4 space-y-6">
        {displayedOrders.length === 0 ? (
          <div className="text-center py-20 opacity-50">No orders found in this view.</div>
        ) : (
          displayedOrders.map((order) => (
            <div 
              key={order.id}
              onClick={() => tab === 'queue' ? setSelectedOrder(order) : null} // Disable click for history (for now)
              className={`bg-white dark:bg-[#1e1635] rounded-xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445] overflow-hidden transition-all ${tab === 'queue' ? 'hover:shadow-md cursor-pointer' : 'opacity-90'}`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block ${
                       order.status === 'completed' ? 'bg-[#13ec13]/10 text-[#13ec13]' : 'bg-[#708090]/15 text-[#708090]'
                    }`}>
                      {order.status}
                    </span>
                    <h3 className="text-xl font-bold font-display leading-tight">{order.clientName}</h3>
                  </div>
                  {/* PRICE TAG */}
                  <div className="text-right">
                     <p className="text-lg font-bold">{formatMoney(order.totalPrice || 0)}</p>
                  </div>
                </div>

                {/* SHOW DIFFERENT DATA BASED ON TAB */}
                {tab === 'queue' ? (
                  // QUEUE VIEW
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-500">
                       <span className="material-symbols-outlined text-lg">straighten</span>
                       <p className="text-sm">{order.dimensions}</p>
                    </div>
                    <button className="w-full bg-[#652bee] text-white py-3 rounded-xl font-bold text-sm mt-4">Start Quilting</button>
                  </div>
                ) : (
                  // PROFITABILITY VIEW (HISTORY)
                  <div className="grid grid-cols-2 gap-4 mt-4 bg-[#f6f6f8] dark:bg-white/5 p-3 rounded-lg">
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">Hourly Rate</p>
                      {/* Calculate Hourly Rate: Price / Hours */}
                      <p className="text-lg font-bold font-mono">
                         {/* Fallback to 0 if time is missing to avoid NaN */}
                         {order.actualTimeSeconds ? formatMoney((order.totalPrice || 0) / (order.actualTimeSeconds / 3600)) : '$--'}/hr
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">Efficiency</p>
                      <p className="text-lg font-bold font-mono text-[#652bee]">
                        {/* Fallback for old orders that lack metrics */}
                        {order.efficiencyMetrics?.speed || '--'} <span className="text-xs">sq in/hr</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </main>

      <ProjectWorkspaceModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
}