'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { Sparkles, Map, ArrowRight, Droplets, Sprout, TrendingUp, CloudSun } from 'lucide-react';

export const LandingHeroBanner: React.FC = () => {
  const { setActiveView } = useFarm();

  return (
    <div className="bg-gradient-to-r from-[#F0F9F4] via-white to-[#F0F9F4] p-6 md:p-8 rounded-3xl border border-[#DCE5DF] shadow-xs relative overflow-hidden select-none mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#EAF8F1] text-[#16A878] px-3 py-1 rounded-full border border-[#16A878]/30">
              AGRITECH & WATER RESILIENCE DECISION TWIN
            </span>
            <span className="text-[10px] text-[#66756D] font-medium hidden sm:inline">
              OBSERVE → PREDICT → SIMULATE → OPTIMIZE → ACT
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#12372A] leading-tight">
            <span className="text-[#16A878]">Simulate</span> Before You <span className="text-[#16A878]">Cultivate</span>.
          </h1>

          <p className="text-sm md:text-base text-[#66756D] font-medium leading-relaxed max-w-2xl">
            An AI decision twin that helps farmers predict water, climate, crop and market risks — and choose the best action before problems become losses.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveView('stresstest')}
              className="flex items-center space-x-2 bg-[#16A878] hover:bg-[#128F66] text-white font-bold px-5 py-3 rounded-full text-xs shadow-sm transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>RUN FARM STRESS TEST</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveView('twin')}
              className="flex items-center space-x-2 bg-white hover:bg-[#F5F7F3] text-[#12372A] font-bold px-4 py-3 rounded-full text-xs border border-[#12372A] transition-colors"
            >
              <Map className="w-4 h-4 text-[#12372A]" />
              <span>EXPLORE FARM TWIN</span>
            </button>
          </div>
        </div>

        {/* Right Column: Abstract Subtle SVG Visualization */}
        <div className="lg:col-span-4 hidden lg:flex justify-end relative">
          <div className="w-64 h-44 rounded-2xl bg-white p-3 border border-[#DCE5DF] shadow-xs relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 200 130">
              <defs>
                <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#EAF8F1" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="200" height="130" fill="url(#heroGrid)" />
              {/* Abstract Field Boundaries */}
              <rect x="20" y="20" width="70" height="45" rx="6" fill="#EAF8F1" stroke="#16A878" strokeWidth="1.5" />
              <rect x="100" y="20" width="80" height="45" rx="6" fill="#E8F3FF" stroke="#2F80ED" strokeWidth="1.5" />
              <rect x="20" y="75" width="160" height="40" rx="6" fill="#FFF7E6" stroke="#F2B84B" strokeWidth="1.5" />

              {/* Water Flow Curves & Sensor Nodes */}
              <path d="M 140,20 Q 140,75 55,75" fill="none" stroke="#2F80ED" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="55" cy="42" r="4" fill="#16A878" />
              <circle cx="140" cy="42" r="4" fill="#2F80ED" />
              <circle cx="100" cy="95" r="4" fill="#F2B84B" />
            </svg>

            <div className="absolute bottom-2 right-2 text-[9px] font-bold text-[#66756D] bg-white/90 px-2 py-0.5 rounded border border-[#DCE5DF]">
              Field Twin GIS
            </div>
          </div>
        </div>
      </div>

      {/* Metric Strip Under Hero (4 Compact Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-[#DCE5DF] text-xs">
        <div className="flex items-center space-x-2.5 bg-white p-3 rounded-2xl border border-[#DCE5DF]">
          <div className="p-2 rounded-xl bg-[#E8F3FF] text-[#2F80ED]">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-[#66756D]">Water Balance</div>
            <div className="text-sm font-extrabold text-[#17231D]">72% Available</div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 bg-white p-3 rounded-2xl border border-[#DCE5DF]">
          <div className="p-2 rounded-xl bg-[#EAF8F1] text-[#16A878]">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-[#66756D]">Crop Health</div>
            <div className="text-sm font-extrabold text-[#17231D]">88% Healthy</div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 bg-white p-3 rounded-2xl border border-[#DCE5DF]">
          <div className="p-2 rounded-xl bg-[#FFF7E6] text-[#F2B84B]">
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-[#66756D]">Climate Risk</div>
            <div className="text-sm font-extrabold text-[#17231D]">71 / 100</div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 bg-white p-3 rounded-2xl border border-[#DCE5DF]">
          <div className="p-2 rounded-xl bg-[#EAF8F1] text-[#16A878]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-[#66756D]">Profit Forecast</div>
            <div className="text-sm font-extrabold text-[#17231D]">₹46,800</div>
          </div>
        </div>
      </div>
    </div>
  );
};
