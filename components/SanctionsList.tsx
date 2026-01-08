import React from 'react';
import { FiscalSanction } from '../types';
import { ShieldAlert, Gavel } from 'lucide-react';

interface SanctionsListProps {
  sanctions: FiscalSanction[];
}

export const SanctionsList: React.FC<SanctionsListProps> = ({ sanctions }) => {
  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto custom-scrollbar">
      {sanctions.map((item) => (
        <div key={item.id} className="bg-red-950/20 border-l-2 border-red-600 p-2 flex gap-2 items-start hover:bg-red-900/20 transition-colors">
          <div className="mt-1 text-red-500">
            {item.source === 'CONTRALORÍA' ? <ShieldAlert size={14} /> : <Gavel size={14} />}
          </div>
          <div>
            <div className="flex justify-between items-start w-full gap-2">
              <span className="text-xs font-bold text-red-200">{item.entityName}</span>
              <span className="text-[10px] font-mono text-red-400 bg-red-950 px-1 rounded border border-red-900">
                {item.source}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-1">ID: {item.idNumber}</p>
            <p className="text-xs text-slate-300 mt-0.5">{item.reason}</p>
            {item.amount && (
               <p className="text-[10px] text-red-300 font-mono mt-1 font-bold">
                 DETRIMENTO: ${item.amount.toLocaleString()}
               </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};