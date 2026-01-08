import React, { useMemo } from 'react';
import { SecurityAlert, AlertLevel } from '../types';
import { MapPin, AlertTriangle } from 'lucide-react';

interface MapModuleProps {
  alerts: SecurityAlert[];
}

// A highly simplified SVG path for Colombia for aesthetic visualization without external GeoJSON deps.
const COLOMBIA_SVG_PATH = "M50,15 L60,12 L65,15 L70,20 L68,25 L75,30 L72,40 L78,50 L75,60 L70,70 L60,80 L50,85 L40,80 L30,70 L35,60 L30,50 L35,40 L30,30 L35,25 L40,20 L45,18 Z"; 

export const MapModule: React.FC<MapModuleProps> = ({ alerts }) => {
  
  const getAlertColor = (level: AlertLevel) => {
    switch (level) {
      case AlertLevel.CRITICAL: return 'text-red-500 animate-pulse-fast';
      case AlertLevel.HIGH: return 'text-orange-500';
      case AlertLevel.MEDIUM: return 'text-yellow-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-slate-950/50 rounded-lg overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* Map Container */}
        <svg viewBox="0 0 100 100" className="w-full h-full max-h-[600px] z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
           {/* Abstract shape of Colombia */}
           <path 
             d={COLOMBIA_SVG_PATH} 
             fill="#1e293b" 
             stroke="#10b981" 
             strokeWidth="0.5" 
             className="opacity-80 hover:opacity-100 transition-opacity duration-300"
           />
           
           {/* Render Alerts on Map */}
           {alerts.map((alert) => (
             <g key={alert.id} transform={`translate(${alert.coordinates.x}, ${alert.coordinates.y})`}>
               <circle r="3" fill="currentColor" className={`${getAlertColor(alert.level).split(' ')[0]} opacity-20 animate-ping`} />
               <circle r="1.5" fill="currentColor" className={getAlertColor(alert.level).split(' ')[0]} />
               {/* Tooltip-like label on hover could go here, but sticking to visual only for tactical look */}
             </g>
           ))}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 p-2 border border-slate-700 text-xs font-mono rounded backdrop-blur-md z-20">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Crítico
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Alto
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Medio
          </div>
        </div>
    </div>
  );
};