import React from 'react';
import { TrackedObject } from '../types';
import { Plane, Ship, Crosshair } from 'lucide-react';

interface TacticalRadarProps {
  objects: TrackedObject[];
}

export const TacticalRadar: React.FC<TacticalRadarProps> = ({ objects }) => {
  return (
    <div className="relative w-full h-full min-h-[250px] bg-slate-950 rounded-full border border-slate-700 overflow-hidden flex items-center justify-center">
      {/* Radar Grid */}
      <div className="absolute w-[90%] h-[90%] rounded-full border border-slate-800/50"></div>
      <div className="absolute w-[60%] h-[60%] rounded-full border border-slate-800/50"></div>
      <div className="absolute w-[30%] h-[30%] rounded-full border border-slate-800/50"></div>
      <div className="absolute w-full h-[1px] bg-slate-800/50"></div>
      <div className="absolute h-full w-[1px] bg-slate-800/50"></div>
      
      {/* Scanner Effect */}
      <div className="absolute w-full h-full bg-[conic-gradient(transparent_270deg,rgba(16,185,129,0.1)_360deg)] animate-[spin_4s_linear_infinite] rounded-full"></div>

      {/* Objects */}
      {objects.map((obj) => (
        <div 
          key={obj.id} 
          className="absolute flex flex-col items-center group"
          style={{ top: `${obj.lat}%`, left: `${obj.lng}%` }}
        >
          <div className={`${obj.type === 'AIR' ? 'text-cyan-400' : 'text-blue-400'} animate-pulse`}>
             {obj.type === 'AIR' ? 
               <Plane size={14} style={{ transform: `rotate(${obj.heading}deg)` }} /> : 
               <Ship size={14} style={{ transform: `rotate(${obj.heading}deg)` }} />
             }
          </div>
          <div className="hidden group-hover:block absolute top-4 bg-slate-900/90 border border-slate-700 p-1 text-[8px] font-mono text-white whitespace-nowrap z-20">
            <div>ID: {obj.callsign}</div>
            <div>ORG: {obj.entity}</div>
            <div>ST: {obj.status}</div>
          </div>
        </div>
      ))}
      
      {/* Center Marker */}
      <Crosshair size={16} className="text-emerald-500/50 absolute" />
      
      <div className="absolute bottom-2 right-2 text-[8px] text-emerald-500 font-mono">
        ADS-B / AIS FEED :: LIVE
      </div>
    </div>
  );
};