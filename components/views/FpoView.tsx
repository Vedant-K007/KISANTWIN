'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { FPO_DATA } from '../../data/mockFarmData';
import { RegionalClusterMap } from '../maps/RegionalClusterMap';
import { StatusBadge } from '../common/StatusBadge';
import { Building, Users, Droplets, ShieldAlert, Sprout, Send, ArrowRight } from 'lucide-react';

export const FpoView: React.FC = () => {
  const { showToast } = useFarm();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-cyan-100 text-cyan-900 px-2.5 py-0.5 rounded-full border border-cyan-200">
            FPO / AGRICULTURAL ADVISOR DASHBOARD
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Pune District Farmer Producer Organization (FPO)
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Aggregated decision intelligence across 1,284 member farms and 8,420 acres.
          </p>
        </div>

        <button
          onClick={() => showToast('Dispatched FPO bulk advisory to 1,284 member farmers.')}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-teal-700 hover:from-cyan-700 hover:to-teal-800 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs shadow-md transition-all active:scale-95 self-start md:self-auto"
        >
          <Send className="w-4 h-4" />
          <span>Broadcast Bulk FPO Advisory</span>
        </button>
      </div>

      {/* Top Aggregated Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 text-xs">
          <div className="text-slate-400 font-extrabold uppercase text-[10px]">Total Member Farmers</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{FPO_DATA.totalFarmers}</div>
          <div className="text-[10px] text-slate-500">Pune FPO Federation</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 text-xs">
          <div className="text-slate-400 font-extrabold uppercase text-[10px]">Total Acreage</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{FPO_DATA.totalAcreage} acres</div>
          <div className="text-[10px] text-emerald-600 font-semibold">Soybean, Onion, Maize</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-amber-200 bg-amber-50/30 text-xs">
          <div className="text-amber-800 font-extrabold uppercase text-[10px]">High Water Risk</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{FPO_DATA.highWaterRisk} farms</div>
          <div className="text-[10px] text-amber-600 font-semibold">Canal Deficit Zone</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-rose-200 bg-rose-50/30 text-xs">
          <div className="text-rose-800 font-extrabold uppercase text-[10px]">High Crop Risk</div>
          <div className="text-2xl font-black text-rose-600 mt-1">{FPO_DATA.highCropRisk} farms</div>
          <div className="text-[10px] text-rose-600 font-semibold">Fungal Stress Alert</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 text-xs">
          <div className="text-slate-400 font-extrabold uppercase text-[10px]">Expected Yield Boost</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{FPO_DATA.expectedYieldBoost}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">Via KisanTwin AI</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 text-xs">
          <div className="text-slate-400 font-extrabold uppercase text-[10px]">Total Water Saved</div>
          <div className="text-2xl font-black text-cyan-700 mt-1">{FPO_DATA.waterSavedM}</div>
          <div className="text-[10px] text-cyan-700 font-semibold">Collective Hydro Efficiency</div>
        </div>
      </div>

      {/* Regional Cluster Map */}
      <RegionalClusterMap />
    </div>
  );
};
