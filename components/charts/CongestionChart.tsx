'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const data = [
  { corridor: 'University Rd', congestion: 84, emissions: 45 },
  { corridor: 'Nagar Road', congestion: 78, emissions: 52 },
  { corridor: 'Hadapsar Bp', congestion: 72, emissions: 48 },
  { corridor: 'Karve Road', congestion: 68, emissions: 38 },
  { corridor: 'Baner Highway', congestion: 58, emissions: 32 },
  { corridor: 'Aundh Road', congestion: 46, emissions: 24 }
];

export const CongestionChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-900">Traffic Congestion vs Emissions</h3>
          <p className="text-xs text-slate-500 mt-0.5">Top arterial corridors in Pune</p>
        </div>
        <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
          Avg: 64%
        </span>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="corridor" stroke="#64748B" fontSize={10} />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderRadius: '0.75rem',
                color: '#FFF',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="congestion" name="Congestion %" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            <Bar dataKey="emissions" name="CO2 Tons/h" fill="#06B6D4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
