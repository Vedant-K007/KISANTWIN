'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  CITIES,
  INITIAL_ALERTS,
  FORECAST_SERIES,
  FORECAST_7D,
  FORECAST_30D,
  SIMULATED_EVENT_FORECAST,
  Hotspot,
  PredictiveAlert,
  InfrastructureItem,
  GreenRouteOption,
  GREEN_ROUTES,
  CityData
} from '../data/mockData';

export type ViewType =
  | 'overview'
  | 'water'
  | 'air'
  | 'traffic'
  | 'climate'
  | 'alerts'
  | 'infrastructure'
  | 'sensors'
  | 'analytics'
  | 'operations';

export interface MapLayers {
  airQuality: boolean;
  traffic: boolean;
  waterRisk: boolean;
  floodZones: boolean;
  drainageNetwork: boolean;
  waterSensors: boolean;
  rainfall: boolean;
  vehicleFleet: boolean;
}

interface ResilienceContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  mapLayers: MapLayers;
  toggleLayer: (layer: keyof MapLayers) => void;
  selectedHotspot: Hotspot | null;
  setSelectedHotspot: (hotspot: Hotspot | null) => void;
  
  // Multi-city state
  selectedCity: CityData;
  changeCity: (cityId: string) => void;

  // Live Simulation state
  isSimulatingRainfall: boolean;
  simulationStep: number;
  startRainfallSimulation: () => void;
  stopRainfallSimulation: () => void;
  advanceSimulationStep: () => void;
  
  // Dynamic metrics
  currentHotspots: Hotspot[];
  currentAlerts: PredictiveAlert[];
  currentInfrastructure: InfrastructureItem[];
  currentForecast: typeof FORECAST_SERIES;
  timeframe: '24h' | '7d' | '30d';
  setTimeframe: (tf: '24h' | '7d' | '30d') => void;
  waterResilienceScore: number;
  waterRiskScore: number;
  currentRainfall: string;
  currentWaterLevel: string;

  // Actions & Modals
  dispatchModalOpen: boolean;
  setDispatchModalOpen: (open: boolean) => void;
  dispatchTarget: Hotspot | PredictiveAlert | null;
  openDispatchModal: (target: Hotspot | PredictiveAlert) => void;
  confirmDispatch: (teamName: string, actionNote: string) => void;
  resolveAlert: (alertId: string) => void;
  assignAlert: (alertId: string) => void;
  dispatchedLogs: Array<{ id: string; timestamp: string; location: string; team: string; note: string; status: string }>;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Green route selection
  selectedGreenRoute: GreenRouteOption;
  setSelectedGreenRoute: (route: GreenRouteOption) => void;

  // PDF Report modal
  reportModalOpen: boolean;
  setReportModalOpen: (open: boolean) => void;
}

const ResilienceContext = createContext<ResilienceContextType | undefined>(undefined);

