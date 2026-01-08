import { SecurityAlert, AlertLevel, Contract, EconomicIndicator, LegislativeBill, GraphNode, GraphLink, TrackedObject, FiscalSanction, NewsItem, RoyaltyProject, CampaignDonation } from '../types';

// Simulate the "current_situation.json" output from the Python backend
export const getSecurityAlerts = (): SecurityAlert[] => [
  {
    id: '1',
    region: 'Pacífica',
    department: 'Cauca',
    type: 'ORDEN_PUBLICO',
    description: 'Enfrentamientos en zona rural de Argelia.',
    timestamp: new Date().toISOString(),
    level: AlertLevel.CRITICAL,
    coordinates: { x: 30, y: 70 }
  },
  {
    id: '2',
    region: 'Andina',
    department: 'Bogotá D.C.',
    type: 'MOVILIZACION',
    description: 'Marchas programadas hacia Plaza de Bolívar.',
    timestamp: new Date().toISOString(),
    level: AlertLevel.MEDIUM,
    coordinates: { x: 45, y: 50 }
  },
  {
    id: '3',
    region: 'Caribe',
    department: 'La Guajira',
    type: 'CLIMA',
    description: 'Alerta por sequía extrema en Alta Guajira.',
    timestamp: new Date().toISOString(),
    level: AlertLevel.HIGH,
    coordinates: { x: 50, y: 15 }
  },
  {
    id: '4',
    region: 'Andina',
    department: 'Antioquia',
    type: 'BLOQUEO',
    description: 'Cierre parcial Vía al Mar por deslizamiento.',
    timestamp: new Date().toISOString(),
    level: AlertLevel.HIGH,
    coordinates: { x: 35, y: 35 }
  },
  // Extra points for layers
  {
    id: '5',
    region: 'Antioquia',
    department: 'Bajo Cauca',
    type: 'MINERIA',
    description: 'Minería ilegal detectada en río Nechí.',
    timestamp: new Date().toISOString(),
    level: AlertLevel.HIGH,
    coordinates: { x: 38, y: 30 }
  },
  {
    id: '6',
    region: 'Catatumbo',
    department: 'Norte de Santander',
    type: 'CULTIVOS',
    description: 'Aumento densidad hoja de coca.',
    timestamp: new Date().toISOString(),
    level: AlertLevel.HIGH,
    coordinates: { x: 55, y: 25 }
  }
];

export const getRecentContracts = (): Contract[] => [
  {
    id: 'CT-2024-001',
    entidad: 'UNGRD',
    objeto: 'Suministro de carrotanques para emergencia hídrica',
    valor: 45000000000,
    fecha: '2024-05-20',
    url: '#',
    flags: ['UNGRD', 'Emergencia']
  },
  {
    id: 'CT-2024-002',
    entidad: 'MinTIC',
    objeto: 'Conectividad escuelas rurales Fase 3',
    valor: 1200000000,
    fecha: '2024-05-19',
    url: '#',
    flags: []
  },
  {
    id: 'CT-2024-003',
    entidad: 'INVIAS',
    objeto: 'Mantenimiento preventivo Ruta del Sol',
    valor: 8500000000,
    fecha: '2024-05-18',
    url: '#',
    flags: ['Infraestructura']
  },
  {
    id: 'CT-2024-004',
    entidad: 'Alcaldía de Medellín',
    objeto: 'Renovación infraestructura tecnológica',
    valor: 3200000000,
    fecha: '2024-05-18',
    url: '#',
    flags: []
  },
  {
    id: 'CT-2024-005',
    entidad: 'Ejército Nacional',
    objeto: 'Adquisición de dotación y víveres',
    valor: 15000000000,
    fecha: '2024-05-17',
    url: '#',
    flags: ['Defensa']
  }
];

export const getEconomicData = (): EconomicIndicator[] => {
  const generateHistory = (base: number, volatility: number) => {
    return Array.from({ length: 10 }, (_, i) => ({
      time: `${9 + i}:00`,
      value: base + (Math.random() * volatility - volatility / 2)
    }));
  };

  return [
    {
      name: 'TRM (USD)',
      value: 3950.25,
      change: -0.45,
      history: generateHistory(3950, 20)
    },
    {
      name: 'Brent Oil',
      value: 82.40,
      change: 1.2,
      history: generateHistory(82, 2)
    },
    {
      name: 'BVC Colcap',
      value: 1350.5,
      change: 0.8,
      history: generateHistory(1350, 10)
    }
  ];
};

