import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ title, children, className = '', action }) => {
  return (
    <div className={`bg-slate-900 border border-slate-700 flex flex-col relative overflow-hidden ${className}`}>
      {/* Decorative corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500 z-10"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-500 z-10"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-500 z-10"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500 z-10"></div>

      <div className="bg-slate-800/50 p-2 border-b border-slate-700 flex justify-between items-center backdrop-blur-sm">
        <h3 className="text-emerald-500 font-mono text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          {title}
        </h3>
        {action}
      </div>
      <div className="p-4 flex-grow overflow-auto">
        {children}
      </div>
    </div>
  );
};