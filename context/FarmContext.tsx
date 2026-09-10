'use client';

import React, { createContext, useContext, useState } from 'react';
export type { RoleType };
import {
  RoleType,
  FARMER_KPIS,
  FARM_ZONES,
  WATER_BALANCE_DATA,
  CLIMATE_FORECAST_DATA,
  INITIAL_ACTION_PLAN,
  FPO_DATA,
  OFFICER_DATA,
  FarmZone,
  ActionPlanItem
} from '../data/mockFarmData';

export type ViewType =
  | 'overview'
  | 'twin'
  | 'water'
  | 'climate'
  | 'health'
  | 'stresstest'
  | 'actions'
  | 'market'
  | 'analytics'
  | 'fpo'
  | 'officer';

export interface FarmMapLayers {
  cropHealth: boolean;
  soilMoisture: boolean;
  waterStress: boolean;
  pestRisk: boolean;
  irrigation: boolean;
  rainfall: boolean;
  elevation: boolean;
}

export interface StressInputs {
  rainfall: number; // e.g. -30
  water: number; // e.g. -40
  temperature: number; // e.g. +2
  market: number; // e.g. -20
  pest: 'Normal' | 'Moderate' | 'High' | 'Severe';
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: RoleType;
  farmId: string;
  location: string;
  fpoName: string;
  initials: string;
  isVerified: boolean;
}

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-01',
    name: 'Rahul Deshmukh',
    phone: '+91 98220 41928',
    role: 'farmer',
    farmId: 'MH-PUN-2026-88',
    location: 'Baramati, Pune District',
    fpoName: 'Pune Farmers FPO #402',
    initials: 'RD',
    isVerified: true
  },
  {
    id: 'user-02',
    name: 'Baramati Farmers FPO',
    phone: '+91 98220 90000',
    role: 'fpo',
    farmId: 'FPO-PUN-402',
    location: 'Baramati Sub-District',
    fpoName: 'Baramati Farmers Collective',
    initials: 'BF',
    isVerified: true
  },
  {
    id: 'user-03',
    name: 'Dr. Sunita Patil',
    phone: '+91 94220 11223',
    role: 'officer',
    farmId: 'GOV-MH-902',
    location: 'Pune District HQ',
    fpoName: 'Dept. of Agriculture, MH',
    initials: 'SP',
    isVerified: true
  }
];

