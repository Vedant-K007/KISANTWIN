'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { LandingHeroBanner } from '../layout/LandingHeroBanner';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { WaterBalanceChart } from '../charts/WaterBalanceChart';
import { RiskRadarChart } from '../charts/RiskRadarChart';
import { FarmTwinMap } from '../maps/FarmTwinMap';
import {
  Sprout,
  Droplets,
  CloudRain,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Activity,
  Zap
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { setActiveView, currentUser } = useFarm();
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Rahul';

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Title Header (ALWAYS AT VERY TOP) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCE5DF] pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#EAF8F1] text-[#16A878] px-2.5 py-0.5 rounded-full border border-[#16A878]/30">
            FARM DIGITAL TWIN • PUNE FIELD
          </span>
          <h2 className="text-2xl font-black text-[#17231D] tracking-tight mt-1">
            Good evening, {firstName}.
          </h2>
          <p className="text-xs text-[#66756D] font-medium">
            Your farm is stable today. Here's what KisanTwin predicts for the next 7 days.
          </p>
        </div>

        <button
          onClick={() => setActiveView('stresstest')}
          className="flex items-center space-x-2 bg-[#16A878] hover:bg-[#128F66] text-white font-extrabold px-4.5 py-2.5 rounded-full text-xs shadow-sm transition-all transform active:scale-95 self-start md:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Launch Farm Stress Test</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* First Impression Hero Banner */}
      <LandingHeroBanner />

      {/* THE ONE MAJOR DARK CARD: FARM RESILIENCE SCORE (82/100) */}
      <div className="bg-[#12372A] rounded-3xl p-6 text-white border border-[#1E523F] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          {/* Circular Score Visualization (Emerald -> Soft Green Ring) */}
          <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[#16A878] to-[#65C18C] shadow-lg shadow-[#16A878]/30 p-1 shrink-0">
            <div className="w-full h-full rounded-full bg-[#12372A] flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold tracking-tight text-white">82</span>
              <span className="text-[9px] uppercase font-bold text-[#65C18C] tracking-wider">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#65C18C]">
                FARM RESILIENCE SCORE
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#16A878]/20 text-[#65C18C] border border-[#16A878]/40">
                Stable — Moderate climate risk
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">
              Field Twin Operational Readiness is High
            </h3>
            <p className="text-xs text-[#D6E5DE]/80 mt-1 max-w-xl font-medium leading-relaxed">
              Soil moisture level (61%) and crop health index (88%) remain optimal. Heat surge forecast on Day 4 may require early drip scheduling in Zone B.
            </p>
          </div>
        </div>

        {/* 6 Mini Sub-Cards on the Right */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 border-t lg:border-t-0 lg:border-l border-[#1E523F] pt-4 lg:pt-0 lg:pl-6 w-full lg:w-auto text-center">
          <div className="bg-[#0C261D] p-2.5 rounded-2xl border border-[#1E523F]">
            <div className="text-[9px] text-[#65C18C] font-bold uppercase">Water</div>
            <div className="text-base font-black text-white mt-0.5">76</div>
          </div>
          <div className="bg-[#0C261D] p-2.5 rounded-2xl border border-[#1E523F]">
            <div className="text-[9px] text-[#65C18C] font-bold uppercase">Health</div>
            <div className="text-base font-black text-white mt-0.5">88</div>
          </div>
          <div className="bg-[#0C261D] p-2.5 rounded-2xl border border-[#1E523F]">
            <div className="text-[9px] text-[#65C18C] font-bold uppercase">Climate</div>
            <div className="text-base font-black text-white mt-0.5">71</div>
          </div>
          <div className="bg-[#0C261D] p-2.5 rounded-2xl border border-[#1E523F]">
            <div className="text-[9px] text-[#65C18C] font-bold uppercase">Soil</div>
            <div className="text-base font-black text-white mt-0.5">84</div>
          </div>
          <div className="bg-[#0C261D] p-2.5 rounded-2xl border border-[#1E523F]">
            <div className="text-[9px] text-[#65C18C] font-bold uppercase">Pest</div>
            <div className="text-base font-black text-white mt-0.5">82</div>
          </div>
          <div className="bg-[#0C261D] p-2.5 rounded-2xl border border-[#1E523F]">
            <div className="text-[9px] text-[#65C18C] font-bold uppercase">Market</div>
            <div className="text-base font-black text-white mt-0.5">79</div>
          </div>
        </div>
      </div>

      {/* 6 WHITE KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Crop Health"
          value="88%"
          status="Healthy"
          statusType="safe"
          subtitle="Soybean & Onion patch"
          trend="↑ 2.4%"
          icon={Sprout}
          themeCategory="crop"
          onClick={() => setActiveView('health')}
        />

        <MetricCard
          title="Water Status"
          value="72%"
          status="Available"
          statusType="prepared"
          subtitle="3,820 L in storage"
          trend="Nominal"
          icon={Droplets}
          themeCategory="water"
          onClick={() => setActiveView('water')}
        />

        <MetricCard
          title="7-Day Rainfall"
          value="34 mm"
          status="Precipitation"
          statusType="warning"
          subtitle="7-day cumulative"
          trend="↓ 12%"
          icon={CloudRain}
          themeCategory="water"
          onClick={() => setActiveView('climate')}
        />

        <MetricCard
          title="Expected Yield"
          value="18.4 q"
          status="On Track"
          statusType="safe"
          subtitle="2.4 Acre Total"
          trend="+6.8%"
          icon={Activity}
          themeCategory="crop"
          onClick={() => setActiveView('twin')}
        />

        <MetricCard
          title="Water Usage"
          value="3,820 L"
          status="Efficient"
          statusType="safe"
          subtitle="Saved 840 L"
          trend="↓ 18%"
          icon={Zap}
          themeCategory="water"
          onClick={() => setActiveView('water')}
        />

        <MetricCard
          title="Expected Profit"
          value="₹46,800"
          status="Net Target"
          statusType="safe"
          subtitle="Harvest Sale Proj."
          trend="+13%"
          icon={TrendingUp}
          themeCategory="profit"
          onClick={() => setActiveView('market')}
        />
      </div>

      {/* Interactive Spatial Map Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-[#17231D]">Live Field Twin Map</h3>
            <p className="text-xs text-[#66756D]">Real-time zone telemetry for 2.4 Acre Pune Field</p>
          </div>
          <button
            onClick={() => setActiveView('twin')}
            className="text-xs text-[#16A878] font-bold hover:underline"
          >
            Full GIS Map View →
          </button>
        </div>
        <FarmTwinMap height="h-[440px]" />
      </div>

      {/* Grid: 7-Day Farm Water Balance Chart & Risk Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WaterBalanceChart />
        </div>
        <div className="lg:col-span-1">
          <RiskRadarChart />
        </div>
      </div>
    </div>
  );
};
