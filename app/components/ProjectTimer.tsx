import React, { useState, useEffect } from 'react';

interface TimerProps {
  isActive: boolean;
  onPause: () => void;
  onResume: () => void;
}

export const ProjectTimer = ({ isActive, onPause, onResume }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-colors ${
      isActive 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-amber-50 border-amber-200 text-amber-800'
    }`}>
      {/* Pulsing Dot */}
      <div className="relative flex h-3 w-3">
        {isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-green-500' : 'bg-amber-500'}`}></span>
      </div>

      <span className="font-mono font-bold text-lg">{formatTime(seconds)}</span>

      {/* Controls */}
      <button 
        onClick={isActive ? onPause : onResume}
        className="ml-2 hover:bg-black/5 rounded-full p-1"
      >
        <span className="material-symbols-outlined text-xl">
          {isActive ? 'pause' : 'play_arrow'}
        </span>
      </button>
    </div>
  );
};