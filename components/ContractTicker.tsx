import React from 'react';
import { Contract } from '../types';
import { FileText, AlertOctagon } from 'lucide-react';

interface ContractTickerProps {
  contracts: Contract[];
}

export const ContractTicker: React.FC<ContractTickerProps> = ({ contracts }) => {
  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto pr-2 custom-scrollbar">
      {contracts.map((contract) => (
        <div key={contract.id} className="p-3 border-l-2 border-slate-700 bg-slate-800/20 hover:bg-slate-800/50 transition-colors group">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-mono text-emerald-500 bg-emerald-950/30 px-1 rounded">
              {contract.entidad}
            </span>
            <span className="text-xs font-mono text-slate-400">{contract.fecha}</span>
          </div>
          <p className="text-sm text-slate-200 line-clamp-2 mb-2 group-hover:text-white">
            {contract.objeto}
          </p>
          <div className="flex justify-between items-center">
             <span className="text-sm font-bold font-mono text-white">
               ${contract.valor.toLocaleString('es-CO')}
             </span>
             {contract.flags.length > 0 && (
               <div className="flex gap-1">
                 {contract.flags.map(flag => (
                   <span key={flag} className="flex items-center text-[10px] bg-red-900/30 text-red-400 px-1.5 py-0.5 rounded border border-red-900/50">
                     <AlertOctagon size={10} className="mr-1" />
                     {flag}
                   </span>
                 ))}
               </div>
             )}
          </div>
        </div>
      ))}
    </div>
  );
};