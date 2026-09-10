'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { StatusBadge } from '../common/StatusBadge';
import { Sprout, Camera, Sparkles, AlertCircle, CheckCircle, Bug, Droplets, Zap } from 'lucide-react';

export const HealthView: React.FC = () => {
  const { analyzingCrop, cropAnalysisResult, runCropAnalysis } = useFarm();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200">
            AGRONOMIC TWIN TELEMETRY
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Crop Health Intelligence
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Multi-spectral leaf health index, chlorophyll density, and AI pest/disease diagnostic scanner.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-2xl text-xs font-black text-emerald-900">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>Overall Health: 88% (Optimal)</span>
        </div>
      </div>

      {/* Zone Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-slate-900">Zone A (Soybean Main)</span>
            <StatusBadge status="Healthy" type="safe" />
          </div>
          <div className="text-3xl font-black text-emerald-600">92%</div>
          <p className="text-[11px] text-slate-500">Vegetative canopy normal</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-slate-900">Zone B (Pod Fill Stage)</span>
            <StatusBadge status="Healthy" type="safe" />
          </div>
          <div className="text-3xl font-black text-emerald-600">84%</div>
          <p className="text-[11px] text-slate-500">Pod formation progressing</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-xs space-y-2 bg-amber-50/30">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-slate-900">Zone C (Onion Patch)</span>
            <StatusBadge status="Watch" type="warning" />
          </div>
          <div className="text-3xl font-black text-amber-600">79%</div>
          <p className="text-[11px] text-amber-600 font-semibold">Fungal humidity alert</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-slate-900">Zone D (Maize Buffer)</span>
            <StatusBadge status="Healthy" type="safe" />
          </div>
          <div className="text-3xl font-black text-emerald-600">91%</div>
          <p className="text-[11px] text-slate-500">Fodder density nominal</p>
        </div>
      </div>

      {/* AI CROP IMAGE ANALYSIS SCANNER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
              <Camera className="w-5 h-5 text-emerald-600" />
              <span>AI Crop Disease & Pest Diagnostic Scanner</span>
            </h3>
            <p className="text-xs text-slate-500">Simulate field leaf sample analysis powered by computer vision twin.</p>
          </div>
          <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
            Vision Model Active
          </span>
        </div>

        {/* Upload Mock Box & Trigger */}
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">Upload or Capture Leaf Specimen Image</div>
            <p className="text-xs text-slate-500">Select sample from Zone C Onion patch or Zone B Soybean</p>
          </div>

          <button
            onClick={runCropAnalysis}
            disabled={analyzingCrop}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95 mx-auto disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>{analyzingCrop ? 'Scanning Leaf Telemetry...' : '[ANALYZE CROP SAMPLE]'}</span>
          </button>
        </div>

        {/* Diagnostic Result Card */}
        {cropAnalysisResult && (
          <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-500/40 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                DIAGNOSTIC SCAN RESULT
              </span>
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                Confidence: {cropAnalysisResult.confidence}%
              </span>
            </div>

            <h4 className="font-black text-lg text-white">{cropAnalysisResult.disease}</h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
              Recommended Action: {cropAnalysisResult.action}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