interface FarmContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  
  // User Authentication & Profile
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  switchUser: (userId: string) => void;

  // Farm & Zone Selection
  selectedFarmName: string;
  setSelectedFarmName: (name: string) => void;
  selectedZone: FarmZone | null;
  setSelectedZone: (zone: FarmZone | null) => void;
  mapLayers: FarmMapLayers;
  toggleMapLayer: (layer: keyof FarmMapLayers) => void;

  // Stress Test Simulation Engine
  stressInputs: StressInputs;
  setStressInputs: React.Dispatch<React.SetStateAction<StressInputs>>;
  isSimulating: boolean;
  simulationStepText: string;
  hasRunSimulation: boolean;
  runStressSimulation: () => void;
  isOptimized: boolean;
  runAIOptimization: () => void;
  resetStressTest: () => void;

  // Action Plan state
  actionPlan: ActionPlanItem[];
  toggleActionComplete: (id: string) => void;

  // Modals & Analyzers
  irrigationModalOpen: boolean;
  setIrrigationModalOpen: (open: boolean) => void;
  reportModalOpen: boolean;
  setReportModalOpen: (open: boolean) => void;
  
  // Crop Image Analyzer
  analyzingCrop: boolean;
  cropAnalysisResult: { disease: string; confidence: number; action: string } | null;
  runCropAnalysis: () => void;

  // Notification Drawer & Toast
  notifOpen: boolean;
  setNotifOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<RoleType>('farmer');
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [selectedFarmName, setSelectedFarmName] = useState<string>('2.4 Acre — Pune District');

  // User Auth & Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS[0]);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  const switchUser = (userId: string) => {
    const target = DEMO_USERS.find((u) => u.id === userId) || DEMO_USERS[0];
    setCurrentUser(target);
    setRoleState(target.role);
    if (target.role === 'fpo') setActiveView('fpo');
    else if (target.role === 'officer') setActiveView('officer');
    else setActiveView('overview');
    showToast(`🔒 Authenticated as ${target.name} (${target.role.toUpperCase()} Mode).`);
  };

  const [selectedZone, setSelectedZone] = useState<FarmZone | null>(FARM_ZONES[0]);
  const [mapLayers, setMapLayers] = useState<FarmMapLayers>({
    cropHealth: true,
    soilMoisture: true,
    waterStress: true,
    pestRisk: true,
    irrigation: true,
    rainfall: true,
    elevation: false,
  });

  // Stress Test state
  const [stressInputs, setStressInputs] = useState<StressInputs>({
    rainfall: -30,
    water: -40,
    temperature: 2,
    market: -20,
    pest: 'High'
  });
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStepText, setSimulationStepText] = useState<string>('');
  const [hasRunSimulation, setHasRunSimulation] = useState<boolean>(false);
  const [isOptimized, setIsOptimized] = useState<boolean>(false);

  // Action plan
  const [actionPlan, setActionPlan] = useState<ActionPlanItem[]>(INITIAL_ACTION_PLAN);

  // Modals
  const [irrigationModalOpen, setIrrigationModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  // Crop Analysis
  const [analyzingCrop, setAnalyzingCrop] = useState<boolean>(false);
  const [cropAnalysisResult, setCropAnalysisResult] = useState<{ disease: string; confidence: number; action: string } | null>(null);

  // Notifications
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setRole = (newRole: RoleType) => {
    setRoleState(newRole);
    if (newRole === 'fpo') setActiveView('fpo');
    else if (newRole === 'officer') setActiveView('officer');
    else setActiveView('overview');
    showToast(`Switched active perspective to ${newRole.toUpperCase()} Mode.`);
  };

  const toggleMapLayer = (layer: keyof FarmMapLayers) => {
    setMapLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleActionComplete = (id: string) => {
    setActionPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
    showToast('Task status updated in Farm Action Plan.');
  };

  // Micro-interaction loading steps for Farm Stress Test
  const runStressSimulation = () => {
    setIsSimulating(true);
    setHasRunSimulation(false);
    setIsOptimized(false);

    const steps = [
      'Analyzing rainfall & soil moisture deficit...',
      'Calculating crop water stress & transpiration index...',
      'Estimating yield reduction & pest pressure curve...',
      'Projecting market revenue impact...',
      'Synthesizing Farm Stress Twin simulation...'
    ];

    steps.forEach((stepText, idx) => {
      setTimeout(() => {
        setSimulationStepText(stepText);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setHasRunSimulation(true);
            showToast('⚠ Farm Stress Simulation Complete! View expected impact below.');
          }, 600);
        }
      }, idx * 600);
    });
  };

  const runAIOptimization = () => {
    setIsSimulating(true);
    setSimulationStepText('Running KisanTwin Multi-Objective AI Decision Optimizer...');

    setTimeout(() => {
      setIsSimulating(false);
      setIsOptimized(true);
      showToast('✓ KisanTwin AI Optimization Applied! Resilience increased by +19 points.');
    }, 1500);
  };

  const resetStressTest = () => {
    setHasRunSimulation(false);
    setIsOptimized(false);
    setStressInputs({ rainfall: -30, water: -40, temperature: 2, market: -20, pest: 'High' });
    showToast('Stress Test scenario reset to baseline parameters.');
  };

  const runCropAnalysis = () => {
    setAnalyzingCrop(true);
    setCropAnalysisResult(null);
    setTimeout(() => {
      setAnalyzingCrop(false);
      setCropAnalysisResult({
        disease: 'Possible Early Fungal Stress (Leaf Spot)',
        confidence: 86,
        action: 'Inspect Zone C within 24 hours and avoid overhead irrigation to prevent spore spread.'
      });
      showToast('AI Crop Diagnostic Scan complete (86% Confidence).');
    }, 1800);
  };

  return (
    <FarmContext.Provider
      value={{
        role,
        setRole,
        activeView,
        setActiveView,
        currentUser,
        setCurrentUser,
        loginModalOpen,
        setLoginModalOpen,
        switchUser,
        selectedFarmName,
        setSelectedFarmName,
        selectedZone,
        setSelectedZone,
        mapLayers,
        toggleMapLayer,
        stressInputs,
        setStressInputs,
        isSimulating,
        simulationStepText,
        hasRunSimulation,
        runStressSimulation,
        isOptimized,
        runAIOptimization,
        resetStressTest,
        actionPlan,
        toggleActionComplete,
        irrigationModalOpen,
        setIrrigationModalOpen,
        reportModalOpen,
        setReportModalOpen,
        analyzingCrop,
        cropAnalysisResult,
        runCropAnalysis,
        notifOpen,
        setNotifOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
