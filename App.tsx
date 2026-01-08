import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Panel } from './components/ui/Panel';
import { MapModule } from './components/MapModule';
import { ContractTicker } from './components/ContractTicker';
import { EconomicModule } from './components/EconomicModule';
import { LegislativeList } from './components/LegislativeList';
import { GraphModule } from './components/GraphModule';
import { TacticalRadar } from './components/TacticalRadar';
import { SanctionsList } from './components/SanctionsList';
import { generateSituationReport } from './services/geminiService';
import { 
  getSecurityAlerts, 
  getRecentContracts, 
  getEconomicData, 
  getLegislativeBills,
  getPowerGraph,
  getTacticalTraffic,
  getFiscalSanctions
} from './services/mockDataService';
import { SecurityAlert, Contract, EconomicIndicator, LegislativeBill, AIReport, GraphNode, GraphLink, TrackedObject, FiscalSanction } from './types';
import { Bot, RefreshCw, AlertTriangle, Network, Radar, Scale } from 'lucide-react';

function App() {
  // State
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [economy, setEconomy] = useState<EconomicIndicator[]>([]);
  const [bills, setBills] = useState<LegislativeBill[]>([]);
  
  // New State for Intel Layers
  const [graphData, setGraphData] = useState<{nodes: GraphNode[], links: GraphLink[]}>({nodes: [], links: []});
  const [traffic, setTraffic] = useState<TrackedObject[]>([]);
  const [sanctions, setSanctions] = useState<FiscalSanction[]>([]);

  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Initial Data Load
  useEffect(() => {
    const loadData = () => {
      setAlerts(getSecurityAlerts());
      setContracts(getRecentContracts());
      setEconomy(getEconomicData());
      setBills(getLegislativeBills());
      
      // Load New Intel Data
      setGraphData(getPowerGraph());
      setTraffic(getTacticalTraffic());
      setSanctions(getFiscalSanctions());

      setLastUpdated(new Date().toLocaleTimeString());
    };
    
    loadData();
    // Simulate real-time updates (poll every minute)
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerateAIReport = async () => {
    setLoadingAI(true);
    // Pass expanded context to Gemini
    const report = await generateSituationReport(alerts, contracts, economy, sanctions, traffic);
    setAiReport(report);
    setLoadingAI(false);
  };

  return (
    <div className="min-h-screen bg-vigia-bg text-slate-200 flex flex-col font-sans selection:bg-emerald-500/30">
      <Header />

      <main className="flex-grow p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
        
        {/* COLUMN 1: TERRITORIAL & TACTICAL (LEFT) */}
        <div className="flex flex-col gap-4">
          <Panel title="ORDEN PÚBLICO // TERRITORIO" className="h-[400px]">
            <MapModule alerts={alerts} />
          </Panel>
          <Panel title="TÁCTICO (ADS-B / AIS)" className="h-[300px]">
            <div className="h-full p-2">
               <TacticalRadar objects={traffic} />
            </div>
          </Panel>
        </div>

        {/* COLUMN 2: POWER GRAPH & POLITICS (CENTER-LEFT) */}
        <div className="flex flex-col gap-4">
           <Panel title="GRAFO DE PODER (CONTRACTUAL)" className="h-[400px]" action={<Network size={14} className="text-emerald-500"/>}>
             <GraphModule nodes={graphData.nodes} links={graphData.links} />
           </Panel>
           <Panel title="LEGISLATIVO (EN VIVO)" className="flex-grow">
              <LegislativeList bills={bills} />
            </Panel>
        </div>

        {/* COLUMN 3: FISCAL & CONTRACTS (CENTER-RIGHT) */}
        <div className="flex flex-col gap-4">
          <Panel title="RIESGO FISCAL Y SANCIONES" className="h-[250px]" action={<Scale size={14} className="text-red-500"/>}>
            <SanctionsList sanctions={sanctions} />
          </Panel>
          <Panel title="VIGILANCIA SECOP II (>$1.000M)" className="flex-grow">
             <ContractTicker contracts={contracts} />
          </Panel>
        </div>

        {/* COLUMN 4: ECONOMY & AI (RIGHT) */}
        <div className="flex flex-col gap-4">
          <Panel title="VARIABLES MACRO" className="h-[250px]">
            <EconomicModule data={economy} />
          </Panel>

          {/* AI Intelligence Module */}
          <Panel 
            title="INTELIGENCIA ARTIFICIAL" 
            className="flex-grow border-t-4 border-t-emerald-500"
            action={
              <button 
                onClick={handleGenerateAIReport}
                disabled={loadingAI}
                className="flex items-center gap-2 px-3 py-1 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 text-xs font-mono border border-emerald-800 rounded transition-all disabled:opacity-50"
              >
                {loadingAI ? <RefreshCw className="animate-spin" size={12}/> : <Bot size={12}/>}
                {loadingAI ? 'ANALIZANDO...' : 'GENERAR REPORTE'}
              </button>
            }
          >
            {aiReport ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <h4 className="text-xs text-emerald-600 font-bold uppercase mb-1">Resumen SITREP</h4>
                  <p className="text-sm font-mono text-slate-300 leading-relaxed border-l-2 border-emerald-900 pl-2">
                    {aiReport.summary}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs text-emerald-600 font-bold uppercase mb-1">Evaluación de Amenaza</h4>
                  <p className="text-sm font-mono text-slate-300 leading-relaxed border-l-2 border-emerald-900 pl-2">
                    {aiReport.riskAssessment}
                  </p>
                </div>
                <div className="text-[10px] text-slate-600 font-mono text-right mt-2">
                  Generated by Gemini • {new Date(aiReport.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2">
                <Bot size={32} className="opacity-20" />
                <p className="text-xs font-mono text-center max-w-[200px]">
                  Sistema en espera. Inicie análisis para correlacionar vectores de inteligencia.
                </p>
              </div>
            )}
          </Panel>
        </div>

      </main>

      {/* Footer / Status Bar */}
      <footer className="border-t border-slate-800 bg-slate-950 p-2 flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-emerald-500"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> ONLINE</span>
          <span>LATENCY: 45ms</span>
          <span>DATA SOURCES: SECOP II / INDEPAZ / BANREP / ADS-B / PROCURADURÍA</span>
        </div>
        <div>
           LAST UPDATE: {lastUpdated}
        </div>
      </footer>
    </div>
  );
}

export default App;