export interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage coordinate on SVG map
  y: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  rainfall: string;
  waterLevel: string;
  drainageCapacity: string;
  predictedRisk: string;
  aiForecast: string;
  recommendedAction: string;
  aqi?: number;
  congestion?: number;
  description: string;
}

export interface SensorItem {
  id: string;
  type: 'Air Quality' | 'Water Level' | 'Rainfall' | 'Vehicle Fleet';
  location: string;
  reading: string;
  status: 'Online' | 'Warning' | 'Offline';
  lastUpdate: string;
  battery?: string;
}

export interface InfrastructureItem {
  id: string;
  name: string;
  type: 'Reservoir' | 'Pumping Station' | 'Drainage Zone' | 'Sensor' | 'Treatment Plant';
  location: string;
  capacityOrLoad: string;
  status: 'Normal' | 'Warning' | 'Critical';
  currentReading: string;
  lastUpdated: string;
}

export interface PredictiveAlert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  predictionWindow: string;
  confidence: number;
  location: string;
  metric: string;
  timestamp: string;
  status: 'Unassigned' | 'Assigned' | 'Resolved';
}

export interface GreenRouteOption {
  id: string;
  title: string;
  type: 'fastest' | 'emission' | 'exposure';
  duration: string;
  distance: string;
  co2Reduction?: string;
  exposureReduction?: string;
  isRecommended?: boolean;
  via: string;
  color: string;
}

export interface CityData {
  id: string;
  name: string;
  state: string;
  org: string;
  aqi: number;
  aqiStatus: string;
  congestion: number;
  waterRiskScore: number;
  waterResilienceScore: number;
  floodReadiness: number;
  waterAvailability: number;
  co2Reduction: number;
  rainfall: string;
  waterLevel: string;
  hotspots: Hotspot[];
  infrastructure: InfrastructureItem[];
}

