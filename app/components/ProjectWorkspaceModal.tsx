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
  
  // Timer State
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Workflow State (Local only for now)
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // 1. INITIALIZE ON OPEN
  useEffect(() => {
    if (isOpen && order) {
      setSeconds(order.actualTimeSeconds || 0);
      
      // Check status safely (lowercase comparison)
      const currentStatus = order.status.toLowerCase();
      if (currentStatus === 'in-progress' || currentStatus === 'in progress') {
        setIsTimerRunning(true);
      } else {
        setIsTimerRunning(false);
      }
    }
    
    // Cleanup on close
    return () => stopTimer();
  }, [isOpen, order]);

  // 2. TIMER ENGINE
  useEffect(() => {
    if (isTimerRunning) {
      // Clear any existing interval just in case
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      
      // Start ticking
      timerIntervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isTimerRunning]);

  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  // 3. WORKFLOW HANDLER
  const toggleStep = (step: string) => {
    setCompletedSteps(prev => 
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    );
  };

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  if (!isOpen || !order) return null;

  // 4. MAIN BUTTON ACTIONS
  const handleMainAction = () => {
    if (!order.id) return;

    startTransition(async () => {
      const currentStatus = order.status.toLowerCase();

      // START
      if (currentStatus === 'pending') {
        await updateOrderStatus(order.id, 'in-progress');
        setIsTimerRunning(true);
      } 
      // PAUSE / FINISH
      else if (currentStatus === 'in-progress' || currentStatus === 'in progress') {
        setIsTimerRunning(false);
        await updateOrderTime(order.id, seconds); // Save the time
        await updateOrderStatus(order.id, 'completed');
      }
      // RESTART
      else if (currentStatus === 'completed') {
        await updateOrderStatus(order.id, 'in-progress');
        setIsTimerRunning(true);
      }
    });
  };

  // Manual Play/Pause Button
  const toggleTimerManual = async () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      await updateOrderTime(order.id, seconds); // Save progress when pausing
    } else {
      setIsTimerRunning(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#1e1635] w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl border border-slate-100 dark:border-[#2d2445] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COLUMN */}
        <div className="w-full md:w-1/3 bg-slate-50 dark:bg-[#151022] border-r border-slate-100 dark:border-[#2d2445] flex flex-col overflow-y-auto">
          <div className="relative h-56 w-full shrink-0 bg-slate-200">
            {order.img ? (
              <Image src={order.img} alt={order.pattern} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Pattern Image</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h4 className="font-bold text-lg leading-none drop-shadow-md">{order.clientName}</h4>
              <p className="text-sm opacity-90 drop-shadow-md">{order.pattern}</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">inventory_2</span> 
                Materials
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

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col h-full relative bg-white dark:bg-[#1e1635]">
           <div className="p-6 border-b border-slate-100 dark:border-[#2d2445] flex justify-between items-center">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block ${
                  order.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                  order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                  'bg-slate-100 text-slate-600'
                }`}>
                  {order.status === 'in-progress' ? 'In Progress' : order.status}
                </span>
                <p className="text-xs text-slate-400">Order #{order.id.slice(0,6)}</p>
              </div>
              
              {/* TIMER */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-black/20 px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10">
                 <div className={`size-3 rounded-full ${isTimerRunning ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                 <span className="text-2xl font-mono font-bold tracking-widest text-slate-700 dark:text-white">
                   {formatTime(seconds)}
                 </span>
                 <button onClick={toggleTimerManual} className="ml-2 text-slate-400 hover:text-slate-600">
                   <span className="material-symbols-outlined text-lg">
                     {isTimerRunning ? 'pause' : 'play_arrow'}
                   </span>
                 </button>
              </div>

              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
           </div>

           <div className="p-8 overflow-y-auto flex-1">
              <div className="mb-6">
                 <h2 className="text-xl font-bold font-serif mb-4">Project Notes</h2>
                 <textarea 
                   className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#652bee] outline-none min-h-[100px] resize-none"
                   placeholder="Enter machine settings..." 
                 />
              </div>

              <h2 className="text-xl font-bold font-serif mb-4">Workflow</h2>
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

           <div className="p-6 border-t border-slate-100 dark:border-[#2d2445] bg-white dark:bg-[#1e1635]">
              <button 
                onClick={handleMainAction}
                disabled={isPending}
                className={`w-full py-4 rounded-xl shadow-xl text-lg font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]
                  ${order.status === 'completed' 
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