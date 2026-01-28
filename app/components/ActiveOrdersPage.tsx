import React, { useState } from 'react';
import { ProjectWorkspaceModal } from './ProjectWorkspaceModal';

// 1. Define the shape of an Order
interface Order {
  id: string;
  clientName: string;
  pattern: string;
  dimensions: string;
  dueDate: string;
  status: string;
  battingLength: number;
  img: string;
  // These are optional (?) because some orders have one, some have the other
  materialsAvailable?: boolean;
  lowStock?: boolean;
}

// Mock Data
const ORDERS: Order[] = [
  {
    id: '1',
    clientName: 'Sarah Jenkins',
    pattern: 'Double Wedding Ring Pattern',
    dimensions: '90" x 108" (King)',
    dueDate: 'Oct 15, 2023',
    status: 'Ready to Start',
    materialsAvailable: true,
    battingLength: 116,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_HqKkuCBrJwbjY3mge7yW_U0R4iUtOagTMrSi7dl19NcGPO1a-Pk7QqlgkaK-WdceT0jSZNyKLLuyuDVv6qqPQ16j5eDjila0piC4Xea-94eLs64raal1xoYy4uaNfmV2HCv6VlGa8e42I07zJlkzlyNwegdMANICVfHPjrFXo4jdb9FscmnxPlu1O5UoRsl9RmvQkwJ98ro9Nu2ym-VWqMKiYaatlKclOCCQJKEnxs2_11slDn18BcPX9oxGVXHmdbZzzp2fWwXz' 
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    pattern: 'Modern Log Cabin',
    dimensions: '60" x 60" (Throw)',
    dueDate: 'Oct 22, 2023',
    status: 'In Progress',
    lowStock: true,
    battingLength: 68,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFWnlJEyMLmxK9aw1caoPLWRcLp_a2G_7E6-mfUuvbHJrNzrzNE2zXeo70RwPbjKk0t9QV7_2NyXFANVPhmzbldxyRAT40VOZ1TvenJHUJqHFtLvj84tkpGjDyr_g_22lw42bfRDyquZVcQq_lkvMAkIerdApkKa-yMxh9LGab2AOUE4TKlDNrrrNNn5oJgV-aHy_550trlfF6cN-478eLYgdU6WgKMq7kvJop3aDbDhxXjTsd9UgxqaiWx1cC-vKpmqiLrPglbS0H'
  }
];

export default function ActiveOrdersPage() {
  // 2. Fix the useState generic here: <Order | null>
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#151022] min-h-screen pb-24 font-sans text-[#131118] dark:text-white">
      
      {/* --- HEADER (From your HTML) --- */}
      <header className="sticky top-0 z-40 bg-[#f6f6f8]/80 dark:bg-[#151022]/80 backdrop-blur-md border-b border-[#dedbe6] dark:border-[#332a4d]">
        <div className="flex items-center p-4 justify-between max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-[#652bee]/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-[#652bee]">grid_view</span>
            </div>
            <h1 className="text-xl font-bold font-display tracking-tight">Active Orders</h1>
          </div>
          {/* ... Search Buttons ... */}
        </div>
      </header>

      {/* --- MAIN LIST --- */}
      <main className="max-w-xl mx-auto p-4 space-y-6">
        <h2 className="text-lg font-bold font-display">Current Queue</h2>

        <div className="grid gap-6">
          {ORDERS.map((order) => (
            <div 
              key={order.id}
              onClick={() => setSelectedOrder(order)} // CLICK TRIGGER
              className="bg-white dark:bg-[#1e1635] rounded-xl shadow-sm border border-[#f0f0f2] dark:border-[#2d2445] overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
            >
              <div className="p-5">
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
                  
                  {/* Stock Warning Badge */}
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
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="material-symbols-outlined text-lg">straighten</span>
                    <p className="text-sm">{order.dimensions}</p>
                  </div>
                </div>

                <button className="w-full bg-[#652bee] text-white py-3 rounded-xl font-bold text-sm">
                  {order.status === 'In Progress' ? 'Resume Work' : 'Start Quilting'}
                </button>
              </div>
              
              {/* Image Preview */}
              <div 
                className="h-[150px] w-full bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity" 
                style={{ backgroundImage: `url('${order.img}')` }}
              />
            </div>
          ))}
        </div>
      </main>

      {/* --- THE MODAL (Injected Here) --- */}
      <ProjectWorkspaceModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />

    </div>
  );
}