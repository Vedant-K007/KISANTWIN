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
import { YIELD_PROFIT_DATA } from '../../data/mockFarmData';
import { TrendingUp } from 'lucide-react';

export const YieldTrendChart: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Yield & Profitability Growth Trend</span>
          </h3>
          <p className="text-xs text-slate-500">Historical & KisanTwin forecasted harvest return</p>
        </div>
        <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
          Target: ₹46,800
        </span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={YIELD_PROFIT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderRadius: '1rem',
                color: '#FFF',
                fontSize: '12px'
              }}
            />
            <Area type="monotone" dataKey="profit" name="Net Profit (₹)" stroke="#10B981" strokeWidth={3} fill="url(#colorProfit)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
