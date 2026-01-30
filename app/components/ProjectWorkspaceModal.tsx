"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
// Reuse the Order type from your Dashboard
import { Order } from './RealDashboard'; 

interface ProjectWorkspaceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectWorkspaceModal = ({ order, isOpen, onClose }: ProjectWorkspaceModalProps) => {
  // Prevent scrolling the background when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return (
    // 1. BACKDROP OVERLAY (Dark background behind modal)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose} // Close if clicking outside
    >
      {/* 2. MODAL CARD (The actual white box) */}
      <div 
        className="bg-white dark:bg-[#1e1635] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-100 dark:border-[#2d2445] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Don't close if clicking inside
      >
        
        {/* LEFT COLUMN: Image & Quick Stats */}
        <div className="w-full md:w-1/3 bg-slate-50 dark:bg-[#151022] border-r border-slate-100 dark:border-[#2d2445] flex flex-col">
          <div className="relative h-48 md:h-64 w-full">
            {order.img ? (
              <Image 
                src={order.img} 
                alt={order.pattern} 
                fill 
                className="object-cover" 
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
            )}
            <div className="absolute top-4 left-4">
               <span className="bg-white/90 text-slate-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
                 {order.id}
               </span>
            </div>
          </div>
          
          <div className="p-6 space-y-4 overflow-y-auto">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Dimensions</h4>
              <p className="font-semibold text-slate-700 dark:text-slate-200">{order.dimensions}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Batting</h4>
              <p className="font-semibold text-slate-700 dark:text-slate-200">{order.battingLength} inches required</p>
            </div>
            
            <div className={`p-3 rounded-lg border ${order.materialsAvailable ? 'bg-green-50 border-green-100 text-green-800' : 'bg-yellow-50 border-yellow-100 text-yellow-800'}`}>
              <div className="flex items-center gap-2 mb-1">
                 <span className="material-symbols-outlined text-lg">
                    {order.materialsAvailable ? 'check_circle' : 'inventory_2'}
                 </span>
                 <span className="font-bold text-sm">Inventory Status</span>
              </div>
              <p className="text-xs opacity-90">
                {order.materialsAvailable ? 'All materials reserved and ready.' : 'Waiting on backing fabric.'}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Action Area */}
        <div className="flex-1 flex flex-col h-full relative">
           {/* Header */}
           <div className="p-6 border-b border-slate-100 dark:border-[#2d2445] flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#131118] dark:text-white">{order.clientName}</h2>
                <p className="text-slate-500 text-sm mt-1">{order.pattern}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
           </div>

           {/* Content (Scrollable) */}
           <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="border border-slate-200 dark:border-[#332a4d] p-4 rounded-xl hover:border-[#652bee] cursor-pointer transition-colors group">
                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#652bee] mb-2">straighten</span>
                    <h3 className="font-bold text-sm">Measure Top</h3>
                    <p className="text-xs text-slate-500">Confirm dimensions</p>
                 </div>
                 <div className="border border-slate-200 dark:border-[#332a4d] p-4 rounded-xl hover:border-[#652bee] cursor-pointer transition-colors group">
                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#652bee] mb-2">photo_camera</span>
                    <h3 className="font-bold text-sm">Intake Photos</h3>
                    <p className="text-xs text-slate-500">Add to gallery</p>
                 </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl">
                 <h3 className="font-bold text-sm mb-3">Project Notes</h3>
                 <textarea 
                   className="w-full bg-transparent text-sm border-none focus:ring-0 p-0 text-slate-600 resize-none h-24"
                   placeholder="Add notes about thread choice, client requests, or issues here..." 
                 />
              </div>
           </div>

           {/* Footer */}
           <div className="p-6 border-t border-slate-100 dark:border-[#2d2445] bg-slate-50/50 dark:bg-[#151022]/50">
              <button className="w-full bg-[#652bee] hover:bg-[#5423c9] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#652bee]/20 transition-all transform active:scale-[0.98]">
                 Start Quilting Phase
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};