'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const data = [
  { time: '00:00', aqi: 62, pm25: 28, pm10: 54 },
  { time: '04:00', aqi: 54, pm25: 22, pm10: 48 },
  { time: '08:00', aqi: 94, pm25: 48, pm10: 82 },
  { time: '12:00', aqi: 87, pm25: 42, pm10: 76 },
  { time: '16:00', aqi: 104, pm25: 56, pm10: 92 },
  { time: '20:00', aqi: 118, pm25: 64, pm10: 108 },
  { time: '23:59', aqi: 78, pm25: 36, pm10: 68 }
];

export const AQITrendChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-900">24-Hour Air Quality Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">PM2.5, PM10 & Composite AQI readings</p>
        </div>
        <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
          Moderate (87)
        </span>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderRadius: '0.75rem',
                color: '#FFF',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="aqi"
              name="AQI Level"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAqi)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
