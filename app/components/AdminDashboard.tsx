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
  battingLength: number;
  materialsAvailable?: boolean;
  lowStock?: boolean;
  img: string;
}

// --- SUB-COMPONENTS ---
const OrdersView = ({ orders, openOrder }: { orders: Order[], openOrder: (id: string) => void }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold font-display">Current Queue</h2>
      <button className="bg-[#652bee]/10 text-[#652bee] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#652bee]/20 transition-colors">
        Filter
      </button>
    </div>
    <div className="grid gap-6">
      {orders.map((order) => (
        <div 
          key={order.id}
          onClick={() => openOrder(order.id)}
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
          <div className="h-[150px] w-full relative opacity-90 group-hover:opacity-100 transition-opacity mt-[-20px]">
             <Image src={order.img} alt="Pattern" fill className="object-cover" sizes="(max-width: 600px) 100vw, 600px" />
             <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InventoryView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 p-4 rounded-xl flex items-start gap-3">
      <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">warning</span>
      <div>
        <h4 className="font-bold text-orange-900 dark:text-orange-100 text-sm">Low Stock Alert</h4>
        <p className="text-xs text-orange-800 dark:text-orange-200 mt-1">
          You only have enough batting for <strong>2 more quilts</strong>.
        </p>
      </div>
    </div>
    <div className="bg-white dark:bg-[#1e1635] p-6 rounded-2xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445]">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-500">spool</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Glide - Cool Grey</h3>
            <p className="text-xs text-slate-500 font-mono">Cone #42</p>
          </div>
        </div>
        <button className="text-[#652bee] text-sm font-bold flex items-center gap-1 hover:bg-[#652bee]/5 px-2 py-1 rounded-lg">
          <span className="material-symbols-outlined text-base">scale</span> Reconcile
        </button>
      </div>
      <div className="flex gap-4 items-end h-32 mb-2">
         <div className="w-12 h-full bg-slate-100 rounded-lg relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-[#652bee] h-[40%] transition-all duration-1000"></div>
         </div>
         <div className="flex-1 pb-2">
            <p className="text-3xl font-bold font-display">1,240 <span className="text-sm font-normal text-slate-400">yds</span></p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Remaining Capacity</p>
         </div>
      </div>
    </div>
  </div>
);

// --- MAIN SHELL ---
// 👇 THIS IS THE FIX: The export name now matches "DashboardShell"
export const AdminDashboard = ({ initialOrders }: { initialOrders: Order[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<'orders' | 'inventory'>('orders');

  const activeOrderId = searchParams.get('orderId');
  const selectedOrder = initialOrders.find(o => o.id === activeOrderId) || null;

  const openOrder = (id: string) => {
    router.push(`?orderId=${id}`, { scroll: false });
  };
  const closeOrder = () => {
    router.push('/admin/orders', { scroll: false });
  };

  return (
    <div className="flex min-h-screen bg-[#f6f6f8] dark:bg-[#151022] font-sans text-[#131118] dark:text-white">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#dedbe6] dark:border-[#332a4d] bg-white/50 dark:bg-[#1e1635]/50 backdrop-blur-xl fixed inset-y-0 z-20">
         <div className="p-6">
            <h1 className="text-xl font-bold font-display tracking-tight text-[#652bee]">It Had To Be Sew</h1>
         </div>
         <nav className="flex-1 px-4 space-y-2">
            <NavButton 
               icon="assignment" 
               label="Active Orders" 
               active={currentView === 'orders'} 
               onClick={() => setCurrentView('orders')} 
            />
            <NavButton 
               icon="inventory_2" 
               label="Inventory" 
               active={currentView === 'inventory'} 
               onClick={() => setCurrentView('inventory')} 
            />
            <div className="h-px bg-gray-200 dark:bg-white/10 my-4 mx-2"></div>
            <NavButton icon="group" label="Clients" active={false} onClick={() => {}} />
            <NavButton icon="settings" label="Settings" active={false} onClick={() => {}} />
         </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 md:ml-64 pb-32 md:pb-10">
         {/* Mobile Header */}
         <header className="sticky top-0 z-40 bg-[#f6f6f8]/80 dark:bg-[#151022]/80 backdrop-blur-md border-b border-[#dedbe6] dark:border-[#332a4d] md:hidden">
            <div className="flex items-center p-4 justify-between">
               <div className="flex items-center gap-3">
                  <div className="bg-[#652bee]/10 p-2 rounded-lg">
                     <span className="material-symbols-outlined text-[#652bee]">{currentView === 'orders' ? 'grid_view' : 'inventory_2'}</span>
                  </div>
                  <h1 className="text-xl font-bold font-display tracking-tight capitalize">{currentView}</h1>
               </div>
            </div>
         </header>

         {/* Desktop Header */}
         <header className="hidden md:flex items-center justify-between p-8 pb-4">
             <h2 className="text-3xl font-bold font-display capitalize">{currentView} Dashboard</h2>
             <div className="flex items-center gap-4">
                <span className="text-sm font-bold opacity-60">Admin User</span>
                <div className="size-10 bg-gray-200 rounded-full"></div>
             </div>
         </header>

         <div className="p-4 md:p-8 max-w-4xl mx-auto">
            {currentView === 'orders' ? (
               <OrdersView orders={initialOrders} openOrder={openOrder} />
            ) : (
               <InventoryView />
            )}
         </div>
      </main>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1e1635]/95 backdrop-blur-md border-t border-[#dedbe6] dark:border-[#332a4d] pb-8 pt-3 px-6 z-50 md:hidden flex justify-between items-center">
         <MobileNavItem icon="assignment" label="Orders" active={currentView === 'orders'} onClick={() => setCurrentView('orders')} />
         <MobileNavItem icon="inventory_2" label="Stock" active={currentView === 'inventory'} onClick={() => setCurrentView('inventory')} />
         <MobileNavItem icon="group" label="Clients" active={false} onClick={() => {}} />
         <MobileNavItem icon="settings" label="Setup" active={false} onClick={() => {}} />
      </nav>

      {/* MODAL */}
      <ProjectWorkspaceModal order={selectedOrder} isOpen={!!selectedOrder} onClose={closeOrder} />
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
      active ? 'bg-[#652bee] text-white shadow-lg shadow-[#652bee]/20' : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5'
    }`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    {label}
  </button>
);

const MobileNavItem = ({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-[#652bee]' : 'text-slate-400'}`}>
     <span className={`material-symbols-outlined ${active ? 'fill-current' : ''}`}>{icon}</span>
     <span className="text-[10px] font-bold">{label}</span>
  </button>
);