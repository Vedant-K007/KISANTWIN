'use client';

import React from 'react';
import { MetricCard } from '../common/MetricCard';
import { AQITrendChart } from '../charts/AQITrendChart';
import { AIR_QUALITY_METRICS } from '../../data/mockData';
import { Wind, Thermometer, CloudRain, Flame, Activity, Brain, Bus } from 'lucide-react';
import { useResilience } from '../../context/ResilienceContext';

export const AirQualityView: React.FC = () => {
  const { showToast } = useResilience();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
            AEROFLOW ORIGINAL DOMAIN • AIR INTELLIGENCE
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Air Quality Intelligence
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time atmospheric monitoring powered by mobile IoT fleet (PMPML buses & waste vehicles).
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <Bus className="w-4 h-4 text-cyan-600" />
          <span className="font-semibold text-slate-800">Mobile IoT Fleet: 142 Active Nodes</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Air Quality Index"
          value={AIR_QUALITY_METRICS.aqi}
          unit="AQI"
          status={AIR_QUALITY_METRICS.status}
          statusType="warning"
          subtitle="Moderate Air Quality"
          icon={Wind}
          highlight={true}
        />

        <MetricCard
          title="PM 2.5"
          value={AIR_QUALITY_METRICS.pm25}
          status="Moderate"
          statusType="warning"
          subtitle="Fine particulate matter"
          icon={CloudRain}
        />

        <MetricCard
          title="PM 10"
          value={AIR_QUALITY_METRICS.pm10}
          status="Elevated"
          statusType="warning"
          subtitle="Coarse dust matter"
          icon={Activity}
        />

        <MetricCard
          title="NO₂ Level"
          value={AIR_QUALITY_METRICS.no2}
          status="Normal"
          statusType="safe"
          subtitle="Nitrogen dioxide"
          icon={Flame}
        />

        <MetricCard
          title="CO₂ Level"
          value={AIR_QUALITY_METRICS.co2}
          status="Normal"
          statusType="safe"
          subtitle="Carbon dioxide"
          icon={Wind}
        />

        <MetricCard
          title="Ambient Temp"
          value={AIR_QUALITY_METRICS.temp}
          status="Warm"
          statusType="info"
          subtitle={`Humidity: ${AIR_QUALITY_METRICS.humidity}`}
          icon={Thermometer}
        />
      </div>

      {/* Main Charts & Forecast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AQITrendChart />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Mobile Fleet Sensor Nodes</h3>
          <p className="text-xs text-slate-500">Live air quality telemetry from municipal fleet vehicles</p>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-cyan-600" />
                <div>
                  <div className="font-bold text-slate-900">PMPML Bus #102</div>
                  <div className="text-[10px] text-slate-500">Katraj - Swargate Route</div>
                </div>
              </div>
              <span className="font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                AQI 87
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-rose-600" />
                <div>
                  <div className="font-bold text-slate-900">Waste Vehicle #45</div>
                  <div className="text-[10px] text-slate-500">Hadapsar Industrial Loop</div>
                </div>
              </div>
              <span className="font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                AQI 112
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-900">Depot Patrol #08</div>
                  <div className="text-[10px] text-slate-500">Kothrud Green Corridor</div>
                </div>
              </div>
              <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                AQI 58
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Operational Forecast Card */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-5 border border-cyan-500/40 shadow-xl flex items-start space-x-4">
        <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl mt-0.5">
          <Brain className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-cyan-300">
              AI Pollution Forecast & Operational Insight
            </h4>
            <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-200 px-2.5 py-0.5 rounded-full">
              Confidence: 89%
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-2 leading-relaxed font-medium">
            "{AIR_QUALITY_METRICS.aiForecast}"
          </p>
          <div className="mt-3 flex items-center space-x-3">
            <button
              onClick={() => showToast('Green Routing advisory dispatched to municipal transit app')}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              Issue Low-Emission Route Advisory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
