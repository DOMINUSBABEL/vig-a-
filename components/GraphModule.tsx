import React from 'react';
import { GraphNode, GraphLink } from '../types';

interface GraphModuleProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

export const GraphModule: React.FC<GraphModuleProps> = ({ nodes, links }) => {
  // Helper to find node coordinates
  const getNode = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-slate-950/50 rounded-lg overflow-hidden border border-slate-800">
      <div className="absolute top-2 left-2 z-10">
        <div className="text-[10px] font-mono text-emerald-500 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-900">
          NEO4J :: POWER GRAPH
        </div>
      </div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full p-4">
        <defs>
          <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="8" refY="1.75" orient="auto">
            <polygon points="0 0, 5 1.75, 0 3.5" fill="#475569" />
          </marker>
        </defs>

        {/* Links */}
        {links.map((link, i) => {
          const source = getNode(link.source);
          const target = getNode(link.target);
          if (!source || !target) return null;
          return (
            <g key={i}>
              <line 
                x1={source.x} y1={source.y} 
                x2={target.x} y2={target.y} 
                stroke="#475569" 
                strokeWidth="0.5"
                markerEnd="url(#arrowhead)"
              />
              <text 
                x={(source.x + target.x) / 2} 
                y={(source.y + target.y) / 2} 
                className="text-[3px] fill-slate-500 font-mono"
                textAnchor="middle"
              >
                {link.relation}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} className="cursor-pointer hover:opacity-80 transition-opacity">
            <circle 
              cx={node.x} cy={node.y} 
              r={node.type === 'PERSONA' ? 3 : node.type === 'CONTRATO' ? 2 : 4} 
              fill={node.riskLevel === 'HIGH' ? '#ef4444' : '#0f172a'} 
              stroke={node.type === 'ENTIDAD' ? '#10b981' : node.type === 'EMPRESA' ? '#3b82f6' : '#94a3b8'}
              strokeWidth="0.5"
            />
            {node.riskLevel === 'HIGH' && (
              <circle cx={node.x} cy={node.y} r="5" fill="none" stroke="#ef4444" strokeWidth="0.2" className="animate-ping" />
            )}
            <text 
              x={node.x} y={node.y + 6} 
              className="text-[4px] fill-slate-200 font-mono uppercase" 
              textAnchor="middle"
            >
              {node.label}
            </text>
            <text 
              x={node.x} y={node.y + 8} 
              className="text-[3px] fill-slate-500 font-mono" 
              textAnchor="middle"
            >
              {node.type}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};