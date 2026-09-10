'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { ShieldAlert } from 'lucide-react';

export const RiskRadarChart: React.FC = () => {
  const { hasRunSimulation, isOptimized } = useFarm();

  const baseRisks = [
    { label: 'Water Risk', risk: hasRunSimulation && !isOptimized ? 68 : isOptimized ? 24 : 24, color: 'bg-cyan-500' },
    { label: 'Climate Risk', risk: hasRunSimulation && !isOptimized ? 74 : isOptimized ? 31 : 31, color: 'bg-amber-500' },
    { label: 'Disease Risk', risk: hasRunSimulation && !isOptimized ? 42 : isOptimized ? 18 : 18, color: 'bg-emerald-500' },
    { label: 'Pest Risk', risk: hasRunSimulation && !isOptimized ? 65 : isOptimized ? 22 : 22, color: 'bg-rose-500' },
    { label: 'Market Risk', risk: hasRunSimulation && !isOptimized ? 58 : isOptimized ? 21 : 21, color: 'bg-[#0284C7]' },
    { label: 'Logistics Risk', risk: hasRunSimulation && !isOptimized ? 32 : isOptimized ? 14 : 14, color: 'bg-indigo-500' },
  ];

  const overallRisk = hasRunSimulation && !isOptimized ? 58 : isOptimized ? 22 : 23;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Farm Risk Command Center</span>
          </h3>
          <p className="text-xs text-slate-500">6-Factor multi-dimensional risk matrix</p>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400 font-extrabold uppercase">Overall Risk Score</div>
          <div
            className={`text-xl font-black ${
              overallRisk > 50 ? 'text-rose-600 animate-pulse' : 'text-emerald-700'
            }`}
          >
            {overallRisk}% {overallRisk > 50 ? 'HIGH RISK' : 'LOW-MODERATE'}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {baseRisks.map((item) => (
          <div key={item.label} className="space-y-1 text-xs font-semibold">
            <div className="flex justify-between text-slate-700">
              <span>{item.label}</span>
              <span className="font-extrabold text-slate-900">{item.risk}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${item.risk}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