export const ResilienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [selectedCity, setSelectedCity] = useState<CityData>(CITIES.pune);
  const [timeframe, setTimeframeState] = useState<'24h' | '7d' | '30d'>('24h');

  const [mapLayers, setMapLayers] = useState<MapLayers>({
    airQuality: true,
    traffic: true,
    waterRisk: true,
    floodZones: true,
    drainageNetwork: true,
    waterSensors: true,
    rainfall: true,
    vehicleFleet: true,
  });

  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(CITIES.pune.hotspots[0]);
  const [isSimulatingRainfall, setIsSimulatingRainfall] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);

  const [currentHotspots, setCurrentHotspots] = useState<Hotspot[]>(CITIES.pune.hotspots);
  const [currentAlerts, setCurrentAlerts] = useState<PredictiveAlert[]>(INITIAL_ALERTS);
  const [currentInfrastructure, setCurrentInfrastructure] = useState<InfrastructureItem[]>(CITIES.pune.infrastructure);
  const [currentForecast, setCurrentForecast] = useState(FORECAST_SERIES);

  const [waterResilienceScore, setWaterResilienceScore] = useState<number>(CITIES.pune.waterResilienceScore);
  const [waterRiskScore, setWaterRiskScore] = useState<number>(CITIES.pune.waterRiskScore);
  const [currentRainfall, setCurrentRainfall] = useState<string>(CITIES.pune.rainfall);
  const [currentWaterLevel, setCurrentWaterLevel] = useState<string>(CITIES.pune.waterLevel);

  const [dispatchModalOpen, setDispatchModalOpen] = useState<boolean>(false);
  const [dispatchTarget, setDispatchTarget] = useState<Hotspot | PredictiveAlert | null>(null);

  const [dispatchedLogs, setDispatchedLogs] = useState<Array<{ id: string; timestamp: string; location: string; team: string; note: string; status: string }>>([
    {
      id: 'log-101',
      timestamp: '15 min ago',
      location: 'Hadapsar Bypass',
      team: 'PMC Rapid Response Team #2',
      note: 'Inspected culvert gate H-04 and deployed mobile pump unit.',
      status: 'Active Field Action'
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedGreenRoute, setSelectedGreenRoute] = useState<GreenRouteOption>(GREEN_ROUTES[1]);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  const changeCity = (cityId: string) => {
    const target = CITIES[cityId] || CITIES.pune;
    setSelectedCity(target);
    setCurrentHotspots(target.hotspots);
    setSelectedHotspot(target.hotspots[0] || null);
    setCurrentInfrastructure(target.infrastructure);
    setWaterResilienceScore(target.waterResilienceScore);
    setWaterRiskScore(target.waterRiskScore);
    setCurrentRainfall(target.rainfall);
    setCurrentWaterLevel(target.waterLevel);
    showToast(`Switched active city to ${target.name}, ${target.state} (${target.org})`);
  };

  const setTimeframe = (tf: '24h' | '7d' | '30d') => {
    setTimeframeState(tf);
    if (tf === '24h') setCurrentForecast(FORECAST_SERIES);
    else if (tf === '7d') setCurrentForecast(FORECAST_7D);
    else setCurrentForecast(FORECAST_30D as any);
    showToast(`Forecast timeframe updated to ${tf.toUpperCase()}`);
  };

  const toggleLayer = (layer: keyof MapLayers) => {
    setMapLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Weather Simulation logic
  const startRainfallSimulation = () => {
    setIsSimulatingRainfall(true);
    setSimulationStep(1);
    showToast(`⚠ LIVE DEMO: Heavy Rainfall Event Initiated for ${selectedCity.name}!`);
  };

  const stopRainfallSimulation = () => {
    setIsSimulatingRainfall(false);
    setSimulationStep(0);
    setCurrentHotspots(selectedCity.hotspots);
    setCurrentAlerts(INITIAL_ALERTS);
    setCurrentForecast(FORECAST_SERIES);
    setWaterResilienceScore(selectedCity.waterResilienceScore);
    setWaterRiskScore(selectedCity.waterRiskScore);
    setCurrentRainfall(selectedCity.rainfall);
    setCurrentWaterLevel(selectedCity.waterLevel);
    showToast('Simulation reset to baseline state.');
  };

  const advanceSimulationStep = () => {
    setSimulationStep((prev) => {
      const nextStep = (prev % 8) + 1;
      applyStepState(nextStep);
      return nextStep;
    });
  };

  const applyStepState = (step: number) => {
    switch (step) {
      case 1:
        setCurrentRainfall('68 mm');
        showToast('Step 1: IoT Rain Gauge RF-502 reports sudden rainfall spike to 68mm!');
        break;
      case 2:
        setCurrentWaterLevel('4.7 m');
        showToast('Step 2: Mutha River Gauge WS-204 water level surges to 4.7m (+1.5m rise)');
        break;
      case 3:
        setCurrentForecast(SIMULATED_EVENT_FORECAST);
        setWaterRiskScore(87);
        setWaterResilienceScore(52);
        showToast('Step 3: AeroFlow AI Engine calculates 87% probability of flood in 2 hours');
        break;
      case 4:
        setCurrentHotspots((prev) =>
          prev.map((h, i) =>
            i === 0
              ? {
                  ...h,
                  riskLevel: 'Critical',
                  rainfall: '84 mm / 3h',
                  waterLevel: '5.2 m',
                  drainageCapacity: '94%',
                  predictedRisk: 'IMMINENT FLOODING IN 45 MINS'
                }
              : h
          )
        );
        showToast('Step 4: Spatial map alert — First zone updated to CRITICAL risk');
        break;
      case 5:
        const newAlert: PredictiveAlert = {
          id: `sim-alert-${Date.now()}`,
          severity: 'HIGH',
          title: `CRITICAL: Severe Flood Risk in ${currentHotspots[0]?.name || 'City Core'}`,
          description: 'Surge runoff has exceeded drainage capacity (94%). Imminent overflow predicted within 45 minutes.',
          predictionWindow: 'Predicted within 45 minutes',
          confidence: 94,
          location: currentHotspots[0]?.name || 'City Sector',
          metric: 'Rainfall 84mm / 3h',
          timestamp: 'Just now',
          status: 'Unassigned'
        };
        setCurrentAlerts((prev) => [newAlert, ...prev]);
        showToast('Step 5: HIGH-priority predictive operational alert triggered!');
        break;
      case 6:
        showToast('Step 6: AI generates recommended action plan for municipal dispatcher.');
        break;
      case 7:
        setDispatchTarget(currentHotspots[0] || null);
        setDispatchModalOpen(true);
        showToast('Step 7: Opening Dispatch Response Modal for operator action...');
        break;
      case 8:
        setWaterResilienceScore(74);
        setWaterRiskScore(48);
        showToast('Step 8: Response team dispatched! Pumping Station engaged. Flood risk stabilizing.');
        break;
      default:
        break;
    }
  };

  const openDispatchModal = (target: Hotspot | PredictiveAlert) => {
    setDispatchTarget(target);
    setDispatchModalOpen(true);
  };

  const confirmDispatch = (teamName: string, actionNote: string) => {
    const loc = 'name' in (dispatchTarget || {}) ? (dispatchTarget as Hotspot).name : (dispatchTarget as PredictiveAlert).location;
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      location: loc,
      team: teamName,
      note: actionNote,
      status: 'Response Active'
    };
    setDispatchedLogs((prev) => [newLog, ...prev]);

    if (dispatchTarget && 'severity' in dispatchTarget) {
      resolveAlert(dispatchTarget.id);
    }
    setDispatchModalOpen(false);
    showToast(`✓ Field Team "${teamName}" dispatched to ${loc}. Status updated to Response Active.`);
  };

  const resolveAlert = (alertId: string) => {
    setCurrentAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'Resolved' } : a))
    );
    showToast('Alert status marked as RESOLVED.');
  };

  const assignAlert = (alertId: string) => {
    setCurrentAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'Assigned' } : a))
    );
    showToast(`Alert assigned to ${selectedCity.org} Response Unit.`);
  };

  return (
    <ResilienceContext.Provider
      value={{
        activeView,
        setActiveView,
        mapLayers,
        toggleLayer,
        selectedHotspot,
        setSelectedHotspot,
        selectedCity,
        changeCity,
        isSimulatingRainfall,
        simulationStep,
        startRainfallSimulation,
        stopRainfallSimulation,
        advanceSimulationStep,
        currentHotspots,
        currentAlerts,
        currentInfrastructure,
        currentForecast,
        timeframe,
        setTimeframe,
        waterResilienceScore,
        waterRiskScore,
        currentRainfall,
        currentWaterLevel,
        dispatchModalOpen,
        setDispatchModalOpen,
        dispatchTarget,
        openDispatchModal,
        confirmDispatch,
        resolveAlert,
        assignAlert,
        dispatchedLogs,
        toastMessage,
        showToast,
        selectedGreenRoute,
        setSelectedGreenRoute,
        reportModalOpen,
        setReportModalOpen
      }}
    >
      {children}
    </ResilienceContext.Provider>
  );
};

export const useResilience = () => {
  const context = useContext(ResilienceContext);
  if (!context) {
    throw new Error('useResilience must be used within a ResilienceProvider');
  }
  return context;
};
