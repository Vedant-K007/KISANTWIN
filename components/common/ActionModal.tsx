'use client';

import React, { useState } from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { Hotspot, PredictiveAlert } from '../../data/mockData';
import { X, Send, ShieldAlert, CheckCircle } from 'lucide-react';

export const ActionModal: React.FC = () => {
  const { dispatchModalOpen, setDispatchModalOpen, dispatchTarget, confirmDispatch } = useResilience();

  const [team, setTeam] = useState('PMC Rapid Response Unit #4 (Kharadi Zone)');
  const [note, setNote] = useState('Inspect drainage culvert D-14, clear debris, and engage secondary pump station PS-07.');

  if (!dispatchModalOpen || !dispatchTarget) return null;

  const isHotspot = 'name' in dispatchTarget;
  const locationName = isHotspot ? (dispatchTarget as Hotspot).name : (dispatchTarget as PredictiveAlert).location;
  const riskTitle = isHotspot ? (dispatchTarget as Hotspot).predictedRisk : (dispatchTarget as PredictiveAlert).title;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmDispatch(team, note);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Municipal Operations Dispatch
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                Dispatch Response: {locationName}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setDispatchModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Event Context Card */}
        <div className="mt-4 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-xs space-y-1.5">
          <div className="flex items-center justify-between font-semibold text-slate-800">
            <span>Target Location: {locationName}</span>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
              ACTION REQUIRED
            </span>
          </div>
          <p className="text-slate-600">{riskTitle}</p>
          {isHotspot && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-[11px]">
              <div>Rainfall: <strong>{(dispatchTarget as Hotspot).rainfall}</strong></div>
              <div>Water Level: <strong>{(dispatchTarget as Hotspot).waterLevel}</strong></div>
              <div>Drainage: <strong>{(dispatchTarget as Hotspot).drainageCapacity}</strong></div>
            </div>
          )}
        </div>

        {/* Dispatch Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Select Field Response Unit:
            </label>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            >
              <option value="PMC Rapid Response Unit #4 (Kharadi Zone)">
                PMC Rapid Response Unit #4 (Kharadi Zone)
              </option>
              <option value="Municipal Drainage Taskforce #2 (Hadapsar)">
                Municipal Drainage Taskforce #2 (Hadapsar)
              </option>
              <option value="Emergency Pumping Crew #07">Emergency Pumping Crew #07</option>
              <option value="Civil Protection Mobile Fleet #12">Civil Protection Mobile Fleet #12</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Field Directives & AI Recommended Operational Order:
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setDispatchModalOpen(false)}
              className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-teal-700 hover:from-cyan-700 hover:to-teal-800 text-white font-bold px-5 py-2.5 rounded-lg shadow-md shadow-cyan-600/20 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Dispatch Team</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
