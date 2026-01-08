import React, { useState } from 'react';
import { SecurityAlert, AlertLevel } from '../types';
import { Layers } from 'lucide-react';

interface MapModuleProps {
  alerts: SecurityAlert[];
}

type MapLayer = 'ALL' | 'CONFLICT' | 'MINING' | 'CROPS';

const COLOMBIA_SVG_PATH = "M50,15 L60,12 L65,15 L70,20 L68,25 L75,30 L72,40 L78,50 L75,60 L70,70 L60,80 L50,85 L40,80 L30,70 L35,60 L30,50 L35,40 L30,30 L35,25 L40,20 L45,18 Z"; 

export const MapModule: React.FC<MapModuleProps> = ({ alerts }) => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (activeLayer === 'ALL') return true;
    if (activeLayer === 'CONFLICT') return a.type === 'ORDEN_PUBLICO' || a.type === 'BLOQUEO';
    if (activeLayer === 'MINING') return a.type === 'MINERIA';
    if (activeLayer === 'CROPS') return a.type === 'CULTIVOS';
    return true;
  });
  
  const getAlertColor = (type: string, level: AlertLevel) => {
    if (type === 'MINERIA') return 'text-amber-400';
    if (type === 'CULTIVOS') return 'text-green-600';
    switch (level) {
      case AlertLevel.CRITICAL: return 'text-red-500 animate-pulse-fast';
      case AlertLevel.HIGH: return 'text-orange-500';
      case AlertLevel.MEDIUM: return 'text-yellow-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-slate-950/50 rounded-lg overflow-hidden">
        {/* Layer Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1">
          <div className="text-[10px] text-slate-500 font-mono mb-1 text-right flex items-center justify-end gap-1">
            <Layers size={10} /> LAYERS
          </div>
          {(['ALL', 'CONFLICT', 'MINING', 'CROPS'] as MapLayer[]).map(layer => (
             <button
               key={layer}
               onClick={() => setActiveLayer(layer)}
               className={`text-[9px] px-2 py-1 font-mono uppercase border transition-all ${
                 activeLayer === layer 
                   ? 'bg-emerald-900/50 text-emerald-400 border-emerald-500' 
                   : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-slate-500'
               }`}
             >
               {layer}
             </button>
          ))}
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* Map Container */}
        <svg viewBox="0 0 100 100" className="w-full h-full max-h-[600px] z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
           <path 
             d={COLOMBIA_SVG_PATH} 
             fill="#1e293b" 
             stroke="#10b981" 
             strokeWidth="0.5" 
             className="opacity-80 transition-opacity duration-300"
           />
           
           {filteredAlerts.map((alert) => (
             <g key={alert.id} transform={`translate(${alert.coordinates.x}, ${alert.coordinates.y})`}>
               <circle r="3" fill="currentColor" className={`${getAlertColor(alert.type, alert.level).split(' ')[0]} opacity-20 animate-ping`} />
               <circle r="1.5" fill="currentColor" className={getAlertColor(alert.type, alert.level).split(' ')[0]} />
             </g>
           ))}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 p-2 border border-slate-700 text-xs font-mono rounded backdrop-blur-md z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-1 text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Conflicto
          </div>
          <div className="flex items-center gap-2 mb-1 text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Minería
          </div>
          <div className="flex items-center gap-2 text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Cultivos
          </div>
        </div>
    </div>
  );
};