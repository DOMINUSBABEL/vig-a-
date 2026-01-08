import React, { useState, useEffect } from 'react';
import { Radio, Plus, LayoutGrid, RotateCw } from 'lucide-react';

export const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-950">
      <div className="flex items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="text-emerald-500 animate-pulse" size={24} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white font-sans uppercase">
              EL VIGÍA <span className="text-emerald-500 text-sm align-top">v2.0</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
              Situation Room • Colombia
            </p>
          </div>
        </div>

        {/* New Controls */}
        <div className="hidden md:flex items-center gap-2 ml-4">
           <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded border border-slate-700 font-mono transition-colors">
             <Plus size={12} /> MONITOR
           </button>
           <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded border border-slate-700 font-mono transition-colors">
             <LayoutGrid size={12} /> PANELES
           </button>
           <button 
             onClick={() => window.location.reload()}
             className="flex items-center gap-1 bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 text-xs px-3 py-1.5 rounded border border-emerald-900 font-mono transition-colors"
           >
             <RotateCw size={12} /> REFRESH
           </button>
        </div>
      </div>

      <div className="text-right hidden md:block">
        <div className="text-3xl font-mono font-bold text-slate-200">
          {time.toLocaleTimeString('es-CO', { hour12: false })}
        </div>
        <div className="text-xs font-mono text-emerald-600 uppercase">
          {time.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </header>
  );
};