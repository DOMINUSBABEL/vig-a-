import React from 'react';
import { EconomicIndicator } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface EconomicModuleProps {
  data: EconomicIndicator[];
}

export const EconomicModule: React.FC<EconomicModuleProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      {data.map((item) => (
        <div key={item.name} className="flex flex-col h-32 md:h-full bg-slate-800/30 p-2 border border-slate-700/50 rounded">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-slate-400 font-mono uppercase">{item.name}</p>
              <p className="text-xl font-bold text-white font-mono">{item.value.toLocaleString()}</p>
            </div>
            <div className={`flex items-center text-xs font-bold ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.change >= 0 ? <TrendingUp size={14} className="mr-1"/> : <TrendingDown size={14} className="mr-1"/>}
              {Math.abs(item.change)}%
            </div>
          </div>
          
          <div className="flex-grow min-h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={item.history}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={item.change >= 0 ? "#34d399" : "#f87171"} 
                  strokeWidth={2} 
                  dot={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '10px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};