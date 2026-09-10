'use client';

import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { AlertTriangle, Play, CheckCircle2, CloudRain } from 'lucide-react';

export const WeatherBanner: React.FC = () => {
  const {
    isSimulatingRainfall,
    simulationStep,
    advanceSimulationStep,
    stopRainfallSimulation,
    setActiveView
  } = useResilience();

  if (!isSimulatingRainfall) return null;

  const steps = [
    'Rain Spiked',
    'Water Level +1.5m',
    'AI Risk Predicted',
    'Kharadi CRITICAL',
    'Alert Triggered',
    'Action Plan Ready',
    'Dispatch Team',
    'Response Active'
  ];

  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white px-6 py-3 shadow-lg border-b border-amber-500/40 select-none animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Banner Left Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md">
            <AlertTriangle className="w-5 h-5 text-amber-200 animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm uppercase tracking-wider text-amber-100">
                ⚠ LIVE DEMO SCENARIO: WEATHER EVENT DETECTED
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Step {simulationStep} of 8
              </span>
            </div>
            <p className="text-xs text-amber-100/90 font-medium">
              Heavy rainfall detected across Kharadi, Hadapsar & Baner zones. SENSE → UNDERSTAND → PREDICT → ACT flow active.
            </p>
          </div>
        </div>

        {/* Banner Step Progress Bar */}
        <div className="hidden lg:flex items-center space-x-1.5">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < simulationStep;
            const isCurrent = stepNum === simulationStep;

            return (
              <div
                key={label}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                  isCurrent
                    ? 'bg-white text-slate-900 shadow-sm font-bold ring-2 ring-amber-300'
                    : isCompleted
                    ? 'bg-amber-900/40 text-amber-200 line-through opacity-80'
                    : 'bg-black/20 text-amber-200/60'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                ) : (
                  <span className="w-3 h-3 rounded-full border border-current text-[9px] flex items-center justify-center">
                    {stepNum}
                  </span>
                )}
                <span>{label}</span>
              </div>
            );
          })}
        </div>

        {/* Banner Right Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={advanceSimulationStep}
            className="flex items-center space-x-1.5 bg-white text-slate-900 hover:bg-amber-50 font-bold px-3 py-1.5 rounded-lg text-xs shadow-md transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current text-amber-600" />
            <span>Advance Step ({simulationStep}/8)</span>
          </button>
          <button
            onClick={() => setActiveView('water')}
            className="hidden sm:flex items-center space-x-1 bg-amber-900/50 hover:bg-amber-900 text-white font-medium px-2.5 py-1.5 rounded-lg text-xs border border-amber-400/40 transition-colors"
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Water View</span>
          </button>
          <button
            onClick={stopRainfallSimulation}
            className="text-xs text-amber-200 hover:text-white underline px-2 py-1"
          >
            Exit Demo
          </button>
        </div>
      </div>
    </div>
  );
};
