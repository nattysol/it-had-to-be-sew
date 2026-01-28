"use client";

import React, { useState } from 'react';

// 👇 Updated Interface to match YOUR Schema
export interface InventoryItem {
  id: string;
  name: string;
  category: 'thread' | 'batting' | 'fabric';
  stockLevel: number;
  yardsPerOz?: number;
  isPublic: boolean;
  imageUrl?: string;
}

export default function InventoryDashboard({ initialItems = [] }: { initialItems: InventoryItem[] }) {
  const [filter, setFilter] = useState<'all' | 'thread' | 'batting' | 'fabric'>('all');
  
  // Filter logic
  const displayedItems = initialItems.filter(item => 
    filter === 'all' ? true : item.category === filter
  );

  // Helper to determine Unit based on Category (per your schema comments)
  const getUnit = (category: string) => {
    if (category === 'thread') return 'oz';
    if (category === 'batting') return 'in';
    return 'qty'; 
  };

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#151022] min-h-screen pb-24 font-sans text-[#131118] dark:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#f6f6f8]/80 dark:bg-[#151022]/80 backdrop-blur-md border-b border-[#dedbe6] dark:border-[#332a4d]">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-serif text-[#3b1c59] dark:text-white">Inventory</h1>
              <p className="text-sm opacity-60">Manage stock levels and client visibility.</p>
            </div>
            
            {/* Quick Add Button */}
            <a 
               href="/studio/structure/inventoryItem" 
               target="_blank"
               className="bg-[#3b1c59] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#56a7a7] transition-colors shadow-lg"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Add Item in Sanity
            </a>
          </div>

          {/* TABS (Updated to match your categories) */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'all', label: 'All', icon: 'apps' },
              { id: 'thread', label: 'Threads', icon: 'gesture' },
              { id: 'batting', label: 'Batting', icon: 'layers' },
              { id: 'fabric', label: 'Backing', icon: 'texture' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
                  filter === tab.id 
                    ? 'bg-[#3b1c59] text-white border-[#3b1c59]' 
                    : 'bg-white dark:bg-[#1e1635] text-gray-500 border-gray-200 dark:border-white/10 hover:border-[#3b1c59]/50'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* GRID */}
      <main className="max-w-5xl mx-auto p-6">
        {displayedItems.length === 0 ? (
          <div className="text-center py-20 opacity-50 flex flex-col items-center">
            <span className="material-symbols-outlined text-5xl mb-4">inventory_2</span>
            <p>No inventory items found. Add them in Sanity Studio!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item) => {
              const unit = getUnit(item.category);
              // Simple Low Stock Logic (Adjust thresholds as you like)
              const isLow = (unit === 'oz' && item.stockLevel < 2) || (unit === 'in' && item.stockLevel < 120);

              return (
                <div key={item.id} className="bg-white dark:bg-[#1e1635] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all group relative overflow-hidden">
                  
                  {/* Image Area */}
                  <div className="flex gap-4 items-start">
                    <div className="size-20 rounded-xl bg-gray-100 dark:bg-black/20 shrink-0 overflow-hidden relative">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <span className="material-symbols-outlined">image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Visibility Badge */}
                      <div className="flex justify-between items-start mb-1">
                         {item.isPublic ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#56a7a7] bg-[#56a7a7]/10 px-1.5 py-0.5 rounded">Public</span>
                         ) : (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Private</span>
                         )}
                      </div>
                      
                      <h3 className="font-bold text-lg leading-tight truncate text-[#3b1c59] dark:text-white group-hover:text-[#56a7a7] transition-colors">
                        {item.name}
                      </h3>
                      
                      {/* Thread Specific: Show Calibration */}
                      {item.category === 'thread' && item.yardsPerOz && (
                         <p className="text-[10px] opacity-60 font-mono mt-1">
                           Cal: {item.yardsPerOz} yd/oz
                         </p>
                      )}
                    </div>
                  </div>

                  {/* Stock Level */}
                  <div className="mt-6 bg-[#f6f6f8] dark:bg-black/20 rounded-xl p-3 flex items-center justify-between">
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Stock Level</p>
                        <p className={`text-xl font-bold font-mono ${isLow ? 'text-red-500' : 'text-[#3b1c59] dark:text-white'}`}>
                          {item.stockLevel} <span className="text-sm text-gray-400">{unit}</span>
                        </p>
                     </div>
                     
                     {/* Low Stock Indicator */}
                     {isLow ? (
                       <div className="flex items-center gap-1 text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                          <span className="material-symbols-outlined text-base">warning</span>
                          <span className="text-[10px] font-bold uppercase">Low</span>
                       </div>
                     ) : (
                       <div className="size-8 rounded-full bg-white dark:bg-[#1e1635] flex items-center justify-center text-[#56a7a7] shadow-sm">
                          <span className="material-symbols-outlined">check</span>
                       </div>
                     )}
                  </div>

                  {/* Decorative Bar based on Category */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 ${
                    item.category === 'thread' ? 'bg-[#56a7a7]' : 
                    item.category === 'batting' ? 'bg-[#cfae46]' : 'bg-[#3b1c59]'
                  }`}></div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}