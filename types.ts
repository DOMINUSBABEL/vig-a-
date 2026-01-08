export enum AlertLevel {
  LOW = 'BAJO',
  MEDIUM = 'MEDIO',
  HIGH = 'ALTO',
  CRITICAL = 'CRÍTICO'
}

export interface SecurityAlert {
  id: string;
  region: string;
  department: string; // Departamento
  type: 'BLOQUEO' | 'ORDEN_PUBLICO' | 'CLIMA' | 'MOVILIZACION' | 'CULTIVOS' | 'MINERIA';
  description: string;
  timestamp: string;
  level: AlertLevel;
  coordinates: { x: number; y: number }; // Relative coordinates for the map
}

export interface Contract {
  id: string;
  entidad: string;
  objeto: string;
  valor: number;
  fecha: string;
  url: string;
  flags: string[]; // e.g., "UNGRD", "Emergencia"
}

export interface EconomicIndicator {
  name: string;
  value: number;
  change: number; // Percentage
  history: { time: string; value: number }[];
}

export interface LegislativeBill {
  id: string;
  code: string;
  title: string;
  stage: string; // Debate stage
  lastUpdate: string;
}

export interface AIReport {
  summary: string;
  riskAssessment: string;
  timestamp: string;
}

// --- INTEL TYPES ---

export interface GraphNode {
  id: string;
  label: string;
  type: 'PERSONA' | 'EMPRESA' | 'ENTIDAD' | 'CONTRATO';
  riskLevel: 'LOW' | 'HIGH';
  x: number;
  y: number;
}

export interface GraphLink {
  source: string;
  target: string;
  relation: string;
}

export interface TrackedObject {
  id: string;
  callsign: string;
  type: 'AIR' | 'SEA';
  entity: string; // e.g., "Policía", "Private"
  status: string;
  lat: number; // Relative 0-100
  lng: number; // Relative 0-100
  heading: number;
}

export interface FiscalSanction {
  id: string;
  entityName: string; // Name of person or company
  idNumber: string; // NIT or CC
  source: 'CONTRALORÍA' | 'PROCURADURÍA' | 'OFAC';
  reason: string;
  amount?: number;
}

export interface NewsItem {
  id: string;
  source: string; // 'El Tiempo', 'Semana', 'Twitter'
  title: string;
  time: string;
  category: 'POLITICA' | 'JUDICIAL' | 'ORDEN_PUBLICO';
}

export interface RoyaltyProject {
  id: string;
  municipio: string;
  project: string;
  amount: number;
  progress: number;
}

export interface CampaignDonation {
  id: string;
  candidate: string;
  donor: string;
  amount: number;
  party: string;
}