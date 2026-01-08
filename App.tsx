import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Panel } from './components/ui/Panel';
import { MapModule } from './components/MapModule';
import { ContractTicker } from './components/ContractTicker';
import { EconomicModule } from './components/EconomicModule';
import { LegislativeList } from './components/LegislativeList';
import { TacticalRadar } from './components/TacticalRadar';
import { NewsPanel } from './components/NewsPanel';
import { RoyaltiesPanel } from './components/RoyaltiesPanel';
import { CampaignPanel } from './components/CampaignPanel';
import { generateSituationReport } from './services/geminiService';
import { 
  getSecurityAlerts, 
  getRecentContracts, 
  getEconomicData, 
  getLegislativeBills,
  getTacticalTraffic,
  getFiscalSanctions,
  getNews,
  getRoyalties,
  getCampaignDonations
} from './services/mockDataService';
import { SecurityAlert, Contract, EconomicIndicator, LegislativeBill, AIReport, TrackedObject, FiscalSanction, NewsItem, RoyaltyProject, CampaignDonation } from './types';
import { Bot, RefreshCw } from 'lucide-react';

function App() {
  // State
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [economy, setEconomy] = useState<EconomicIndicator[]>([]);
  const [bills, setBills] = useState<LegislativeBill[]>([]);
  const [traffic, setTraffic] = useState<TrackedObject[]>([]);
  const [sanctions, setSanctions] = useState<FiscalSanction[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [royalties, setRoyalties] = useState<RoyaltyProject[]>([]);
  const [donations, setDonations] = useState<CampaignDonation[]>([]);

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
      setTraffic(getTacticalTraffic());
      setSanctions(getFiscalSanctions());
      setNews(getNews());
      setRoyalties(getRoyalties());
      setDonations(getCampaignDonations());

      setLastUpdated(new Date().toLocaleTimeString());
    };
    
    loadData();
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

      <main className="flex-grow p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-min">
        
        {/* ROW 1: MAP (HERO SECTION) */}
        <div className="lg:col-span-2 min-h-[400px]">
           <Panel title="SALA DE SITUACIÓN // COLOMBIA" className="h-full">
             <MapModule alerts={alerts} />
           </Panel>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
           <Panel title="NOTICIAS & REDES (RSS)" className="flex-grow min-h-[200px]">
             <NewsPanel news={news} />
           </Panel>
           <Panel title="TÁCTICO (VUELOS)" className="h-[200px]">
             <div className="h-full p-2">
               <TacticalRadar objects={traffic} />
             </div>
           </Panel>
        </div>

        {/* ROW 2: INTEL PANELS */}
        <div className="lg:col-span-1 h-80">
          <Panel title="VIGILANCIA SECOP II" className="h-full">
             <ContractTicker contracts={contracts} />
          </Panel>
        </div>
        <div className="lg:col-span-1 h-80">
           <Panel title="CUENTAS CLARAS (CNE)" className="h-full">
             <CampaignPanel donations={donations} />
           </Panel>
        </div>
        <div className="lg:col-span-1 h-80">
           <Panel title="REGALÍAS (SICEP/DNP)" className="h-full">
             <RoyaltiesPanel projects={royalties} />
           </Panel>
        </div>

        {/* ROW 3: MACRO & LEGISLATIVE */}
        <div className="lg:col-span-1 h-64">
           <Panel title="VARIABLES MACRO" className="h-full">
             <EconomicModule data={economy} />
           </Panel>
        </div>
        <div className="lg:col-span-1 h-64">
           <Panel title="LEGISLATIVO (CONGRESO)" className="h-full">
             <LegislativeList bills={bills} />
           </Panel>
        </div>
        <div className="lg:col-span-1 h-64">
          <Panel 
              title="SITREP (IA)" 
              className="h-full border-t-4 border-t-emerald-500"
              action={
                <button 
                  onClick={handleGenerateAIReport}
                  disabled={loadingAI}
                  className="flex items-center gap-2 px-2 py-0.5 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 text-[10px] font-mono border border-emerald-800 rounded transition-all disabled:opacity-50"
                >
                  {loadingAI ? <RefreshCw className="animate-spin" size={10}/> : <Bot size={10}/>}
                  {loadingAI ? '...' : 'GENERAR'}
                </button>
              }
            >
              {aiReport ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-y-auto max-h-full">
                  <h4 className="text-xs text-emerald-600 font-bold uppercase mb-1">Resumen</h4>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed mb-2 border-l-2 border-emerald-900 pl-2">
                    {aiReport.summary}
                  </p>
                  <h4 className="text-xs text-emerald-600 font-bold uppercase mb-1">Amenaza</h4>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed border-l-2 border-emerald-900 pl-2">
                    {aiReport.riskAssessment}
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                  <Bot size={24} className="opacity-20 mb-2" />
                  <p className="text-[10px] font-mono text-center">Esperando análisis.</p>
                </div>
              )}
            </Panel>
        </div>

      </main>

      {/* Footer / Status Bar */}
      <footer className="border-t border-slate-800 bg-slate-950 p-2 flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-emerald-500"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> ONLINE</span>
          <span>LATENCY: 42ms</span>
          <span>NODES: 15</span>
        </div>
        <div>
           LAST UPDATE: {lastUpdated}
        </div>
      </footer>
    </div>
  );
}

export default App;