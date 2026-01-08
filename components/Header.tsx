import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';

export const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-950">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Radio className="text-emerald-500 animate-pulse" size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white font-sans uppercase">
            EL VIGÍA <span className="text-emerald-500 text-sm align-top">v1.0</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            Sistema de Monitoreo Integrado • Colombia
          </p>
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