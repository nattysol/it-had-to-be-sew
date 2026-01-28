"use client";
import React, { useState, useEffect, useMemo } from 'react';

// --- Types ---
interface Order {
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

export const ProjectWorkspaceModal = ({ order, isOpen, onClose }: ProjectWorkspaceModalProps) => {
  if (!isOpen || !order) return null;

  // --- State ---
  const [phase, setPhase] = useState<'pre' | 'active' | 'paused' | 'reconcile'>('pre');
  const [secondsElapsed, setSecondsElapsed] = useState(0); // Total active time
  
  // Inventory Reconcile Data
  const [reconcileData, setReconcileData] = useState({ 
    actualFabricUsed: '', 
    battingScrap: '' 
  });

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

  // Helper: Format Time (HH:MM:SS)
  const getTimeParts = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return { hrs, mins, secs };
  };

  const { hrs, mins, secs } = getTimeParts(secondsElapsed);

  // --- Efficiency Math (The "Business Intelligence" Layer) ---
  const efficiencyMetrics = useMemo(() => {
    try {
      // 1. Parse Dimensions string "90" x 108"" -> [90, 108]
      const numbers = order.dimensions.match(/\d+/g)?.map(Number);
      if (!numbers || numbers.length < 2) return { area: 0, speed: 0 };
      
      const area = numbers[0] * numbers[1]; // Sq Inches
      const hours = Math.max(secondsElapsed / 3600, 0.1); // Avoid divide by zero
      const speed = Math.round(area / hours); // Sq In per Hour
      
      return { area, speed };
    } catch (e) {
      return { area: 0, speed: 0 };
    }
  }, [order.dimensions, secondsElapsed]);

  // --- Handlers ---
  const handleStart = () => {
    console.log("Reserving inventory...");
    setPhase('active');
  };

  const handlePause = () => setPhase(phase === 'active' ? 'paused' : 'active');
  const handleStop = () => setPhase('reconcile');
  
