'use client';

import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { FileText, X, Download, CheckCircle, ShieldCheck } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { reportModalOpen, setReportModalOpen, selectedFarmName, role } = useFarm();
  const [downloaded, setDownloaded] = useState(false);

  if (!reportModalOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 text-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Official KisanTwin Briefing
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                Farm Digital Twin & Water Resilience Report
              </h3>
            </div>
          </div>
          <button
            onClick={() => setReportModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-xs font-sans">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Target Field / District</div>
              <div className="font-extrabold text-slate-900">{selectedFarmName}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Date Generated</div>
              <div className="font-bold text-slate-700">{new Date().toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Report Type</div>
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                AI PREDICTIVE ASSESS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
              <div className="text-[10px] text-emerald-800 font-bold uppercase">Farm Resilience Score</div>
              <div className="text-2xl font-black text-emerald-900 mt-1">82 / 100</div>
              <div className="text-[10px] text-emerald-700 font-semibold">Stable Condition</div>
            </div>
            <div className="p-3 bg-cyan-50/60 rounded-xl border border-cyan-200">
              <div className="text-[10px] text-cyan-800 font-bold uppercase">Water Availability</div>
              <div className="text-2xl font-black text-cyan-900 mt-1">72% Pool</div>
              <div className="text-[10px] text-cyan-700 font-semibold">3,820 L / Week</div>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
              <div className="text-[10px] text-emerald-800 font-bold uppercase">Expected Profit</div>
              <div className="text-2xl font-black text-emerald-900 mt-1">₹46,800</div>
              <div className="text-[10px] text-emerald-700 font-semibold">+13% vs Baseline</div>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-slate-200 pt-3">
            <h4 className="font-extrabold text-sm text-slate-900">1. Executive Summary</h4>
            <p className="text-slate-600 leading-relaxed">
              KisanTwin multi-sensor telemetry across 2.4 acres indicates robust crop health (88%) in Zone A Soybean. Soil moisture in Zone B (54%) requires drip irrigation intervention within 24 hours to prevent moisture stress. Market intelligence recommends holding soybean sale for 5 days to capture an estimated +8% to +12% price surge.
            </p>
          </div>

          <div className="space-y-1.5 border-t border-slate-200 pt-3">
            <h4 className="font-extrabold text-sm text-slate-900">2. Recommended Interventions</h4>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Execute Zone B drip irrigation (2,180 L allocation).</li>
              <li>Inspect Zone C Onion patch for early fungal leaf spot within 24 hours.</li>
              <li>Apply foliar potassium micronutrient spray in Zone A & B before day 4 heat surge.</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Certificate #KT-PMC-2026</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setReportModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              {downloaded ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Report Exported (PDF)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export Official PDF Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
