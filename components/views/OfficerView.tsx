'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { OFFICER_DATA } from '../../data/mockFarmData';
import { StatusBadge } from '../common/StatusBadge';
import { Landmark, ShieldAlert, Droplets, Send, ArrowRight, CheckCircle2, FileText } from 'lucide-react';

export const OfficerView: React.FC = () => {
  const { showToast } = useFarm();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full border border-indigo-200">
            STATE DEPARTMENT OF AGRICULTURE COMMAND
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            District Climate Resilience & Crop Security Command
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Government decision-support dashboard monitoring Pune District agriculture risk exposure.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-indigo-950 text-white px-4 py-2 rounded-2xl border border-indigo-800">
          <Landmark className="w-5 h-5 text-indigo-300" />
          <div>
            <div className="text-[9px] uppercase font-extrabold text-indigo-300/80">District Resilience Score</div>
            <div className="text-lg font-black text-white">{OFFICER_DATA.districtResilienceScore} / 100 (Stable)</div>
          </div>
        </div>
      </div>

      {/* Priority Intervention Zones List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-black text-base text-slate-900 flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Priority Intervention Zones — {OFFICER_DATA.districtName}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Categorized by drought risk exposure and water deficit telemetry.</p>
          </div>
          <span className="text-[10px] font-extrabold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full">
            3 Active Zones
          </span>
        </div>

        <div className="space-y-3">
          {OFFICER_DATA.priorityZones.map((zone) => (
            <div
              key={zone.id}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-black text-slate-900 text-sm">{zone.name}</span>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-600 text-white">
                    {zone.priority}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium">
                  Drought Exposure: <strong>{zone.droughtExposure}</strong> • Water Stress: <strong>{zone.waterStress}</strong>
                </div>
                <p className="text-indigo-950 font-semibold text-[11px] mt-1">Directives: {zone.action}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => showToast(`Issued District Advisory & Subsidy Dispatch to ${zone.name}`)}
                  className="flex items-center space-x-1.5 bg-indigo-900 hover:bg-indigo-800 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Issue Govt Advisory</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
