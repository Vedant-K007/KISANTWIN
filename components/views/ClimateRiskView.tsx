'use client';

import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { RiskBreakdownChart } from '../charts/RiskBreakdownChart';
import { PuneCityMap } from '../maps/PuneCityMap';
import { LayerToggle } from '../maps/LayerToggle';
import { ShieldCheck, Zap, Droplets, Wind, Navigation2, Activity } from 'lucide-react';

export const ClimateRiskView: React.FC = () => {
  const { waterResilienceScore, waterRiskScore } = useResilience();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-cyan-400 px-2.5 py-0.5 rounded-full border border-slate-700">
            COMPOSITE CLIMATE COMMAND
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Urban Climate Risk Index
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Multi-hazard environmental risk matrix combining Air, Flood Risk, Traffic & Infrastructure.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900 text-white px-4 py-2 rounded-xl border border-slate-800">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-[9px] uppercase font-bold text-slate-400">City Resilience Score</div>
            <div className="text-lg font-black text-white">81 / 100 (Prepared)</div>
          </div>
        </div>
      </div>

      {/* Grid: Resilience Breakdown & Multi-Hazard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RiskBreakdownChart />
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Domain Multi-Hazard Risk Matrix</h3>
          <p className="text-xs text-slate-500">Cross-domain correlation of environmental stressors</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span className="flex items-center space-x-1.5">
                  <Wind className="w-4 h-4 text-emerald-600" />
                  <span>Air Quality Index</span>
                </span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded font-extrabold">
                  72 / 100
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">Moderate PM2.5 levels. Traffic corridor mitigation active.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span className="flex items-center space-x-1.5">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span>Water Resilience</span>
                </span>
                <span className="text-cyan-700 bg-cyan-100 px-2 py-0.2 rounded font-extrabold">
                  {waterResilienceScore} / 100
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">Hydrostatic head stable. Kharadi drainage under surveillance.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span className="flex items-center space-x-1.5">
                  <Navigation2 className="w-4 h-4 text-amber-600" />
                  <span>Mobility Efficiency</span>
                </span>
                <span className="text-amber-700 bg-amber-100 px-2 py-0.2 rounded font-extrabold">
                  84 / 100
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">Green routing saving -18% CO₂ across core transit loops.</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span className="flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Infrastructure Health</span>
                </span>
                <span className="text-blue-700 bg-blue-100 px-2 py-0.2 rounded font-extrabold">
                  88 / 100
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">248 IoT nodes active with 93% continuous sync rate.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Layer Spatial Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-lg text-slate-900">City Resilience Multi-Layer Map</h3>
          <LayerToggle />
        </div>
        <PuneCityMap height="h-[500px]" />
      </div>
    </div>
  );
};
