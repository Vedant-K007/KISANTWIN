'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { FarmTwinMap } from '../maps/FarmTwinMap';
import { LayerToggle } from '../maps/LayerToggle';
import { StatusBadge } from '../common/StatusBadge';
import { Map, Sprout, Droplets, Bug, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';

export const FarmTwinView: React.FC = () => {
  const { selectedZone, setSelectedZone, setIrrigationModalOpen, showToast } = useFarm();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200">
            DIGITAL TWIN TELEMETRY
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Your Digital Farm Twin
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            A living model of your field combining crop, soil, water, climate and economic conditions.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl font-bold">
          <Map className="w-4 h-4 text-emerald-600" />
          <span>Field Area: 2.4 Acres (Pune)</span>
        </div>
      </div>

      {/* Map Control Bar & Interactive SVG Map */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-extrabold text-lg text-slate-900">Field Zone Map Inspector</h3>
          <LayerToggle />
        </div>

        <FarmTwinMap height="h-[520px]" />
      </div>

      {/* Selected Zone Deep-Dive Inspector Grid */}
      {selectedZone && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl font-bold">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-lg text-slate-900">{selectedZone.name} Detailed Telemetry</h4>
                <p className="text-xs text-slate-500">{selectedZone.crop} • {selectedZone.area}</p>
              </div>
            </div>

            <StatusBadge status={selectedZone.pestRisk === 'High' ? 'Watch' : 'Healthy'} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-slate-400 font-extrabold uppercase text-[10px]">Soil Moisture</div>
              <div className="text-xl font-black text-slate-900 mt-1">{selectedZone.soilMoisture}%</div>
              <div className="text-[10px] text-slate-500">Root Zone Sensor S-01</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-slate-400 font-extrabold uppercase text-[10px]">Crop Health Index</div>
              <div className="text-xl font-black text-emerald-700 mt-1">{selectedZone.cropHealth}%</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Chlorophyll Nominal</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-slate-400 font-extrabold uppercase text-[10px]">Water Stress</div>
              <div className="text-xl font-black text-cyan-700 mt-1">{selectedZone.waterStress}</div>
              <div className="text-[10px] text-cyan-700 font-semibold">Transpiration Low</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-slate-400 font-extrabold uppercase text-[10px]">Pest & Disease Risk</div>
              <div
                className={`text-xl font-black mt-1 ${
                  selectedZone.pestRisk === 'High' ? 'text-amber-600' : 'text-slate-900'
                }`}
              >
                {selectedZone.pestRisk}
              </div>
              <div className="text-[10px] text-slate-500">Leaf Humidity Node</div>
            </div>
          </div>

          {/* Recommended Directive */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs flex items-start space-x-3 text-emerald-950">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-extrabold text-emerald-900">AI Field Directive for {selectedZone.name}:</strong>
              <p className="leading-relaxed font-medium">{selectedZone.recommendedAction}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
