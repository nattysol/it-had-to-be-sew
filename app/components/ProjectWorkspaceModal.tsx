"use client";

import React, { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import { Order } from './RealDashboard'; 
// 👇 Import the Server Action we just created
import { updateOrderStatus } from '../actions';

interface ProjectWorkspaceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectWorkspaceModal = ({ order, isOpen, onClose }: ProjectWorkspaceModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [justUpdated, setJustUpdated] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else {
      document.body.style.overflow = 'unset';
      setJustUpdated(false); // Reset state when closing
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  // ⚡️ THE ACTION HANDLER
  const handleStatusChange = () => {
    if (!order.id) return;
    
    // Determine next status (Simple logic for now)
    const nextStatus = order.status === 'completed' ? 'pending' : 'completed';

    startTransition(async () => {
      await updateOrderStatus(order.id, nextStatus);
      setJustUpdated(true);
      // Optional: Close modal after a brief delay
      // setTimeout(onClose, 1000); 
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#1e1635] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-100 dark:border-[#2d2445] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COLUMN */}
        <div className="w-full md:w-1/3 bg-slate-50 dark:bg-[#151022] border-r border-slate-100 dark:border-[#2d2445] flex flex-col">
          <div className="relative h-48 md:h-64 w-full">
            {order.img ? (
              <Image src={order.img} alt={order.pattern} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
            )}
             {/* Current Status Badge */}
            <div className="absolute top-4 left-4">
               <span className={`text-xs font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider ${
                 order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-white/90 text-slate-800'
               }`}>
                 {order.status}
               </span>
            </div>
          </div>
          
          <div className="p-6 space-y-4 overflow-y-auto">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Dimensions</h4>
              <p className="font-semibold text-slate-700 dark:text-slate-200">{order.dimensions}</p>
            </div>
            <div>
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</h4>
               <p className="font-semibold text-slate-700 dark:text-slate-200">
                 {new Date(order.dueDate).toLocaleDateString()}
               </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col h-full relative">
           <div className="p-6 border-b border-slate-100 dark:border-[#2d2445] flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#131118] dark:text-white">{order.clientName}</h2>
                <p className="text-slate-500 text-sm mt-1">{order.pattern}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
           </div>

           <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl">
                 <h3 className="font-bold text-sm mb-3">Project Notes</h3>
                 <textarea 
                   className="w-full bg-transparent text-sm border-none focus:ring-0 p-0 text-slate-600 resize-none h-24"
                   placeholder="Add notes..." 
                 />
              </div>
           </div>

           {/* FOOTER ACTION */}
           <div className="p-6 border-t border-slate-100 dark:border-[#2d2445] bg-slate-50/50 dark:bg-[#151022]/50">
              <button 
                onClick={handleStatusChange}
                disabled={isPending}
                className={`w-full font-bold py-3 rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2
                  ${justUpdated 
                    ? 'bg-green-600 text-white shadow-green-600/20' 
                    : 'bg-[#652bee] hover:bg-[#5423c9] text-white shadow-[#652bee]/20'
                  }
                  ${isPending ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                 {isPending ? (
                   <>
                     <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                     Updating...
                   </>
                 ) : justUpdated ? (
                    <>
                      <span className="material-symbols-outlined text-lg">check</span>
                      Updated!
                    </>
                 ) : (
                    order.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'
                 )}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};