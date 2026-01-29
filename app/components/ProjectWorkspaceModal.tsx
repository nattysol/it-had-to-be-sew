"use client";

import React, { useState, useEffect, useMemo } from 'react';
// 👇 1. COMMENT THIS IMPORT OUT
// import { completeOrder } from '../../app/actions'; 

// --- Types ---
interface Order {
  id: string;
  clientName: string;
  pattern: string;
  dimensions: string; 
  dueDate: string;
  status: string;
  battingLength: number;
  materialsAvailable?: boolean;
  lowStock?: boolean;
  img?: string;
  totalPrice?: number;
  actualTimeSeconds?: number;
  efficiencyMetrics?: {
    speed: number;
    scrap: string;
  };
}

interface ProjectWorkspaceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectWorkspaceModal = ({ order, isOpen, onClose }: ProjectWorkspaceModalProps) => {
  if (!isOpen || !order) return null;

  const [phase, setPhase] = useState<'pre' | 'active' | 'paused' | 'reconcile'>('pre');
  const [secondsElapsed, setSecondsElapsed] = useState(0); 
  const [reconcileData, setReconcileData] = useState({ actualFabricUsed: '', battingScrap: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'active') {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase]);

  const getTimeParts = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return { hrs, mins, secs };
  };
  const { hrs, mins, secs } = getTimeParts(secondsElapsed);

  const metrics = useMemo(() => {
    try {
      const dims = order.dimensions.match(/\d+/g)?.map(Number);
      if (!dims || dims.length < 2) return { area: 0, threadNeeded: 0, battingNeeded: 0, speed: 0 };
      const [w, h] = dims;
      const area = w * h;
      return { 
        area, 
        threadNeeded: Math.ceil((area * 3.5) / 36),
        battingNeeded: h + 8,
        speed: Math.round(area / Math.max(secondsElapsed / 3600, 0.1))
      };
    } catch (e) {
      return { area: 0, threadNeeded: 0, battingNeeded: 0, speed: 0 };
    }
  }, [order.dimensions, secondsElapsed]);

  // Handlers
  const handleStart = () => setPhase('active');
  const handlePause = () => setPhase(phase === 'active' ? 'paused' : 'active');
  const handleStop = () => setPhase('reconcile');
  
  const handleFinalize = async () => {
    setIsSaving(true);
    
    // 👇 2. COMMENT THIS LOGIC OUT SO IT DOESN'T CRASH
    /*
    const result = await completeOrder(order.id, {
      finalTimeSeconds: secondsElapsed,
      actualFabricUsed: reconcileData.actualFabricUsed,
      battingScrap: reconcileData.battingScrap,
      efficiencySpeed: metrics.speed
    });
    */

    // Simulate success
    setTimeout(() => {
        console.log("Fake save complete");
        setIsSaving(false);
        onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-display">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative bg-[#f6f6f8] dark:bg-[#151022] w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-[#131118] dark:text-white">
        
        {/* HEADER */}
        <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-50 bg-inherit">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="hover:bg-black/5 rounded-full p-1 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="font-serif text-2xl font-medium tracking-tight">
              {phase === 'reconcile' ? 'Reconciliation' : 'Workspace'}
            </h2>
          </div>
          {phase !== 'reconcile' && (
            <div className={`flex items-center gap-3 bg-white dark:bg-[#1e1635] rounded-full py-2 px-4 shadow-sm border transition-all ${phase === 'active' ? 'border-[#652bee]/20' : 'border-transparent'}`}>
              <div className={`w-2 h-2 rounded-full ${phase === 'active' ? 'bg-[#652bee] animate-pulse' : 'bg-gray-400'}`}></div>
              <div className="digital-font text-sm font-bold tracking-tighter">{hrs}:{mins}:{secs}</div>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          {phase === 'reconcile' ? (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-300 space-y-8">
              <div className="text-center space-y-2 pt-4">
                <p className="text-[#6d6189] dark:text-gray-400 text-xs font-bold tracking-widest uppercase">Final Time</p>
                <h1 className="text-[#6d6189] dark:text-gray-300 text-[48px] font-bold leading-none tracking-tight font-[Space_Grotesk]">
                  {hrs}:{mins}:{secs}
                </h1>
              </div>
              <button onClick={handleFinalize} disabled={isSaving} className="w-full h-14 bg-[#652bee] text-white rounded-xl font-bold">
                  {isSaving ? 'Saving...' : 'Finalize Order'}
              </button>
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="flex gap-4 py-4">
                 {/* ... Timer Cards ... */}
              </div>
              <div className="flex justify-center items-center gap-6">
                <button onClick={phase === 'pre' ? handleStart : handlePause} className={`flex size-16 items-center justify-center rounded-full shadow-lg transition-all bg-[#652bee] text-white`}>
                  <span className="material-symbols-outlined text-3xl">{phase === 'active' ? 'pause' : 'play_arrow'}</span>
                </button>
                <button onClick={handleStop} disabled={phase === 'pre'} className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-[#1e1635] shadow-md text-red-400">
                  <span className="material-symbols-outlined">stop</span>
                </button>
              </div>

              {/* PROJECT CARD */}
              <div className="bg-white dark:bg-[#1e1635] rounded-xl overflow-hidden shadow-lg p-2 border border-black/5 dark:border-white/5">
                 <div className="flex flex-col">
                   <div className="w-full h-32 bg-center bg-cover rounded-lg" style={{ backgroundImage: `url("${order.img}")` }} />
                   <div className="p-4 pt-5 gap-4">
                     <h3 className="font-serif text-3xl leading-none">{order.clientName}</h3>
                     <div className="space-y-4 mt-2">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold uppercase tracking-widest">Inventory Status</h5>
                          {phase !== 'pre' && (
                            <span className="text-[10px] font-bold bg-[#652bee]/20 text-[#652bee] px-2 py-1 rounded-full animate-in fade-in">RESERVED</span>
                          )}
                        </div>
                        <div className="space-y-3">
                          <InventoryItem name="Thread" detail={`${metrics.threadNeeded} Yards`} icon="spool" checked={phase !== 'pre'} />
                          <InventoryItem name="Batting" detail={`${metrics.battingNeeded} Inches`} icon="layers" checked={phase !== 'pre'} />
                        </div>
                     </div>
                   </div>
                 </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const InventoryItem = ({ name, detail, checked, icon }: {name: string, detail: string, checked: boolean, icon: string}) => (
  <div className="flex items-center justify-between p-3 bg-[#f6f6f8] dark:bg-white/5 rounded-lg transition-colors duration-500">
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
        <span className="material-symbols-outlined text-lg">{icon}</span>
      </div> 
      <div>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs opacity-60 font-mono text-[#652bee] font-bold">{detail}</p>
      </div>
    </div>
    <span className={`material-symbols-outlined transition-colors duration-500 ${checked ? 'text-[#652bee]' : 'text-gray-300'}`}>
      check_circle
    </span>
  </div>
);