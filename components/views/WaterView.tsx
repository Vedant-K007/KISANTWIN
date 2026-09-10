'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { MetricCard } from '../common/MetricCard';
import { WaterBalanceChart } from '../charts/WaterBalanceChart';
import { StatusBadge } from '../common/StatusBadge';
import { Droplets, Activity, ShieldAlert, Zap } from 'lucide-react';

export const WaterView: React.FC = () => {
  const { setIrrigationModalOpen } = useFarm();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCE5DF] pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#E8F3FF] text-[#2F80ED] px-2.5 py-0.5 rounded-full border border-[#2F80ED]/30">
            HYDRO INTELLIGENCE DOMAIN
          </span>
          <h2 className="text-2xl font-black text-[#17231D] tracking-tight mt-1">
            Water Intelligence
          </h2>
          <p className="text-xs text-[#66756D] font-medium">
            Understand how much water your farm has, needs and may require in the future.
          </p>
        </div>

        <button
          onClick={() => setIrrigationModalOpen(true)}
          className="flex items-center space-x-2 bg-[#2F80ED] hover:bg-[#1E6AD2] text-white font-bold px-4 py-2.5 rounded-full text-xs shadow-xs transition-all active:scale-95 self-start md:self-auto"
        >
          <Droplets className="w-4 h-4 text-white" />
          <span>[OPTIMIZE IRRIGATION]</span>
        </button>
      </div>

      {/* WATER RESILIENCE HERO CARD (76/100) */}
      <div className="bg-white rounded-3xl p-6 border border-[#DCE5DF] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-[#E8F3FF] border border-[#2F80ED]/30 p-1 shrink-0">
            <div className="text-center">
              <span className="text-3xl font-black tracking-tight text-[#2F80ED]">76</span>
              <span className="block text-[9px] uppercase font-extrabold text-[#66756D]">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2F80ED]">
                WATER RESILIENCE SCORE
              </span>
              <StatusBadge status="Good" type="safe" />
            </div>
            <h3 className="text-xl font-bold text-[#17231D] mt-1">
              Field Water Security is Stable
            </h3>
            <p className="text-xs text-[#66756D] mt-1 max-w-xl font-medium">
              Borewell storage and soil moisture are sufficient for the next 72 hours.{' '}
              <strong className="text-[#16A878]">1,360 L potential water saving</strong> identified via precision drip scheduling.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIrrigationModalOpen(true)}
          className="bg-[#E8F3FF] hover:bg-[#D4E8FF] text-[#2F80ED] border border-[#2F80ED]/40 font-extrabold px-4 py-3 rounded-2xl text-xs transition-all shrink-0"
        >
          Apply 1,360 L Saving Plan →
        </button>
      </div>

      {/* FOUR MAJOR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Available Water"
          value="68%"
          unit="Pool Volume"
          status="Available"
          statusType="safe"
          subtitle="Borewell + Storage Pond"
          trend="Nominal"
          icon={Droplets}
          themeCategory="water"
        />

        <MetricCard
          title="Irrigation Requirement"
          value="2,460 L"
          unit="Next 24h"
          status="Required"
          statusType="info"
          subtitle="Zone B & C priority"
          trend="↓ 18%"
          icon={Activity}
          themeCategory="water"
        />

        <MetricCard
          title="Soil Moisture"
          value="61%"
          unit="Avg Field"
          status="Optimal"
          statusType="safe"
          subtitle="Root zone sensor telemetry"
          trend="Stable"
          icon={Zap}
          themeCategory="water"
        />

        <MetricCard
          title="7-Day Water Deficit Risk"
          value="24%"
          unit="Low Risk"
          status="Low-Moderate"
          statusType="prepared"
          subtitle="AI 7-day hydro probability"
          trend="Controlled"
          icon={ShieldAlert}
          themeCategory="water"
        />
      </div>

      {/* FARM WATER BALANCE CHART */}
      <WaterBalanceChart />
    </div>
  );
};
