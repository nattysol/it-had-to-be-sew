"use client";

import React, { useState } from 'react';
import { ProjectWorkspaceModal, Order } from '../../components/ProjectWorkspaceModal';

// Re-export Order type for the page.tsx to use
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
    <div className="bg-brand-light/30 dark:bg-[#151022] min-h-screen pb-24 font-sans text-brand-purple dark:text-white">
      
      {/* HEADER with TABS */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#151022]/80 backdrop-blur-md border-b border-brand-purple/10 dark:border-[#332a4d]">
        <div className="max-w-xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-serif font-bold tracking-tight text-brand-purple dark:text-white">
              Orders
            </h1>
            
            {/* Profit Pulse (Only shows in history tab) */}
            {tab === 'history' && (
              <div className="text-right animate-in fade-in slide-in-from-right-4">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Total Revenue</p>
                <p className="text-xl font-bold text-brand-teal font-mono">
                  {formatMoney(completedOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0))}
                </p>
              </div>
            )}
          </div>
          
          {/* BRANDED TABS */}
          <div className="flex bg-brand-purple/5 dark:bg-[#2d2445] p-1 rounded-xl">
            <button 
              onClick={() => setTab('queue')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                tab === 'queue' 
                  ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' 
                  : 'text-brand-purple/60 hover:text-brand-purple'
              }`}
            >
              Current Queue ({activeOrders.length})
            </button>
            <button 
              onClick={() => setTab('history')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                tab === 'history' 
                  ? 'bg-brand-teal text-white shadow-md shadow-brand-teal/20' 
                  : 'text-brand-purple/60 hover:text-brand-teal'
              }`}
            >
              History ({completedOrders.length})
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LIST */}
      <main className="max-w-xl mx-auto p-4 space-y-6">
        
        {/* Empty State */}
        {displayedOrders.length === 0 ? (
          <div className="text-center py-20 opacity-50 flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-brand-purple/20">inbox</span>
            <p>No orders found in this view.</p>
          </div>
        ) : (
          displayedOrders.map((order) => (
            <div 
              key={order.id}
              onClick={() => tab === 'queue' ? setSelectedOrder(order) : null} 
              className={`bg-white dark:bg-[#1e1635] rounded-xl shadow-sm border border-brand-purple/10 dark:border-[#2d2445] overflow-hidden transition-all group ${
                tab === 'queue' 
                  ? 'hover:shadow-lg hover:shadow-brand-purple/5 cursor-pointer hover:border-brand-purple/30' 
                  : 'opacity-90'
              }`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* BRANDED STATUS PILL */}
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md mb-2 inline-block ${
                       order.status === 'completed' ? 'bg-brand-gold/15 text-brand-gold' : 
                       order.status === 'ready' ? 'bg-brand-teal/15 text-brand-teal' :
                       order.status === 'processing' ? 'bg-brand-purple/15 text-brand-purple' :
                       'bg-gray-100 text-gray-500'
                    }`}>
                      {order.status}
                    </span>
                    <h3 className="text-xl font-serif font-bold leading-tight text-brand-purple dark:text-white group-hover:text-brand-teal transition-colors">
                      {order.clientName}
                    </h3>
                  </div>
                  
                  {/* PRICE TAG */}
                  <div className="text-right">
                     <p className="text-lg font-bold text-brand-purple/80 dark:text-brand-gold">
                       {formatMoney(order.totalPrice || 0)}
                     </p>
                  </div>
                </div>

                {/* SHOW DIFFERENT DATA BASED ON TAB */}
                {tab === 'queue' ? (
                  // QUEUE VIEW
                  <div className="space-y-4 mb-2">
                    <div className="flex items-center gap-3 text-brand-purple/60 dark:text-white/60">
                       <span className="material-symbols-outlined text-lg">straighten</span>
                       <p className="text-sm font-medium">{order.dimensions}</p>
                    </div>
                    
                    {/* Action Button */}
                    <button className="w-full bg-brand-purple text-white py-3 rounded-xl font-bold text-sm mt-2 shadow-lg shadow-brand-purple/20 group-hover:bg-brand-teal group-hover:shadow-brand-teal/20 transition-all duration-300">
                      Open Workspace
                    </button>
                  </div>
                ) : (
                  // PROFITABILITY VIEW (HISTORY)
                  <div className="grid grid-cols-2 gap-4 mt-4 bg-brand-light/50 dark:bg-white/5 p-3 rounded-lg border border-brand-purple/5">
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50 text-brand-purple">Hourly Rate</p>
                      {/* Calculate Hourly Rate: Price / Hours */}
                      <p className="text-lg font-bold font-mono text-brand-teal">
                         {order.actualTimeSeconds ? formatMoney((order.totalPrice || 0) / (order.actualTimeSeconds / 3600)) : '$--'}/hr
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50 text-brand-purple">Efficiency</p>
                      <p className="text-lg font-bold font-mono text-brand-gold">
                        {order.efficiencyMetrics?.speed || '--'} <span className="text-xs text-brand-purple/40">sq in/hr</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative Bottom Border for Completed Items */}
              {tab === 'history' && (
                <div className="h-1 w-full bg-gradient-to-r from-brand-teal via-brand-gold to-brand-pink opacity-30"></div>
              )}
            </div>
          ))
        )}
      </main>

      {/* MODAL CONNECTION */}
      <ProjectWorkspaceModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
}