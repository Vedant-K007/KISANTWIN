'use client';

import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { StatusBadge } from '../common/StatusBadge';
import { Building2, Droplets, Activity, RefreshCw } from 'lucide-react';

export const InfrastructureView: React.FC = () => {
  const { currentInfrastructure, showToast } = useResilience();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-full border border-cyan-200">
            PUNE MUNICIPAL ASSETS
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Critical Infrastructure Asset Monitoring
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time telemetry and health status of municipal reservoirs, pumping stations, and drainage channels.
          </p>
        </div>

        <button
          onClick={() => showToast('Infrastructure asset grid re-synchronized.')}
          className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Asset Status</span>
        </button>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentInfrastructure.map((asset) => (
          <div key={asset.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">{asset.type}</span>
              <StatusBadge status={asset.status} />
            </div>

            <div>
              <h4 className="font-extrabold text-base text-slate-900">{asset.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{asset.location}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Load / Capacity:</span>
                <span className="font-bold text-slate-900">{asset.capacityOrLoad}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Current Telemetry:</span>
                <span className="font-semibold text-slate-800">{asset.currentReading}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
              <span>Updated: {asset.lastUpdated}</span>
              <button
                onClick={() => showToast(`Control interface launched for ${asset.name}`)}
                className="text-cyan-600 font-bold hover:underline"
              >
                Control Panel →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
