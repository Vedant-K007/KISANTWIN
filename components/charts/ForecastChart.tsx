'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useResilience } from '../../context/ResilienceContext';
import { Brain, Sparkles } from 'lucide-react';

export const ForecastChart: React.FC = () => {
  const { currentForecast, waterRiskScore } = useResilience();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-extrabold text-base text-slate-900">AI Risk Forecast</h3>
            <span className="text-[10px] font-bold uppercase bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-cyan-600 animate-spin" />
              <span>Next 12 Hours</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Predictive modeling of rainfall (mm), river water level (m), and urban flood risk index.
          </p>
        </div>

        {/* Confidence Badge */}
        <div className="text-right bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <div className="text-[10px] text-slate-400 font-bold uppercase">AI Confidence</div>
          <div className="text-sm font-extrabold text-cyan-600">87% Accuracy</div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentForecast} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#FFFFFF',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey="rainfall"
              name="Rainfall (mm)"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={{ r: 4, fill: '#06B6D4' }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="waterLevel"
              name="Water Level (m)"
              stroke="#0284C7"
              strokeWidth={2.5}
              strokeDasharray="4 4"
            />
            <Line
              type="monotone"
              dataKey="riskIndex"
              name="Flood Risk Index"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4, fill: '#EF4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Operational AI Insight Card */}
      <div className="mt-4 bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-xl p-3.5 border border-cyan-500/30 flex items-start space-x-3 shadow-md">
        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 mt-0.5">
          <Brain className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-300">
              AI Operational Intelligence Insight
            </span>
            <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.2 rounded">
              Confidence: 87%
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-1 font-medium leading-relaxed">
            "Heavy rainfall combined with rising drainage levels may increase localized flood risk in 3 zones over the next 4 hours."
          </p>
        </div>
      </div>
    </div>
  );
};