export const getLegislativeBills = (): LegislativeBill[] => [
  {
    id: 'PL-234',
    code: 'PL 234/24',
    title: 'Reforma a la Salud - Segundo Debate',
    stage: 'Senado - Plenaria',
    lastUpdate: 'Hace 2 horas'
  },
  {
    id: 'PL-110',
    code: 'PL 110/24',
    title: 'Ley Estatutaria de Educación',
    stage: 'Comisión Primera',
    lastUpdate: 'Hace 4 horas'
  }
];

export const getPowerGraph = (): { nodes: GraphNode[], links: GraphLink[] } => {
  return {
    nodes: [
      { id: '1', label: 'Alcaldía M.', type: 'ENTIDAD', riskLevel: 'LOW', x: 50, y: 20 },
      { id: '2', label: 'Consorcio Vías', type: 'EMPRESA', riskLevel: 'HIGH', x: 50, y: 50 },
      { id: '3', label: 'Senador X', type: 'PERSONA', riskLevel: 'HIGH', x: 80, y: 50 },
      { id: '4', label: 'CT-9902', type: 'CONTRATO', riskLevel: 'LOW', x: 50, y: 35 },
      { id: '5', label: 'Inversiones SAS', type: 'EMPRESA', riskLevel: 'LOW', x: 20, y: 50 },
      { id: '6', label: 'Campaña 2026', type: 'ENTIDAD', riskLevel: 'HIGH', x: 80, y: 80 },
    ],
    links: [
      { source: '1', target: '4', relation: 'ADJUDICA' },
      { source: '2', target: '4', relation: 'GANA' },
      { source: '2', target: '3', relation: 'FINANCIA' },
      { source: '5', target: '2', relation: 'SOCIO' },
      { source: '3', target: '6', relation: 'CANDIDATO' },
    ]
  };
};

export const getTacticalTraffic = (): TrackedObject[] => [
  { id: 't1', callsign: 'PNC-0231', type: 'AIR', entity: 'Policía Nacional', status: 'PATRULLAJE', lat: 35, lng: 75, heading: 45 },
  { id: 't2', callsign: 'FAC-1002', type: 'AIR', entity: 'Fuerza Aérea', status: 'OPERACIÓN', lat: 25, lng: 20, heading: 180 },
  { id: 't3', callsign: 'HK-5690', type: 'AIR', entity: 'Privado', status: 'DESCONOCIDO', lat: 70, lng: 60, heading: 270 },
  { id: 't4', callsign: 'ARC-Indep', type: 'SEA', entity: 'Armada', status: 'VIGILANCIA', lat: 10, lng: 15, heading: 90 },
];

export const getFiscalSanctions = (): FiscalSanction[] => [
  { id: 's1', entityName: 'Constructora del Norte SAS', idNumber: '900.123.456', source: 'CONTRALORÍA', reason: 'Resp. Fiscal por obra inconclusa', amount: 5000000000 },
  { id: 's2', entityName: 'Juan Pérez (Ex-Alcalde)', idNumber: '79.xxx.xxx', source: 'PROCURADURÍA', reason: 'Inhabilidad por 10 años' },
];

export const getNews = (): NewsItem[] => [
  { id: 'n1', source: 'El Tiempo', title: 'Gobierno anuncia nuevo decreto de orden público', time: '10:30 AM', category: 'POLITICA' },
  { id: 'n2', source: 'Semana', title: 'Exclusivo: Los audios del escándalo en la UNGRD', time: '09:15 AM', category: 'JUDICIAL' },
  { id: 'n3', source: 'Twitter', title: 'Reportan bloqueos en la vía Panamericana #ParoNacional', time: '11:00 AM', category: 'ORDEN_PUBLICO' },
  { id: 'n4', source: 'La Silla', title: 'El mapa de poder en el Congreso tras la reforma', time: '08:45 AM', category: 'POLITICA' },
];

export const getRoyalties = (): RoyaltyProject[] => [
  { id: 'r1', municipio: 'Puerto Gaitán', project: 'Pavimentación Vía Principal', amount: 15000000000, progress: 35 },
  { id: 'r2', municipio: 'Arauca', project: 'Construcción Acueducto Veredal', amount: 8500000000, progress: 12 },
  { id: 'r3', municipio: 'Montelíbano', project: 'Dotación Hospital Nivel 2', amount: 22000000000, progress: 85 },
];

export const getCampaignDonations = (): CampaignDonation[] => [
  { id: 'c1', candidate: 'Pedro Gomez', party: 'Partido A', donor: 'Inversiones Los Andes', amount: 50000000 },
  { id: 'c2', candidate: 'Maria Lopez', party: 'Movimiento B', donor: 'Grupo Constructor del Sur', amount: 120000000 },
  { id: 'c3', candidate: 'Juan Diaz', party: 'Partido C', donor: 'Suministros del Norte SAS', amount: 35000000 },
];