export const CITIES: Record<string, CityData> = {
  pune: {
    id: 'pune',
    name: 'Pune',
    state: 'MH',
    org: 'PMC Command',
    aqi: 87,
    aqiStatus: 'Moderate',
    congestion: 64,
    waterRiskScore: 32,
    waterResilienceScore: 78,
    floodReadiness: 72,
    waterAvailability: 68,
    co2Reduction: 12.8,
    rainfall: '42 mm',
    waterLevel: '3.2 m',
    hotspots: [
      {
        id: 'kharadi',
        name: 'Kharadi',
        x: 75,
        y: 38,
        riskLevel: 'High',
        rainfall: '58 mm / 3h',
        waterLevel: '4.7 m',
        drainageCapacity: '71%',
        predictedRisk: 'Localized flooding in 2 hours',
        aiForecast: 'High probability of localized flooding within 2 hours due to heavy runoff upstream.',
        recommendedAction: 'Inspect drainage channel D-14 and activate nearby pumping station PS-07.',
        aqi: 94,
        congestion: 78,
        description: 'Tech Hub & Residential District near Mula-Mutha river bank'
      },
      {
        id: 'hadapsar',
        name: 'Hadapsar',
        x: 70,
        y: 65,
        riskLevel: 'Moderate',
        rainfall: '46 mm / 3h',
        waterLevel: '3.9 m',
        drainageCapacity: '82%',
        predictedRisk: 'Drainage bottleneck within 3 hours',
        aiForecast: 'Drainage stress accumulating near industrial bypass. Backflow risk moderate.',
        recommendedAction: 'Deploy mobile drainage pumps and clear canal gate H-04.',
        aqi: 112,
        congestion: 72,
        description: 'Industrial Corridor & High Traffic Density Hub'
      },
      {
        id: 'baner',
        name: 'Baner',
        x: 28,
        y: 30,
        riskLevel: 'Moderate',
        rainfall: '51 mm / 3h',
        waterLevel: '3.5 m',
        drainageCapacity: '65%',
        predictedRisk: 'Surface runoff risk',
        aiForecast: 'Hillside runoff accelerating towards main arterial road. Culvert clearance suggested.',
        recommendedAction: 'Divert highway traffic and verify storm drain flow rate at B-02.',
        aqi: 72,
        congestion: 58,
        description: 'High-density commercial corridor with steep hillside catchment'
      },
      {
        id: 'yerawada',
        name: 'Yerawada',
        x: 62,
        y: 35,
        riskLevel: 'Moderate',
        rainfall: '44 mm / 3h',
        waterLevel: '4.1 m',
        drainageCapacity: '68%',
        predictedRisk: 'Rising river bank water level',
        aiForecast: 'River gauge WS-108 shows steady 0.3m per hour rise. Low-lying bridge alert.',
        recommendedAction: 'Alert bridge operations center and monitor sensor WS-108 continuous stream.',
        aqi: 88,
        congestion: 65,
        description: 'Mula-Mutha river confluence & transit hub'
      },
      {
        id: 'shivajinagar',
        name: 'Shivajinagar',
        x: 48,
        y: 48,
        riskLevel: 'Low',
        rainfall: '28 mm / 3h',
        waterLevel: '2.4 m',
        drainageCapacity: '42%',
        predictedRisk: 'Minimal risk',
        aiForecast: 'Central city drainage functioning at nominal capacity. No immediate threat.',
        recommendedAction: 'Routine monitoring active.',
        aqi: 65,
        congestion: 82,
        description: 'Central Administrative & Transport Hub'
      }
    ],
    infrastructure: [
      { id: 'infra-1', name: 'Pashan Reservoir', type: 'Reservoir', location: 'Pashan Lake Zone', capacityOrLoad: '68% Capacity', status: 'Normal', currentReading: '3.4m Outflow Nominal', lastUpdated: '2 min ago' },
      { id: 'infra-2', name: 'Khadakwasla Dam', type: 'Reservoir', location: 'Khadakwasla Basin', capacityOrLoad: '74% Capacity', status: 'Normal', currentReading: '8.1m Hydrostatic Head', lastUpdated: '1 min ago' },
      { id: 'infra-3', name: 'Pump Station #07 (PS-07)', type: 'Pumping Station', location: 'Hadapsar Bypass', capacityOrLoad: '92% Load', status: 'Warning', currentReading: 'Auxiliary Turbines Active', lastUpdated: 'Just now' },
      { id: 'infra-4', name: 'Drainage Zone D-14', type: 'Drainage Zone', location: 'Kharadi Sector 3', capacityOrLoad: '78% Capacity', status: 'Warning', currentReading: 'High Surface Velocity', lastUpdated: '3 min ago' },
      { id: 'infra-5', name: 'Water Sensor WS-204', type: 'Sensor', location: 'Mutha River Bank (Near Bridge)', capacityOrLoad: 'Online (100% Signal)', status: 'Normal', currentReading: '3.2m Surface Height', lastUpdated: '12 sec ago' },
      { id: 'infra-6', name: 'Treatment Plant TP-02', type: 'Treatment Plant', location: 'Yerawada Industrial', capacityOrLoad: '84% Flow Rate', status: 'Normal', currentReading: '120 MLD Process Rate', lastUpdated: '5 min ago' }
    ]
  },
  mumbai: {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'MH',
    org: 'BMC Command',
    aqi: 114,
    aqiStatus: 'Unhealthy for Sensitive Groups',
    congestion: 78,
    waterRiskScore: 68,
    waterResilienceScore: 62,
    floodReadiness: 58,
    waterAvailability: 82,
    co2Reduction: 8.4,
    rainfall: '76 mm',
    waterLevel: '4.8 m',
    hotspots: [
      { id: 'hindmata', name: 'Hindmata Dadar', x: 50, y: 55, riskLevel: 'Critical', rainfall: '92 mm / 3h', waterLevel: '5.6 m', drainageCapacity: '96%', predictedRisk: 'High Tide Storm Surge Overflow', aiForecast: 'High tide matching heavy rainfall will cause severe waterlogging in Dadar lowlands.', recommendedAction: 'Activate Hindmata Underground Surge Holding Tanks & Sump Pumps.', aqi: 124, congestion: 88, description: 'Low-lying Central Transit Hub & Dense Commercial Area' },
      { id: 'kurla', name: 'Kurla West', x: 62, y: 40, riskLevel: 'High', rainfall: '84 mm / 3h', waterLevel: '5.1 m', drainageCapacity: '88%', predictedRisk: 'Mithi River Overspill', aiForecast: 'Mithi river channel gauge approaching crest level. Immediate sluice gate operation required.', recommendedAction: 'Deploy Disaster Response Force Unit #1 to Mithi embankment.', aqi: 118, congestion: 82, description: 'Mithi River Drainage Catchment & Railway Junction' },
      { id: 'andheri', name: 'Andheri Subway', x: 38, y: 28, riskLevel: 'High', rainfall: '78 mm / 3h', waterLevel: '4.2 m', drainageCapacity: '91%', predictedRisk: 'Subway Flooding', aiForecast: 'Surface runoff accumulating in vehicular underpass.', recommendedAction: 'Close subway to vehicular traffic and engage dewatering pumps.', aqi: 108, congestion: 92, description: 'Arterial East-West Connectivity Underpass' }
    ],
    infrastructure: [
      { id: 'm-1', name: 'Vaitarna Reservoir', type: 'Reservoir', location: 'Nashik Catchment', capacityOrLoad: '88% Capacity', status: 'Normal', currentReading: '12.4m Safe Elevation', lastUpdated: '1 min ago' },
      { id: 'm-2', name: 'Cleave Land Pumping Station', type: 'Pumping Station', location: 'Worli Coast', capacityOrLoad: '95% Load', status: 'Warning', currentReading: '40 Cumec Discharge Rate', lastUpdated: 'Just now' },
      { id: 'm-3', name: 'Mithi River Gauge WS-01', type: 'Sensor', location: 'Bandra-Kurla Complex', capacityOrLoad: 'Online', status: 'Critical', currentReading: '5.1m Surge Height', lastUpdated: '10 sec ago' }
    ]
  },
  bengaluru: {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'KA',
    org: 'BBMP Command',
    aqi: 68,
    aqiStatus: 'Moderate',
    congestion: 82,
    waterRiskScore: 48,
    waterResilienceScore: 71,
    floodReadiness: 66,
    waterAvailability: 54,
    co2Reduction: 14.2,
    rainfall: '38 mm',
    waterLevel: '2.8 m',
    hotspots: [
      { id: 'bellandur', name: 'Bellandur Lake Catchment', x: 72, y: 52, riskLevel: 'High', rainfall: '52 mm / 3h', waterLevel: '3.8 m', drainageCapacity: '84%', predictedRisk: 'Lake Cascade Overflow', aiForecast: 'Stormwater overflow from Varthur cascade accumulating at ORR junction.', recommendedAction: 'Clear Rajakaluve drain blockages near EcoSpace Flyover.', aqi: 74, congestion: 94, description: 'IT Corridor & Wetland Lake Cascade System' },
      { id: 'silkboard', name: 'Silk Board Junction', x: 55, y: 68, riskLevel: 'Moderate', rainfall: '42 mm / 3h', waterLevel: '2.9 m', drainageCapacity: '76%', predictedRisk: 'Traffic Gridlock & Surface Runoff', aiForecast: 'Slow drainage flow combined with high traffic volume.', recommendedAction: 'Deploy BBMP mobile pump truck #3.', aqi: 82, congestion: 98, description: 'Major Multi-Corridor Traffic Junction' }
    ],
    infrastructure: [
      { id: 'b-1', name: 'Cauvery Supply Phase 4', type: 'Treatment Plant', location: 'TK Halli Station', capacityOrLoad: '78% Capacity', status: 'Normal', currentReading: '550 MLD Supply Rate', lastUpdated: '4 min ago' },
      { id: 'b-2', name: 'Bellandur Sluice Gate 02', type: 'Pumping Station', location: 'Outer Ring Road', capacityOrLoad: '82% Load', status: 'Warning', currentReading: 'Outflow Nominal', lastUpdated: '1 min ago' }
    ]
  }
};

