import React from 'react';
import { LegislativeBill } from '../types';
import { ScrollText, Clock } from 'lucide-react';

interface LegislativeListProps {
  bills: LegislativeBill[];
}

export const LegislativeList: React.FC<LegislativeListProps> = ({ bills }) => {
  return (
    <div className="flex flex-col gap-3">
      {bills.map((bill) => (
        <div key={bill.id} className="relative pl-4 py-1 border-b border-slate-800 last:border-0">
          <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <h4 className="text-sm font-bold text-slate-200">{bill.code}</h4>
          <p className="text-xs text-slate-400 mb-1">{bill.title}</p>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase">
             <span className="flex items-center gap-1 text-blue-400">
               <ScrollText size={10} />
               {bill.stage}
             </span>
             <span className="flex items-center gap-1">
               <Clock size={10} />
               {bill.lastUpdate}
             </span>
          </div>
        </div>
      ))}
    </div>
  );
};