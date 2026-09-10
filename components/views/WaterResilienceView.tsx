'use client';

import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { MetricCard } from '../common/MetricCard';
import { PuneCityMap } from '../maps/PuneCityMap';
import { LayerToggle } from '../maps/LayerToggle';
import { ForecastChart } from '../charts/ForecastChart';
import { StatusBadge } from '../common/StatusBadge';
import {
  Droplets,
  CloudRain,
  Activity,
  ShieldAlert,
  Building2,
  Brain,
  Send,
  CheckCircle,
  AlertCircle,
  Radio,
  ExternalLink,
  RotateCw
} from 'lucide-react';

export const WaterResilienceView: React.FC = () => {
  const {
    waterResilienceScore,
    waterRiskScore,
    currentRainfall,
    currentWaterLevel,
    currentInfrastructure,
    selectedHotspot,
    setSelectedHotspot,
    openDispatchModal,
    showToast
  } = useResilience();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-full border border-cyan-200">
              FEATURED DOMAIN • PUNE WATER GRID
            </span>
            <span className="text-[10px] font-bold text-slate-400">Live Sensor Polling (30s)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Water Resilience
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Predict, monitor and respond to urban water risks before they become crises.
          </p>
        </div>

        {/* Top Operational Status Summary */}
        <div className="flex items-center space-x-3 bg-cyan-50/80 border border-cyan-200/80 px-4 py-2 rounded-xl">
          <Droplets className="w-5 h-5 text-cyan-600 animate-pulse" />
          <div className="text-xs">
            <span className="font-bold text-slate-800">Hydro-Sensor Fleet:</span>{' '}
            <span className="text-cyan-700 font-extrabold">38 Water Gauges Active</span>
          </div>
        </div>
      </div>

      {/* TOP WATER RESILIENCE SCORE HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 text-white border border-cyan-500/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          {/* Radial / Large Score Badge */}
          <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-700 shadow-lg shadow-cyan-500/30 border border-cyan-300/40 shrink-0">
            <div className="text-center">
              <span className="text-3xl font-black tracking-tight text-white">{waterResilienceScore}</span>
              <span className="block text-[10px] uppercase font-bold text-cyan-100/80 tracking-wider">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400">
                WATER RESILIENCE SCORE
              </span>
              <StatusBadge
                status={waterResilienceScore > 70 ? 'Good' : 'Moderate Risk'}
                type={waterResilienceScore > 70 ? 'safe' : 'warning'}
              />
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {waterResilienceScore > 70
                ? 'Good — Moderate rainfall risk detected'
                : 'WARNING — Runoff surge in eastern catchments'}
            </h3>
            <p className="text-xs text-cyan-100/80 mt-1 max-w-xl font-medium">
              Current infrastructure is stable, but several drainage zones require immediate attention due to elevated rainfall accumulation.
            </p>
          </div>
        </div>

        {/* Quick Hero Metrics */}
        <div className="flex items-center space-x-4 border-t lg:border-t-0 lg:border-l border-slate-700/80 pt-4 lg:pt-0 lg:pl-6 w-full lg:w-auto justify-between lg:justify-start">
          <div>
            <div className="text-[10px] text-cyan-300/80 font-bold uppercase">Surface Runoff</div>
            <div className="text-lg font-extrabold text-white">{currentRainfall}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">↑ 18% 24h</div>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div>
            <div className="text-[10px] text-cyan-300/80 font-bold uppercase">River Gauge</div>
            <div className="text-lg font-extrabold text-white">{currentWaterLevel}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">Normal</div>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div>
            <div className="text-[10px] text-cyan-300/80 font-bold uppercase">6h Flood Risk</div>
            <div className="text-lg font-extrabold text-cyan-300">
              {waterRiskScore > 60 ? 'HIGH' : 'LOW'}
            </div>
            <div className="text-[10px] text-cyan-200/70 font-semibold">AI Calculated</div>
          </div>
        </div>
      </div>

      {/* FOUR PRIMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Rainfall (24h)"
          value={currentRainfall}
          unit="Precipitation"
          status="Active Rain"
          statusType="info"
          subtitle="Last 24 hours intensity"
          trend="↑ 18%"
          icon={CloudRain}
        />

        <MetricCard
          title="River Water Level"
          value={currentWaterLevel}
          unit="Gauge Height"
          status="Normal"
          statusType="safe"
          subtitle="Mutha River Bank Gauge"
          trend="↓ 4%"
          icon={Activity}
        />

        <MetricCard
          title="Reservoir Capacity"
          value="68%"
          unit="Total Volume"
          status="Stable"
          statusType="normal"
          subtitle="Pashan & Khadakwasla"
          trend="Nominal Outflow"
          icon={Droplets}
        />

        <MetricCard
          title="6-Hour Flood Risk"
          value={waterRiskScore > 60 ? 'HIGH' : 'LOW'}
          unit="Index"
          status={waterRiskScore > 60 ? 'CRITICAL' : 'Stable'}
          statusType={waterRiskScore > 60 ? 'critical' : 'safe'}
          subtitle="AI 6h Predictive Probability"
          trend={waterRiskScore > 60 ? '↑ Surge Risk' : 'Low Probability'}
          icon={ShieldAlert}
          highlight={waterRiskScore > 60}
        />
      </div>

      {/* WATER RISK MAP (~65% width) + SIDEBAR HOTSPOT INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Container (approx 65% width = 8 cols out of 12) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Water Risk & Infrastructure Map
              </h3>
              <p className="text-xs text-slate-500">
                Spatial view of rivers, reservoirs, drainage networks D-01 to D-24, and risk zones.
              </p>
            </div>
            <LayerToggle />
          </div>

          <PuneCityMap height="h-[520px]" />
        </div>

        {/* Hotspot Inspector Panel (approx 35% width = 4 cols out of 12) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-cyan-600" />
              <span>Zone Hotspot Inspector</span>
            </h4>
            <span className="text-[10px] font-bold text-slate-400">Click Map Marker</span>
          </div>

          {selectedHotspot ? (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-black text-base text-slate-900">{selectedHotspot.name}</h5>
                  <StatusBadge status={selectedHotspot.riskLevel} />
                </div>
                <p className="text-slate-600 text-[11px]">{selectedHotspot.description}</p>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="text-slate-400 font-bold uppercase text-[9px]">Rainfall Rate</div>
                  <div className="font-extrabold text-slate-800 text-sm mt-0.5">{selectedHotspot.rainfall}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="text-slate-400 font-bold uppercase text-[9px]">Water Level</div>
                  <div className="font-extrabold text-slate-800 text-sm mt-0.5">{selectedHotspot.waterLevel}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="text-slate-400 font-bold uppercase text-[9px]">Drainage Load</div>
                  <div className="font-extrabold text-slate-800 text-sm mt-0.5">{selectedHotspot.drainageCapacity}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="text-slate-400 font-bold uppercase text-[9px]">Predicted Risk</div>
                  <div className="font-extrabold text-rose-600 text-[11px] mt-0.5">{selectedHotspot.predictedRisk}</div>
                </div>
              </div>

              {/* AI Forecast */}
              <div className="bg-cyan-50/70 rounded-xl p-3 border border-cyan-200 text-[11px] text-cyan-950 space-y-1">
                <div className="font-bold flex items-center space-x-1 text-cyan-800">
                  <Brain className="w-3.5 h-3.5 text-cyan-600" />
                  <span>AI Predictive Assessment</span>
                </div>
                <p className="leading-relaxed font-medium">{selectedHotspot.aiForecast}</p>
              </div>

              {/* Recommended Action */}
              <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200 text-[11px] text-amber-950 space-y-1">
                <div className="font-bold text-amber-800">Recommended Action:</div>
                <p className="leading-relaxed font-medium">{selectedHotspot.recommendedAction}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => openDispatchModal(selectedHotspot)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-600 to-teal-700 hover:from-cyan-700 hover:to-teal-800 text-white font-bold py-2.5 rounded-xl shadow-md shadow-cyan-600/20 transition-all active:scale-95 text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Response Unit</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => showToast(`Detailed diagnostic log opened for ${selectedHotspot.name}`)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-[11px] transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => showToast(`Hotspot ${selectedHotspot.name} marked resolved`)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-[11px] transition-colors"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Radio className="w-8 h-8 mx-auto text-slate-300 animate-pulse mb-2" />
              <p>Select any hotspot marker on the map to view detailed telemetry & operational actions.</p>
            </div>
          )}
        </div>
      </div>

      {/* AI WATER FORECASTING CHART */}
      <ForecastChart />

      {/* CRITICAL WATER INFRASTRUCTURE MONITORING */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-cyan-600" />
              <span>Critical Water Infrastructure Monitoring</span>
            </h3>
            <p className="text-xs text-slate-500">
              Live status, capacity, and telemetry for Pune reservoirs, pumping stations, and drainage assets.
            </p>
          </div>
          <button
            onClick={() => showToast('Infrastructure telemetry refreshed')}
            className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-semibold transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Sync Assets</span>
          </button>
        </div>

        {/* Infrastructure Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-extrabold border-b border-slate-200">
                <th className="py-3 px-4">Asset Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Capacity / Load</th>
                <th className="py-3 px-4">Current Reading</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentInfrastructure.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-extrabold text-slate-900">{item.name}</td>
                  <td className="py-3 px-4 text-slate-600">{item.type}</td>
                  <td className="py-3 px-4 text-slate-600">{item.location}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{item.capacityOrLoad}</td>
                  <td className="py-3 px-4 text-slate-600">{item.currentReading}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => showToast(`Control diagnostics launched for ${item.name}`)}
                      className="text-[11px] text-cyan-600 hover:text-cyan-800 font-bold hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