export const INITIAL_KPIS = CITIES.pune;

export const WATER_PRIMARY_METRICS = {
  rainfall: { value: '42 mm', label: 'Last 24 hours', trend: '↑ 18%', isWarning: false },
  waterLevel: { value: '3.2 m', label: 'Normal', trend: '↓ 4%', isWarning: false },
  reservoirCapacity: { value: '68%', label: 'Stable', trend: 'Normal', isWarning: false },
  floodRisk: { value: 'Low', label: 'Next 6 hours', trend: 'Stable', isWarning: false }
};

export const HOTSPOTS: Hotspot[] = CITIES.pune.hotspots;

export const FORECAST_SERIES = [
  { time: 'Now', rainfall: 42, waterLevel: 3.2, riskIndex: 32, label: 'Low Risk' },
  { time: '+2h', rainfall: 58, waterLevel: 3.9, riskIndex: 58, label: 'Moderate' },
  { time: '+4h', rainfall: 72, waterLevel: 4.7, riskIndex: 82, label: 'High Risk' },
  { time: '+6h', rainfall: 64, waterLevel: 4.5, riskIndex: 78, label: 'High Risk' },
  { time: '+8h', rainfall: 38, waterLevel: 3.8, riskIndex: 52, label: 'Moderate' },
  { time: '+12h', rainfall: 15, waterLevel: 3.1, riskIndex: 28, label: 'Low Risk' }
];

