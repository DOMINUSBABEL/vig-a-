import React from 'react';
import { NewsItem } from '../types';
import { Newspaper, MessageCircle } from 'lucide-react';

interface NewsPanelProps {
  news: NewsItem[];
}

export const NewsPanel: React.FC<NewsPanelProps> = ({ news }) => {
  const getSourceColor = (source: string) => {
    if (source.includes('Twitter')) return 'text-blue-400';
    if (source.includes('Semana')) return 'text-red-400';
    return 'text-slate-300';
  };

  return (
    <div className="flex flex-col gap-3">
      {news.map((item) => (
        <div key={item.id} className="border-b border-slate-800 pb-2 last:border-0 group cursor-pointer">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-[10px] font-bold font-mono uppercase ${getSourceColor(item.source)} flex items-center gap-1`}>
              {item.source === 'Twitter' ? <MessageCircle size={10} /> : <Newspaper size={10} />}
              {item.source}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">{item.time}</span>
          </div>
          <p className="text-xs text-slate-200 group-hover:text-emerald-400 transition-colors leading-snug">
            {item.title}
          </p>
          <span className="inline-block mt-1 text-[8px] bg-slate-800 text-slate-400 px-1 rounded">
            {item.category}
          </span>
        </div>
      ))}
    </div>
  );
};