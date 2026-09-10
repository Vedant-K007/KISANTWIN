'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { CLIMATE_FORECAST_DATA } from '../../data/mockFarmData';
import { CloudSun } from 'lucide-react';

export const ClimateChart: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-amber-500" />
            <span>7-Day Farm Climate Forecast</span>
          </h3>
          <p className="text-xs text-slate-500">Max temperature (°C) & precipitation probability %</p>
        </div>
        <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
          Heat Surge Day 4
        </span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={CLIMATE_FORECAST_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderRadius: '1rem',
                color: '#FFF',
                fontSize: '12px'
              }}
            />
            <Line type="monotone" dataKey="maxTemp" name="Max Temp (°C)" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="rainfallProb" name="Rain Prob %" stroke="#0284C7" strokeWidth={2.5} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
