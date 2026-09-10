'use client';

import React from 'react';
import { useResilience } from '../../context/ResilienceContext';

export const RiskBreakdownChart: React.FC = () => {
  const { waterResilienceScore } = useResilience();

  const metrics = [
    { label: 'Air Quality Index', score: 72, color: 'bg-emerald-500' },
    { label: 'Water Resilience', score: waterResilienceScore, color: 'bg-cyan-500' },
    { label: 'Mobility & Traffic', score: 84, color: 'bg-amber-500' },
    { label: 'Critical Infrastructure', score: 88, color: 'bg-blue-600' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-900">City Climate Breakdown</h3>
          <p className="text-xs text-slate-500">Domain readiness index scores (out of 100)</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Composite Index</div>
          <div className="text-xl font-black text-slate-900">81 / 100</div>
        </div>
      </div>

      <div className="space-y-3.5">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>{m.label}</span>
              <span className="font-extrabold text-slate-900">{m.score} / 100</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${m.color} rounded-full transition-all duration-500`}
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
