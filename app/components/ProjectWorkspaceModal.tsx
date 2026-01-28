"use client";

import React, { useState, useEffect, useMemo } from 'react';

// --- Types ---
export interface Order {
  id: string;
  clientName: string;
  pattern: string;
  dimensions: string; // e.g. "90" x 108" (King)"
  dueDate: string;
  status: string;
  battingLength: number;
  materialsAvailable?: boolean;
  lowStock?: boolean;
  img?: string;
}

interface ProjectWorkspaceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

// --- Mock Inventory for Swapping (Replace with Sanity Fetch later) ---
const MOCK_INVENTORY_OPTIONS = [
  { id: 't1', name: 'Glide - Cool Grey', stock: 4.5, unit: 'oz' },
  { id: 't2', name: 'Glide - Slate Blue', stock: 12.0, unit: 'oz' },
  { id: 't3', name: 'Magna - White', stock: 2.1, unit: 'oz' },
  { id: 'b1', name: 'Hobbs 80/20', stock: 900, unit: 'in' },
  { id: 'b2', name: 'Wool Batting', stock: 450, unit: 'in' },
];

export const ProjectWorkspaceModal = ({ order, isOpen, onClose }: ProjectWorkspaceModalProps) => {
  if (!isOpen || !order) return null;

  // --- State ---
  const [phase, setPhase] = useState<'pre' | 'active' | 'paused' | 'reconcile'>('pre');
  const [secondsElapsed, setSecondsElapsed] = useState(0); 
  const [reconcileData, setReconcileData] = useState({ actualFabricUsed: '', battingScrap: '' });
  
  // State for Material Selections (Allows swapping)
  const [selectedThread, setSelectedThread] = useState('Glide - Cool Grey');
  const [selectedBatting, setSelectedBatting] = useState('Hobbs 80/20 Batting');

  // --- Timer Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'active') {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase]);

  // Helper: Format Time Parts
  const getTimeParts = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return { hrs, mins, secs };
  };
  const { hrs, mins, secs } = getTimeParts(secondsElapsed);

  // --- 🧮 Material & Efficiency Math ---
  const efficiencyMetrics = useMemo(() => {
    try {
      // Parse "90" x 108"" -> [90, 108]
      const dims = order.dimensions.match(/\d+/g)?.map(Number);
      if (!dims || dims.length < 2) return { area: 0, threadNeeded: 0, battingNeeded: 0, speed: 0 };
      
      const [w, h] = dims;
      const area = w * h;
      
      // Thread: (Area * 3.5 density) / 36 inches per yard
      const threadNeeded = Math.ceil((area * 3.5) / 36);
      // Batting: Height + 8 inch margin
      const battingNeeded = h + 8;
      // Efficiency Speed (avoid divide by zero)
      const hours = Math.max(secondsElapsed / 3600, 0.1);
      const speed = Math.round(area / hours);
      
      return { area, threadNeeded, battingNeeded, speed };
    } catch (e) {
      return { area: 0, threadNeeded: 0, battingNeeded: 0, speed: 0 };
    }
  }, [order.dimensions, secondsElapsed]);

  // --- Handlers ---
  const handleStart = () => setPhase('active');
  const handlePause = () => setPhase(phase === 'active' ? 'paused' : 'active');
  const handleStop = () => setPhase('reconcile');
  const handleFinalize = () => {
    console.log("Saving Order:", { orderId: order.id, finalTime: secondsElapsed, reconcileData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-display">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative bg-[#f6f6f8] dark:bg-[#151022] w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-[#131118] dark:text-white">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-50 bg-inherit">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="hover:bg-black/5 rounded-full p-1 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="font-serif text-2xl font-medium tracking-tight">
              {phase === 'reconcile' ? 'Project Reconciliation' : 'Project Workspace'}
            </h2>
          </div>
          {/* Active Timer Pill (Hidden in Reconcile) */}
          {phase !== 'reconcile' && (
            <div className={`flex items-center gap-3 bg-white dark:bg-[#1e1635] rounded-full py-2 px-4 shadow-sm border transition-all ${phase === 'active' ? 'border-[#652bee]/20' : 'border-transparent'}`}>
              <div className={`w-2 h-2 rounded-full ${phase === 'active' ? 'bg-[#652bee] animate-pulse' : 'bg-gray-400'}`}></div>
              <div className={`digital-font text-sm font-bold tracking-tighter ${phase === 'active' ? 'text-[#652bee]' : 'text-gray-400'}`}>
                {hrs}:{mins}:{secs}
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          
          {/* =========================================================
              PHASE C: RECONCILE (Results)
             ========================================================= */}
          {phase === 'reconcile' ? (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-300 space-y-8">
              <div className="text-center space-y-2 pt-4">
                <p className="text-[#6d6189] dark:text-gray-400 text-xs font-bold tracking-widest uppercase">Final Time</p>
                <h1 className="text-[#6d6189] dark:text-gray-300 text-[48px] font-bold leading-none tracking-tight font-[Space_Grotesk]">
                  {hrs}:{mins}:{secs}
                </h1>
              </div>

              {/* Inputs */}
              <div className="space-y-5">
                <h3 className="font-bold text-lg">Inventory Reconciliation</h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium opacity-80">Actual Fabric Used (yards)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 4.5" 
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1e1635] focus:border-[#652bee] focus:ring-1 focus:ring-[#652bee] outline-none transition-all"
                      value={reconcileData.actualFabricUsed}
                      onChange={(e) => setReconcileData({...reconcileData, actualFabricUsed: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium opacity-80">Batting Scrap Produced (sq in)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 12" 
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1e1635] focus:border-[#652bee] focus:ring-1 focus:ring-[#652bee] outline-none transition-all"
                      value={reconcileData.battingScrap}
                      onChange={(e) => setReconcileData({...reconcileData, battingScrap: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Efficiency Card */}
              <div className="p-5 rounded-2xl border border-[#652bee]/20 bg-[#652bee]/5 dark:bg-[#652bee]/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#652bee]">analytics</span>
                  <h3 className="text-[#652bee] text-sm font-bold uppercase tracking-wider">Efficiency Metrics</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#6d6189] dark:text-gray-400 uppercase font-bold tracking-tighter">Total Active Time</span>
                    <span className="text-lg font-bold">{parseInt(hrs)}h {parseInt(mins)}m</span>
                  </div>
                  <div className="flex flex-col border-l border-[#652bee]/20 pl-4">
                    <span className="text-[10px] text-[#6d6189] dark:text-gray-400 uppercase font-bold tracking-tighter">Efficiency</span>
                    <span className="text-lg font-bold">
                      {efficiencyMetrics.speed} <span className="text-sm font-normal text-gray-500">sq in/hr</span>
                    </span>
                  </div>
                </div>
              </div>

              <button onClick={handleFinalize} className="w-full h-14 bg-[#652bee] text-white rounded-xl font-bold hover:bg-[#5423c7] transition-colors shadow-lg shadow-[#652bee]/30">Finalize Order</button>
            </div>
          ) : (
            
            /* =========================================================
               PHASE A/B: PRE & ACTIVE WORKSPACE
               ========================================================= */
            <>
              {/* Session Header */}
              <div className="flex flex-col items-center">
                <h4 className="text-[#652bee] text-xs font-bold leading-normal tracking-[0.2em] px-4 py-2 uppercase">Current Session</h4>
                <div className="w-12 h-[2px] bg-[#652bee]/20 rounded-full"></div>
              </div>

              {/* Timer Display */}
              <div className="flex gap-4 py-4">
                {[{ val: hrs, label: 'Hours', active: false }, { val: mins, label: 'Minutes', active: false }, { val: secs, label: 'Seconds', active: true }].map((item, idx) => (
                  <div key={idx} className="flex grow basis-0 flex-col items-stretch gap-3">
                    <div className={`flex h-20 grow items-center justify-center rounded-xl shadow-lg transition-colors duration-300 ${item.active && phase === 'active' ? 'bg-[#652bee]/10 border-2 border-[#652bee]/30 text-[#652bee]' : 'bg-white dark:bg-[#1e1635]'}`}>
                      <p className="text-3xl font-bold tracking-tighter tabular-nums font-[Space_Grotesk]">{item.val}</p>
                    </div>
                    <p className={`text-center text-xs font-medium uppercase tracking-widest ${item.active && phase === 'active' ? 'text-[#652bee] font-bold' : 'opacity-60'}`}>{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-6">
                <button onClick={phase === 'pre' ? handleStart : handlePause} className={`flex size-16 items-center justify-center rounded-full shadow-lg transition-all ${phase === 'pre' ? 'bg-[#652bee] text-white hover:scale-105' : 'bg-[#652bee] text-white hover:scale-105'} shadow-[#652bee]/30`}>
                  <span className="material-symbols-outlined text-3xl">{phase === 'active' ? 'pause' : 'play_arrow'}</span>
                </button>
                <button onClick={handleStop} disabled={phase === 'pre'} className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-[#1e1635] shadow-md text-red-400 hover:text-red-500 disabled:opacity-50">
                  <span className="material-symbols-outlined">stop</span>
                </button>
              </div>

              {/* Project Card */}
              <div className="bg-white dark:bg-[#1e1635] rounded-xl overflow-hidden shadow-lg p-2 border border-black/5 dark:border-white/5">
                 <div className="flex flex-col">
                   <div className="w-full h-32 bg-center bg-cover rounded-lg" style={{ backgroundImage: `url("${order.img}")` }} />
                   <div className="p-4 pt-5 gap-4">
                     <h3 className="font-serif text-3xl leading-none">{order.clientName}</h3>
                     
                     <div className="space-y-4 mt-2">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold uppercase tracking-widest">Inventory Status</h5>
                          {phase !== 'pre' && (
                            <span className="text-[10px] font-bold bg-[#652bee]/20 text-[#652bee] px-2 py-1 rounded-full animate-in fade-in">
                              RESERVED
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {/* SWAPPABLE INVENTORY ITEMS */}
                          <InventoryItem 
                            label="Thread"
                            currentSelection={selectedThread}
                            metric={`${efficiencyMetrics.threadNeeded} Yards Req.`}
                            icon="spool"
                            onSwap={setSelectedThread} // Allows changing this state
                          />
                          <InventoryItem 
                            label="Batting"
                            currentSelection={selectedBatting}
                            metric={`${efficiencyMetrics.battingNeeded} Inches Req.`}
                            icon="layers"
                            onSwap={setSelectedBatting}
                          />
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

// --- Helper Component: Inventory Item with Swap Logic ---
const InventoryItem = ({ 
  label,
  currentSelection, 
  metric, 
  icon,
  onSwap 
}: { 
  label: string,
  currentSelection: string, 
  metric: string, 
  icon: string,
  onSwap: (newItem: string) => void 
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-2 p-3 bg-[#f6f6f8] dark:bg-white/5 rounded-lg transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
            <span className="material-symbols-outlined text-lg">{icon}</span>
          </div> 
          <div>
            <p className="text-sm font-bold">{currentSelection}</p>
            <p className="text-xs opacity-60 font-mono text-[#652bee] font-bold">{metric}</p>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#652bee] px-2 py-1"
        >
          {isEditing ? 'Cancel' : 'Change'}
        </button>
      </div>

      {/* The "Swap" Dropdown */}
      {isEditing && (
        <div className="mt-2 p-2 bg-white dark:bg-black/20 rounded-lg animate-in fade-in slide-in-from-top-2 border border-gray-100 dark:border-white/5">
          <p className="text-[10px] font-bold uppercase mb-2 opacity-50 px-2">Select Replacement:</p>
          <div className="grid gap-1 max-h-32 overflow-y-auto">
            {MOCK_INVENTORY_OPTIONS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onSwap(item.name);
                  setIsEditing(false);
                }}
                className="text-left text-sm p-2 hover:bg-[#652bee]/10 rounded flex justify-between items-center group"
              >
                <span className="font-medium group-hover:text-[#652bee]">{item.name}</span>
                <span className="opacity-50 text-xs bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded">{item.stock}{item.unit}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};