'use client';

import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Droplets, X, CheckCircle, ShieldCheck, ArrowRight, Info } from 'lucide-react';

export const IrrigationModal: React.FC = () => {
  const { irrigationModalOpen, setIrrigationModalOpen, showToast } = useFarm();
  const [applied, setApplied] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  if (!irrigationModalOpen) return null;

  const handleApply = () => {
    setApplied(true);
    showToast('✓ AI Irrigation Allocation Plan applied to field Drip Solenoid Valves!');
    setTimeout(() => {
      setApplied(false);
      setIrrigationModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-50 border border-cyan-200 text-cyan-700 rounded-2xl">
              <Droplets className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
                AI Precision Hydro Allocation
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                AI Irrigation Plan
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIrrigationModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-xs font-sans">
          {/* Availability vs Requirement Header */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div>
              <div className="text-[10px] font-extrabold uppercase text-slate-400">Current Water Pool</div>
              <div className="text-xl font-black text-slate-900 mt-0.5">8,400 L</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Borewell + Pond Storage</div>
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase text-slate-400">Crop Requirement</div>
              <div className="text-xl font-black text-cyan-700 mt-0.5">6,920 L</div>
              <div className="text-[10px] text-cyan-700 font-semibold">AI Calculated Next 24h</div>
            </div>
          </div>

          {/* Recommended Zone Allocation List */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm">Recommended Drip Allocation:</h4>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-900">Zone A (Soybean Main)</span>
                  <div className="text-[10px] text-slate-500">Moisture: 61%</div>
                </div>
                <span className="font-black text-cyan-700 text-sm">1,420 L</span>
              </div>

              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-emerald-950">Zone B (Pod Fill Stage)</span>
                  <div className="text-[10px] text-emerald-700 font-semibold">Priority • Moisture: 54%</div>
                </div>
                <span className="font-black text-emerald-800 text-sm">2,180 L</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-900">Zone C (Onion Patch)</span>
                  <div className="text-[10px] text-slate-500">Moisture: 48%</div>
                </div>
                <span className="font-black text-cyan-700 text-sm">1,760 L</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-900">Zone D (Maize Buffer)</span>
                  <div className="text-[10px] text-slate-500">Moisture: 68%</div>
                </div>
                <span className="font-black text-cyan-700 text-sm">1,100 L</span>
              </div>
            </div>
          </div>

          {/* Efficiency Metric Callout */}
          <div className="p-3 bg-emerald-950 text-white rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-extrabold text-xs">Total Water Saved: 1,360 L (-18%)</div>
                <div className="text-[10px] text-emerald-200/80">Expected Crop Impact: Minimal</div>
              </div>
            </div>
          </div>

          {/* AI Explanation Accordion */}
          {showExplain && (
            <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200 text-[11px] text-cyan-950 space-y-1">
              <div className="font-extrabold text-cyan-800 flex items-center space-x-1">
                <Info className="w-3.5 h-3.5" />
                <span>AI Reasoning Explanation:</span>
              </div>
              <p className="leading-relaxed font-medium">
                Zone B is currently at critical pod fill stage where transpiration demand is highest. Zone A has higher residual soil moisture (61%) allowing a 300L reduction without yield loss.
              </p>
            </div>
          )}
        </div>

        {/* Modal Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setShowExplain(!showExplain)}
            className="text-xs text-slate-500 hover:text-slate-800 font-bold underline"
          >
            {showExplain ? 'Hide Explanation' : '[VIEW EXPLANATION]'}
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIrrigationModalOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              {applied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Applied to Drip Valves!</span>
                </>
              ) : (
                <>
                  <Droplets className="w-4 h-4" />
                  <span>[APPLY DEMO PLAN]</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
