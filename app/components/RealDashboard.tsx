"use client";

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProjectWorkspaceModal } from './ProjectWorkspaceModal';
import { updateInventoryStock, createInventoryItem } from '../actions'; 

// --- TYPES ---
export interface Order {
  id: string;
  clientName: string;
  // Customer info for the completed view report
  customer?: {
    email: string;
    phone: string;
    address: string;
  };
  pattern: string;
  dimensions: string;
  dueDate: string;
  status: string;
  backing?: string;
  binding?: string;
  thread?: string;
  totalPrice?: number;
  actualFabricUsed?: string; 
  actualTimeSeconds?: number;
  battingLength: number;
  materialsAvailable?: boolean;
  lowStock?: boolean;
  img: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  totalLength?: number; // Physics
  totalWeight?: number; // Physics
  isLowStock: boolean;
  imageUrl?: string;
}

// --- HELPER: Profit Calculator ---
const getProfitMetrics = (order: Order) => {
  const revenue = order.totalPrice || 0;
  // Configurable rates (You can move these to Sanity later)
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

// --- SUB-COMPONENT: Add Inventory Modal ---
const AddInventoryModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'thread', 
    quantity: 1, 
    unit: 'units',
    length: '', 
    weight: ''  
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await createInventoryItem(formData);
      onClose();
      // Reset Form
      setFormData({ name: '', category: 'thread', quantity: 1, unit: 'units', length: '', weight: '' });
    });
  };

  // UX Fix: Inputs use 'text-base' (16px) on mobile to prevent iOS auto-zoom
  const inputBaseClass = "w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-[#131118] dark:text-white outline-none focus:ring-2 focus:ring-[#652bee] text-base md:text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#1e1635] w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
         <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-lg text-[#131118] dark:text-white">Add Inventory Item</h3>
             <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
         </div>
         
         <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div>
               <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Product Name</label>
               <input 
                 required
                 autoFocus
                 className={inputBaseClass}
                 placeholder="e.g. Glide - Red Pepper"
                 value={formData.name}
                 onChange={e => setFormData({...formData, name: e.target.value})}
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Category</label>
                 <select 
                    className={inputBaseClass}
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                 >
                    <option value="thread">Thread</option>
                    <option value="batting">Batting</option>
                    <option value="backing">Backing</option>
                    <option value="notion">Notion</option>
                 </select>
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Stock Count</label>
                 <input 
                   type="number"
                   className={inputBaseClass}
                   placeholder="e.g. 5"
                   value={formData.quantity}
                   onChange={e => setFormData({...formData, quantity: Number(e.target.value)})}
                 />
               </div>
            </div>

            {/* Physics Section (For MRP Calculations) */}
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 space-y-3">
                <p className="text-xs font-bold text-[#652bee] uppercase tracking-wide flex items-center gap-1">
                   <span className="material-symbols-outlined text-sm">scale</span> Usage Data (Per Unit)
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Full Length</label>
                        <div className="flex items-center gap-2">
                           <input 
                             type="number"
                             className={`${inputBaseClass} py-2`}
                             placeholder="5000"
                             value={formData.length}
                             onChange={e => setFormData({...formData, length: e.target.value})}
                           />
                           <span className="text-xs font-bold text-slate-400">yds</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Full Weight</label>
                        <div className="flex items-center gap-2">
                           <input 
                             type="number"
                             className={`${inputBaseClass} py-2`}
                             placeholder="100"
                             value={formData.weight}
                             onChange={e => setFormData({...formData, weight: e.target.value})}
                           />
                           <span className="text-xs font-bold text-slate-400">g</span>
                        </div>
                    </div>
                </div>
                <p className="text-[10px] text-slate-400 italic leading-tight">
                    Used to auto-calculate remaining stock when you finish a project.
                </p>
            </div>

            <button 
              disabled={isPending} 
              className="w-full bg-[#652bee] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#5423c9] disabled:opacity-50 transition-colors"
            >
              {isPending ? 'Saving to Inventory...' : 'Add Item'}
            </button>
         </form>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Orders List ---
const OrdersView = ({ orders, openOrder, showCompleted }: { orders: Order[], openOrder: (id: string) => void, showCompleted: boolean }) => {
  const displayOrders = orders.filter(o => {
    const status = o.status.toLowerCase();
    return showCompleted ? status === 'completed' : status !== 'completed';
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-0">
      <div className="grid gap-6">
        {displayOrders.length === 0 && (
          <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            {showCompleted ? "No completed jobs history." : "Active queue is empty!"}
          </div>
        )}

        {displayOrders.map((order) => {
          const financials = getProfitMetrics(order);
          const status = order.status.toLowerCase();

          return (
            <div 
              key={order.id}
              onClick={() => openOrder(order.id)}
              className="bg-white dark:bg-[#1e1635] rounded-xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445] overflow-hidden cursor-pointer active:scale-[0.98] md:hover:shadow-md transition-all group relative"
            >
              <div className="p-5 relative z-10 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block ${
                      status === 'completed' ? 'bg-green-100 text-green-800' : 
                      (status === 'in-progress' || status === 'in progress') ? 'bg-purple-100 text-purple-700' :
                      'bg-[#652bee]/10 text-[#652bee]'
                    }`}>
                      {status === 'in-progress' || status === 'in progress' ? 'In Progress' : order.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-tight text-slate-900 dark:text-white">
                    {order.clientName}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500 mt-1">
                    <span className="material-symbols-outlined text-base">content_cut</span>
                    <p className="text-xs font-bold uppercase tracking-wider">{order.pattern}</p>
                  </div>
                </div>

                {showCompleted ? (
                   <div className="flex items-center justify-between md:justify-end gap-4 bg-slate-50 dark:bg-black/20 p-3 rounded-lg border border-slate-100 dark:border-white/5 mt-2 md:mt-0">
                      <div>
                         <p className="text-[10px] uppercase text-slate-400 font-bold">Profit</p>
                         <p className={`font-bold ${financials.isProfitable ? 'text-green-600' : 'text-red-500'}`}>
                           ${financials.profit}
                         </p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold ${financials.isProfitable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                         {financials.margin}%
                      </div>
                   </div>
                ) : (
                  <div className="flex items-center mt-2 md:mt-0">
                      <div className="bg-[#2D5A27]/10 text-[#2D5A27] flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2D5A27]/20">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span className="text-xs font-semibold">Ready</span>
                      </div>
                  </div>
                )}
              </div>
              
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

// --- SUB-COMPONENT: Inventory List ---
const InventoryView = ({ items }: { items: InventoryItem[] }) => {
  const [isPending, startTransition] = useTransition();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAdjustStock = (id: string, currentQty: number, change: number) => {
    startTransition(async () => {
      const newQty = Math.max(0, currentQty + change);
      await updateInventoryStock(id, newQty);
    });
  };

  const lowStockItems = items.filter(i => i.isLowStock);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-0">
      
      {/* ALERT BOX */}
      {lowStockItems.length > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 p-4 rounded-xl flex items-start gap-3">
          <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">warning</span>
          <div>
            <h4 className="font-bold text-orange-900 dark:text-orange-100 text-sm">Low Stock Alert</h4>
            <p className="text-xs text-orange-800 dark:text-orange-200 mt-1">
              Restock needed: <strong>{lowStockItems.map(i => i.name).join(', ')}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* ADD ITEM BUTTON */}
        <button 
           onClick={() => setIsAddOpen(true)}
           className="border-2 border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-500 hover:border-[#652bee] hover:text-[#652bee] hover:bg-[#652bee]/5 transition-all min-h-[140px] active:scale-95 group"
        >
           <div className="size-10 rounded-full bg-slate-200 group-hover:bg-[#652bee]/20 flex items-center justify-center mb-2 transition-colors">
              <span className="material-symbols-outlined text-[#131118] group-hover:text-[#652bee]">add</span>
           </div>
           <span className="font-bold text-sm">Add New Item</span>
        </button>

        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-[#1e1635] p-5 rounded-2xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445] relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center overflow-hidden relative border border-slate-100">
                   {item.imageUrl ? (
                     <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                   ) : (
                     <span className="material-symbols-outlined text-slate-500">
                       {item.category === 'thread' ? 'spool' : item.category === 'batting' ? 'layers' : 'inventory_2'}
                     </span>
                   )}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">{item.name}</h3>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{item.category}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-end relative z-10">
               <div className="flex-1">
                  {/* Shows decimal only if not a whole number */}
                  <p className={`text-2xl font-bold font-display ${item.isLowStock ? 'text-orange-500' : 'text-slate-900 dark:text-white'}`}>
                    {item.quantity % 1 === 0 ? item.quantity : item.quantity.toFixed(2)} <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                  </p>
               </div>
               
               <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 rounded-lg p-1">
                 <button onClick={() => handleAdjustStock(item.id, item.quantity, -1)} disabled={isPending} className="size-8 flex items-center justify-center rounded-md bg-white dark:bg-[#1e1635] shadow-sm hover:text-red-500 disabled:opacity-50">
                   -
                 </button>
                 <button onClick={() => handleAdjustStock(item.id, item.quantity, 1)} disabled={isPending} className="size-8 flex items-center justify-center rounded-md bg-white dark:bg-[#1e1635] shadow-sm hover:text-green-500 disabled:opacity-50">
                   +
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* RENDER MODAL */}
      <AddInventoryModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export const AdminDashboard = ({ 
  initialOrders, 
  initialInventory 
}: { 
  initialOrders: Order[], 
  initialInventory?: InventoryItem[] 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<'queue' | 'inventory'>('queue');
  const [showCompleted, setShowCompleted] = useState(false);

  // Modal Logic
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
      
      {/* 1. MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-[#1e1635] border-b border-slate-200 dark:border-white/5 p-4 shadow-sm">
         <div className="flex items-center gap-3 mb-4">
            <div className="relative size-8 rounded-full overflow-hidden border border-slate-100">
               <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-serif font-bold text-lg text-[#131118] dark:text-white">It Had To Be Sew</span>
         </div>

         {/* Context-Aware Controls */}
         {currentView === 'queue' ? (
           <div className="flex bg-slate-100 dark:bg-white/10 p-1 rounded-xl">
              <button onClick={() => setShowCompleted(false)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!showCompleted ? 'bg-white shadow-sm text-black' : 'text-slate-500'}`}>Active Queue</button>
              <button onClick={() => setShowCompleted(true)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${showCompleted ? 'bg-white shadow-sm text-black' : 'text-slate-500'}`}>History</button>
           </div>
         ) : (
           <div className="flex justify-between items-center">
             <h2 className="font-bold text-lg">Inventory</h2>
             <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">{initialInventory?.length || 0} items</span>
           </div>
         )}
      </header>

      {/* 2. DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#dedbe6] dark:border-[#332a4d] bg-white/50 dark:bg-[#1e1635]/50 backdrop-blur-xl fixed inset-y-0 z-20">
         <div className="p-6 flex items-center gap-3">
            <div className="relative size-8 rounded-full overflow-hidden border border-slate-100">
               <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <h1 className="text-lg font-bold font-serif tracking-tight text-[#652bee]">It Had To Be Sew</h1>
         </div>
         <nav className="flex-1 px-4 space-y-2">
            <button onClick={() => setCurrentView('queue')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentView === 'queue' ? 'bg-[#652bee] text-white shadow-lg shadow-[#652bee]/20' : 'text-slate-500 hover:bg-black/5'}`}>
              <span className="material-symbols-outlined">assignment</span>
              Orders
            </button>
            <button onClick={() => setCurrentView('inventory')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentView === 'inventory' ? 'bg-[#652bee] text-white shadow-lg shadow-[#652bee]/20' : 'text-slate-500 hover:bg-black/5'}`}>
              <span className="material-symbols-outlined">inventory_2</span>
              Inventory
            </button>
         </nav>
      </aside>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 md:ml-64 pb-32 pt-36 md:pt-10 md:pb-10">
         <header className="hidden md:flex items-center justify-between p-8 pb-4">
             <div className="flex items-center gap-4">
               <h2 className="text-3xl font-bold font-display capitalize text-slate-900 dark:text-white">
                 {currentView === 'inventory' ? 'Inventory Manager' : (showCompleted ? 'Financial History' : 'Active Queue')}
               </h2>
               {currentView === 'queue' && (
                 <div className="flex bg-slate-200 dark:bg-white/10 p-1 rounded-lg">
                    <button onClick={() => setShowCompleted(false)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!showCompleted ? 'bg-white shadow-sm text-black' : 'text-slate-500'}`}>Active</button>
                    <button onClick={() => setShowCompleted(true)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${showCompleted ? 'bg-white shadow-sm text-black' : 'text-slate-500'}`}>Completed</button>
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
               <InventoryView items={initialInventory || []} />
            )}
         </div>
      </main>

      {/* 4. MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around md:hidden z-30 pb-safe">
          <button 
             onClick={() => setCurrentView('queue')} 
             className={`flex flex-col items-center gap-1 p-2 ${currentView === 'queue' ? 'text-[#652bee]' : 'text-slate-400'}`}
          >
             <span className="material-symbols-outlined">assignment</span>
             <span className="text-[10px] font-bold">Orders</span>
          </button>
          <button 
             onClick={() => setCurrentView('inventory')} 
             className={`flex flex-col items-center gap-1 p-2 ${currentView === 'inventory' ? 'text-[#652bee]' : 'text-slate-400'}`}
          >
             <span className="material-symbols-outlined">inventory_2</span>
             <span className="text-[10px] font-bold">Stock</span>
          </button>
      </nav>

      <ProjectWorkspaceModal order={selectedOrder} isOpen={!!selectedOrder} onClose={closeOrder} />
    </div>
  );
};