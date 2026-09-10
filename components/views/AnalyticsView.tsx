'use client';

import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { WaterBalanceChart } from '../charts/WaterBalanceChart';
import { YieldTrendChart } from '../charts/YieldTrendChart';
import { ClimateChart } from '../charts/ClimateChart';
import { BarChart3, FileText, Calendar, Download } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { setReportModalOpen, selectedFarmName, showToast } = useFarm();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'season'>('30d');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-emerald-400 px-2.5 py-0.5 rounded-full border border-slate-700">
            DATA INTELLIGENCE ANALYTICS
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Farm Telemetry Analytics & Report Generator
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Yield trends, water consumption curves, soil moisture degradation, and seasonal profit.
          </p>
        </div>

        {/* Date Filters & Generate Farm Report */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-extrabold">
            {(['7d', '30d', '90d', 'season'] as const).map((range) => (
              <button
                key={range}
                onClick={() => {
                  setTimeRange(range);
                  showToast(`Analytics timeframe updated to ${range.toUpperCase()}`);
                }}
                className={`px-3 py-1.5 rounded-xl uppercase transition-all ${
                  timeRange === range ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={() => setReportModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black px-4 py-2.5 rounded-2xl text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4 text-emerald-300" />
            <span>[GENERATE FARM REPORT]</span>
          </button>
        </div>
      </div>

      {/* Grid of Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <YieldTrendChart />
        <WaterBalanceChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClimateChart />

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">Input Cost vs Profit Efficiency</h3>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              Efficiency: +18%
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
            <div className="flex justify-between font-bold">
              <span className="text-slate-600">Total Seed & Fertilizer Input:</span>
              <span className="text-slate-900">₹11,200</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-slate-600">Irrigation Energy & Water Cost:</span>
              <span className="text-cyan-700 font-black">₹3,400</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-slate-600">Net Expected Profit Margin:</span>
              <span className="text-emerald-700 font-black">74.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
