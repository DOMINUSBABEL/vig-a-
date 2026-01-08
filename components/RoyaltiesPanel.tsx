import React from 'react';
import { RoyaltyProject } from '../types';
import { Pickaxe } from 'lucide-react';

interface RoyaltiesPanelProps {
  projects: RoyaltyProject[];
}

export const RoyaltiesPanel: React.FC<RoyaltiesPanelProps> = ({ projects }) => {
  return (
    <div className="flex flex-col gap-3">
      {projects.map((p) => (
        <div key={p.id} className="bg-slate-800/20 p-2 border border-slate-800 rounded">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-1 text-amber-500">
               <Pickaxe size={12} />
               <span className="text-[10px] font-bold uppercase">{p.municipio}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{p.progress}%</span>
          </div>
          <p className="text-xs text-slate-300 mb-2 truncate">{p.project}</p>
          
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-1">
            <div 
              className="bg-amber-600 h-full rounded-full" 
              style={{ width: `${p.progress}%` }}
            ></div>
          </div>
          <div className="text-right text-[10px] font-mono text-slate-500">
            ${(p.amount / 1000000000).toFixed(1)} MM
          </div>
        </div>
      ))}
    </div>
  );
};