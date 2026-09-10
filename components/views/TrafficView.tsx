'use client';

import React, { useState } from 'react';
import { MetricCard } from '../common/MetricCard';
import { CongestionChart } from '../charts/CongestionChart';
import { GREEN_ROUTES, GreenRouteOption } from '../../data/mockData';
import { useResilience } from '../../context/ResilienceContext';
import { Navigation2, Route, Clock, Zap, Leaf, CheckCircle2, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const TrafficView: React.FC = () => {
  const { selectedGreenRoute, setSelectedGreenRoute, showToast } = useResilience();

  const [fromLocation, setFromLocation] = useState('Pune Railway Station');
  const [toLocation, setToLocation] = useState('Hinjewadi Tech Park Phase 1');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
            AEROFLOW MOBILITY DOMAIN
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Traffic & Mobility Intelligence
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time urban flow optimization, emissions reduction & Green Route guidance.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <Navigation2 className="w-4 h-4 text-amber-600" />
          <span className="font-semibold text-slate-800">Congestion: 64% (Elevated)</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Congestion Rate"
          value="64%"
          unit="Urban Grid"
          status="Elevated"
          statusType="warning"
          subtitle="Peak Hours Active"
          trend="↑ 8%"
          icon={Navigation2}
        />

        <MetricCard
          title="Average City Speed"
          value="24"
          unit="km/h"
          status="Normal"
          statusType="safe"
          subtitle="Core Corridor Flow"
          trend="↓ 2 km/h"
          icon={Clock}
        />

        <MetricCard
          title="Idle Fleet Time"
          value="14"
          unit="min / trip"
          status="Moderate"
          statusType="warning"
          subtitle="Traffic Stop Delays"
          trend="-3 min"
          icon={Zap}
        />

        <MetricCard
          title="CO₂ Emissions Saved"
          value="12.8%"
          unit="Reduction"
          status="Target Met"
          statusType="safe"
          subtitle="Via Green Routing"
          trend="↑ 2.4%"
          icon={Leaf}
          highlight={true}
        />
      </div>

      {/* GREEN ROUTE OPTIMIZER (FEATURE HIGHLIGHT) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
              <Route className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                AI Smart Routing Engine
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Green Route Optimizer
              </h3>
            </div>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Eco-Routing for Fleet & Public Transit
          </span>
        </div>

        {/* Input Selector Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <label className="block font-extrabold text-slate-700 mb-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              <span>Origin Location (From):</span>
            </label>
            <select
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="Pune Railway Station">Pune Railway Station (Central)</option>
              <option value="Swargate Bus Terminus">Swargate Bus Terminus</option>
              <option value="Kothrud Depot">Kothrud Depot</option>
            </select>
          </div>

          <div>
            <label className="block font-extrabold text-slate-700 mb-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Destination (To):</span>
            </label>
            <select
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="Hinjewadi Tech Park Phase 1">Hinjewadi Tech Park Phase 1</option>
              <option value="Magarpatta Cybercity">Magarpatta Cybercity</option>
              <option value="Baner IT Hub">Baner IT Hub</option>
            </select>
          </div>
        </div>

        {/* Route Options Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GREEN_ROUTES.map((route) => {
            const isSelected = selectedGreenRoute.id === route.id;

            return (
              <div
                key={route.id}
                onClick={() => setSelectedGreenRoute(route)}
                className={`rounded-xl p-4 cursor-pointer transition-all duration-200 border relative flex flex-col justify-between ${
                  route.isRecommended
                    ? isSelected
                      ? 'bg-gradient-to-b from-emerald-900 to-slate-900 text-white border-emerald-400 shadow-xl ring-2 ring-emerald-400'
                      : 'bg-emerald-50/80 border-emerald-300 text-slate-900 shadow-sm hover:border-emerald-400'
                    : isSelected
                    ? 'bg-slate-900 text-white border-cyan-400 shadow-lg'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                {route.isRecommended && (
                  <span className="absolute -top-2.5 right-4 bg-emerald-500 text-white font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                    (Recommended)
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm">{route.title}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>

                  <div className="mt-3 flex items-baseline space-x-2">
                    <span className="text-2xl font-black">{route.duration}</span>
                    <span className="text-xs font-semibold opacity-75">({route.distance})</span>
                  </div>

                  <p className="text-[11px] mt-2 opacity-80 font-medium">{route.via}</p>
                </div>

                {/* Savings Badge */}
                <div className="mt-4 pt-3 border-t border-slate-200/40 text-xs font-extrabold">
                  {route.co2Reduction && (
                    <span className="text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded inline-block">
                      {route.co2Reduction}
                    </span>
                  )}
                  {route.exposureReduction && (
                    <span className="text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded inline-block">
                      {route.exposureReduction}
                    </span>
                  )}
                  {!route.co2Reduction && !route.exposureReduction && (
                    <span className="text-slate-400 font-semibold">Standard Baseline Route</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Route Action Banner */}
        <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-extrabold text-slate-100">
                Active Selection: {selectedGreenRoute.title} ({selectedGreenRoute.duration})
              </div>
              <div className="text-[11px] text-slate-300">
                {selectedGreenRoute.co2Reduction || 'Standard route choice selected for dispatch.'}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast(`Route configuration "${selectedGreenRoute.title}" broadcast to PMPML Transit Fleet!`)}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Broadcast Route to Fleet
          </button>
        </div>
      </div>

      {/* Congestion Chart */}
      <CongestionChart />
    </div>
  );
};
