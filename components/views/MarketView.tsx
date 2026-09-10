'use client';

import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { TrendingUp, CheckCircle2, ShieldCheck } from 'lucide-react';

export const MarketView: React.FC = () => {
  const { showToast } = useFarm();
  const [selectedDecision, setSelectedDecision] = useState<'sell' | 'wait'>('wait');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCE5DF] pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#EAF8F1] text-[#16A878] px-2.5 py-0.5 rounded-full border border-[#16A878]/30">
            ECONOMIC TWIN • MARKET ADVISORY
          </span>
          <h2 className="text-2xl font-black text-[#17231D] tracking-tight mt-1">
            Market Intelligence & Revenue Optimizer
          </h2>
          <p className="text-xs text-[#66756D] font-medium">
            Mandi price trend analysis, transport logistics, and harvest sale timing calculator.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-white border border-[#DCE5DF] px-3 py-1.5 rounded-full font-bold">
          <span className="text-[#66756D]">Mandi Rate:</span>
          <span className="text-[#16A878] font-extrabold">₹3,150 / quintal (↑ 4%)</span>
        </div>
      </div>

      {/* Hero "SELL NOW vs WAIT" Decision Tool */}
      <div className="bg-white rounded-3xl p-6 border border-[#DCE5DF] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#DCE5DF]/60 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#EAF8F1] text-[#16A878] rounded-2xl border border-[#16A878]/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#16A878] bg-[#EAF8F1] px-2 py-0.5 rounded">
                AI SALE TIMING ENGINE
              </span>
              <h3 className="text-lg font-black text-[#17231D] mt-0.5">
                SELL NOW vs WAIT 5 DAYS
              </h3>
            </div>
          </div>

          <span className="text-xs font-extrabold bg-[#FFF7E6] text-[#F2B84B] px-3 py-1 rounded-full border border-[#F2B84B]/30">
            Simulated Demo Mandi Data
          </span>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* SELL NOW Option */}
          <div
            onClick={() => setSelectedDecision('sell')}
            className={`rounded-3xl p-5 border cursor-pointer transition-all ${
              selectedDecision === 'sell'
                ? 'bg-[#17231D] text-white border-[#2F80ED] shadow-md ring-2 ring-[#2F80ED]'
                : 'bg-[#F5F7F3] text-[#17231D] border-[#DCE5DF] hover:border-[#17231D]'
            }`}
          >
            <div className="flex justify-between items-center font-extrabold">
              <span className="text-sm">OPTION A: SELL NOW</span>
              {selectedDecision === 'sell' && <CheckCircle2 className="w-4 h-4 text-[#2F80ED]" />}
            </div>

            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-3xl font-black">₹58,000</span>
              <span className="text-xs opacity-75">Expected Revenue</span>
            </div>

            <p className="text-[11px] mt-2 opacity-80 font-medium">
              Immediate liquidation at Pune APMC Mandi rate (₹3,150/q).
            </p>

            <div className="mt-4 pt-3 border-t border-[#DCE5DF]/40 text-[11px] font-semibold text-[#66756D]">
              No storage risk • Instant cashflow
            </div>
          </div>

          {/* WAIT 5 DAYS Option (Recommended) */}
          <div
            onClick={() => setSelectedDecision('wait')}
            className={`rounded-3xl p-5 border cursor-pointer transition-all relative ${
              selectedDecision === 'wait'
                ? 'bg-[#EAF8F1] text-[#17231D] border-[#16A878] shadow-md ring-2 ring-[#16A878]'
                : 'bg-white text-[#17231D] border-[#DCE5DF] hover:border-[#16A878]'
            }`}
          >
            <span className="absolute -top-3 right-4 bg-[#16A878] text-white font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-xs">
              (AI Recommended)
            </span>

            <div className="flex justify-between items-center font-extrabold">
              <span className="text-sm">OPTION B: WAIT 5 DAYS</span>
              {selectedDecision === 'wait' && <CheckCircle2 className="w-4 h-4 text-[#16A878]" />}
            </div>

            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-3xl font-black text-[#16A878]">₹62,300</span>
              <span className="text-xs opacity-90 font-bold text-[#16A878]">(+₹4,300 Gain)</span>
            </div>

            <p className="text-[11px] mt-2 text-[#66756D] font-medium">
              Hold harvest 5 days. Mandi arrival drop predicted to boost soybean rate to ₹3,380/q.
            </p>

            <div className="mt-4 pt-3 border-t border-[#16A878]/30 text-[11px] font-extrabold text-[#16A878]">
              Confidence: 78% • Storage cost: ₹180
            </div>
          </div>
        </div>

        {/* Selected Recommendation Banner */}
        <div className="bg-[#17231D] text-white p-4 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#16A878]" />
            <div>
              <div className="font-extrabold text-white">
                Active Selection: {selectedDecision === 'wait' ? 'WAIT 5 DAYS (Recommended)' : 'SELL NOW'}
              </div>
              <div className="text-[11px] text-[#D6E5DE]">
                {selectedDecision === 'wait'
                  ? 'KisanTwin will issue dry warehouse storage directive & lock buyer contract next Monday.'
                  : 'Proceeding with immediate mandi transport booking.'}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast(`Market decision "${selectedDecision === 'wait' ? 'WAIT 5 DAYS' : 'SELL NOW'}" locked in Farm Action Plan.`)}
            className="bg-[#16A878] hover:bg-[#128F66] text-white font-extrabold px-4 py-2 rounded-full transition-colors"
          >
            Lock Market Strategy
          </button>
        </div>
      </div>
    </div>
  );
};
