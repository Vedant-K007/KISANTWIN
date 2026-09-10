'use client';

import React, { useState } from 'react';
import { SENSORS_LIST, SensorItem } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { Radio, Search, Filter, ShieldCheck, Battery, RefreshCw } from 'lucide-react';
import { useResilience } from '../../context/ResilienceContext';

export const SensorsView: React.FC = () => {
  const { showToast } = useResilience();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const filteredSensors = SENSORS_LIST.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || s.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
            IOT FLEET FLEET TELEMETRY
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            IoT Fleet & Sensor Network
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time status of 248 environmental, hydro, and vehicle mobile sensor nodes across Pune.
          </p>
        </div>

        <button
          onClick={() => showToast('Sensor telemetry network diagnostic triggered.')}
          className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Run Network Diagnostics</span>
        </button>
      </div>

      {/* Sensor Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <div className="text-slate-400 font-bold uppercase text-[10px]">Total Sensor Fleet</div>
          <div className="text-2xl font-black text-slate-900 mt-1">248</div>
          <div className="text-[10px] text-slate-500">Fixed & Mobile Nodes</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <div className="text-emerald-600 font-bold uppercase text-[10px]">Online & Healthy</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">231</div>
          <div className="text-[10px] text-emerald-600 font-semibold">93.1% Operational</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <div className="text-amber-600 font-bold uppercase text-[10px]">Telemetry Warnings</div>
          <div className="text-2xl font-black text-amber-600 mt-1">12</div>
          <div className="text-[10px] text-amber-600 font-semibold">High Threshold Alert</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <div className="text-rose-600 font-bold uppercase text-[10px]">Offline / Maintenance</div>
          <div className="text-2xl font-black text-rose-600 mt-1">5</div>
          <div className="text-[10px] text-rose-600 font-semibold">Battery / Signal Lost</div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search sensor ID, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-800 focus:outline-hidden font-medium"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-600">Category:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 font-semibold focus:outline-hidden"
          >
            <option value="All">All Categories</option>
            <option value="Water Level">Water Level</option>
            <option value="Rainfall">Rainfall</option>
            <option value="Air Quality">Air Quality</option>
            <option value="Vehicle Fleet">Vehicle Fleet</option>
          </select>
        </div>
      </div>

      {/* Sensor Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-extrabold border-b border-slate-200">
                <th className="py-3 px-4">Sensor ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Current Reading</th>
                <th className="py-3 px-4">Battery / Power</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredSensors.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-black text-slate-900">{s.id}</td>
                  <td className="py-3 px-4 text-slate-600">{s.type}</td>
                  <td className="py-3 px-4 text-slate-800 font-bold">{s.location}</td>
                  <td className="py-3 px-4 text-slate-700 font-semibold">{s.reading}</td>
                  <td className="py-3 px-4 text-slate-500 flex items-center space-x-1">
                    <Battery className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{s.battery || 'Main Power'}</span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{s.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
