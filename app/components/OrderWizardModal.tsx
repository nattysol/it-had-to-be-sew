"use client";

import React, { useEffect, useState, useTransition, useRef } from 'react';
import Image from 'next/image';
import { Order } from './RealDashboard'; 
import { updateOrderStatus, updateOrderTime } from '../actions';

interface ProjectWorkspaceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const ProjectWorkspaceModal = ({ order, isOpen, onClose }: ProjectWorkspaceModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Calculate Profit Metrics locally for the modal
  const financials = order ? (() => {
    const revenue = order.totalPrice || 0;
    const laborRate = 25; 
    const fabricCostPerUnit = 12; 
    const hours = (order.actualTimeSeconds || 0) / 3600;
    const fabric = parseFloat(order.actualFabricUsed || "0");
    const laborCost = hours * laborRate;
    const materialCost = fabric * fabricCostPerUnit;
    const totalCost = laborCost + materialCost;
    const profit = revenue - totalCost;
    const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(0) : 0;
    return { revenue, laborCost, materialCost, totalCost, profit, margin };
  })() : null;

  useEffect(() => {
    if (isOpen && order) {
      setSeconds(order.actualTimeSeconds || 0);
      const currentStatus = order.status.toLowerCase();
      if (currentStatus === 'in-progress' || currentStatus === 'in progress') {
        setIsTimerRunning(true);
      } else {
        setIsTimerRunning(false);
      }
    }
    return () => stopTimer();
  }, [isOpen, order]);

  useEffect(() => {
    if (isTimerRunning) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => { setSeconds(prev => prev + 1); }, 1000);
    } else { stopTimer(); }
    return () => stopTimer();
  }, [isTimerRunning]);

  const stopTimer = () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  
  const toggleStep = (step: string) => {
    setCompletedSteps(prev => prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]);
  };

  const handleMainAction = () => {
    if (!order?.id) return;
    startTransition(async () => {
      const currentStatus = order.status.toLowerCase();
      if (currentStatus === 'pending') {
        await updateOrderStatus(order.id, 'in-progress');
        setIsTimerRunning(true);
      } else if (currentStatus.includes('progress')) {
        setIsTimerRunning(false);
        await updateOrderTime(order.id, seconds); 
        await updateOrderStatus(order.id, 'completed');
      } else if (currentStatus === 'completed') {
        await updateOrderStatus(order.id, 'in-progress');
        setIsTimerRunning(true);
      }
    });
  };

  if (!isOpen || !order) return null;

  const isCompleted = order.status.toLowerCase() === 'completed';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#1e1635] w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl border border-slate-100 dark:border-[#2d2445] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COLUMN: VISUALS */}
        <div className="w-full md:w-1/3 bg-slate-50 dark:bg-[#151022] border-r border-slate-100 dark:border-[#2d2445] flex flex-col overflow-y-auto">
          <div className="relative h-56 w-full shrink-0 bg-slate-200">
            {order.img ? (
              <Image src={order.img} alt={order.pattern} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h4 className="font-bold text-lg leading-none drop-shadow-md">{order.clientName}</h4>
              <p className="text-sm opacity-90 drop-shadow-md mt-1">{order.pattern}</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* If Completed, show Customer Data Here */}
            {isCompleted ? (
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">person</span> 
                        Customer Details
                    </h3>
                    <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4 space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">mail</span>
                            <span className="font-semibold break-all">{order.customer?.email}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">call</span>
                            <span className="font-semibold">{order.customer?.phone}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">home</span>
                            <span className="font-semibold text-slate-600 dark:text-slate-300">
                                {order.customer?.address}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                // If Active, show Materials Checklist
                <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">inventory_2</span> 
                    Material Needs
                </h3>
                <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                    <span className="text-slate-500">Thread</span>
                    <span className="font-semibold">{order.thread}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-slate-500">Backing</span>
                    <span className="font-semibold">{order.backing}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-slate-500">Binding</span>
                    <span className="font-semibold">{order.binding}</span>
                    </div>
                </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/10">
                 <p className="text-[10px] text-slate-400 uppercase font-bold">Width</p>
                 <p className="font-bold text-lg">{order.dimensions.split('x')[0] || '?'}</p>
               </div>
               <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/10">
                 <p className="text-[10px] text-slate-400 uppercase font-bold">Height</p>
                 <p className="font-bold text-lg">{order.dimensions.split('x')[1] || '?'}</p>
               </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WORKSPACE or REPORT */}
        <div className="flex-1 flex flex-col h-full relative bg-white dark:bg-[#1e1635]">
           {/* Header */}
           <div className="p-6 border-b border-slate-100 dark:border-[#2d2445] flex justify-between items-center">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block ${
                  isCompleted ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {isCompleted ? 'Project Completed' : 'Workspace'}
                </span>
                <p className="text-xs text-slate-400">Order #{order.id.slice(0,6)}</p>
              </div>
              
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
           </div>

           {/* CONTENT BODY */}
           <div className="p-8 overflow-y-auto flex-1">
              
              {/* === VIEW 1: COMPLETED REPORT === */}
              {isCompleted && financials ? (
                  <div className="space-y-8 animate-in slide-in-from-bottom-4">
                      {/* Profitability Card */}
                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6">
                          <h2 className="text-lg font-bold font-serif mb-4 flex items-center gap-2">
                             <span className="material-symbols-outlined text-green-600">payments</span>
                             Profitability Report
                          </h2>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                              <div>
                                  <p className="text-xs text-slate-500 uppercase font-bold">Revenue</p>
                                  <p className="text-2xl font-bold text-slate-800 dark:text-white">${financials.revenue}</p>
                              </div>
                              <div>
                                  <p className="text-xs text-slate-500 uppercase font-bold">Total Cost</p>
                                  <p className="text-2xl font-bold text-slate-800 dark:text-white">${financials.totalCost.toFixed(2)}</p>
                              </div>
                              <div>
                                  <p className="text-xs text-slate-500 uppercase font-bold">Net Profit</p>
                                  <p className={`text-2xl font-bold ${financials.profit > 0 ? 'text-green-600' : 'text-red-500'}`}>${financials.profit.toFixed(2)}</p>
                              </div>
                              <div>
                                  <p className="text-xs text-slate-500 uppercase font-bold">Margin</p>
                                  <p className={`text-2xl font-bold ${financials.profit > 0 ? 'text-green-600' : 'text-red-500'}`}>{financials.margin}%</p>
                              </div>
                          </div>
                          
                          {/* Cost Breakdown Bar */}
                          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex">
                             <div className="bg-blue-400 h-full" style={{ width: `${(financials.laborCost / financials.revenue) * 100}%` }} title="Labor" />
                             <div className="bg-orange-400 h-full" style={{ width: `${(financials.materialCost / financials.revenue) * 100}%` }} title="Materials" />
                             <div className="bg-green-500 h-full flex-1" title="Profit" />
                          </div>
                          <div className="flex gap-4 mt-2 text-[10px] font-bold text-slate-500 uppercase">
                             <span className="flex items-center gap-1"><div className="size-2 rounded-full bg-blue-400"/> Labor (${financials.laborCost.toFixed(2)})</span>
                             <span className="flex items-center gap-1"><div className="size-2 rounded-full bg-orange-400"/> Materials (${financials.materialCost.toFixed(2)})</span>
                             <span className="flex items-center gap-1"><div className="size-2 rounded-full bg-green-500"/> Profit</span>
                          </div>
                      </div>

                      {/* Materials Used */}
                      <div>
                          <h2 className="text-lg font-bold font-serif mb-4">Materials Used</h2>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-4 border rounded-xl flex justify-between items-center">
                                 <span className="text-slate-500 font-bold text-sm">Time</span>
                                 <span className="font-mono font-bold text-lg">{formatTime(order.actualTimeSeconds || 0)}</span>
                             </div>
                             <div className="p-4 border rounded-xl flex justify-between items-center">
                                 <span className="text-slate-500 font-bold text-sm">Thread Used</span>
                                 <span className="font-mono font-bold text-lg">~ {Math.ceil((order.actualTimeSeconds || 0) / 100)} yds</span>
                             </div>
                          </div>
                      </div>
                  </div>
              ) : (
                /* === VIEW 2: ACTIVE WORKSPACE === */
                <div className="space-y-8 animate-in fade-in">
                    {/* Timer Big Display */}
                    <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between shadow-lg">
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Session Timer</p>
                            <p className="text-4xl font-mono font-bold">{formatTime(seconds)}</p>
                        </div>
                        <div className="size-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
                            <span className="material-symbols-outlined text-white">timer</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold font-serif mb-4">Project Notes</h2>
                        <textarea 
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#652bee] outline-none min-h-[100px] resize-none"
                        placeholder="Enter machine settings, thread tension notes, or client requests here..." 
                        />
                    </div>

                    <h2 className="text-xl font-bold font-serif mb-4">Workflow Steps</h2>
                    <div className="space-y-3">
                        {['Measure Top & Backing', 'Load Backing', 'Load Batting & Top', 'Baste', 'Quilt', 'Trim'].map((step, i) => (
                        <div 
                            key={i} 
                            onClick={() => toggleStep(step)}
                            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all group ${
                                completedSteps.includes(step) 
                                ? 'bg-[#652bee]/5 border-[#652bee] text-[#652bee]' 
                                : 'border-slate-100 dark:border-white/5 hover:bg-slate-50'
                            }`}
                        >
                            <div className={`size-6 rounded border-2 flex items-center justify-center transition-colors ${
                                completedSteps.includes(step) ? 'border-[#652bee] bg-[#652bee]' : 'border-slate-300'
                            }`}>
                                {completedSteps.includes(step) && <span className="material-symbols-outlined text-white text-sm">check</span>}
                            </div>
                            <span className={`font-semibold ${completedSteps.includes(step) ? 'line-through opacity-70' : 'text-slate-700 dark:text-slate-300'}`}>
                                {step}
                            </span>
                        </div>
                        ))}
                    </div>
                </div>
              )}
           </div>

           {/* FOOTER BUTTON */}
           <div className="p-6 border-t border-slate-100 dark:border-[#2d2445] bg-white dark:bg-[#1e1635]">
              <button 
                onClick={handleMainAction}
                disabled={isPending}
                className={`w-full py-4 rounded-xl shadow-xl text-lg font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]
                  ${isCompleted
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : order.status === 'in-progress'
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-600/30'
                      : 'bg-[#652bee] text-white hover:bg-[#5423c9] shadow-[#652bee/30]'
                  }
                `}
              >
                 {isPending ? (
                   <span className="material-symbols-outlined animate-spin">sync</span>
                 ) : (
                   <span className="material-symbols-outlined">
                     {order.status === 'pending' ? 'play_arrow' : order.status === 'in-progress' ? 'check_circle' : 'replay'}
                   </span>
                 )}
                 
                 {order.status === 'pending' ? 'Start Project' : 
                  order.status === 'in-progress' ? 'Finish & Save Time' : 
                  'Re-open Project'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};