'use client';

import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { WATER_BALANCE_DATA } from '../../data/mockFarmData';
import { useFarm } from '../../context/FarmContext';
import { Droplets, Sparkles } from 'lucide-react';

export const WaterBalanceChart: React.FC = () => {
  const { setIrrigationModalOpen } = useFarm();

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#DCE5DF] shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE5DF]/60 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-extrabold text-lg text-[#17231D]">Farm Water Balance</h3>
            <span className="text-[10px] font-extrabold uppercase bg-[#E8F3FF] text-[#2F80ED] px-2.5 py-0.5 rounded-full border border-[#2F80ED]/30">
              7-Day Hydro Forecast
            </span>
          </div>
          <p className="text-xs text-[#66756D] mt-0.5">
            RAIN → SOIL MOISTURE → IRRIGATION → CROP WATER DEMAND
          </p>
        </div>

        <button
          onClick={() => setIrrigationModalOpen(true)}
          className="flex items-center space-x-1.5 bg-[#2F80ED] hover:bg-[#1E6AD2] text-white font-bold px-4 py-2 rounded-full text-xs shadow-xs transition-all active:scale-95 self-start sm:self-auto"
        >
          <Droplets className="w-3.5 h-3.5" />
          <span>OPTIMIZE IRRIGATION</span>
        </button>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={WATER_BALANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
            <XAxis dataKey="day" stroke="#66756D" fontSize={11} tickLine={false} />
            <YAxis stroke="#66756D" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#17231D',
                borderRadius: '1rem',
                color: '#FFFFFF',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="irrigation" name="Irrigation (L)" fill="#2F80ED" radius={[6, 6, 0, 0]} />
            <Bar dataKey="demand" name="Water Demand (L)" fill="#F2B84B" opacity={0.7} radius={[6, 6, 0, 0]} />
            <Line type="monotone" dataKey="moisture" name="Soil Moisture %" stroke="#16A878" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#2F80ED" strokeWidth={2.5} strokeDasharray="4 4" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* AI Water Balance Callout */}
      <div className="bg-[#E8F3FF] border border-[#2F80ED]/30 rounded-2xl p-4 flex items-start space-x-3 text-xs text-[#17231D]">
        <Sparkles className="w-5 h-5 text-[#2F80ED] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-extrabold text-[#2F80ED]">AI Hydro Insight: </strong>
          "Rainfall is expected to remain below crop demand for the next 4 days. Drip irrigation should be scheduled in Zone B tomorrow morning 06:00–08:00."
        </div>
      </div>
    </div>
  );
};
