'use client';

import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { Building2, ShieldAlert, Send, CheckCircle2, Clock, UserCheck } from 'lucide-react';

export const OperationsView: React.FC = () => {
  const { dispatchedLogs, openDispatchModal, currentHotspots, showToast } = useResilience();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-cyan-400 px-2.5 py-0.5 rounded-full border border-slate-700">
            FIELD RESPONSE LOG
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            City Operations & Field Dispatch Center
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time audit log of municipal response units dispatched to water and environmental incidents.
          </p>
        </div>

        <button
          onClick={() => openDispatchModal(currentHotspots[0])}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-teal-700 hover:from-cyan-700 hover:to-teal-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-cyan-600/20 transition-all active:scale-95"
        >
          <Send className="w-4 h-4" />
          <span>New Dispatch Command</span>
        </button>
      </div>

      {/* Dispatched Logs Table / List */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-cyan-600" />
            <span>Active Municipal Field Deployments</span>
          </h3>
          <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
            {dispatchedLogs.length} Active Deployments
          </span>
        </div>

        <div className="space-y-3">
          {dispatchedLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-cyan-100 text-cyan-800 rounded-lg font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{log.team}</h4>
                    <span className="text-[9px] bg-cyan-100 text-cyan-900 px-2 py-0.2 rounded font-extrabold">
                      {log.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                    Location Target: <strong className="text-slate-900">{log.location}</strong>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1 font-medium">{log.note}</p>
                </div>
              </div>

              <div className="flex md:flex-col items-end justify-between md:justify-center text-right text-[11px]">
                <div className="text-slate-400 font-bold">{log.timestamp}</div>
                <button
                  onClick={() => showToast(`Status updated for deployment ${log.id}`)}
                  className="text-cyan-600 hover:text-cyan-800 font-bold hover:underline mt-1"
                >
                  Update Log →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