export const FORECAST_7D = [
  { time: 'Mon', rainfall: 22, waterLevel: 2.8, riskIndex: 20, label: 'Low Risk' },
  { time: 'Tue', rainfall: 35, waterLevel: 3.1, riskIndex: 35, label: 'Low Risk' },
  { time: 'Wed', rainfall: 68, waterLevel: 4.5, riskIndex: 78, label: 'High Risk' },
  { time: 'Thu', rainfall: 54, waterLevel: 3.9, riskIndex: 60, label: 'Moderate' },
  { time: 'Fri', rainfall: 28, waterLevel: 3.2, riskIndex: 30, label: 'Low Risk' },
  { time: 'Sat', rainfall: 18, waterLevel: 2.9, riskIndex: 18, label: 'Safe' },
  { time: 'Sun', rainfall: 12, waterLevel: 2.7, riskIndex: 15, label: 'Safe' }
];

export const FORECAST_30D = [
  { time: 'Week 1', rainfall: 120, waterLevel: 3.1, riskIndex: 30, label: 'Stable' },
  { time: 'Week 2', rainfall: 240, waterLevel: 4.2, riskIndex: 65, label: 'Moderate' },
  { time: 'Week 3', rainfall: 310, waterLevel: 4.8, riskIndex: 82, label: 'High Risk' },
  { time: 'Week 4', rainfall: 180, waterLevel: 3.4, riskIndex: 40, label: 'Stable' }
];

export const SIMULATED_EVENT_FORECAST = [
  { time: 'Now', rainfall: 68, waterLevel: 4.7, riskIndex: 87, label: 'CRITICAL' },
  { time: '+2h', rainfall: 84, waterLevel: 5.4, riskIndex: 94, label: 'CRITICAL' },
  { time: '+4h', rainfall: 78, waterLevel: 5.1, riskIndex: 88, label: 'HIGH RISK' },
  { time: '+6h', rainfall: 52, waterLevel: 4.2, riskIndex: 65, label: 'MODERATE' },
  { time: '+8h', rainfall: 25, waterLevel: 3.5, riskIndex: 40, label: 'STABLE' },
  { time: '+12h', rainfall: 10, waterLevel: 3.0, riskIndex: 22, label: 'SAFE' }
];

export const INFRASTRUCTURE_LIST: InfrastructureItem[] = CITIES.pune.infrastructure;

export const INITIAL_ALERTS: PredictiveAlert[] = [
  {
    id: 'alert-1',
    severity: 'HIGH',
    title: 'Flood risk increasing in Kharadi',
    description: 'Heavy precipitation upstream causing rapid runoff accumulation near Sector 3 drainage channel.',
    predictionWindow: 'Predicted within 2 hours',
    confidence: 87,
    location: 'Kharadi Zone',
    metric: 'Rainfall 58mm/3h',
    timestamp: '10 min ago',
    status: 'Unassigned'
  },
  {
    id: 'alert-2',
    severity: 'MEDIUM',
    title: 'Drainage capacity approaching threshold in Hadapsar',
    description: 'Culvert utilization at D-09 has exceeded 82% threshold due to localized debris & surge.',
    predictionWindow: 'Predicted within 3 hours',
    confidence: 76,
    location: 'Hadapsar Bypass',
    metric: 'Utilization 82%',
    timestamp: '18 min ago',
    status: 'Unassigned'
  },
  {
    id: 'alert-3',
    severity: 'LOW',
    title: 'Water level rising at Sensor WS-204',
    description: 'River telemetry shows steady elevation increase of 12% over past 60 minutes.',
    predictionWindow: 'Predicted within 5 hours',
    confidence: 91,
    location: 'Mutha River Gauge WS-204',
    metric: '+12% in last hour',
    timestamp: '25 min ago',
    status: 'Assigned'
  }
];

export const RECOMMENDED_ACTIONS = [
  { id: 'act-1', step: '1', title: 'Inspect drainage channel D-14', detail: 'Deploy field inspection team to clear trash racks at Kharadi sector 3 exit.' },
  { id: 'act-2', step: '2', title: 'Notify field response team', detail: 'Send automated alert push to Municipal Zone Emergency Unit #4.' },
  { id: 'act-3', step: '3', title: 'Monitor water level WS-204', detail: 'Increase telemetry polling frequency from 5m to 30s.' },
  { id: 'act-4', step: '4', title: 'Prepare pumping station PS-07', detail: 'Pre-prime secondary 400kW drainage pumps at Hadapsar station.' }
];

