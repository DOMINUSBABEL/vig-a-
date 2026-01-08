import React from 'react';
import { CampaignDonation } from '../types';
import { Briefcase, Users } from 'lucide-react';

interface CampaignPanelProps {
  donations: CampaignDonation[];
}

export const CampaignPanel: React.FC<CampaignPanelProps> = ({ donations }) => {
  return (
    <div className="flex flex-col gap-2">
      {donations.map((d) => (
        <div key={d.id} className="flex gap-2 items-center p-1 hover:bg-slate-800/30 transition-colors rounded">
          <div className="bg-slate-800 p-1.5 rounded-full text-emerald-500">
            <Briefcase size={12} />
          </div>
          <div className="flex-grow min-w-0">
             <div className="flex justify-between items-baseline">
               <span className="text-xs font-bold text-slate-200 truncate">{d.candidate}</span>
               <span className="text-[10px] text-emerald-400 font-mono font-bold">${(d.amount / 1000000).toFixed(0)}M</span>
             </div>
             <div className="flex items-center gap-1 text-[10px] text-slate-500 truncate">
               <span className="text-slate-400">{d.donor}</span>
               <span>→</span>
               <span className="uppercase">{d.party}</span>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};