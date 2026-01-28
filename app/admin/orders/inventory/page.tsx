"use client";

import React, { useState } from 'react';

export default function InventoryManager() {
  const [activeTab, setActiveTab] = useState('thread');

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#151022] text-[#131118] dark:text-white pb-24">
      {/* Header */}
      <header className="p-6 border-b border-gray-200 dark:border-white/10 sticky top-0 bg-inherit z-10 flex justify-between items-center">
        <h1 className="font-serif text-2xl">Inventory</h1>
        <button className="bg-[#652bee] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-sm">add</span> Add Item
        </button>
      </header>

      {/* Tabs */}
      <div className="p-4 flex gap-4 overflow-x-auto">
        {['thread', 'batting', 'fabric'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${
              activeTab === tab 
              ? 'bg-[#131118] dark:bg-white text-white dark:text-[#131118]' 
              : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Inventory Grid */}
      <main className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Example Thread Card */}
        <div className="bg-white dark:bg-[#1e1635] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 relative group">
          <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
             {/* This would be the Sanity Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://cdn.sanity.io/images/...)'}} />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md">
              4.2 oz
            </div>
          </div>
          
          <h3 className="font-bold text-sm leading-tight">Glide - Cool Grey</h3>
          <p className="text-xs opacity-60 mt-1">~4,200 yards remaining</p>

          {/* Quick Edit Overlay */}
          <button className="absolute top-2 right-2 bg-white dark:bg-black text-[#131118] dark:text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
             <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>
        
        {/* ... Map over your Sanity data here ... */}
      </main>
    </div>
  );
}