export const GREEN_ROUTES: GreenRouteOption[] = [
  {
    id: 'fastest',
    title: 'Fastest Route',
    type: 'fastest',
    duration: '32 min',
    distance: '12.4 km',
    via: 'via Old Mumbai-Pune Highway & Aundh Road',
    color: '#3B82F6',
    isRecommended: false
  },
  {
    id: 'emission',
    title: 'Lowest Emission Route',
    type: 'emission',
    duration: '36 min',
    distance: '13.1 km',
    co2Reduction: '-18% CO₂ Emissions',
    via: 'via University Road Eco-Corridor & Baner Link',
    color: '#10B981',
    isRecommended: true
  },
  {
    id: 'exposure',
    title: 'Lowest Pollution Exposure',
    type: 'exposure',
    duration: '39 min',
    distance: '14.2 km',
    exposureReduction: '-27% PM2.5 Exposure',
    via: 'via Pashan Bypass Greenbelt',
    color: '#06B6D4',
    isRecommended: false
  }
];

export const SENSORS_LIST: SensorItem[] = [
  { id: 'WS-204', type: 'Water Level', location: 'Mutha River Bank', reading: '3.2 m height', status: 'Online', lastUpdate: '12 sec ago', battery: '98%' },
  { id: 'WS-108', type: 'Water Level', location: 'Mula-Mutha Confluence', reading: '4.1 m height', status: 'Online', lastUpdate: '45 sec ago', battery: '92%' },
  { id: 'RF-501', type: 'Rainfall', location: 'Pashan Meteorological Hill', reading: '42 mm / 24h', status: 'Online', lastUpdate: '1 min ago', battery: '95%' },
  { id: 'RF-502', type: 'Rainfall', location: 'Kharadi East Heights', reading: '58 mm / 24h', status: 'Warning', lastUpdate: '30 sec ago', battery: '84%' },
  { id: 'AQ-101', type: 'Air Quality', location: 'PMPML Bus #102 (Mobile)', reading: 'AQI 87 (PM2.5: 42)', status: 'Online', lastUpdate: '5 sec ago', battery: 'Fleet Power' },
  { id: 'AQ-109', type: 'Air Quality', location: 'Waste Vehicle #45 (Mobile)', reading: 'AQI 112 (PM2.5: 64)', status: 'Warning', lastUpdate: '8 sec ago', battery: 'Fleet Power' },
  { id: 'AQ-204', type: 'Air Quality', location: 'Swargate Junction Station', reading: 'AQI 128 (NO2: 34)', status: 'Warning', lastUpdate: '2 min ago', battery: '100%' },
  { id: 'TF-402', type: 'Vehicle Fleet', location: 'Shivajinagar Traffic Loop', reading: 'Congestion 82%', status: 'Online', lastUpdate: '3 sec ago', battery: 'Main Power' },
  { id: 'TF-409', type: 'Vehicle Fleet', location: 'Hinjewadi Phase 1 Flyover', reading: 'Congestion 64%', status: 'Online', lastUpdate: '10 sec ago', battery: 'Main Power' },
  { id: 'WS-309', type: 'Water Level', location: 'Hadapsar Canal Gate', reading: '3.9 m elevation', status: 'Warning', lastUpdate: '14 sec ago', battery: '78%' },
  { id: 'RF-509', type: 'Rainfall', location: 'Katraj Tunnel Ridge', reading: '22 mm / 24h', status: 'Offline', lastUpdate: '2 hours ago', battery: '0%' },
  { id: 'AQ-302', type: 'Air Quality', location: 'Kothrud Depot Bus #88', reading: 'AQI 58', status: 'Online', lastUpdate: '1 min ago', battery: 'Fleet Power' }
];

export const AIR_QUALITY_METRICS = {
  aqi: 87,
  status: 'Moderate',
  pm25: '42 µg/m³',
  pm10: '76 µg/m³',
  no2: '28 ppb',
  co2: '412 ppm',
  temp: '29 °C',
  humidity: '74%',
  aiForecast: 'Pollution levels are expected to increase near major traffic corridors during evening peak hours (17:30 - 20:00).'
};
