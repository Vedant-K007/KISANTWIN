'use client';

import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { IrrigationModal } from '../components/common/IrrigationModal';
import { ReportModal } from '../components/common/ReportModal';
import { LoginModal } from '../components/common/LoginModal';
import { Toast } from '../components/common/Toast';

import { OverviewView } from '../components/views/OverviewView';
import { FarmTwinView } from '../components/views/FarmTwinView';
import { WaterView } from '../components/views/WaterView';
import { ClimateView } from '../components/views/ClimateView';
import { HealthView } from '../components/views/HealthView';
import { StressTestView } from '../components/views/StressTestView';
import { ActionPlanView } from '../components/views/ActionPlanView';
import { MarketView } from '../components/views/MarketView';
import { AnalyticsView } from '../components/views/AnalyticsView';
import { FpoView } from '../components/views/FpoView';
import { OfficerView } from '../components/views/OfficerView';

export default function Home() {
  const { activeView } = useFarm();

  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewView />;
      case 'twin':
        return <FarmTwinView />;
      case 'water':
        return <WaterView />;
      case 'climate':
        return <ClimateView />;
      case 'health':
        return <HealthView />;
      case 'stresstest':
        return <StressTestView />;
      case 'actions':
        return <ActionPlanView />;
      case 'market':
        return <MarketView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'fpo':
        return <FpoView />;
      case 'officer':
        return <OfficerView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar">
        <TopBar />

        <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          {renderView()}
        </main>
      </div>

      {/* Modals & Overlays */}
      <IrrigationModal />
      <ReportModal />
      <LoginModal />
      <Toast />
    </div>
  );
}
