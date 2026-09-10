export type RoleType = 'farmer' | 'fpo' | 'officer';

export interface FarmZone {
  id: string;
  name: string;
  crop: string;
  area: string;
  soilMoisture: number;
  cropHealth: number;
  waterStress: 'Low' | 'Medium' | 'High';
  pestRisk: 'Low' | 'Medium' | 'High';
  recommendedAction: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface ActionPlanItem {
  id: string;
  category: 'URGENT' | 'WATER' | 'CROP' | 'MARKET';
  title: string;
  reason: string;
  recommended: string;
  completed: boolean;
  severity: 'high' | 'medium' | 'low';
}

export interface FarmCluster {
  id: string;
  name: string;
  farmersCount: number;
  acreage: number;
  crop: string;
  avgWaterRisk: number;
  avgHealth: number;
  status: 'Stable' | 'Watch' | 'Critical';
  intervention: string;
  x: number;
  y: number;
}

export interface DistrictZone {
  id: string;
  name: string;
  droughtExposure: string;
  waterStress: string;
  priority: 'Priority 1' | 'Priority 2' | 'Priority 3';
  action: string;
}

export const FARMER_KPIS = {
  resilienceScore: 82,
  resilienceStatus: 'Stable — Moderate climate risk',
  breakdown: {
    waterResilience: 76,
    cropHealth: 88,
    climateRisk: 71,
    soilCondition: 84,
    pestRisk: 82,
    marketConfidence: 79
  },
  cropHealthPercent: 88,
  waterStatusPercent: 72,
  rainfall7d: '34 mm',
  rainfallTrend: '↓ 12%',
  expectedYield: '18.4 q',
  yieldTrend: '+6.8%',
  waterUsage: '3,820 L',
  waterUsageTrend: '↓ 18%',
  expectedProfit: '₹46,800',
  profitTrend: '+13%'
};

export const FARM_ZONES: FarmZone[] = [
  {
    id: 'zone-a',
    name: 'Zone A',
    crop: 'Soybean (JS-335)',
    area: '0.8 acre',
    soilMoisture: 61,
    cropHealth: 91,
    waterStress: 'Low',
    pestRisk: 'Medium',
    recommendedAction: 'Monitor leaf moisture for the next 24 hours. Drip cycle nominal.',
    x: 40,
    y: 40,
    width: 260,
    height: 180,
    color: '#10B981'
  },
  {
    id: 'zone-b',
    name: 'Zone B',
    crop: 'Soybean (Pod Fill Stage)',
    area: '0.6 acre',
    soilMoisture: 54,
    cropHealth: 84,
    waterStress: 'Medium',
    pestRisk: 'Low',
    recommendedAction: 'Schedule 2,180 L drip irrigation tomorrow morning 06:00 - 08:00.',
    x: 320,
    y: 40,
    width: 240,
    height: 180,
    color: '#34D399'
  },
  {
    id: 'zone-c',
    name: 'Zone C',
    crop: 'Onion (Rabi Patch)',
    area: '0.5 acre',
    soilMoisture: 48,
    cropHealth: 79,
    waterStress: 'Medium',
    pestRisk: 'High',
    recommendedAction: 'Inspect for early fungal leaf spot within 24 hours. Avoid overhead sprinkler.',
    x: 40,
    y: 240,
    width: 260,
    height: 180,
    color: '#F59E0B'
  },
  {
    id: 'zone-d',
    name: 'Zone D',
    crop: 'Maize (Fodder Buffer)',
    area: '0.5 acre',
    soilMoisture: 68,
    cropHealth: 91,
    waterStress: 'Low',
    pestRisk: 'Low',
    recommendedAction: 'Soil condition optimal. Maintain 3-day moisture checking cycle.',
    x: 320,
    y: 240,
    width: 240,
    height: 180,
    color: '#059669'
  }
];

export const WATER_BALANCE_DATA = [
  { day: 'Today', rainfall: 8, moisture: 61, irrigation: 1200, demand: 1850 },
  { day: '+1 Day', rainfall: 2, moisture: 56, irrigation: 2460, demand: 1920 },
  { day: '+2 Days', rainfall: 0, moisture: 51, irrigation: 0, demand: 1980 },
  { day: '+3 Days', rainfall: 0, moisture: 46, irrigation: 2200, demand: 2040 },
  { day: '+4 Days', rainfall: 5, moisture: 52, irrigation: 0, demand: 1900 },
  { day: '+5 Days', rainfall: 12, moisture: 64, irrigation: 0, demand: 1820 },
  { day: '+6 Days', rainfall: 4, moisture: 60, irrigation: 1500, demand: 1850 },
  { day: '+7 Days', rainfall: 3, moisture: 58, irrigation: 0, demand: 1880 }
];

export const CLIMATE_FORECAST_DATA = [
  { day: 'Today', maxTemp: 28, minTemp: 20, rainfallProb: 35, humidity: 72 },
  { day: 'Tomorrow', maxTemp: 30, minTemp: 21, rainfallProb: 15, humidity: 64 },
  { day: 'Day 3', maxTemp: 32, minTemp: 22, rainfallProb: 5, humidity: 58 },
  { day: 'Day 4', maxTemp: 33, minTemp: 23, rainfallProb: 10, humidity: 55 },
  { day: 'Day 5', maxTemp: 31, minTemp: 21, rainfallProb: 65, humidity: 80 },
  { day: 'Day 6', maxTemp: 29, minTemp: 20, rainfallProb: 40, humidity: 75 },
  { day: 'Day 7', maxTemp: 28, minTemp: 19, rainfallProb: 25, humidity: 70 }
];

export const YIELD_PROFIT_DATA = [
  { month: 'Jun', yield: 12.2, profit: 31000 },
  { month: 'Jul', yield: 14.5, profit: 36500 },
  { month: 'Aug', yield: 16.8, profit: 42000 },
  { month: 'Sep (Forecast)', yield: 18.4, profit: 46800 },
  { month: 'Oct (Proj)', yield: 19.2, profit: 49500 }
];

export const INITIAL_ACTION_PLAN: ActionPlanItem[] = [
  {
    id: 'act-1',
    category: 'URGENT',
    title: 'Inspect Zone C Onion Crop',
    reason: 'Elevated fungal pest risk detected via leaf humidity sensors.',
    recommended: 'Inspect within 24 hours & apply organic bio-fungicide if spots visible.',
    completed: false,
    severity: 'high'
  },
  {
    id: 'act-2',
    category: 'WATER',
    title: 'Irrigate Zone B Soybean',
    reason: 'Soil moisture dropped to 54% threshold.',
    recommended: 'Schedule 2,180 L drip irrigation tomorrow 06:00–08:00.',
    completed: false,
    severity: 'medium'
  },
  {
    id: 'act-3',
    category: 'CROP',
    title: 'Apply Potassium & Zinc Micronutrient',
    reason: 'Pod filling stage requires root uptake boost before heat surge.',
    recommended: 'Foliar spray within 48 hours for Zone A & B.',
    completed: false,
    severity: 'low'
  },
  {
    id: 'act-4',
    category: 'MARKET',
    title: 'Hold Soybean Harvest Sale for 5 Days',
    reason: 'Mandi arrival drop predicted to boost price by +8% to +12%.',
    recommended: 'Store in dry warehouse & lock buyer contract next Monday.',
    completed: false,
    severity: 'medium'
  }
];

export const TIMELINE_OUTLOOK = [
  { day: 'Day 1', label: 'Drip Irrigation', type: 'water', detail: 'Zone B 2,180 L allocation' },
  { day: 'Day 4', label: 'Heat Stress Risk', type: 'climate', detail: 'Temp surges to 33°C' },
  { day: 'Day 7', label: 'Pest Monitoring', type: 'crop', detail: 'Re-inspect Zone C leaf moisture' },
  { day: 'Day 11', label: 'Nutrient Window', type: 'crop', detail: 'Foliar application cycle 2' },
  { day: 'Day 16', label: 'Rainfall Opportunity', type: 'water', detail: '12mm expected shower' },
  { day: 'Day 23', label: 'Harvest Prep', type: 'market', detail: 'Pre-harvest moisture testing' },
  { day: 'Day 28', label: 'Expected Harvest', type: 'market', detail: 'Estimated yield 18.4 quintals' }
];

export const FPO_DATA = {
  totalFarmers: 1284,
  totalAcreage: 8420,
  highWaterRisk: 126,
  highCropRisk: 82,
  expectedYieldBoost: '+7.4%',
  waterSavedM: '1.8M L',
  clusters: [
    { id: 'cl-1', name: 'Junner North Cluster', farmersCount: 340, acreage: 2100, crop: 'Soybean / Vegetables', avgWaterRisk: 34, avgHealth: 86, status: 'Stable', intervention: 'Maintain automated drip schedules', x: 25, y: 30 },
    { id: 'cl-2', name: 'Khed Watershed Cluster', farmersCount: 420, acreage: 2800, crop: 'Onion / Tomato', avgWaterRisk: 68, avgHealth: 74, status: 'Watch', intervention: 'Deploy mobile water tankers & solar pumps', x: 60, y: 45 },
    { id: 'cl-3', name: 'Baramati Canal Zone', farmersCount: 280, acreage: 1900, crop: 'Sugarcane / Maize', avgWaterRisk: 78, avgHealth: 71, status: 'Critical', intervention: 'Issue priority canal rotation advisory', x: 45, y: 70 }
  ] as FarmCluster[]
};

export const OFFICER_DATA = {
  districtResilienceScore: 76,
  districtName: 'Pune District',
  highRiskFarms: 208,
  waterStressZones: 4,
  droughtExposure: 'Moderate',
  cropFailureProb: '12%',
  interventionPriority: 'Immediate',
  priorityZones: [
    { id: 'pz-1', name: 'Zone A — Shirur Eastern Belt', droughtExposure: 'High (34% deficit)', waterStress: 'Critical', priority: 'Priority 1', action: 'Deploy emergency drip irrigation subsidy & issue crop diversification advisory.' },
    { id: 'pz-2', name: 'Zone B — Indapur Basin', droughtExposure: 'Moderate', waterStress: 'Warning', priority: 'Priority 2', action: 'Release secondary canal gate water & inspect soil moisture sensors.' },
    { id: 'pz-3', name: 'Zone C — Haveli Peripheral', droughtExposure: 'Low', waterStress: 'Normal', priority: 'Priority 3', action: 'Routine agricultural officer inspection.' }
  ] as DistrictZone[]
};