  const handleFinalize = () => {
    console.log("Saving Order:", {
      orderId: order.id,
      finalTime: secondsElapsed,
      reconcileData
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-display">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Main Card */}
      <div className="relative bg-[#f6f8f6] dark:bg-[#102210] w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-[#111811] dark:text-white">
        
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
          
          {/* Header Action (History) - Only show in Reconcile phase */}
          {phase === 'reconcile' && (
            <button className="text-gray-400 hover:text-[#111811]">
              <span className="material-symbols-outlined">history</span>
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          
          {/* =========================================================
              PHASE C: RECONCILIATION (The New UI)
             ========================================================= */}
          {phase === 'reconcile' ? (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-300 space-y-8">
              
              {/* 1. Final Time Display */}
              <div className="text-center space-y-2 pt-4">
                <p className="text-[#6d6189] dark:text-gray-400 text-xs font-bold tracking-widest uppercase">Final Time</p>
                <h1 className="text-[#6d6189] dark:text-gray-300 text-[48px] font-bold leading-none tracking-tight font-[Space_Grotesk]">
                  {hrs}:{mins}:{secs}
                </h1>
              </div>

              {/* 2. Inventory Inputs */}
              <div className="space-y-5">
                <h3 className="font-bold text-lg">Inventory Reconciliation</h3>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium opacity-80">Actual Fabric Used (yards)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 4.5" 
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:border-[#652bee] focus:ring-1 focus:ring-[#652bee] outline-none transition-all"
                      value={reconcileData.actualFabricUsed}
                      onChange={(e) => setReconcileData({...reconcileData, actualFabricUsed: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium opacity-80">Batting Scrap Produced (sq in)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 12" 
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:border-[#652bee] focus:ring-1 focus:ring-[#652bee] outline-none transition-all"
                      value={reconcileData.battingScrap}
                      onChange={(e) => setReconcileData({...reconcileData, battingScrap: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Efficiency Metrics Card */}
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

              {/* 4. Context Image */}
              <div className="w-full h-32 rounded-xl overflow-hidden relative grayscale opacity-80">
                 <div 
                   className="w-full h-full bg-cover bg-center" 
                   style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWseGeFgiyQLrabricVfxgLK65syB_5E-KFTdfrrGB0BFJaeZqSkyC4jbHIoVl1wmiVcK9D9PkPJQJ2R2HP5KR6Qr6I7myDoOgXSJz-3kDlJN6clvoLJkaGf7a6m8jS5XfukP6qzrCMBb55DkKuNJ1ZozgeINuEjzOrua7xZhmA8eGXlHghh5yTIzvtoTxKKp8UdRRlNie9b9mk41-iHSN6vj6dvGDWo9EtcTFHThjK8325S3mkailsFNMxoIfvX5ks2-MVhUFNIbX")'}}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#102210] to-transparent"></div>
              </div>
            </div>
          ) : (
            
            /* =========================================================
               PHASE A/B: PRE & ACTIVE (The Workspace)
               (This is the same code from the previous step)
               ========================================================= */
            <>
              {/* Session Header */}
              <div className="flex flex-col items-center">
                <h4 className="text-[#13ec13] text-xs font-bold leading-normal tracking-[0.2em] px-4 py-2 uppercase">Current Session</h4>
                <div className="w-12 h-[2px] bg-[#13ec13]/20 rounded-full"></div>
              </div>

              {/* Big Timer Display */}
              <div className="flex gap-4 py-4">
                {[{ val: hrs, label: 'Hours', active: false }, { val: mins, label: 'Minutes', active: false }, { val: secs, label: 'Seconds', active: true }].map((item, idx) => (
                  <div key={idx} className="flex grow basis-0 flex-col items-stretch gap-3">
                    <div className={`flex h-20 grow items-center justify-center rounded-xl shadow-lg transition-colors duration-300 ${item.active && phase === 'active' ? 'bg-[#13ec13]/10 border-2 border-[#13ec13]/30 text-[#13ec13]' : 'bg-white dark:bg-[#1a2e1a]'}`}>
                      <p className="text-3xl font-bold tracking-tighter tabular-nums font-[Space_Grotesk]">{item.val}</p>
                    </div>
                    <p className={`text-center text-xs font-medium uppercase tracking-widest ${item.active && phase === 'active' ? 'text-[#13ec13] font-bold' : 'opacity-60'}`}>{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-6">
                <button className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-[#1a2e1a] shadow-md text-gray-400 hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">restart_alt</span>
                </button>
                <button 
                  onClick={phase === 'pre' ? handleStart : handlePause}
                  disabled={phase === 'pre'}
                  className={`flex size-16 items-center justify-center rounded-full shadow-lg shadow-[#13ec13]/30 transition-all ${phase === 'pre' ? 'bg-gray-200 text-gray-400' : 'bg-[#13ec13] text-[#111811] hover:scale-110 active:scale-95'}`}
                >
                  <span className="material-symbols-outlined text-3xl">{phase === 'active' ? 'pause' : 'play_arrow'}</span>
                </button>
                <button 
                  onClick={handleStop}
                  disabled={phase === 'pre'}
                  className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-[#1a2e1a] shadow-md text-red-400 hover:text-red-600 hover:scale-110 transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">stop</span>
                </button>
              </div>

              {/* Project Details (Collapsed for brevity, same as before) */}
              <div className="bg-white dark:bg-[#1a2e1a] rounded-xl overflow-hidden shadow-lg p-2 border border-black/5 dark:border-white/5">
                 <div className="flex flex-col">
                   <div className="w-full h-32 bg-center bg-cover rounded-lg" style={{ backgroundImage: `url("${order.img}")` }} />
                   <div className="p-4 pt-5 gap-4">
                     <h3 className="font-serif text-3xl leading-none">{order.clientName}</h3>
                     <p className="opacity-60 text-sm mb-4">{order.pattern}</p>
                     
                     {phase === 'pre' && (
                        <button onClick={handleStart} className="w-full flex items-center justify-center rounded-full h-12 bg-[#13ec13] text-[#111811] font-bold shadow-lg shadow-[#13ec13]/20 hover:scale-[1.02] transition-transform">
                          <span className="material-symbols-outlined mr-2">play_arrow</span>
                          Start Project
                        </button>
                     )}
                   </div>
                 </div>
              </div>
            </>
          )}
        </main>

        {/* --- STICKY FOOTER (Reconcile Phase Only) --- */}
        {phase === 'reconcile' && (
          <div className="p-6 bg-white/80 dark:bg-[#102210]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/10">
            <button 
              onClick={handleFinalize}
              className="w-full h-14 bg-[#652bee] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#652bee]/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <span>Finalize Order</span>
              <span className="material-symbols-outlined">check_circle</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};