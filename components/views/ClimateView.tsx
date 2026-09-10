'use client';

import React from 'react';
import { MetricCard } from '../common/MetricCard';
import { ClimateChart } from '../charts/ClimateChart';
import { StatusBadge } from '../common/StatusBadge';
import { CloudSun, Thermometer, CloudRain, Wind, ShieldAlert, Sparkles } from 'lucide-react';

export const ClimateView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
            ATMOSPHERIC & CLIMATE TWIN
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Climate Risk Intelligence
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Micro-climate forecasting, heat stress modeling, and precipitation probability.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-bold text-amber-900">
          <CloudSun className="w-4 h-4 text-amber-600" />
          <span>7-Day Climate Score: 71 / 100</span>
        </div>
      </div>

      {/* Hero Climate Risk Summary Card */}
      <div className="bg-gradient-to-r from-[#261B07] via-[#452F0C] to-[#261B07] rounded-3xl p-6 text-white border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-xl shadow-amber-500/30 border border-amber-300/40 shrink-0">
            <div className="text-center">
              <span className="text-3xl font-black tracking-tight text-white">71</span>
              <span className="block text-[9px] uppercase font-extrabold text-amber-100/80">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
                CLIMATE RISK SCORE
              </span>
              <StatusBadge status="Moderate Climate Risk" type="warning" />
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Heat Stress Surge Expected Day 4
            </h3>
            <p className="text-xs text-amber-100/80 mt-1 max-w-xl font-medium leading-relaxed">
              Reduced rainfall combined with increasing temperature may increase crop water demand by approximately 14% over the next 5 days.
            </p>
          </div>
        </div>
      </div>

      {/* Risk Category Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold uppercase text-slate-500 text-[10px]">Drought Risk</span>
            <StatusBadge status="Low" type="safe" />
          </div>
          <div className="text-2xl font-black text-slate-900">14%</div>
          <p className="text-[11px] text-slate-500">Root zone moisture adequate</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold uppercase text-slate-500 text-[10px]">Heat Stress</span>
            <StatusBadge status="Moderate" type="warning" />
          </div>
          <div className="text-2xl font-black text-amber-600">33°C</div>
          <p className="text-[11px] text-amber-600 font-semibold">Surge on Day 4 (13:00 - 16:00)</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold uppercase text-slate-500 text-[10px]">Extreme Rainfall</span>
            <StatusBadge status="Low" type="safe" />
          </div>
          <div className="text-2xl font-black text-slate-900">8%</div>
          <p className="text-[11px] text-slate-500">No flood surge predicted</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold uppercase text-slate-500 text-[10px]">Wind Risk</span>
            <StatusBadge status="Low" type="safe" />
          </div>
          <div className="text-2xl font-black text-slate-900">12 km/h</div>
          <p className="text-[11px] text-slate-500">Normal breeze velocity</p>
        </div>
      </div>

      {/* 7-DAY CLIMATE CHART */}
      <ClimateChart />
    </div>
  );
};
